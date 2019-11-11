import React, {Component, useState, useEffect, useCallback, useRef, createContext} from 'react'
import PropTypes from 'prop-types'
import RGL from 'react-grid-layout'
import {emailValidator, searchForLayoutArray, updateLayoutArray, uppercaseFirstLetter} from './utils'
import {mapInputType} from './FieldDefinitions'
import {mapIcon} from './Icons'
import sizeMe from 'react-sizeme'
import {List, fromJS, Map, Set} from 'immutable'
import $ from 'jquery'
import {convertFieldToSearch} from './QueryBuilder/Utils'
import InputContainer from './InputContainer'

let inputEventListenerDebouncer = null

export const FormValueContext = createContext([Map(), () => {}])

const debug = false

const debugLog = (...args) => {
  if (debug) console.log(...args) //eslint-disable-line
}

const FormBuilder = (props) => {
  const {
    rowHeight,
    columns,
    formSchema,
    formValues,
    size,
    handleOnDimensionChange,
    dropItemDimensions,
    dropItemConfig,
    validate,
    requiredFlag,
    setContainerRef,
    onClick,
    handleOnDrop,
    handleCascade,
    handleRTEImageClick: onRTEImageClick,
    handleLinkClick: onLinkClick,
    conditionalFieldValues,
    conditionalSearch,
    inline,
    handleOnChange,
    interactive,
    draggable,
    readonly,
    droppable
  } = props
  const [grid, updateGrid] = useState({layout: List(), elements: []})
  const [requiredWarning, updateRequiredWarning] = useState(!!validate)
  const [myOffset] = useState(FormBuilder.count)
  const [id] = useState(`gfb-${Math.floor(Math.random() * 10000) + 1}`) // creates a unique id for this grid for the screen scraper
  const ReactGridLayout = useRef(null)
  const [formValueState, updateFormValueState] = useState(formValues ? formValues.toJS ? formValues : fromJS(formValues) : Map()) // eslint-disable-line

  const handleAnywhereClick = useCallback((config, e) => {
    debugLog('handleAnywhereClick')
    onClick(config, e)
  }, [onClick])

  const handleDragDropOnInput = useCallback(({source, target}) => {
    debugLog('handleDragDropOnInput')
    handleOnDrop({source, target})
  }, [handleOnDrop])

  const handleCascadeKeywordClick = useCallback((e) => {
    debugLog('handleCascadeKeywordClick')
    handleCascade(e)
  }, [handleCascade])

  const handleRTEImageClick = useCallback(() => {
    debugLog('handleRTEImageClick')
    onRTEImageClick()
  }, [onRTEImageClick])

  const handleLinkClick = (link) => { // not memoing, it is using current values and I don't want to redraw everything every render just so this link works - JRA 11/07/2019
    debugLog('handleLinkClick')
    const values = formValues.toJS ? formValues : fromJS(formValues)
    const {type = '', id = null} = link
    const value = values.get(id, null)
    onLinkClick({
      type,
      id: value
    })
  }

  useEffect(() => {
    const values = formValues ? formValues.toJS ? formValues : fromJS(formValues) : Map()
    updateFormValueState(values)
  }, [formValues])

  useEffect(() => {
    debugLog('updateRequiredWarning')
    updateRequiredWarning(validate)
  }, [validate])

  useEffect(() => {
    debugLog('updateRequiredWarning 2')
    updateRequiredWarning(requiredFlag)
  }, [requiredFlag])

  useEffect(() => {
    debugLog('FormBuilder.count')
    // this count is used to set myOffset, which serves as a starting point for tab indexing
    FormBuilder.count++
  }, [])

  useEffect(() => {
    debugLog('inputEventListenerDebouncer')
    // this is used to attach css classes for browsers that do not support :focus-within
    // this is not best practice, you should always try to avoid screen scraping the dom in react
    clearTimeout(inputEventListenerDebouncer)
    inputEventListenerDebouncer = setTimeout(() => {
      const inputs = $(`#${id} :input`)
      inputs.off('focus')
      inputs.off('blur')
      inputs.on('focus', e => {
        $(e.target).parents('.react-grid-item').addClass('react-grid-item-focus-within')
      })
      inputs.on('blur', e => {
        $(e.target).parents('.react-grid-item').removeClass('react-grid-item-focus-within')
      })
    }, 750)
    return () => {
      const inputs = $(`#${id} :input`)
      inputs.off('focus')
      inputs.off('blur')
    }
    // this is expensive, only do this on mount
  }, []) // eslint-disable-line

  useEffect(() => { // this is insane, surely this can be cleaned up, just leaving it in for now for speed of delivery - JRA 11/07/2019
    debugLog('rebuilding all grid elements (expensive)')
    const schema = searchForLayoutArray(formSchema)
    const layout = []
    const elements = []
    let specifiedTabs = Set() // this is for building up unique tab indicies
    schema.forEach(field => {
      const {config = {}} = field
      if (config.tabindex) specifiedTabs = specifiedTabs.add(config.tabindex)
    })
    let tabNumber = 1
    schema.forEach((field, i) => {
      if (conditionalSearch) {
        field = convertFieldToSearch(field)
      }
      const {dimensions = {x: 0, y: i, w: 12, h: 1}} = field
      const config = {...field.config} || {} // prevent mutation of the original config
      if (config.type && config.type.toLowerCase() === 'richtextarea') {
        // ck editor was removed. if any form schemas still use Richtextarea, they should use Richtextareaquill now.
        config.type = 'Richtextareaquill'
      }
      let {type = 'input'} = config
      type = uppercaseFirstLetter(type)
      if (type === 'Textarea' && dimensions.h < 2) dimensions.h = 2
      if (interactive && type === 'select') {
        type = 'ImportSelect'
      }
      const Component = mapInputType(type)
      if (!Component) {
        console.warn(field, 'was skipped because it did not contain a valid input type.') // eslint-disable-line
      }
      if (typeof dimensions === 'object' && !!Component) {
        dimensions.i = i + ''
        let {icon = '', cascade = {}, tabindex: tabIndex, autoComplete = 'off', link = {}} = config
        let {keyword = null, icon: cascadeIcon = ''} = cascade
        let {icon: linkIcon = ''} = link
        linkIcon = mapIcon(linkIcon)
        icon = mapIcon(icon)
        cascadeIcon = mapIcon(cascadeIcon)
        if (!tabIndex) {
          // if a tab index wasn't specified, lets start assigning tab indicies based on what is available
          // at this point we are just going to find the next available index and assign it to this input
          // myOffset is not meant to be added, it is appended to the front to make this form 1 order of magnitude higher than the last form that was rendered
          while (specifiedTabs.has(tabNumber)) {
            tabNumber++
          }
          tabIndex = myOffset + '' + tabNumber
          specifiedTabs = specifiedTabs.add(tabNumber)
          tabNumber++
        } else {
          tabIndex = myOffset + '' + tabIndex
        }
        elements.push(
          <div key={i + ''}>
            <InputContainer
              formSchema={formSchema}
              config={config}
              handleOnChange={handleOnChange}
              requiredWarning={requiredWarning}
              handleLinkClick={handleLinkClick}
              handleAnywhereClick={handleAnywhereClick}
              handleCascadeKeywordClick={handleCascadeKeywordClick}
              handleDragDropOnInput={handleDragDropOnInput}
              handleRTEImageClick={handleRTEImageClick}
              rowHeight={rowHeight}
              inline={inline}
              conditionalSearch={conditionalSearch || conditionalFieldValues}
              LinkIcon={linkIcon}
              autoComplete={autoComplete}
              Icon={icon}
              cascadingKeyword={keyword}
              CascadeIcon={cascadeIcon}
              interactive={interactive}
              readonly={readonly}
              draggable={draggable}
              tabIndex={+tabIndex}
            >
              <Component />
            </InputContainer>
          </div>
        )
        layout.push(dimensions)
      }
    })
    updateGrid({layout: fromJS(layout), elements})
  }, [ // eslint-disable-line
    conditionalFieldValues,
    conditionalSearch,
    formSchema,
    handleAnywhereClick,
    handleCascadeKeywordClick,
    handleDragDropOnInput,
    handleRTEImageClick,
    requiredWarning,
    rowHeight,
    inline,
    handleOnChange,
    interactive,
    draggable,
    readonly,
    myOffset
  ])

  const onItemLayoutUpdate = useCallback((newLayout) => {
    debugLog('onItemLayoutUpdate')
    if (typeof handleOnDimensionChange === 'function') {
      const schema = searchForLayoutArray(formSchema)
      newLayout.forEach(item => {
        const dimensions = {...item}
        const index = +dimensions.i
        delete dimensions.i
        schema[index].dimensions = dimensions
      })
      const newFormSchema = updateLayoutArray(formSchema, schema)
      handleOnDimensionChange(newFormSchema)
    } else {
      // this is a hack to break react's internal batching - clear the dashboard and reset it - JRA 11/06/2019
      console.warn('A change was detected to the layout but no handleOnDimensionChange callback was provided to update the schema.') // eslint-disable-line
      updateGrid({layout: List(), elements: []})
      setTimeout(() => updateGrid({layout: fromJS(grid.layout), elements: grid.elements}))
    }
  }, [grid, updateGrid, handleOnDimensionChange, formSchema])

  const onDrop = useCallback((dimensions) => {
    debugLog('onDrop')
    if (typeof handleOnDimensionChange === 'function') {
      const config = {...dropItemConfig}
      const schema = searchForLayoutArray(formSchema)
      if (ReactGridLayout.current) { // dropping a new item most likely caused collisions, so lets ref up the layout and update everything that got moved if we can - JRA 11/07/2019
        const newLayout = ReactGridLayout.current.state.layout
        newLayout.forEach(item => {
          if (+item.i >= 0) {
            const dimensions = {...item}
            const index = +dimensions.i
            delete dimensions.i
            schema[index].dimensions = dimensions
          }
        })
      }
      const newItem = {
        dimensions,
        config
      }
      schema.push(newItem)
      const newFormSchema = updateLayoutArray(formSchema, schema)
      handleOnDimensionChange(newFormSchema)
    } else {
      console.warn('A new item was dropped into the current layout but no handleOnDimensionChange callback was provided to update the schema.') // eslint-disable-line
    }
  }, [formSchema, dropItemConfig, handleOnDimensionChange])

  debugLog('render')

  return (
    <div
      id={id}
      className='grid-form-builder-parent'
      ref={setContainerRef}
    >
      <RGL
        ref={ReactGridLayout}
        autoSize
        width={size.width}
        cols={columns}
        rowHeight={rowHeight || (inline ? 27 : 45)}
        layout={grid.layout.toJS()}
        onDragStop={onItemLayoutUpdate}
        onResizeStop={onItemLayoutUpdate}
        droppingItem={{...dropItemDimensions, i: '-1'}}
        isDroppable={droppable}
        onDrop={onDrop}
        isDraggable={draggable}
        isResizable={draggable}
      >
        {grid.elements}
      </RGL>
    </div>
  )
}

