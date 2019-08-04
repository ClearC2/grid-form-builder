import React, {Component} from 'react'
import {Map} from 'immutable'
import {AsyncCreatable, Async} from 'react-select'
import PropTypes from 'prop-types'
import GFBConfig from '../config'
import {DropTarget} from 'react-dnd'
import {reactSelectStyles} from '../react-select-style'
import {isMobile} from '../utils'

const viewPortHeight = document.documentElement.clientHeight

class Placeholder extends Component {
  static propTypes = {
    handleMount: PropTypes.func.isRequired
  }
  componentDidMount = () => this.props.handleMount()
  render = () => null
}
export class Typeahead extends Component {
  static propTypes = {
    autoComplete: PropTypes.string,
    didDrop: PropTypes.bool,
    isOver: PropTypes.bool,
    CascadeIcon: PropTypes.any,
    cascadingKeyword: PropTypes.any,
    config: PropTypes.object,
    connectDropTarget: PropTypes.any,
    droppedItem: PropTypes.any,
    handleOnChange: PropTypes.func.isRequired,
    handleDragDropOnInput: PropTypes.func,
    handleAnywhereClick: PropTypes.func,
    handleCascadeKeywordClick: PropTypes.func,
    draggable: PropTypes.bool,
    minChars: PropTypes.number,
    formValues: PropTypes.instanceOf(Map),
    Icon: PropTypes.any,
    requiredWarning: PropTypes.bool,
    inline: PropTypes.bool,
    tabIndex: PropTypes.number,
    taMaxHeight: PropTypes.string,
    LinkIcon: PropTypes.func,
    handleLinkClick: PropTypes.func
  }
  static defaultProps = {
    minChars: 1
  }

  state = {
    currentOptions: {},
    fieldPosition: 0,
    inputValue: undefined, // used to keep previous input in typeahead if supressInputReset is true
    menuIsOpen: false,
    menuPlacement: 'bottom',
    shouldRemount: false
  }

