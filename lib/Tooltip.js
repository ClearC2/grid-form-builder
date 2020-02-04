(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

import React from 'react';
import PropTypes from 'prop-types';
import Portal from './Portal';
import Tooltip from 'react-tooltip';

var PortalTooltip = function PortalTooltip(props) {
  var message = props.message,
      id = props.id;
  return message && id ? React.createElement(Portal, null, React.createElement(Tooltip, {
    id: id
  }, React.createElement("div", {
    dangerouslySetInnerHTML: {
      __html: message
    }
  }))) : null;
};

PortalTooltip.propTypes = {
  message: PropTypes.string,
  id: PropTypes.string
};
var _default = PortalTooltip;
export default _default;
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(PortalTooltip, "PortalTooltip", "/root/repo/src/Tooltip.js");
  reactHotLoader.register(_default, "default", "/root/repo/src/Tooltip.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();