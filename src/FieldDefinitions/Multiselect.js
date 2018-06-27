import React, {Component} from 'react'
import {List, fromJS} from 'immutable'
import ReactSelect from 'react-select'
import {DropTarget} from 'react-dnd'

export class Multiselect extends Component {
  constructor (props) {
    super(props)
    const {config = {}} = props
    const {keyword = {}} = config
    const {options = []} = keyword
    this.state = {
      fieldValues: [],
      builtOptions: options
    }
  }

  componentDidUpdate = p => {
    const {didDrop, isOver} = this.props
    if (didDrop && !p.didDrop && !isOver && p.isOver) {
      // if it was just previously over and dropped (this is to make this event only trigger once)
      let {droppedItem, handleDragDropOnInput, config} = this.props
      droppedItem = droppedItem === null ? null : droppedItem.widget
      if (droppedItem && !p.droppedItem) {
        handleDragDropOnInput({
          source: droppedItem,
          target: config
        })
      }
    }
  }

  componentWillReceiveProps (props) {
    let val = props.formValues.get(props.config.name, null)
    if (!val && this.state.fieldValues !== []) {
      this.setState({fieldValues: []})
    }
  }

  onChange = (e) => {
    this.setState({fieldValues: e})
    if (e.length === 0) {
      this.props.handleOnChange({target: {name: this.props.config.name, value: ''}})
    } else {
      this.props.handleOnChange({target: {name: this.props.config.name, value: fromJS({condition: 'is one of', values: List(e.map(val => val.value))})}})
    }
  }

  render = () => {
    const {inline, config = {}, Icon = null, requiredWarning, connectDropTarget} = this.props
    const {labelStyle = {}, style = {}, name = null, iconStyle = {}, required = false, containerStyle = {}, multi = true, onKeyDown = () => null} = config
    if (!name) return null
    const {label = name} = config
    const warn = requiredWarning && this.state.fieldValues.length === 0 && required
    let {readonly = false, disabled = false} = config
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
        ...labelStyle
      },
      input: {
        height: inline ? 'auto' : 25,
        backgroundColor: disabled ? '#eee' : 'white',
        minWidth: 170,
        ...style
      },
      icon: {
        marginRight: 5,
        width: 15,
        height: 15,
        marginTop: inline ? 3 : -1,
        ...iconStyle
      }
    }

    let className = inline ? `select-grid-input select-grid-input-inline` : `select-grid-input`
    className = !warn ? className : className + ' warn-required'
    const placeholder = warn ? '* This Field Is Required' : ''

    return (
      connectDropTarget(
        <div style={styles.container}>
          <div style={styles.labelContainer}>
            {required && <div style={{color: '#ec1c24', fontWeight: 'bold', fontSize: '15pt', lineHeight: '10pt'}}>*</div>}
            {Icon && <Icon style={styles.icon} />}
            <strong style={styles.label}>{label}</strong>
          </div>
          <ReactSelect
            onChange={this.onChange}
            className={className}
            style={styles.input}
            multi={multi}
            name={name}
            options={this.state.builtOptions}
            value={this.state.fieldValues}
            disabled={disabled}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
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
