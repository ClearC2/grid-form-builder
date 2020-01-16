import React, {useCallback, useRef} from 'react'
import PropTypes from 'prop-types'
// import Cleave from 'cleave.js/react'
import Cleave from '../Cleave'// switch this back to cleave.js package as soon they remove the deprecated lifecycles - JRA 01/15/2020

const Number = props => {
  const {
    name,
    value,
    onChange,
    readonly,
    disabled,
    autofocus,
    placeholder,
    tabIndex,
    autoComplete,
    delimiter = ',',
    prefix = '',
    numeralDecimalMark = '.',
    maximum = 9007199254740991,
    minimum = -9007199254740991,
    decimals = 0,
    interactive = true
  } = props

  const input = useRef()

  const handleOnChange = useCallback(e => {
    let {value: newValue} = e.target
    if (input.current) {
      newValue = input.current.getRawValue()
    }
    if (prefix) newValue = newValue.replace(prefix, '')
    if (isNaN(+newValue) || +newValue > maximum || +newValue < minimum) { // if our value is not within our bounds, do not update the value
      newValue = value
      if (input.current) { // if we have the ref of the cleave input, let's update its state back to a valid number so the user does not get confused
        window.setTimeout(() => {
          input.current.setState({value: input.current.lastInputValue})
        }, 5) // the package has its own timeout in it which breaks the react lifecycle, so we need to play dirty too - JRA 01/15/2020
      }
    }
    onChange({
      target: {
        value: newValue,
        name
      }
    })
  }, [value, prefix, onChange, name, maximum, minimum])

  let className = 'gfb-input__single-value gfb-input__input'
  if (readonly || disabled) className = className + ' gfb-disabled-input'
  return (
    <div className='gfb-input-outer'>
      <div className='gfb-input-inner'>
        <div className='gfb-input__control'>
          <div className='gfb-input__value-container'>
            <Cleave
              ref={input}
              options={{
                numeral: true,
                prefix,
                numeralDecimalMark,
                delimiter,
                numeralDecimalScale: decimals
              }}
              className={className}
              name={name}
              value={value}
              onChange={handleOnChange}
              disabled={readonly || disabled}
              autoFocus={autofocus}
              placeholder={placeholder}
              tabIndex={tabIndex}
              autoComplete={autoComplete}
            />
          </div>
          <div className='gfb-input__indicators' />
        </div>
      </div>
    </div>
  )
}

export default Number

Number.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object]),
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  autofocus: PropTypes.bool,
  placeholder: PropTypes.string,
  tabIndex: PropTypes.number,
  autoComplete: PropTypes.string,
  delimiter: PropTypes.string,
  prefix: PropTypes.string,
  numeralDecimalMark: PropTypes.string,
  maximum: PropTypes.number,
  minimum: PropTypes.number,
  decimals: PropTypes.number,
  interactive: PropTypes.bool
}
