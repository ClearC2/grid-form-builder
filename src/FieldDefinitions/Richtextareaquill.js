import React from 'react'
import PropTypes from 'prop-types'
import {Map} from 'immutable'
import {DropTarget} from 'react-dnd'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import 'react-quill/dist/quill.core.css'
import Image from 'react-icons/lib/fa/image'
import uniqueId from 'react-html-id'

const CustomToolbar = ({ID}) => (
  <div id={ID} style={{backgroundColor: '#fafafa'}}>
    <select className='ql-header' defaultValue={'normal'} onChange={e => e.persist()}>
      <option value='1' />
      <option value='2' />
      <option value='3' />
      <option value='normal' />
    </select>
    <button className='ql-bold' />
    <button className='ql-italic' />
    <button className='ql-underline' />
    <button className='ql-link' />
    <button className='ql-list' value='bullet' />
    <button className='ql-list' value='ordered' />
    <button className='ql-blockquote' />
    <button className='ql-insertImage' >
      <Image />
    </button>
  </div>
)

CustomToolbar.propTypes = {
  ID: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

class Richtextareaquill extends React.Component {
  static propTypes = {
    formValues: PropTypes.object,
    config: PropTypes.object,
    didDrop: PropTypes.bool,
    isOver: PropTypes.bool,
    droppedItem: PropTypes.object,
    handleDragDropOnInput: PropTypes.func,
    handleAnywhereClick: PropTypes.func,
    handleCascadeKeywordClick: PropTypes.func,
    handleOnChange: PropTypes.func,
    draggable: PropTypes.bool,
    inline: PropTypes.bool,
    Icon: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    requiredWarning: PropTypes.bool,
    connectDropTarget: PropTypes.func,
    cascadingKeyword: PropTypes.string,
    CascadeIcon: PropTypes.func,
    tabIndex: PropTypes.number,
    LinkIcon: PropTypes.func,
    handleLinkClick: PropTypes.func,
    placeholder: PropTypes.string
  }
  constructor (props) {
    super(props)
    this.quillRef = null
    this.reactQuillRef = null
    uniqueId.enableUniqueIds(this)
    this.nextUniqueId()
    this.latestUniqueId = this.lastUniqueId()
    this.modules = {
      toolbar: {
        container: `#${this.latestUniqueId}`,
        handlers: {
          insertImage: () => this.insertImage(this.props)
        }
      },
      clipboard: {
        matchVisual: false
      }
    }

    this.formats = [
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
    ]
  }

  componentDidMount () {
    this.attachQuillRefs()
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    const {rteImageUrl: rteImageUrlPrev} = prevProps.config
    const {rteImageUrl} = this.props.config
    this.attachQuillRefs()
    if (rteImageUrl && (rteImageUrlPrev !== rteImageUrl)) {
      this.handleImageInsertion(rteImageUrl)
    }
  }

  attachQuillRefs = () => {
    if (typeof this.reactQuillRef.getEditor !== 'function') return
    this.quillRef = this.reactQuillRef.getEditor()
  }

  handleChange = (html) => {
    const {handleOnChange, config = {}} = this.props
    const {name = null} = config
    const value = html

    if (value !== '<p><br></p>') {
      handleOnChange({
        target: {
          name,
          value
        }
      })
    }
  }

  insertImage (props) {
    props.handleRTEImageClick(props.config.name)
  }

  handleImageInsertion = (url) => {
    if (this.quillRef === null) return
    const cursorPosition = this.quillRef.getSelection(true) ? this.quillRef.getSelection(true).index : 0
    this.quillRef.insertEmbed(cursorPosition, 'image', url)
    this.quillRef.setSelection(cursorPosition + 1)
  }

  handleAnywhereClick = e => {
    const {handleAnywhereClick = () => null, formValues = Map()} = this.props
    let {config = {}} = this.props
    const currentValue = formValues.get(config.name, '')
    config = {currentValue, ...config}
    handleAnywhereClick(config, e)
  }

  render () {
    const {config = {}, Icon = null, inline, formValues = Map()} = this.props
    const {name = null, required = false} = config
    let {labelStyle = {}, containerStyle = {}, iconStyle = {}, rteStyle = {}} = config
    containerStyle = typeof containerStyle === 'string' ? JSON.parse(containerStyle) : containerStyle
    labelStyle = typeof labelStyle === 'string' ? JSON.parse(labelStyle) : labelStyle
    iconStyle = typeof iconStyle === 'string' ? JSON.parse(iconStyle) : iconStyle
    rteStyle = typeof rteStyle === 'string' ? JSON.parse(rteStyle) : rteStyle

    if (!name) return null
    const {label = name} = config
    const value = formValues.get(name, '<p>&nbsp;</p>')
    const styles = {
      container: {
        display: 'flex',
        flex: 1,
        flexDirection: inline ? 'row' : 'column',
        background: 'transparent',
        height: 'calc(100%-55px)',
        ...containerStyle
      },
      labelContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: inline ? 150 : '100%',
        minWidth: inline ? 150 : '100%',
        height: 15,
        marginTop: inline ? 4 : 0,
        background: 'transparent',
        ...labelStyle
      },
      label: {
        display: 'flex',
        justifyContent: 'flex-start',
        lineHeight: inline ? '23px' : '15px',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        fontSize: inline ? '10pt' : '8pt',
        color: '#383e4b',
        background: 'transparent',
        marginRight: 5,
        ...labelStyle
      },
      icon: {
        marginRight: 5,
        width: 15,
        height: 15,
        marginTop: inline ? 4 : -1,
        ...iconStyle
      }
    }
    return (
      this.props.connectDropTarget(
        <div style={styles.container} onMouseUp={this.handleAnywhereClick}>
          <div style={styles.labelContainer}>
            {required && (
              <div style={{color: '#ec1c24', fontWeight: 'bold', fontSize: '15pt', lineHeight: '10pt'}}>*</div>
            )}
            {Icon && <Icon style={styles.icon} />}
            <strong style={styles.label} >{label}</strong>
          </div>
          <CustomToolbar ID={this.latestUniqueId} />
          <ReactQuill
            ref={el => {
              this.reactQuillRef = el
            }}
            style={rteStyle}
            value={value}
            onChange={this.handleChange}
            placeholder={this.props.placeholder}
            modules={this.modules}
            formats={this.formats}
            scrollingContainer='scrolling-container'
            theme={'snow'}
          />
        </div>
      )
    )
  }
}

function collect (connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    droppedItem: monitor.getDropResult(),
    didDrop: monitor.didDrop(),
    isOver: monitor.isOver()
  }
}

const boxTarget = {
  drop (props, monitor) {
    return {
      widget: monitor.getItem()
    }
  }
}

export default DropTarget('FormBuilderDraggable', boxTarget, collect)(Richtextareaquill)
