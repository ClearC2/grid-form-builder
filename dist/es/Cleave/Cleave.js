import _extends from "@babel/runtime-corejs3/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime-corejs3/helpers/esm/objectWithoutProperties";
import _sliceInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/slice";
import _classCallCheck from "@babel/runtime-corejs3/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime-corejs3/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs3/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime-corejs3/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime-corejs3/helpers/esm/inherits";
import _defineProperty from "@babel/runtime-corejs3/helpers/esm/defineProperty";
// /* eslint-disable */
// This is a temporary internal fork of cleave.js to remove deprecated react life cycles until cleave.js can be updated - JRA 11/21/2019
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import NumeralFormatter from 'cleave.js/src/shortcuts/NumeralFormatter';
import DateFormatter from 'cleave.js/src/shortcuts/DateFormatter';
import TimeFormatter from 'cleave.js/src/shortcuts/TimeFormatter';
import PhoneFormatter from 'cleave.js/src/shortcuts/PhoneFormatter';
import CreditCardDetector from 'cleave.js/src/shortcuts/CreditCardDetector';
import Util from 'cleave.js/src/utils/Util';
import DefaultProperties from 'cleave.js/src/common/DefaultProperties';

var Cleave =
/*#__PURE__*/
function (_Component) {
  _inherits(Cleave, _Component);

  function Cleave(_props) {
    var _this;

    _classCallCheck(this, Cleave);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Cleave).call(this, _props));

    _defineProperty(_assertThisInitialized(_this), "updateRegisteredEvents", function (props) {
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

    _defineProperty(_assertThisInitialized(_this), "init", function () {
      var pps = _this.properties; // so no need for this lib at all

      if (!pps.numeral && !pps.phone && !pps.creditCard && !pps.time && !pps.date && pps.blocksLength === 0 && !pps.prefix) {
        _this.onInput(pps.initValue);

        _this.registeredEvents.onInit(_assertThisInitialized(_this));

        return;
      }

      pps.maxLength = Util.getMaxLength(pps.blocks);
      _this.isAndroid = Util.isAndroid();

      _this.initPhoneFormatter();

      _this.initDateFormatter();

      _this.initTimeFormatter();

      _this.initNumeralFormatter(); // avoid touch input field if value is null
      // otherwise Firefox will add red box-shadow for <input required />


      if (pps.initValue || pps.prefix && !pps.noImmediatePrefix) {
        _this.onInput(pps.initValue);
      }

      _this.registeredEvents.onInit(_assertThisInitialized(_this));
    });

    _defineProperty(_assertThisInitialized(_this), "initNumeralFormatter", function () {
      var pps = _this.properties;

      if (!pps.numeral) {
        return;
      }

      pps.numeralFormatter = new NumeralFormatter(pps.numeralDecimalMark, pps.numeralIntegerScale, pps.numeralDecimalScale, pps.numeralThousandsGroupStyle, pps.numeralPositiveOnly, pps.stripLeadingZeroes, pps.prefix, pps.signBeforePrefix, pps.delimiter);
    });

    _defineProperty(_assertThisInitialized(_this), "initTimeFormatter", function () {
      var pps = _this.properties;

      if (!pps.time) {
        return;
      }

      pps.timeFormatter = new TimeFormatter(pps.timePattern, pps.timeFormat);
      pps.blocks = pps.timeFormatter.getBlocks();
      pps.blocksLength = pps.blocks.length;
      pps.maxLength = Util.getMaxLength(pps.blocks);
    });

    _defineProperty(_assertThisInitialized(_this), "initDateFormatter", function () {
      var pps = _this.properties;

      if (!pps.date) {
        return;
      }

      pps.dateFormatter = new DateFormatter(pps.datePattern, pps.dateMin, pps.dateMax);
      pps.blocks = pps.dateFormatter.getBlocks();
      pps.blocksLength = pps.blocks.length;
      pps.maxLength = Util.getMaxLength(pps.blocks);
    });

    _defineProperty(_assertThisInitialized(_this), "initPhoneFormatter", function () {
      var pps = _this.properties;

      if (!pps.phone) {
        return;
      } // Cleave.AsYouTypeFormatter should be provided by
      // external google closure lib


      try {
        pps.phoneFormatter = new PhoneFormatter(new pps.root.Cleave.AsYouTypeFormatter(pps.phoneRegionCode), pps.delimiter);
      } catch (ex) {
        throw new Error('Please include phone-type-formatter.{country}.js lib');
      }
    });

    _defineProperty(_assertThisInitialized(_this), "setRawValue", function (value) {
      var owner = _assertThisInitialized(_this);

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
        stopPropagation: Util.noop,
        preventDefault: Util.noop,
        persist: Util.noop
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getRawValue", function () {
      var pps = _this.properties;
      var rawValue = pps.result;

      if (pps.rawValueTrimPrefix) {
        rawValue = Util.getPrefixStrippedValue(rawValue, pps.prefix, pps.prefixLength, pps.result, pps.delimiter, pps.delimiters);
      }

      if (pps.numeral) {
        rawValue = pps.numeralFormatter ? pps.numeralFormatter.getRawValue(rawValue) : '';
      } else {
        rawValue = Util.stripDelimiters(rawValue, pps.delimiter, pps.delimiters);
      }

      return rawValue;
    });

    _defineProperty(_assertThisInitialized(_this), "getISOFormatDate", function () {
      var pps = _this.properties;
      return pps.date ? pps.dateFormatter.getISOFormatDate() : '';
    });

    _defineProperty(_assertThisInitialized(_this), "getISOFormatTime", function () {
      var pps = _this.properties;
      return pps.time ? pps.timeFormatter.getISOFormatTime() : '';
    });

    _defineProperty(_assertThisInitialized(_this), "onInit", function (owner) {
      return owner;
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyDown", function (event) {
      var pps = _this.properties;
      var charCode = event.which || event.keyCode; // if we got any charCode === 8, this means, that this device correctly
      // sends backspace keys in event, so we do not need to apply any hacks

      _this.hasBackspaceSupport = _this.hasBackspaceSupport || charCode === 8;

      if (!_this.hasBackspaceSupport && Util.isAndroidBackspaceKeydown(_this.lastInputValue, pps.result)) {
        charCode = 8;
      } // hit backspace when last character is delimiter


      var postDelimiter = Util.getPostDelimiter(pps.result, pps.delimiter, pps.delimiters);

      if (charCode === 8 && postDelimiter) {
        pps.postDelimiterBackspace = postDelimiter;
      } else {
        pps.postDelimiterBackspace = false;
      }

      _this.registeredEvents.onKeyDown(event);
    });

    _defineProperty(_assertThisInitialized(_this), "onFocus", function (event) {
      var pps = _this.properties;
      event.target.rawValue = _this.getRawValue();
      event.target.value = pps.result;

      _this.registeredEvents.onFocus(event);

      Util.fixPrefixCursor(_this.element, pps.prefix, pps.delimiter, pps.delimiters);
    });

    _defineProperty(_assertThisInitialized(_this), "onBlur", function (event) {
      var pps = _this.properties;
      event.target.rawValue = _this.getRawValue();
      event.target.value = pps.result;

      _this.registeredEvents.onBlur(event);
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (event) {
      var pps = _this.properties;

      _this.onInput(event.target.value);

      event.target.rawValue = _this.getRawValue();
      event.target.value = pps.result;

      _this.registeredEvents.onChange(event);
    });

    _defineProperty(_assertThisInitialized(_this), "onInput", function (value, fromProps, bypassSetState) {
      var pps = _this.properties;
      var _this$props = _this.props,
          disabled = _this$props.disabled,
          readOnly = _this$props.readOnly; // case 1: delete one more character "4"
      // 1234*| -> hit backspace -> 123|
      // case 2: last character is not delimiter which is:
      // 12|34* -> hit backspace -> 1|34*

      var postDelimiterAfter = Util.getPostDelimiter(value, pps.delimiter, pps.delimiters);

      if (!fromProps && !pps.numeral && pps.postDelimiterBackspace && !postDelimiterAfter) {
        value = Util.headStr(value, value.length - pps.postDelimiterBackspace.length);
      } // phone formatter


      if (pps.phone) {
        if (pps.prefix && (!pps.noImmediatePrefix || value.length)) {
          var _context;

          pps.result = pps.prefix + _sliceInstanceProperty(_context = pps.phoneFormatter.format(value)).call(_context, pps.prefix.length);
        } else if ((disabled || readOnly) && !pps.phoneFormatter.format(value)) {
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
        } else if (readOnly) {
          pps.result = value;
          return _this.updateValueState(false);
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


      value = Util.stripDelimiters(value, pps.delimiter, pps.delimiters); // strip prefix

      value = Util.getPrefixStrippedValue(value, pps.prefix, pps.prefixLength, pps.result, pps.delimiter, pps.delimiters, pps.noImmediatePrefix); // strip non-numeric characters

      value = pps.numericOnly ? Util.strip(value, /[^\d]/g) : value; // convert case

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


      value = pps.maxLength > 0 ? Util.headStr(value, pps.maxLength) : value; // apply blocks

      pps.result = Util.getFormattedValue(value, pps.blocks, pps.blocksLength, pps.delimiter, pps.delimiters, pps.delimiterLazyShow);
      return _this.updateValueState(bypassSetState);
    });

    _defineProperty(_assertThisInitialized(_this), "updateCreditCardPropsByValue", function (value) {
      var pps = _this.properties;
      var creditCardInfo; // At least one of the first 4 characters has changed

      if (Util.headStr(pps.result, 4) === Util.headStr(value, 4)) {
        return;
      }

      creditCardInfo = CreditCardDetector.getInfo(value, pps.creditCardStrictMode);
      pps.blocks = creditCardInfo.blocks;
      pps.blocksLength = pps.blocks.length;
      pps.maxLength = Util.getMaxLength(pps.blocks); // credit card type changed

      if (pps.creditCardType !== creditCardInfo.type) {
        pps.creditCardType = creditCardInfo.type;
        pps.onCreditCardTypeChanged.call(_assertThisInitialized(_this), pps.creditCardType);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "updateValueState", function (bypassSetState) {
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
      endPos = Util.getNextCursorPosition(endPos, oldValue, newValue, pps.delimiter, pps.delimiters);

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
      onInit: _onInit || Util.noop,
      onChange: _onChange || Util.noop,
      onFocus: _onFocus || Util.noop,
      onBlur: _onBlur || Util.noop,
      onKeyDown: _onKeyDown || Util.noop
    };

    if (!options) {
      options = {};
    }

    options.initValue = _value;
    _this.properties = DefaultProperties.assign({}, options);
    _this.state = {
      value: _this.properties.result,
      cursorPosition: 0
    };
    return _this;
  }

  _createClass(Cleave, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.init();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(props) {
      var pps = this.properties;
      Util.setSelection(this.element, this.state.cursorPosition, pps.document);
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

      var _this$props2 = this.props,
          value = _this$props2.value,
          options = _this$props2.options,
          onKeyDown = _this$props2.onKeyDown,
          onFocus = _this$props2.onFocus,
          onBlur = _this$props2.onBlur,
          onChange = _this$props2.onChange,
          onInit = _this$props2.onInit,
          htmlRef = _this$props2.htmlRef,
          propsToTransfer = _objectWithoutProperties(_this$props2, ["value", "options", "onKeyDown", "onFocus", "onBlur", "onChange", "onInit", "htmlRef"]);

      return React.createElement("input", _extends({
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
}(Component);

_defineProperty(Cleave, "propTypes", {
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object, PropTypes.bool]),
  onKeyDown: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onInit: PropTypes.func,
  htmlRef: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool
});

export { Cleave as default };