import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

export class ReactQuill extends Component {
  static propTypes = {
    name: PropTypes.string,
    theme: PropTypes.string,
    modules: PropTypes.object,
    formats: PropTypes.array,
    onChange: PropTypes.func,
    value: PropTypes.string,
    readOnly: PropTypes.bool,
    isFocused: PropTypes.bool,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    css: PropTypes.object,
    tabIndex: PropTypes.number,
    className: PropTypes.string
  }

  editor = null

  getEditor = () => this.editor

  createEditor = () => {
    const {theme = 'snow', modules = {}, name} = this.props
    this.editor = new Quill(`#${name}`, {
      theme,
      scrollingContainer: 'div',
      modules
    })
    this.attachEventListeners()
    this.setReadOnly()
    this.setCurrentValueInEditor()
  }

  attachEventListeners = () => {
    if (!this.editor) return
    this.editor.on('editor-change', this.onEditorChange)
  }

  setReadOnly = () => {
    this.editor.enable(!this.props.readOnly)
  }

  onEditorChange = (event, ...args) => {
    if (event === 'text-change') {
      this.onTextChange(...args)
    }
  }

  debounce = null

  onTextChange = (delta, oldDelta, source) => {
    if (source !== 'api') {
      clearTimeout(this.debounce)
      this.debounce = setTimeout(() => {
        const html = this.editor?.root?.innerHTML || this.editor?.getSemanticHTML() || ''
        this.props.onChange(html)
      }, 750)
    }
  }

  setCurrentValueInEditor = () => {
    const {isFocused} = this.props
    let {value} = this.props
    if (!this.editor || typeof value === 'undefined') return
    let cursor = 0
    if (isFocused && this.editor.getSelection(true)) {
      cursor = this.editor.getSelection(true).index // do not poll the selection if the input is not focused because it will scroll the element into view when you don't want it to - JRA 01/13/25
    }
    if (typeof value === 'string') {
      value = value.replaceAll(' ', '&nbsp;') // this fixes an issue where multiple spaces/trailing spaces in the markup are truncated - JRA 01/16/25
    }
    this.editor.clipboard.dangerouslyPasteHTML(value)
    if (isFocused) {
      this.editor.setSelection(cursor)
    } else {
      this.editor.blur()
    }
  }

  componentDidUpdate (p) {
    if (this.props.value !== p.value) {
      this.setCurrentValueInEditor()
    }
    if (this.props.readOnly !== p.readOnly) {
      this.setReadOnly()
    }
  }

  componentDidMount () {
    this.setCurrentValueInEditor()
    this.createEditor()
  }

  render () {
    const {name, onFocus, onBlur, css = {}, tabIndex, className} = this.props
    return (
      <div
        id={name}
        className={className}
        style={{width: '100%', ...css}}
        onFocus={onFocus}
        onBlur={onBlur}
        tabIndex={tabIndex}
      />
    )
  }
}

export default ReactQuill
