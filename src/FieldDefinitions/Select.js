import React, {Component} from 'react'
import {Map} from 'immutable'
import PropTypes from 'prop-types'
import ReactSelect from 'react-select'
import {DropTarget} from 'react-dnd'
import {reactSelectStyles} from '../react-select-style'
import {isMobile} from '../utils'

const viewPortHeight = document.documentElement.clientHeight

export class Select extends Component {
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
    fieldPosition: 0,
    fieldValues: [],
    menuIsOpen: false,
    menuPlacement: 'bottom'
  }

  componentDidUpdate = (p, s) => {
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
      this.setInputFieldPosition(this.input)
    }
  }

  onMouseOut = () => this.setState({menuPlacement: 'top', menuIsOpen: false})

  handleCascadeKeywordClick = e => {
    const {handleCascadeKeywordClick = () => null, formValues = Map()} = this.props
    let {config = {}} = this.props
    const currentValue = formValues.get(config.name, '')
    config = {currentValue, ...config}
    handleCascadeKeywordClick(config)
  }

  handleOnChange = () => {}

  onChange = e => {
    const {config = {}, handleOnChange = this.handleOnChange} = this.props
    const {name = null} = config
    const value = e === null ? e = '' : e.value
    this.setState({menuIsOpen: false})
    handleOnChange({
      target: {
        name,
        value
      }
    })
  }

  getValue = (value, options) => {
    if (value) {
      const keyMap = options.reduce((acc, cv) => {
        acc[cv.value] = cv.label
        return acc
      }, {})

      return {label: keyMap[value], value}
    }
  }

  handleLinkClick = () => {
    const {config = {}, handleLinkClick} = this.props
    const {link} = config
    handleLinkClick(link)
  }

  setInputFieldPosition = () => {
    if (this.state.fieldPosition !== this.input.getBoundingClientRect().top) {
      this.setState({fieldPosition: this.input.getBoundingClientRect().top})
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
      LinkIcon
    } = this.props
    const {name = null, required = false, onKeyDown = () => null, link} = config
    let {labelStyle = {}, style = {}, containerStyle = {}, iconStyle = {}, keyword = {}} = config
    containerStyle = typeof containerStyle === 'string' ? JSON.parse(containerStyle) : containerStyle
    labelStyle = typeof labelStyle === 'string' ? JSON.parse(labelStyle) : labelStyle
    style = typeof style === 'string' ? JSON.parse(style) : style
    iconStyle = typeof iconStyle === 'string' ? JSON.parse(iconStyle) : iconStyle
    if (!name) return null
    const {label = name} = config
    const warn = requiredWarning && this.state.fieldValues.length === 0 && required
    let {readonly = false, disabled = false, placeholder = ''} = config
    disabled = disabled || readonly
    const {options = []} = keyword
    let value = formValues.get(name, '')
    value = typeof value === 'string' ? this.getValue(value, options) : value
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
        marginTop: inline ? 3 : -1,
        ...iconStyle
      },
      linkIconStyle
    }

    const inputStyles = {
      ...reactSelectStyles(),
      control: (base) => ({
        ...base,
        border: '1px solid #a0a0a0',
        borderRadius: '1px',
        height: inline ? 'auto' : 25,
        minHeight: '25px',
        minWidth: '200px',
        ...style
      })
    }

    let className = warn ? 'warn-required' : ''
    placeholder = warn ? '* This Field Is Required' : placeholder
    let clearable = true
    if (config.clearable === false) {
      clearable = false
    }
    return (
      connectDropTarget(
        <div
          style={styles.container}
          ref={r => { this.input = r }}
          onMouseUp={this.handleAnywhereClick}
          onBlur={this.onMouseOut}
        >
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
          <ReactSelect
            autoFocus={this.props.config.autofocus}
            className={className}
            isClearable={clearable}
            isDisabled={disabled}
            menuIsOpen={!isMobile ? this.state.menuIsOpen : undefined}
            menuPlacement={!isMobile ? this.state.menuPlacement : undefined}
            menuShouldBlockScroll
            menuPortalTarget={document.body}
            name={name}
            onChange={this.onChange}
            onKeyDown={onKeyDown}
            options={options}
            placeholder={placeholder}
            styles={inputStyles}
            tabIndex={tabIndex}
            value={value}
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

export default DropTarget('FormBuilderDraggable', boxTarget, collect)(Select)
