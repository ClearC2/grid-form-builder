import React, {Component} from 'react'
import {Map} from 'immutable'

export default class Input extends Component {
  onMouseDown = e => {
    if (this.props.draggable) e.stopPropagation()
  }
  render = () => {
    const {inline, formValues = Map(), handleOnChange = () => {}, config = {}, Icon = null} = this.props
    const {labelStyle = {}, style = {}, name = null, iconStyle = {}} = config
    if (!name) return null
    const {label = name} = config

    const styles = {
      container: {
        display: 'flex',
        flex: 1,
        flexDirection: inline ? 'row' : 'column',
        background: 'transparent'
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
        flexGrow: 1,
        paddingLeft: 5,
        backgroundColor: 'transparent',
        borderBottom: '1px solid #a0a0a0',
        borderTop: inline ? 0 : '1px solid #a0a0a0',
        borderLeft: inline ? 0 : '1px solid #a0a0a0',
        borderRight: inline ? 0 : '1px solid #a0a0a0',
        minWidth: 90,
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
      <div style={styles.container}>
        <div style={styles.labelContainer}>
          {Icon && <Icon style={styles.icon} />}
          <strong style={styles.label}>{label}</strong>
        </div>
        <input onMouseDown={this.onMouseDown} onChange={handleOnChange} style={styles.input} type='text' name={name} value={formValues.get(name, '')} />
      </div>
    )
  }
}
