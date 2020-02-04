import _sliceInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/slice";
import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _mapInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/map";
import _typeof from "@babel/runtime-corejs3/helpers/esm/typeof";
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