FormBuilder.propTypes = {
  formSchema: PropTypes.object,
  formValues: PropTypes.object,
  handleOnChange: PropTypes.func,
  rowHeight: PropTypes.number,
  columns: PropTypes.number,
  size: PropTypes.object,
  handleOnDimensionChange: PropTypes.func,
  dropItemDimensions: PropTypes.object,
  dropItemConfig: PropTypes.object,
  validate: PropTypes.bool,
  requiredFlag: PropTypes.bool,
  setContainerRef: PropTypes.func,
  onClick: PropTypes.func,
  handleOnDrop: PropTypes.func,
  handleCascade: PropTypes.func,
  handleRTEImageClick: PropTypes.func,
  handleLinkClick: PropTypes.func,
  conditionalFieldValues: PropTypes.bool,
  conditionalSearch: PropTypes.bool,
  inline: PropTypes.bool,
  interactive: PropTypes.bool,
  draggable: PropTypes.bool,
  readonly: PropTypes.bool,
  droppable: PropTypes.bool
}

FormBuilder.defaultProps = {
  columns: 12,
  formSchema: {},
  dropItemDimensions: {
    h: 1,
    w: 6
  },
  dropItemConfig: {
    name: 'new-input',
    label: 'New Field',
    type: 'input'
  },
  handleSubmit: () => {
    console.warn('onSubmit was called but no handleSubmit function was provided.') // eslint-disable-line
  },
  handleOnChange: () => null,
  onClick: () => null,
  handleOnDrop: () => null,
  handleCascade: () => null,
  handleRTEImageClick: () => null,
  handleLinkClick: () => null,
  draggable: false
}

