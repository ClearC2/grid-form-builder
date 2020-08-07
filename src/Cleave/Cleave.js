// /* eslint-disable */

// This is a temporary internal fork of cleave.js to remove deprecated react life cycles until cleave.js can be updated - JRA 11/21/2019
import PropTypes from 'prop-types'

import React, {Component} from 'react'
import NumeralFormatter from 'cleave.js/src/shortcuts/NumeralFormatter'
import DateFormatter from 'cleave.js/src/shortcuts/DateFormatter'
import TimeFormatter from 'cleave.js/src/shortcuts/TimeFormatter'
import PhoneFormatter from 'cleave.js/src/shortcuts/PhoneFormatter'
import CreditCardDetector from 'cleave.js/src/shortcuts/CreditCardDetector'
import Util from 'cleave.js/src/utils/Util'
import DefaultProperties from 'cleave.js/src/common/DefaultProperties'

export default class Cleave extends Component {
  static propTypes = {
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
  }

  constructor (props) {
    super(props)
    let {value, options, onKeyDown, onChange, onFocus, onBlur, onInit} = props

    this.registeredEvents = {
      onInit: onInit || Util.noop,
      onChange: onChange || Util.noop,
      onFocus: onFocus || Util.noop,
      onBlur: onBlur || Util.noop,
      onKeyDown: onKeyDown || Util.noop
    }

    if (!options) {
      options = {}
    }

    options.initValue = value

    this.properties = DefaultProperties.assign({}, options)

    this.state = {
      value: this.properties.result,
      cursorPosition: 0
    }
  }

  componentDidMount () {
    this.init()
  }

  componentDidUpdate (props) {
    const pps = this.properties

    Util.setSelection(this.element, this.state.cursorPosition, pps.document)
    this.updateRegisteredEvents(this.props)

    let newValue = this.props.value
    if (newValue !== undefined) {
      newValue = newValue.toString()
      if (newValue !== this.properties.initValue) {
        this.properties.initValue = newValue
        this.onInput(newValue, true)
      }
    }

    // update phone region code - // not supporting changing region after mount for now, this will almost certainly blow up in an in - JRA 11/21/2019
    // if (phoneRegionCode && phoneRegionCode !== this.properties.phoneRegionCode) {
    //   this.properties.phoneRegionCode = phoneRegionCode
    //   this.initPhoneFormatter()
    //   this.onInput(this.properties.result)
    // }
  }

  updateRegisteredEvents = props => {
    let {onKeyDown, onChange, onFocus, onBlur, onInit} = this.registeredEvents

    if (props.onInit && props.onInit !== onInit) this.registeredEvents.onInit = props.onInit
    if (props.onChange && props.onChange !== onChange) this.registeredEvents.onChange = props.onChange
    if (props.onFocus && props.onFocus !== onFocus) this.registeredEvents.onFocus = props.onFocus
    if (props.onBlur && props.onBlur !== onBlur) this.registeredEvents.onBlur = props.onBlur
    if (props.onKeyDown && props.onKeyDown !== onKeyDown) this.registeredEvents.onKeyDown = props.onKeyDown
  }

  init = () => {
    let pps = this.properties

    // so no need for this lib at all
    if (
      !pps.numeral &&
      !pps.phone &&
      !pps.creditCard &&
      !pps.time &&
      !pps.date &&
      (pps.blocksLength === 0 && !pps.prefix)
    ) {
      this.onInput(pps.initValue)
      this.registeredEvents.onInit(this)

      return
    }

    pps.maxLength = Util.getMaxLength(pps.blocks)

    this.isAndroid = Util.isAndroid()

    this.initPhoneFormatter()
    this.initDateFormatter()
    this.initTimeFormatter()
    this.initNumeralFormatter()

    // avoid touch input field if value is null
    // otherwise Firefox will add red box-shadow for <input required />
    if (pps.initValue || (pps.prefix && !pps.noImmediatePrefix)) {
      this.onInput(pps.initValue)
    }

    this.registeredEvents.onInit(this)
  }

  initNumeralFormatter = () => {
    let pps = this.properties

    if (!pps.numeral) {
      return
    }

    pps.numeralFormatter = new NumeralFormatter(
      pps.numeralDecimalMark,
      pps.numeralIntegerScale,
      pps.numeralDecimalScale,
      pps.numeralThousandsGroupStyle,
      pps.numeralPositiveOnly,
      pps.stripLeadingZeroes,
      pps.prefix,
      pps.signBeforePrefix,
      pps.delimiter
    )
  }

