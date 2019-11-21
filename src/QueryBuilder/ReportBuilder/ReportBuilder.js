import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {List} from 'immutable'
import ColumnPicker from './ColumnPicker'
import AggregationPicker from './AggregationPicker'

export class ReportBuilder extends Component {
  static propTypes = {
    title: PropTypes.string,
    suppressColumnPicker: PropTypes.bool,
    columnPickerTitle: PropTypes.string,
    availableColumns: PropTypes.array,
    selectedColumns: PropTypes.array,
    onColumnChange: PropTypes.func,
    onColDefChange: PropTypes.func,
    suppressAggregationPicker: PropTypes.bool,
    columnPickerHeight: PropTypes.number
  }

  constructor (props) {
    super(props)
    if (props.onColDefChange && props.selectedColumns) {
      props.onColDefChange(this.buildColumnDefs(props.selectedColumns))
    }
  }

  UNSAFE_componentWillReceiveProps (props) {
    if (JSON.stringify(this.props.selectedColumns) !== JSON.stringify(props.selectedColumns)) {
      if (this.props.onColDefChange) {
        this.props.onColDefChange(this.buildColumnDefs(props.selectedColumns))
      }
    }
  }

  static defaultProps = {
    suppressAggregationPicker: true
  }

  buildStringColDef = (col) => {
    let def = {
      ...col,
      headerName: col.label.split(' (')[0],
      field: col.value
    }
    if (!def.type.includes('Column')) {
      delete def.type
    }
    return def
  }

  buildDateColDef = (col) => {
    let def = {
      ...col,
      headerName: col.label.split(' (')[0],
      field: col.value,
      filter: 'date'
    }
    if (!def.type.includes('Column')) {
      delete def.type
    }
    return def
  }
  buildBoolColDef = (col) => {
    let def = {
      ...col,
      headerName: col.label.split(' (')[0],
      field: col.value,
      valueGetter: (col) => {
        if (col && col.data && col.colDef && col.colDef.field) {
          let val = ''
          switch (`${col.data[col.colDef.field]}`) {
            case '0':
              val = 'False'
              break
            case '1':
              val = 'True'
              break
            default:
              val = col.data[col.colDef.field]
          }
          return val
        } else {
          console.warn('Query-builder was unable to read col.data[col.colDef.field] of a boolean field. returning blank string', col)// eslint-disable-line
          return ''
        }
      }
    }
    if (!def.type.includes('Column')) {
      delete def.type
    }
    return def
  }

  buildColumnDefs = (cols) => {
    let colDefs = []
    for (let i in cols) {
      let col = cols[i]
      switch (col.type) {
        case 'string':
          colDefs.push(this.buildStringColDef(col))
          break
        case 'datetime':
        case 'date':
          colDefs.push(this.buildDateColDef(col))
          break
        case 'bool':
          colDefs.push(this.buildBoolColDef(col))
          break
        default:
          colDefs.push(this.buildStringColDef(col))
      }
    }
    return colDefs
  }

  onColumnChange = (colList) => {
    // colList.sort((a, b) => a.label < b.label ? -1 : 1)
    if (this.props.onColDefChange) {
      this.props.onColDefChange(this.buildColumnDefs(colList))
    }
    if (this.props.onColumnChange) {
      this.props.onColumnChange(colList)
    }
  }

  unselectedOptions = () => {
    let unselected = []
    this.props.availableColumns.forEach((col) => {
      if (!this.props.selectedColumns.some((c) => {
        if (c.value) {
          return c.value === col.value
        } else {
          return c === col
        }
      })) {
        unselected.push(col)
      }
    })
    return unselected
  }

  render () {
    return (
      <div style={{width: '99%', margin: 'auto', border: '2px solid #A0A0A0'}}>
        <h4 style={{margin: '5px'}}>{this.props.title || 'Report Builder'}</h4>
        {!this.props.suppressColumnPicker && <ColumnPicker
          title={this.props.columnPickerTitle}
          availableColumns={this.unselectedOptions()}
          selectedColumns={this.props.selectedColumns}
          onChange={this.onColumnChange}
          columnPickerHeight={this.props.columnPickerHeight}
        />}
        {!this.props.suppressAggregationPicker && <AggregationPicker
        />}
      </div>
    )
  }
}

export const FIELD_TYPE_MAP = {
  '11': 'string',
  '10': 'string',
  '0': 'string',
  '1': 'bool',
  '2': 'integer',
  '3': 'decimal',
  '4': 'float',
  '7': 'datetime',
  '5': 'date',
  '6': 'time'
}

export function buildAvailableColumnsFromFieldDefs (fieldDefs, withFieldNames) {
  let fieldNames = Object.keys(fieldDefs.data)
  let availableColumns = []
  for (let i in fieldNames) {
    let fieldDef = fieldDefs.data[fieldNames[i]]
    let rawLabel = fieldDef.fieldlabel
    availableColumns.push({
      label: withFieldNames ? `${rawLabel} (${fieldNames[i]})` : rawLabel,
      value: fieldNames[i],
      type: FIELD_TYPE_MAP[`${fieldDef.datatype}`],
      format: (fieldDef.format === 'phone') ? 'dashes' : fieldDef.format
    })
  }
  return List(availableColumns).sort((a, b) => a.label.localeCompare(b.label)).toJS()
}

export function buildDefaultColumnsFromQuery (query, availableColumns = []) {
  let selected = []
  if (query.query) {
    let conditions = query.query.conditions
    for (let i in conditions) {
      let c = conditions[i]
      if (c) {
        if (availableColumns) {
          for (let j in availableColumns) {
            let column = availableColumns[j]
            if (column && (
            // column.label === c.name ||
              column.value === c.name // ||
            // column.label.split(` (${column.value})`)[0] === c.name
            )) {
              selected.push(column)
            }
          }
        }
      }
    }
  } else {
    console.warn('Could not find query.query; please provide the raw query returned by ConditionalTable ')// eslint-disable-line
  }
  return selected
}
