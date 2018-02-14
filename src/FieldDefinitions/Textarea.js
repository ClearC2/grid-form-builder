import React, {Component} from 'react'
import {Map} from 'immutable'

export default class Textarea extends Component {
  onMouseDown = e => {
    if (this.props.draggable) e.stopPropagation()
  }
  render = () => {
    const {inline, field, formValues = Map(), handleOnChange = () => {}, opts = {}} = this.props
    const {rows = 4, label = field, style = {}, labelStyle = {}, Icon = null, iconProps = {}, props = {}} = opts

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
      icon: {
        marginRight: 5,
        width: 20
      },
      input: {
        display: 'flex',
        flexGrow: 1,
        paddingLeft: 5,
        resize: 'none',
        backgroundColor: 'transparent',
        minWidth: 90,
        marginTop: inline ? 25 : 0,
        ...style
      }
    }

    return (
      <div style={styles.container}>
        <div style={styles.labelContainer}>
          {!!Icon && <Icon size={20} style={styles.icon} {...iconProps} />}
          <strong style={styles.label}>{label}</strong>
        </div>
        <textarea onMouseDown={this.onMouseDown} onChange={handleOnChange} style={styles.input} name={field} value={formValues.get(field, '')} rows={rows} {...props} />
      </div>
    )
  }
}
