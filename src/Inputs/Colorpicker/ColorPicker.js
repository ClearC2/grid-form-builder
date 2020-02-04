import React, {forwardRef, useState, useCallback} from 'react'
import PropTypes from 'prop-types'
import Portal from '../../Portal'
import {SketchPicker, CompactPicker} from 'react-color' // eslint-disable-line
import '../../styles/colorpicker.css'

const ColorPicker = forwardRef((props, ref) => {
  const {inputId, onChange, value, name} = props
  const [picker, setPicker] = useState('compact')

  const togglePickerType = useCallback(() => {
    const newPicker = picker === 'compact' ? 'stretch' : 'compact'
    setPicker(newPicker)
  }, [picker])

  const handleOnChange = useCallback(e => {
    const {hex} = e
    onChange({
      target: {
        name,
        value: hex
      }
    })
  }, [onChange, name])

  const Picker = picker === 'compact' ? CompactPicker : SketchPicker
  return (
    <Portal id={inputId} ref={ref}>
      <div className='gfb-color-picker-container'>
        <div className='gfb-color-picker-type-toggle'>
          <button className='btn btn-primary' onClick={togglePickerType}>
            Toggle Picker Type
          </button>
        </div>
        <Picker
          onChange={handleOnChange}
          color={value}
        />
      </div>
    </Portal>
  )
})

export default ColorPicker

ColorPicker.propTypes = {
  inputId: PropTypes.string,
  pickerId: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object]),
  onChange: PropTypes.func,
  name: PropTypes.string
}
