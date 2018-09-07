import React, {Component} from 'react'
import {Map} from 'immutable'
import {DropTarget} from 'react-dnd'

class Input extends Component {
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

  handleAnywhereClick = () => {
    const {handleAnywhereClick = () => null, formValues = Map()} = this.props
    let {config = {}} = this.props
    const currentValue = formValues.get(config.name, '')
    config = {currentValue, ...config}
    handleAnywhereClick(config)
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

  validate = (value, validation) => {
    const lowerBound = validation.hasOwnProperty('lowerBound') && validation.lowerBound
    const upperBound = validation.hasOwnProperty('upperBound') && validation.upperBound

    if (lowerBound !== false && upperBound !== false) {
      if (value >= lowerBound && value <= upperBound) {
        return true
      }
    } else if (lowerBound !== false && value >= lowerBound) {
      return true
    } else if (upperBound !== false && value <= upperBound) {
      return true
    }

    return false
  }

  getWarningMessage = validation => {
    const lowerBound = validation.hasOwnProperty('lowerBound') && validation.lowerBound
    const upperBound = validation.hasOwnProperty('upperBound') && validation.upperBound

    if (lowerBound !== false && upperBound !== false) {
      return `* Value must be between ${lowerBound} and ${upperBound}`
    } else if (lowerBound !== false) {
      return `* Value must be greater than or equal to ${lowerBound}`
    } else if (upperBound !== false) {
      return `* Value must be less than or equal to ${upperBound}`
    } else {
      return '* This Field Is Required'
    }
  }

  render = () => {
    const {inline, formValues = Map(), handleOnChange = () => {}, config = {}, Icon = null, requiredWarning, connectDropTarget, cascadingKeyword, CascadeIcon} = this.props
    const {name = null, required = false, validation = {}, onKeyDown = () => null} = config
    let {labelStyle = {}, style = {}, containerStyle = {}, iconStyle = {}} = config
    containerStyle = typeof containerStyle === 'string' ? JSON.parse(containerStyle) : containerStyle
    labelStyle = typeof labelStyle === 'string' ? JSON.parse(labelStyle) : labelStyle
    style = typeof style === 'string' ? JSON.parse(style) : style
    iconStyle = typeof iconStyle === 'string' ? JSON.parse(iconStyle) : iconStyle
    if (!name) return null
    const {label = name} = config
    const value = formValues.get(name, '')
    const validateValue = Object.keys(validation).length > 0
    const validValue = validateValue ? this.validate(value, validation) : true
    const warn = requiredWarning && (required || validateValue) && ((!validValue && value.length > 0) || (required && value.length === 0))
    let {readonly = false, disabled = false, placeholder = ''} = config
    disabled = disabled || readonly

    placeholder = warn ? this.getWarningMessage(validation) : placeholder
    const className = warn ? 'warn-required' : ''

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
        color: !!cascadingKeyword && !CascadeIcon ? 'blue' : '#383e4b',
        background: 'transparent',
        marginRight: 5,
        ...labelStyle
      },
      input: {
        display: 'flex',
        flexGrow: inline ? 1 : 0,
        paddingLeft: 5,
        backgroundColor: disabled ? '#eee' : 'white',
        borderBottom: warn ? '1px solid #ec1c24' : '1px solid #a0a0a0',
        borderTop: inline ? 0 : warn ? '1px solid #ec1c24' : '1px solid #a0a0a0',
        borderLeft: inline ? 0 : warn ? '1px solid #ec1c24' : '1px solid #a0a0a0',
        borderRight: inline ? 0 : warn ? '1px solid #ec1c24' : '1px solid #a0a0a0',
        minWidth: 90,
        height: inline ? 'auto' : 25,
        ...style
      },
      icon: {
        marginRight: 5,
        width: 15,
        height: 15,
        marginTop: inline ? 4 : -1,
        ...iconStyle
      }
    }

    return (
      connectDropTarget(
        <div style={styles.container} onMouseUp={this.handleAnywhereClick}>
          <div style={styles.labelContainer}>
            {required && <div style={{color: '#ec1c24', fontWeight: 'bold', fontSize: '15pt', lineHeight: '10pt'}}>*</div>}
            {Icon && <Icon style={styles.icon} />}
            <strong style={styles.label} onClick={!!cascadingKeyword && !CascadeIcon ? this.handleCascadeKeywordClick : null} className={!!cascadingKeyword && !CascadeIcon ? 'cursor-hand' : ''}>{label}</strong>
            {value !== '' && <span style={{fontWeight: 'normal', fontSize: '9pt', marginLeft: 3, marginTop: -1, color: warn ? '#ec1c24' : '#383e4b', marginRight: 5}}>{placeholder}</span>}
            {!!cascadingKeyword && !!CascadeIcon && <CascadeIcon onClick={this.handleCascadeKeywordClick} className='cursor-hand' />}
          </div>
          <input
            className={className}
            placeholder={placeholder}
            onMouseDown={this.onMouseDown}
            onChange={handleOnChange}
            style={styles.input}
            type='number'
            name={name}
            value={value}
            disabled={disabled}
            onKeyDown={onKeyDown}
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

export default DropTarget('FormBuilderDraggable', boxTarget, collect)(Input)