FormBuilder.count = 1

const SizeMeHOC = sizeMe()(FormBuilder)

export default class FormValidator extends Component {
  // this class provides the necessary class methods that were previously being used in ref's to make this backwards compatible
  static propTypes = {
    formSchema: PropTypes.object,
    formValues: PropTypes.object,
    handleOnChange: PropTypes.func,
    handleSubmit: PropTypes.func,
    onClick: PropTypes.func,
    handleOnDrop: PropTypes.func,
    handleCascade: PropTypes.func,
    handleRTEImageClick: PropTypes.func,
    handleOnDimensionChange: PropTypes.func,
    dropItemDimensions: PropTypes.object,
    dropItemConfig: PropTypes.object,
    validate: PropTypes.bool,
    requiredFlag: PropTypes.bool,
    handleLinkClick: PropTypes.func,
    inline: PropTypes.bool,
    interactive: PropTypes.bool,
    draggable: PropTypes.bool,
    readonly: PropTypes.bool,
    droppable: PropTypes.bool
  }

  static defaultProps = {
    handleSubmit: () => { console.warn('onSubmit was called but no handleSubmit function was provided.') } // eslint-disable-line
  }

  state = {
    requiredWarning: false,
    formValues: this.props.formValues
      ? this.props.formValues.toJS
        ? this.props.formValues
        : fromJS(this.props.formValues)
      : Map()
  }

