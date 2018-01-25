var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import { Map } from 'immutable';
import ReactSelect from 'react-select';

var Typeahead = function (_Component) {
  _inherits(Typeahead, _Component);

  function Typeahead() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Typeahead);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Typeahead.__proto__ || Object.getPrototypeOf(Typeahead)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      shouldRemount: false,
      currentOptions: {}
    }, _this.onMouseDown = function (e) {
      if (_this.props.draggable) e.stopPropagation();
    }, _this.setShouldRemount = function () {
      var shouldRemount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      return _this.setState({ shouldRemount: shouldRemount });
    }, _this.handleChange = function (typeahead) {
      var _this$props = _this.props,
          _this$props$handleOnC = _this$props.handleOnChange,
          handleOnChange = _this$props$handleOnC === undefined ? function () {} : _this$props$handleOnC,
          _this$props$opts = _this$props.opts,
          opts = _this$props$opts === undefined ? {} : _this$props$opts;
      var _this$state$currentOp = _this.state.currentOptions,
          currentOptions = _this$state$currentOp === undefined ? Map() : _this$state$currentOp;
      var _opts$props = opts.props,
          props = _opts$props === undefined ? {} : _opts$props;
      var _props$cfd = props.cfd,
          cfd = _props$cfd === undefined ? [] : _props$cfd;
      var field = _this.props.field;

      var value = typeahead ? typeahead.value : '';
      var label = typeahead ? typeahead.label : '';
      var fieldsToUpdate = [];
      fieldsToUpdate.push({ target: { name: field, value: Map({ value: value, label: label }) } });
      cfd.map(function (cfdField) {
        var cfdValue = currentOptions.getIn([value, 'cfd', cfdField], '');
        fieldsToUpdate.push({ target: { name: cfdField, value: cfdValue } });
        if (cfdField.indexOf('cfd_') === -1) fieldsToUpdate.push({ target: { name: 'cfd_' + cfdField, value: cfdValue } });
      });
      handleOnChange(fieldsToUpdate);
    }, _this.loadOptions = function (input) {
      var _this$props2 = _this.props,
          field = _this$props2.field,
          _this$props2$formValu = _this$props2.formValues,
          formValues = _this$props2$formValu === undefined ? Map() : _this$props2$formValu;

      var currentValue = formValues.get(field, '');

      var values = [];

      if (currentValue && currentValue !== '') {
        values.push({ value: currentValue, label: currentValue });
      }

      if (input.trim() !== '' && !values.some(function (o) {
        return o.value === input;
      })) {
        values.push({ value: input, label: input });
      }

      if (input.length < _this.props.minChars) {
        return Promise.resolve({ options: values });
      }

      return []; // refactor to handle ajax prepop options?
    }, _this.render = function () {
      var _this$props3 = _this.props,
          field = _this$props3.field,
          _this$props3$formValu = _this$props3.formValues,
          formValues = _this$props3$formValu === undefined ? Map() : _this$props3$formValu,
          _this$props3$opts = _this$props3.opts,
          opts = _this$props3$opts === undefined ? {} : _this$props3$opts;
      var _opts$label = opts.label,
          label = _opts$label === undefined ? field : _opts$label,
          _opts$labelStyle = opts.labelStyle,
          labelStyle = _opts$labelStyle === undefined ? {} : _opts$labelStyle;

      var currentValue = formValues.get(field, Map({ value: '', label: '' }));
      var value = '';
      var valueLabel = '';
      if (typeof currentValue === 'string') {
        value = currentValue;
        valueLabel = currentValue;
      } else if ((typeof currentValue === 'undefined' ? 'undefined' : _typeof(currentValue)) === 'object') {
        if (typeof currentValue.get === 'function') {
          value = currentValue.get('value', '');
          valueLabel = currentValue.get('label', '');
        } else {
          value = currentValue.value ? currentValue.value : '';
          valueLabel = currentValue.label ? currentValue.label : '';
        }
      }
      if (_this.state.shouldRemount) {
        return React.createElement(Placeholder, { handleMount: _this.setShouldRemount });
      } else {
        return React.createElement(
          'div',
          { style: { display: 'flex', flexDirection: 'row', flex: 1, justifyContent: 'flex-start', alignItems: 'center' } },
          React.createElement(
            'span',
            { style: _extends({ display: 'flex', flexDirection: 'row', width: 150, minWidth: 150, height: 15, marginTop: 3, fontWeight: 'bold' }, labelStyle) },
            label
          ),
          React.createElement(ReactSelect.Async, {
            onMouseDown: _this.onMouseDown,
            name: field,
            value: { value: value, label: valueLabel },
            onChange: _this.handleChange,
            loadOptions: _this.loadOptions
          })
        );
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return Typeahead;
}(Component);

Typeahead.defaultProps = {
  minChars: 1
};
export default Typeahead;