import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _Object$getOwnPropertySymbols from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols";
import _Object$getOwnPropertyDescriptor from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor";
import _forEachInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/for-each";
import _Object$getOwnPropertyDescriptors from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors";
import _Object$defineProperties from "@babel/runtime-corejs3/core-js-stable/object/define-properties";
import _Object$defineProperty from "@babel/runtime-corejs3/core-js-stable/object/define-property";
import _extends from "@babel/runtime-corejs3/helpers/esm/extends";
import _typeof from "@babel/runtime-corejs3/helpers/esm/typeof";
import _defineProperty from "@babel/runtime-corejs3/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime-corejs3/helpers/esm/slicedToArray";
import _setTimeout from "@babel/runtime-corejs3/core-js-stable/set-timeout";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import _mapInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/map";

function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); enumerableOnly && (symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var _context, _context2; var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? _forEachInstanceProperty(_context = ownKeys(Object(source), !0)).call(_context, function (key) { _defineProperty(target, key, source[key]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)) : _forEachInstanceProperty(_context2 = ownKeys(Object(source))).call(_context2, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } return target; }

/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useEffect, useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import ReactSelect, { components as ReactSelectBaseComponents } from 'react-select';
import Creatable from 'react-select/creatable';
import { isMobile, convertDelimitedValueIntoLabelValueArray, convertLabelValueArrayIntoDelimitedValue, randomId } from '../utils';
import ValidationErrorIcon from '../ValidationErrorIcon';
import useTheme from '../theme/useTheme';
import PortalTooltip from '../Tooltip';
var viewPortHeight = document.documentElement.clientHeight;
var labelCopyTimer = null;

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
      style = _props$style === void 0 ? {} : _props$style,
      delimit = props.delimit,
      _props$delimiter = props.delimiter,
      delimiter = _props$delimiter === void 0 ? '¤' : _props$delimiter,
      stringify = props.stringify,
      _props$isClearable = props.isClearable,
      isClearable = _props$isClearable === void 0 ? true : _props$isClearable,
      _props$searchable = props.searchable,
      searchable = _props$searchable === void 0 ? false : _props$searchable,
      _props$closeMenuOnSel = props.closeMenuOnSelect,
      closeMenuOnSelect = _props$closeMenuOnSel === void 0 ? true : _props$closeMenuOnSel,
      warning = props.warning,
      showValidOptions = props.showValidOptions,
      onBlur = props.onBlur,
      showOptionTooltips = props.showOptionTooltips;

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

  var _useState5 = useState({}),
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
    if (!readonly && !disabled && !menuIsOpen[name]) {
      updateIsMenuOpen(_objectSpread(_objectSpread({}, menuIsOpen), {}, _defineProperty({}, name, true)));
    }
  }, [readonly, disabled, updateIsMenuOpen, menuIsOpen, name]);
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
  var handleOnFocus = useCallback(function () {
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
    var formattedOptions = keyword.options || [];
    if (!formattedOptions) formattedOptions = [];
    if (typeof formattedOptions === 'string') formattedOptions = formattedOptions.split(delimiter);
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
  }, [delimiter, keyword.options]);
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
    updateSelectValue(convertDelimitedValueIntoLabelValueArray({
      value: value,
      delimit: delimit,
      delimiter: delimiter,
      options: options,
      showValidOptions: showValidOptions
    }));
  }, [value, updateSelectValue, name, delimit, delimiter, stringify, options, showValidOptions]);
  var handleChange = useCallback(function (val) {
    onChange({
      target: {
        name: name,
        value: convertLabelValueArrayIntoDelimitedValue({
          value: val,
          delimiter: delimiter,
          delimit: delimit,
          stringify: stringify
        })
      }
    });

    if (closeMenuOnSelect) {
      menuIsOpen[name] && updateIsMenuOpen(_objectSpread(_objectSpread({}, menuIsOpen), {}, _defineProperty({}, name, false)));
    }
  }, [closeMenuOnSelect, onChange, name, delimiter, delimit, stringify, menuIsOpen]);
  var handleOnKeyDown = useCallback(function () {
    if (!menuIsOpen[name]) openMenu();
    onKeyDown();
  }, [onKeyDown, menuIsOpen, openMenu, name]);
  var Select = input.Select;
  var className = 'gfb-input-inner';
  if (!interactive) className = className + ' gfb-non-interactive-input';
  var outerClass = 'gfb-input-outer';
  var customComponents = {};

  customComponents.MultiValue = function (p) {
    var _p$children = p.children,
        children = _p$children === void 0 ? '' : _p$children;

    var _useState17 = useState(children),
        _useState18 = _slicedToArray(_useState17, 2),
        label = _useState18[0],
        setLabel = _useState18[1]; // eslint-disable-line


    var copyValueToClipboard = function copyValueToClipboard() {
      navigator.clipboard.writeText(children);
      clearTimeout(labelCopyTimer);
      setLabel(' -- copied -- ');
      labelCopyTimer = _setTimeout(function () {
        setLabel(children);
      }, 750);
    };

    return jsx("div", {
      onClick: copyValueToClipboard
    }, jsx(ReactSelectBaseComponents.MultiValue, _extends({}, p, {
      children: label
    })));
  };

  if (warning && !isRequiredFlag) {
    customComponents.DropdownIndicator = function () {
      return jsx(ValidationErrorIcon, {
        message: warning,
        color: "#FFCC00",
        type: "warning"
      });
    };
  }

  if (isRequiredFlag && (value.length === 0 || value.size === 0) && !isFocused) {
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
    outerClass = outerClass + ' gfb-has-focus multiselect-focus';
  }

  var inputOuterCSS = _objectSpread(_objectSpread({}, theme.inputOuter), inputOuter);

  return jsx("div", {
    className: outerClass,
    ref: inputContainer,
    onMouseDown: setInputFieldPosition,
    style: inputOuter,
    css: inputOuterCSS
  }, jsx(Select, {
    isSearchable: searchable,
    className: className,
    classNamePrefix: "gfb-input",
    tabIndex: tabIndex,
    autoFocus: autofocus,
    closeMenuOnScroll: !isMobile ? closeMenuOnScroll : undefined,
    closeMenuOnSelect: closeMenuOnSelect,
    isClearable: isClearable,
    isDisabled: disabled || readonly || !interactive,
    menuPortalTarget: document.body,
    isMulti: true,
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
        return _objectSpread(_objectSpread(_objectSpread({}, base), _valueContainer), valueContainerTheme);
      },
      indicatorsContainer: function indicatorsContainer(base) {
        return _objectSpread(_objectSpread(_objectSpread({}, base), indicators), indicatorsTheme);
      },
      option: function option(base) {
        return _objectSpread(_objectSpread(_objectSpread({}, base), optionsStyle), optionsTheme);
      },
      multiValue: function multiValue(base, parent) {
        if (!interactive) {
          base.color = 'green';
          base.backgroundColor = '#a6eca67a';
        } else {
          base.backgroundColor = '#8bb7ff91';
        }

        if (window.CSS.supports('color', parent.data.value)) {
          base.backgroundColor = parent.data.value;
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

export default Multiselect;
Multiselect.propTypes = {
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
  stringify: PropTypes.bool,
  delimiter: PropTypes.string,
  delimit: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  isClearable: PropTypes.bool,
  searchable: PropTypes.bool,
  closeMenuOnSelect: PropTypes.bool,
  warning: PropTypes.string,
  showValidOptions: PropTypes.bool,
  onBlur: PropTypes.func
};