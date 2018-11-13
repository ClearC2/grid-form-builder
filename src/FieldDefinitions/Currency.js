import React, {Component} from 'react'
import {Map} from 'immutable'
import {DropTarget} from 'react-dnd'

class Currency extends Component {
  state = {
    alignRight: false
  }

  componentDidMount() {
    document.addEventListener('mousedown' , this.onMouseDown)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.onMouseDown)
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
    if (this.node.contains(e.target)) {
      this.setState({alignRight: false})
      return
    }

    this.setState({alignRight: true})
  }

  removeLeadingZeros = number => number.replace(/^0+([0-9]+)/, '$1')

  formatDollar = dollars => parseFloat(dollars).toLocaleString('en')

  addDecimalToNumber = number => {
    const centsStartingPosition = number.length - 2
    const dollars = this.removeLeadingZeros(number.substring(0, centsStartingPosition))
    const formattedDollar = this.formatDollar(dollars)
    const cents = number.substring(centsStartingPosition)
    
    return `${formattedDollar}.${cents}`
  }

  getDigitsFromValue = (value = '') => value.replace(/(-(?!\d))|[^0-9|-]/g, '') || ''

  padDigits = digits => {
    const desiredLength = 3
    const actualLength = digits.length

    if (actualLength >= desiredLength) {
      return digits
    }

    const amountToAdd = desiredLength - actualLength
    const padding = '0'.repeat(amountToAdd)

    return padding + digits
  }

  toCurrency = value => {
    const digits = this.getDigitsFromValue(value)
    const digitsWithPadding = this.padDigits(digits)

    return this.addDecimalToNumber(digitsWithPadding)
  }

  handleOnChange = val => {
    const {handleOnChange = () => null} = this.props
    const name = val.target.name
    const value = this.toCurrency(val.target.value)
    const e = {target: {name, value}}
    
    handleOnChange(e)
  }

  valueFormatter = value => value && ('$' + value )

  render = () => {
    const {inline, formValues = Map(), config = {}, Icon = null, requiredWarning, connectDropTarget, cascadingKeyword, CascadeIcon} = this.props
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

    placeholder = warn ? '* This Field Is Required' : placeholder
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
        paddingRight: 5,
        backgroundColor: disabled ? '#eee' : 'white',
        borderBottom: warn ? '1px solid #ec1c24' : '1px solid #a0a0a0',
        borderTop: inline ? 0 : warn ? '1px solid #ec1c24' : '1px solid #a0a0a0',
        borderLeft: inline ? 0 : warn ? '1px solid #ec1c24' : '1px solid #a0a0a0',
        borderRight: inline ? 0 : warn ? '1px solid #ec1c24' : '1px solid #a0a0a0',
        minWidth: 90,
        height: inline ? 'auto' : 25,
        textAlign: this.state.alignRight ? 'right' : 'left',
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
        <div style={styles.container} onMouseUp={this.handleAnywhereClick} ref={node => this.node = node}>
          <div style={styles.labelContainer}>
            {required && <div style={{color: '#ec1c24', fontWeight: 'bold', fontSize: '15pt', lineHeight: '10pt'}}>*</div>}
            {Icon && <Icon style={styles.icon} />}
            <strong style={styles.label} onClick={!!cascadingKeyword && !CascadeIcon ? this.handleCascadeKeywordClick : null} className={!!cascadingKeyword && !CascadeIcon ? 'cursor-hand' : ''}>{label}</strong>
            {!!cascadingKeyword && !!CascadeIcon && <CascadeIcon onClick={this.handleCascadeKeywordClick} className='cursor-hand' />}
          </div>
          <input
            className={className}
            placeholder={placeholder}
            onMouseDown={this.onMouseDown}
            onChange={this.handleOnChange}
            style={styles.input}
            type='text'
            pattern='\d*'
            name={name}
            value={this.valueFormatter(value)}
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

export default DropTarget('FormBuilderDraggable', boxTarget, collect)(Currency)
