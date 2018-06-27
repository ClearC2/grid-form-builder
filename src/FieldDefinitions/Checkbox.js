import React, {Component} from 'react'
import {Map} from 'immutable'
import {DropTarget} from 'react-dnd'

export class Checkbox extends Component {
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

  handleOnChange = e => {
    const {formValues = Map(), handleOnChange = () => {}, config} = this.props
    const {name = null} = config
    let value = formValues.get(name, '0') // if the field value is undefined in the current form values, we are defaulting it to the c2 standard of a false string value of 0
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
      case name: value = ''; break // this might be dangerous to assume the checked value is the name of the field
      case '': value = name; break // this might be dangerous to assume the unchecked value is a blank string
      default: value = !!e.target.value
    }
    handleOnChange({target: {name: e.target.name, value: value}})
  }

  truthy = [true, 1, '1', 't', 'T', 'true', 'True', 'TRUE', 'y', 'Y', 'Yes', 'YES', 'yes', 'on', 'On', 'ON', this.props.config.name]

  falsey = [false, 0, '0', 'f', 'F', 'false', 'False', 'FALSE', 'n', 'N', 'No', 'NO', 'no', 'off', 'Off', 'OFF', '']

  render = () => {
    const {inline, formValues = Map(), config = {}, Icon = null, requiredWarning, rowHeight, connectDropTarget} = this.props
    const {labelStyle = {}, style = {}, name = null, iconStyle = {}, required = false, containerStyle = {}, onKeyDown = () => null} = config
    if (!name) return null
    const {label = name} = config
    let {readonly = false, disabled = false} = config
    disabled = disabled || readonly
    const warn = requiredWarning && formValues.get(name, '').length === 0 && required

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
      }
    }

    let value = formValues.get(name, '')

    if (this.truthy.indexOf(value) > -1) value = true
    else if (this.falsey.indexOf(value) > -1) value = false
    else value = false

    return (
      connectDropTarget(
        <div style={styles.container}>
          <label style={styles.label}>
            {Icon && <Icon style={styles.icon} />}
            <input className='checkbox-grid-input' onChange={this.handleOnChange} style={styles.input} type='checkbox' name={name} checked={value} disabled={disabled} onKeyDown={onKeyDown} />
            {label}
            {required && <div style={{color: '#ec1c24', fontWeight: 'bold', fontSize: '15pt', lineHeight: '10pt'}}>
              * <span style={{fontWeight: 'normal', fontSize: '9pt'}}>{warn ? 'This Field Is Required' : ''}</span>
            </div>}
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
