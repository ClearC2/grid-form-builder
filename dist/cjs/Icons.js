"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.IconLibrary = void 0;
exports.initComponentIconLibrary = initComponentIconLibrary;
exports.mapIcon = void 0;

var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/keys"));

var _slice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/slice"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/typeof"));

var _utils = require("./utils");

var IconLibrary = {};
exports.IconLibrary = IconLibrary;

function initComponentIconLibrary() {
  var _context;

  var defs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if ((0, _typeof2.default)(defs) !== 'object') {
    exports.IconLibrary = IconLibrary = {};
    return;
  }

  var formattedKeys = {};
  (0, _map.default)(_context = (0, _keys.default)(defs)).call(_context, function (name) {
    var component = defs[name];
    name = name.charAt(0).toUpperCase() + (0, _slice.default)(name).call(name, 1).toLowerCase();
    formattedKeys[name] = component;
  });
  exports.IconLibrary = IconLibrary = formattedKeys;
}

var mapIcon = function mapIcon(icon) {
  if (typeof icon !== 'string') return null;
  icon = (0, _utils.uppercaseFirstLetter)(icon);
  icon = IconLibrary[icon] || null;
  return icon;
};

exports.mapIcon = mapIcon;