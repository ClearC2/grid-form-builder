import _extends from "@babel/runtime-corejs3/helpers/esm/extends";
import _defineProperty from "@babel/runtime-corejs3/helpers/esm/defineProperty";
function ownKeys(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var _context, _context2; var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? _forEachInstanceProperty(_context = ownKeys(Object(t), !0)).call(_context, function (r) { _defineProperty(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : _forEachInstanceProperty(_context2 = ownKeys(Object(t))).call(_context2, function (r) { _Object$defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
import _mapInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/map";
import _Array$isArray from "@babel/runtime-corejs3/core-js-stable/array/is-array";
import _includesInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/includes";
import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _Object$getOwnPropertySymbols from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import _Object$getOwnPropertyDescriptor from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor";
import _forEachInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/for-each";
import _Object$getOwnPropertyDescriptors from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors";
import _Object$defineProperties from "@babel/runtime-corejs3/core-js-stable/object/define-properties";
import _Object$defineProperty from "@babel/runtime-corejs3/core-js-stable/object/define-property";
import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ConditionalDialog from './ConditionalDialog';
import { Map, List, fromJS } from 'immutable';
const defaults = {
  object: {},
  map: Map(),
  nullFunction: () => null
};
const ConditionalInput = props => {
  const {
    style = defaults.object,
    name = '',
    value = _mapInstanceProperty(defaults),
    values = _mapInstanceProperty(defaults),
    onChange = defaults.nullFunction
  } = props;
  const {
    value: valueStyle = {},
    inputOuter = {},
    inputInner = {},
    inputControl = {},
    valueContainer = {},
    indicators = {}
  } = style; // eslint-disable-line

  const [showDialog, setShowDialog] = useState(false);
  const handleClose = useCallback(newFieldVal => {
    setShowDialog(false);
  }, []);
  useEffect(() => {
    let setDefaults = true;
    if (value instanceof Map) {
      if (value.has('condition') && value.has('values')) setDefaults = false;
      if (value.has('conditions') && value.has('type')) setDefaults = false;
    }
    if (name && setDefaults) {
      let defaults = Map({
        condition: 'contains',
        values: List()
      });
      if (typeof value === 'string') {
        if (value !== '') {
          defaults = defaults.set('values', List([value]));
        } else {
          defaults = defaults.set('values', List());
        }
      } else if (value instanceof List || _Array$isArray(value)) {
        defaults = defaults.set('values', fromJS(value));
      }
      onChange({
        target: {
          name: name,
          value: defaults
        }
      });
    }
  }, [name, onChange, value]);
  const cond = values.getIn([name, 'condition'], '');
  const vals = values.getIn([name, 'values'], List());
  const hasValue = vals.size > 0 || _includesInstanceProperty(cond).call(cond, 'blank') || /* eslint-disable-next-line max-len */
  cond === 'today' || cond === 'this month' || cond === 'year to date' || cond === 'fiscal year to date' || cond === 'fiscal year' || cond === 'this quarter' || cond === 'quarter to date' || cond === 'this week' || cond === 'last year' || cond === 'this year' || cond === 'last fiscal year' || cond === 'next year' || cond === 'next fiscal year' || cond === 'next quarter' || values.getIn([name, 'dynamicValues']) && values.getIn([name, 'dynamicValues']).size || values.getIn([name, 'conditions'], List()).size > 0;
  return /*#__PURE__*/React.createElement("div", {
    className: "gfb-input-outer",
    style: inputOuter
  }, /*#__PURE__*/React.createElement("div", {
    className: "gfb-input-inner",
    style: inputInner
  }, /*#__PURE__*/React.createElement("div", {
    className: 'gfb-input__control',
    style: inputControl
  }, /*#__PURE__*/React.createElement("div", {
    className: "gfb-input__value-container",
    onClick: () => setShowDialog(true),
    style: _objectSpread(_objectSpread({}, valueContainer), {}, {
      color: '#36a9e1'
    })
  }, hasValue ? 'Values...' : ''), showDialog && /*#__PURE__*/React.createElement(ConditionalDialog, _extends({
    handleClose: handleClose
  }, props, {
    style: style,
    name: name,
    value: value,
    values: values,
    onChange: onChange
  })))));
};
export default ConditionalInput;
ConditionalInput.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object, PropTypes.bool]),
  values: PropTypes.object,
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  autofocus: PropTypes.bool,
  placeholder: PropTypes.string,
  tabIndex: PropTypes.number,
  autoComplete: PropTypes.string,
  interactive: PropTypes.bool,
  requiredWarning: PropTypes.bool,
  style: PropTypes.object
};