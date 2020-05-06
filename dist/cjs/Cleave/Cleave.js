"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs3/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/objectWithoutProperties"));

var _slice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/slice"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _NumeralFormatter = _interopRequireDefault(require("cleave.js/src/shortcuts/NumeralFormatter"));

var _DateFormatter = _interopRequireDefault(require("cleave.js/src/shortcuts/DateFormatter"));

var _TimeFormatter = _interopRequireDefault(require("cleave.js/src/shortcuts/TimeFormatter"));

var _PhoneFormatter = _interopRequireDefault(require("cleave.js/src/shortcuts/PhoneFormatter"));

var _CreditCardDetector = _interopRequireDefault(require("cleave.js/src/shortcuts/CreditCardDetector"));

var _Util = _interopRequireDefault(require("cleave.js/src/utils/Util"));

var _DefaultProperties = _interopRequireDefault(require("cleave.js/src/common/DefaultProperties"));

// /* eslint-disable */
// This is a temporary internal fork of cleave.js to remove deprecated react life cycles until cleave.js can be updated - JRA 11/21/2019
var Cleave =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Cleave, _Component);

  function Cleave(_props) {
    var _this;

    (0, _classCallCheck2.default)(this, Cleave);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Cleave).call(this, _props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "updateRegisteredEvents", function (props) {
      var _this$registeredEvent = _this.registeredEvents,
          onKeyDown = _this$registeredEvent.onKeyDown,
          onChange = _this$registeredEvent.onChange,
          onFocus = _this$registeredEvent.onFocus,
          onBlur = _this$registeredEvent.onBlur,
          onInit = _this$registeredEvent.onInit;
      if (props.onInit && props.onInit !== onInit) _this.registeredEvents.onInit = props.onInit;
      if (props.onChange && props.onChange !== onChange) _this.registeredEvents.onChange = props.onChange;
      if (props.onFocus && props.onFocus !== onFocus) _this.registeredEvents.onFocus = props.onFocus;
      if (props.onBlur && props.onBlur !== onBlur) _this.registeredEvents.onBlur = props.onBlur;
      if (props.onKeyDown && props.onKeyDown !== onKeyDown) _this.registeredEvents.onKeyDown = props.onKeyDown;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "init", function () {
      var pps = _this.properties; // so no need for this lib at all

      if (!pps.numeral && !pps.phone && !pps.creditCard && !pps.time && !pps.date && pps.blocksLength === 0 && !pps.prefix) {
        _this.onInput(pps.initValue);

        _this.registeredEvents.onInit((0, _assertThisInitialized2.default)(_this));

        return;
      }

      pps.maxLength = _Util.default.getMaxLength(pps.blocks);
      _this.isAndroid = _Util.default.isAndroid();

      _this.initPhoneFormatter();

      _this.initDateFormatter();

      _this.initTimeFormatter();

      _this.initNumeralFormatter(); // avoid touch input field if value is null
      // otherwise Firefox will add red box-shadow for <input required />


      if (pps.initValue || pps.prefix && !pps.noImmediatePrefix) {
        _this.onInput(pps.initValue);
      }

      _this.registeredEvents.onInit((0, _assertThisInitialized2.default)(_this));
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "initNumeralFormatter", function () {
      var pps = _this.properties;

      if (!pps.numeral) {
        return;
      }

      pps.numeralFormatter = new _NumeralFormatter.default(pps.numeralDecimalMark, pps.numeralIntegerScale, pps.numeralDecimalScale, pps.numeralThousandsGroupStyle, pps.numeralPositiveOnly, pps.stripLeadingZeroes, pps.prefix, pps.signBeforePrefix, pps.delimiter);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "initTimeFormatter", function () {
      var pps = _this.properties;

      if (!pps.time) {
        return;
      }

      pps.timeFormatter = new _TimeFormatter.default(pps.timePattern, pps.timeFormat);
      pps.blocks = pps.timeFormatter.getBlocks();
      pps.blocksLength = pps.blocks.length;
      pps.maxLength = _Util.default.getMaxLength(pps.blocks);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "initDateFormatter", function () {
      var pps = _this.properties;

      if (!pps.date) {
        return;
      }

      pps.dateFormatter = new _DateFormatter.default(pps.datePattern, pps.dateMin, pps.dateMax);
      pps.blocks = pps.dateFormatter.getBlocks();
      pps.blocksLength = pps.blocks.length;
      pps.maxLength = _Util.default.getMaxLength(pps.blocks);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "initPhoneFormatter", function () {
      var pps = _this.properties;

      if (!pps.phone) {
        return;
      } // Cleave.AsYouTypeFormatter should be provided by
      // external google closure lib


      try {
        pps.phoneFormatter = new _PhoneFormatter.default(new pps.root.Cleave.AsYouTypeFormatter(pps.phoneRegionCode), pps.delimiter);
      } catch (ex) {
        throw new Error('Please include phone-type-formatter.{country}.js lib');
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "setRawValue", function (value) {
      var owner = (0, _assertThisInitialized2.default)(_this);
      var pps = owner.properties;
      value = value !== undefined && value !== null ? value.toString() : '';

      if (pps.numeral) {
        value = value.replace('.', pps.numeralDecimalMark);
      }

      pps.postDelimiterBackspace = false;
      owner.onChange({
        target: {
          value: value
        },
        // Methods to better resemble a SyntheticEvent
        stopPropagation: _Util.default.noop,
        preventDefault: _Util.default.noop,
        persist: _Util.default.noop
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "getRawValue", function () {
      var pps = _this.properties;
      var rawValue = pps.result;

      if (pps.rawValueTrimPrefix) {
        rawValue = _Util.default.getPrefixStrippedValue(rawValue, pps.prefix, pps.prefixLength, pps.result, pps.delimiter, pps.delimiters);
      }

      if (pps.numeral) {
        rawValue = pps.numeralFormatter ? pps.numeralFormatter.getRawValue(rawValue) : '';
      } else {
        rawValue = _Util.default.stripDelimiters(rawValue, pps.delimiter, pps.delimiters);
      }

      return rawValue;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "getISOFormatDate", function () {
      var pps = _this.properties;
      return pps.date ? pps.dateFormatter.getISOFormatDate() : '';
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "getISOFormatTime", function () {
      var pps = _this.properties;
      return pps.time ? pps.timeFormatter.getISOFormatTime() : '';
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onInit", function (owner) {
      return owner;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onKeyDown", function (event) {
      var pps = _this.properties;
      var charCode = event.which || event.keyCode; // if we got any charCode === 8, this means, that this device correctly
      // sends backspace keys in event, so we do not need to apply any hacks

      _this.hasBackspaceSupport = _this.hasBackspaceSupport || charCode === 8;

      if (!_this.hasBackspaceSupport && _Util.default.isAndroidBackspaceKeydown(_this.lastInputValue, pps.result)) {
        charCode = 8;
      } // hit backspace when last character is delimiter


      var postDelimiter = _Util.default.getPostDelimiter(pps.result, pps.delimiter, pps.delimiters);

      if (charCode === 8 && postDelimiter) {
        pps.postDelimiterBackspace = postDelimiter;
      } else {
        pps.postDelimiterBackspace = false;
      }

      _this.registeredEvents.onKeyDown(event);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onFocus", function (event) {
      var pps = _this.properties;
      event.target.rawValue = _this.getRawValue();
      event.target.value = pps.result;

      _this.registeredEvents.onFocus(event);

      _Util.default.fixPrefixCursor(_this.element, pps.prefix, pps.delimiter, pps.delimiters);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onBlur", function (event) {
      var pps = _this.properties;
      event.target.rawValue = _this.getRawValue();
      event.target.value = pps.result;

      _this.registeredEvents.onBlur(event);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onChange", function (event) {
      var pps = _this.properties;

      _this.onInput(event.target.value);

      event.target.rawValue = _this.getRawValue();
      event.target.value = pps.result;

      _this.registeredEvents.onChange(event);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onInput", function (value, fromProps, bypassSetState) {
      var pps = _this.properties;
      var disabled = _this.props.disabled; // case 1: delete one more character "4"
      // 1234*| -> hit backspace -> 123|
      // case 2: last character is not delimiter which is:
      // 12|34* -> hit backspace -> 1|34*

      var postDelimiterAfter = _Util.default.getPostDelimiter(value, pps.delimiter, pps.delimiters);

      if (!fromProps && !pps.numeral && pps.postDelimiterBackspace && !postDelimiterAfter) {
        value = _Util.default.headStr(value, value.length - pps.postDelimiterBackspace.length);
      } // phone formatter


      if (pps.phone) {
        if (pps.prefix && (!pps.noImmediatePrefix || value.length)) {
          var _context;

          pps.result = pps.prefix + (0, _slice.default)(_context = pps.phoneFormatter.format(value)).call(_context, pps.prefix.length);
        } else if (disabled && !pps.phoneFormatter.format(value)) {
          pps.result = value;
          return _this.updateValueState(false);
        } else {
          pps.result = pps.phoneFormatter.format(value);
        }

        return _this.updateValueState(bypassSetState);
      } // numeral formatter


      if (pps.numeral) {
        // Do not show prefix when noImmediatePrefix is specified
        // This mostly because we need to show user the native input placeholder
        if (pps.prefix && pps.noImmediatePrefix && value.length === 0) {
          pps.result = '';
        } else {
          pps.result = pps.numeralFormatter.format(value);
        }

        return _this.updateValueState(bypassSetState);
      } // date


      if (pps.date) {
        value = pps.dateFormatter.getValidatedDate(value);
      } // time


      if (pps.time) {
        value = pps.timeFormatter.getValidatedTime(value);
      } // strip delimiters


      value = _Util.default.stripDelimiters(value, pps.delimiter, pps.delimiters); // strip prefix

      value = _Util.default.getPrefixStrippedValue(value, pps.prefix, pps.prefixLength, pps.result, pps.delimiter, pps.delimiters, pps.noImmediatePrefix); // strip non-numeric characters

      value = pps.numericOnly ? _Util.default.strip(value, /[^\d]/g) : value; // convert case

      value = pps.uppercase ? value.toUpperCase() : value;
      value = pps.lowercase ? value.toLowerCase() : value; // prevent from showing prefix when no immediate option enabled with empty input value

      if (pps.prefix && (!pps.noImmediatePrefix || value.length)) {
        value = pps.prefix + value; // no blocks specified, no need to do formatting

        if (pps.blocksLength === 0) {
          pps.result = value;
          return _this.updateValueState(bypassSetState);
        }
      } // update credit card props


      if (pps.creditCard) {
        _this.updateCreditCardPropsByValue(value);
      } // strip over length characters


      value = pps.maxLength > 0 ? _Util.default.headStr(value, pps.maxLength) : value; // apply blocks

      pps.result = _Util.default.getFormattedValue(value, pps.blocks, pps.blocksLength, pps.delimiter, pps.delimiters, pps.delimiterLazyShow);
      return _this.updateValueState(bypassSetState);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "updateCreditCardPropsByValue", function (value) {
      var pps = _this.properties;
      var creditCardInfo; // At least one of the first 4 characters has changed

      if (_Util.default.headStr(pps.result, 4) === _Util.default.headStr(value, 4)) {
        return;
      }

      creditCardInfo = _CreditCardDetector.default.getInfo(value, pps.creditCardStrictMode);
      pps.blocks = creditCardInfo.blocks;
      pps.blocksLength = pps.blocks.length;
      pps.maxLength = _Util.default.getMaxLength(pps.blocks); // credit card type changed

      if (pps.creditCardType !== creditCardInfo.type) {
        pps.creditCardType = creditCardInfo.type;
        pps.onCreditCardTypeChanged.call((0, _assertThisInitialized2.default)(_this), pps.creditCardType);
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "updateValueState", function (bypassSetState) {
      var pps = _this.properties;

      if (!_this.element) {
        if (bypassSetState) {
          return {
            value: pps.result
          };
        } else {
          _this.setState({
            value: pps.result
          });
        }

        return;
      }

      var endPos = _this.element.selectionEnd;
      var oldValue = _this.element.value;
      var newValue = pps.result;
      _this.lastInputValue = newValue;
      endPos = _Util.default.getNextCursorPosition(endPos, oldValue, newValue, pps.delimiter, pps.delimiters);

      if (_this.isAndroid) {
        window.setTimeout(function () {
          !bypassSetState && _this.setState({
            value: newValue,
            cursorPosition: endPos
          });
        }, 1);
        return;
      }

      if (bypassSetState) {
        return {
          value: newValue,
          cursorPosition: endPos
        };
      } else {
        _this.setState({
          value: newValue,
          cursorPosition: endPos
        });
      }
    });
    var _value = _props.value,
        options = _props.options,
        _onKeyDown = _props.onKeyDown,
        _onChange = _props.onChange,
        _onFocus = _props.onFocus,
        _onBlur = _props.onBlur,
        _onInit = _props.onInit;
    _this.registeredEvents = {
      onInit: _onInit || _Util.default.noop,
      onChange: _onChange || _Util.default.noop,
      onFocus: _onFocus || _Util.default.noop,
      onBlur: _onBlur || _Util.default.noop,
      onKeyDown: _onKeyDown || _Util.default.noop
    };

    if (!options) {
      options = {};
    }

    options.initValue = _value;
    _this.properties = _DefaultProperties.default.assign({}, options);
    _this.state = {
      value: _this.properties.result,
      cursorPosition: 0
    };
    return _this;
  }

  (0, _createClass2.default)(Cleave, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.init();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(props) {
      var pps = this.properties;

      _Util.default.setSelection(this.element, this.state.cursorPosition, pps.document);

      this.updateRegisteredEvents(this.props);
      var newValue = this.props.value;

      if (newValue !== undefined) {
        newValue = newValue.toString();

        if (newValue !== this.properties.initValue) {
          this.properties.initValue = newValue;
          this.onInput(newValue, true);
        }
      } // update phone region code - // not supporting changing region after mount for now, this will almost certainly blow up in an in - JRA 11/21/2019
      // if (phoneRegionCode && phoneRegionCode !== this.properties.phoneRegionCode) {
      //   this.properties.phoneRegionCode = phoneRegionCode
      //   this.initPhoneFormatter()
      //   this.onInput(this.properties.result)
      // }

    }
  }, {
    key: "render",
    value: function render() {
      var _arguments = arguments,
          _this2 = this;

      var _this$props = this.props,
          value = _this$props.value,
          options = _this$props.options,
          onKeyDown = _this$props.onKeyDown,
          onFocus = _this$props.onFocus,
          onBlur = _this$props.onBlur,
          onChange = _this$props.onChange,
          onInit = _this$props.onInit,
          htmlRef = _this$props.htmlRef,
          propsToTransfer = (0, _objectWithoutProperties2.default)(_this$props, ["value", "options", "onKeyDown", "onFocus", "onBlur", "onChange", "onInit", "htmlRef"]);
      return _react.default.createElement("input", (0, _extends2.default)({
        type: "text",
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

exports.default = Cleave;
(0, _defineProperty2.default)(Cleave, "propTypes", {
  options: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number, _propTypes.default.array, _propTypes.default.object, _propTypes.default.bool]),
  onKeyDown: _propTypes.default.func,
  onChange: _propTypes.default.func,
  onFocus: _propTypes.default.func,
  onBlur: _propTypes.default.func,
  onInit: _propTypes.default.func,
  htmlRef: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func, _propTypes.default.object]),
  disabled: _propTypes.default.bool
});