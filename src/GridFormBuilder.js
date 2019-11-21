import React, {Component} from 'react'
import PropTypes from 'prop-types'
import $ from 'jquery'
import WidgetGrid from './WidgetGrid'
import {Map, Set} from 'immutable'
import {emailValidator} from './utils'
import {convertFieldToSearch} from './QueryBuilder/Utils'
import {IconLibrary} from './Icons'
import {FormComponents} from './FieldDefinitions'

class FormBuilder extends Component { //eslint-disable-line
  static propTypes = {
    conditionalFieldValues: PropTypes.bool,
    conditionalSearch: PropTypes.bool,
    draggable: PropTypes.bool,
    formName: PropTypes.string.isRequired,
    formSchema: PropTypes.object,
    formValues: PropTypes.object,
    handleCascade: PropTypes.func,
    handleLinkClick: PropTypes.func,
    handleOnChange: PropTypes.func,
    handleOnDrop: PropTypes.func,
    handleRTEImageClick: PropTypes.func,
    handleSubmit: PropTypes.func,
    inline: PropTypes.bool,
    interactive: PropTypes.bool,
    marginX: PropTypes.number,
    marginY: PropTypes.number,
    noStore: PropTypes.bool,
    onClick: PropTypes.func,
    prepops: PropTypes.object,
    readonly: PropTypes.bool,
    rowHeight: PropTypes.number,
    style: PropTypes.object,
    validate: PropTypes.bool
  }

  static defaultProps = {
    inline: false
  }

  static count = 0

  constructor (props) {
    super(props)
    FormBuilder.count++
    this.state = {
      id: `gfb-${Math.floor(Math.random() * 10000) + 1}`,
      requiredWarning: !!props.validate,
      myOffset: FormBuilder.count
    }
  }

  componentDidUpdate = p => {
    if (p.validate !== this.props.validate) {
      this.setState({requiredWarning: this.props.validate})
    }
  }

  componentWillUnmount = () => {
    this.detatchInputFocusListeners()
  }

  attachBuffer = null

  attachInputFocusListeners = () => {
    clearTimeout(this.attachBuffer)
    this.attachBuffer = null
    this.attachBuffer = setTimeout(() => {
      const {id} = this.state
      const inputs = $(`#${id} :input`)
      inputs.off('focus')
      inputs.off('blur')
      inputs.on('focus', e => {
        $(e.target).parents('.react-grid-item').addClass('react-grid-item-focus-within')
      })
      inputs.on('blur', e => {
        $(e.target).parents('.react-grid-item').removeClass('react-grid-item-focus-within')
      })
    }, 500)
  }

  detatchInputFocusListeners = () => {
    const {id} = this.state
    const inputs = $(`#${id} :input`)
    inputs.off('focus')
    inputs.off('blur')
  }

  onSubmit = () => {
    // eslint-disable-next-line
    let {formSchema = Map(), formValues = Map(), handleSubmit = () => { console.warn('onSubmit was called but no handleSubmit function was provided.') }} = this.props
    formValues = (typeof formValues.isMap === 'function') ? formValues : Map(formValues)
    formSchema = (typeof formSchema.toJS === 'function') ? formSchema.toJS() : formSchema
    let {form, jsonschema} = formSchema
    jsonschema = jsonschema || form || {}
    let {layout = []} = jsonschema
    layout = (typeof layout.toJS === 'function') ? layout.toJS() : layout
    const formIncomplete = layout.some(field => {
      const {config = {}} = field
      const {required = false} = config
      if (!required) return false
      if (required && formValues.get(field.name, '').length === 0) return true
    })
    if (formIncomplete) this.setState({requiredWarning: true})
    else handleSubmit()
  }

