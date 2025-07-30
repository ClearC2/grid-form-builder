/** @jsx jsx */
import {jsx} from '@emotion/core'
import PropTypes from 'prop-types'
import useTheme from '../theme/useTheme'
import '../styles/html.css'

const HTML = props => {
  const {
    value = '',
    style = {},
    disabled = true,
    readonly = true,
    'data-testid': testId = props?.['data-testid'] || props?.name
  } = props

  const contentEditable = readonly === false || disabled === false

  const {
    value: valueStyle = {},
    inputOuter = {},
    inputInner = {},
    inputControl = {},
    valueContainer = {}
  } = style

  const {theme} = useTheme()

  const controlClass = 'gfb-input__control'
  const outerClass = 'gfb-input-outer'
  const inputOuterCSS = {...theme.inputOuter, ...inputOuter}
  const inputInnerCSS = {...theme.inputInner, ...inputInner}
  const inputControlCSS = {...theme.inputControl, ...inputControl}
  const valueContainerCSS = {...theme.valueContainer, ...valueContainer}
  const valueCSS = {
    height: '100%',
    width: '100%',
    backgroundColor: contentEditable ? 'transparent' : '#fafafa',
    ...theme.value,
    ...valueStyle
  }

  return (
    <div className={outerClass} style={inputOuter} css={inputOuterCSS}>
      <div className='gfb-input-inner' style={inputInner} css={inputInnerCSS}>
        <div className={controlClass} style={inputControl} css={inputControlCSS}>
          <div className='gfb-input__value-container' style={valueContainer} css={valueContainerCSS}>
            <div css={valueCSS}>
              <div
                contentEditable={contentEditable}
                className='gfb-html-display-container'
                dangerouslySetInnerHTML={{__html: value}}
                style={{...valueStyle}}
                data-testid={testId}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HTML

HTML.propTypes = {
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object, PropTypes.bool]),
  placeholder: PropTypes.string,
  style: PropTypes.object,
  readonly: PropTypes.bool,
  disabled: PropTypes.bool,
  'data-testid': PropTypes.string
}
