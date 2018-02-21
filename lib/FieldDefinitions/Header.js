var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';

var Header = function (_Component) {
  _inherits(Header, _Component);

  function Header() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Header);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Header.__proto__ || Object.getPrototypeOf(Header)).call.apply(_ref, [this].concat(args))), _this), _this.render = function () {
      var _this$props$config = _this.props.config,
          config = _this$props$config === undefined ? {} : _this$props$config;
      var _config$style = config.style,
          style = _config$style === undefined ? {} : _config$style,
          _config$name = config.name,
          name = _config$name === undefined ? null : _config$name;

      if (!name) return null;
      var _config$label = config.label,
          label = _config$label === undefined ? name : _config$label;

      return React.createElement(
        'div',
        { style: { display: 'flex', flex: 1, flexDirection: 'row' } },
        React.createElement(
          'div',
          { style: _extends({ display: 'flex', flexDirection: 'row', width: 150, minWidth: 150, height: 15, marginTop: 4 }, style) },
          React.createElement(
            'strong',
            { style: _extends({ display: 'flex', justifyContent: 'flex-start', lineHeight: '23px', whiteSpace: 'nowrap', textOverflow: 'ellipsis', fontSize: '13pt' }, style) },
            label
          )
        )
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return Header;
}(Component);

export default Header;