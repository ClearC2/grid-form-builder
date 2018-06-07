var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import { Map } from 'immutable';
import ReactSelect from 'react-select';
import PropTypes from 'prop-types';
import GFBConfig from '../config';

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
          handleOnChange = _this2$props.handleOnChange,
          _this2$props$config = _this2$props.config,
          config = _this2$props$config === undefined ? {} : _this2$props$config;
      var _config$name = config.name,
          name = _config$name === undefined ? null : _config$name;

      Object.keys(typeahead).forEach(function (field) {
        var value = typeahead[field];
        if (field === 'label') field = name;
        if (field !== 'value') {
          handleOnChange({
            target: {
              name: field,
              value: value
            }
          });
        }
      });
    }, _this2.loadOptions = function (search) {
      var _this2$props2 = _this2.props,
          _this2$props2$config = _this2$props2.config,
          config = _this2$props2$config === undefined ? {} : _this2$props2$config,
          _this2$props2$formVal = _this2$props2.formValues,
          formValues = _this2$props2$formVal === undefined ? Map() : _this2$props2$formVal;
      var _config$name2 = config.name,
          name = _config$name2 === undefined ? null : _config$name2,
          _config$typeahead = config.typeahead,
          typeahead = _config$typeahead === undefined ? {} : _config$typeahead;
      var _typeahead$key = typeahead.key,
          key = _typeahead$key === undefined ? null : _typeahead$key,
          _typeahead$duplicatio = typeahead.duplication,
          duplication = _typeahead$duplicatio === undefined ? false : _typeahead$duplicatio;


      if (!key) {
        console.error('The JSON schema representation for ' + name + ' does not have a typeahead key. A typeahead.key is required for this field type to search for results.');
        return Promise.resolve({ options: [] });
      }

      var currentValue = formValues.get(name, { value: '', label: '' });

      var values = [];

      if (currentValue && currentValue.value && currentValue.value !== '') {
        values.push({ value: currentValue, label: currentValue });
      }

      if (search.trim() !== '' && !values.some(function (o) {
        return o.value === search;
      })) {
        values.push({ value: search, label: search });
      }

      if (search.length > _this2.props.minChars) {
        return GFBConfig.ajax.get('/typeahead/name/' + key + '/search/' + search).then(function (resp) {
          var results = resp.data.data.map(function (value) {
            value.duplication = duplication;
            return value;
          });
          return { options: values.concat(results) };
        });
      }

      return Promise.resolve({ options: [] });
    }, _this2.render = function () {
      var _this2$props3 = _this2.props,
          inline = _this2$props3.inline,
          _this2$props3$formVal = _this2$props3.formValues,
          formValues = _this2$props3$formVal === undefined ? Map() : _this2$props3$formVal,
          _this2$props3$config = _this2$props3.config,
          config = _this2$props3$config === undefined ? {} : _this2$props3$config,
          _this2$props3$Icon = _this2$props3.Icon,
          Icon = _this2$props3$Icon === undefined ? null : _this2$props3$Icon,
          requiredWarning = _this2$props3.requiredWarning;
      var _config$labelStyle = config.labelStyle,
          labelStyle = _config$labelStyle === undefined ? {} : _config$labelStyle,
          _config$name3 = config.name,
          name = _config$name3 === undefined ? null : _config$name3,
          _config$iconStyle = config.iconStyle,
          iconStyle = _config$iconStyle === undefined ? {} : _config$iconStyle,
          _config$required = config.required,
          required = _config$required === undefined ? false : _config$required,
          _config$multi = config.multi,
          multi = _config$multi === undefined ? false : _config$multi,
          _config$style = config.style,
          style = _config$style === undefined ? {} : _config$style,
          _config$containerStyl = config.containerStyle,
          containerStyle = _config$containerStyl === undefined ? {} : _config$containerStyl;

      if (!name) return null;
      var _config$label = config.label,
          label = _config$label === undefined ? name : _config$label;

      var value = formValues.get(name, null);
      if (typeof value === 'string' && value.length > 0) value = { value: value, label: value };
      var warn = requiredWarning && formValues.get(name, '').length === 0 && required;
      var _config$readonly = config.readonly,
          readonly = _config$readonly === undefined ? false : _config$readonly,
          _config$disabled = config.disabled,
          disabled = _config$disabled === undefined ? false : _config$disabled;

      disabled = disabled || readonly;

      var styles = {
        container: _extends({
          display: 'flex',
          flex: 1,
          flexDirection: inline ? 'row' : 'column',
          background: 'transparent'
        }, containerStyle),
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
        }, labelStyle),
        input: _extends({
          backgroundColor: disabled ? '#eee' : 'white',
          minWidth: 177
        }, style),
        icon: _extends({
          marginRight: 5,
          width: 15,
          height: 15,
          marginTop: inline ? 4 : 0
        }, iconStyle)
      };

      var className = inline ? 'select-grid-input select-grid-input-inline' : 'select-grid-input';
      className = !warn ? className : className + ' warn-required';

      if (_this2.state.shouldRemount) {
        return React.createElement(Placeholder, { handleMount: _this2.setShouldRemount });
      } else {
        return React.createElement(
          'div',
          { style: styles.container },
          React.createElement(
            'div',
            { style: styles.labelContainer },
            required && React.createElement(
              'div',
              { style: { color: '#ec1c24', fontWeight: 'bold', fontSize: '15pt', lineHeight: '10pt' } },
              '*'
            ),
            Icon && React.createElement(Icon, { style: styles.icon }),
            React.createElement(
              'strong',
              { style: styles.label },
              label
            )
          ),
          React.createElement(ReactSelect.Async, {
            style: style,
            onMouseDown: _this2.onMouseDown,
            className: className,
            name: name,
            multi: multi,
            value: value,
            onChange: _this2.handleChange,
            loadOptions: _this2.loadOptions,
            disabled: disabled
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