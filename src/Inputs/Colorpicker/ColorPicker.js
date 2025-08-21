import React, {forwardRef, useState, useCallback} from 'react'
import PropTypes from 'prop-types'
import Portal from '../../Portal'
import {SketchPicker, CompactPicker} from 'react-color' // eslint-disable-line
import '../../styles/colorpicker.css'

const ColorPicker = forwardRef((props, ref) => {
  const {inputId, onChange, value, name, onChangeComplete, 'data-testid': testId = props?.name} = props
  const [picker, setPicker] = useState('compact')

  const togglePickerType = useCallback(() => {
    const newPicker = picker === 'compact' ? 'stretch' : 'compact'
    setPicker(newPicker)
  }, [picker])

  const decimalToHex = (alpha) => alpha === 0 ? '00' : Math.round(255 * alpha).toString(16)

  const handleOnChange = useCallback(e => {
    const hexCode = `${e.hex}${decimalToHex(e.rgb.a)}`
    onChange({
      target: {
        name,
        value: hexCode
      }
    })
  }, [onChange, name])

  const Picker = picker === 'compact' ? CompactPicker : SketchPicker
  return (
    <Portal id={inputId} ref={ref}>
      <div className='gfb-color-picker-container'>
        <div className='gfb-color-picker-type-toggle'>
          <button className='btn btn-primary' onClick={togglePickerType} data-testid={`${testId}-picker-type`}>
            Toggle Picker Type
          </button>
        </div>
        <Picker onChangeComplete={onChangeComplete} onChange={handleOnChange} color={value} data-testid={testId} />
      </div>
    </Portal>
  )
})

export default ColorPicker

ColorPicker.propTypes = {
  inputId: PropTypes.string,
  pickerId: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object, PropTypes.bool]),
  onChange: PropTypes.func,
  onChangeComplete: PropTypes.func,
  name: PropTypes.string,
  'data-testid': PropTypes.string
}