  validate = () => {
    let {formSchema = Map(), formValues = Map()} = this.props
    formValues = (typeof formValues.isMap === 'function') ? formValues : Map(formValues)
    formSchema = (typeof formSchema.toJS === 'function') ? formSchema.toJS() : formSchema
    let {form, jsonschema} = formSchema
    jsonschema = jsonschema || form || {}
    let {layout = []} = jsonschema
    layout = (typeof layout.toJS === 'function') ? layout.toJS() : layout
    const reasons = []
    layout.map(field => {
      const {config = {}} = field
      const {required = false, name, label = name, type} = config
      if (required && formValues.get(name, '').length === 0) {
        reasons.push({
          reason: 'required',
          message: `${label} cannot be blank.`,
          description: `The field ${name} is marked as required, but its value is empty.`
        })
      }
      if (required && type === 'email' && !emailValidator(formValues.get(name, ''))) {
        reasons.push({
          reason: 'incorrect format',
          message: `${label} is invalid`,
          description: `The field ${name} has an invalid email`
        })
      }
    })
    if (reasons.length > 0) {
      this.setState({requiredWarning: true}, () => {
        this.grid.scrollIntoView()
      })
    }
    return reasons
  }

  uppercaseFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()

  handleAnywhereClick = (config, e) => {
    const {onClick = () => null} = this.props
    onClick(config, e)
  }

  handleDragDropOnInput = ({source, target}) => {
    const {handleOnDrop = () => null} = this.props
    handleOnDrop({source, target})
  }

  handleCascadeKeywordClick = e => {
    const {handleCascade = () => null} = this.props
    handleCascade(e)
  }

  handleRTEImageClick = e => {
    const {handleRTEImageClick = () => null} = this.props
    handleRTEImageClick()
  }

  handleLinkClick = link => {
    let {formValues = Map(), handleLinkClick = () => null} = this.props
    formValues = (typeof formValues.isMap === 'function') ? formValues : Map(formValues)
    const {type = '', id = null} = link
    const value = formValues.get(id, null)
    handleLinkClick({
      type,
      id: value
    })
  }

