'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IconLibrary = exports.mapIcon = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.initComponentIconLibrary = initComponentIconLibrary;

var _utils = require('./utils');

var IconLibrary = {};

function initComponentIconLibrary() {
  var defs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if ((typeof defs === 'undefined' ? 'undefined' : _typeof(defs)) !== 'object') {
    exports.IconLibrary = IconLibrary = {};
    return;
  }
  var formattedKeys = {};
  Object.keys(defs).map(function (name) {
    var component = defs[name];
    name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    formattedKeys[name] = component;
  });
  exports.IconLibrary = IconLibrary = formattedKeys;
}

var mapIcon = exports.mapIcon = function mapIcon(icon) {
  if (typeof icon !== 'string') return null;
  icon = (0, _utils.uppercaseFirstLetter)(icon);
  icon = IconLibrary[icon] || null;
  return icon;
};

exports.IconLibrary = IconLibrary;