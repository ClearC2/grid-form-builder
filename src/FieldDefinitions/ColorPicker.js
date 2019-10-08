import React, {Component} from 'react'
import PropTypes from 'prop-types'

import Portal from './Portal'
import {DropTarget} from 'react-dnd'
import '../../styles/colorpicker.css'
import {SketchPicker, CompactPicker} from 'react-color'
import {Map} from 'immutable'

class ColorPicker extends Component {
  static propTypes = {
    autoComplete: PropTypes.string,
    didDrop: PropTypes.bool,
    isOver: PropTypes.bool,
    CascadeIcon: PropTypes.any,
    cascadingKeyword: PropTypes.any,
    config: PropTypes.object,
    connectDropTarget: PropTypes.any,
    droppedItem: PropTypes.any,
    handleOnChange: PropTypes.func.isRequired,
    handleDragDropOnInput: PropTypes.func,
    handleAnywhereClick: PropTypes.func,
    handleCascadeKeywordClick: PropTypes.func,
    draggable: PropTypes.bool,
    minChars: PropTypes.number,
    formValues: PropTypes.instanceOf(Map),
    Icon: PropTypes.any,
    requiredWarning: PropTypes.bool,
    inline: PropTypes.bool,
    tabIndex: PropTypes.number,
    taMaxHeight: PropTypes.string,
    LinkIcon: PropTypes.func,
    handleLinkClick: PropTypes.func
  }

  state = {
    picker: '',
    color: '#FFFFFF',
    id: ''
  }

  componentDidMount () {
    const {formValues, config = {}} = this.props
    this.setState({id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)})

    const color = formValues.get(config.name)
    if (color) {
      this.setState({color})
    }
  }

  componentDidUpdate (p, s) {
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

    if (!!this.state.picker && !s.picker) {
      window.addEventListener('mousedown', this.clickListener)
    } else if (!!s.picker && !this.state.picker) {
      window.removeEventListener('mousedown', this.clickListener)
    }
  }

  componentWillUnmount () {
    window.removeEventListener('mousedown', this.clickListener)
  }

  clickListener = e => {
    let outsideClick = true
    e.path.forEach(path => {
      if (path.id === this.state.id) {
        outsideClick = false
      } else if (path.id === this.portal.state.id) {
        outsideClick = false
      }
    })

    if (outsideClick) {
      this.toggleActive()
      this.input.blur()
    }
  }

  handleAnywhereClick = e => {
    const {handleAnywhereClick = () => null, formValues = Map()} = this.props
    let {config = {}} = this.props
    const currentValue = formValues.get(config.name, '')
    config = {currentValue, ...config}
    if (!config.disabled) {
      handleAnywhereClick(config, e)
    }
  }

  toggleActive = (set = null) => {
    const {picker} = this.state

    if (typeof set === 'boolean') {
      this.setState({picker: set ? 'compact' : ''})
    } else if (!picker) {
      this.setState({picker: 'compact'})
    } else {
      this.setState({picker: ''})
    }
  }

  togglePicker = () => {
    const {picker} = this.state

    if (picker !== 'compact') {
      this.setState({picker: 'compact'})
    } else if (picker === 'compact') {
      this.setState({picker: 'sketch'})
    }
  }

  onColorChange = color => {
    const {config = {}, handleOnChange} = this.props

    this.input.focus()

    if (typeof color === 'string') {
      color = color.toUpperCase()
    } else {
      color = color.toString().toUpperCase()
    }

    handleOnChange({
      target: {
        name: config.name,
        value: color
      }
    })

    this.setState({color})
  }

  onApply = () => {
    this.input.blur()
    this.toggleActive()
  }

  render () {
    const {
      connectDropTarget,
      config
    } = this.props

    const {styles = {}, required, Icon, label, classNames = {}} = config
    const {compactProps = {}, sketchProps = {}} = config

    return (
      connectDropTarget(
        <div className={classNames.container} style={styles.container} onMouseUp={this.handleAnywhereClick}>
          <div className={classNames.labelContainer} style={styles.labelContainer}>
            {required && (
              <div style={{color: '#ec1c24', fontWeight: 'bold', fontSize: '15pt', lineHeight: '10pt'}}>*</div>
            )}
            {Icon && <Icon style={styles.icon} />}
            <strong
              style={styles.label}
              className={`cursor-hand ${classNames.label}`}
            >
              {label}
            </strong>
          </div>
          <div
            className={`row ${classNames.inputContainer}`}
            style={{width: 'max-content', ...styles.inputContainer}}
            id={this.state.id}
          >
            <input
              value={this.state.color}
              ref={ref => { this.input = ref }}
              onClick={() => this.toggleActive(true)}
              onChange={e => this.onColorChange(e.target.value)}
              spellCheck={false}
              className={classNames.input}
              style={styles.input}
            />
            <div
              className={`color-picker-block ${classNames.block}`}
              onClick={() => {
                this.toggleActive(true)
                this.input.focus()
              }}
              style={{
                ...styles.block,
                background: this.state.color
              }}
            />
          </div>
          <Portal id={this.state.id} style={styles.portal} ref={ref => { this.portal = ref }}>
            <div style={{display: 'grid', ...styles.pickerContainer}}>
              { !!this.state.picker.length &&
                <div
                  className={`cursor-hand color-picker-toggle-button ${classNames.toggleContainer}`}
                  style={styles.toggleContainer}
                  onClick={this.togglePicker}
                >
                  <div
                    className={`button-center ${classNames.toggle}`}
                  >
              Toggle Picker
                  </div>
                </div>
              }
              { ['compact'].includes(this.state.picker) &&
              <CompactPicker
                onChange={e => this.onColorChange(e.hex)}
                color={this.state.color}
                {...compactProps}
              />
              }
              { ['sketch'].includes(this.state.picker) &&
              <SketchPicker
                onChange={e => this.onColorChange(e.hex)}
                color={this.state.color}
                {...sketchProps}
              />
              }
              { !!this.state.picker.length &&
              <div
                className={`${classNames.applyContainer}`}
                style={styles.applyContainer}
              >
                <div
                  className={`cursor-hand color-picker-apply-button ${classNames.apply}`}
                  style={styles.apply}
                  onClick={this.onApply}
                >
                  Apply
                </div>
              </div>
              }
            </div>
          </Portal>
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

export default DropTarget('FormBuilderDraggable', boxTarget, collect)(ColorPicker)
