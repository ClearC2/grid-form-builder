'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _NumeralFormatter = require('cleave.js/src/shortcuts/NumeralFormatter');

var _NumeralFormatter2 = _interopRequireDefault(_NumeralFormatter);

var _DateFormatter = require('cleave.js/src/shortcuts/DateFormatter');

var _DateFormatter2 = _interopRequireDefault(_DateFormatter);

var _TimeFormatter = require('cleave.js/src/shortcuts/TimeFormatter');

var _TimeFormatter2 = _interopRequireDefault(_TimeFormatter);

var _PhoneFormatter = require('cleave.js/src/shortcuts/PhoneFormatter');

var _PhoneFormatter2 = _interopRequireDefault(_PhoneFormatter);

var _CreditCardDetector = require('cleave.js/src/shortcuts/CreditCardDetector');

var _CreditCardDetector2 = _interopRequireDefault(_CreditCardDetector);

var _Util = require('cleave.js/src/utils/Util');

var _Util2 = _interopRequireDefault(_Util);

var _DefaultProperties = require('cleave.js/src/common/DefaultProperties');

var _DefaultProperties2 = _interopRequireDefault(_DefaultProperties);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // /* eslint-disable */

// This is a temporary internal fork of cleave.js to remove deprecated react life cycles until cleave.js can be updated - JRA 11/21/2019


