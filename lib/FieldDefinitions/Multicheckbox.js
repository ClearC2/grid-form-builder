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

    var _this$props = _this.props,
        field = _this$props.field,
        _this$props$formValue = _this$props.formValues,
        formValues = _this$props$formValue === undefined ? Map() : _this$props$formValue,
        _this$props$opts = _this$props.opts,
        opts = _this$props$opts === undefined ? {} : _this$props$opts;

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

  this.handleOnChange = function (e) {
    var updatingValue = e.target.value;
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
        field = _props2.field,
        _props2$opts = _props2.opts,
        opts = _props2$opts === undefined ? {} : _props2$opts;
    var value = _this2.state.value;
    var _opts$options2 = opts.options,
        options = _opts$options2 === undefined ? List() : _opts$options2,
        _opts$label = opts.label,
        label = _opts$label === undefined ? field : _opts$label,
        _opts$style = opts.style,
        style = _opts$style === undefined ? {} : _opts$style,
        _opts$labelStyle = opts.labelStyle,
        labelStyle = _opts$labelStyle === undefined ? {} : _opts$labelStyle,
        _opts$Icon = opts.Icon,
        Icon = _opts$Icon === undefined ? null : _opts$Icon,
        _opts$iconProps = opts.iconProps,
        iconProps = _opts$iconProps === undefined ? {} : _opts$iconProps,
        _opts$props = opts.props,
        props = _opts$props === undefined ? {} : _opts$props,
        _opts$boxed = opts.boxed,
        boxed = _opts$boxed === undefined ? false : _opts$boxed;

    var boxStyle = !boxed ? {} : { border: '1px solid lightgrey', backgroundColor: '#f5f5f5' };
    return React.createElement(
      'div',
      { style: _extends({ display: 'flex', flex: 1, flexDirection: 'row' }, boxStyle) },
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
      React.createElement(
        'div',
        { style: { display: 'flex', flexDirection: 'column', flex: 1 } },
        options.map(function (option) {
          return React.createElement(
            'label',
            { key: option, style: { display: 'flex', flex: 1, height: 27, margin: 0, marginBottom: 5, alignItems: 'center', paddingLeft: 5, fontWeight: 'bold' } },
            React.createElement('input', _extends({ className: 'radio-grid-input', onChange: _this2.handleOnChange, style: _extends({ marginRight: 5 }, style), type: 'checkbox', name: field, value: option, checked: value.indexOf(option) > -1 }, props)),
            option
          );
        })
      )
    );
  };
};

export default Multicheckbox;