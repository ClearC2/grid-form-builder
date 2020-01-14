import React, {useCallback, useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import ReactQuill from 'react-quill'
import Toolbar from './Toolbar'
import './richtext.css'

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
    rteImageUrl
  } = props
  const elementId = useRef(
    'gfb-' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  )
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
    if (html !== '<p><br></p>') {
      onChange({
        target: {
          name,
          value: html
        }
      })
    }
  }, [onChange, name])

  useEffect(() => {
    if (rteImageUrl && QuillRef.current) { // we may have to add a more liberal check if this causes multiple images to be added - JRA 01/14/2020
      const input = QuillRef.current.getEditor()
      const cursor = input.getSelection(true) ? input.getSelection(true).index : 0
      input.insertEmbed(cursor, 'image', rteImageUrl)
      input.setSelection(cursor + 1)
    }
  }, [rteImageUrl])

  let className = 'gfb-input__single-value gfb-input__input'
  if (readonly || disabled) className = className + ' gfb-disabled-input'
  return (
    <div className='gfb-input-outer'>
      <div className='gfb-input-inner'>
        <div className='gfb-input-control-top'>
          <Toolbar id={elementId.current} />
        </div>
        <div className='gfb-input__control'>
          <div className='gfb-input__value-container'>
            <ReactQuill
              onChange={handleOnChange}
              disabled={readonly || disabled}
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
            />
          </div>
          <div className='gfb-input__indicators' />
        </div>
      </div>
    </div>
  )
}

export default Richtextarea

Richtextarea.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object]),
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  autofocus: PropTypes.bool,
  placeholder: PropTypes.string,
  tabIndex: PropTypes.number,
  handleRTEImageClick: PropTypes.func,
  rteImageUrl: PropTypes.string
}
