import _sliceInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/slice";
import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _mapInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/map";
import _typeof from "@babel/runtime-corejs3/helpers/esm/typeof";

(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

import { uppercaseFirstLetter } from './utils';
var IconLibrary = {};
export function initComponentIconLibrary() {
  var _context;

  var defs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (_typeof(defs) !== 'object') {
    IconLibrary = {};
    return;
  }

  var formattedKeys = {};

  _mapInstanceProperty(_context = _Object$keys(defs)).call(_context, function (name) {
    var component = defs[name];
    name = name.charAt(0).toUpperCase() + _sliceInstanceProperty(name).call(name, 1).toLowerCase();
    formattedKeys[name] = component;
  });

  IconLibrary = formattedKeys;
}
export var mapIcon = function mapIcon(icon) {
  if (typeof icon !== 'string') return null;
  icon = uppercaseFirstLetter(icon);
  icon = IconLibrary[icon] || null;
  return icon;
};
export { IconLibrary };
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(IconLibrary, "IconLibrary", "/Users/davidadams/code/grid-form-builder/src/Icons.js");
  reactHotLoader.register(initComponentIconLibrary, "initComponentIconLibrary", "/Users/davidadams/code/grid-form-builder/src/Icons.js");
  reactHotLoader.register(mapIcon, "mapIcon", "/Users/davidadams/code/grid-form-builder/src/Icons.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();