/** @jsx jsx */
import {jsx} from '@emotion/core'
import PropTypes from 'prop-types'
import useTheme from '../theme/useTheme'

const Metadata = (props) => {
  const {value = '', style = {}, 'data-testid': testId = props?.name} = props

  const {
    value: valueStyle = {},
    inputOuter = {},
    inputInner = {},
    inputControl = {},
    valueContainer = {},
    indicators = {}
  } = style

  const {theme} = useTheme()

  const inputOuterCSS = {...theme.inputOuter, ...inputOuter}
  const inputInnerCSS = {...theme.inputInner, ...inputInner}
  const inputControlCSS = {...theme.inputControl, ...inputControl}
  const valueContainerCSS = {...theme.valueContainer, ...valueContainer}
  const valueCSS = {...theme.value, ...valueStyle}
  const indicatorsCSS = {...theme.indicators, ...indicators}

  return (
    <div className='gfb-input-outer' style={inputOuter} css={inputOuterCSS}>
      <div className='gfb-input-inner' style={inputInner} css={inputInnerCSS}>
        <div className='gfb-input__control gfb-boxless-input' style={inputControl} css={inputControlCSS}>
          <div
            className='gfb-input__value-container'
            style={valueContainer}
            css={valueContainerCSS}
            data-testid={testId}
          >
            <strong style={valueStyle} css={valueCSS}>
              {value}
            </strong>
          </div>
          <div className='gfb-input__indicators' style={indicators} css={indicatorsCSS} />
        </div>
      </div>
    </div>
  )
}

export default Metadata

Metadata.propTypes = {
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object, PropTypes.bool]),
  style: PropTypes.object,
  'data-testid': PropTypes.string
}
