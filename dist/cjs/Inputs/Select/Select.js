"use strict";

var _typeof = require("@babel/runtime-corejs3/helpers/typeof");

var _Object$keys = require("@babel/runtime-corejs3/core-js-stable/object/keys");

var _Object$getOwnPropertySymbols = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols");

var _filterInstanceProperty2 = require("@babel/runtime-corejs3/core-js-stable/instance/filter");

var _Object$getOwnPropertyDescriptor = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor");

var _forEachInstanceProperty = require("@babel/runtime-corejs3/core-js-stable/instance/for-each");

var _Object$getOwnPropertyDescriptors = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors");

var _Object$defineProperties = require("@babel/runtime-corejs3/core-js-stable/object/define-properties");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

var _WeakMap = require("@babel/runtime-corejs3/core-js-stable/weak-map");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/promise"));

var _slice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/slice"));

var _includes = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/includes"));

var _setTimeout2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/set-timeout"));

var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/filter"));

var _reduce = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/reduce"));

var _trim = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/trim"));

var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));

var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));

var _core = require("@emotion/core");

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactSelect = _interopRequireWildcard(require("react-select"));

var _async = _interopRequireDefault(require("react-select/async"));

var _creatable = _interopRequireDefault(require("react-select/creatable"));

var _asyncCreatable = _interopRequireDefault(require("react-select/async-creatable"));

var _utils = require("../../utils");

var _ValidationErrorIcon = _interopRequireDefault(require("../../ValidationErrorIcon"));

var _useTheme2 = _interopRequireDefault(require("../../theme/useTheme"));

var _Tooltip = _interopRequireDefault(require("../../Tooltip"));

