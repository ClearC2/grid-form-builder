var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import DateTime from 'react-datetime';
import { Map } from 'immutable';

var Date = function (_Component) {
  _inherits(Date, _Component);

  function Date() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Date);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Date.__proto__ || Object.getPrototypeOf(Date)).call.apply(_ref, [this].concat(args))), _this), _this.handleChange = function (val) {
      var _this$props = _this.props,
          field = _this$props.field,
          _this$props$handleOnC = _this$props.handleOnChange,
          handleOnChange = _this$props$handleOnC === undefined ? function () {} : _this$props$handleOnC;

      var value = (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' ? val.format('M/D/YYYY') : val;
      var e = { target: { name: field, value: value } };
      handleOnChange(e);
    }, _this.onMouseDown = function (e) {
      if (_this.props.draggable) e.stopPropagation();
    }, _this.render = function () {
      var _this$props2 = _this.props,
          field = _this$props2.field,
          _this$props2$formValu = _this$props2.formValues,
          formValues = _this$props2$formValu === undefined ? Map() : _this$props2$formValu,
          _this$props2$opts = _this$props2.opts,
          opts = _this$props2$opts === undefined ? {} : _this$props2$opts;
      var _opts$label = opts.label,
          label = _opts$label === undefined ? field : _opts$label,
          _opts$labelStyle = opts.labelStyle,
          labelStyle = _opts$labelStyle === undefined ? {} : _opts$labelStyle,
          _opts$Icon = opts.Icon,
          Icon = _opts$Icon === undefined ? null : _opts$Icon,
          _opts$iconProps = opts.iconProps,
          iconProps = _opts$iconProps === undefined ? {} : _opts$iconProps,
          _opts$props = opts.props,
          props = _opts$props === undefined ? {} : _opts$props;

      var value = formValues.get(field, '');
      return React.createElement(
        'div',
        { style: { display: 'flex', flex: 1, flexDirection: 'row' } },
        React.createElement(
          'div',
          { style: _extends({ display: 'flex', flexDirection: 'row', width: 150, minWidth: 150, height: 15, marginTop: 4 }, labelStyle) },
          !!Icon && React.createElement(Icon, _extends({ size: 20, style: { marginRight: 5 } }, iconProps)),
          React.createElement(
            'strong',
            { style: _extends({ display: 'flex', justifyContent: 'flex-start', lineHeight: '23px', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }, labelStyle) },
            label
          )
        ),
        React.createElement(DateTime, _extends({ onMouseDown: _this.onMouseDown, value: value, onChange: _this.handleChange, dateFormat: 'M/D/YYYY', timeFormat: false, className: 'date-wrapper-grid-input' }, props))
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return Date;
}(Component);

export default Date;