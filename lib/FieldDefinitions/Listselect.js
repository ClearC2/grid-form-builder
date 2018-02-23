var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import { Map, List, fromJS } from 'immutable';

// this component is designed to return a List() of selected values to the forms handle change function

var Listselect = function (_Component) {
  _inherits(Listselect, _Component);

  function Listselect(props) {
    _classCallCheck(this, Listselect);

    var _this = _possibleConstructorReturn(this, (Listselect.__proto__ || Object.getPrototypeOf(Listselect)).call(this, props));

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

  return Listselect;
}(Component);

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.handleOnChange = function (e) {
    var updatingValue = e.target.innerHTML;
    var value = _this2.state.value;

    if (value.indexOf(updatingValue) > -1) {
      value = value.filter(function (option) {
        return option !== updatingValue;
      });
    } else {
      value = value.push(updatingValue);
    }
    _this2.setState({ value: value });
  };

  this.selectAllOptions = function () {
    var _props$config = _this2.props.config,
        config = _props$config === undefined ? {} : _props$config;
    var _config$keyword = config.keyword,
        keyword = _config$keyword === undefined ? {} : _config$keyword;
    var _keyword$options = keyword.options,
        options = _keyword$options === undefined ? [] : _keyword$options;

    var values = options.map(function (options) {
      return options.value;
    });
    _this2.setState({ value: fromJS(values) });
  };

  this.deselectAllOptions = function () {
    return _this2.setState({ value: List() });
  };

  this.componentDidUpdate = function (p, s) {
    var _props = _this2.props,
        field = _props.field,
        _props$handleOnChange = _props.handleOnChange,
        handleOnChange = _props$handleOnChange === undefined ? function () {} : _props$handleOnChange;
    var value = _this2.state.value;

    if (value.size !== s.value.size) {
      handleOnChange({ target: { name: field, value: value } });
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
        _config$keyword2 = config.keyword,
        keyword = _config$keyword2 === undefined ? {} : _config$keyword2;
    var _keyword$options2 = keyword.options,
        options = _keyword$options2 === undefined ? [] : _keyword$options2;
    var value = _this2.state.value;


    var styles = {
      labelContainer: _extends({
        display: 'flex',
        flexDirection: 'row',
        width: inline ? 150 : '100%',
        minWidth: inline ? 150 : '100%',
        height: 15,
        marginTop: inline ? 4 : 0,
        background: 'transparent',
        marginBottom: inline ? 10 : 0
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
      icon: _extends({
        marginRight: 5,
        width: 15,
        height: 15,
        marginTop: inline ? 4 : 0
      }, iconStyle)
    };

    return React.createElement(
      'div',
      { style: { display: 'flex', flex: 1, flexDirection: 'column', height: '100%' } },
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
        { style: { display: 'flex', flexDirection: 'column', minHeight: 10, border: '1px solid lightgrey', height: 'calc(100% - 18px)', marginTop: 3, overflowY: 'scroll' } },
        options.map(function (option, i) {
          return React.createElement(
            'div',
            {
              key: i,
              onClick: _this2.handleOnChange,
              style: _extends({
                display: 'flex',
                height: 27,
                minHeight: 27,
                margin: 0,
                alignItems: 'center',
                paddingLeft: 5,
                width: '100%',
                borderBottom: '1px solid lightgrey',
                backgroundColor: value.indexOf(option.value) > -1 ? '#a1c3fa' : 'transparent'
              }, style)
            },
            option.label ? option.label : option.value
          );
        })
      ),
      React.createElement(
        'div',
        { style: { display: 'flex', justifyContent: 'flex-end', height: 15, minHeight: 15 } },
        React.createElement(
          'span',
          { onClick: _this2.selectAllOptions, style: { marginRight: 5, fontSize: '8pt', textDecoration: 'underline', color: 'blue' }, className: 'cursor-hand' },
          'Select All'
        ),
        React.createElement(
          'span',
          { onClick: _this2.deselectAllOptions, style: { marginRight: 5, fontSize: '8pt', textDecoration: 'underline', color: 'blue' }, className: 'cursor-hand' },
          'Deselect All'
        )
      )
    );
  };
};

export default Listselect;