import _objectWithoutProperties from "@babel/runtime-corejs3/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime-corejs3/helpers/esm/defineProperty";
const _excluded = ["name", "required", "style", "tooltips"];
function ownKeys(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var _context2, _context3; var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? _forEachInstanceProperty(_context2 = ownKeys(Object(t), !0)).call(_context2, function (r) { _defineProperty(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : _forEachInstanceProperty(_context3 = ownKeys(Object(t))).call(_context3, function (r) { _Object$defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
import _valuesInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/values";
import _indexOfInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/index-of";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _Object$getOwnPropertySymbols from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols";
import _Object$getOwnPropertyDescriptor from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor";
import _forEachInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/for-each";
import _Object$getOwnPropertyDescriptors from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors";
import _Object$defineProperties from "@babel/runtime-corejs3/core-js-stable/object/define-properties";
import _Object$defineProperty from "@babel/runtime-corejs3/core-js-stable/object/define-property";
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Component, cloneElement, useRef } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import PortalTooltip from '../../Tooltip';
import { randomId } from '../../utils';
import useTheme from '../../theme/useTheme';
class InputPerformanceOptimizer extends Component {
  shouldComponentUpdate(p) {
    const {
      config,
      values,
      value
    } = this.props;
    const type = typeof config.type === 'string' && config.type.toLowerCase() || 'input';
    if (!values.equals(_valuesInstanceProperty(p)) && value === p.value && values.get('cfd_userisreadonly') === _valuesInstanceProperty(p).get('cfd_userisreadonly') // if this value is changing, rerender the field in case it needs to change read only status
    ) {
      var _context;
      // if the values object is the thing changing but it isn't the value for this field
      if (_indexOfInstanceProperty(_context = ['checkbox', 'colorpicker', 'currency', 'date', 'datetime', 'email', 'header', 'icon', 'input', 'listselect', 'metadata', 'month', 'multicheckbox', 'multiselect', 'number', 'percentage', 'radio', 'richtextarea', 'select', 'textarea', 'time', 'conditionalinput']).call(_context, type) > -1 ||
      // let typeaheads update and any custom components update if the entire form values object changes, don't update the components if they are in this list and all that changes is the form values
      config.typeahead && !_filterInstanceProperty(config.typeahead) && !config.typeahead.fieldvalue // if it is a typeahead but doesn't have filters or use a fieldvalue as a key, it doesn't care either
      ) {
        return false;
      }
    }
    return true;
  }
  render() {
    return jsx(InputContainer, this.props);
  }
}
_defineProperty(InputPerformanceOptimizer, "propTypes", {
  config: PropTypes.object,
  values: PropTypes.object,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object, PropTypes.bool])
});
const InputContainer = props => {
  const {
    children,
    config,
    values,
    value,
    onChange,
    requiredWarning,
    tabIndex,
    draggable,
    dateFormat,
    dateTimeFormat,
    timeFormat,
    handleRTEImageClick,
    autoComplete,
    interactive,
    device,
    fieldDefinitions,
    c2class
  } = props;
  const {
      name,
      required,
      style = {},
      tooltips = {}
    } = config,
    other = _objectWithoutProperties(config, _excluded);
  const {
    input: inputTooltip
  } = tooltips;
  const {
    cellInput = {}
  } = style;
  const inputId = useRef(randomId());
  const {
    theme
  } = useTheme();
  return jsx("div", {
    className: "gfb-inner-cell-input",
    style: cellInput,
    "data-tip": true,
    "data-for": inputId.current,
    css: theme.cellInput
  }, jsx(PortalTooltip, {
    id: inputId.current,
    message: inputTooltip
  }), /*#__PURE__*/cloneElement(children, _objectSpread(_objectSpread({
    requiredWarning,
    tabIndex,
    draggable,
    name,
    values,
    value,
    onChange,
    dateFormat,
    dateTimeFormat,
    timeFormat,
    handleRTEImageClick,
    autoComplete,
    interactive,
    required,
    style
  }, other), {}, {
    device,
    fieldDefinitions,
    c2class
  })));
};
export default InputPerformanceOptimizer;
InputContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
  config: PropTypes.object,
  values: PropTypes.instanceOf(Map),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object, PropTypes.bool]),
  onChange: PropTypes.func,
  requiredWarning: PropTypes.bool,
  tabIndex: PropTypes.number,
  draggable: PropTypes.bool,
  dateFormat: PropTypes.string,
  dateTimeFormat: PropTypes.string,
  timeFormat: PropTypes.string,
  handleRTEImageClick: PropTypes.func,
  autoComplete: PropTypes.string,
  interactive: PropTypes.bool,
  device: PropTypes.object,
  fieldDefinitions: PropTypes.instanceOf(Map),
  c2class: PropTypes.string
};