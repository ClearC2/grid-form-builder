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
    var _props$opts = _this2.props.opts,
        opts = _props$opts === undefined ? {} : _props$opts;
    var _opts$options2 = opts.options,
        options = _opts$options2 === undefined ? List() : _opts$options2;

    _this2.setState({ value: fromJS(options) });
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
        field = _props2.field,
        _props2$opts = _props2.opts,
        opts = _props2$opts === undefined ? {} : _props2$opts;
    var value = _this2.state.value;
    var _opts$options3 = opts.options,
        options = _opts$options3 === undefined ? List() : _opts$options3,
        _opts$label = opts.label,
        label = _opts$label === undefined ? field : _opts$label,
        _opts$style = opts.style,
        style = _opts$style === undefined ? {} : _opts$style,
        _opts$labelStyle = opts.labelStyle,
        labelStyle = _opts$labelStyle === undefined ? {} : _opts$labelStyle,
        _opts$Icon = opts.Icon,
        Icon = _opts$Icon === undefined ? null : _opts$Icon,
        _opts$iconProps = opts.iconProps,
        iconProps = _opts$iconProps === undefined ? {} : _opts$iconProps;

    return React.createElement(
      'div',
      { style: { display: 'flex', flex: 1, flexDirection: 'column', height: '100%' } },
      React.createElement(
        'div',
        { style: _extends({ display: 'flex', flexDirection: 'row', width: 150, minWidth: 150, height: 27 }, labelStyle) },
        !!Icon && React.createElement(Icon, _extends({ size: 20, style: { marginRight: 5 } }, iconProps)),
        React.createElement(
          'strong',
          { style: _extends({ display: 'flex', justifyContent: 'flex-start', lineHeight: '23px', whiteSpace: 'nowrap', textOverflow: 'ellipsis', height: 27 }, labelStyle) },
          label
        )
      ),
      React.createElement(
        'div',
        { style: { display: 'flex', flexDirection: 'column', minHeight: 10, border: '1px solid lightgrey', height: 'calc(100% - 18px)', marginTop: 3, overflowY: 'scroll' } },
        options.map(function (option) {
          return React.createElement(
            'div',
            {
              key: option,
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
                backgroundColor: value.indexOf(option) > -1 ? '#a1c3fa' : 'transparent'
              }, style)
            },
            option
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