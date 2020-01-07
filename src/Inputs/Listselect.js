import React, {useState, useCallback, useEffect} from 'react'
import PropTypes from 'prop-types'

const Listselect = props => {
  const {name, onChange, keyword} = props
  const {options = []} = keyword
  const [value, updateValue] = useState([])

  useEffect(() => {
    let val = props.value
    if (typeof val === 'string') val = val.split('¤')
    val = val.filter(val => !!val)
    updateValue(val)
  }, [props.value, props.value.length])

  const handleOnChange = useCallback(e => {
    const {innerHTML: clickedValue} = e.target
    let newvalue = [...value]
    if (newvalue.indexOf(clickedValue) > -1) {
      newvalue = newvalue.filter(val => val !== clickedValue)
    } else {
      newvalue.push(clickedValue)
    }
    onChange({
      target: {
        name,
        value: newvalue
      }
    })
  }, [name, onChange, value])

  return (
    <div className='gfb-input-outer'>
      <div className='gfb-input-inner'>
        <div className='gfb-input__control'>
          <div className='gfb-input__value-container gfb-value-multi-input-container'>
            {options.map((option, i) => {
              const display = option.label ? option.label : option.value
              const selected = value.indexOf(display) > -1
              let className = 'gfb-input__single-value gfb-input__input gfb-multi-input-input'
              if (selected) className = className + ' gfb-multi-input-selected'
              return (
                <div
                  key={i}
                  className={className}
                  onClick={handleOnChange}
                >
                  {display}
                </div>
              )
            })}
          </div>
          <div className='gfb-input-indicators' />
        </div>
      </div>
    </div>
  )
}

export default Listselect

Listselect.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object]),
  keyword: PropTypes.object
}
