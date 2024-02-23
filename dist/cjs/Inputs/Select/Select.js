"use strict";

var _Object$keys = require("@babel/runtime-corejs3/core-js-stable/object/keys");

var _Object$getOwnPropertySymbols = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols");

var _filterInstanceProperty = require("@babel/runtime-corejs3/core-js-stable/instance/filter");

var _Object$getOwnPropertyDescriptor = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor");

var _forEachInstanceProperty = require("@babel/runtime-corejs3/core-js-stable/instance/for-each");

var _Object$getOwnPropertyDescriptors = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors");

var _Object$defineProperties = require("@babel/runtime-corejs3/core-js-stable/object/define-properties");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _setTimeout2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/set-timeout"));

var _reduce = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/reduce"));

var _trim = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/trim"));

var _maxSafeInteger = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/number/max-safe-integer"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));

var _core = require("@emotion/core");

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactSelect = _interopRequireDefault(require("react-select"));

var _creatable = _interopRequireDefault(require("react-select/creatable"));

var _utils = require("../../utils");

var _ValidationErrorIcon = _interopRequireDefault(require("../../ValidationErrorIcon"));

var _useTheme2 = _interopRequireDefault(require("../../theme/useTheme"));

function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); enumerableOnly && (symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var _context2, _context3; var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? _forEachInstanceProperty(_context2 = ownKeys(Object(source), !0)).call(_context2, function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)) : _forEachInstanceProperty(_context3 = ownKeys(Object(source))).call(_context3, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } return target; }

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
      onBlur = props.onBlur;

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
      options = _useState2[0],
      setOptions = _useState2[1];

  var _useState3 = (0, _react.useState)({
    Select: !interactive ? _creatable.default : allowcreate ? _creatable.default : _reactSelect.default
  }),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      input = _useState4[0],
      changeInput = _useState4[1];

  var _useState5 = (0, _react.useState)(required && requiredWarning && !value.length),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      isRequiredFlag = _useState6[0],
      updateIsRequiredFlag = _useState6[1];

  var _useState7 = (0, _react.useState)({}),
      _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
      menuIsOpen = _useState8[0],
      updateIsMenuOpen = _useState8[1];

  var _useState9 = (0, _react.useState)('bottom'),
      _useState10 = (0, _slicedToArray2.default)(_useState9, 2),
      menuPlacement = _useState10[0],
      updateMenuPlacement = _useState10[1];

  var _useState11 = (0, _react.useState)(0),
      _useState12 = (0, _slicedToArray2.default)(_useState11, 2),
      fieldPosition = _useState12[0],
      updateFieldPosition = _useState12[1];

  var _useState13 = (0, _react.useState)({
    label: '',
    value: '',
    color: ''
  }),
      _useState14 = (0, _slicedToArray2.default)(_useState13, 2),
      selectValue = _useState14[0],
      updateSelectValue = _useState14[1];

  var _useState15 = (0, _react.useState)(false),
      _useState16 = (0, _slicedToArray2.default)(_useState15, 2),
      isFocused = _useState16[0],
      setIsFocused = _useState16[1];

  var inputContainer = (0, _react.useRef)(null);
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
  }, [menuIsOpen, updateIsMenuOpen, name, onBlur]);
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
  var handleOnFocus = (0, _react.useCallback)(function () {
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
    setOptions(keyword.options);
  }, [keyword.options, keyword.options.length]);
  (0, _react.useEffect)(function () {
    setMenuOpenPosition();
  }, [fieldPosition, setMenuOpenPosition]);
  (0, _react.useEffect)(function () {
    changeInput({
      Select: !interactive ? _creatable.default : allowcreate ? _creatable.default : _reactSelect.default
    });
  }, [interactive, allowcreate, changeInput]);
  (0, _react.useEffect)(function () {
    updateIsRequiredFlag(required && requiredWarning && !value.length);
  }, [updateIsRequiredFlag, required, requiredWarning, value]);
  (0, _react.useEffect)(function () {
    var keyMap = (0, _reduce.default)(options).call(options, function (acc, cv) {
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
  }, [onChange, name, menuIsOpen]);
  var Select = input.Select;
  var className = 'gfb-input-inner';
  if (!interactive) className = className + ' gfb-non-interactive-input';
  var outerClass = 'gfb-input-outer';
  var components = {};

  if (warning && !isRequiredFlag) {
    components.DropdownIndicator = function () {
      return (0, _core.jsx)(_ValidationErrorIcon.default, {
        message: warning,
        color: "#FFCC00",
        type: "warning"
      });
    };
  }

  if (isRequiredFlag && (0, _trim.default)(_context = value + '').call(_context).length === 0 && !isFocused) {
    outerClass = outerClass + ' gfb-validation-error';

    components.DropdownIndicator = function () {
      return (0, _core.jsx)(_ValidationErrorIcon.default, {
        message: "This Field is Required"
      });
    };
  }

  if (isFocused) {
    outerClass = outerClass + ' gfb-has-focus';
  }

  var inputOuterCSS = _objectSpread(_objectSpread({}, theme.inputOuter), inputOuter);

  return (0, _core.jsx)("div", {
    className: outerClass,
    ref: inputContainer,
    onMouseDown: handleOnFocus,
    style: inputOuter,
    css: inputOuterCSS
  }, (0, _core.jsx)(Select, {
    className: className,
    classNamePrefix: "gfb-input",
    tabIndex: tabIndex,
    autoFocus: autofocus,
    closeMenuOnScroll: !_utils.isMobile ? closeMenuOnScroll : undefined,
    isClearable: isClearable,
    isDisabled: disabled || readonly,
    menuPortalTarget: document.body,
    name: name,
    options: options,
    placeholder: placeholder,
    onFocus: handleOnFocus,
    onKeyDown: handleOnKeyDown,
    onBlur: handleInputBlur,
    menuIsOpen: !_utils.isMobile ? menuIsOpen[name] : undefined,
    menuPlacement: !_utils.isMobile ? menuPlacement : undefined,
    value: selectValue,
    defaultValue: selectValue,
    onChange: handleChange,
    autoComplete: autoComplete,
    components: components,
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
        var zIndex = _maxSafeInteger.default;
        return _objectSpread(_objectSpread({}, base), {}, {
          top: top,
          zIndex: zIndex
        });
      }
    }
  }));
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
  onBlur: _propTypes.default.func
};