  render = () => {
    this.attachInputFocusListeners()
    let {
      formSchema = Map(),
      formValues = Map(),
      handleOnChange = () => {},
      formName = 'form',
      draggable = false,
      inline = false,
      style = {},
      marginX = 40,
      marginY = 5,
      rowHeight,
      readonly,
      interactive = true,
      handleRTEImageClick = () => {}
    } = this.props
    const {requiredWarning} = this.state
    formValues = (typeof formValues.isMap === 'function') ? formValues : Map(formValues)
    formSchema = (typeof formSchema.toJS === 'function') ? formSchema.toJS() : formSchema
    const normalFields = []
    let {form, jsonschema} = formSchema
    jsonschema = jsonschema || form || {}
    const {layout = []} = jsonschema
    // breaking this into two separate arrays so react-datetime plugin elements are drawn last. This fixes a problem where the calendar renders underneath (regardless of z-index) previously rendered inputs - JRA 09/12/2017
    let specifiedTabs = Set()
    layout.forEach(field => {
      const {config = {}} = field
      if (config.tabindex) specifiedTabs = specifiedTabs.add(config.tabindex)
    })
    let tabNumber = 1
    layout.map((field, i) => {
      if (field.config.type && field.config.type.toLowerCase() === 'richtextarea') {
        // ck editor was removed. if any form schemas still use Richtextarea, they should use Richtextareaquill now.
        field.config.type = 'Richtextareaquill'
      }
      if (this.props.conditionalSearch) {
        field = convertFieldToSearch(field)
      }
      const {config = {}, dimensions = {x: 0, y: i, h: 1, w: 6}, type: Type = 'field'} = field
      // AutoComplete OFF does not turn off autocomplete browser feature, you need to pass anything other than 'off' to turn off autocomplete because latest browsers stopped supporting 'off'
      let {type = 'input', icon = '', cascade = {}, tabindex: tabIndex, autoComplete = 'off', link = {}} = config
      if (!tabIndex) {
        while (specifiedTabs.has(tabNumber)) {
          tabNumber++
        }
        tabIndex = this.state.myOffset + '' + tabNumber
        specifiedTabs = specifiedTabs.add(tabNumber)
        tabNumber++
      } else {
        tabIndex = this.state.myOffset + '' + tabIndex
      }
      if (readonly || +formValues.get('cfd_userisreadonly', '0') === 1) config.readonly = true
      let {keyword = null, icon: cascadeIcon = ''} = cascade

      if (interactive || type === 'header') {
        type = this.uppercaseFirstLetter(type)
      } else if (type === 'select') {
        type = 'ImportSelect'
      } else {
        type = 'input'
      }

      let {icon: linkIcon = ''} = link
      linkIcon = this.uppercaseFirstLetter(linkIcon)
      icon = this.uppercaseFirstLetter(icon)
      cascadeIcon = this.uppercaseFirstLetter(cascadeIcon)
      if (type === 'Textarea' && dimensions.h < 2) dimensions.h = 2
      const Input = FormComponents[type] ? FormComponents[type] : FormComponents.Input

      icon = IconLibrary[icon] ? IconLibrary[icon] : null
      cascadeIcon = IconLibrary[cascadeIcon] ? IconLibrary[cascadeIcon] : null
      linkIcon = IconLibrary[linkIcon] ? IconLibrary[linkIcon] : null
      if (Type === 'Customcomponent') {
        normalFields.push(
          <Input
            handleLinkClick={this.handleLinkClick}
            LinkIcon={linkIcon}
            autoComplete={autoComplete}
            requiredWarning={requiredWarning}
            rowHeight={rowHeight}
            inline={inline}
            draggable={draggable}
            formSchema={formSchema}
            key={'' + i}
            handleOnChange={handleOnChange}
            handleAnywhereClick={this.handleAnywhereClick}
            formValues={formValues}
            config={config}
            Icon={icon}
            cascadingKeyword={keyword}
            CascadeIcon={cascadeIcon}
            handleCascadeKeywordClick={this.handleCascadeKeywordClick}
            handleRTEImageClick={handleRTEImageClick}
            handleDragDropOnInput={this.handleDragDropOnInput}
            defaultDataGrid={{i: '' + i, isResizable: false, isDraggable: draggable, ...dimensions}}
            tabIndex={+tabIndex}
          />
        )
      } else {
        normalFields.push(
          <Input
            handleLinkClick={this.handleLinkClick}
            LinkIcon={linkIcon}
            autoComplete={autoComplete}
            requiredWarning={requiredWarning}
            rowHeight={rowHeight}
            inline={inline}
            draggable={draggable}
            key={'' + i}
            handleOnChange={handleOnChange}
            handleAnywhereClick={this.handleAnywhereClick}
            formValues={formValues}
            config={config}
            Icon={icon}
            cascadingKeyword={keyword}
            CascadeIcon={cascadeIcon}
            handleCascadeKeywordClick={this.handleCascadeKeywordClick}
            handleRTEImageClick={handleRTEImageClick}
            handleDragDropOnInput={this.handleDragDropOnInput}
            defaultDataGrid={{i: '' + i, isResizable: false, isDraggable: draggable, ...dimensions}}
            interactive={interactive}
            tabIndex={+tabIndex}
            conditionalSearch={this.props.conditionalSearch || this.props.conditionalFieldValues}
          />
        )
      }
    })
    const P = {}
    if (this.props.noStore) P.store = {subscribe: () => {}, getState: () => Map(), dispatch: () => {}}
    return (
      <div
        id={this.state.id}
        className='grid-form-builder-parent'
        ref={r => { this.grid = r }}
        style={{
          height: '100%',
          minWidth: inline ? 700 : 440,
          ...style
        }}>
        <WidgetGrid
          {...P}
          compName={formName}
          verticalCompact={false}
          margin={[marginX, marginY]}
          rowHeight={rowHeight || (inline ? 27 : 45)}
        >
          {normalFields}
        </WidgetGrid>
      </div>
    )
  }
}
