import React, {forwardRef} from 'react'
import PropTypes from 'prop-types'
import Portal from '../../Portal'
import {SketchPicker, CompactPicker} from 'react-color' // eslint-disable-line
import '../../../styles/colorpicker.css'

const ColorPicker = forwardRef((props, ref) => {
  const {inputId} = props
  return (
    <Portal id={inputId} ref={ref}>
      <div>
        <CompactPicker />
      </div>
    </Portal>
  )
})

export default ColorPicker

ColorPicker.propTypes = {
  inputId: PropTypes.string,
  pickerId: PropTypes.string
}
