"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _core = require("@emotion/core");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _fa = require("react-icons/fa");

/** @jsx jsx */
var Toolbar = function Toolbar(_ref) {
  var id = _ref.id;
  return (0, _core.jsx)("div", {
    id: id,
    style: {
      backgroundColor: '#fafafa'
    }
  }, (0, _core.jsx)("select", {
    className: "ql-header",
    defaultValue: 'normal',
    onChange: function onChange(e) {
      return e.persist();
    }
  }, (0, _core.jsx)("option", {
    value: "1"
  }), (0, _core.jsx)("option", {
    value: "2"
  }), (0, _core.jsx)("option", {
    value: "3"
  }), (0, _core.jsx)("option", {
    value: "normal"
  })), (0, _core.jsx)("button", {
    className: "ql-bold"
  }), (0, _core.jsx)("button", {
    className: "ql-italic"
  }), (0, _core.jsx)("button", {
    className: "ql-underline"
  }), (0, _core.jsx)("button", {
    className: "ql-strike"
  }), (0, _core.jsx)("select", {
    className: "ql-color"
  }), (0, _core.jsx)("select", {
    className: "ql-background"
  }), (0, _core.jsx)("button", {
    className: "ql-link"
  }), (0, _core.jsx)("button", {
    className: "ql-list",
    value: "bullet"
  }), (0, _core.jsx)("button", {
    className: "ql-list",
    value: "ordered"
  }), (0, _core.jsx)("button", {
    className: "ql-blockquote"
  }), (0, _core.jsx)("button", {
    className: "ql-insertImage"
  }, (0, _core.jsx)(_fa.FaImage, null)));
};

var _default = Toolbar;
exports.default = _default;
Toolbar.propTypes = {
  id: _propTypes.default.string
};