import React, {useCallback, useEffect, useRef, useState} from 'react'
import PropTypes from 'prop-types'
import ColorPicker from './ColorPicker'

const ColorInput = props => {
  const {name, value, readonly, disabled, autofocus, placeholder, tabIndex} = props
  let className = 'gfb-input__single-value gfb-input__input'
  if (readonly || disabled) className = className + ' gfb-disabled-input'
  const [showPicker, setShowPicker] = useState(false)
  const [inputValue, changeInputValue] = useState('')
  const elementId = useRef(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15))

  useEffect(() => {
    changeInputValue(value)
  }, [value])

  const handleOnInputChange = useCallback(e => {
    const {value: newValue} = e.target
    changeInputValue(newValue)
    if (!showPicker) setShowPicker(true)
  }, [changeInputValue, showPicker, setShowPicker])

  const handleOnFocus = useCallback(() => {
    setShowPicker(true)
  }, [setShowPicker])

  return (
    <div className='gfb-input-outer'>
      <div className='gfb-input-inner'>
        <div className='gfb-input__control'>
          <div className='gfb-input__value-container'>
            <input
              id={elementId.current}
              className={className}
              name={name}
              value={inputValue}
              onChange={handleOnInputChange}
              disabled={readonly || disabled}
              autoFocus={autofocus}
              placeholder={placeholder}
              tabIndex={tabIndex}
              onFocus={handleOnFocus}
            />
            {showPicker && (
              <ColorPicker
                elementId={elementId.current}
              />
            )}
          </div>
          <div className='gfb-input-indicators' />
        </div>
      </div>
    </div>
  )
}

export default ColorInput

ColorInput.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object]),
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  autofocus: PropTypes.bool,
  placeholder: PropTypes.string,
  tabIndex: PropTypes.number
}
