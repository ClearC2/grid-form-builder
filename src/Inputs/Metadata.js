/** @jsx jsx */
import {jsx} from '@emotion/core'
import PropTypes from 'prop-types'
import useTheme from '../theme/useTheme'

const Metadata = props => {
  const {
    value = '',
    style = {}
  } = props

  const {
    value: valueStyle = {},
    inputOuter = {},
    inputInner = {},
    inputControl = {},
    valueContainer = {},
    indicators = {}
  } = style

  const {theme} = useTheme()

  return (
    <div className='gfb-input-outer' style={inputOuter} css={theme.inputOuter}>
      <div className='gfb-input-inner' style={inputInner} css={theme.inputInner}>
        <div className='gfb-input__control gfb-boxless-input' style={inputControl} css={theme.inputControl}>
          <div className='gfb-input__value-container' style={valueContainer} css={theme.valueContainer}>
            <strong style={valueStyle} css={theme.value}>{value}</strong>
          </div>
          <div className='gfb-input__indicators' style={indicators} css={theme.indicators} />
        </div>
      </div>
    </div>
  )
}

export default Metadata

Metadata.propTypes = {
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object]),
  style: PropTypes.object
}
