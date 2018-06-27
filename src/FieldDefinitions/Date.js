import React, {Component} from 'react'
import DateTime from 'react-datetime'
import {Map} from 'immutable'
import {DropTarget} from 'react-dnd'

export class Date extends Component {
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
  handleChange = val => {
    const {handleOnChange = () => {}} = this.props
    const field = this.props.config.name
    const value = typeof val === 'object' ? val.format('M/D/YYYY') : val
    let e = {target: {name: field, value}}
    handleOnChange(e)
  }
  onMouseDown = e => {
    if (this.props.draggable) e.stopPropagation()
  }
  render = () => {
    const {inline, formValues = Map(), config = {}, Icon = null, requiredWarning, connectDropTarget} = this.props
    const {labelStyle = {}, name = null, iconStyle = {}, required = false, containerStyle = {}, onKeyDown = () => null} = config
    if (!name) return null
    const {label = name} = config
    const warn = requiredWarning && formValues.get(name, '').length === 0 && required
    let {readonly = false, disabled = false} = config
    disabled = disabled || readonly

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
        color: '#383e4b',
        ...labelStyle
      },
      icon: {
        marginRight: 5,
        width: 15,
        height: 15,
        marginTop: inline ? 3 : -1,
        ...iconStyle
      }
    }

    let className = inline ? `date-wrapper-grid-input date-wrapper-grid-input-inline` : `date-wrapper-grid-input`
    className = !warn ? className : className + ' warn-required'
    const inputClass = warn ? 'warn-required' : ''
    const placeholder = warn ? '* This Field Is Required' : ''

    return (
      connectDropTarget(
        <div style={styles.container}>
          <div style={styles.labelContainer}>
            {required && <div style={{color: '#ec1c24', fontWeight: 'bold', fontSize: '15pt', lineHeight: '10pt'}}>*</div>}
            {Icon && <Icon style={styles.icon} />}
            <strong style={styles.label}>{label}</strong>
          </div>
          <DateTime
            onMouseDown={this.onMouseDown}
            value={formValues.get(name, '')}
            onChange={this.handleChange}
            dateFormat='M/D/YYYY'
            timeFormat={false}
            className={className}
            inputProps={{
              disabled: disabled,
              placeholder: placeholder,
              className: inputClass,
              style: {backgroundColor: disabled ? '#eeeeee' : 'transparent'}
            }}
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

export default DropTarget('FormBuilderDraggable', boxTarget, collect)(Date)
