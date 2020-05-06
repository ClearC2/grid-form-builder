/** @jsx jsx */
import {jsx} from '@emotion/core'
import {useCallback, useEffect, useRef, useState} from 'react'
import PropTypes from 'prop-types'
import ReactQuill from 'react-quill'
import {randomId, usePrevious} from '../../utils'
import Toolbar from './Toolbar'
import ValidationErrorIcon from '../../ValidationErrorIcon'
import '../../styles/richtext.css'
import 'react-quill/dist/quill.snow.css'
import 'react-quill/dist/quill.core.css'
import useTheme from '../../theme/useTheme'

const Richtextarea = props => {
  const {
    name,
    value = '<p>&nbsp;</p>',
    onChange,
    readonly,
    disabled,
    autofocus,
    placeholder,
    tabIndex,
    handleRTEImageClick,
    rteImageUrl,
    autoComplete,
    interactive = true,
    requiredWarning,
    style = {},
    required
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

  const [isFocused, setIsFocused] = useState(false)
  const elementId = useRef('gfb-' + randomId())
  const QuillRef = useRef()
  const formats = useRef([
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'color'
  ])

  const insertImage = useCallback(() => {
    handleRTEImageClick(name)
  }, [handleRTEImageClick, name])

  const modules = useRef({
    toolbar: {
      container: `#${elementId.current}`,
      handlers: {
        insertImage
      }
    },
    clipboard: {
      matchVisual: false
    }
  })

  const handleOnChange = useCallback(html => {
    /* If the html formatting is not consistent with Quill's formatting then Quill will auto-format on mount.
    This is undesirable because it will register the onDirty to be true when no user change has
    occurred so this check is added in to prevent quill from auto formatting when mounting */
    if (html !== '<p><br></p>' && isFocused) {
      onChange({
        target: {
          name,
          value: html
        }
      })
    }
  }, [isFocused, onChange, name])

  const previousRTEImageUrl = usePrevious(rteImageUrl)

  useEffect(() => {
    if (rteImageUrl && previousRTEImageUrl !== rteImageUrl && QuillRef.current) {
      const input = QuillRef.current.getEditor()
      const cursor = input.getSelection(true) ? input.getSelection(true).index : 0
      input.insertEmbed(cursor, 'image', rteImageUrl)
      input.setSelection(cursor + 1)
    }
  }, [rteImageUrl, previousRTEImageUrl, name])

  const handleOnFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  const handleOnBlur = useCallback(() => {
    setIsFocused(false)
  }, [])

  let className = 'gfb-input__single-value gfb-input__input'
  if (readonly || disabled || !interactive) className = className + ' gfb-disabled-input'
  if (!interactive) className = className + ' gfb-non-interactive-input'
  let controlClass = 'gfb-input__control'
  let validationError
  if (required && requiredWarning && (value + '').length === 0 && !isFocused) {
    controlClass = controlClass + ' gfb-validation-error'
    validationError = 'This Field is Required'
  }
  let outerClass = 'gfb-input-outer'
  if (isFocused) {
    outerClass = outerClass + ' gfb-has-focus'
  }

  return (
    <div className={outerClass} style={inputOuter} css={theme.inputOuter}>
      <div className='gfb-input-inner' style={inputInner} css={theme.inputInner}>
        <div className='gfb-input-control-top'>
          <Toolbar id={elementId.current} />
        </div>
        <div className={controlClass} style={inputControl} css={theme.inputControl}>
          <div className='gfb-input__value-container' style={valueContainer} css={theme.valueContainer}>
            <ReactQuill
              onChange={handleOnChange}
              disabled={readonly || disabled || !interactive}
              className={className}
              ref={QuillRef}
              value={value}
              placeholder={placeholder}
              modules={modules.current}
              formats={formats.current}
              autofocus={autofocus}
              tabIndex={tabIndex}
              scrollingContainer='scrolling-container'
              theme='snow'
              autoComplete={autoComplete}
              onFocus={handleOnFocus}
              onBlur={handleOnBlur}
              style={valueStyle}
              css={theme.value}
            />
          </div>
          <div className='gfb-input__indicators' style={indicators} css={theme.indicators}>
            {validationError && <ValidationErrorIcon message={validationError} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Richtextarea

Richtextarea.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object, PropTypes.bool]),
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  autofocus: PropTypes.bool,
  placeholder: PropTypes.string,
  tabIndex: PropTypes.number,
  handleRTEImageClick: PropTypes.func,
  rteImageUrl: PropTypes.string,
  autoComplete: PropTypes.string,
  interactive: PropTypes.bool,
  requiredWarning: PropTypes.bool,
  style: PropTypes.object,
  required: PropTypes.bool
}
