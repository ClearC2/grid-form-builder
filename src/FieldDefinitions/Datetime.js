import React, {Component} from 'react'
import DateTime from 'react-datetime'
import {Map} from 'immutable'

export default class Datetime extends Component {
  handleChange = val => {
    const {field, handleOnChange = () => {}} = this.props
    const value = typeof val === 'object' ? val.format('M/D/YYYY h:mm a') : val
    let e = {target: {name: field, value}}
    handleOnChange(e)
  }
  onMouseDown = e => {
    if (this.props.draggable) e.stopPropagation()
  }
  render = () => {
    const {inline, field, formValues = Map(), opts = {}} = this.props
    const {label = field, labelStyle = {}, Icon = null, iconProps = {}, props = {}} = opts
    let value = formValues.get(field, '')

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
      }
    }

    const className = inline ? `date-wrapper-grid-input date-wrapper-grid-input-inline` : `date-wrapper-grid-input`

    return (
      <div style={styles.container}>
        <div style={styles.labelContainer}>
          {!!Icon && <Icon size={20} style={styles.icon} {...iconProps} />}
          <strong style={styles.label}>{label}</strong>
        </div>
        <DateTime onMouseDown={this.onMouseDown} value={value} onChange={this.handleChange} dateFormat='M/D/YYYY' className={className} {...props} />
      </div>
    )
  }
}
