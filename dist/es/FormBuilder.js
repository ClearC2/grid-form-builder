import _Object$getOwnPropertySymbols from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import _Object$getOwnPropertyDescriptor from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor";
import _Object$getOwnPropertyDescriptors from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors";
import _Object$defineProperties from "@babel/runtime-corejs3/core-js-stable/object/define-properties";
import _Object$defineProperty from "@babel/runtime-corejs3/core-js-stable/object/define-property";
import _extends from "@babel/runtime-corejs3/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime-corejs3/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime-corejs3/helpers/esm/defineProperty";
const _excluded = ["size"],
  _excluded2 = ["formValues", "theme"];
function ownKeys(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var _context4, _context5; var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? _forEachInstanceProperty(_context4 = ownKeys(Object(t), !0)).call(_context4, function (r) { _defineProperty(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : _forEachInstanceProperty(_context5 = ownKeys(Object(t))).call(_context5, function (r) { _Object$defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
import _mapInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/map";
import _setTimeout from "@babel/runtime-corejs3/core-js-stable/set-timeout";
import _forEachInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/for-each";
import _spliceInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/splice";
import _someInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/some";
import _trimInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/trim";
import _parseFloat from "@babel/runtime-corejs3/core-js-stable/parse-float";
import _Array$isArray from "@babel/runtime-corejs3/core-js-stable/array/is-array";
import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";
import React, { Component, PureComponent, useState, useEffect, useCallback, useRef, createContext } from 'react';
import PropTypes from 'prop-types';
import RGL from 'react-grid-layout';
import { emailValidator, searchForLayoutArray, updateLayoutArray } from './utils';
import sizeMe from 'react-sizeme';
import { fromJS, Map, Set } from 'immutable';
import $ from 'jquery';
import { convertFieldToSearch } from './QueryBuilder/Utils';
import InnerCell from './Inputs';
import { FaTrash as Trash } from 'react-icons/fa';
import useTheme, { ThemeProvider } from './theme/useTheme';
import { useTooltipAutoHide } from './useTooltipAutoHide';
let inputEventListenerDebouncer = null;
export const FormValueContext = /*#__PURE__*/createContext([Map(), () => {}]);
const debug = false;
const debugLog = function () {
  if (debug) console.log(...arguments); //eslint-disable-line
};
const defaults = {
  object: {},
  map: Map(),
  nullFunction: () => null,
  dropItemDimensions: {
    h: 1,
    w: 6
  },
  dropItemConfig: {
    name: 'new-input',
    label: 'New Field',
    type: 'input'
  },
  device: {
    cordova: false,
    model: 'browser',
    platform: 'browser',
    uuid: 'browser',
    version: 'browser'
  }
};
const FormBuilder = props => {
  const {
    rowHeight,
    columns = 12,
    formSchema = defaults.object,
    width,
    handleOnDimensionChange,
    dropItemDimensions = defaults.dropItemDimensions,
    dropItemConfig = defaults.dropItemConfig,
    validate,
    requiredFlag,
    setContainerRef,
    onClick = defaults.nullFunction,
    handleOnDrop = defaults.nullFunction,
    handleCascade = defaults.nullFunction,
    handleRTEImageClick: onRTEImageClick = defaults.nullFunction,
    handleLinkClick = defaults.nullFunction,
    conditionalFieldValues,
    conditionalSearch,
    inline,
    handleOnChange = defaults.nullFunction,
    interactive = true,
    draggable = false,
    readonly,
    droppable,
    activeItem,
    rglAutoSize = true,
    rglStyle,
    verticalCompact = false,
    compactType,
    dateFormat = 'MM/DD/YYYY',
    dateTimeFormat = 'MM/DD/YYYY h:mm a',
    timeFormat = 'h:mm a',
    autoComplete = 'ac_off',
    style = {},
    device = defaults.device,
    fieldDefinitions = _mapInstanceProperty(defaults),
    c2class
  } = props;
  useTooltipAutoHide();
  const [grid, updateGrid] = useState({
    layout: [],
    elements: []
  });
  const [requiredWarning, updateRequiredWarning] = useState(!!validate);
  const [compact, updateCompact] = useState(verticalCompact ? 'vertical' : typeof compactType === 'undefined' ? null : compactType);
  const [myOffset] = useState(FormBuilder.count);
  const [id] = useState(`gfb-${Math.floor(Math.random() * 10000) + 1}`); // creates a unique id for this grid for the screen scraper
  const ReactGridLayout = useRef(null);
  const {
    theme
  } = useTheme();
  const handleAnywhereClick = useCallback((config, e) => {
    debugLog('handleAnywhereClick');
    onClick(config, e);
  }, [onClick]);
  const handleDragDropOnInput = useCallback(_ref => {
    let {
      source,
      target
    } = _ref;
    debugLog('handleDragDropOnInput');
    handleOnDrop({
      source,
      target
    });
  }, [handleOnDrop]);
  const handleCascadeKeywordClick = useCallback(e => {
    debugLog('handleCascadeKeywordClick');
    handleCascade(e);
  }, [handleCascade]);
  const handleRTEImageClick = useCallback(name => {
    debugLog('handleRTEImageClick');
    onRTEImageClick(name);
  }, [onRTEImageClick]);
  useEffect(() => {
    debugLog('updateCompact');
    updateCompact(verticalCompact ? 'vertical' : typeof compactType === 'undefined' ? null : compactType);
  }, [verticalCompact, compactType]);
  useEffect(() => {
    debugLog('updateRequiredWarning 2');
    updateRequiredWarning(requiredFlag);
  }, [requiredFlag]);
  useEffect(() => {
    debugLog('updateRequiredWarning');
    updateRequiredWarning(validate);
  }, [validate]);
  useEffect(() => {
    debugLog('FormBuilder.count');
    // this count is used to set myOffset, which serves as a starting point for tab indexing
    FormBuilder.count++;
  }, []);
  useEffect(() => {
    debugLog('inputEventListenerDebouncer');
    // this is used to attach css classes for browsers that do not support :focus-within
    // this is not best practice, you should always try to avoid screen scraping the dom in react
    clearTimeout(inputEventListenerDebouncer);
    inputEventListenerDebouncer = _setTimeout(() => {
      const inputs = $(`#${id} :input`);
      inputs.off('focus');
      inputs.off('blur');
      inputs.on('focus', e => {
        $(e.target).parents('.react-grid-item').addClass('react-grid-item-focus-within');
      });
      inputs.on('blur', e => {
        $(e.target).parents('.react-grid-item').removeClass('react-grid-item-focus-within');
      });
    }, 750);
    return () => {
      const inputs = $(`#${id} :input`);
      inputs.off('focus');
      inputs.off('blur');
    };
    // this is expensive, only do this on mount
  }, []); // eslint-disable-line

  useEffect(() => {
    debugLog('rebuilding all grid elements (expensive)');
    const schema = searchForLayoutArray(formSchema);
    const layout = [];
    const elements = [];
    let specifiedTabs = Set(); // this is for building up unique tab indices
    _forEachInstanceProperty(schema).call(schema, field => {
      const {
        config = {}
      } = field;
      if (config.tabindex) specifiedTabs = specifiedTabs.add(config.tabindex);
    });
    let tabNumber = 1;
    _forEachInstanceProperty(schema).call(schema, (field, i) => {
      if (conditionalSearch) {
        field = convertFieldToSearch(field);
      }
      const {
        dimensions = {
          x: 0,
          y: i,
          w: 12,
          h: 1
        }
      } = field;
      const config = _objectSpread({}, field.config) || {}; // prevent mutation of the original config
      if (typeof dimensions === 'object') {
        dimensions.i = i + '';
        let {
          tabindex
        } = config;
        if (!tabindex) {
          // if a tab index wasn't specified, lets start assigning tab indicies based on what is available
          // at this point we are just going to find the next available index and assign it to this input
          // myOffset is not meant to be added, it is appended to the front to make this form 1 order of magnitude higher than the last form that was rendered
          while (specifiedTabs.has(tabNumber)) {
            tabNumber++;
          }
          tabindex = myOffset + '' + tabNumber;
          specifiedTabs = specifiedTabs.add(tabNumber);
          tabNumber++;
        } else {
          tabindex = myOffset + '' + tabindex;
        }
        const {
          rteImageUrl = ''
        } = config;
        const isActive = (typeof activeItem === 'string' || typeof activeItem === 'number') && +activeItem === i;
        let className = isActive ? 'drag-item-active' : '';
        if (config.tooltip) className = className + ' gfb-has-tooltip';
        const removeSelf = e => {
          onClick({
            index: null
          }, e);
          removeItem(i);
        };
        elements.push(/*#__PURE__*/React.createElement("div", {
          key: i + '',
          className: className,
          css: theme.gridItem
        }, draggable && isActive && /*#__PURE__*/React.createElement("div", {
          className: "active-gfb-item-action-menu",
          onClick: removeSelf
        }, /*#__PURE__*/React.createElement("div", {
          className: "item-action-button action-button-remove"
        }, /*#__PURE__*/React.createElement(Trash, {
          height: 20,
          width: 20,
          color: "white"
        }))), /*#__PURE__*/React.createElement(InnerCell, {
          field: field,
          handleOnChange: handleOnChange,
          requiredWarning: requiredWarning,
          handleLinkClick: handleLinkClick,
          handleAnywhereClick: handleAnywhereClick,
          handleCascadeKeywordClick: handleCascadeKeywordClick,
          handleDragDropOnInput: handleDragDropOnInput,
          handleRTEImageClick: handleRTEImageClick,
          rowHeight: rowHeight,
          conditionalSearch: conditionalSearch || conditionalFieldValues,
          interactive: interactive,
          readonly: readonly,
          draggable: draggable,
          tabIndex: +tabindex,
          index: i,
          isActive: isActive,
          removeSelf: removeSelf,
          dateFormat: dateFormat,
          dateTimeFormat: dateTimeFormat,
          timeFormat: timeFormat,
          autoComplete: autoComplete,
          device: device,
          rteImageUrl: rteImageUrl,
          fieldDefinitions: fieldDefinitions,
          c2class: c2class
        })));
        layout.push(dimensions);
      }
    });
    updateGrid({
      layout,
      elements
    });
  }, [
  // eslint-disable-line
  conditionalFieldValues, conditionalSearch, formSchema, handleAnywhereClick, handleCascadeKeywordClick, handleDragDropOnInput, handleRTEImageClick, requiredWarning, rowHeight, handleOnChange, interactive, draggable, readonly, myOffset, activeItem, handleLinkClick, autoComplete]);
  const removeItem = useCallback(i => {
    if (typeof handleOnDimensionChange === 'function') {
      const schema = searchForLayoutArray(formSchema);
      _spliceInstanceProperty(schema).call(schema, i, 1);
      const newFormSchema = updateLayoutArray(formSchema, schema);
      updateGrid({
        layout: [],
        elements: []
      }); // clearing these out first so nothing funky happens with the indexes - JRA 11/13/2019
      handleOnDimensionChange(newFormSchema);
    } else {
      // this is a hack to break react's internal batching - clear the dashboard and reset it - JRA 11/06/2019
      console.warn('A grid item attempted to remove itself but no handleOnDimensionChange callback was provided to update the schema.'); // eslint-disable-line
      updateGrid({
        layout: [],
        elements: []
      });
      _setTimeout(() => updateGrid({
        layout: grid.layout,
        elements: grid.elements
      }));
    }
  }, [formSchema, updateGrid, handleOnDimensionChange, grid]);
  const onItemLayoutUpdate = useCallback(newLayout => {
    debugLog('onItemLayoutUpdate');
    if (typeof handleOnDimensionChange === 'function') {
      const schema = searchForLayoutArray(formSchema);
      _forEachInstanceProperty(newLayout).call(newLayout, item => {
        const dimensions = _objectSpread({}, item);
        const index = +dimensions.i;
        delete dimensions.i;
        schema[index].dimensions = dimensions;
      });
      const newFormSchema = updateLayoutArray(formSchema, schema);
      handleOnDimensionChange(newFormSchema);
    } else {
      // this is a hack to break react's internal batching - clear the dashboard and reset it - JRA 11/06/2019
      console.warn('A change was detected to the layout but no handleOnDimensionChange callback was provided to update the schema.'); // eslint-disable-line
      updateGrid({
        layout: [],
        elements: []
      });
      _setTimeout(() => updateGrid({
        layout: grid.layout,
        elements: grid.elements
      }));
    }
  }, [grid, updateGrid, handleOnDimensionChange, formSchema]);
  const onDrop = useCallback(dimensions => {
    debugLog('onDrop');
    if (typeof handleOnDimensionChange === 'function') {
      const config = _objectSpread({}, dropItemConfig);
      const schema = searchForLayoutArray(formSchema);
      if (ReactGridLayout.current) {
        // dropping a new item most likely caused collisions, so lets ref up the layout and update everything that got moved if we can - JRA 11/07/2019
        const newLayout = ReactGridLayout.current.state.layout;
        _forEachInstanceProperty(newLayout).call(newLayout, item => {
          if (+item.i >= 0) {
            const dimensions = _objectSpread({}, item);
            const index = +dimensions.i;
            delete dimensions.i;
            schema[index].dimensions = dimensions;
          }
        });
      }
      const newItem = {
        dimensions,
        config
      };
      schema.push(newItem);
      const newFormSchema = updateLayoutArray(formSchema, schema);
      handleOnDimensionChange(newFormSchema);
    } else {
      console.warn('A new item was dropped into the current layout but no handleOnDimensionChange callback was provided to update the schema.'); // eslint-disable-line
    }
  }, [formSchema, dropItemConfig, handleOnDimensionChange]);
  debugLog('render');
  dropItemDimensions.i = '-1';
  return /*#__PURE__*/React.createElement("div", {
    id: id,
    className: "grid-form-builder-parent",
    ref: setContainerRef,
    style: style
  }, /*#__PURE__*/React.createElement(RGL, {
    ref: ReactGridLayout,
    autoSize: rglAutoSize,
    style: rglStyle,
    width: width,
    cols: columns,
    rowHeight: rowHeight || (inline ? 27 : 45),
    layout: grid.layout,
    onDragStop: onItemLayoutUpdate,
    onResizeStop: onItemLayoutUpdate,
    droppingItem: dropItemDimensions,
    isDroppable: droppable,
    onDrop: onDrop,
    isDraggable: draggable,
    isResizable: draggable,
    compactType: compact
  }, grid.elements));
};
FormBuilder.propTypes = {
  formSchema: PropTypes.object,
  formValues: PropTypes.object,
  handleOnChange: PropTypes.func,
  rowHeight: PropTypes.number,
  columns: PropTypes.number,
  width: PropTypes.number,
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
  style: PropTypes.object,
  device: PropTypes.object,
  fieldDefinitions: PropTypes.instanceOf(Map),
  c2class: PropTypes.string
};
FormBuilder.count = 1;
class PureFormBuilder extends PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "render", () => /*#__PURE__*/React.createElement(FormBuilder, this.props));
  }
}
const SizeMemoizer = props => {
  const {
      size
    } = props,
    rest = _objectWithoutProperties(props, _excluded);
  const [width, setWidth] = useState(size.width);
  useEffect(() => {
    const w = Math.ceil(size.width);
    if (w !== width) {
      setWidth(w);
    }
  }, [size, width]);
  return /*#__PURE__*/React.createElement(PureFormBuilder, _extends({
    width: width
  }, rest));
};
SizeMemoizer.propTypes = {
  size: PropTypes.object
};
const SizeMeHOC = sizeMe({
  refreshRate: 75
})(SizeMemoizer);
export default class FormValidator extends Component {
  constructor() {
    super(...arguments);
    _defineProperty(this, "state", {
      validate: false,
      requiredWarning: false,
      formValues: this.props.formValues ? this.props.formValues.toJS ? this.props.formValues : fromJS(this.props.formValues) : Map()
    });
    _defineProperty(this, "onSubmit", () => {
      let {
        formSchema = Map(),
        formValues = Map(),
        handleSubmit
      } = this.props;
      formValues = formValues.toJS ? formValues : fromJS(formValues);
      const layout = searchForLayoutArray(formSchema);
      const formIncomplete = _someInstanceProperty(layout).call(layout, field => {
        const {
          config = {}
        } = field;
        const {
          required = false
        } = config;
        if (!required) return false;
        if (required && formValues.get(field.name, '').length === 0) return true;
      });
      if (formIncomplete) {
        this.setState({
          requiredWarning: true
        });
      } else {
        handleSubmit();
      }
    });
    _defineProperty(this, "validate", () => {
      let {
        formSchema = Map(),
        formValues = Map()
      } = this.props;
      formValues = formValues.toJS ? formValues : fromJS(formValues);
      const layout = searchForLayoutArray(formSchema);
      const reasons = [];
      _forEachInstanceProperty(layout).call(layout, field => {
        var _context;
        const {
          config = {}
        } = field;
        const {
          required = false,
          name,
          label = name,
          type,
          minimum = 0,
          maximum = 0,
          pattern = null,
          message = ''
        } = config;
        if (pattern) {
          const regex = new RegExp(pattern);
          if (regex.test(formValues.get(name, ''))) {
            reasons.push({
              reason: 'invalid characters',
              message: `${label} ${message}`,
              description: `The field ${name} has invalid characters.`
            });
          }
        }
        if (required && _trimInstanceProperty(_context = formValues.get(name, '') + '').call(_context).length === 0) {
          reasons.push({
            reason: 'required',
            message: `${label} cannot be blank.`,
            description: `The field ${name} is marked as required, but its value is empty.`
          });
        }
        if (type === 'email' && (formValues.get(name, '') + '').length > 0 && !emailValidator(formValues.get(name, ''))) {
          reasons.push({
            reason: 'incorrect format',
            message: `${label} is invalid`,
            description: `The field ${name} has an invalid email`
          });
        }
        if (type === 'currency' && (formValues.get(name, '') + '').length > 0) {
          if (minimum) {
            if (_parseFloat(formValues.get(name, '')) < minimum) {
              reasons.push({
                reason: 'minimum value not meet',
                message: `${label} is not within the minimum value`,
                description: `The field ${name} has an invalid value`
              });
            }
          }
          if (maximum) {
            if (_parseFloat(formValues.get(name, '')) > maximum) {
              reasons.push({
                reason: 'maximum value exceeded',
                message: `${label} is beyond the maximum value`,
                description: `The field ${name} has an invalid value`
              });
            }
          }
        }
      });
      if (reasons.length > 0) {
        this.setState({
          requiredWarning: true,
          validate: true
        }, () => {
          // this.grid && this.grid.scrollIntoView() // this breaks c2 cards for some very strange reason. The header bar of dialogs overflows outside of the dialog container for no apparent reason - JRA 12/13/2019
        });
      }
      return reasons;
    });
    _defineProperty(this, "setContainerRef", ref => {
      this.grid = ref;
    });
    _defineProperty(this, "updateFormValues", formValues => this.setState(() => ({
      formValues: formValues.toJS ? formValues : fromJS(formValues)
    })));
    _defineProperty(this, "handleLinkClick", link => {
      const {
        formValues
      } = this.state;
      const {
        handleLinkClick
      } = this.props;
      const values = formValues.toJS ? formValues : fromJS(formValues);
      const {
        type = ''
      } = link;
      let {
        id = null
      } = link;
      if (typeof id === 'string') {
        id = [id];
      }
      let value = '';
      if (_Array$isArray(id)) {
        _forEachInstanceProperty(id).call(id, string => {
          if (typeof string === 'string' || typeof string === 'number') {
            const val = values.get(string);
            if (typeof link.id === 'string' && !val) {
              value = null;
            } else {
              const val = values.get(string, string);
              if (typeof val === 'string' || typeof val === 'number') {
                value = value + val;
              }
            }
          }
        });
      }
      handleLinkClick({
        type,
        id: value
      });
    });
  }
  shouldComponentUpdate(p, s) {
    var _context2, _context3;
    if (p.formValues !== this.props.formValues) {
      this.updateFormValues(p.formValues); // this kills the extra render from values updating, the context updating will render - JRA 11/07/2019
      return false;
    }
    let update = _someInstanceProperty(_context2 = _Object$keys(this.props)).call(_context2, prop => {
      if (this.props[prop] && p[prop] && typeof this.props[prop].toJS === 'function' && typeof p[prop].toJS === 'function') {
        return !this.props[prop].equals(p[prop]);
      } else {
        return this.props[prop] !== p[prop];
      }
    });
    if (!update) update = _someInstanceProperty(_context3 = _Object$keys(this.state)).call(_context3, state => this.state[state] !== s[state]);
    return update;
  }
  render() {
    const {
      requiredWarning,
      formValues,
      validate
    } = this.state;
    const _this$props = this.props,
      {
        formValues: values,
        theme
      } = _this$props,
      rest = _objectWithoutProperties(_this$props, _excluded2);
    return /*#__PURE__*/React.createElement(ThemeProvider, {
      theme: theme
    }, /*#__PURE__*/React.createElement(FormValueContext.Provider, {
      value: [formValues, this.updateFormValues]
    }, /*#__PURE__*/React.createElement(SizeMeHOC, _extends({}, rest, {
      validate: this.props.validate || validate,
      requiredWarning: requiredWarning,
      setContainerRef: this.setContainerRef,
      handleLinkClick: this.handleLinkClick
    }))));
  }
}
// this class provides the necessary class methods that were previously being used in ref's to make this backwards compatible
_defineProperty(FormValidator, "propTypes", {
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
  theme: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  fieldDefinitions: PropTypes.instanceOf(Map),
  c2class: PropTypes.string
});
_defineProperty(FormValidator, "defaultProps", {
  handleSubmit: () => {
    console.warn('onSubmit was called but no handleSubmit function was provided.');
  } // eslint-disable-line
});