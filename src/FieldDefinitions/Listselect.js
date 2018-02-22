import React, {Component} from 'react'
import {Map, List, fromJS} from 'immutable'

// this component is designed to return a List() of selected values to the forms handle change function
export default class Listselect extends Component {
  constructor (props) {
    super(props)
    const {field, formValues = Map(), opts = {}} = props
    const value = formValues.get(field, List())
    const {options = List()} = opts
    let currentVals = List()
    options.map(option => {
      if (value.indexOf(option) > -1) currentVals = currentVals.push(option)
    })
    this.state = {
      value: currentVals
    }
  }

  handleOnChange = e => {
    const updatingValue = e.target.innerHTML
    let {value} = this.state
    if (value.indexOf(updatingValue) > -1) {
      value = value.filter(option => option !== updatingValue)
    } else {
      value = value.push(updatingValue)
    }
    this.setState({value})
  }

  selectAllOptions = () => {
    const {config = {}} = this.props
    const {keyword = {}} = config
    const {options = []} = keyword
    let values = options.map(options => options.value)
    this.setState({value: fromJS(values)})
  }

  deselectAllOptions = () => this.setState({value: List()})

  componentDidUpdate = (p, s) => {
    const {field, handleOnChange = () => {}} = this.props
    const {value} = this.state
    if (value.size !== s.value.size) {
      handleOnChange({target: {name: field, value}})
    }
  }

  render = () => {
    const {inline, config = {}, Icon = null} = this.props
    const {labelStyle = {}, style = {}, name = null, iconStyle = {}} = config
    if (!name) return null
    const {label = name, keyword = {}} = config
    const {options = []} = keyword
    const {value} = this.state

    const styles = {
      labelContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: inline ? 150 : '100%',
        minWidth: inline ? 150 : '100%',
        height: 15,
        marginTop: inline ? 4 : 0,
        background: 'transparent',
        marginBottom: inline ? 10 : 0,
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
        width: 15,
        height: 15,
        marginTop: inline ? 4 : 0,
        ...iconStyle
      }
    }

    return (
      <div style={{display: 'flex', flex: 1, flexDirection: 'column', height: '100%'}}>
        <div style={styles.labelContainer}>
          {Icon && <Icon style={styles.icon} />}
          <strong style={styles.label}>{label}</strong>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', minHeight: 10, border: '1px solid lightgrey', height: 'calc(100% - 18px)', marginTop: 3, overflowY: 'scroll'}}>
          {options.map((option, i) => {
            return (
              <div
                key={i}
                onClick={this.handleOnChange}
                style={{
                  display: 'flex',
                  height: 27,
                  minHeight: 27,
                  margin: 0,
                  alignItems: 'center',
                  paddingLeft: 5,
                  width: '100%',
                  borderBottom: '1px solid lightgrey',
                  backgroundColor: value.indexOf(option.value) > -1 ? '#a1c3fa' : 'transparent',
                  ...style}}
              >
                {option.label ? option.label : option.value}
              </div>
            )
          })}
        </div>
        <div style={{display: 'flex', justifyContent: 'flex-end', height: 15, minHeight: 15}}>
          <span onClick={this.selectAllOptions} style={{marginRight: 5, fontSize: '8pt', textDecoration: 'underline', color: 'blue'}} className='cursor-hand'>Select All</span>
          <span onClick={this.deselectAllOptions} style={{marginRight: 5, fontSize: '8pt', textDecoration: 'underline', color: 'blue'}} className='cursor-hand'>Deselect All</span>
        </div>
      </div>
    )
  }
}