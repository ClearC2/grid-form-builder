import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _Object$getOwnPropertySymbols from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols";
import _Object$getOwnPropertyDescriptor from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor";
import _forEachInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/for-each";
import _Object$getOwnPropertyDescriptors from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors";
import _Object$defineProperties from "@babel/runtime-corejs3/core-js-stable/object/define-properties";
import _Object$defineProperty from "@babel/runtime-corejs3/core-js-stable/object/define-property";
import _extends from "@babel/runtime-corejs3/helpers/esm/extends";
import _defineProperty from "@babel/runtime-corejs3/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime-corejs3/helpers/esm/slicedToArray";

function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); enumerableOnly && (symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var _context9, _context10; var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? _forEachInstanceProperty(_context9 = ownKeys(Object(source), !0)).call(_context9, function (key) { _defineProperty(target, key, source[key]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)) : _forEachInstanceProperty(_context10 = ownKeys(Object(source))).call(_context10, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } return target; }

import _Promise from "@babel/runtime-corejs3/core-js-stable/promise";
import _sliceInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/slice";
import _includesInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/includes";
import _setTimeout from "@babel/runtime-corejs3/core-js-stable/set-timeout";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import _reduceInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/reduce";
import _trimInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/trim";
import _concatInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/concat";

/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import ReactSelect, { components as ReactSelectBaseComponents } from 'react-select';
import AsyncSelect from 'react-select/async';
import Creatable from 'react-select/creatable';
import AsyncCreatable from 'react-select/async-creatable';
import { isMobile, randomId } from '../../utils';
import ValidationErrorIcon from '../../ValidationErrorIcon';
import useTheme from '../../theme/useTheme';
import PortalTooltip from '../../Tooltip';
var viewPortHeight = document.documentElement.clientHeight;

var Select = function Select(props) {
  var _context6, _context8;

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
      createOptionPosition = _props$createOptionPo === void 0 ? 'last' : _props$createOptionPo,
      _props$dataTestid = props['data-testid'],
      testId = _props$dataTestid === void 0 ? (props === null || props === void 0 ? void 0 : props['data-testid']) || (props === null || props === void 0 ? void 0 : props.name) : _props$dataTestid,
      _props$largeDatasetTh = props.largeDatasetThreshold,
      largeDatasetThreshold = _props$largeDatasetTh === void 0 ? 500 : _props$largeDatasetTh,
      _props$searchPlacehol = props.searchPlaceholder,
      searchPlaceholder = _props$searchPlacehol === void 0 ? 'Type to search...' : _props$searchPlacehol;

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
      fullOptions = _useState2[0],
      setFullOptions = _useState2[1];

  var _useState3 = useState([]),
      _useState4 = _slicedToArray(_useState3, 2),
      displayOptions = _useState4[0],
      setDisplayOptions = _useState4[1];

  var _useState5 = useState(''),
      _useState6 = _slicedToArray(_useState5, 2),
      inputValue = _useState6[0],
      setInputValue = _useState6[1];

  var _useState7 = useState({
    Select: !interactive ? Creatable : allowcreate ? Creatable : ReactSelect
  }),
      _useState8 = _slicedToArray(_useState7, 2),
      input = _useState8[0],
      changeInput = _useState8[1];

  var _useState9 = useState(required && requiredWarning && !value.length),
      _useState10 = _slicedToArray(_useState9, 2),
      isRequiredFlag = _useState10[0],
      updateIsRequiredFlag = _useState10[1];

  var _useState11 = useState({}),
      _useState12 = _slicedToArray(_useState11, 2),
      menuIsOpen = _useState12[0],
      updateIsMenuOpen = _useState12[1];

  var _useState13 = useState('bottom'),
      _useState14 = _slicedToArray(_useState13, 2),
      menuPlacement = _useState14[0],
      updateMenuPlacement = _useState14[1];

  var _useState15 = useState(0),
      _useState16 = _slicedToArray(_useState15, 2),
      fieldPosition = _useState16[0],
      updateFieldPosition = _useState16[1];

  var _useState17 = useState({
    label: '',
    value: '',
    color: ''
  }),
      _useState18 = _slicedToArray(_useState17, 2),
      selectValue = _useState18[0],
      updateSelectValue = _useState18[1];

  var _useState19 = useState(false),
      _useState20 = _slicedToArray(_useState19, 2),
      isFocused = _useState20[0],
      setIsFocused = _useState20[1];

  var inputContainer = useRef(null); // AsyncSelect implementation for large datasets

  var loadOptions = useCallback(function (inputValue) {
    return new _Promise(function (resolve) {
      var searchTerm = inputValue || '';
      var lowercaseSearch = searchTerm.toLowerCase(); // If no search term, return options up to large dataset threshold

      if (!searchTerm) {
        resolve(_sliceInstanceProperty(fullOptions).call(fullOptions, 0, largeDatasetThreshold));
        return;
      }

      var filtered = [];
      var index = 0;
      var chunkSize = 2000; // Process 2000 items per chunk

      var processChunk = function processChunk() {
        var endIndex = Math.min(index + chunkSize, fullOptions.length); // Process this chunk

        for (var i = index; i < endIndex; i++) {
          var _context, _context2;

          if (filtered.length >= largeDatasetThreshold) break;
          var option = fullOptions[i];
          if (!option) continue;
          var label = option.label || '';

          var _value = option.value || '';

          if (_includesInstanceProperty(_context = label.toLowerCase()).call(_context, lowercaseSearch) || _includesInstanceProperty(_context2 = _value.toString().toLowerCase()).call(_context2, lowercaseSearch)) {
            filtered.push(option);
          }
        }

        index = endIndex; // If we have enough results or have finished, return

        if (filtered.length >= largeDatasetThreshold || index >= fullOptions.length) {
          resolve(filtered);
        } else {
          // Continue with next chunk asynchronously
          _setTimeout(processChunk, 0);
        }
      };

      processChunk();
    });
  }, [fullOptions, largeDatasetThreshold]); // Determine which Select component to use

  var isLargeDataset = fullOptions.length > largeDatasetThreshold;
  var SelectComponent = useMemo(function () {
    if (!interactive) {
      return allowcreate ? Creatable : ReactSelect;
    }

    if (allowcreate) {
      return isLargeDataset ? AsyncCreatable : Creatable;
    }

    return isLargeDataset ? AsyncSelect : ReactSelect;
  }, [interactive, allowcreate, isLargeDataset]); // For small datasets, handle search normally

  var handleInputChange = useCallback(function (newValue, actionMeta) {
    if (actionMeta.action === 'input-change') {
      setInputValue(newValue); // Only filter for small datasets - let AsyncSelect handle large ones

      if (!isLargeDataset) {
        var _context3;

        var lowercaseSearch = newValue.toLowerCase();

        var filtered = _sliceInstanceProperty(_context3 = _filterInstanceProperty(fullOptions).call(fullOptions, function (option) {
          var _option$label, _context4, _option$value, _context5;

          return ((_option$label = option.label) === null || _option$label === void 0 ? void 0 : _includesInstanceProperty(_context4 = _option$label.toLowerCase()).call(_context4, lowercaseSearch)) || ((_option$value = option.value) === null || _option$value === void 0 ? void 0 : _includesInstanceProperty(_context5 = _option$value.toString().toLowerCase()).call(_context5, lowercaseSearch));
        })).call(_context3, 0, largeDatasetThreshold);

        setDisplayOptions(filtered);
      }
    }

    return newValue;
  }, [fullOptions, isLargeDataset, largeDatasetThreshold]);
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
    setInputValue(''); // Clear search on blur
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
    var newOptions = keyword.options || [];
    setFullOptions(newOptions);

    var initial = _sliceInstanceProperty(newOptions).call(newOptions, 0, largeDatasetThreshold);

    setDisplayOptions(initial);
  }, [keyword.options, largeDatasetThreshold]);
  useEffect(function () {
    setMenuOpenPosition();
  }, [fieldPosition, setMenuOpenPosition]);
  useEffect(function () {
    changeInput({
      Select: SelectComponent
    });
  }, [SelectComponent]);
  useEffect(function () {
    updateIsRequiredFlag(required && requiredWarning && !value.length);
  }, [updateIsRequiredFlag, required, requiredWarning, value]);
  useEffect(function () {
    var keyMap = _reduceInstanceProperty(fullOptions).call(fullOptions, function (acc, cv) {
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
  }, [value, updateSelectValue, fullOptions]);
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
    setInputValue(''); // Clear search after selection
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

  if (isRequiredFlag && _trimInstanceProperty(_context6 = value + '').call(_context6).length === 0 && !isFocused) {
    outerClass = outerClass + ' gfb-validation-error';

    customComponents.DropdownIndicator = function () {
      return jsx(ValidationErrorIcon, {
        message: "This Field is Required"
      });
    };
  }

  var Option = function Option(optionProps) {
    var _context7;

    var newProps = _objectSpread(_objectSpread({}, optionProps), {}, {
      innerProps: _objectSpread(_objectSpread({}, optionProps === null || optionProps === void 0 ? void 0 : optionProps.innerProps), {}, {
        'data-testid': _concatInstanceProperty(_context7 = "".concat(testId, "-")).call(_context7, optionProps.data.value)
      })
    });

    if (!showOptionTooltips) {
      return jsx(ReactSelectBaseComponents.Option, newProps);
    } else {
      var _newProps$data;

      var optionId = randomId();
      return jsx("div", {
        "data-tip": true,
        "data-for": optionId
      }, jsx(PortalTooltip, {
        id: optionId,
        message: (_newProps$data = newProps.data) === null || _newProps$data === void 0 ? void 0 : _newProps$data.tooltip
      }), jsx(ReactSelectBaseComponents.Option, newProps));
    }
  };

  if (isFocused) {
    outerClass = outerClass + ' gfb-has-focus';
  }

  var inputOuterCSS = _objectSpread(_objectSpread({}, theme.inputOuter), inputOuter);

  var baseSelectProps = {
    autoComplete: autoComplete,
    autoFocus: autofocus,
    className: className,
    classNamePrefix: 'gfb-input',
    closeMenuOnScroll: !isMobile ? closeMenuOnScroll : undefined,
    components: _objectSpread(_objectSpread({}, customComponents), {}, {
      Option: Option
    }),
    createOptionPosition: createOptionPosition,
    defaultValue: selectValue,
    inputValue: inputValue,
    isClearable: isClearable,
    isDisabled: disabled || readonly,
    // menuIsOpen={!isMobile ? menuIsOpen[name] : undefined}
    menuPlacement: !isMobile ? menuPlacement : undefined,
    menuPortalTarget: document.body,
    name: name,
    onBlur: handleInputBlur,
    onChange: handleChange,
    // onFocus={handleOnFocus}
    onInputChange: handleInputChange,
    onKeyDown: handleOnKeyDown,
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
    },
    tabIndex: tabIndex,
    value: selectValue
  };
  return jsx("div", {
    className: outerClass,
    css: inputOuterCSS,
    onMouseDown: setInputFieldPosition,
    ref: inputContainer,
    style: inputOuter,
    "data-testid": testId
  }, isLargeDataset ? jsx(Select, _extends({}, baseSelectProps, {
    cacheOptions: true,
    defaultOptions: true,
    loadOptions: loadOptions,
    placeholder: _concatInstanceProperty(_context8 = "".concat(searchPlaceholder, " (")).call(_context8, fullOptions.length, " options)")
  })) : jsx(Select, _extends({}, baseSelectProps, {
    filterOption: null,
    options: displayOptions,
    placeholder: placeholder
  })));
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
  createOptionPosition: PropTypes.string,
  largeDatasetThreshold: PropTypes.number,
  searchPlaceholder: PropTypes.string,
  'data-testid': PropTypes.string
};