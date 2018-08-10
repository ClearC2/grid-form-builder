import React, {Component} from 'react'
import {Map} from 'immutable'
import {AsyncCreatable, Async} from 'react-select'
import PropTypes from 'prop-types'
import GFBConfig from '../config'
import {DropTarget} from 'react-dnd'

class Placeholder extends Component {
  static propTypes = {
    handleMount: PropTypes.func.isRequired
  }
  componentDidMount = () => this.props.handleMount()
  render = () => null
}

export class Typeahead extends Component {
  static defaultProps = {
    minChars: 1
  }

  state = {
    shouldRemount: false,
    currentOptions: {}
  }

  componentDidUpdate = p => {
    const {didDrop, isOver} = this.props
    if (didDrop && !p.didDrop && !isOver && p.isOver) {
      // if it was just previously over and dropped (this is to make this event only trigger once)
      let {droppedItem, handleDragDropOnInput, config = {}, formValues = Map()} = this.props
      droppedItem = droppedItem === null ? null : droppedItem.widget
      const currentValue = formValues.get(config.name, '')
      config = {currentValue, ...config}
      if (droppedItem && !p.droppedItem) {
        handleDragDropOnInput({
          source: droppedItem,
          target: config
        })
      }
    }
  }

  handleAnywhereClick = e => {
    const {handleAnywhereClick = () => null, formValues = Map()} = this.props
    let {config = {}} = this.props
    const currentValue = formValues.get(config.name, '')
    config = {currentValue, ...config}
    handleAnywhereClick(config, e)
  }

  handleCascadeKeywordClick = e => {
    const {handleCascadeKeywordClick = () => null, formValues = Map()} = this.props
    let {config = {}} = this.props
    const currentValue = formValues.get(config.name, '')
    config = {currentValue, ...config}
    handleCascadeKeywordClick(config)
  }

  onMouseDown = e => {
    if (this.props.draggable) e.stopPropagation()
  }

  setShouldRemount = (shouldRemount = true) => this.setState({shouldRemount})

  handleChange = newValue => {
    if (Array.isArray(newValue)) {
      const {handleOnChange, config = {}} = this.props
      const {name = null} = config
      let target = {
        name: name,
        value: newValue
      }
      // it is way too complicated to try to figure out what you want to do with a multiselect typeahead
      // so I'll give it back to the developer raw and let them figure it out -- JRA 7/5/2018
      handleOnChange({target})
    } else {
      this.handleSingleValueChange(newValue)
    }
  }

  handleSingleValueChange = newValue => {
    const {handleOnChange, config = {}} = this.props
    const {name = null, typeahead = {}} = config
    if (newValue.className || (
      (typeof newValue.value !== 'number') && (typeof newValue.label !== 'number') &&
        newValue.value.trim() === '' && newValue.label.trim() === '')) {
      newValue[name] = newValue.value || ''
      const {fields = []} = typeahead
      let resetValues = {
        [name]: ''
      }
      fields.map(field => { resetValues[field] = '' })
      Object.keys(resetValues).forEach(field => {
        handleOnChange({
          target: {
            name: field,
            value: resetValues[field]
          }
        })
      })
    }
    Object.keys(newValue).forEach(field => {
      let value = newValue[field]
      if (field === 'duplication') value = newValue.value
      let id = null
      // if (field === 'label') {
      //   id = newValue[this.props.config.typeahead.fieldId || this.props.config.typeahead.fieldid || 'value'] || newValue.label
      //   field = name
      // }
      let e = {
        target: {
          name: field,
          value,
          id
        }
      }
      if (field !== 'className' && field !== 'value' && field !== 'label') {
        handleOnChange(e)
      }
    })
  }

  populateFilterBody = (filter = {}) => {
    if (filter.hasOwnProperty('name')) {
      this.populateConditionObject(filter)
    } else if (filter.hasOwnProperty('conditions') && Array.isArray(filter.conditions)) {
      filter.conditions.map(condition => this.populateFilterBody(condition))
    }
    return filter
  }

  populateConditionObject = (condition = {name: null, comparator: null, values: []}) => {
    const {formValues = Map()} = this.props
    if (!condition.hasOwnProperty('values')) condition.values = []
    const value = formValues.get(condition.name, '')
    condition.values.push(value)
    return condition
  }

  loadOptions = search => {
    const {config = {}} = this.props
    const {name = null, typeahead = {}} = config
    const {key = null, duplication = false} = typeahead
    let {filter = {}} = typeahead

    if (!key) {
      console.error(`The JSON schema representation for ${name} does not have a typeahead key. A typeahead.key is required for this field type to search for results.`)
      return Promise.resolve({options: []})
    }

    filter = JSON.parse(JSON.stringify(filter)) // deep clone the object as to not mutate the definition
    this.populateFilterBody(filter)

    if (search.length >= this.props.minChars || search === ' ') {
      if (typeof search === 'string' && search.trim() !== '') search = `/${search}`
      return GFBConfig.ajax.post(`/typeahead/name/${key}/search${search}`, {filter})
        .then(resp => {
          const results = resp.data.data.map(value => {
            if (duplication) {
              value.duplication = duplication
            }
            return value
          })
          return {options: results}
        })
    }

    return Promise.resolve({options: []})
  }

