(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Portal from './Portal';
import Tooltip from 'react-tooltip';
import { FaExclamationTriangle } from 'react-icons/fa';
import { randomId } from './utils';

var ValidationErrorIcon = function ValidationErrorIcon(props) {
  var message = props.message;
  var id = useRef(randomId());
  return React.createElement("div", {
    className: "gfb-input__indicator gfb-validation-error-indicator"
  }, React.createElement(FaExclamationTriangle, {
    id: id.current,
    "data-tip": true,
    "data-for": id.current,
    color: "red"
  }), message && React.createElement(Portal, {
    id: id.current
  }, React.createElement(Tooltip, {
    id: id.current,
    type: "error"
  }, React.createElement("span", null, message))));
};

__signature__(ValidationErrorIcon, "useRef{id}");

ValidationErrorIcon.propTypes = {
  message: PropTypes.string
};
var _default = ValidationErrorIcon;
export default _default;
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(ValidationErrorIcon, "ValidationErrorIcon", "/Users/davidadams/code/grid-form-builder/src/ValidationErrorIcon.js");
  reactHotLoader.register(_default, "default", "/Users/davidadams/code/grid-form-builder/src/ValidationErrorIcon.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();