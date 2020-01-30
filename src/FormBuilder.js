import React, {Component, useState, useEffect, useCallback, useRef, createContext} from 'react'
import PropTypes from 'prop-types'
import RGL from 'react-grid-layout'
import {emailValidator, searchForLayoutArray, updateLayoutArray} from './utils'
import sizeMe from 'react-sizeme'
import {List, fromJS, Map, Set} from 'immutable'
import $ from 'jquery'
import {convertFieldToSearch} from './QueryBuilder/Utils'
import InnerCell from './Inputs'
import {FaTrash as Trash} from 'react-icons/fa'
import useTheme, {ThemeProvider} from './theme/useTheme'

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
    handleLinkClick,
    conditionalFieldValues,
    conditionalSearch,
    inline,
    handleOnChange,
    interactive,
    draggable,
    readonly,
    droppable,
    activeItem,
    rglAutoSize = true,
    rglStyle,
    verticalCompact = false,
    compactType,
    dateFormat,
    dateTimeFormat,
    timeFormat,
    autoComplete,
    style
  } = props
  const [grid, updateGrid] = useState({layout: List(), elements: []})
  const [requiredWarning, updateRequiredWarning] = useState(!!validate)
  const [compact, updateCompact] = useState(
    verticalCompact ? 'vertical' : typeof compactType === 'undefined' ? null : compactType
  )
  const [myOffset] = useState(FormBuilder.count)
  const [id] = useState(`gfb-${Math.floor(Math.random() * 10000) + 1}`) // creates a unique id for this grid for the screen scraper
  const ReactGridLayout = useRef(null)
  const {theme} = useTheme()

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

  useEffect(() => {
    debugLog('updateCompact')
    updateCompact(verticalCompact ? 'vertical' : typeof compactType === 'undefined' ? null : compactType)
  }, [verticalCompact, compactType])

  useEffect(() => {
    debugLog('updateRequiredWarning 2')
    updateRequiredWarning(requiredFlag)
  }, [requiredFlag])

  useEffect(() => {
    debugLog('updateRequiredWarning')
    updateRequiredWarning(validate)
  }, [validate])

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

  useEffect(() => {
    debugLog('rebuilding all grid elements (expensive)')
    const schema = searchForLayoutArray(formSchema)
    const layout = []
    const elements = []
    let specifiedTabs = Set() // this is for building up unique tab indices
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
      if (typeof dimensions === 'object') {
        dimensions.i = i + ''
        let {tabindex} = config
        if (!tabindex) {
          // if a tab index wasn't specified, lets start assigning tab indicies based on what is available
          // at this point we are just going to find the next available index and assign it to this input
          // myOffset is not meant to be added, it is appended to the front to make this form 1 order of magnitude higher than the last form that was rendered
          while (specifiedTabs.has(tabNumber)) {
            tabNumber++
          }
          tabindex = myOffset + '' + tabNumber
          specifiedTabs = specifiedTabs.add(tabNumber)
          tabNumber++
        } else {
          tabindex = myOffset + '' + tabindex
        }
        const isActive = (typeof activeItem === 'string' || typeof activeItem === 'number') && +activeItem === i
        let className = isActive ? 'drag-item-active' : ''
        if (config.tooltip) className = className + ' gfb-has-tooltip'
        const removeSelf = e => {
          onClick({index: null}, e)
          removeItem(i)
        }
        elements.push(
          <div key={i + ''} className={className} css={theme.gridItem}>
            {draggable && isActive && (
              <div className='active-gfb-item-action-menu' onClick={removeSelf}>
                <div className='item-action-button action-button-remove'>
                  <Trash height={20} width={20} color='white' />
                </div>
              </div>
            )}
            <InnerCell
              field={field}
              handleOnChange={handleOnChange}
              requiredWarning={requiredWarning}
              handleLinkClick={handleLinkClick}
              handleAnywhereClick={handleAnywhereClick}
              handleCascadeKeywordClick={handleCascadeKeywordClick}
              handleDragDropOnInput={handleDragDropOnInput}
              handleRTEImageClick={handleRTEImageClick}
              rowHeight={rowHeight}
              conditionalSearch={conditionalSearch || conditionalFieldValues}
              interactive={interactive}
              readonly={readonly}
              draggable={draggable}
              tabIndex={+tabindex}
              index={i}
              isActive={isActive}
              removeSelf={removeSelf}
              dateFormat={dateFormat}
              dateTimeFormat={dateTimeFormat}
              timeFormat={timeFormat}
              autoComplete={autoComplete}
            />
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
    handleOnChange,
    interactive,
    draggable,
    readonly,
    myOffset,
    activeItem,
    handleLinkClick,
    autoComplete
  ])

  const removeItem = useCallback(i => {
    if (typeof handleOnDimensionChange === 'function') {
      const schema = searchForLayoutArray(formSchema)
      schema.splice(i, 1)
      const newFormSchema = updateLayoutArray(formSchema, schema)
      updateGrid({layout: List(), elements: []}) // clearing these out first so nothing funky happens with the indexes - JRA 11/13/2019
      handleOnDimensionChange(newFormSchema)
    } else {
      // this is a hack to break react's internal batching - clear the dashboard and reset it - JRA 11/06/2019
      console.warn('A grid item attempted to remove itself but no handleOnDimensionChange callback was provided to update the schema.') // eslint-disable-line
      updateGrid({layout: List(), elements: []})
      setTimeout(() => updateGrid({layout: fromJS(grid.layout), elements: grid.elements}))
    }
  }, [formSchema, updateGrid, handleOnDimensionChange, grid])

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
      style={style}
    >
      <RGL
        ref={ReactGridLayout}
        autoSize={rglAutoSize}
        style={rglStyle}
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
        compactType={compact}
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
  droppable: PropTypes.bool,
  activeItem: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  rglAutoSize: PropTypes.bool,
  rglStyle: PropTypes.object,
  verticalCompact: PropTypes.bool,
  compactType: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  dateFormat: PropTypes.string,
  dateTimeFormat: PropTypes.string,
  timeFormat: PropTypes.string,
  autoComplete: PropTypes.string,
  style: PropTypes.object
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
  draggable: false,
  interactive: true,
  dateFormat: 'M/D/YYYY',
  dateTimeFormat: 'M/D/YYYY h:mm a',
  timeFormat: 'h:mm a',
  autoComplete: 'ac_off',
  style: {}
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
    droppable: PropTypes.bool,
    activeItem: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    rglAutoSize: PropTypes.bool,
    rglStyle: PropTypes.object,
    verticalCompact: PropTypes.bool,
    compactType: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    dateFormat: PropTypes.string,
    dateTimeFormat: PropTypes.string,
    timeFormat: PropTypes.string,
    autoComplete: PropTypes.string,
    theme: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
  }

  static defaultProps = {
    handleSubmit: () => { console.warn('onSubmit was called but no handleSubmit function was provided.') } // eslint-disable-line
  }

  state = {
    validate: false,
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
      if (required && (formValues.get(name, '') + '').length === 0) {
        reasons.push({
          reason: 'required',
          message: `${label} cannot be blank.`,
          description: `The field ${name} is marked as required, but its value is empty.`
        })
      }
      if (type === 'email' && (formValues.get(name, '') + '').length > 0 && !emailValidator(formValues.get(name, ''))) {
        reasons.push({
          reason: 'incorrect format',
          message: `${label} is invalid`,
          description: `The field ${name} has an invalid email`
        })
      }
    })
    if (reasons.length > 0) {
      this.setState({requiredWarning: true, validate: true}, () => {
        // this.grid && this.grid.scrollIntoView() // this breaks c2 cards for some very strange reason. The header bar of dialogs overflows outside of the dialog container for no apparent reason - JRA 12/13/2019
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

  handleLinkClick = link => {
    const {formValues} = this.state
    const {handleLinkClick} = this.props
    const values = formValues.toJS ? formValues : fromJS(formValues)
    const {type = '', id = null} = link
    const value = values.get(id, null)
    handleLinkClick({
      type,
      id: value
    })
  }

  shouldComponentUpdate (p, s) {
    if (p.formValues !== this.props.formValues) {
      this.updateFormValues(p.formValues) // this kills the extra render from values updating, the context updating will render - JRA 11/07/2019
      return false
    }
    let update = Object.keys(this.props).some(prop => {
      if (
        this.props[prop] &&
        p[prop] &&
        typeof this.props[prop].toJS === 'function' &&
        typeof p[prop].toJS === 'function'
      ) {
        return (!this.props[prop].equals(p[prop]))
      } else {
        return (this.props[prop] !== p[prop])
      }
    })
    if (!update) update = Object.keys(this.state).some(state => (this.state[state] !== s[state]))
    return update
  }

  render () {
    const {requiredWarning, formValues, validate} = this.state
    const {formValues: values, theme, ...rest} = this.props
    return (
      <ThemeProvider theme={theme}>
        <FormValueContext.Provider value={[formValues, this.updateFormValues]}>
          <SizeMeHOC
            {...rest}
            validate={this.props.validate || validate}
            requiredWarning={requiredWarning}
            setContainerRef={this.setContainerRef}
            handleLinkClick={this.handleLinkClick}
          />
        </FormValueContext.Provider>
      </ThemeProvider>
    )
  }
}
