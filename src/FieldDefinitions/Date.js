import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Map} from 'immutable'

import moment from 'moment'
import {DropTarget} from 'react-dnd'
import Datetime from './Datetime/Datetime'
// https://github.com/moment/moment/issues/3488
moment.suppressDeprecationWarnings = true

export class Date extends Component {
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
    Icon: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    requiredWarning: PropTypes.bool,
    connectDropTarget: PropTypes.func,
    cascadingKeyword: PropTypes.string,
    CascadeIcon: PropTypes.func,
    tabIndex: PropTypes.number,
    LinkIcon: PropTypes.func,
    handleLinkClick: PropTypes.func
  }

  state = {
    focus: true,
    value: ''
  }

  handleValueUpdated = (value, format) => {
    const {handleOnChange, config = {}} = this.props
    const {name = null} = config
    value = (format && moment(value).isValid()) ? moment(value).format('M/D/YYYY') : value

    if (moment(value).isValid()) {
      handleOnChange({
        target: {
          name,
          value
        }
      })
    }
    this.setState(() => ({value, focus: format}))
  }

  componentDidMount = () => {
    const {formValues = Map(), config = {}} = this.props
    const {name = null} = config
    const value = formValues.get(name, '')
    this.handleValueUpdated(value, true)
  }

  componentDidUpdate = p => {
    const {didDrop, isOver, formValues: fV = Map(), config: c = {}} = this.props
    const {name: n = null} = c
    const {formValues = Map(), config = {}} = p
    const {name = null} = config
    const v = fV.get(n, '')
    const value = formValues.get(name, '')

    if (v !== value) {
      this.handleValueUpdated(v, true)
    }
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
    if (e &&
      e.target &&
      (e.target.className === 'rdtSwitch' ||
      e.target.className === 'dow') &&
      !!this.input) {
      setTimeout(() => { this.input.focus() }, 0)
    }
    handleAnywhereClick(config, e)
  }

  handleCascadeKeywordClick = e => {
    const {handleCascadeKeywordClick = () => null, formValues = Map()} = this.props
    let {config = {}} = this.props
    const currentValue = formValues.get(config.name, '')
    config = {currentValue, ...config}
    handleCascadeKeywordClick(config)
  }

  handleChange = val => {
    if (typeof val === 'string') {
      this.setState(() => ({focus: false}))
    }
    this.handleValueUpdated(val, true)
  }

  onMouseDown = e => {
    if (this.props.draggable) e.stopPropagation()
  }

  debounceBlur = null

  handleOnBlur = () => {
    if (!this.state.focus) {
      clearTimeout(this.debounceBlur)
      this.debounceBlur = setTimeout(() => {
        let {value} = this.state
        const {config = {}, formValues = Map()} = this.props
        const {name = null} = config
        if (typeof value.format === 'function') {
          value = value.format('M/D/YYYY')
        }
        if (!moment(value).isValid()) {
          const value = formValues.get(name, '')
          this.handleValueUpdated(value, true)
        }
      }, 250)
    }
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
      cascadingKeyword,
      CascadeIcon,
      LinkIcon
    } = this.props
    const {name = null, required = false, onKeyDown = () => null, link} = config
    let {labelStyle = {}, style = {}, containerStyle = {}, iconStyle = {}} = config
    containerStyle = typeof containerStyle === 'string' ? JSON.parse(containerStyle) : containerStyle
    labelStyle = typeof labelStyle === 'string' ? JSON.parse(labelStyle) : labelStyle
    style = typeof style === 'string' ? JSON.parse(style) : style
    iconStyle = typeof iconStyle === 'string' ? JSON.parse(iconStyle) : iconStyle
    if (!name) return null
    const {label = name} = config
    const warn = requiredWarning && formValues.get(name, '').length === 0 && required
    let {readonly = false, disabled = false, placeholder = ''} = config
    disabled = disabled || readonly
    const linkIconStyle = (link && typeof link.style === 'object') ? link.style : {}

    const styles = {
      container: {
        display: 'flex',
        flex: 1,
        flexDirection: inline ? 'row' : 'column',
        background: 'transparent',
        paddingBottom: 5,
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
        color: !!cascadingKeyword && !CascadeIcon ? 'blue' : '#383e4b',
        marginRight: 5,
        ...labelStyle
      },
      icon: {
        marginRight: 5,
        width: 15,
        height: 15,
        marginTop: inline ? 3 : -1,
        ...iconStyle
      },
      linkIconStyle
    }

    let className = inline ? `date-wrapper-grid-input date-wrapper-grid-input-inline` : `date-wrapper-grid-input`
    className = !warn ? className : className + ' warn-required'
    const inputClass = warn ? 'warn-required' : ''
    placeholder = warn ? '* This Field Is Required' : placeholder

    return (
      connectDropTarget(
        <div style={styles.container} onMouseUp={this.handleAnywhereClick}>
          <div style={styles.labelContainer}>
            {required && (
              <div style={{color: '#ec1c24', fontWeight: 'bold', fontSize: '15pt', lineHeight: '10pt'}}>*</div>
            )}
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
          <Datetime
            className={className}
            closeOnSelect
            dateFormat='M/D/YYYY'
            disabled={disabled}
            handleDateChange={this.handleChange}
            inputClassName={inputClass}
            onBlur={this.handleOnBlur}
            onBlurCapture={this.handleOnBlur}
            onKeyDown={onKeyDown}
            onMouseDown={this.onMouseDown}
            placeholder={placeholder}
            inputStyles={style}
            ref={ref => { this.input = ref }}
            timeFormat={false}
            value={this.state.value}
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

export default DropTarget('FormBuilderDraggable', boxTarget, collect)(Date)
