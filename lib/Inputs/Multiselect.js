import _Object$defineProperty from "@babel/runtime-corejs3/core-js-stable/object/define-property";
import _Object$defineProperties from "@babel/runtime-corejs3/core-js-stable/object/define-properties";
import _Object$getOwnPropertyDescriptors from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors";
import _forEachInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/for-each";
import _Object$getOwnPropertyDescriptor from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor";
import _Object$getOwnPropertySymbols from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols";
import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _Number$MAX_SAFE_INTEGER from "@babel/runtime-corejs3/core-js-stable/number/max-safe-integer";
import _defineProperty from "@babel/runtime-corejs3/helpers/esm/defineProperty";
import _Object$values from "@babel/runtime-corejs3/core-js-stable/object/values";
import _Array$isArray from "@babel/runtime-corejs3/core-js-stable/array/is-array";
import _mapInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/map";
import _typeof from "@babel/runtime-corejs3/helpers/esm/typeof";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import _setTimeout from "@babel/runtime-corejs3/core-js-stable/set-timeout";
import _slicedToArray from "@babel/runtime-corejs3/helpers/esm/slicedToArray";

(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); if (enumerableOnly) symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { var _context; _forEachInstanceProperty(_context = ownKeys(Object(source), true)).call(_context, function (key) { _defineProperty(target, key, source[key]); }); } else if (_Object$getOwnPropertyDescriptors) { _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)); } else { var _context2; _forEachInstanceProperty(_context2 = ownKeys(Object(source))).call(_context2, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } } return target; }

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useEffect, useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import Creatable from 'react-select/creatable';
import { isMobile } from '../utils';
import ValidationErrorIcon from '../ValidationErrorIcon';
import useTheme from '../theme/useTheme';
var viewPortHeight = document.documentElement.clientHeight;

