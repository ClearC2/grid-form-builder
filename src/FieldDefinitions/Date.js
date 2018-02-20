import React, {Component} from 'react'
import DateTime from 'react-datetime'
import {Map} from 'immutable'

export default class Date extends Component {
  handleChange = val => {
    const {field, handleOnChange = () => {}} = this.props
    const value = typeof val === 'object' ? val.format('M/D/YYYY') : val
    let e = {target: {name: field, value}}
    handleOnChange(e)
  }
  onMouseDown = e => {
    if (this.props.draggable) e.stopPropagation()
  }
  render = () => {
    const {inline, formValues = Map(), config = {}} = this.props
    const {labelStyle = {}, name = null} = config
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
      icon: {
        marginRight: 5,
        width: 20
      }
    }

    const className = inline ? `date-wrapper-grid-input date-wrapper-grid-input-inline` : `date-wrapper-grid-input`

    return (
      <div style={styles.container}>
        <div style={styles.labelContainer}>
          <strong style={styles.label}>{label}</strong>
        </div>
        <DateTime onMouseDown={this.onMouseDown} value={formValues.get(name, '')} onChange={this.handleChange} dateFormat='M/D/YYYY' timeFormat={false} className={className} />
      </div>
    )
  }
}
