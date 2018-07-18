import React, {Component} from 'react'
import {Map, List} from 'immutable'
import {DropTarget} from 'react-dnd'

// this component is designed to return a List() of selected values to the forms handle change function
export class Multicheckbox extends Component {
  constructor (props) {
    super(props)
    const {field, formValues = Map(), opts = {}} = props
    const value = formValues.get(field, List())
    const {options = List()} = opts
    let currentVals = List()
    options.map(option => {
      if (value.indexOf(option) > -1) currentVals = currentVals.push(option)
    })
    this.state = {
      value: currentVals
    }
  }

  handleOnChange = changingVal => {
    let {value} = this.state
    if (value.indexOf(changingVal) > -1) {
      value = value.filter(option => option !== changingVal)
    } else {
      value = value.push(changingVal)
    }
    this.setState({value})
  }

  componentDidUpdate = (p, s) => {
    const {config = {}, handleOnChange = () => {}} = this.props
    const {name} = config
    const {value} = this.state
    if (value.size !== s.value.size) {
      handleOnChange({target: {name: name, value}})
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

  render = () => {
    const {inline, config = {}, Icon = null, requiredWarning, formValues, connectDropTarget, cascadingKeyword, CascadeIcon} = this.props
    const {name = null, required = false, onKeyDown = () => null} = config
    let {labelStyle = {}, style = {}, containerStyle = {}, iconStyle = {}} = config
    containerStyle = typeof containerStyle === 'string' ? JSON.parse(containerStyle) : containerStyle
    labelStyle = typeof labelStyle === 'string' ? JSON.parse(labelStyle) : labelStyle
    style = typeof style === 'string' ? JSON.parse(style) : style
    iconStyle = typeof iconStyle === 'string' ? JSON.parse(iconStyle) : iconStyle
    if (!name) return null
    const {label = name, keyword = {}, boxed} = config
    const {options = []} = keyword
    const {value} = this.state
    const boxStyle = !boxed ? {} : {border: '1px solid lightgrey', backgroundColor: '#f5f5f5'}
    let {readonly = false, disabled = false, placeholder = ''} = config
    disabled = disabled || readonly
    const warn = requiredWarning && formValues.get(name, '').length === 0 && required
    placeholder = warn ? 'This Field Is Required' : placeholder

    const styles = {
      container: {
        display: 'flex',
        flex: 1,
        flexDirection: inline ? 'row' : 'column',
        background: 'transparent',
        minWidth: 177,
        ...boxStyle,
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
        lineHeight: inline ? '12pt' : '11pt',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        fontSize: inline ? '10pt' : '8pt',
        background: 'transparent',
        marginRight: 5,
        color: !!cascadingKeyword && !CascadeIcon ? 'blue' : '#383e4b',
        ...labelStyle
      },
      optionsContainer: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        marginLeft: inline ? 0 : 10,
        marginTop: inline ? 10 : 5
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
      }
    }

    return (
      connectDropTarget(
        <div style={styles.container} onMouseUp={this.handleAnywhereClick}>
          <div style={styles.labelContainer}>
            {required && <div style={{color: '#ec1c24', fontWeight: 'bold', fontSize: '15pt', lineHeight: '10pt'}}>*</div>}
            {Icon && <Icon style={styles.icon} />}
            <strong style={styles.label} onClick={!!cascadingKeyword && !CascadeIcon ? this.handleCascadeKeywordClick : null} className={!!cascadingKeyword && !CascadeIcon ? 'cursor-hand' : ''}>{label}</strong>
            <span style={{fontWeight: 'normal', fontSize: '9pt', marginLeft: 3, marginTop: -1, color: warn ? '#ec1c24' : '#383e4b', marginRight: 5}}>{placeholder}</span>
            {!!cascadingKeyword && !!CascadeIcon && <CascadeIcon onClick={this.handleCascadeKeywordClick} className='cursor-hand' />}
          </div>
          <div style={styles.optionsContainer}>
            {options.map((option, i) => {
              return (
                <label key={i} style={styles.label}>
                  <input className='radio-grid-input' onChange={() => this.handleOnChange(option.value)} style={styles.input} type='checkbox' name={name} value={option.value} checked={value.indexOf(option.value) > -1} disabled={disabled} onKeyDown={onKeyDown} />
                  {option.label ? option.label : option.value}
                </label>
              )
            })}
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

export default DropTarget('FormBuilderDraggable', boxTarget, collect)(Multicheckbox)
