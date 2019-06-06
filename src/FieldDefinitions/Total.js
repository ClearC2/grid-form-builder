import React, {Component} from 'react'
import {Map} from 'immutable'
import {DropTarget} from 'react-dnd'
import hoistNonReactStatic from 'hoist-non-react-statics'
import PropTypes from 'prop-types'

class Total extends Component {
  static propTypes = {
    formValues: PropTypes.object,
    config: PropTypes.object,
    didDrop: PropTypes.bool,
    isOver: PropTypes.bool,
    droppedItem: PropTypes.object,
    handleDragDropOnInput: PropTypes.func,
    handleAnywhereClick: PropTypes.func,
    handleCascadeKeywordClick: PropTypes.func,
    handleOnChange: PropTypes.func,
    draggable: PropTypes.bool,
    inline: PropTypes.bool,
    Icon: PropTypes.node,
    requiredWarning: PropTypes.bool,
    connectDropTarget: PropTypes.func,
    cascadingKeyword: PropTypes.string,
    CascadeIcon: PropTypes.func,
    tabIndex: PropTypes.number,
    LinkIcon: PropTypes.func,
    handleLinkClick: PropTypes.func
  }

  static calculatePriceTimesDiscount = (props) => {
    const {formValues} = props
    const priceString = String(formValues.get('price') || '').replace(/,/g, '')
    const price = Total.toNumber(priceString)
    const discountString = String(formValues.get('discount') || '').replace(/%/g, '')
    let discount = Total.toNumber(discountString)
    const quantityString = String(formValues.get('quantity') || '').replace(/,/g, '')
    const quantity = Total.toNumber(quantityString)
    return (quantity * price) - (quantity * discount)
  }
  static calculateNumericValue = (props) => {
    const {fields = [], formula} = props.config
    if (formula === '(quantity x price) - (quantity x discount)') {
      return Total.calculatePriceTimesDiscount(props)
    }
    let total = 0
    fields.forEach(field => {
      let value = String(props.formValues.get(field) || '').replace(/,/g, '')
      total += Total.toNumber(value)
    })
    return total
  }
  static toNumber (value) {
    value = Number(value)
    return isNaN(value) ? 0 : value
  }
  static formatNumber (value) {
    return this
      .toNumber(value)
      .toLocaleString('en', {
        style: 'currency',
        currency: 'USD'
      })
  }

  componentDidMount () {
    document.addEventListener('mousedown', this.onMouseDown)
  }

  componentWillUnmount () {
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
  }

  getInputValue = () => {
    const value = Total.calculateNumericValue(this.props)
    return Total.formatNumber(value)
  }

  handleLinkClick = () => {
    const {config = {}, handleLinkClick} = this.props
    const {link} = config
    handleLinkClick(link)
  }

  render = () => {
    const {
      inline,
      formValues = Map(),
      config = {},
      Icon = null,
      requiredWarning,
      connectDropTarget,
      LinkIcon
    } = this.props

    const {
      name = null,
      label,
      required = false,
      onKeyDown = () => null,
      link
    } = config

    if (!name) return null

    let {
      labelStyle = {},
      style = {},
      containerStyle = {},
      iconStyle = {},
      placeholder = ''
    } = config

    containerStyle = typeof containerStyle === 'string' ? JSON.parse(containerStyle) : containerStyle
    labelStyle = typeof labelStyle === 'string' ? JSON.parse(labelStyle) : labelStyle
    style = typeof style === 'string' ? JSON.parse(style) : style
    iconStyle = typeof iconStyle === 'string' ? JSON.parse(iconStyle) : iconStyle
    const warn = requiredWarning && formValues.get(name, '').length === 0 && required

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
        color: '#383e4b',
        background: 'transparent',
        marginRight: 5,
        ...labelStyle
      },
      input: {
        display: 'flex',
        flexGrow: inline ? 1 : 0,
        paddingRight: 5,
        backgroundColor: '#eee',
        borderBottom: warn ? '1px solid #ec1c24' : '1px solid #a0a0a0',
        borderTop: inline ? 0 : warn ? '1px solid #ec1c24' : '1px solid #a0a0a0',
        borderLeft: inline ? 0 : warn ? '1px solid #ec1c24' : '1px solid #a0a0a0',
        borderRight: inline ? 0 : warn ? '1px solid #ec1c24' : '1px solid #a0a0a0',
        minWidth: 90,
        height: inline ? 'auto' : 25,
        textAlign: 'right',
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
        <div
          style={styles.container}
          onMouseUp={this.handleAnywhereClick}
          ref={node => { this.node = node }}
        >
          <div style={styles.labelContainer}>
            {required && (
              <div
                style={{
                  color: '#ec1c24',
                  fontWeight: 'bold',
                  fontSize: '15pt',
                  lineHeight: '10pt'
                }}
              >
                *
              </div>
            )}
            {Icon && <Icon style={styles.icon} />}
            <strong
              style={styles.label}
              onClick={link ? this.handleLinkClick : null}
              className={link ? 'cursor-hand' : ''}
            >
              {label}
            </strong>
            {!!link && !!LinkIcon && (
              <LinkIcon onClick={this.handleLinkClick} className='cursor-hand' />
            )}
          </div>
          <input
            className={className}
            placeholder={placeholder}
            onMouseDown={this.onMouseDown}
            onChange={() => {}}
            style={styles.input}
            type='text'
            pattern='\d*'
            name={name}
            value={this.getInputValue()}
            disabled
            onKeyDown={onKeyDown}
            data-testid={`${name}-input`}
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

const ConnectedTotal = DropTarget('FormBuilderDraggable', boxTarget, collect)(Total)

hoistNonReactStatic(ConnectedTotal, Total)

export default ConnectedTotal
