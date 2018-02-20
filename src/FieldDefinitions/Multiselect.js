import React, {Component} from 'react'
import {List, fromJS} from 'immutable'
import ReactSelect from 'react-select'

export default class Multiselect extends Component {
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

  onChange = (e) => {
    this.setState({fieldValues: e})
    if (e.length === 0) {
      this.props.handleOnChange({target: {name: this.props.field, value: ''}})
    } else {
      this.props.handleOnChange({target: {name: this.props.field, value: fromJS({condition: 'is one of', values: List(e.map(val => val.value))})}})
    }
  }

  render = () => {
    const {inline, config = {}} = this.props
    const {labelStyle = {}, style = {}, name = null} = config
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
        ...style
      }
    }

    const className = inline ? `select-grid-input select-grid-input-inline` : `select-grid-input`

    return (
      <div style={styles.container}>
        <div style={styles.labelContainer}>
          <strong style={styles.label}>{label}</strong>
        </div>
        <ReactSelect
          onChange={this.onChange}
          className={className}
          style={styles.input}
          multi
          name={name}
          options={this.state.builtOptions}
          value={this.state.fieldValues}
        />
      </div>
    )
  }
}
