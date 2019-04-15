import PropTypes from 'prop-types'
import React, {Component} from 'react'
import PickList from './PickList'

export class AggregationPicker extends Component {
  static propTypes = {
    title: PropTypes.string,
    availableColumns: PropTypes.array.isRequired,
    selectedColumns: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    valueKey: PropTypes.string,
    labelKey: PropTypes.string
  }

  render () {
    return (
      <div style={{border: '1px solid darkgrey', margin: '3px'}}>
        <div style={{margin: '10px'}}>
          <div>
            <h3>{this.props.title || 'Aggregations'}</h3>
          </div>
          <PickList
            options={this.props.availableColumns}
            labelKey={this.props.valueKey || 'value'}
            valueKey={this.props.labelKey || 'label'}
            value={this.props.selectedColumns}
            onChange={this.props.onChange}
            height={200}
            leftPaneLabel='Available'
          />
        </div>
      </div>
    )
  }
}

export default AggregationPicker
