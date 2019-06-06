import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Map} from 'immutable'
import {DropTarget} from 'react-dnd'

export class Checkbox extends Component {
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
    rowHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    LinkIcon: PropTypes.func,
    handleLinkClick: PropTypes.func
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

  handleOnChange = e => {
    const {formValues = Map(), handleOnChange = () => {}, config} = this.props
    const {name = null, onValue, offValue} = config
    let value = formValues.get(name, '0') // if the field value is undefined in the current form values, we are defaulting it to the c2 standard of a false string value of 0
    if (offValue && onValue) {
      if (value === offValue) value = onValue
      else if (value === onValue) value = offValue
      else value = onValue // could be dangerous, this says if you provided an on and off value but the current value isn't either one of them, make the action set this to the true value
    } else if (onValue) {
      if (this.falsey.indexOf(value) > -1) value = onValue
      else value = '' // put this weird check in to default off value to blank if only an onValue was provided
    } else if (offValue) {
      if (this.truthy.indexOf(value) > -1) value = offValue
      else value = '1'// put this weird check in to default on value to 1 if only an offValue was provided
    } else {
      switch (value) {
        case true: value = false; break
        case false: value = true; break
        case 0: value = 1; break
        case 1: value = 0; break
        case '0': value = '1'; break
        case '1': value = '0'; break
        case 'true': value = 'false'; break
        case 'false': value = 'true'; break
        case 'True': value = 'False'; break
        case 'False': value = 'True'; break
        case 'TRUE': value = 'FALSE'; break
        case 'FALSE': value = 'TRUE'; break
        case 't': value = 'f'; break
        case 'f': value = 't'; break
        case 'T': value = 'F'; break
        case 'F': value = 'T'; break
        case 'y': value = 'n'; break
        case 'n': value = 'y'; break
        case 'Y': value = 'N'; break
        case 'N': value = 'Y'; break
        case 'Yes': value = 'No'; break
        case 'No': value = 'Yes'; break
        case 'YES': value = 'NO'; break
        case 'NO': value = 'YES'; break
        case 'yes': value = 'no'; break
        case 'no': value = 'yes'; break
        case 'On': value = 'Off'; break
        case 'Off': value = 'On'; break
        case 'ON': value = 'OFF'; break
        case 'OFF': value = 'ON'; break
        case 'on': value = 'off'; break
        case 'off': value = 'on'; break
        case '': value = '1'; break // default the opposite of blank as '1'
        default: value = !!e.target.value
      }
    }
    handleOnChange({target: {name: e.target.name, value: value}})
  }

  truthy = [
    true,
    1,
    '1',
    't',
    'T',
    'true',
    'True',
    'TRUE',
    'y',
    'Y',
    'Yes',
    'YES',
    'yes',
    'on',
    'On',
    'ON',
    this.props.config.onValue || this.props.config.name
  ]

  falsey = [
    false,
    0,
    '0',
    'f',
    'F',
    'false',
    'False',
    'FALSE',
    'n',
    'N',
    'No',
    'NO',
    'no',
    'off',
    'Off',
    'OFF',
    this.props.config.offValue || ''
  ]

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
      rowHeight,
      connectDropTarget,
      cascadingKeyword,
      CascadeIcon,
      tabIndex,
      LinkIcon
    } = this.props
    const {name = null, iconStyle = {}, required = false, onKeyDown = () => null, link} = config
    let {labelStyle = {}, style = {}, containerStyle = {}} = config
    containerStyle = typeof containerStyle === 'string' ? JSON.parse(containerStyle) : containerStyle
    labelStyle = typeof labelStyle === 'string' ? JSON.parse(labelStyle) : labelStyle
    style = typeof style === 'string' ? JSON.parse(style) : style
    if (!name) return null
    const {label = name} = config
    let {readonly = false, disabled = false, placeholder = ''} = config
    disabled = disabled || readonly
    const warn = requiredWarning && formValues.get(name, '').length === 0 && required
    placeholder = warn ? 'This Field Is Required' : placeholder
    const linkIconStyle = (link && typeof link.style === 'object') ? link.style : {}

    const styles = {
      container: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        background: 'transparent',
        minWidth: 177,
        ...containerStyle
      },
      label: {
        display: 'flex',
        flex: 1,
        height: rowHeight || inline ? 27 : 40,
        margin: 0,
        marginBottom: inline ? 5 : 0,
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: inline ? '10pt' : '8pt',
        lineHeight: '10pt',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        color: !!cascadingKeyword && !CascadeIcon ? 'blue' : '#383e4b',
        ...labelStyle
      },
      input: {
        display: 'flex',
        marginRight: 5,
        marginTop: 0,
        ...style
      },
      icon: {
        marginRight: 5,
        width: 15,
        height: 15,
        marginTop: -1,
        ...iconStyle
      },
      linkIconStyle
    }

    let value = formValues.get(name, '')

    if (this.truthy.indexOf(value) > -1) value = true
    else if (this.falsey.indexOf(value) > -1) value = false
    else value = false

    return (
      connectDropTarget(
        <div style={styles.container} onMouseUp={this.handleAnywhereClick}>
          <label
            style={styles.label}
            onMouseUp={
              !!cascadingKeyword && !CascadeIcon ? this.handleCascadeKeywordClick
                : link ? this.handleLinkClick : null
            }
            className={(!!cascadingKeyword && !CascadeIcon) || link ? 'cursor-hand' : ''}
          >
            {Icon && <Icon style={styles.icon} />}
            <input
              className='checkbox-grid-input'
              onChange={this.handleOnChange}
              style={styles.input}
              type='checkbox'
              name={name}
              checked={value}
              disabled={disabled}
              onKeyDown={onKeyDown}
              tabIndex={tabIndex}
            />
            {label}
            <div style={{color: '#ec1c24', fontWeight: 'bold', fontSize: '15pt', lineHeight: '10pt'}}>
              {required && '*'}
              {placeholder && (
                <span
                  style={{
                    fontWeight: 'normal',
                    fontSize: '9pt',
                    color: warn ? '#ec1c24' : '#383e4b',
                    marginLeft: 5
                  }}
                >
                  {placeholder}
                </span>
              )}
            </div>
            {!!cascadingKeyword && !!CascadeIcon && (
              <CascadeIcon
                style={{marginLeft: 5}}
                size={14}
                onClick={this.handleCascadeKeywordClick}
                className='cursor-hand'
              />
            )}
            {!!link && !!LinkIcon && (
              <LinkIcon onClick={this.handleLinkClick} className='cursor-hand' style={styles.linkIconStyle} />
            )}
          </label>
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

export default DropTarget('FormBuilderDraggable', boxTarget, collect)(Checkbox)
