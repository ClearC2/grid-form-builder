var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import { Map, List } from 'immutable';

// this component is designed to return a List() of selected values to the forms handle change function

var Multicheckbox = function (_Component) {
  _inherits(Multicheckbox, _Component);

  function Multicheckbox(props) {
    _classCallCheck(this, Multicheckbox);

    var _this = _possibleConstructorReturn(this, (Multicheckbox.__proto__ || Object.getPrototypeOf(Multicheckbox)).call(this, props));

    _initialiseProps.call(_this);

    var field = props.field,
        _props$formValues = props.formValues,
        formValues = _props$formValues === undefined ? Map() : _props$formValues,
        _props$opts = props.opts,
        opts = _props$opts === undefined ? {} : _props$opts;

    var value = formValues.get(field, List());
    var _opts$options = opts.options,
        options = _opts$options === undefined ? List() : _opts$options;

    var currentVals = List();
    options.map(function (option) {
      if (value.indexOf(option) > -1) currentVals = currentVals.push(option);
    });
    _this.state = {
      value: currentVals
    };
    return _this;
  }

  return Multicheckbox;
}(Component);

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.handleOnChange = function (changingVal) {
    var value = _this2.state.value;

    if (value.indexOf(changingVal) > -1) {
      value = value.filter(function (option) {
        return option !== changingVal;
      });
    } else {
      value = value.push(changingVal);
    }
    _this2.setState({ value: value });
  };

  this.componentDidUpdate = function (p, s) {
    var _props = _this2.props,
        _props$config = _props.config,
        config = _props$config === undefined ? {} : _props$config,
        _props$handleOnChange = _props.handleOnChange,
        handleOnChange = _props$handleOnChange === undefined ? function () {} : _props$handleOnChange;
    var name = config.name;
    var value = _this2.state.value;

    if (value.size !== s.value.size) {
      handleOnChange({ target: { name: name, value: value } });
    }
  };

  this.render = function () {
    var _props2 = _this2.props,
        inline = _props2.inline,
        _props2$config = _props2.config,
        config = _props2$config === undefined ? {} : _props2$config,
        _props2$Icon = _props2.Icon,
        Icon = _props2$Icon === undefined ? null : _props2$Icon;
    var _config$labelStyle = config.labelStyle,
        labelStyle = _config$labelStyle === undefined ? {} : _config$labelStyle,
        _config$style = config.style,
        style = _config$style === undefined ? {} : _config$style,
        _config$name = config.name,
        name = _config$name === undefined ? null : _config$name,
        _config$iconStyle = config.iconStyle,
        iconStyle = _config$iconStyle === undefined ? {} : _config$iconStyle,
        _config$required = config.required,
        required = _config$required === undefined ? false : _config$required;

    if (!name) return null;
    var _config$label = config.label,
        label = _config$label === undefined ? name : _config$label,
        _config$keyword = config.keyword,
        keyword = _config$keyword === undefined ? {} : _config$keyword,
        boxed = config.boxed;
    var _keyword$options = keyword.options,
        options = _keyword$options === undefined ? [] : _keyword$options;
    var value = _this2.state.value;

    var boxStyle = !boxed ? {} : { border: '1px solid lightgrey', backgroundColor: '#f5f5f5' };
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
      }, boxStyle),
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
        lineHeight: inline ? '12pt' : '11pt',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        fontSize: inline ? '10pt' : '8pt',
        background: 'transparent'
      }, labelStyle),
      optionsContainer: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        marginLeft: inline ? 0 : 10,
        marginTop: inline ? 10 : 5
      },
      input: _extends({
        display: 'flex',
        marginRight: 5,
        marginTop: 0
      }, style),
      icon: _extends({
        marginRight: 5,
        width: 15,
        height: 15,
        marginTop: -1
      }, iconStyle)
    };

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
      React.createElement(
        'div',
        { style: styles.optionsContainer },
        options.map(function (option, i) {
          return React.createElement(
            'label',
            { key: i, style: styles.label },
            React.createElement('input', { className: 'radio-grid-input', onChange: function onChange() {
                return _this2.handleOnChange(option.value);
              }, style: styles.input, type: 'checkbox', name: name, value: option.value, checked: value.indexOf(option.value) > -1, disabled: disabled }),
            option.label ? option.label : option.value
          );
        })
      )
    );
  };
};

export default Multicheckbox;