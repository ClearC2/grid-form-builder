import _extends from "@babel/runtime-corejs3/helpers/esm/extends";
import _defineProperty from "@babel/runtime-corejs3/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime-corejs3/helpers/esm/slicedToArray";

function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); enumerableOnly && (symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var _context, _context2; var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? _forEachInstanceProperty(_context = ownKeys(Object(source), !0)).call(_context, function (key) { _defineProperty(target, key, source[key]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)) : _forEachInstanceProperty(_context2 = ownKeys(Object(source))).call(_context2, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } return target; }

import _mapInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/map";
import _valuesInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/values";
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
var defaults = {
  object: {},
  map: Map(),
  nullFunction: function nullFunction() {
    return null;
  }
};

var ConditionalInput = function ConditionalInput(props) {
  var _props$style = props.style,
      style = _props$style === void 0 ? defaults.object : _props$style,
      _props$name = props.name,
      name = _props$name === void 0 ? '' : _props$name,
      _props$value = props.value,
      value = _props$value === void 0 ? _mapInstanceProperty(defaults) : _props$value,
      _props$values = _valuesInstanceProperty(props),
      values = _props$values === void 0 ? _mapInstanceProperty(defaults) : _props$values,
      _props$onChange = props.onChange,
      onChange = _props$onChange === void 0 ? defaults.nullFunction : _props$onChange,
      _props$dataTestid = props['data-testid'],
      testId = _props$dataTestid === void 0 ? (props === null || props === void 0 ? void 0 : props['data-testid']) || (props === null || props === void 0 ? void 0 : props.name) : _props$dataTestid;

  var _style$value = style.value,
      valueStyle = _style$value === void 0 ? {} : _style$value,
      _style$inputOuter = style.inputOuter,
      inputOuter = _style$inputOuter === void 0 ? {} : _style$inputOuter,
      _style$inputInner = style.inputInner,
      inputInner = _style$inputInner === void 0 ? {} : _style$inputInner,
      _style$inputControl = style.inputControl,
      inputControl = _style$inputControl === void 0 ? {} : _style$inputControl,
      _style$valueContainer = style.valueContainer,
      valueContainer = _style$valueContainer === void 0 ? {} : _style$valueContainer,
      _style$indicators = style.indicators,
      indicators = _style$indicators === void 0 ? {} : _style$indicators; // eslint-disable-line

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      showDialog = _useState2[0],
      setShowDialog = _useState2[1];

  var handleClose = useCallback(function (newFieldVal) {
    setShowDialog(false);
  }, []);
  useEffect(function () {
    var setDefaults = true;

    if (value instanceof Map) {
      if (value.has('condition') && value.has('values')) setDefaults = false;
      if (value.has('conditions') && value.has('type')) setDefaults = false;
    }

    if (name && setDefaults) {
      var _defaults = Map({
        condition: 'contains',
        values: List()
      });

      if (typeof value === 'string') {
        if (value !== '') {
          _defaults = _defaults.set('values', List([value]));
        } else {
          _defaults = _defaults.set('values', List());
        }
      } else if (value instanceof List || _Array$isArray(value)) {
        _defaults = _defaults.set('values', fromJS(value));
      }

      onChange({
        target: {
          name: name,
          value: _defaults
        }
      });
    }
  }, [name, onChange, value]);
  var cond = values.getIn([name, 'condition'], '');
  var vals = values.getIn([name, 'values'], List());
  var hasValue = vals.size > 0 || _includesInstanceProperty(cond).call(cond, 'blank') ||
  /* eslint-disable-next-line max-len */
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
    onClick: function onClick() {
      return setShowDialog(true);
    },
    style: _objectSpread(_objectSpread({}, valueContainer), {}, {
      color: '#36a9e1'
    }),
    "data-testid": testId
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
  style: PropTypes.object,
  'data-testid': PropTypes.string
};