  initTimeFormatter = () => {
    let pps = this.properties

    if (!pps.time) {
      return
    }

    pps.timeFormatter = new TimeFormatter(pps.timePattern, pps.timeFormat)
    pps.blocks = pps.timeFormatter.getBlocks()
    pps.blocksLength = pps.blocks.length
    pps.maxLength = Util.getMaxLength(pps.blocks)
  }

  initDateFormatter = () => {
    let pps = this.properties

    if (!pps.date) {
      return
    }

    pps.dateFormatter = new DateFormatter(pps.datePattern, pps.dateMin, pps.dateMax)
    pps.blocks = pps.dateFormatter.getBlocks()
    pps.blocksLength = pps.blocks.length
    pps.maxLength = Util.getMaxLength(pps.blocks)
  }

  initPhoneFormatter = () => {
    let pps = this.properties
    if (!pps.phone) {
      return
    }

    // Cleave.AsYouTypeFormatter should be provided by
    // external google closure lib
    try {
      pps.phoneFormatter = new PhoneFormatter(
        new pps.root.Cleave.AsYouTypeFormatter(pps.phoneRegionCode),
        pps.delimiter
      )
    } catch (ex) {
      throw new Error('Please include phone-type-formatter.{country}.js lib')
    }
  }

  setRawValue = value => {
    let owner = this
    let pps = owner.properties

    value = value !== undefined && value !== null ? value.toString() : ''

    if (pps.numeral) {
      value = value.replace('.', pps.numeralDecimalMark)
    }

    pps.postDelimiterBackspace = false

    owner.onChange({
      target: {value: value},

      // Methods to better resemble a SyntheticEvent
      stopPropagation: Util.noop,
      preventDefault: Util.noop,
      persist: Util.noop
    })
  }

  getRawValue = () => {
    let pps = this.properties
    let rawValue = pps.result

    if (pps.rawValueTrimPrefix) {
      rawValue = Util.getPrefixStrippedValue(
        rawValue,
        pps.prefix,
        pps.prefixLength,
        pps.result,
        pps.delimiter,
        pps.delimiters
      )
    }

    if (pps.numeral) {
      rawValue = pps.numeralFormatter ? pps.numeralFormatter.getRawValue(rawValue) : ''
    } else {
      rawValue = Util.stripDelimiters(rawValue, pps.delimiter, pps.delimiters)
    }

    return rawValue
  }

  getISOFormatDate = () => {
    let pps = this.properties

    return pps.date ? pps.dateFormatter.getISOFormatDate() : ''
  }

  getISOFormatTime = () => {
    let pps = this.properties

    return pps.time ? pps.timeFormatter.getISOFormatTime() : ''
  }

  onInit = (owner) => {
    return owner
  }

  onKeyDown = event => {
    let pps = this.properties
    let charCode = event.which || event.keyCode

    // if we got any charCode === 8, this means, that this device correctly
    // sends backspace keys in event, so we do not need to apply any hacks
    this.hasBackspaceSupport = this.hasBackspaceSupport || charCode === 8
    if (!this.hasBackspaceSupport && Util.isAndroidBackspaceKeydown(this.lastInputValue, pps.result)
    ) {
      charCode = 8
    }

    // hit backspace when last character is delimiter
    var postDelimiter = Util.getPostDelimiter(pps.result, pps.delimiter, pps.delimiters)
    if (charCode === 8 && postDelimiter) {
      pps.postDelimiterBackspace = postDelimiter
    } else {
      pps.postDelimiterBackspace = false
    }

    this.registeredEvents.onKeyDown(event)
  }

  onFocus = event => {
    let pps = this.properties

    event.target.rawValue = this.getRawValue()
    event.target.value = pps.result

    this.registeredEvents.onFocus(event)

    Util.fixPrefixCursor(this.element, pps.prefix, pps.delimiter, pps.delimiters)
  }

  onBlur = event => {
    let pps = this.properties

    event.target.rawValue = this.getRawValue()
    event.target.value = pps.result

    this.registeredEvents.onBlur(event)
  }

  onChange = event => {
    let pps = this.properties

    this.onInput(event.target.value)

    event.target.rawValue = this.getRawValue()
    event.target.value = pps.result

    this.registeredEvents.onChange(event)
  }