  render = () => {
    const {inline, formValues = Map(), config = {}, Icon = null, requiredWarning, connectDropTarget, cascadingKeyword, CascadeIcon} = this.props
    const {name = null, required = false, multi = false, onKeyDown = () => null, allowcreate = false} = config
    let {labelStyle = {}, style = {}, containerStyle = {}, iconStyle = {}} = config
    containerStyle = typeof containerStyle === 'string' ? JSON.parse(containerStyle) : containerStyle
    labelStyle = typeof labelStyle === 'string' ? JSON.parse(labelStyle) : labelStyle
    style = typeof style === 'string' ? JSON.parse(style) : style
    iconStyle = typeof iconStyle === 'string' ? JSON.parse(iconStyle) : iconStyle
    if (!name) return null
    const {label = name} = config
    let value = formValues.get(name, null)
    if (Array.isArray(value) && value.length > 0) {
      value = value.map(v => {
        if (typeof v === 'object') return v
        if (typeof v === 'string' || typeof v === 'number') return {value: v, label: v}
      })
    }
    if ((typeof value === 'string' || typeof v === 'number') && value.length > 0) value = {value, label: value}
    const warn = requiredWarning && formValues.get(name, '').length === 0 && required
    let {readonly = false, disabled = false, placeholder = ''} = config
    disabled = disabled || readonly

    const styles = {
      container: {
        display: 'flex',
        flex: 1,
        flexDirection: inline ? 'row' : 'column',
        background: 'transparent',
        ...containerStyle
      },
      labelContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: inline ? 150 : '100%',
        minWidth: inline ? 150 : '100%',
        height: 15,
        marginTop: inline ? 4 : 0,
        background: 'transparent',
        ...labelStyle
      },
      label: {
        display: 'flex',
        justifyContent: 'flex-start',
        lineHeight: inline ? '23px' : '15px',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        fontSize: inline ? '10pt' : '8pt',
        background: 'transparent',
        marginRight: 5,
        color: !!cascadingKeyword && !CascadeIcon ? 'blue' : '#383e4b',
        ...labelStyle
      },
      input: {
        backgroundColor: disabled ? '#eee' : 'white',
        minWidth: 177,
        ...style
      },
      icon: {
        marginRight: 5,
        width: 15,
        height: 15,
        marginTop: inline ? 4 : 0,
        ...iconStyle
      }
    }

    let className = inline ? `select-grid-input select-grid-input-inline` : `select-grid-input`
    className = !warn ? className : className + ' warn-required'
    placeholder = warn ? '* This Field Is Required' : placeholder
    if (this.state.shouldRemount) {
      return <Placeholder handleMount={this.setShouldRemount} />
    } else {
      return (
        connectDropTarget(
          <div style={styles.container} onClick={this.handleAnywhereClick}>
            <div style={styles.labelContainer}>
              {required && <div style={{color: '#ec1c24', fontWeight: 'bold', fontSize: '15pt', lineHeight: '10pt'}}>*</div>}
              {Icon && <Icon style={styles.icon} />}
              <strong style={styles.label} onClick={!!cascadingKeyword && !CascadeIcon ? this.handleCascadeKeywordClick : null} className={!!cascadingKeyword && !CascadeIcon ? 'cursor-hand' : ''}>{label}</strong>
              {!!cascadingKeyword && !!CascadeIcon && <CascadeIcon onClick={this.handleCascadeKeywordClick} className='cursor-hand' />}
            </div>
            {allowcreate && <AsyncCreatable
              style={style}
              onMouseDown={this.onMouseDown}
              className={className}
              name={name}
              multi={multi}
              value={value}
              onChange={this.handleChange}
              loadOptions={this.loadOptions}
              disabled={disabled}
              onKeyDown={onKeyDown}
              placeholder={placeholder}
              resetValue={{[name]: '', value: '', label: ''}}
            />}
            {!allowcreate && <Async
              style={style}
              onMouseDown={this.onMouseDown}
              className={className}
              name={name}
              multi={multi}
              value={value}
              onChange={this.handleChange}
              loadOptions={this.loadOptions}
              disabled={disabled}
              onKeyDown={onKeyDown}
              placeholder={placeholder}
              resetValue={{[name]: '', value: '', label: ''}}
            />}
          </div>
        )
      )
    }
  }
}

function collect (connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    droppedItem: monitor.getDropResult(),
    didDrop: monitor.didDrop(),
    isOver: monitor.isOver()
  }
}

const boxTarget = {
  drop (props, monitor) {
    return {
      widget: monitor.getItem()
    }
  }
}

export default DropTarget('FormBuilderDraggable', boxTarget, collect)(Typeahead)
