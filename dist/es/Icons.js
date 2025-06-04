import _mapInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/map";
import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _sliceInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/slice";
import { uppercaseFirstLetter } from './utils';
let IconLibrary = {};
export function initComponentIconLibrary() {
  var _context;
  let defs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (typeof defs !== 'object') {
    IconLibrary = {};
    return;
  }
  const formattedKeys = {};
  _mapInstanceProperty(_context = _Object$keys(defs)).call(_context, name => {
    const component = defs[name];
    name = name.charAt(0).toUpperCase() + _sliceInstanceProperty(name).call(name, 1).toLowerCase();
    formattedKeys[name] = component;
  });
  IconLibrary = formattedKeys;
}
export const mapIcon = icon => {
  if (typeof icon !== 'string') return null;
  icon = uppercaseFirstLetter(icon);
  icon = IconLibrary[icon] || null;
  return icon;
};
export { IconLibrary };