  onInput = (value, fromProps, bypassSetState) => {
    let pps = this.properties
    const {disabled, readOnly} = this.props

    // case 1: delete one more character "4"
    // 1234*| -> hit backspace -> 123|
    // case 2: last character is not delimiter which is:
    // 12|34* -> hit backspace -> 1|34*
    var postDelimiterAfter = Util.getPostDelimiter(value, pps.delimiter, pps.delimiters)
    if (!fromProps && !pps.numeral && pps.postDelimiterBackspace && !postDelimiterAfter) {
      value = Util.headStr(value, value.length - pps.postDelimiterBackspace.length)
    }

    // phone formatter
    if (pps.phone) {
      if (pps.prefix && (!pps.noImmediatePrefix || value.length)) {
        pps.result = pps.prefix + pps.phoneFormatter.format(value).slice(pps.prefix.length)
      } else if ((disabled || readOnly) && !pps.phoneFormatter.format(value)) {
        pps.result = value
        return this.updateValueState(false)
      } else {
        pps.result = pps.phoneFormatter.format(value)
      }
      return this.updateValueState(bypassSetState)
    }

    // numeral formatter
    if (pps.numeral) {
      // Do not show prefix when noImmediatePrefix is specified
      // This mostly because we need to show user the native input placeholder
      if (pps.prefix && pps.noImmediatePrefix && value.length === 0) {
        pps.result = ''
      } else if (readOnly) {
        pps.result = value
        return this.updateValueState(false)
      } else {
        pps.result = pps.numeralFormatter.format(value)
      }
      return this.updateValueState(bypassSetState)
    }

    // date
    if (pps.date) {
      value = pps.dateFormatter.getValidatedDate(value)
    }

    // time
    if (pps.time) {
      value = pps.timeFormatter.getValidatedTime(value)
    }

    // strip delimiters
    value = Util.stripDelimiters(value, pps.delimiter, pps.delimiters)

    // strip prefix
    value = Util.getPrefixStrippedValue(
      value, pps.prefix, pps.prefixLength,
      pps.result, pps.delimiter, pps.delimiters, pps.noImmediatePrefix
    )

    // strip non-numeric characters
    value = pps.numericOnly ? Util.strip(value, /[^\d]/g) : value

    // convert case
    value = pps.uppercase ? value.toUpperCase() : value
    value = pps.lowercase ? value.toLowerCase() : value

    // prevent from showing prefix when no immediate option enabled with empty input value
    if (pps.prefix && (!pps.noImmediatePrefix || value.length)) {
      value = pps.prefix + value

      // no blocks specified, no need to do formatting
      if (pps.blocksLength === 0) {
        pps.result = value
        return this.updateValueState(bypassSetState)
      }
    }

    // update credit card props
    if (pps.creditCard) {
      this.updateCreditCardPropsByValue(value)
    }

    // strip over length characters
    value = pps.maxLength > 0 ? Util.headStr(value, pps.maxLength) : value

    // apply blocks
    pps.result = Util.getFormattedValue(
      value,
      pps.blocks, pps.blocksLength,
      pps.delimiter, pps.delimiters, pps.delimiterLazyShow
    )

    return this.updateValueState(bypassSetState)
  }

  updateCreditCardPropsByValue = (value) => {
    let pps = this.properties
    let creditCardInfo

    // At least one of the first 4 characters has changed
    if (Util.headStr(pps.result, 4) === Util.headStr(value, 4)) {
      return
    }

    creditCardInfo = CreditCardDetector.getInfo(value, pps.creditCardStrictMode)

    pps.blocks = creditCardInfo.blocks
    pps.blocksLength = pps.blocks.length
    pps.maxLength = Util.getMaxLength(pps.blocks)

    // credit card type changed
    if (pps.creditCardType !== creditCardInfo.type) {
      pps.creditCardType = creditCardInfo.type

      pps.onCreditCardTypeChanged.call(this, pps.creditCardType)
    }
  }

  updateValueState = (bypassSetState) => {
    let pps = this.properties

    if (!this.element) {
      if (bypassSetState) {
        return {value: pps.result}
      } else {
        this.setState({value: pps.result})
      }
      return
    }

    var endPos = this.element.selectionEnd
    var oldValue = this.element.value
    var newValue = pps.result

    this.lastInputValue = newValue

    endPos = Util.getNextCursorPosition(endPos, oldValue, newValue, pps.delimiter, pps.delimiters)

    if (this.isAndroid) {
      window.setTimeout(() => {
        !bypassSetState && this.setState({value: newValue, cursorPosition: endPos})
      }, 1)

      return
    }

    if (bypassSetState) {
      return {value: newValue, cursorPosition: endPos}
    } else {
      this.setState({value: newValue, cursorPosition: endPos})
    }
  }

  render () {
    let {value, options, onKeyDown, onFocus, onBlur, onChange, onInit, htmlRef, ...propsToTransfer} = this.props

    return (
      <input
        type='text'
        ref={ref => {
          this.element = ref

          if (!htmlRef) {
            return
          }

          htmlRef.apply(this, arguments)
        }}
        value={this.state.value}
        onKeyDown={this.onKeyDown}
        onChange={this.onChange}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        {...propsToTransfer}
      />
    )
  }
}
