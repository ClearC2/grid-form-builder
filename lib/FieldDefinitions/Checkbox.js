var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import { Map } from 'immutable';

var Checkbox = function (_Component) {
  _inherits(Checkbox, _Component);

  function Checkbox() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Checkbox);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Checkbox.__proto__ || Object.getPrototypeOf(Checkbox)).call.apply(_ref, [this].concat(args))), _this), _this.handleOnChange = function (e) {
      var _this$props = _this.props,
          field = _this$props.field,
          _this$props$formValue = _this$props.formValues,
          formValues = _this$props$formValue === undefined ? Map() : _this$props$formValue,
          _this$props$handleOnC = _this$props.handleOnChange,
          handleOnChange = _this$props$handleOnC === undefined ? function () {} : _this$props$handleOnC;

      var value = formValues.get(field, '');
      value = value === 'on' ? 'off' : 'on';
      handleOnChange({ target: { name: e.target.name, value: value } });
    }, _this.render = function () {
      var _this$props2 = _this.props,
          field = _this$props2.field,
          _this$props2$formValu = _this$props2.formValues,
          formValues = _this$props2$formValu === undefined ? Map() : _this$props2$formValu,
          _this$props2$opts = _this$props2.opts,
          opts = _this$props2$opts === undefined ? {} : _this$props2$opts;
      var _opts$label = opts.label,
          label = _opts$label === undefined ? field : _opts$label,
          _opts$style = opts.style,
          style = _opts$style === undefined ? {} : _opts$style,
          _opts$props = opts.props,
          props = _opts$props === undefined ? {} : _opts$props;

      var value = formValues.get(field, '');
      return React.createElement(
        'div',
        { style: { display: 'flex', flex: 1, flexDirection: 'row' } },
        React.createElement(
          'label',
          { key: field, style: { display: 'flex', flex: 1, height: 27, margin: 0, marginBottom: 5, alignItems: 'center', fontWeight: 'bold', whiteSpace: 'nowrap', textOverflow: 'ellipsis' } },
          React.createElement('input', _extends({ className: 'checkbox-grid-input', onChange: _this.handleOnChange, style: _extends({ display: 'flex', marginRight: 5 }, style), type: 'checkbox', name: field, checked: value.toLowerCase() === 'on' }, props)),
          label
        )
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return Checkbox;
}(Component);

export default Checkbox;