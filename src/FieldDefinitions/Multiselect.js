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
    const {field, opts = {}} = this.props
    const {label = field, style = {}, labelStyle = {}, Icon = null, iconProps = {}, props = {}} = opts
    return (
      <div style={{display: 'flex', flex: '1', flexDirection: 'row'}}>
        <div style={{display: 'flex', flexDirection: 'row', width: 150, minWidth: 150, height: 30, marginTop: 4, ...labelStyle}}>
          {!!Icon && <Icon size={20} style={{marginRight: 5}} {...iconProps} />}
          <strong style={{display: 'flex', justifyContent: 'flex-start', lineHeight: '23px', whiteSpace: 'nowrap', textOverflow: 'ellipsis', ...labelStyle}}>{label}</strong>
        </div>
        <div style={{width: '100%', display: 'inline-block'}}>
          <ReactSelect
            onChange={this.onChange}
            className='select-grid-input'
            style={{display: 'inline-block', height: 30, paddingLeft: 5, minWidth: 150, width: '100%', ...style}}
            multi
            name={field}
            options={this.state.builtOptions}
            value={this.props.formValues.getIn([field, 'values'], List()).map(val => { return {value: val, label: val} }).toArray()}
            {...props}
          />
        </div>
      </div>
    )
  }
}
