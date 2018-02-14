import React, {Component} from 'react'
import {Map} from 'immutable'

export default class Checkbox extends Component {
  handleOnChange = e => {
    const {field, formValues = Map(), handleOnChange = () => {}} = this.props
    let value = formValues.get(field, '')
    value = value === 'on' ? 'off' : 'on'
    handleOnChange({target: {name: e.target.name, value}})
  }

  render = () => {
    const {inline, field, formValues = Map(), opts = {}} = this.props
    const {label = field, style = {}, props = {}, labelStyle} = opts
    const value = formValues.get(field, '')

    const styles = {
      container: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        background: 'transparent'
      },
      label: {
        display: 'flex',
        flex: 1,
        height: inline ? 27 : 40,
        margin: 0,
        marginBottom: inline ? 5 : 0,
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: inline ? '10pt' : '8pt',
        lineHeight: inline ? '10pt' : '8pt',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
      },
      input: {
        display: 'flex',
        marginRight: 5,
        marginTop: 0,
        ...style
      }
    }

    return (
      <div style={styles.container}>
        <label key={field} style={styles.label}>
          <input className='checkbox-grid-input' onChange={this.handleOnChange} style={styles.input} type='checkbox' name={field} checked={value.toLowerCase() === 'on'} {...props} />
          {label}
        </label>
      </div>
    )
  }
}
