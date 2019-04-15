import PropTypes from 'prop-types'
import React, {Component} from 'react'
import PickList from './PickList'

export class ColumnPicker extends Component {
  static propTypes = {
    title: PropTypes.string,
    availableColumns: PropTypes.array.isRequired,
    selectedColumns: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    valueKey: PropTypes.string,
    labelKey: PropTypes.string,
    columnPickerHeight: PropTypes.number
  }

  render () {
    return (
      <div style={{border: '1px solid #A0A0A0', margin: '3px'}}>
        <div style={{margin: '10px'}}>
          <div>
            <h5>{this.props.title || 'Report Columns'}</h5>
          </div>
          <PickList
            options={this.props.availableColumns}
            labelKey={this.props.labelKey || 'label'}
            valueKey={this.props.valueKey || 'value'}
            value={this.props.selectedColumns}
            onChange={this.props.onChange}
            height={this.props.columnPickerHeight || 200}
            leftPaneLabel='Available'
          />
        </div>
      </div>
    )
  }
}

export default ColumnPicker