var Cleave = function (_Component) {
  _inherits(Cleave, _Component);

  function Cleave(props) {
    _classCallCheck(this, Cleave);

    var _this = _possibleConstructorReturn(this, (Cleave.__proto__ || Object.getPrototypeOf(Cleave)).call(this, props));

    _initialiseProps.call(_this);

    var value = props.value,
        options = props.options,
        onKeyDown = props.onKeyDown,
        onChange = props.onChange,
        onFocus = props.onFocus,
        onBlur = props.onBlur,
        onInit = props.onInit;


    _this.registeredEvents = {
      onInit: onInit || _Util2.default.noop,
      onChange: onChange || _Util2.default.noop,
      onFocus: onFocus || _Util2.default.noop,
      onBlur: onBlur || _Util2.default.noop,
      onKeyDown: onKeyDown || _Util2.default.noop
    };

    if (!options) {
      options = {};
    }

    options.initValue = value;

    _this.properties = _DefaultProperties2.default.assign({}, options);

    _this.state = {
      value: _this.properties.result,
      cursorPosition: 0
    };
    return _this;
  }

  _createClass(Cleave, [{
    key: 'getSnapshotBeforeUpdate',
    value: function getSnapshotBeforeUpdate(prevProps, prevState) {
      var state = {};
      var newValue = this.props.value;
      if (newValue !== undefined) {
        newValue = newValue.toString();

        if (newValue !== this.properties.result) {
          this.properties.initValue = newValue;
          state = this.onInput(newValue, true, true) || null;
        }
      }
      return state;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.init();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(props) {
      var pps = this.properties;

      _Util2.default.setSelection(this.element, this.state.cursorPosition, pps.document);
      this.updateRegisteredEvents(this.props);

      // update phone region code - // not supporting changing region after mount for now, this will almost certainly blow up in an in - JRA 11/21/2019
      // if (phoneRegionCode && phoneRegionCode !== this.properties.phoneRegionCode) {
      //   this.properties.phoneRegionCode = phoneRegionCode
      //   this.initPhoneFormatter()
      //   this.onInput(this.properties.result)
      // }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this,
          _arguments = arguments;

      var _props = this.props,
          value = _props.value,
          options = _props.options,
          onKeyDown = _props.onKeyDown,
          onFocus = _props.onFocus,
          onBlur = _props.onBlur,
          onChange = _props.onChange,
          onInit = _props.onInit,
          htmlRef = _props.htmlRef,
          propsToTransfer = _objectWithoutProperties(_props, ['value', 'options', 'onKeyDown', 'onFocus', 'onBlur', 'onChange', 'onInit', 'htmlRef']);

      return _react2.default.createElement('input', _extends({
        type: 'text',
        ref: function ref(_ref) {
          _this2.element = _ref;

          if (!htmlRef) {
            return;
          }

          htmlRef.apply(_this2, _arguments);
        },
        value: this.state.value,
        onKeyDown: this.onKeyDown,
        onChange: this.onChange,
        onFocus: this.onFocus,
        onBlur: this.onBlur
      }, propsToTransfer));
    }
  }]);

  return Cleave;
}(_react.Component);

Cleave.propTypes = {
  options: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),
  value: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),
  onKeyDown: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  onFocus: _propTypes2.default.func,
  onBlur: _propTypes2.default.func,
  onInit: _propTypes2.default.func,
  htmlRef: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func, _propTypes2.default.object]),
  disabled: _propTypes2.default.bool
};

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.updateRegisteredEvents = function (props) {
    var _registeredEvents = _this3.registeredEvents,
        onKeyDown = _registeredEvents.onKeyDown,
        onChange = _registeredEvents.onChange,
        onFocus = _registeredEvents.onFocus,
        onBlur = _registeredEvents.onBlur,
        onInit = _registeredEvents.onInit;


    if (props.onInit && props.onInit !== onInit) _this3.registeredEvents.onInit = props.onInit;
    if (props.onChange && props.onChange !== onChange) _this3.registeredEvents.onChange = props.onChange;
    if (props.onFocus && props.onFocus !== onFocus) _this3.registeredEvents.onFocus = props.onFocus;
    if (props.onBlur && props.onBlur !== onBlur) _this3.registeredEvents.onBlur = props.onBlur;
    if (props.onKeyDown && props.onKeyDown !== onKeyDown) _this3.registeredEvents.onKeyDown = props.onKeyDown;
  };

  this.init = function () {
    var pps = _this3.properties;

    // so no need for this lib at all
    if (!pps.numeral && !pps.phone && !pps.creditCard && !pps.time && !pps.date && pps.blocksLength === 0 && !pps.prefix) {
      _this3.onInput(pps.initValue);
      _this3.registeredEvents.onInit(_this3);

      return;
    }

    pps.maxLength = _Util2.default.getMaxLength(pps.blocks);

    _this3.isAndroid = _Util2.default.isAndroid();

    _this3.initPhoneFormatter();
    _this3.initDateFormatter();
    _this3.initTimeFormatter();
    _this3.initNumeralFormatter();

    // avoid touch input field if value is null
    // otherwise Firefox will add red box-shadow for <input required />
    if (pps.initValue || pps.prefix && !pps.noImmediatePrefix) {
      _this3.onInput(pps.initValue);
    }

    _this3.registeredEvents.onInit(_this3);
  };

  this.initNumeralFormatter = function () {
    var pps = _this3.properties;

    if (!pps.numeral) {
      return;
    }

    pps.numeralFormatter = new _NumeralFormatter2.default(pps.numeralDecimalMark, pps.numeralIntegerScale, pps.numeralDecimalScale, pps.numeralThousandsGroupStyle, pps.numeralPositiveOnly, pps.stripLeadingZeroes, pps.prefix, pps.signBeforePrefix, pps.delimiter);
  };

  this.initTimeFormatter = function () {
    var pps = _this3.properties;

    if (!pps.time) {
      return;
    }

    pps.timeFormatter = new _TimeFormatter2.default(pps.timePattern, pps.timeFormat);
    pps.blocks = pps.timeFormatter.getBlocks();
    pps.blocksLength = pps.blocks.length;
    pps.maxLength = _Util2.default.getMaxLength(pps.blocks);
  };

  this.initDateFormatter = function () {
    var pps = _this3.properties;

    if (!pps.date) {
      return;
    }

    pps.dateFormatter = new _DateFormatter2.default(pps.datePattern, pps.dateMin, pps.dateMax);
    pps.blocks = pps.dateFormatter.getBlocks();
    pps.blocksLength = pps.blocks.length;
    pps.maxLength = _Util2.default.getMaxLength(pps.blocks);
  };

  this.initPhoneFormatter = function () {
    var pps = _this3.properties;
    if (!pps.phone) {
      return;
    }

    // Cleave.AsYouTypeFormatter should be provided by
    // external google closure lib
    try {
      pps.phoneFormatter = new _PhoneFormatter2.default(new pps.root.Cleave.AsYouTypeFormatter(pps.phoneRegionCode), pps.delimiter);
    } catch (ex) {
      throw new Error('Please include phone-type-formatter.{country}.js lib');
    }
  };

  this.setRawValue = function (value) {
    var owner = _this3;
    var pps = owner.properties;

    value = value !== undefined && value !== null ? value.toString() : '';

    if (pps.numeral) {
      value = value.replace('.', pps.numeralDecimalMark);
    }

    pps.postDelimiterBackspace = false;

    owner.onChange({
      target: { value: value },

      // Methods to better resemble a SyntheticEvent
      stopPropagation: _Util2.default.noop,
      preventDefault: _Util2.default.noop,
      persist: _Util2.default.noop
    });
  };

  this.getRawValue = function () {
    var pps = _this3.properties;
    var rawValue = pps.result;

    if (pps.rawValueTrimPrefix) {
      rawValue = _Util2.default.getPrefixStrippedValue(rawValue, pps.prefix, pps.prefixLength, pps.result, pps.delimiter, pps.delimiters);
    }

    if (pps.numeral) {
      rawValue = pps.numeralFormatter ? pps.numeralFormatter.getRawValue(rawValue) : '';
    } else {
      rawValue = _Util2.default.stripDelimiters(rawValue, pps.delimiter, pps.delimiters);
    }

    return rawValue;
  };

  this.getISOFormatDate = function () {
    var pps = _this3.properties;

    return pps.date ? pps.dateFormatter.getISOFormatDate() : '';
  };

  this.getISOFormatTime = function () {
    var pps = _this3.properties;

    return pps.time ? pps.timeFormatter.getISOFormatTime() : '';
  };

  this.onInit = function (owner) {
    return owner;
  };

  this.onKeyDown = function (event) {
    var pps = _this3.properties;
    var charCode = event.which || event.keyCode;

    // if we got any charCode === 8, this means, that this device correctly
    // sends backspace keys in event, so we do not need to apply any hacks
    _this3.hasBackspaceSupport = _this3.hasBackspaceSupport || charCode === 8;
    if (!_this3.hasBackspaceSupport && _Util2.default.isAndroidBackspaceKeydown(_this3.lastInputValue, pps.result)) {
      charCode = 8;
    }

    // hit backspace when last character is delimiter
    var postDelimiter = _Util2.default.getPostDelimiter(pps.result, pps.delimiter, pps.delimiters);
    if (charCode === 8 && postDelimiter) {
      pps.postDelimiterBackspace = postDelimiter;
    } else {
      pps.postDelimiterBackspace = false;
    }

    _this3.registeredEvents.onKeyDown(event);
  };

  this.onFocus = function (event) {
    var pps = _this3.properties;

    event.target.rawValue = _this3.getRawValue();
    event.target.value = pps.result;

    _this3.registeredEvents.onFocus(event);

    _Util2.default.fixPrefixCursor(_this3.element, pps.prefix, pps.delimiter, pps.delimiters);
  };

  this.onBlur = function (event) {
    var pps = _this3.properties;

    event.target.rawValue = _this3.getRawValue();
    event.target.value = pps.result;

    _this3.registeredEvents.onBlur(event);
  };

  this.onChange = function (event) {
    var pps = _this3.properties;

    _this3.onInput(event.target.value);

    event.target.rawValue = _this3.getRawValue();
    event.target.value = pps.result;

    _this3.registeredEvents.onChange(event);
  };

  this.onInput = function (value, fromProps, bypassSetState) {
    var pps = _this3.properties;
    var disabled = _this3.props.disabled;

    // case 1: delete one more character "4"
    // 1234*| -> hit backspace -> 123|
    // case 2: last character is not delimiter which is:
    // 12|34* -> hit backspace -> 1|34*

    var postDelimiterAfter = _Util2.default.getPostDelimiter(value, pps.delimiter, pps.delimiters);
    if (!fromProps && !pps.numeral && pps.postDelimiterBackspace && !postDelimiterAfter) {
      value = _Util2.default.headStr(value, value.length - pps.postDelimiterBackspace.length);
    }

    // phone formatter
    if (pps.phone) {
      if (pps.prefix && (!pps.noImmediatePrefix || value.length)) {
        pps.result = pps.prefix + pps.phoneFormatter.format(value).slice(pps.prefix.length);
      } else if (disabled) {
        pps.result = value;
      } else {
        pps.result = pps.phoneFormatter.format(value);
      }
      return _this3.updateValueState(bypassSetState && !disabled);
    }

    // numeral formatter
    if (pps.numeral) {
      // Do not show prefix when noImmediatePrefix is specified
      // This mostly because we need to show user the native input placeholder
      if (pps.prefix && pps.noImmediatePrefix && value.length === 0) {
        pps.result = '';
      } else {
        pps.result = pps.numeralFormatter.format(value);
      }
      return _this3.updateValueState(bypassSetState);
    }

    // date
    if (pps.date) {
      value = pps.dateFormatter.getValidatedDate(value);
    }

    // time
    if (pps.time) {
      value = pps.timeFormatter.getValidatedTime(value);
    }

    // strip delimiters
    value = _Util2.default.stripDelimiters(value, pps.delimiter, pps.delimiters);

    // strip prefix
    value = _Util2.default.getPrefixStrippedValue(value, pps.prefix, pps.prefixLength, pps.result, pps.delimiter, pps.delimiters, pps.noImmediatePrefix);

    // strip non-numeric characters
    value = pps.numericOnly ? _Util2.default.strip(value, /[^\d]/g) : value;

    // convert case
    value = pps.uppercase ? value.toUpperCase() : value;
    value = pps.lowercase ? value.toLowerCase() : value;

    // prevent from showing prefix when no immediate option enabled with empty input value
    if (pps.prefix && (!pps.noImmediatePrefix || value.length)) {
      value = pps.prefix + value;

      // no blocks specified, no need to do formatting
      if (pps.blocksLength === 0) {
        pps.result = value;
        return _this3.updateValueState(bypassSetState);
      }
    }

    // update credit card props
    if (pps.creditCard) {
      _this3.updateCreditCardPropsByValue(value);
    }

    // strip over length characters
    value = pps.maxLength > 0 ? _Util2.default.headStr(value, pps.maxLength) : value;

    // apply blocks
    pps.result = _Util2.default.getFormattedValue(value, pps.blocks, pps.blocksLength, pps.delimiter, pps.delimiters, pps.delimiterLazyShow);

    return _this3.updateValueState(bypassSetState);
  };

  this.updateCreditCardPropsByValue = function (value) {
    var pps = _this3.properties;
    var creditCardInfo = void 0;

    // At least one of the first 4 characters has changed
    if (_Util2.default.headStr(pps.result, 4) === _Util2.default.headStr(value, 4)) {
      return;
    }

    creditCardInfo = _CreditCardDetector2.default.getInfo(value, pps.creditCardStrictMode);

    pps.blocks = creditCardInfo.blocks;
    pps.blocksLength = pps.blocks.length;
    pps.maxLength = _Util2.default.getMaxLength(pps.blocks);

    // credit card type changed
    if (pps.creditCardType !== creditCardInfo.type) {
      pps.creditCardType = creditCardInfo.type;

      pps.onCreditCardTypeChanged.call(_this3, pps.creditCardType);
    }
  };

  this.updateValueState = function (bypassSetState) {
    var pps = _this3.properties;

    if (!_this3.element) {
      if (bypassSetState) {
        return { value: pps.result };
      } else {
        _this3.setState({ value: pps.result });
      }
      return;
    }

    var endPos = _this3.element.selectionEnd;
    var oldValue = _this3.element.value;
    var newValue = pps.result;

    _this3.lastInputValue = newValue;

    endPos = _Util2.default.getNextCursorPosition(endPos, oldValue, newValue, pps.delimiter, pps.delimiters);

    if (_this3.isAndroid) {
      window.setTimeout(function () {
        !bypassSetState && _this3.setState({ value: newValue, cursorPosition: endPos });
      }, 1);

      return;
    }

    if (bypassSetState) {
      return { value: newValue, cursorPosition: endPos };
    } else {
      _this3.setState({ value: newValue, cursorPosition: endPos });
    }
  };
};

exports.default = Cleave;