import React, {Component} from 'react'
import {List, fromJS} from 'immutable'
import ReactSelect from 'react-select'

export default class Multiselect extends Component {
  state = {
    fieldValues: [],
    builtOptions: []
  }
  componentDidMount () {
    this.setState({builtOptions: this.buildOptions(this.props.opts.options)})
  }

  onChange = (e) => {
    this.setState({fieldValues: e})
    if (e.length === 0) {
      this.props.handleOnChange({target: {name: this.props.field, value: ''}})
    } else {
      this.props.handleOnChange({target: {name: this.props.field, value: fromJS({condition: 'is one of', values: List(e.map(val => val.value))})}})
    }
  }

  buildOptions = (opts) => {
    let builtOpts = []
    opts.forEach(opt => {
      builtOpts.push({value: opt, label: opt})
    })
    return builtOpts
  }

  render = () => {
    const {inline, field, opts = {}} = this.props
    const {label = field, style = {}, labelStyle = {}, Icon = null, iconProps = {}, props = {}} = opts

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
        ...style
      }
    }

    const className = inline ? `select-grid-input select-grid-input-inline` : `select-grid-input`

    return (
      <div style={styles.container}>
        <div style={styles.labelContainer}>
          {!!Icon && <Icon size={20} style={styles.icon} {...iconProps} />}
          <strong style={styles.label}>{label}</strong>
        </div>
        <ReactSelect
          onChange={this.onChange}
          className={className}
          style={styles.input}
          multi
          name={field}
          options={this.state.builtOptions}
          value={this.props.formValues.getIn([field, 'values'], List()).map(val => { return {value: val, label: val} }).toArray()}
          {...props}
        />
      </div>
    )
  }
}
