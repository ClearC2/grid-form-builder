import React, {Component} from 'react'
import {Map, List, fromJS} from 'immutable'
import {DropTarget} from 'react-dnd'
import PropTypes from 'prop-types'

// this component is designed to return a List() of selected values to the forms handle change function
export class Listselect extends Component {
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

  constructor (props) {
    super(props)
    let incomingValues = props.formValues.get(props.config.name, '')
    if (incomingValues instanceof Map) {
      incomingValues = props.formValues.get(props.config.name, Map())
      if (incomingValues instanceof Map) {
        incomingValues = incomingValues.get('values', [])
        if (incomingValues instanceof List) {
          incomingValues = incomingValues.toJS()
        }
      }
    }
    if (typeof incomingValues === 'string') incomingValues = incomingValues.split('¤')
    incomingValues = fromJS(incomingValues)
    this.state = {
      value: incomingValues
    }
  }

  handleOnChange = e => {
    const {config = {}} = this.props
    let {readonly = false, disabled = false} = config
    disabled = disabled || readonly
    if (disabled) return
    const updatingValue = e.target.innerHTML
    let {value} = this.state
    if (value.indexOf(updatingValue) > -1) {
      value = value.filter(option => option !== updatingValue)
    } else {
      value = value.push(updatingValue)
    }
    this.setState(() => ({value}))
  }

  selectAllOptions = () => {
    const {config = {}} = this.props
    const {keyword = {}} = config
    const {options = []} = keyword
    let {readonly = false, disabled = false} = config
    disabled = disabled || readonly
    if (disabled) return
    let values = options.map(options => options.value)
    this.setState({value: fromJS(values)})
  }

  deselectAllOptions = () => {
    const {config = {}} = this.props
    let {readonly = false, disabled = false} = config
    disabled = disabled || readonly
    if (disabled) return
    this.setState({value: List()})
  }

  componentDidUpdate = (p, s) => {
    const {handleOnChange = () => {}} = this.props
    const {value} = this.state
    if (value.size !== s.value.size) {
      handleOnChange({target: {name: this.props.config.name, value}})
    }

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

  handleLinkClick = () => {
    const {config = {}, handleLinkClick} = this.props
    const {link} = config
    handleLinkClick(link)
  }

  render = () => {
    const {
      inline,
      config = {},
      Icon = null,
      requiredWarning,
      connectDropTarget,
      cascadingKeyword,
      CascadeIcon,
      LinkIcon
    } = this.props
    const {name = null, required = false, link} = config
    let {labelStyle = {}, style = {}, containerStyle = {}, iconStyle = {}} = config
    containerStyle = typeof containerStyle === 'string' ? JSON.parse(containerStyle) : containerStyle
    labelStyle = typeof labelStyle === 'string' ? JSON.parse(labelStyle) : labelStyle
    style = typeof style === 'string' ? JSON.parse(style) : style
    iconStyle = typeof iconStyle === 'string' ? JSON.parse(iconStyle) : iconStyle
    if (!name) return null
    const {label = name, keyword = {}} = config
    const {options = []} = keyword
    const {value = []} = this.state
    const warn = requiredWarning && value.size === 0 && required
    let {readonly = false, disabled = false, placeholder = ''} = config
    disabled = disabled || readonly
    placeholder = warn ? 'This Field Is Required' : placeholder

    const styles = {
      container: {
        display: 'flex',
        flex: 1,
        flexDirection: inline ? 'row' : 'column',
        background: 'transparent',
        minWidth: 177,
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
        display: 'flex',
        flexDirection: 'column',
        flexGrow: inline ? 1 : 0,
        height: inline ? 'auto' : 'calc(100% - 21px)',
        resize: 'none',
        backgroundColor: disabled ? '#eee' : 'transparent',
        minWidth: 90,
        marginTop: inline ? 25 : 0,
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
            {required && (
              <div style={{color: '#ec1c24', fontWeight: 'bold', fontSize: '15pt', lineHeight: '10pt'}}>*</div>
            )}
            {Icon && <Icon style={styles.icon} />}
            <strong
              style={styles.label}
              onClick={!!cascadingKeyword && !CascadeIcon ? this.handleCascadeKeywordClick : null}
              className={!!cascadingKeyword && !CascadeIcon ? 'cursor-hand' : ''}
            >
              {label}
            </strong>
            <span
              style={{
                fontWeight: 'normal',
                fontSize: '9pt',
                marginLeft: 3,
                marginTop: -1,
                color: warn ? '#ec1c24' : '#383e4b',
                marginRight: 5
              }}
            >
              {placeholder}
            </span>
            {!!cascadingKeyword && !!CascadeIcon && (
              <CascadeIcon onClick={this.handleCascadeKeywordClick} className='cursor-hand' />
            )}
            {!!link && !!LinkIcon && (
              <LinkIcon onClick={this.handleLinkClick} className='cursor-hand' />
            )}
          </div>
          <div style={styles.input}>
            <div
              style={{
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
                minHeight: 10,
                border: warn ? '1px solid #ec1c24' : '1px solid lightgrey',
                height: 'calc(100% - 18px)',
                overflowY: 'scroll'
              }}
            >
              {options.map((option, i) => {
                return (
                  <div
                    key={i}
                    onClick={this.handleOnChange}
                    style={{
                      display: 'flex',
                      height: 27,
                      minHeight: 27,
                      margin: 0,
                      alignItems: 'center',
                      paddingLeft: 5,
                      width: '100%',
                      borderBottom: '1px solid lightgrey',
                      backgroundColor: value.indexOf(option.value) > -1 ? '#a1c3fa' : 'transparent',
                      ...style}}
                  >
                    {option.label ? option.label : option.value}
                  </div>
                )
              })}
            </div>
            <div style={{display: 'flex', justifyContent: 'flex-end', height: 15, minHeight: 15}}>
              <span
                onClick={this.selectAllOptions}
                style={{
                  marginRight: 5,
                  fontSize: '8pt',
                  textDecoration: 'underline',
                  color: 'blue',
                  cursor: 'pointer'
                }}
              >
                Select All
              </span>
              <span
                onClick={this.deselectAllOptions}
                style={{
                  marginRight: 5,
                  fontSize: '8pt',
                  textDecoration: 'underline',
                  color: 'blue',
                  cursor: 'pointer'
                }}
              >
                Deselect All
              </span>
            </div>
          </div>
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

export default DropTarget('FormBuilderDraggable', boxTarget, collect)(Listselect)
