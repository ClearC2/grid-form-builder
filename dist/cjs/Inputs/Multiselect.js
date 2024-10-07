"use strict";

var _typeof3 = require("@babel/runtime-corejs3/helpers/typeof");

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

var _setTimeout2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/set-timeout"));

var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/filter"));

var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));

var _maxSafeInteger = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/number/max-safe-integer"));

var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/extends"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/typeof"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));

var _core = require("@emotion/core");

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactSelect = _interopRequireWildcard(require("react-select"));

var _creatable = _interopRequireDefault(require("react-select/creatable"));

var _utils = require("../utils");

var _ValidationErrorIcon = _interopRequireDefault(require("../ValidationErrorIcon"));

var _useTheme2 = _interopRequireDefault(require("../theme/useTheme"));

function _getRequireWildcardCache(nodeInterop) { if (typeof _WeakMap !== "function") return null; var cacheBabelInterop = new _WeakMap(); var cacheNodeInterop = new _WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof3(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = _Object$defineProperty && _Object$getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? _Object$getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { _Object$defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); enumerableOnly && (symbols = _filterInstanceProperty2(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var _context, _context2; var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? _forEachInstanceProperty(_context = ownKeys(Object(source), !0)).call(_context, function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)) : _forEachInstanceProperty(_context2 = ownKeys(Object(source))).call(_context2, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } return target; }

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

  var _useState = (0, _react.useState)({
    Select: !interactive ? _creatable.default : allowcreate ? _creatable.default : _reactSelect.default
  }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      input = _useState2[0],
      changeInput = _useState2[1];

  var _useState3 = (0, _react.useState)(required && requiredWarning && !value.length),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      isRequiredFlag = _useState4[0],
      updateIsRequiredFlag = _useState4[1];

  var _useState5 = (0, _react.useState)({}),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      menuIsOpen = _useState6[0],
      updateIsMenuOpen = _useState6[1];

  var _useState7 = (0, _react.useState)('bottom'),
      _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
      menuPlacement = _useState8[0],
      updateMenuPlacement = _useState8[1];

  var _useState9 = (0, _react.useState)(0),
      _useState10 = (0, _slicedToArray2.default)(_useState9, 2),
      fieldPosition = _useState10[0],
      updateFieldPosition = _useState10[1];

  var _useState11 = (0, _react.useState)([]),
      _useState12 = (0, _slicedToArray2.default)(_useState11, 2),
      selectValue = _useState12[0],
      updateSelectValue = _useState12[1];

  var _useState13 = (0, _react.useState)([]),
      _useState14 = (0, _slicedToArray2.default)(_useState13, 2),
      options = _useState14[0],
      updateSelectOptions = _useState14[1];

  var _useState15 = (0, _react.useState)(false),
      _useState16 = (0, _slicedToArray2.default)(_useState15, 2),
      isFocused = _useState16[0],
      setIsFocused = _useState16[1];

  var inputContainer = (0, _react.useRef)(null);
  var openMenu = (0, _react.useCallback)(function () {
    if (!readonly && !disabled && !menuIsOpen[name]) {
      updateIsMenuOpen(_objectSpread(_objectSpread({}, menuIsOpen), {}, (0, _defineProperty2.default)({}, name, true)));
    }
  }, [readonly, disabled, updateIsMenuOpen, menuIsOpen, name]);
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
    var formattedOptions = keyword.options || [];
    if (!formattedOptions) formattedOptions = [];
    if (typeof formattedOptions === 'string') formattedOptions = formattedOptions.split(delimiter);
    if (formattedOptions.toJS) formattedOptions = formattedOptions.toJS();
    var duplicate = {}; // get rid of duplicates

    formattedOptions = (0, _filter.default)(formattedOptions).call(formattedOptions, function (option) {
      if (!option) return false;
      if (typeof option === 'string') return true;
      if ((0, _typeof2.default)(option) === 'object' && !option.value) option.value = option.label;

      if (option.value && !duplicate[option.value]) {
        duplicate[option.value] = true;
        return true;
      }
    }); // format into an array of {label, value} objects

    formattedOptions = (0, _map.default)(formattedOptions).call(formattedOptions, function (option) {
      if (typeof option === 'string') option = {
        label: option,
        value: option
      };
      if (!option.value) option.value = option.label;
      return option;
    });
    updateSelectOptions(formattedOptions);
  }, [delimiter, keyword.options]);
  (0, _react.useEffect)(function () {
    setMenuOpenPosition();
  }, [fieldPosition, setMenuOpenPosition]);
  (0, _react.useEffect)(function () {
    changeInput({
      Select: !interactive ? _creatable.default : allowcreate ? _creatable.default : _reactSelect.default
    });
  }, [allowcreate, changeInput, interactive]);
  (0, _react.useEffect)(function () {
    updateIsRequiredFlag(required && requiredWarning && !value.length);
  }, [updateIsRequiredFlag, required, requiredWarning, value]);
  (0, _react.useEffect)(function () {
    updateSelectValue((0, _utils.convertDelimitedValueIntoLabelValueArray)({
      value: value,
      delimit: delimit,
      delimiter: delimiter,
      options: options,
      showValidOptions: showValidOptions
    }));
  }, [value, updateSelectValue, name, delimit, delimiter, stringify, options, showValidOptions]);
  var handleChange = (0, _react.useCallback)(function (val) {
    onChange({
      target: {
        name: name,
        value: (0, _utils.convertLabelValueArrayIntoDelimitedValue)({
          value: val,
          delimiter: delimiter,
          delimit: delimit,
          stringify: stringify
        })
      }
    });

    if (closeMenuOnSelect) {
      menuIsOpen[name] && updateIsMenuOpen(_objectSpread(_objectSpread({}, menuIsOpen), {}, (0, _defineProperty2.default)({}, name, false)));
    }
  }, [closeMenuOnSelect, onChange, name, delimiter, delimit, stringify, menuIsOpen]);
  var handleOnKeyDown = (0, _react.useCallback)(function () {
    if (!menuIsOpen[name]) openMenu();
    onKeyDown();
  }, [onKeyDown, menuIsOpen, openMenu, name]);
  var Select = input.Select;
  var className = 'gfb-input-inner';
  if (!interactive) className = className + ' gfb-non-interactive-input';
  var outerClass = 'gfb-input-outer';
  var components = {};

  components.MultiValue = function (p) {
    var _p$children = p.children,
        children = _p$children === void 0 ? '' : _p$children;

    var _useState17 = (0, _react.useState)(children),
        _useState18 = (0, _slicedToArray2.default)(_useState17, 2),
        label = _useState18[0],
        setLabel = _useState18[1]; // eslint-disable-line


    var copyValueToClipboard = function copyValueToClipboard() {
      navigator.clipboard.writeText(children);
      clearTimeout(labelCopyTimer);
      setLabel(' -- copied -- ');
      labelCopyTimer = (0, _setTimeout2.default)(function () {
        setLabel(children);
      }, 750);
    };

    return (0, _core.jsx)("div", {
      onClick: copyValueToClipboard
    }, (0, _core.jsx)(_reactSelect.components.MultiValue, (0, _extends2.default)({}, p, {
      children: label
    })));
  };

  if (warning && !isRequiredFlag) {
    components.DropdownIndicator = function () {
      return (0, _core.jsx)(_ValidationErrorIcon.default, {
        message: warning,
        color: "#FFCC00",
        type: "warning"
      });
    };
  }

  if (isRequiredFlag && (value.length === 0 || value.size === 0) && !isFocused) {
    outerClass = outerClass + ' gfb-validation-error';

    components.DropdownIndicator = function () {
      return (0, _core.jsx)(_ValidationErrorIcon.default, {
        message: "This Field is Required"
      });
    };
  }

  if (isFocused) {
    outerClass = outerClass + ' gfb-has-focus multiselect-focus';
  }

  var inputOuterCSS = _objectSpread(_objectSpread({}, theme.inputOuter), inputOuter);

  return (0, _core.jsx)("div", {
    className: outerClass,
    ref: inputContainer,
    onMouseDown: setInputFieldPosition,
    style: inputOuter,
    css: inputOuterCSS
  }, (0, _core.jsx)(Select, {
    isSearchable: searchable,
    className: className,
    classNamePrefix: "gfb-input",
    tabIndex: tabIndex,
    autoFocus: autofocus,
    closeMenuOnScroll: !_utils.isMobile ? closeMenuOnScroll : undefined,
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
        var zIndex = _maxSafeInteger.default;
        return _objectSpread(_objectSpread({}, base), {}, {
          top: top,
          zIndex: zIndex
        });
      }
    }
  }));
};

var _default = Multiselect;
exports.default = _default;
Multiselect.propTypes = {
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
  stringify: _propTypes.default.bool,
  delimiter: _propTypes.default.string,
  delimit: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.array]),
  isClearable: _propTypes.default.bool,
  searchable: _propTypes.default.bool,
  closeMenuOnSelect: _propTypes.default.bool,
  warning: _propTypes.default.string,
  showValidOptions: _propTypes.default.bool,
  onBlur: _propTypes.default.func
};