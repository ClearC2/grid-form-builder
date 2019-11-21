/* eslint-disable */

// This is a temporary internal fork of cleave.js to remove deprecated react life cycles until cleave.js can be updated - JRA 11/21/2019

'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var CreateReactClass = require('create-react-class');

var NumeralFormatter = require('./shortcuts/NumeralFormatter');
var DateFormatter = require('./shortcuts/DateFormatter');
var TimeFormatter = require('./shortcuts/TimeFormatter');
var PhoneFormatter = require('./shortcuts/PhoneFormatter');
var CreditCardDetector = require('./shortcuts/CreditCardDetector');
var Util = require('./utils/Util');
var DefaultProperties = require('./common/DefaultProperties');

var cleaveReactClass = CreateReactClass({
  componentDidMount: function componentDidMount() {
    this.init();
  },

  componentDidUpdate: function componentDidUpdate() {
    var owner = this,
        pps = owner.properties;

    Util.setSelection(owner.element, owner.state.cursorPosition, pps.document);
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var owner = this,
        phoneRegionCode = (nextProps.options || {}).phoneRegionCode,
        newValue = nextProps.value;

    // update registed events
    owner.updateRegisteredEvents(nextProps);

    if (newValue !== undefined) {
      newValue = newValue.toString();

      if (newValue !== owner.properties.result) {
        owner.properties.initValue = newValue;
        owner.onInput(newValue, true);
      }
    }

    // update phone region code
    if (phoneRegionCode && phoneRegionCode !== owner.properties.phoneRegionCode) {
      owner.properties.phoneRegionCode = phoneRegionCode;
      owner.initPhoneFormatter();
      owner.onInput(owner.properties.result);
    }
  },

  updateRegisteredEvents: function updateRegisteredEvents(props) {
    var owner = this,
        _owner$registeredEven = owner.registeredEvents,
        onKeyDown = _owner$registeredEven.onKeyDown,
        onChange = _owner$registeredEven.onChange,
        onFocus = _owner$registeredEven.onFocus,
        onBlur = _owner$registeredEven.onBlur,
        onInit = _owner$registeredEven.onInit;


    if (props.onInit && props.onInit !== onInit) owner.registeredEvents.onInit = props.onInit;
    if (props.onChange && props.onChange !== onChange) owner.registeredEvents.onChange = props.onChange;
    if (props.onFocus && props.onFocus !== onFocus) owner.registeredEvents.onFocus = props.onFocus;
    if (props.onBlur && props.onBlur !== onBlur) owner.registeredEvents.onBlur = props.onBlur;
    if (props.onKeyDown && props.onKeyDown !== onKeyDown) owner.registeredEvents.onKeyDown = props.onKeyDown;
  },

  getInitialState: function getInitialState() {
    var owner = this,
        _owner$props = owner.props,
        value = _owner$props.value,
        options = _owner$props.options,
        onKeyDown = _owner$props.onKeyDown,
        onChange = _owner$props.onChange,
        onFocus = _owner$props.onFocus,
        onBlur = _owner$props.onBlur,
        onInit = _owner$props.onInit;


    owner.registeredEvents = {
      onInit: onInit || Util.noop,
      onChange: onChange || Util.noop,
      onFocus: onFocus || Util.noop,
      onBlur: onBlur || Util.noop,
      onKeyDown: onKeyDown || Util.noop
    };

    if (!options) {
      options = {};
    }

    options.initValue = value;

    owner.properties = DefaultProperties.assign({}, options);

    return {
      value: owner.properties.result,
      cursorPosition: 0
    };
  },

  init: function init() {
    var owner = this,
        pps = owner.properties;

    // so no need for this lib at all
    if (!pps.numeral && !pps.phone && !pps.creditCard && !pps.time && !pps.date && pps.blocksLength === 0 && !pps.prefix) {
      owner.onInput(pps.initValue);
      owner.registeredEvents.onInit(owner);

      return;
    }

    pps.maxLength = Util.getMaxLength(pps.blocks);

    owner.isAndroid = Util.isAndroid();

    owner.initPhoneFormatter();
    owner.initDateFormatter();
    owner.initTimeFormatter();
    owner.initNumeralFormatter();

    // avoid touch input field if value is null
    // otherwise Firefox will add red box-shadow for <input required />
    if (pps.initValue || pps.prefix && !pps.noImmediatePrefix) {
      owner.onInput(pps.initValue);
    }

    owner.registeredEvents.onInit(owner);
  },

  initNumeralFormatter: function initNumeralFormatter() {
    var owner = this,
        pps = owner.properties;

    if (!pps.numeral) {
      return;
    }

    pps.numeralFormatter = new NumeralFormatter(pps.numeralDecimalMark, pps.numeralIntegerScale, pps.numeralDecimalScale, pps.numeralThousandsGroupStyle, pps.numeralPositiveOnly, pps.stripLeadingZeroes, pps.prefix, pps.signBeforePrefix, pps.delimiter);
  },

  initTimeFormatter: function initTimeFormatter() {
    var owner = this,
        pps = owner.properties;

    if (!pps.time) {
      return;
    }

    pps.timeFormatter = new TimeFormatter(pps.timePattern, pps.timeFormat);
    pps.blocks = pps.timeFormatter.getBlocks();
    pps.blocksLength = pps.blocks.length;
    pps.maxLength = Util.getMaxLength(pps.blocks);
  },

  initDateFormatter: function initDateFormatter() {
    var owner = this,
        pps = owner.properties;

    if (!pps.date) {
      return;
    }

    pps.dateFormatter = new DateFormatter(pps.datePattern, pps.dateMin, pps.dateMax);
    pps.blocks = pps.dateFormatter.getBlocks();
    pps.blocksLength = pps.blocks.length;
    pps.maxLength = Util.getMaxLength(pps.blocks);
  },

  initPhoneFormatter: function initPhoneFormatter() {
    var owner = this,
        pps = owner.properties;

    if (!pps.phone) {
      return;
    }

    // Cleave.AsYouTypeFormatter should be provided by
    // external google closure lib
    try {
      pps.phoneFormatter = new PhoneFormatter(new pps.root.Cleave.AsYouTypeFormatter(pps.phoneRegionCode), pps.delimiter);
    } catch (ex) {
      throw new Error('Please include phone-type-formatter.{country}.js lib');
    }
  },

  setRawValue: function setRawValue(value) {
    var owner = this,
        pps = owner.properties;

    value = value !== undefined && value !== null ? value.toString() : '';

    if (pps.numeral) {
      value = value.replace('.', pps.numeralDecimalMark);
    }

    pps.postDelimiterBackspace = false;

    owner.onChange({
      target: { value: value },

      // Methods to better resemble a SyntheticEvent
      stopPropagation: Util.noop,
      preventDefault: Util.noop,
      persist: Util.noop
    });
  },

  getRawValue: function getRawValue() {
    var owner = this,
        pps = owner.properties,
        rawValue = pps.result;

    if (pps.rawValueTrimPrefix) {
      rawValue = Util.getPrefixStrippedValue(rawValue, pps.prefix, pps.prefixLength, pps.result, pps.delimiter, pps.delimiters);
    }

    if (pps.numeral) {
      rawValue = pps.numeralFormatter ? pps.numeralFormatter.getRawValue(rawValue) : '';
    } else {
      rawValue = Util.stripDelimiters(rawValue, pps.delimiter, pps.delimiters);
    }

    return rawValue;
  },

  getISOFormatDate: function getISOFormatDate() {
    var owner = this,
        pps = owner.properties;

    return pps.date ? pps.dateFormatter.getISOFormatDate() : '';
  },

  getISOFormatTime: function getISOFormatTime() {
    var owner = this,
        pps = owner.properties;

    return pps.time ? pps.timeFormatter.getISOFormatTime() : '';
  },

  onInit: function onInit(owner) {
    return owner;
  },

  onKeyDown: function onKeyDown(event) {
    var owner = this,
        pps = owner.properties,
        charCode = event.which || event.keyCode;

    // if we got any charCode === 8, this means, that this device correctly
    // sends backspace keys in event, so we do not need to apply any hacks
    owner.hasBackspaceSupport = owner.hasBackspaceSupport || charCode === 8;
    if (!owner.hasBackspaceSupport && Util.isAndroidBackspaceKeydown(owner.lastInputValue, pps.result)) {
      charCode = 8;
    }

    // hit backspace when last character is delimiter
    var postDelimiter = Util.getPostDelimiter(pps.result, pps.delimiter, pps.delimiters);
    if (charCode === 8 && postDelimiter) {
      pps.postDelimiterBackspace = postDelimiter;
    } else {
      pps.postDelimiterBackspace = false;
    }

    owner.registeredEvents.onKeyDown(event);
  },

  onFocus: function onFocus(event) {
    var owner = this,
        pps = owner.properties;

    event.target.rawValue = owner.getRawValue();
    event.target.value = pps.result;

    owner.registeredEvents.onFocus(event);

    Util.fixPrefixCursor(owner.element, pps.prefix, pps.delimiter, pps.delimiters);
  },

  onBlur: function onBlur(event) {
    var owner = this,
        pps = owner.properties;

    event.target.rawValue = owner.getRawValue();
    event.target.value = pps.result;

    owner.registeredEvents.onBlur(event);
  },

  onChange: function onChange(event) {
    var owner = this,
        pps = owner.properties;

    owner.onInput(event.target.value);

    event.target.rawValue = owner.getRawValue();
    event.target.value = pps.result;

    owner.registeredEvents.onChange(event);
  },

  onInput: function onInput(value, fromProps) {
    var owner = this,
        pps = owner.properties;

    // case 1: delete one more character "4"
    // 1234*| -> hit backspace -> 123|
    // case 2: last character is not delimiter which is:
    // 12|34* -> hit backspace -> 1|34*
    var postDelimiterAfter = Util.getPostDelimiter(value, pps.delimiter, pps.delimiters);
    if (!fromProps && !pps.numeral && pps.postDelimiterBackspace && !postDelimiterAfter) {
      value = Util.headStr(value, value.length - pps.postDelimiterBackspace.length);
    }

    // phone formatter
    if (pps.phone) {
      if (pps.prefix && (!pps.noImmediatePrefix || value.length)) {
        pps.result = pps.prefix + pps.phoneFormatter.format(value).slice(pps.prefix.length);
      } else {
        pps.result = pps.phoneFormatter.format(value);
      }
      owner.updateValueState();

      return;
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
      owner.updateValueState();

      return;
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
    value = Util.stripDelimiters(value, pps.delimiter, pps.delimiters);

    // strip prefix
    value = Util.getPrefixStrippedValue(value, pps.prefix, pps.prefixLength, pps.result, pps.delimiter, pps.delimiters, pps.noImmediatePrefix);

    // strip non-numeric characters
    value = pps.numericOnly ? Util.strip(value, /[^\d]/g) : value;

    // convert case
    value = pps.uppercase ? value.toUpperCase() : value;
    value = pps.lowercase ? value.toLowerCase() : value;

    // prevent from showing prefix when no immediate option enabled with empty input value
    if (pps.prefix && (!pps.noImmediatePrefix || value.length)) {
      value = pps.prefix + value;

      // no blocks specified, no need to do formatting
      if (pps.blocksLength === 0) {
        pps.result = value;
        owner.updateValueState();

        return;
      }
    }

    // update credit card props
    if (pps.creditCard) {
      owner.updateCreditCardPropsByValue(value);
    }

    // strip over length characters
    value = pps.maxLength > 0 ? Util.headStr(value, pps.maxLength) : value;

    // apply blocks
    pps.result = Util.getFormattedValue(value, pps.blocks, pps.blocksLength, pps.delimiter, pps.delimiters, pps.delimiterLazyShow);

    owner.updateValueState();
  },

  updateCreditCardPropsByValue: function updateCreditCardPropsByValue(value) {
    var owner = this,
        pps = owner.properties,
        creditCardInfo;

    // At least one of the first 4 characters has changed
    if (Util.headStr(pps.result, 4) === Util.headStr(value, 4)) {
      return;
    }

    creditCardInfo = CreditCardDetector.getInfo(value, pps.creditCardStrictMode);

    pps.blocks = creditCardInfo.blocks;
    pps.blocksLength = pps.blocks.length;
    pps.maxLength = Util.getMaxLength(pps.blocks);

    // credit card type changed
    if (pps.creditCardType !== creditCardInfo.type) {
      pps.creditCardType = creditCardInfo.type;

      pps.onCreditCardTypeChanged.call(owner, pps.creditCardType);
    }
  },

  updateValueState: function updateValueState() {
    var owner = this,
        pps = owner.properties;

    if (!owner.element) {
      owner.setState({ value: pps.result });
      return;
    }

    var endPos = owner.element.selectionEnd;
    var oldValue = owner.element.value;
    var newValue = pps.result;

    owner.lastInputValue = newValue;

    endPos = Util.getNextCursorPosition(endPos, oldValue, newValue, pps.delimiter, pps.delimiters);

    if (owner.isAndroid) {
      window.setTimeout(function () {
        owner.setState({ value: newValue, cursorPosition: endPos });
      }, 1);

      return;
    }

    owner.setState({ value: newValue, cursorPosition: endPos });
  },

  render: function render() {
    var owner = this;
    // eslint-disable-next-line

    var _owner$props2 = owner.props,
        value = _owner$props2.value,
        options = _owner$props2.options,
        onKeyDown = _owner$props2.onKeyDown,
        onFocus = _owner$props2.onFocus,
        onBlur = _owner$props2.onBlur,
        onChange = _owner$props2.onChange,
        onInit = _owner$props2.onInit,
        htmlRef = _owner$props2.htmlRef,
        propsToTransfer = _objectWithoutProperties(_owner$props2, ['value', 'options', 'onKeyDown', 'onFocus', 'onBlur', 'onChange', 'onInit', 'htmlRef']);

    return React.createElement('input', _extends({
      type: 'text',
      ref: function ref(_ref) {
        owner.element = _ref;

        if (!htmlRef) {
          return;
        }

        htmlRef.apply(this, arguments);
      },
      value: owner.state.value,
      onKeyDown: owner.onKeyDown,
      onChange: owner.onChange,
      onFocus: owner.onFocus,
      onBlur: owner.onBlur
    }, propsToTransfer));
  }
});

module.exports = cleaveReactClass;