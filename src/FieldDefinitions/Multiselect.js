import React, {Component} from 'react'
import {List, fromJS, Map} from 'immutable'
import ReactSelect from 'react-select'
import {DropTarget} from 'react-dnd'
import {reactSelectStyles} from '../react-select-style'

export class Multiselect extends Component {
  state = {
    fieldValues: [],
    builtOptions: [],
  }

  static getDerivedStateFromProps(prevProps) {
    const {config = {}} = prevProps
    const {keyword = {}} = config
    const {options = []} = keyword
    let incomingValues = prevProps.formValues.get(prevProps.config.name, '')
    if (incomingValues instanceof Map) {
      incomingValues = prevProps.formValues.get(prevProps.config.name, Map())
      if (incomingValues instanceof Map) {
        incomingValues = incomingValues.get('values', [])
        if (incomingValues instanceof List) {
          incomingValues = incomingValues.toJS()
        }
      }
    }
    if (typeof incomingValues === 'string') incomingValues = incomingValues.split('¤')
    if (Array.isArray(incomingValues) || incomingValues instanceof List) {
      incomingValues = incomingValues.map(value => {
        if (typeof value === 'string' && value !== '') {
          return {
            label: value,
            value
          }
        } else {
          if (typeof value.toJS === 'function') value = value.toJS()
          return value
        }
      })
    }
    if (typeof incomingValues.toJS === 'function') {
      incomingValues = incomingValues.toJS()
    }

    return {
      fieldValues: incomingValues || [],
      builtOptions: options
    }

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

  onChange = (e) => {
    this.setState({fieldValues: e})
    if (e.length === 0) {
      this.props.handleOnChange({target: {name: this.props.config.name, value: ''}})
    } else {
      if (this.props.conditionalSearch) {
        this.props.handleOnChange({target: {name: this.props.config.name, value: fromJS({condition: 'is one of', values: List(e.map(val => val.value))})}})
      } else {
        this.props.handleOnChange({target: {name: this.props.config.name, value: fromJS(e.map(val => val.value))}})
      }
    }
  }

  render = () => {
    const {inline, config = {}, Icon = null, requiredWarning, connectDropTarget, cascadingKeyword, CascadeIcon, tabIndex} = this.props
    const {name = null, required = false, multi = true, onKeyDown = () => null} = config
    let {labelStyle = {}, style = {}, containerStyle = {}, iconStyle = {}} = config
    containerStyle = typeof containerStyle === 'string' ? JSON.parse(containerStyle) : containerStyle
    labelStyle = typeof labelStyle === 'string' ? JSON.parse(labelStyle) : labelStyle
    style = typeof style === 'string' ? JSON.parse(style) : style
    iconStyle = typeof iconStyle === 'string' ? JSON.parse(iconStyle) : iconStyle
    if (!name) return null
    const {label = name} = config
    const warn = requiredWarning && this.state.fieldValues.length === 0 && required
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
      icon: {
        marginRight: 5,
        width: 15,
        height: 15,
        marginTop: inline ? 3 : -1,
        ...iconStyle
      }
    }

    const inputStyles = {
      input: (base) => ({
        ...base,
        height: inline ? 'auto' : 25,
        marginBottom: '10px',
        minWidth: 170,
        ...style
      })
    }

    let className = inline ? `select-grid-input select-grid-input-inline` : `select-grid-input`
    className = !warn ? className : className + ' warn-required'
    placeholder = warn ? '* This Field Is Required' : placeholder
    return (
      connectDropTarget(
        <div style={styles.container} onMouseUp={this.handleAnywhereClick}>
          <div style={styles.labelContainer}>
            {required && <div style={{color: '#ec1c24', fontWeight: 'bold', fontSize: '15pt', lineHeight: '10pt'}}>*</div>}
            {Icon && <Icon style={styles.icon} />}
            <strong style={styles.label} onClick={!!cascadingKeyword && !CascadeIcon ? this.handleCascadeKeywordClick : null} className={!!cascadingKeyword && !CascadeIcon ? 'cursor-hand' : ''}>{label}</strong>
            {!!cascadingKeyword && !!CascadeIcon && <CascadeIcon onClick={this.handleCascadeKeywordClick} className='cursor-hand' />}
          </div>
          <ReactSelect
            className={className}
            isDisabled={disabled}
            isMulti={multi}
            name={name}
            onChange={this.onChange}
            onKeyDown={onKeyDown}
            options={this.state.builtOptions}
            placeholder={placeholder}
            styles={{...reactSelectStyles(), ...inputStyles}}
            tabIndex={tabIndex}
            value={this.state.fieldValues}
          />
        </div>
      )
    )
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

export default DropTarget('FormBuilderDraggable', boxTarget, collect)(Multiselect)