function _getRequireWildcardCache(nodeInterop) { if (typeof _WeakMap !== "function") return null; var cacheBabelInterop = new _WeakMap(); var cacheNodeInterop = new _WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = _Object$defineProperty && _Object$getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? _Object$getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { _Object$defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); enumerableOnly && (symbols = _filterInstanceProperty2(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var _context9, _context10; var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? _forEachInstanceProperty(_context9 = ownKeys(Object(source), !0)).call(_context9, function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)) : _forEachInstanceProperty(_context10 = ownKeys(Object(source))).call(_context10, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } return target; }

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
      testId = _props$dataTestid === void 0 ? props === null || props === void 0 ? void 0 : props.name : _props$dataTestid,
      _props$largeDatasetTh = props.largeDatasetThreshold,
      largeDatasetThreshold = _props$largeDatasetTh === void 0 ? 500 : _props$largeDatasetTh,
      _props$searchPlacehol = props.searchPlaceholder,
      searchPlaceholder = _props$searchPlacehol === void 0 ? 'Type to search...' : _props$searchPlacehol,
      inputId = props.inputId;

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

  var _useTheme = (0, _useTheme2.default)(),
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

  var _useState = (0, _react.useState)(keyword.options || []),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      fullOptions = _useState2[0],
      setFullOptions = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      displayOptions = _useState4[0],
      setDisplayOptions = _useState4[1];

  var _useState5 = (0, _react.useState)(''),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      inputValue = _useState6[0],
      setInputValue = _useState6[1];

  var _useState7 = (0, _react.useState)({
    Select: !interactive ? _creatable.default : allowcreate ? _creatable.default : _reactSelect.default
  }),
      _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
      input = _useState8[0],
      changeInput = _useState8[1];

  var _useState9 = (0, _react.useState)(required && requiredWarning && !value.length),
      _useState10 = (0, _slicedToArray2.default)(_useState9, 2),
      isRequiredFlag = _useState10[0],
      updateIsRequiredFlag = _useState10[1];

  var _useState11 = (0, _react.useState)({}),
      _useState12 = (0, _slicedToArray2.default)(_useState11, 2),
      menuIsOpen = _useState12[0],
      updateIsMenuOpen = _useState12[1];

  var _useState13 = (0, _react.useState)('bottom'),
      _useState14 = (0, _slicedToArray2.default)(_useState13, 2),
      menuPlacement = _useState14[0],
      updateMenuPlacement = _useState14[1];

  var _useState15 = (0, _react.useState)(0),
      _useState16 = (0, _slicedToArray2.default)(_useState15, 2),
      fieldPosition = _useState16[0],
      updateFieldPosition = _useState16[1];

  var _useState17 = (0, _react.useState)({
    label: '',
    value: '',
    color: ''
  }),
      _useState18 = (0, _slicedToArray2.default)(_useState17, 2),
      selectValue = _useState18[0],
      updateSelectValue = _useState18[1];

  var _useState19 = (0, _react.useState)(false),
      _useState20 = (0, _slicedToArray2.default)(_useState19, 2),
      isFocused = _useState20[0],
      setIsFocused = _useState20[1];

  var inputContainer = (0, _react.useRef)(null); // AsyncSelect implementation for large datasets

  var loadOptions = (0, _react.useCallback)(function (inputValue) {
    return new _promise.default(function (resolve) {
      var searchTerm = inputValue || '';
      var lowercaseSearch = searchTerm.toLowerCase(); // If no search term, return options up to large dataset threshold

      if (!searchTerm) {
        resolve((0, _slice.default)(fullOptions).call(fullOptions, 0, largeDatasetThreshold));
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

          if ((0, _includes.default)(_context = label.toLowerCase()).call(_context, lowercaseSearch) || (0, _includes.default)(_context2 = _value.toString().toLowerCase()).call(_context2, lowercaseSearch)) {
            filtered.push(option);
          }
        }

        index = endIndex; // If we have enough results or have finished, return

        if (filtered.length >= largeDatasetThreshold || index >= fullOptions.length) {
          resolve(filtered);
        } else {
          // Continue with next chunk asynchronously
          (0, _setTimeout2.default)(processChunk, 0);
        }
      };

      processChunk();
    });
  }, [fullOptions, largeDatasetThreshold]); // Determine which Select component to use

  var isLargeDataset = fullOptions.length > largeDatasetThreshold;
  var SelectComponent = (0, _react.useMemo)(function () {
    if (!interactive) {
      return allowcreate ? _creatable.default : _reactSelect.default;
    }

    if (allowcreate) {
      return isLargeDataset ? _asyncCreatable.default : _creatable.default;
    }

    return isLargeDataset ? _async.default : _reactSelect.default;
  }, [interactive, allowcreate, isLargeDataset]); // For small datasets, handle search normally

  var handleInputChange = (0, _react.useCallback)(function (newValue, actionMeta) {
    if (actionMeta.action === 'input-change') {
      setInputValue(newValue); // Only filter for small datasets - let AsyncSelect handle large ones

      if (!isLargeDataset) {
        var _context3;

        var lowercaseSearch = newValue.toLowerCase();
        var filtered = (0, _slice.default)(_context3 = (0, _filter.default)(fullOptions).call(fullOptions, function (option) {
          var _option$label, _context4, _option$value, _context5;

          return ((_option$label = option.label) === null || _option$label === void 0 ? void 0 : (0, _includes.default)(_context4 = _option$label.toLowerCase()).call(_context4, lowercaseSearch)) || ((_option$value = option.value) === null || _option$value === void 0 ? void 0 : (0, _includes.default)(_context5 = _option$value.toString().toLowerCase()).call(_context5, lowercaseSearch));
        })).call(_context3, 0, largeDatasetThreshold);
        setDisplayOptions(filtered);
      }
    }

    return newValue;
  }, [fullOptions, isLargeDataset, largeDatasetThreshold]);
  var openMenu = (0, _react.useCallback)(function () {
    if (!readonly && !disabled && !menuIsOpen[name]) {
      updateIsMenuOpen(_objectSpread(_objectSpread({}, menuIsOpen), {}, (0, _defineProperty2.default)({}, name, true)));
    }
  }, [readonly, disabled, menuIsOpen, updateIsMenuOpen, name]);
  var setMenuOpenPosition = (0, _react.useCallback)(function () {
    var placement = fieldPosition < viewPortHeight / 2 ? 'bottom' : 'top';
    updateMenuPlacement(placement);
  }, [fieldPosition, updateMenuPlacement]);
  var handleInputBlur = (0, _react.useCallback)(function (e) {
    if (typeof onBlur === 'function') {
      onBlur(e);
    }

    menuIsOpen[name] && updateIsMenuOpen(_objectSpread(_objectSpread({}, menuIsOpen), {}, (0, _defineProperty2.default)({}, name, false)));
    setIsFocused(false);
    setInputValue(''); // Clear search on blur

    var allOptionsToShow = (0, _slice.default)(fullOptions).call(fullOptions, 0, largeDatasetThreshold);
    setDisplayOptions(allOptionsToShow); // Reset options to full list
  }, [menuIsOpen, updateIsMenuOpen, name, onBlur, fullOptions, largeDatasetThreshold]);
  var setInputFieldPosition = (0, _react.useCallback)(function () {
    if (inputContainer.current) {
      var position = inputContainer.current.getBoundingClientRect().top;

      if (fieldPosition !== position) {
        updateFieldPosition(position);
      }
    }

    (0, _setTimeout2.default)(openMenu); // this needs to be refactored so it actually updates with react instead of hacking around the problem - JRA 12/18/2019
  }, [openMenu, fieldPosition]);
  var handleInputClick = (0, _react.useCallback)(function () {
    if (!disabled && !readonly && interactive) {
      setInputFieldPosition();
    }
  }, [disabled, interactive, readonly, setInputFieldPosition]);
  var handleOnFocus = (0, _react.useCallback)(function (e) {
    handleInputClick();
    setIsFocused(true);
  }, [handleInputClick]);
  var closeMenuOnScroll = (0, _react.useCallback)(function (e) {
    var menuOpenState = false;

    if (e && e.target && e.target.classList) {
      menuOpenState = (e.target.classList.contains('gfb-input__menu-list') || e.target.classList.contains('gfb-input__control')) && menuIsOpen[name];
    }

    updateIsMenuOpen(_objectSpread(_objectSpread({}, menuIsOpen), {}, (0, _defineProperty2.default)({}, name, menuOpenState)));
  }, [menuIsOpen, name, updateIsMenuOpen]);
  (0, _react.useEffect)(function () {
    var newOptions = keyword.options || [];
    setFullOptions(newOptions);
    var initial = (0, _slice.default)(newOptions).call(newOptions, 0, largeDatasetThreshold);
    setDisplayOptions(initial);
  }, [keyword.options, largeDatasetThreshold]);
  (0, _react.useEffect)(function () {
    setMenuOpenPosition();
  }, [fieldPosition, setMenuOpenPosition]);
  (0, _react.useEffect)(function () {
    changeInput({
      Select: SelectComponent
    });
  }, [SelectComponent]);
  (0, _react.useEffect)(function () {
    updateIsRequiredFlag(required && requiredWarning && !value.length);
  }, [updateIsRequiredFlag, required, requiredWarning, value]);
  (0, _react.useEffect)(function () {
    var keyMap = (0, _reduce.default)(fullOptions).call(fullOptions, function (acc, cv) {
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
  var handleOnKeyDown = (0, _react.useCallback)(function () {
    if (!menuIsOpen[name]) openMenu();
    onKeyDown();
  }, [onKeyDown, menuIsOpen, openMenu, name]);
  var handleChange = (0, _react.useCallback)(function (e) {
    onChange({
      target: {
        name: name,
        value: e === null ? '' : e.value
      }
    });
    menuIsOpen[name] && updateIsMenuOpen(_objectSpread(_objectSpread({}, menuIsOpen), {}, (0, _defineProperty2.default)({}, name, false)));
    setInputValue(''); // Clear search after selection

    var allOptionsToShow = (0, _slice.default)(fullOptions).call(fullOptions, 0, largeDatasetThreshold);
    setDisplayOptions(allOptionsToShow); // Reset options to full list
  }, [onChange, name, menuIsOpen, fullOptions, largeDatasetThreshold]);
  var Select = input.Select;
  var className = 'gfb-input-inner';
  if (!interactive) className = className + ' gfb-non-interactive-input';
  var outerClass = 'gfb-input-outer';
  var customComponents = {};

  if (warning && !isRequiredFlag) {
    customComponents.DropdownIndicator = function () {
      return (0, _core.jsx)(_ValidationErrorIcon.default, {
        message: warning,
        color: "#FFCC00",
        type: "warning"
      });
    };
  }

  if (isRequiredFlag && (0, _trim.default)(_context6 = value + '').call(_context6).length === 0 && !isFocused) {
    outerClass = outerClass + ' gfb-validation-error';

    customComponents.DropdownIndicator = function () {
      return (0, _core.jsx)(_ValidationErrorIcon.default, {
        message: "This Field is Required"
      });
    };
  }

  var Option = function Option(optionProps) {
    var _context7, _optionProps$data;

    var newProps = _objectSpread(_objectSpread({}, optionProps), {}, {
      innerProps: _objectSpread(_objectSpread({}, optionProps === null || optionProps === void 0 ? void 0 : optionProps.innerProps), {}, {
        'data-testid': (0, _concat.default)(_context7 = "".concat(testId, "-")).call(_context7, optionProps === null || optionProps === void 0 ? void 0 : (_optionProps$data = optionProps.data) === null || _optionProps$data === void 0 ? void 0 : _optionProps$data.label)
      })
    });

    if (!showOptionTooltips) {
      return (0, _core.jsx)(_reactSelect.components.Option, newProps);
    } else {
      var _newProps$data;

      var optionId = (0, _utils.randomId)();
      return (0, _core.jsx)("div", {
        "data-tip": true,
        "data-for": optionId
      }, (0, _core.jsx)(_Tooltip.default, {
        id: optionId,
        message: (_newProps$data = newProps.data) === null || _newProps$data === void 0 ? void 0 : _newProps$data.tooltip
      }), (0, _core.jsx)(_reactSelect.components.Option, newProps));
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
    closeMenuOnScroll: !_utils.isMobile ? closeMenuOnScroll : undefined,
    components: _objectSpread(_objectSpread({}, customComponents), {}, {
      Option: Option
    }),
    createOptionPosition: createOptionPosition,
    defaultValue: selectValue,
    inputValue: inputValue,
    isClearable: isClearable,
    isDisabled: disabled || readonly,
    // menuIsOpen={!isMobile ? menuIsOpen[name] : undefined}
    menuPlacement: !_utils.isMobile ? menuPlacement : undefined,
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
    value: selectValue,
    inputId: inputId
  };
  return (0, _core.jsx)("div", {
    className: outerClass,
    css: inputOuterCSS,
    onMouseDown: setInputFieldPosition,
    ref: inputContainer,
    style: inputOuter,
    "data-testid": testId
  }, isLargeDataset ? (0, _core.jsx)(Select, (0, _extends2.default)({}, baseSelectProps, {
    cacheOptions: true,
    defaultOptions: true,
    loadOptions: loadOptions,
    placeholder: (0, _concat.default)(_context8 = "".concat(searchPlaceholder, " (")).call(_context8, fullOptions.length, " options)")
  })) : (0, _core.jsx)(Select, (0, _extends2.default)({}, baseSelectProps, {
    filterOption: null,
    options: displayOptions,
    placeholder: placeholder
  })));
};

var _default = Select;
exports.default = _default;
Select.propTypes = {
  onChange: _propTypes.default.func,
  name: _propTypes.default.string,
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number, _propTypes.default.array, _propTypes.default.object, _propTypes.default.bool]),
  keyword: _propTypes.default.object,
  tabIndex: _propTypes.default.number,
  allowcreate: _propTypes.default.bool,
  autofocus: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  readonly: _propTypes.default.bool,
  placeholder: _propTypes.default.string,
  requiredWarning: _propTypes.default.bool,
  required: _propTypes.default.bool,
  values: _propTypes.default.object,
  persist: _propTypes.default.bool,
  onKeyDown: _propTypes.default.func,
  autoComplete: _propTypes.default.string,
  interactive: _propTypes.default.bool,
  style: _propTypes.default.object,
  isClearable: _propTypes.default.bool,
  warning: _propTypes.default.string,
  onBlur: _propTypes.default.func,
  showOptionTooltips: _propTypes.default.bool,
  data: _propTypes.default.object,
  createOptionPosition: _propTypes.default.string,
  largeDatasetThreshold: _propTypes.default.number,
  searchPlaceholder: _propTypes.default.string,
  'data-testid': _propTypes.default.string,
  inputId: _propTypes.default.string
};