import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _Object$getOwnPropertySymbols from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import _Object$getOwnPropertyDescriptor from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor";
import _forEachInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/for-each";
import _Object$getOwnPropertyDescriptors from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors";
import _Object$defineProperties from "@babel/runtime-corejs3/core-js-stable/object/define-properties";
import _Object$defineProperty from "@babel/runtime-corejs3/core-js-stable/object/define-property";
import _defineProperty from "@babel/runtime-corejs3/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime-corejs3/helpers/esm/slicedToArray";
import _setTimeout from "@babel/runtime-corejs3/core-js-stable/set-timeout";
import _reduceInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/reduce";
import _trimInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/trim";

function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); enumerableOnly && (symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var _context2, _context3; var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? _forEachInstanceProperty(_context2 = ownKeys(Object(source), !0)).call(_context2, function (key) { _defineProperty(target, key, source[key]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)) : _forEachInstanceProperty(_context3 = ownKeys(Object(source))).call(_context3, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } return target; }

/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useEffect, useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import ReactSelect, { components as ReactSelectBaseComponents } from 'react-select';
import Creatable from 'react-select/creatable';
import { isMobile, randomId } from '../../utils';
import ValidationErrorIcon from '../../ValidationErrorIcon';
import useTheme from '../../theme/useTheme';
import PortalTooltip from '../../Tooltip';
var viewPortHeight = document.documentElement.clientHeight;

var Select = function Select(props) {
  var _context;

  var allowcreate = props.allowcreate,
      _props$value = props.value,
      value = _props$value === void 0 ? '' : _props$value,
      tabIndex = props.tabIndex,
      autofocus = props.autofocus,
      disabled = props.disabled,
      readonly = props.readonly,
      name = props.name,
      _props$keyword = props.keyword,
      keyword = _props$keyword === void 0 ? {} : _props$keyword,
      placeholder = props.placeholder,
      requiredWarning = props.requiredWarning,
      required = props.required,
      _props$onKeyDown = props.onKeyDown,
      onKeyDown = _props$onKeyDown === void 0 ? function () {
    return null;
  } : _props$onKeyDown,
      onChange = props.onChange,
      autoComplete = props.autoComplete,
      _props$interactive = props.interactive,
      interactive = _props$interactive === void 0 ? true : _props$interactive,
      _props$style = props.style,
      style = _props$style === void 0 ? {} : _props$style,
      _props$isClearable = props.isClearable,
      isClearable = _props$isClearable === void 0 ? true : _props$isClearable,
      warning = props.warning,
      onBlur = props.onBlur,
      _props$showOptionTool = props.showOptionTooltips,
      showOptionTooltips = _props$showOptionTool === void 0 ? false : _props$showOptionTool,
      _props$createOptionPo = props.createOptionPosition,
      createOptionPosition = _props$createOptionPo === void 0 ? 'last' : _props$createOptionPo;

  var _style$value = style.value,
      valueStyle = _style$value === void 0 ? {} : _style$value,
      _style$inputOuter = style.inputOuter,
      inputOuter = _style$inputOuter === void 0 ? {} : _style$inputOuter,
      _style$inputInner = style.inputInner,
      inputInner = _style$inputInner === void 0 ? {} : _style$inputInner,
      _style$inputControl = style.inputControl,
      inputControl = _style$inputControl === void 0 ? {} : _style$inputControl,
      _style$valueContainer = style.valueContainer,
      _valueContainer = _style$valueContainer === void 0 ? {} : _style$valueContainer,
      _style$indicators = style.indicators,
      indicators = _style$indicators === void 0 ? {} : _style$indicators,
      _style$options = style.options,
      optionsStyle = _style$options === void 0 ? {} : _style$options;

  var _useTheme = useTheme(),
      theme = _useTheme.theme;

  var _theme$value = theme.value,
      valueTheme = _theme$value === void 0 ? {} : _theme$value,
      _theme$inputInner = theme.inputInner,
      inputInnerTheme = _theme$inputInner === void 0 ? {} : _theme$inputInner,
      _theme$inputControl = theme.inputControl,
      inputControlTheme = _theme$inputControl === void 0 ? {} : _theme$inputControl,
      _theme$valueContainer = theme.valueContainer,
      valueContainerTheme = _theme$valueContainer === void 0 ? {} : _theme$valueContainer,
      _theme$indicators = theme.indicators,
      indicatorsTheme = _theme$indicators === void 0 ? {} : _theme$indicators,
      _theme$options = theme.options,
      optionsTheme = _theme$options === void 0 ? {} : _theme$options;

  var _useState = useState(keyword.options || []),
      _useState2 = _slicedToArray(_useState, 2),
      options = _useState2[0],
      setOptions = _useState2[1];

  var _useState3 = useState({
    Select: !interactive ? Creatable : allowcreate ? Creatable : ReactSelect
  }),
      _useState4 = _slicedToArray(_useState3, 2),
      input = _useState4[0],
      changeInput = _useState4[1];

  var _useState5 = useState(required && requiredWarning && !value.length),
      _useState6 = _slicedToArray(_useState5, 2),
      isRequiredFlag = _useState6[0],
      updateIsRequiredFlag = _useState6[1];

  var _useState7 = useState({}),
      _useState8 = _slicedToArray(_useState7, 2),
      menuIsOpen = _useState8[0],
      updateIsMenuOpen = _useState8[1];

  var _useState9 = useState('bottom'),
      _useState10 = _slicedToArray(_useState9, 2),
      menuPlacement = _useState10[0],
      updateMenuPlacement = _useState10[1];

  var _useState11 = useState(0),
      _useState12 = _slicedToArray(_useState11, 2),
      fieldPosition = _useState12[0],
      updateFieldPosition = _useState12[1];

  var _useState13 = useState({
    label: '',
    value: '',
    color: ''
  }),
      _useState14 = _slicedToArray(_useState13, 2),
      selectValue = _useState14[0],
      updateSelectValue = _useState14[1];

  var _useState15 = useState(false),
      _useState16 = _slicedToArray(_useState15, 2),
      isFocused = _useState16[0],
      setIsFocused = _useState16[1];

  var inputContainer = useRef(null);
  var openMenu = useCallback(function () {
    if (!readonly && !disabled && !menuIsOpen[name]) {
      updateIsMenuOpen(_objectSpread(_objectSpread({}, menuIsOpen), {}, _defineProperty({}, name, true)));
    }
  }, [readonly, disabled, menuIsOpen, updateIsMenuOpen, name]);
  var setMenuOpenPosition = useCallback(function () {
    var placement = fieldPosition < viewPortHeight / 2 ? 'bottom' : 'top';
    updateMenuPlacement(placement);
  }, [fieldPosition, updateMenuPlacement]);
  var handleInputBlur = useCallback(function (e) {
    if (typeof onBlur === 'function') {
      onBlur(e);
    }

    menuIsOpen[name] && updateIsMenuOpen(_objectSpread(_objectSpread({}, menuIsOpen), {}, _defineProperty({}, name, false)));
    setIsFocused(false);
  }, [menuIsOpen, updateIsMenuOpen, name, onBlur]);
  var setInputFieldPosition = useCallback(function () {
    if (inputContainer.current) {
      var position = inputContainer.current.getBoundingClientRect().top;

      if (fieldPosition !== position) {
        updateFieldPosition(position);
      }
    }

    _setTimeout(openMenu); // this needs to be refactored so it actually updates with react instead of hacking around the problem - JRA 12/18/2019

  }, [openMenu, fieldPosition]);
  var handleInputClick = useCallback(function () {
    if (!disabled && !readonly && interactive) {
      setInputFieldPosition();
    }
  }, [disabled, interactive, readonly, setInputFieldPosition]);
  var handleOnFocus = useCallback(function (e) {
    handleInputClick();
    setIsFocused(true);
  }, [handleInputClick]);
  var closeMenuOnScroll = useCallback(function (e) {
    var menuOpenState = false;

    if (e && e.target && e.target.classList) {
      menuOpenState = (e.target.classList.contains('gfb-input__menu-list') || e.target.classList.contains('gfb-input__control')) && menuIsOpen[name];
    }

    updateIsMenuOpen(_objectSpread(_objectSpread({}, menuIsOpen), {}, _defineProperty({}, name, menuOpenState)));
  }, [menuIsOpen, name, updateIsMenuOpen]);
  useEffect(function () {
    setOptions(keyword.options);
  }, [keyword.options, keyword.options.length]);
  useEffect(function () {
    setMenuOpenPosition();
  }, [fieldPosition, setMenuOpenPosition]);
  useEffect(function () {
    changeInput({
      Select: !interactive ? Creatable : allowcreate ? Creatable : ReactSelect
    });
  }, [interactive, allowcreate, changeInput]);
  useEffect(function () {
    updateIsRequiredFlag(required && requiredWarning && !value.length);
  }, [updateIsRequiredFlag, required, requiredWarning, value]);
  useEffect(function () {
    var keyMap = _reduceInstanceProperty(options).call(options, function (acc, cv) {
      acc[cv.value] = {
        label: cv.label,
        color: cv.color || ''
      };
      return acc;
    }, {});

    var selectValue = {
      label: value,
      value: value,
      color: ''
    };
    if (keyMap[value] && keyMap[value].label) selectValue.label = keyMap[value].label;
    if (keyMap[value] && keyMap[value].color) selectValue.color = keyMap[value].color;
    updateSelectValue(selectValue);
  }, [value, updateSelectValue, options]);
  var handleOnKeyDown = useCallback(function () {
    if (!menuIsOpen[name]) openMenu();
    onKeyDown();
  }, [onKeyDown, menuIsOpen, openMenu, name]);
  var handleChange = useCallback(function (e) {
    onChange({
      target: {
        name: name,
        value: e === null ? '' : e.value
      }
    });
    menuIsOpen[name] && updateIsMenuOpen(_objectSpread(_objectSpread({}, menuIsOpen), {}, _defineProperty({}, name, false)));
  }, [onChange, name, menuIsOpen]);
  var Select = input.Select;
  var className = 'gfb-input-inner';
  if (!interactive) className = className + ' gfb-non-interactive-input';
  var outerClass = 'gfb-input-outer';
  var customComponents = {};

  if (warning && !isRequiredFlag) {
    customComponents.DropdownIndicator = function () {
      return jsx(ValidationErrorIcon, {
        message: warning,
        color: "#FFCC00",
        type: "warning"
      });
    };
  }

  if (isRequiredFlag && _trimInstanceProperty(_context = value + '').call(_context).length === 0 && !isFocused) {
    outerClass = outerClass + ' gfb-validation-error';

    customComponents.DropdownIndicator = function () {
      return jsx(ValidationErrorIcon, {
        message: "This Field is Required"
      });
    };
  }

  var Option = function Option(props) {
    if (!showOptionTooltips) {
      return jsx(ReactSelectBaseComponents.Option, props);
    } else {
      var _props$data;

      var optionId = randomId();
      return jsx("div", {
        "data-tip": true,
        "data-for": optionId
      }, jsx(PortalTooltip, {
        id: optionId,
        message: (_props$data = props.data) === null || _props$data === void 0 ? void 0 : _props$data.tooltip
      }), jsx(ReactSelectBaseComponents.Option, props));
    }
  };

  if (isFocused) {
    outerClass = outerClass + ' gfb-has-focus';
  }

  var inputOuterCSS = _objectSpread(_objectSpread({}, theme.inputOuter), inputOuter);

  return jsx("div", {
    className: outerClass,
    ref: inputContainer,
    onMouseDown: setInputFieldPosition,
    style: inputOuter,
    css: inputOuterCSS
  }, jsx(Select, {
    className: className,
    classNamePrefix: "gfb-input",
    tabIndex: tabIndex,
    autoFocus: autofocus,
    closeMenuOnScroll: !isMobile ? closeMenuOnScroll : undefined,
    isClearable: isClearable,
    isDisabled: disabled || readonly,
    menuPortalTarget: document.body,
    name: name,
    options: options,
    placeholder: placeholder // onFocus={handleOnFocus}
    ,
    onKeyDown: handleOnKeyDown,
    onBlur: handleInputBlur // menuIsOpen={!isMobile ? menuIsOpen[name] : undefined}
    ,
    menuPlacement: !isMobile ? menuPlacement : undefined,
    value: selectValue,
    defaultValue: selectValue,
    onChange: handleChange,
    autoComplete: autoComplete,
    createOptionPosition: createOptionPosition,
    components: _objectSpread(_objectSpread({}, customComponents), {}, {
      Option: Option
    }),
    styles: {
      container: function container(base) {
        return _objectSpread(_objectSpread(_objectSpread({}, base), inputInner), inputInnerTheme);
      },
      control: function control(base) {
        return _objectSpread(_objectSpread(_objectSpread({}, base), inputControl), inputControlTheme);
      },
      valueContainer: function valueContainer(base) {
        var valueColor = {};

        if (selectValue.color) {
          valueColor.backgroundColor = selectValue.color;
        }

        return _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, base), _valueContainer), valueContainerTheme), valueColor);
      },
      indicatorsContainer: function indicatorsContainer(base) {
        return _objectSpread(_objectSpread(_objectSpread({}, base), indicators), indicatorsTheme);
      },
      option: function option(base) {
        return _objectSpread(_objectSpread(_objectSpread({}, base), optionsStyle), optionsTheme);
      },
      singleValue: function singleValue(base) {
        if (!interactive) {
          base.color = 'green';
        }

        return _objectSpread(_objectSpread(_objectSpread({}, base), valueStyle), valueTheme);
      },
      menuPortal: function menuPortal(base) {
        var top = menuPlacement === 'bottom' ? base.top - 8 : base.top + 8;
        var zIndex = 9999; // this keeps the select menu below the option tooltip portal

        return _objectSpread(_objectSpread({}, base), {}, {
          top: top,
          zIndex: zIndex
        });
      }
    }
  }));
};

export default Select;
Select.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object, PropTypes.bool]),
  keyword: PropTypes.object,
  tabIndex: PropTypes.number,
  allowcreate: PropTypes.bool,
  autofocus: PropTypes.bool,
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  placeholder: PropTypes.string,
  requiredWarning: PropTypes.bool,
  required: PropTypes.bool,
  values: PropTypes.object,
  persist: PropTypes.bool,
  onKeyDown: PropTypes.func,
  autoComplete: PropTypes.string,
  interactive: PropTypes.bool,
  style: PropTypes.object,
  isClearable: PropTypes.bool,
  warning: PropTypes.string,
  onBlur: PropTypes.func,
  showOptionTooltips: PropTypes.bool,
  data: PropTypes.object,
  createOptionPosition: PropTypes.string
};