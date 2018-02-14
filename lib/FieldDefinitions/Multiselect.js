var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import { List, fromJS } from 'immutable';
import ReactSelect from 'react-select';

var Multiselect = function (_Component) {
  _inherits(Multiselect, _Component);

  function Multiselect() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Multiselect);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Multiselect.__proto__ || Object.getPrototypeOf(Multiselect)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      fieldValues: [],
      builtOptions: []
    }, _this.onChange = function (e) {
      _this.setState({ fieldValues: e });
      if (e.length === 0) {
        _this.props.handleOnChange({ target: { name: _this.props.field, value: '' } });
      } else {
        _this.props.handleOnChange({ target: { name: _this.props.field, value: fromJS({ condition: 'is one of', values: List(e.map(function (val) {
                return val.value;
              })) }) } });
      }
    }, _this.buildOptions = function (opts) {
      var builtOpts = [];
      opts.forEach(function (opt) {
        builtOpts.push({ value: opt, label: opt });
      });
      return builtOpts;
    }, _this.render = function () {
      var _this$props = _this.props,
          inline = _this$props.inline,
          field = _this$props.field,
          _this$props$opts = _this$props.opts,
          opts = _this$props$opts === undefined ? {} : _this$props$opts;
      var _opts$label = opts.label,
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
          props = _opts$props === undefined ? {} : _opts$props;


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
        icon: {
          marginRight: 5,
          width: 20
        },
        input: _extends({}, style)
      };

      var className = inline ? 'select-grid-input select-grid-input-inline' : 'select-grid-input';

      return React.createElement(
        'div',
        { style: styles.container },
        React.createElement(
          'div',
          { style: styles.labelContainer },
          !!Icon && React.createElement(Icon, _extends({ size: 20, style: styles.icon }, iconProps)),
          React.createElement(
            'strong',
            { style: styles.label },
            label
          )
        ),
        React.createElement(ReactSelect, _extends({
          onChange: _this.onChange,
          className: className,
          style: styles.input,
          multi: true,
          name: field,
          options: _this.state.builtOptions,
          value: _this.props.formValues.getIn([field, 'values'], List()).map(function (val) {
            return { value: val, label: val };
          }).toArray()
        }, props))
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Multiselect, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({ builtOptions: this.buildOptions(this.props.opts.options) });
    }
  }]);

  return Multiselect;
}(Component);

export default Multiselect;