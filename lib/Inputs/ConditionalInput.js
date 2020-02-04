import _extends from "@babel/runtime-corejs3/helpers/esm/extends";
import _valuesInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/values";
import _Array$isArray from "@babel/runtime-corejs3/core-js-stable/array/is-array";
import _slicedToArray from "@babel/runtime-corejs3/helpers/esm/slicedToArray";

(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ConditionalDialog from './ConditionalDialog';
import { Map, List, fromJS } from 'immutable';

var ConditionalInput = function ConditionalInput(props) {
  var _props$style = props.style,
      style = _props$style === void 0 ? {} : _props$style;
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
    // const v = props.values[props.name]
    if (props.name) {
      var defaults = Map({
        condition: 'contains',
        values: List()
      });

      if (typeof props.value === 'string') {
        if (props.value !== '') {
          defaults = defaults.set('values', List([props.value]));
        } else {
          defaults = defaults.set('values', List());
        }
      } else if (props.value instanceof List || _Array$isArray(props.value)) {
        defaults = defaults.set('values', fromJS(props.value));
      }

      props.onChange({
        target: {
          name: props.name,
          value: defaults
        }
      });
    }
  }, [props, props.name]);
  return React.createElement("div", {
    className: "gfb-input-outer",
    style: inputOuter
  }, React.createElement("div", {
    className: "gfb-input-inner",
    style: inputInner
  }, React.createElement("div", {
    className: 'gfb-input__control',
    style: inputControl
  }, React.createElement("div", {
    className: "gfb-input__value-container",
    onClick: function onClick() {
      return setShowDialog(true);
    },
    style: valueContainer
  }, _valuesInstanceProperty(props).getIn([props.name, 'values'], List()).size > 0 ? 'Values...' : ''), showDialog && React.createElement(ConditionalDialog, _extends({
    handleClose: handleClose
  }, props)))));
};

__signature__(ConditionalInput, "useState{[showDialog, setShowDialog](false)}\nuseCallback{handleClose}\nuseEffect{}");

var _default = ConditionalInput;
export default _default;
ConditionalInput.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object]),
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
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(ConditionalInput, "ConditionalInput", "/root/repo/src/Inputs/ConditionalInput.js");
  reactHotLoader.register(_default, "default", "/root/repo/src/Inputs/ConditionalInput.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();