import React, {Component} from 'react'
import {Map} from 'immutable'
import {DropTarget} from 'react-dnd'

class Emailinput extends Component {
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

  emailValidation = (email) => {
    // https://www.mailboxvalidator.com/resources/articles/acceptable-email-address-syntax-rfc/
    const emailInput = email.split('@')
    const emailLocal = emailInput[0]

    // email does not contain "@" or is greater than 64 characters
    if (emailInput.length === 1 || emailLocal.length > 64) {
      return false
    }

    // validating local part of the email
    if (
      (emailLocal.includes('..')) ||
      (emailLocal.length < 1) ||
      (emailLocal[0] === '.') ||
      (emailLocal[emailLocal.length - 1] === '.')
    ) {
      return false
    }

    const emailDomain = emailInput[1].split('.')

    // domain part of the email does not contain "." or is greater than 255 characters
    if (emailDomain.length === 1 || emailDomain[0].length > 255) {
      return false
    }

    const emailDomainBeginning = emailDomain[0]
    const emailDomainEnding = emailDomain[1]

    // validating domain part of the email
    if (
      (emailDomainBeginning.match(/^[0-9]+$/)) ||
      (emailDomainEnding.match(/^[0-9]+$/)) ||
      (emailDomainBeginning.length < 1) ||
      (emailDomainEnding.length < 2) ||
      (emailDomainBeginning[0] === '-') ||
      (emailDomainEnding[emailDomainEnding.length - 1] === '-')
    ) {
      return false
    }

    return true
  }

  generateValidationError = value => {
    return !this.emailValidation(value) && '* The field Email is not in a valid format. The field contents must follow email address standards'
  }

  handleOnChange = () => {}

  render = () => {
    const {inline, formValues = Map(), handleOnChange = this.handleOnChange, config = {}, Icon = null, requiredWarning, connectDropTarget, cascadingKeyword, CascadeIcon} = this.props
    const {name = null, required = false, onKeyDown = () => null} = config
    if (!name) return null
    let {labelStyle = {}, style = {}, containerStyle = {}, iconStyle = {}} = config
    containerStyle = typeof containerStyle === 'string' ? JSON.parse(containerStyle) : containerStyle
    labelStyle = typeof labelStyle === 'string' ? JSON.parse(labelStyle) : labelStyle
    style = typeof style === 'string' ? JSON.parse(style) : style
    iconStyle = typeof iconStyle === 'string' ? JSON.parse(iconStyle) : iconStyle
    const {label = name} = config
    const value = formValues.get(name, '')
    const warn = requiredWarning && formValues.get(name, '').length === 0 && required
    let {readonly = false, disabled = false, placeholder = ''} = config
    disabled = disabled || readonly

    placeholder = warn ? this.generateValidationError(value) : placeholder
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
      },
      placeholder: {
        fontWeight: 'normal',
        fontSize: '9pt',
        marginLeft: 3,
        marginTop: -1,
        color: !this.emailValidation(value) && '#ec1c24',
        marginRight: 5
      }
    }

    return (
      connectDropTarget(
        <div style={styles.container} onMouseUp={this.handleAnywhereClick}>
          <div style={styles.labelContainer}>
            {required && <div style={{color: '#ec1c24', fontWeight: 'bold', fontSize: '15pt', lineHeight: '10pt'}}>*</div>}
            {Icon && <Icon style={styles.icon} />}
            <strong style={styles.label} onClick={!!cascadingKeyword && !CascadeIcon ? this.handleCascadeKeywordClick : null} className={!!cascadingKeyword && !CascadeIcon ? 'cursor-hand' : ''}>{label}</strong>
            {value !== '' && <span style={styles.placeholder}>{this.generateValidationError(value)}</span>}
            {!!cascadingKeyword && !!CascadeIcon && <CascadeIcon onClick={this.handleCascadeKeywordClick} className='cursor-hand' />}
          </div>
          <input
            className={className}
            placeholder={placeholder}
            onMouseDown={this.onMouseDown}
            onChange={handleOnChange}
            style={styles.input}
            type='text'
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

export default DropTarget('FormBuilderDraggable', boxTarget, collect)(Emailinput)
