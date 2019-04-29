import React, {Component} from 'react'
import PropTypes from 'prop-types'
import $ from 'jquery'

const noop = () => {
}

class Pane extends Component {
    static propTypes = {
      items: PropTypes.array,
      valueKey: PropTypes.string,
      labelKey: PropTypes.string,
      onAction: PropTypes.func,
      actionElement: PropTypes.any,
      paneLabel: PropTypes.any,
      boxStyle: PropTypes.object,
      height: PropTypes.number,
      paneRef: PropTypes.func,
      resize: PropTypes.func
    }

    static defaultProps = {
      items: [],
      valueKey: 'value',
      labelKey: 'label',
      onAction: noop,
      actionElement: 'Submit',
      paneLabel: 'Items',
      paneRef: noop,
      resize: noop
    }

    state = {
      selected: {},
      selectAll: false,
      search: false,
      searchText: ''
    }

    onFlush = () => {
      const {valueKey} = this.props
      const items = this.items().filter(item => this.state.selected[item[valueKey]])
      this.props.onAction(items)
      this.setState({selectAll: false, selected: {}, searchText: ''})
    }

    items = () => {
      let {items, labelKey} = this.props
      const {search, searchText} = this.state
      if (search) {
        items = items.filter(item => String(item[labelKey]).toLowerCase().includes(searchText.toLowerCase()))
      }
      return items
    }

    render () {
      const {
        boxStyle,
        valueKey,
        labelKey,
        actionElement,
        height,
        paneRef,
        paneLabel,
        onAction
      } = this.props
      const items = this.items()
      const innerDivStyle = {height, overflow: height ? 'auto' : null}
      return (
        <div ref={div => paneRef(div)} style={boxStyle}>
          <div className='row'>
            <div className='col-xs-3 col-md-3'>{paneLabel}</div>
            <div className={`col-xs-9 col-md-9 text-right`}>
              <a className='pointer' onClick={this.onFlush}>{actionElement}</a>
                        &nbsp;&nbsp;&nbsp;
              <span
                className='red icon-search-1 pointer'
                onClick={() => this.setState({search: !this.state.search, searchText: ''})}
              />
            </div>
          </div>
          <hr style={{margin: 0}} />
          <div style={innerDivStyle}>
            {this.state.search ? (
              <span>
                <input
                  type='text'
                  className='form-control input-sm'
                  placeholder='Search'
                  value={this.state.searchText}
                  style={{fontSize: 12, height: 20}}
                  onChange={e => this.setState({
                    searchText: e.target.value,
                    selected: {},
                    selectAll: false
                  })}
                />
              </span>
            ) : null}
            {items.map(option => (
              <span style={{cursor: 'pointer'}} key={option[valueKey]}>
                <a className='pointer' onClick={() => onAction([option])}>{option[labelKey]}</a><br />
              </span>
            ))}
            {items.length === 0 ? <br /> : null}
          </div>
        </div>
      )
    }
}

export default class PickList extends Component {
    static propTypes = {
      options: PropTypes.array,
      value: PropTypes.array,
      labelKey: PropTypes.string,
      valueKey: PropTypes.string,
      onChange: PropTypes.func,
      boxStyle: PropTypes.object,
      height: PropTypes.number,
      leftPaneLabel: PropTypes.any,
      rightPaneLabel: PropTypes.any
    }

    static defaultProps = {
      options: [],
      labelKey: 'label',
      valueKey: 'value',
      value: [],
      onChange: noop,
      boxStyle: {border: '1px solid #D5D5D5', padding: 5},
      height: null,
      leftPaneLabel: 'Options',
      rightPaneLabel: 'Selected'
    }

    componentDidMount () {
      this.adjustHeight()
    }

    componentDidUpdate () {
      this.adjustHeight()
    }

    adjustHeight = () => {
      if (this.props.height) {
        return
      }
      const $value = $(this.valueDiv)
      const $options = $(this.optionsDiv)
      $value.css('height', '')
      $options.css('height', '')
      const valueHeight = $value.height()
      const optionsHeight = $options.height()

      if (valueHeight > optionsHeight) {
        $options.height(valueHeight)
      } else {
        $value.height(optionsHeight)
      }
    }

    add = options => {
      const {value, valueKey, onChange} = this.props
      const originalValue = Object.assign([], value)
      const values = value.splice(0)
      options.forEach(option => {
        const found = values.find(o => o[valueKey] === option[valueKey])
        if (!found) {
          values.push(option)
        }
      })

      if (options.length === 1) {
        onChange(values)
      } else {
        if (originalValue.length !== this.props.options.length) {
          let _values = Object.values(originalValue.map(ov => ov[valueKey]))
          let result = this.props.options.filter(opt => !_values.includes(opt[valueKey]))
          onChange([...originalValue, ...result])
        }
      }
    }

    remove = options => {
      const {value, valueKey, onChange} = this.props
      const values = value.splice(0)
      const keys = options.map(opt => opt[valueKey])
      keys.forEach(key => {
        const index = values.map(o => o[valueKey]).indexOf(key)
        if (index > -1) {
          values.splice(index, 1)
        }
      })
      if (options.length === 1) {
        onChange(values)
      }
    }

    render () {
      const {leftPaneLabel, rightPaneLabel, options, value} = this.props
      return (
        <div className='row'>
          <div className='col-xs-6 col-sm-6 col-md-6 col-lg-6'>
            <Pane
              {...this.props}
              paneLabel={leftPaneLabel}
              items={options}
              paneRef={div => this.optionsDiv = div}
              onAction={options => this.add(options)}
              actionElement='Add All'
            />
          </div>
          <div className='col-xs-6 col-sm-6 col-md-6 col-lg-6'>
            <Pane
              {...this.props}
              paneLabel={rightPaneLabel}
              items={value}
              paneRef={div => this.valueDiv = div}
              onAction={options => this.remove(options)}
              actionElement='Remove All'
            />
          </div>
        </div>
      )
    }
}