var Multiselect = function Multiselect(props) {
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
      style = _props$style === void 0 ? {} : _props$style;

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

  var _useState = useState({
    Select: !interactive ? Creatable : allowcreate ? Creatable : ReactSelect
  }),
      _useState2 = _slicedToArray(_useState, 2),
      input = _useState2[0],
      changeInput = _useState2[1];

  var _useState3 = useState(required && requiredWarning && !value.length),
      _useState4 = _slicedToArray(_useState3, 2),
      isRequiredFlag = _useState4[0],
      updateIsRequiredFlag = _useState4[1];

  var _useState5 = useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      menuIsOpen = _useState6[0],
      updateIsMenuOpen = _useState6[1];

  var _useState7 = useState('bottom'),
      _useState8 = _slicedToArray(_useState7, 2),
      menuPlacement = _useState8[0],
      updateMenuPlacement = _useState8[1];

  var _useState9 = useState(0),
      _useState10 = _slicedToArray(_useState9, 2),
      fieldPosition = _useState10[0],
      updateFieldPosition = _useState10[1];

  var _useState11 = useState([]),
      _useState12 = _slicedToArray(_useState11, 2),
      selectValue = _useState12[0],
      updateSelectValue = _useState12[1];

  var _useState13 = useState([]),
      _useState14 = _slicedToArray(_useState13, 2),
      options = _useState14[0],
      updateSelectOptions = _useState14[1];

  var _useState15 = useState(false),
      _useState16 = _slicedToArray(_useState15, 2),
      isFocused = _useState16[0],
      setIsFocused = _useState16[1];

  var inputContainer = useRef(null);
  var openMenu = useCallback(function () {
    if (!readonly && !disabled && !menuIsOpen) {
      updateIsMenuOpen(true);
    }
  }, [readonly, disabled, updateIsMenuOpen, menuIsOpen]);
  var setMenuOpenPosition = useCallback(function () {
    var placement = fieldPosition < viewPortHeight / 2 ? 'bottom' : 'top';
    updateMenuPlacement(placement);
  }, [fieldPosition, updateMenuPlacement]);
  var handleInputBlur = useCallback(function () {
    menuIsOpen && updateIsMenuOpen(false);
    setIsFocused(false);
  }, [menuIsOpen, updateIsMenuOpen]);
  var setInputFieldPosition = useCallback(function () {
    var position = inputContainer.current.getBoundingClientRect().top;

    if (fieldPosition !== position) {
      updateFieldPosition(position);
    }

    _setTimeout(openMenu); // this needs to be refactored so it actually updates with react instead of hacking around the problem - JRA 12/18/2019

  }, [openMenu, fieldPosition]);
  var handleInputClick = useCallback(function () {
    if (!disabled && !readonly && interactive) {
      setInputFieldPosition();
    }
  }, [disabled, interactive, readonly, setInputFieldPosition]);
  var handleOnFocus = useCallback(function () {
    handleInputClick();
    setIsFocused(true);
  }, [handleInputClick]);
  useEffect(function () {
    var formattedOptions = keyword.options || [];
    if (!formattedOptions) formattedOptions = [];
    if (typeof formattedOptions === 'string') formattedOptions = formattedOptions.split('¤');
    if (formattedOptions.toJS) formattedOptions = formattedOptions.toJS();
    var duplicate = {}; // get rid of duplicates

    formattedOptions = _filterInstanceProperty(formattedOptions).call(formattedOptions, function (option) {
      if (!option) return false;
      if (typeof option === 'string') return true;
      if (_typeof(option) === 'object' && !option.value) option.value = option.label;

      if (option.value && !duplicate[option.value]) {
        duplicate[option.value] = true;
        return true;
      }
    }); // format into an array of {label, value} objects

    formattedOptions = _mapInstanceProperty(formattedOptions).call(formattedOptions, function (option) {
      if (typeof option === 'string') option = {
        label: option,
        value: option
      };
      if (!option.value) option.value = option.label;
      return option;
    });
    updateSelectOptions(formattedOptions);
  }, [keyword.options]);
  useEffect(function () {
    setMenuOpenPosition();
  }, [fieldPosition, setMenuOpenPosition]);
  useEffect(function () {
    changeInput({
      Select: !interactive ? Creatable : allowcreate ? Creatable : ReactSelect
    });
  }, [allowcreate, changeInput, interactive]);
  useEffect(function () {
    updateIsRequiredFlag(required && requiredWarning && !value.length);
  }, [updateIsRequiredFlag, required, requiredWarning, value]);
  useEffect(function () {
    var formattedValue = value; // first lets try to get this value normalized to what react-select wants, which is an array of values

    if (!formattedValue) formattedValue = [];
    if (formattedValue.toJS) formattedValue = formattedValue.toJS();
    if (typeof formattedValue === 'string') formattedValue = formattedValue.split('¤');

    if (!_Array$isArray(formattedValue) && _typeof(formattedValue) === 'object') {
      formattedValue = _Object$values(formattedValue);
    }

    if (!_Array$isArray(formattedValue)) {
      console.warn('The field', name, 'is a multiselect but its value was not a valid multi value. Multivalues should be a delimited string or an array of values, but instead got', value); //eslint-disable-line

      formattedValue = [];
    }

    var duplicate = {}; // lets filter out any blanks they may have snuck in

    _filterInstanceProperty(formattedValue).call(formattedValue, function (value) {
      if (_typeof(value) === 'object') value = value.value; // if value is an object but does not have a value key, we are going to drop the value as well - JRA 12/19/2019

      if (!value) return false;

      if (!duplicate[value]) {
        duplicate[value] = true;
        return true;
      }
    }); // now lets make sure each value in the array is a {label, value} object


    formattedValue = _mapInstanceProperty(formattedValue).call(formattedValue, function (value) {
      if (typeof value === 'string') {
        value = {
          label: value,
          value: value
        };
      }

      if (_typeof(value) === 'object' && !value.label) {
        value.label = value.value;
      }

      return value;
    });
    updateSelectValue(formattedValue);
  }, [value, updateSelectValue, name]);
  var handleOnKeyDown = useCallback(function () {
    if (!menuIsOpen) openMenu();
    onKeyDown();
  }, [onKeyDown, menuIsOpen, openMenu]);
  var handleChange = useCallback(function (e) {
    onChange({
      target: {
        name: name,
        value: e === null ? [] : e
      }
    });
    menuIsOpen && updateIsMenuOpen(false);
  }, [onChange, name, menuIsOpen]);
  var Select = input.Select;
  var className = 'gfb-input-inner';
  if (!interactive) className = className + ' gfb-non-interactive-input';
  var outerClass = 'gfb-input-outer';
  var components = {};

  if (isRequiredFlag && value.length === 0 && !isFocused) {
    outerClass = outerClass + ' gfb-validation-error';

    components.DropdownIndicator = function () {
      return jsx(ValidationErrorIcon, {
        message: "This Field is Required"
      });
    };
  }

  if (isFocused) {
    outerClass = outerClass + ' gfb-has-focus';
  }

  return jsx("div", {
    className: outerClass,
    ref: inputContainer,
    onMouseDown: handleOnFocus,
    style: inputOuter,
    css: theme.inputOuter
  }, jsx(Select, {
    className: className,
    classNamePrefix: "gfb-input",
    tabIndex: tabIndex,
    autofocus: autofocus,
    isClearable: true,
    isDisabled: disabled || readonly || !interactive,
    menuPortalTarget: document.body,
    menuShouldBlockScroll: true,
    isMulti: true,
    name: name,
    options: options,
    placeholder: placeholder,
    onFocus: handleOnFocus,
    onKeyDown: handleOnKeyDown,
    onBlur: handleInputBlur,
    menuIsOpen: !isMobile ? menuIsOpen : undefined,
    menuPlacement: !isMobile ? menuPlacement : undefined,
    value: selectValue,
    defaultValue: selectValue,
    onChange: handleChange,
    autoComplete: autoComplete,
    components: components,
    styles: {
      container: function container(base) {
        return _objectSpread({}, base, {}, inputInner, {}, inputInnerTheme);
      },
      control: function control(base) {
        return _objectSpread({}, base, {}, inputControl, {}, inputControlTheme);
      },
      valueContainer: function valueContainer(base) {
        return _objectSpread({}, base, {}, _valueContainer, {}, valueContainerTheme);
      },
      indicatorsContainer: function indicatorsContainer(base) {
        return _objectSpread({}, base, {}, indicators, {}, indicatorsTheme);
      },
      option: function option(base) {
        return _objectSpread({}, base, {}, optionsStyle, {}, optionsTheme);
      },
      multiValue: function multiValue(base) {
        if (!interactive) {
          base.color = 'green';
          base.backgroundColor = '#a6eca67a';
        } else {
          base.backgroundColor = '#8bb7ff91';
        }

        return _objectSpread({}, base, {}, valueStyle, {}, valueTheme);
      },
      menuPortal: function menuPortal(base) {
        var top = menuPlacement === 'bottom' ? base.top - 8 : base.top + 8;
        var zIndex = _Number$MAX_SAFE_INTEGER;
        return _objectSpread({}, base, {
          top: top,
          zIndex: zIndex
        });
      }
    }
  }));
};

