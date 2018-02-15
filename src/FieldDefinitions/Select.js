import React, {Component} from 'react'
import {Map, List} from 'immutable'

export default class Select extends Component {
  render = () => {
    const {inline, field, formValues = Map(), handleOnChange = () => {}, prepops = List(), opts = {}} = this.props
    const {options = List(), label = field, style = {}, labelStyle = {}, Icon = null, iconProps = {}, props = {}} = opts

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
        display: 'flex',
        flexGrow: 1,
        height: inline ? 27 : 25,
        borderBottom: '1px solid #a0a0a0',
        borderTop: inline ? 0 : '1px solid #a0a0a0',
        borderLeft: inline ? 0 : '1px solid #a0a0a0',
        borderRight: inline ? 0 : '1px solid #a0a0a0',
        paddingLeft: 5,
        minWidth: 90,
        ...style
      }
    }

    return (
      <div style={styles.container}>
        <div style={styles.labelContainer}>
          {!!Icon && <Icon size={20} style={styles.icon} {...iconProps} />}
          <strong style={styles.label}>{label}</strong>
        </div>
        <select onChange={handleOnChange} className='select-grid-input' style={styles.input} name={field} value={formValues.get(field, '')} {...props}>
          <option key='blank' value='' />{/* {should all selects have a blank option?} */}
          {options.map(value => <option key={value} value={value}>{value}</option>)}
          {prepops.map(value => {
            if (typeof value === 'string') return <option key={value} value={value}>{value}</option>
            else if (typeof value === 'object') {
              return value.map((i, subval) => { // returning a Map throws a React warning, but ideally prepops are not Maps
                if (typeof subval === 'string') return <option key={subval} value={subval}>{subval}</option>
              })
            } else return null
          })
          }
        </select>
      </div>
    )
  }
}
