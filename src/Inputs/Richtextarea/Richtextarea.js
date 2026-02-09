/** @jsx jsx */
import {jsx} from '@emotion/core'
import {useCallback, useEffect, useRef, useState} from 'react'
import PropTypes from 'prop-types'
import Quill from './Quill'
import {randomId, usePrevious} from '../../utils'
import Toolbar from './Toolbar'
import ValidationErrorIcon from '../../ValidationErrorIcon'
import '../../styles/richtext.css'
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
    required,
    maxlength = Number.MAX_SAFE_INTEGER,
    warning,
    'data-testid': testId = props?.name
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

  const [hasBlockedAutoFormat, setHasBlockedAutoFormat] = useState(false)
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
    'color',
    'background'
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
    table: true
  })

  const handleOnChange = useCallback(html => {
    if (!readonly && !disabled) {
      /* If the html formatting is not consistent with Quill's formatting then Quill will auto-format on mount.
      This is undesirable because it will register the onDirty to be true when no user change has
      occurred so this check is added in to prevent quill from auto formatting when mounting */
      if (
        !hasBlockedAutoFormat &&
        typeof value === 'string' &&
        typeof html === 'string' &&
        (
          (value.indexOf('<html') > -1 && html.indexOf('<html') === -1) ||
          (value.indexOf('<head') > -1 && html.indexOf('<head') === -1) ||
          (value.indexOf('<meta') > -1 && html.indexOf('<meta') === -1)
        )
      ) {
        setHasBlockedAutoFormat(true)
      } else if (html) {
        onChange({
          target: {
            name,
            value: html
          }
        })
      }
    }
  }, [onChange, name, readonly, disabled, hasBlockedAutoFormat, value])

  const addTable = useCallback(() => {
    QuillRef.current.editor.getModule('table').insertTable(2, 2)
  }, [QuillRef])

  const removeTable = useCallback(() => {
    QuillRef.current.editor.getModule('table').deleteTable()
  }, [QuillRef])

  const insertRowAbove = useCallback(() => {
    QuillRef.current.editor.getModule('table').insertRowAbove()
  }, [QuillRef])

  const insertRowBelow = useCallback(() => {
    QuillRef.current.editor.getModule('table').insertRowBelow()
  }, [QuillRef])

  const deleteRow = useCallback(() => {
    QuillRef.current.editor.getModule('table').deleteRow()
  }, [QuillRef])

  const insertColumnLeft = useCallback(() => {
    QuillRef.current.editor.getModule('table').insertColumnLeft()
  }, [QuillRef])

  const insertColumnRight = useCallback(() => {
    QuillRef.current.editor.getModule('table').insertColumnRight()
  }, [QuillRef])

  const deleteColumn = useCallback(() => {
    QuillRef.current.editor.getModule('table').deleteColumn()
  }, [QuillRef])

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
  let validationWarning
  let validationError
  if (required && requiredWarning && (value + '').trim().length === 0 && !isFocused) {
    controlClass = controlClass + ' gfb-validation-error'
    validationError = 'This Field is Required'
  }
  if (maxlength && (value + '').length && (value + '').length >= maxlength) {
    validationError = `Maximum character limit of ${maxlength} reached.`
    controlClass = controlClass + ' gfb-validation-error'
  }
  let outerClass = 'gfb-input-outer'
  if (isFocused) {
    outerClass = outerClass + ' gfb-has-focus'
  }

  const inputOuterCSS = {...theme.inputOuter, ...inputOuter}
  const inputInnerCSS = {...theme.inputInner, ...inputInner}
  const inputControlCSS = {...theme.inputControl, ...inputControl}
  const valueContainerCSS = {...theme.valueContainer, ...valueContainer}
  const valueCSS = {...theme.value, ...valueStyle}
  const indicatorsCSS = {...theme.indicators, ...indicators}

  return (
    <div className={outerClass} style={inputOuter} css={inputOuterCSS}>
      <div className='gfb-input-inner' style={inputInner} css={inputInnerCSS}>
        <div className='gfb-input-control-top' style={{display: 'flex'}} data-testid={`${testId}-toolbar`}>
          <Toolbar
            id={elementId.current}
            addTable={addTable}
            removeTable={removeTable}
            insertRowAbove={insertRowAbove}
            insertRowBelow={insertRowBelow}
            deleteRow={deleteRow}
            insertColumnLeft={insertColumnLeft}
            insertColumnRight={insertColumnRight}
            deleteColumn={deleteColumn}
          />
        </div>
        <div className={controlClass} style={inputControl} css={inputControlCSS}>
          <div
            className='gfb-input__value-container notranslate'
            style={valueContainer}
            css={valueContainerCSS}
            data-testid={testId}
          >
            <Quill
              name={name + tabIndex}
              onChange={handleOnChange}
              readOnly={readonly || disabled || !interactive}
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
              css={valueCSS}
              maxLength={maxlength}
              isFocused={isFocused}
            />
          </div>
          <div
            className='gfb-input__indicators'
            style={indicators}
            css={indicatorsCSS}
            data-testid={`${testId}-errors`}
          >
            {warning && !validationError && <ValidationErrorIcon message={warning} color='#FFCC00' type='warning' />}
            {validationWarning && <ValidationErrorIcon message={validationWarning} color='#FFCC00' type='warning' />}
            {validationWarning && validationError && (
              <span className='gfb-input__indicator-separator css-1okebmr-indicatorSeparator' />
            )}
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
  required: PropTypes.bool,
  maxlength: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  warning: PropTypes.string,
  'data-testid': PropTypes.string
}