  onSubmit = () => {
    let {formSchema = Map(), formValues = Map(), handleSubmit} = this.props
    formValues = formValues.toJS ? formValues : fromJS(formValues)
    const layout = searchForLayoutArray(formSchema)
    const formIncomplete = layout.some(field => {
      const {config = {}} = field
      const {required = false} = config
      if (!required) return false
      if (required && formValues.get(field.name, '').length === 0) return true
    })
    if (formIncomplete) {
      this.setState({requiredWarning: true})
    } else {
      handleSubmit()
    }
  }

  validate = () => {
    let {formSchema = Map(), formValues = Map()} = this.props
    formValues = formValues.toJS ? formValues : fromJS(formValues)
    const layout = searchForLayoutArray(formSchema)
    const reasons = []
    layout.forEach(field => {
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

  setContainerRef = ref => {
    this.grid = ref
  }

  updateFormValues = formValues => this.setState(() => ({
    formValues: formValues.toJS ? formValues : fromJS(formValues)
  }))

  shouldComponentUpdate (p, s) {
    if (p.formValues !== this.props.formValues) {
      this.updateFormValues(p.formValues) // this kills the extra render from values updating, the context updating will render - JRA 11/07/2019
      return false
    }
    let update = Object.keys(this.props).some(prop => (this.props[prop] !== p[prop]))
    if (!update) update = Object.keys(this.state).some(state => (this.state[state] !== s[state]))
    return update
  }

  render () {
    const {requiredWarning, formValues} = this.state
    const {formValues: values, ...rest} = this.props
    return (
      <FormValueContext.Provider value={[formValues, this.updateFormValues]}>
        <SizeMeHOC {...rest} requiredWarning={requiredWarning} setContainerRef={this.setContainerRef} />
      </FormValueContext.Provider>
    )
  }
}
