var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import { Map } from 'immutable';
import ReactSelect from 'react-select';
import PropTypes from 'prop-types';

var Placeholder = function (_Component) {
  _inherits(Placeholder, _Component);

  function Placeholder() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Placeholder);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Placeholder.__proto__ || Object.getPrototypeOf(Placeholder)).call.apply(_ref, [this].concat(args))), _this), _this.componentDidMount = function () {
      return _this.props.handleMount();
    }, _this.render = function () {
      return null;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return Placeholder;
}(Component);

Placeholder.propTypes = {
  handleMount: PropTypes.func.isRequired
};

var Typeahead = function (_Component2) {
  _inherits(Typeahead, _Component2);

  function Typeahead() {
    var _ref2;

    var _temp2, _this2, _ret2;

    _classCallCheck(this, Typeahead);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp2 = (_this2 = _possibleConstructorReturn(this, (_ref2 = Typeahead.__proto__ || Object.getPrototypeOf(Typeahead)).call.apply(_ref2, [this].concat(args))), _this2), _this2.state = {
      shouldRemount: false,
      currentOptions: {}
    }, _this2.onMouseDown = function (e) {
      if (_this2.props.draggable) e.stopPropagation();
    }, _this2.setShouldRemount = function () {
      var shouldRemount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      return _this2.setState({ shouldRemount: shouldRemount });
    }, _this2.handleChange = function (typeahead) {
      var _this2$props = _this2.props,
          _this2$props$handleOn = _this2$props.handleOnChange,
          handleOnChange = _this2$props$handleOn === undefined ? function () {} : _this2$props$handleOn,
          _this2$props$opts = _this2$props.opts,
          opts = _this2$props$opts === undefined ? {} : _this2$props$opts;
      var _this2$state$currentO = _this2.state.currentOptions,
          currentOptions = _this2$state$currentO === undefined ? Map() : _this2$state$currentO;
      var _opts$props = opts.props,
          props = _opts$props === undefined ? {} : _opts$props;
      var _props$cfd = props.cfd,
          cfd = _props$cfd === undefined ? [] : _props$cfd;
      var field = _this2.props.field;

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
    }, _this2.loadOptions = function (input) {
      var _this2$props2 = _this2.props,
          field = _this2$props2.field,
          _this2$props2$formVal = _this2$props2.formValues,
          formValues = _this2$props2$formVal === undefined ? Map() : _this2$props2$formVal;

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

      if (input.length < _this2.props.minChars) {
        return Promise.resolve({ options: values });
      }

      return Promise.resolve({ options: [] }); // refactor to handle ajax prepop options?
    }, _this2.render = function () {
      var _this2$props3 = _this2.props,
          inline = _this2$props3.inline,
          field = _this2$props3.field,
          _this2$props3$formVal = _this2$props3.formValues,
          formValues = _this2$props3$formVal === undefined ? Map() : _this2$props3$formVal,
          _this2$props3$opts = _this2$props3.opts,
          opts = _this2$props3$opts === undefined ? {} : _this2$props3$opts;
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

      var styles = {
        container: {
          display: 'flex',
          flex: 1,
          flexDirection: inline ? 'row' : 'column',
          background: 'transparent'
        },
        labelContainer: _extends({
          display: 'flex',
          flexDirection: 'row',
          width: inline ? 150 : '100%',
          minWidth: inline ? 150 : '100%',
          height: 15,
          marginTop: inline ? 4 : 0,
          background: 'transparent'
        }, labelStyle),
        label: _extends({
          display: 'flex',
          justifyContent: 'flex-start',
          lineHeight: inline ? '23px' : '15px',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          fontSize: inline ? '10pt' : '8pt',
          background: 'transparent'
        }, labelStyle)
      };

      var className = inline ? 'select-grid-input select-grid-input-inline' : 'select-grid-input';

      if (_this2.state.shouldRemount) {
        return React.createElement(Placeholder, { handleMount: _this2.setShouldRemount });
      } else {
        return React.createElement(
          'div',
          { style: styles.container },
          React.createElement(
            'div',
            { style: styles.labelContainer },
            React.createElement(
              'strong',
              { style: styles.label },
              label
            )
          ),
          React.createElement(ReactSelect.Async, {
            onMouseDown: _this2.onMouseDown,
            className: className,
            name: field,
            value: { value: value, label: valueLabel },
            onChange: _this2.handleChange,
            loadOptions: _this2.loadOptions
          })
        );
      }
    }, _temp2), _possibleConstructorReturn(_this2, _ret2);
  }

  return Typeahead;
}(Component);

Typeahead.defaultProps = {
  minChars: 1
};
export default Typeahead;