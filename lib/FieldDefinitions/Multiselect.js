var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import { List, fromJS } from 'immutable';
import ReactSelect from 'react-select';

var Multiselect = function (_Component) {
  _inherits(Multiselect, _Component);

  function Multiselect(props) {
    _classCallCheck(this, Multiselect);

    var _this = _possibleConstructorReturn(this, (Multiselect.__proto__ || Object.getPrototypeOf(Multiselect)).call(this, props));

    _initialiseProps.call(_this);

    var _props$config = props.config,
        config = _props$config === undefined ? {} : _props$config;
    var _config$keyword = config.keyword,
        keyword = _config$keyword === undefined ? {} : _config$keyword;
    var _keyword$options = keyword.options,
        options = _keyword$options === undefined ? [] : _keyword$options;

    _this.state = {
      fieldValues: [],
      builtOptions: options
    };
    return _this;
  }

  return Multiselect;
}(Component);

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.onChange = function (e) {
    _this2.setState({ fieldValues: e });
    if (e.length === 0) {
      _this2.props.handleOnChange({ target: { name: _this2.props.field, value: '' } });
    } else {
      _this2.props.handleOnChange({ target: { name: _this2.props.field, value: fromJS({ condition: 'is one of', values: List(e.map(function (val) {
              return val.value;
            })) }) } });
    }
  };

  this.render = function () {
    var _props = _this2.props,
        inline = _props.inline,
        _props$config2 = _props.config,
        config = _props$config2 === undefined ? {} : _props$config2;
    var _config$labelStyle = config.labelStyle,
        labelStyle = _config$labelStyle === undefined ? {} : _config$labelStyle,
        _config$style = config.style,
        style = _config$style === undefined ? {} : _config$style,
        _config$name = config.name,
        name = _config$name === undefined ? null : _config$name;

    if (!name) return null;
    var _config$label = config.label,
        label = _config$label === undefined ? name : _config$label;


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
      }, labelStyle),
      input: _extends({}, style)
    };

    var className = inline ? 'select-grid-input select-grid-input-inline' : 'select-grid-input';

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
      React.createElement(ReactSelect, {
        onChange: _this2.onChange,
        className: className,
        style: styles.input,
        multi: true,
        name: name,
        options: _this2.state.builtOptions,
        value: _this2.state.fieldValues
      })
    );
  };
};

export default Multiselect;