/** @jsx jsx */
import {jsx} from '@emotion/core'
import PropTypes from 'prop-types'
import ValidationErrorIcon from '../../ValidationErrorIcon'
import useTheme from '../../theme/useTheme'
import {useCallback, useState} from 'react'
import {FaChevronDown} from 'react-icons/fa'
import '../../styles/native-select.css'

const NativeSelect = props => {
  const {
    value = '',
    tabIndex,
    disabled,
    readonly,
    name,
    keyword = {},
    requiredWarning,
    required,
    onChange,
    interactive = true,
    style = {},
    device
  } = props

  const {
    value: valueStyle = {},
    inputOuter = {},
    inputInner = {},
    inputControl = {},
    valueContainer = {},
    indicators = {},
    options: optionsStyle = {}
  } = style

  const {theme} = useTheme()

  const {
    value: valueTheme = {},
    options: optionsTheme = {}
  } = theme

  const [options] = useState(keyword.options || [])

  const platform = device.platform.toLowerCase()

  const handleOnChange = useCallback(e => {
    const {value} = e.target
    onChange({target: {value, name}})
  }, [onChange, name])

  let className = 'gfb-input__single-value gfb-input__input gfb-select-webkit-none'
  if (readonly || disabled || !interactive) className = className + ' gfb-disabled-input'
  if (!interactive) className = className + ' gfb-non-interactive-input'
  const valueContainerClassName = 'gfb-input__value-container gfb-value-multi-input-container'
  let controlClass = 'gfb-input__control'
  let validationError
  if (required && requiredWarning && value.length === 0) {
    controlClass = controlClass + ' gfb-validation-error'
    validationError = 'This Field is Required'
  }
  let indicatorClass = 'gfb-input__indicators'
  if (readonly || disabled || !interactive) indicatorClass = indicatorClass + ' gfb-disabled-input'
  let indSeparatorClass = 'gfb-input__indicator-separator css-1okebmr-indicatorSeparator gfb-nat-select-separator'
  if (readonly || disabled || !interactive) indSeparatorClass = indSeparatorClass + ' gfb-disabled-indicator-separator'
  return (
    <div className='gfb-input-outer' style={inputOuter} css={theme.inputOuter}>
      <div className='gfb-input-inner' style={inputInner} css={theme.inputInner}>
        <div className={controlClass} style={inputControl} css={theme.inputControl}>
          <div className={valueContainerClassName} style={valueContainer} css={theme.valueContainer}>
            <select
              className={className}
              onChange={handleOnChange}
              style={valueStyle}
              css={valueTheme}
              disabled={readonly || disabled || !interactive}
              tabIndex={tabIndex}
              value={value}
            >
              <option
                name={name}
                value=''
                style={optionsStyle}
                css={optionsTheme}
              />
              {options.map((option, i) => {
                return (
                  <option
                    key={i}
                    name={name}
                    value={option.value}
                    style={optionsStyle}
                    css={optionsTheme}
                  >
                    {option.label ? option.label : option.value}
                  </option>
                )
              })}
            </select>
          </div>
          <div className={indicatorClass} style={indicators} css={theme.indicators}>
            <span className={indSeparatorClass} />
            <FaChevronDown
              className={
                platform === 'ios'
                  ? 'gfb-native-select-ios-down-indicator'
                  : platform === 'android'
                    ? 'gfb-native-select-android-down-indicator'
                    : platform === 'browser'
                      ? 'gfb-native-select-web-down-indicator'
                      : ''
              }
            />
            {validationError && <ValidationErrorIcon message={validationError} />}
          </div>
        </div>
      </div>
    </div>
  )
}

NativeSelect.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object]),
  keyword: PropTypes.object,
  tabIndex: PropTypes.number,
  allowcreate: PropTypes.bool,
  autofocus: PropTypes.bool,
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  placeholder: PropTypes.string,
  requiredWarning: PropTypes.bool,
  required: PropTypes.bool,
  values: PropTypes.object,
  persist: PropTypes.bool,
  onKeyDown: PropTypes.func,
  autoComplete: PropTypes.string,
  interactive: PropTypes.bool,
  style: PropTypes.object,
  isClearable: PropTypes.bool,
  device: PropTypes.object
}

export default NativeSelect
