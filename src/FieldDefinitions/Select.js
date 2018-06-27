import React, {Component} from 'react'
import {Map} from 'immutable'
import {DropTarget} from 'react-dnd'

export class Select extends Component {
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
  render = () => {
    const {inline, formValues = Map(), handleOnChange = () => {}, config = {}, Icon = null, requiredWarning, connectDropTarget} = this.props
    const {labelStyle = {}, style = {}, name = null, iconStyle = {}, required = false, containerStyle = {}, onKeyDown = () => null} = config
    if (!name) return null
    const {label = name, keyword = {}, suppressBlankOption = false} = config
    const {options = []} = keyword
    const warn = requiredWarning && formValues.get(name, '').length === 0 && required
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
        display: 'flex',
        flexGrow: inline ? 1 : 0,
        height: inline ? 'auto' : 25,
        backgroundColor: disabled ? '#eee' : 'white',
        borderBottom: warn ? '1px solid #ec1c24' : '1px solid #a0a0a0',
        borderTop: inline ? 0 : warn ? '1px solid #ec1c24' : '1px solid #a0a0a0',
        borderLeft: inline ? 0 : warn ? '1px solid #ec1c24' : '1px solid #a0a0a0',
        borderRight: inline ? 0 : warn ? '1px solid #ec1c24' : '1px solid #a0a0a0',
        paddingLeft: 5,
        minWidth: 170,
        color: warn ? 'red' : 'inherit',
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

    return (
      connectDropTarget(
        <div style={styles.container}>
          <div style={styles.labelContainer}>
            {required && <div style={{color: '#ec1c24', fontWeight: 'bold', fontSize: '15pt', lineHeight: '10pt'}}>*</div>}
            {Icon && <Icon style={styles.icon} />}
            <strong style={styles.label}>{label}</strong>
          </div>
          <select onChange={handleOnChange} className='select-grid-input' style={styles.input} name={name} value={formValues.get(name, '')} disabled={disabled} onKeyDown={onKeyDown}>
            {warn && <option key='required' value='' style={{color: 'red'}} disabled hidden>* This Field Is Required</option>}
            {!suppressBlankOption && !warn && <option key='blank' value='' /> /* {should all selects have a blank option?} */}
            {options.map((option, i) => <option key={i} value={option.value}>{option.label ? option.label : option.value}</option>)}
          </select>
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