  componentDidUpdate = (p, s) => {
    const {didDrop, isOver, formValues, config = {}, handleOnChange = () => null} = this.props
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
    const {name = null, typeahead = {}} = config
    const {fieldvalue = null, fields = []} = typeahead
    if (fieldvalue !== null) {
      if (formValues.get(fieldvalue, '') !== p.formValues.get(fieldvalue, '')) {
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
    }

    if (s.fieldPosition !== this.state.fieldPosition) {
      this.setMenuOpenPosition()
    }
  }

  handleAnywhereClick = e => {
    const {handleAnywhereClick = () => null, formValues = Map()} = this.props
    let {config = {}} = this.props
    const currentValue = formValues.get(config.name, '')
    config = {currentValue, ...config}
    if (!config.disabled) {
      handleAnywhereClick(config, e)
      this.setInputFieldPosition(this.inputContainer) // position gets set when menu opens
    }
  }

  onMouseOut = () => {
    this.setState({
      menuPlacement: 'top',
      menuIsOpen: false
    })
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

  emptyFields = (fields, changeHandler) => {
    fields.forEach(field => {
      const e = {
        target: {
          name: field,
          value: ''
        }
      }
      changeHandler(e)
    })
  }

  onInputChange = (val, e, e2) => {
    if (this.props.config.supressInputReset) {
      if (e.action === 'input-change') {
        this.setState({inputValue: val})
      }
    } else {
      this.setState({inputValue: val})
    }
  }

  handleChange = (newValue, {action}) => {
    const {handleOnChange, config = {}} = this.props
    const {name = null, typeahead = {}, stringify, multi} = config
    let {delimiter, delimit} = config
    if (typeof delimit === 'string') delimit = [delimit]
    if (delimiter && typeof delimiter !== 'string') delimiter = '¤'
    const {fields = []} = typeahead
    let target = {
      name: name,
      value: (action === 'create-option' && !config.multi) ? newValue.value : newValue
    }

    switch (action) {
      case 'create-option':
        this.emptyFields(fields, handleOnChange)
        handleOnChange({target})
        return
      case 'clear': {
        if ((!newValue && (!this.state.inputValue || this.state.inputValue.length)) || multi) {
          this.emptyFields(fields, handleOnChange)
          handleOnChange({target: {name, value: ''}})
        }
        return
      }
    }

    let value = ''
    if (Array.isArray(newValue)) {
      // it is way too complicated to try to figure out what you want to do with a multiselect typeahead
      // so I'll give it back to the developer raw and let them figure it out -- JRA 7/5/2018
      if (stringify) {
        if (delimiter) {
          if (delimit && Array.isArray(delimit)) {
            // if we were provided field(s) to delimit by, build up a special string with just those values
            target.value.forEach(option => {
              delimit.forEach(field => {
                if (value.indexOf(option[field]) === -1) {
                  value = value + option[field] + delimiter
                }
              })
            })
            value = value.slice(0, -1)
            target.value = value
          } else {
            // if we are supposed to delimit these options but we don't know which field to delimit, we are going to shove the whole object in
            target.value.forEach(option => {
              value = value + JSON.stringify(option) + delimiter
            })
            value = value.slice(0, -1)
            target.value = value
          }
        } else if (delimit && !delimiter) {
          // special case where they decided to delimit by some field but don't have a delimiter, we are going to build it up as a stringified array
          value = []
          target.value.forEach(option => {
            delimit.forEach(field => {
              if (value.indexOf(option[field]) === -1) {
                value.push(option[field])
              }
            })
          })
          value = JSON.stringify(value)
          target.value = value
        } else {
          // if all we want to do is stringify the value, send it back up unmodified but stringified
          target.value = JSON.stringify(target.value)
        }
      } else if (delimit && !delimiter) {
        // special case where they decided to delimit by some field but don't have a delimiter, we are going to build it up as an array
        value = []
        target.value.forEach(option => {
          delimit.forEach(field => {
            if (value.indexOf(option[field]) === -1) {
              value.push(option[field])
            }
          })
        })
        target.value = value
      }

      handleOnChange({target})
    } else {
      this.handleSingleValueChange(newValue)
    }
    this.setState({menuIsOpen: false}) // closes menu when new option gets selected
  }

  handleSingleValueChange = newValue => {
    const {handleOnChange} = this.props
    Object.keys(newValue).forEach(field => {
      let value = newValue[field]
      if (field === 'duplication') value = newValue.value
      let id = null
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
    const {config = {}, formValues = Map()} = this.props
    const {name = null, typeahead = {}} = config
    let {key = null, duplication = false, fieldvalue = null} = typeahead
    let {filter = {}} = typeahead

    if (!key && !fieldvalue) {
      // eslint-disable-next-line
      console.error(`The JSON schema representation for ${name} does not have a typeahead key or a fieldvalue. A typeahead.key is required for this field type to search for results. This can either be specified directly as config.typeahead.key or it can equal the value of another field by specifying config.typeahead.{name of field}`)
      return Promise.resolve({options: []})
    }

    filter = JSON.parse(JSON.stringify(filter)) // deep clone the object as to not mutate the definition
    this.populateFilterBody(filter)

    if (formValues.get(fieldvalue, '')) key = formValues.get(fieldvalue, '')

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
          return results
        })
    }

    return Promise.resolve({options: []})
  }

  handleOnFocus = () => {
    const {config = {}, formValues = Map()} = this.props
    const {persist = true, name = null} = config
    let value = formValues.get(name, '') || ''
    value = typeof value.toJS === 'function' ? value.toJS() : value
    value = typeof value === 'object' ? value.value || value.label || '' : value
    if (persist) {
      // this is done to place cursor at the end of the input field
      this.setState({inputValue: ''}, () => this.setState({inputValue: value}))
    }
  }

  convertValueStringToValueArrayIfNeeded = value => {
    const {config = {}} = this.props
    const {multi = false, stringify = false, name} = config
    let {delimiter} = config
    if (delimiter && typeof delimiter !== 'string') delimiter = '¤'
    const attemptConvertStringObjectToObject = string => {
      try {
        return JSON.parse(string)
      } catch (e) {
        return string
      }
    }
    if (multi && stringify && value && typeof value === 'string') {
      if (delimiter) {
        value = value.split(delimiter)
        value = value.map(option => attemptConvertStringObjectToObject(option))
      } else {
        try {
          value = JSON.parse(value)
        } catch (e) {
          // eslint-disable-next-line
          console.error('The typeahead field >>', name, '<< attempted to JSON parse >>', value, '<< into an array but the string is not proper JSON. This is a no-op which will cause this typeahead to start with no values.')
          value = []
        }
      }
    }
    return value
  }

  handleLinkClick = () => {
    const {config = {}, handleLinkClick} = this.props
    const {link} = config
    handleLinkClick(link)
  }

  setInputFieldPosition = () => {
    if (this.state.fieldPosition !== this.inputContainer.getBoundingClientRect().top) {
      this.setState({fieldPosition: this.inputContainer.getBoundingClientRect().top})
    } else {
      this.setMenuOpenPosition()
    }
  }

  setMenuOpenPosition = () => {
    const menuPlacement = this.state.fieldPosition < (viewPortHeight / 2) ? 'bottom' : 'top'
    this.setState({menuPlacement}, () => this.setState({menuIsOpen: true}))
  }

  render = () => {
    const {
      inline,
      formValues = Map(),
      config = {},
      Icon = null,
      requiredWarning,
      connectDropTarget,
      cascadingKeyword,
      CascadeIcon,
      tabIndex,
      taMaxHeight = '29px',
      LinkIcon
    } = this.props
    const {inputValue, menuIsOpen, menuPlacement} = this.state
    const {name = null, required = false, multi = false, onKeyDown = () => null, allowcreate = false, link} = config
    let {labelStyle = {}, style = {}, containerStyle = {}, iconStyle = {}, menuStyle = {}} = config
    containerStyle = typeof containerStyle === 'string' ? JSON.parse(containerStyle) : containerStyle
    labelStyle = typeof labelStyle === 'string' ? JSON.parse(labelStyle) : labelStyle
    menuStyle = typeof menuStyle === 'string' ? JSON.parse(menuStyle) : menuStyle
    style = typeof style === 'string' ? JSON.parse(style) : style
    iconStyle = typeof iconStyle === 'string' ? JSON.parse(iconStyle) : iconStyle
    if (!name) return null
    const {label = name} = config
    let blankValue = {value: '', label: ''}
    let value = formValues.get(name, null)
    value = (value && typeof value.toJS === 'function') ? value.toJS() : value
    value = this.convertValueStringToValueArrayIfNeeded(value)
    if (Array.isArray(value) && value.length > 0) {
      value = value.map(v => {
        if (typeof v === 'object') return v
        if (typeof v === 'string' || typeof v === 'number') return {value: v, label: v}
      })
    }
    if ((typeof value === 'string' || typeof value === 'number') && value.length > 0) value = {value, label: value}
    const warn = requiredWarning && formValues.get(name, '').length === 0 && required
    let {readonly = false, disabled = false, placeholder = '', typeahead = {}} = config
    const {fieldvalue = null} = typeahead
    disabled = disabled || readonly
    if (fieldvalue !== null && String(formValues.get(fieldvalue, '')).length === 0) disabled = true
    const linkIconStyle = (link && typeof link.style === 'object') ? link.style : {}

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
      icon: {
        marginRight: 5,
        width: 15,
        height: 15,
        marginTop: inline ? 4 : 0,
        ...iconStyle
      },
      linkIconStyle
    }

    const selectStyles = {
      ...reactSelectStyles(),
      control: (base) => ({
        ...base,
        border: '1px solid #a0a0a0',
        borderRadius: '1px',
        height: '25px',
        minHeight: '25px',
        minWidth: '200px',
        ...style
      }),
      menu: (base) => ({
        ...base,
        borderRadius: '1px',
        margin: 0,
        ...menuStyle
      })
    }

    const multiSelectStyles = {
      ...reactSelectStyles(),
      control: (base) => ({
        ...base,
        border: '1px solid #a0a0a0',
        borderRadius: '1px',
        maxHeight: taMaxHeight,
        overflowY: 'scroll',
        minWidth: '200px'
      }),
      indicatorsContainer: (base) => {
        return {
          ...base,
          alignItems: 'flex-start'
        }
      },
      valueContainer: (base) => {
        return {
          ...base,
          padding: 0,
          paddingLeft: '4px'
        }
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
          <div
            style={styles.container}
            onMouseUp={this.handleAnywhereClick}
            onBlur={this.onMouseOut}
          >
            <div style={styles.labelContainer}>
              {required && (
                <div style={{color: '#ec1c24', fontWeight: 'bold', fontSize: '15pt', lineHeight: '10pt'}}>*</div>)}
              {Icon && <Icon style={styles.icon} />}
              <strong
                style={styles.label}
                onClick={
                  !!cascadingKeyword && !CascadeIcon ? this.handleCascadeKeywordClick
                    : link ? this.handleLinkClick : null
                }
                className={(!!cascadingKeyword && !CascadeIcon) || link ? 'cursor-hand' : ''}
              >
                {label}
              </strong>
              {!!cascadingKeyword && !!CascadeIcon && (
                <CascadeIcon onClick={this.handleCascadeKeywordClick} className='cursor-hand' />
              )}
              {!!link && !!LinkIcon && (
                <LinkIcon onClick={this.handleLinkClick} className='cursor-hand' style={styles.linkIconStyle} />
              )}
            </div>
            <div
              onMouseUp={this.handleInputClick}
              ref={r => { this.inputContainer = r }}
            >
              {allowcreate && <AsyncCreatable
                autoFocus={this.props.config.autofocus}
                blurInputOnSelect
                cacheOptions
                className={className}
                createOptionPosition='first'
                formatCreateLabel={val => `Click or Tab to Create "${val}"`}
                inputValue={inputValue}
                isClearable
                isDisabled={disabled}
                isMulti={multi}
                loadOptions={this.loadOptions}
                menuIsOpen={!isMobile ? menuIsOpen : undefined}
                menuPlacement={!isMobile ? menuPlacement : undefined}
                menuPortalTarget={document.body}
                menuShouldBlockScroll
                name={name}
                onChange={this.handleChange}
                onFocus={this.handleOnFocus}
                onInputChange={this.onInputChange}
                onKeyDown={onKeyDown}
                onMouseDown={this.onMouseDown}
                placeholder={placeholder}
                ref={r => { this.input = r }}
                styles={multi ? multiSelectStyles : selectStyles}
                tabIndex={tabIndex}
                value={(!inputValue && menuIsOpen && !multi) ? blankValue : value}
              />}
              {!allowcreate && <Async
                autoFocus={this.props.config.autofocus}
                blurInputOnSelect
                cacheOptions
                className={className}
                inputValue={inputValue}
                isClearable
                isDisabled={disabled}
                isMulti={multi}
                loadOptions={this.loadOptions}
                menuIsOpen={!isMobile ? menuIsOpen : undefined}
                menuPlacement={!isMobile ? menuPlacement : undefined}
                menuPortalTarget={document.body}
                menuShouldBlockScroll
                name={name}
                onChange={this.handleChange}
                onFocus={this.handleOnFocus}
                onInputChange={this.onInputChange}
                onKeyDown={onKeyDown}
                onMouseDown={this.onMouseDown}
                placeholder={placeholder}
                ref={r => { this.input = r }}
                styles={multi ? multiSelectStyles : selectStyles}
                tabIndex={tabIndex}
                value={(!inputValue && menuIsOpen && !multi) ? blankValue : value}
              />}
            </div>
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
