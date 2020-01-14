import React, {useCallback, useEffect, useRef, useState, useMemo} from 'react'
import PropTypes from 'prop-types'
import ColorPicker from './ColorPicker'

const ColorInput = props => {
  const {name, value, readonly, disabled, autofocus, placeholder, tabIndex, onChange} = props
  let className = 'gfb-input__single-value gfb-input__input'
  if (readonly || disabled) className = className + ' gfb-disabled-input'
  const [showPicker, setShowPicker] = useState(false)
  const inputId = useRef(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15))
  const portalRef = useRef()

  const windowClickListener = useMemo(() => {
    return e => {
      const insideClick = e.path.some(path => {
        return (
          path.id === inputId.current ||
          path.id === portalRef.current.state.id
        )
      })
      if (!insideClick) {
        setShowPicker(false)
      }
    }
  }, [])

  useEffect(() => {
    if (showPicker) window.addEventListener('mousedown', windowClickListener)
    else window.removeEventListener('mousedown', windowClickListener)
  }, [showPicker, windowClickListener])

  const handleOnInputChange = useCallback(e => {
    let {value: newValue} = e.target
    if (typeof newValue === 'string') newValue = newValue.toUpperCase()
    onChange({
      target: {
        name,
        value: newValue
      }
    })
    if (!showPicker) setShowPicker(true)
  }, [showPicker, setShowPicker, name, onChange])

  const handleOnFocus = useCallback(() => {
    setShowPicker(true)
  }, [setShowPicker])

  return (
    <div className='gfb-input-outer'>
      <div className='gfb-input-inner'>
        <div className='gfb-input__control'>
          <div className='gfb-input__value-container'>
            <input
              id={inputId.current}
              className={className}
              name={name}
              value={value}
              onChange={handleOnInputChange}
              disabled={readonly || disabled}
              autoFocus={autofocus}
              placeholder={placeholder}
              tabIndex={tabIndex}
              onFocus={handleOnFocus}
            />
            {showPicker && (
              <ColorPicker
                ref={portalRef}
                inputId={inputId.current}
                value={value}
                onChange={handleOnInputChange}
                name={name}
              />
            )}
          </div>
          <div className='gfb-input__indicators'>
            <div
              className='gfb-color-input-indicator'
              style={{backgroundColor: value}}
              onClick={handleOnFocus}
            />
          </div>
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