__signature__(Multiselect, "useTheme{{theme}}\nuseState{[input, changeInput]({Select: !interactive ? Creatable : allowcreate ? Creatable : ReactSelect})}\nuseState{[isRequiredFlag, updateIsRequiredFlag](required && requiredWarning && !value.length)}\nuseState{[menuIsOpen, updateIsMenuOpen](false)}\nuseState{[menuPlacement, updateMenuPlacement]('bottom')}\nuseState{[fieldPosition, updateFieldPosition](0)}\nuseState{[selectValue, updateSelectValue]([])}\nuseState{[options, updateSelectOptions]([])}\nuseState{[isFocused, setIsFocused](false)}\nuseRef{inputContainer}\nuseCallback{openMenu}\nuseCallback{setMenuOpenPosition}\nuseCallback{handleInputBlur}\nuseCallback{setInputFieldPosition}\nuseCallback{handleInputClick}\nuseCallback{handleOnFocus}\nuseEffect{}\nuseEffect{}\nuseEffect{}\nuseEffect{}\nuseEffect{}\nuseCallback{handleOnKeyDown}\nuseCallback{handleChange}", function () {
  return [useTheme];
});

var _default = Multiselect;
export default _default;
Multiselect.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object]),
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
  style: PropTypes.object
};
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(viewPortHeight, "viewPortHeight", "/root/repo/src/Inputs/Multiselect.js");
  reactHotLoader.register(Multiselect, "Multiselect", "/root/repo/src/Inputs/Multiselect.js");
  reactHotLoader.register(_default, "default", "/root/repo/src/Inputs/Multiselect.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();