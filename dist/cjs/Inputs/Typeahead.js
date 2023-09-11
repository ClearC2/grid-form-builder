"use strict";

var _Reflect$construct = require("@babel/runtime-corejs3/core-js-stable/reflect/construct");

var _Object$keys2 = require("@babel/runtime-corejs3/core-js-stable/object/keys");

var _Object$getOwnPropertySymbols = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols");

var _filterInstanceProperty2 = require("@babel/runtime-corejs3/core-js-stable/instance/filter");

var _Object$getOwnPropertyDescriptor = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor");

var _forEachInstanceProperty2 = require("@babel/runtime-corejs3/core-js-stable/instance/for-each");

var _Object$getOwnPropertyDescriptors = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors");

var _Object$defineProperties = require("@babel/runtime-corejs3/core-js-stable/object/define-properties");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _values = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/values"));

var _setTimeout2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/set-timeout"));

var _maxSafeInteger = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/number/max-safe-integer"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _indexOf = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/index-of"));

var _isArray = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/array/is-array"));

var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));

var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/filter"));

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/json/stringify"));

var _trim = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/trim"));

var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));

var _startsWith = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/starts-with"));

var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/promise"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/keys"));

var _slice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/slice"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/typeof"));

var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

var _core = require("@emotion/core");

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _async = _interopRequireDefault(require("react-select/async"));

var _asyncCreatable = _interopRequireDefault(require("react-select/async-creatable"));

var _reactSelect = require("react-select");

var _utils = require("../utils");

var _config = _interopRequireDefault(require("../config"));

var _ValidationErrorIcon = _interopRequireDefault(require("../ValidationErrorIcon"));

var _useTheme2 = _interopRequireDefault(require("../theme/useTheme"));

function ownKeys(object, enumerableOnly) { var keys = _Object$keys2(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); enumerableOnly && (symbols = _filterInstanceProperty2(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var _context15, _context16; var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? _forEachInstanceProperty2(_context15 = ownKeys(Object(source), !0)).call(_context15, function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)) : _forEachInstanceProperty2(_context16 = ownKeys(Object(source))).call(_context16, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = _Reflect$construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !_Reflect$construct) return false; if (_Reflect$construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(_Reflect$construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var viewPortHeight = document.documentElement.clientHeight;
var debounce = null;
var labelCopyTimer = null;

var TypeaheadPerformanceOptimizer = /*#__PURE__*/function (_PureComponent) {
  (0, _inherits2.default)(TypeaheadPerformanceOptimizer, _PureComponent);

  var _super = _createSuper(TypeaheadPerformanceOptimizer);

  function TypeaheadPerformanceOptimizer() {
    (0, _classCallCheck2.default)(this, TypeaheadPerformanceOptimizer);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(TypeaheadPerformanceOptimizer, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          Typeahead = _this$props.Typeahead,
          setRef = _this$props.setRef,
          className = _this$props.className,
          classNamePrefix = _this$props.classNamePrefix,
          closeMenuOnScroll = _this$props.closeMenuOnScroll,
          tabIndex = _this$props.tabIndex,
          autoFocus = _this$props.autoFocus,
          blurInputOnSelect = _this$props.blurInputOnSelect,
          isClearable = _this$props.isClearable,
          createOptionPosition = _this$props.createOptionPosition,
          formatCreateLabel = _this$props.formatCreateLabel,
          isMulti = _this$props.isMulti,
          isDisabled = _this$props.isDisabled,
          menuPortalTarget = _this$props.menuPortalTarget,
          name = _this$props.name,
          noOptionsMessage = _this$props.noOptionsMessage,
          placeholder = _this$props.placeholder,
          inputValue = _this$props.inputValue,
          menuIsOpen = _this$props.menuIsOpen,
          menuPlacement = _this$props.menuPlacement,
          onKeyDown = _this$props.onKeyDown,
          onMouseDown = _this$props.onMouseDown,
          onFocus = _this$props.onFocus,
          onBlur = _this$props.onBlur,
          onInputChange = _this$props.onInputChange,
          loadOptions = _this$props.loadOptions,
          onChange = _this$props.onChange,
          value = _this$props.value,
          autoComplete = _this$props.autoComplete,
          components = _this$props.components,
          defaultOptions = _this$props.defaultOptions,
          styles = _this$props.styles;
      return (0, _core.jsx)(Typeahead, {
        ref: setRef,
        className: className,
        classNamePrefix: classNamePrefix,
        closeMenuOnScroll: closeMenuOnScroll,
        tabIndex: tabIndex,
        autoFocus: autoFocus,
        blurInputOnSelect: blurInputOnSelect,
        isClearable: isClearable,
        createOptionPosition: createOptionPosition,
        formatCreateLabel: formatCreateLabel,
        isMulti: isMulti,
        isDisabled: isDisabled,
        menuPortalTarget: menuPortalTarget,
        name: name,
        noOptionsMessage: noOptionsMessage,
        placeholder: placeholder,
        inputValue: inputValue,
        menuIsOpen: menuIsOpen,
        menuPlacement: menuPlacement,
        onKeyDown: onKeyDown,
        onMouseDown: onMouseDown,
        onFocus: onFocus,
        onBlur: onBlur,
        onInputChange: onInputChange,
        loadOptions: loadOptions,
        onChange: onChange,
        value: value,
        autoComplete: autoComplete,
        components: components,
        defaultOptions: defaultOptions,
        styles: styles,
        openMenuOnClick: false
      });
    }
  }]);
  return TypeaheadPerformanceOptimizer;
}(_react.PureComponent);

(0, _defineProperty2.default)(TypeaheadPerformanceOptimizer, "propTypes", {
  Typeahead: _propTypes.default.func,
  setRef: _propTypes.default.any,
  className: _propTypes.default.string,
  classNamePrefix: _propTypes.default.string,
  closeMenuOnScroll: _propTypes.default.func,
  tabIndex: _propTypes.default.number,
  autoFocus: _propTypes.default.bool,
  blurInputOnSelect: _propTypes.default.bool,
  isClearable: _propTypes.default.bool,
  createOptionPosition: _propTypes.default.string,
  formatCreateLabel: _propTypes.default.func,
  isMulti: _propTypes.default.bool,
  isDisabled: _propTypes.default.bool,
  menuPortalTarget: _propTypes.default.any,
  name: _propTypes.default.string,
  noOptionsMessage: _propTypes.default.func,
  placeholder: _propTypes.default.string,
  inputValue: _propTypes.default.string,
  menuIsOpen: _propTypes.default.bool,
  menuPlacement: _propTypes.default.string,
  onKeyDown: _propTypes.default.func,
  onMouseDown: _propTypes.default.func,
  onFocus: _propTypes.default.func,
  onBlur: _propTypes.default.func,
  onInputChange: _propTypes.default.func,
  loadOptions: _propTypes.default.func,
  onChange: _propTypes.default.func,
  value: _propTypes.default.any,
  autoComplete: _propTypes.default.any,
  components: _propTypes.default.object,
  defaultOptions: _propTypes.default.any,
  styles: _propTypes.default.object
});

var Typeahead = function Typeahead(props) {
  var _context14;

  var name = props.name,
      label = props.label,
      _props$value = props.value,
      value = _props$value === void 0 ? '' : _props$value,
      values = (0, _values.default)(props),
      onChange = props.onChange,
      allowcreate = props.allowcreate,
      autofocus = props.autofocus,
      multi = props.multi,
      disabled = props.disabled,
      readonly = props.readonly,
      placeholder = props.placeholder,
      requiredWarning = props.requiredWarning,
      required = props.required,
      tabIndex = props.tabIndex,
      onKeyDown = props.onKeyDown,
      draggable = props.draggable,
      _props$persist = props.persist,
      persist = _props$persist === void 0 ? true : _props$persist,
      typeahead = props.typeahead,
      _props$minChars = props.minChars,
      minChars = _props$minChars === void 0 ? 1 : _props$minChars,
      stringify = props.stringify,
      autoComplete = props.autoComplete,
      _props$interactive = props.interactive,
      interactive = _props$interactive === void 0 ? true : _props$interactive,
      style = props.style,
      delimit = props.delimit,
      delimiter = props.delimiter,
      _props$isClearable = props.isClearable,
      isClearable = _props$isClearable === void 0 ? true : _props$isClearable,
      createlabel = props.createlabel,
      typeaheadOptions = props.options,
      warning = props.warning;

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
      optionsStyle = _style$options === void 0 ? {} : _style$options,
      _style$menuPortal = style.menuPortal,
      _menuPortal = _style$menuPortal === void 0 ? {} : _style$menuPortal;

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
    Typeahead: allowcreate ? _asyncCreatable.default : _async.default
  }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      input = _useState2[0],
      changeInput = _useState2[1];

  var _useState3 = (0, _react.useState)(''),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      inputValue = _useState4[0],
      updateInputValue = _useState4[1];

  var _useState5 = (0, _react.useState)(multi ? [] : {
    label: '',
    value: ''
  }),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      selectValue = _useState6[0],
      updateSelectValue = _useState6[1];

  var _useState7 = (0, _react.useState)((label === 'papostalcode' || label === 'Zip Code') && inputValue.length <= 2),
      _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
      isZipCode = _useState8[0],
      updateIsZip = _useState8[1];

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

  var _useState17 = (0, _react.useState)(false),
      _useState18 = (0, _slicedToArray2.default)(_useState17, 2),
      isFocused = _useState18[0],
      setIsFocused = _useState18[1];

  var _useState19 = (0, _react.useState)([]),
      _useState20 = (0, _slicedToArray2.default)(_useState19, 2),
      defaultOptions = _useState20[0],
      setDefaultOptions = _useState20[1];

  var _useState21 = (0, _react.useState)({
    Option: function Option(base) {
      if (base.isDisabled) {
        base.innerProps.style = {
          height: 20,
          fontSize: '10pt',
          paddingBottom: 0,
          paddingLeft: 5,
          paddingTop: 0
        };
      }

      return (0, _core.jsx)(_reactSelect.components.Option, base);
    },
    MultiValue: function MultiValue(base) {
      var _base$children = base.children,
          children = _base$children === void 0 ? '' : _base$children;

      var _useState23 = (0, _react.useState)(children),
          _useState24 = (0, _slicedToArray2.default)(_useState23, 2),
          label = _useState24[0],
          setLabel = _useState24[1]; // eslint-disable-line


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
      }, (0, _core.jsx)(_reactSelect.components.MultiValue, (0, _extends2.default)({}, base, {
        children: label
      })));
    }
  }),
      _useState22 = (0, _slicedToArray2.default)(_useState21, 2),
      components = _useState22[0],
      setComponents = _useState22[1];

  var _useState25 = (0, _react.useState)(null),
      _useState26 = (0, _slicedToArray2.default)(_useState25, 2),
      dynamicTypeaheadKey = _useState26[0],
      setDynamicTypeaheadKey = _useState26[1];

  var _useState27 = (0, _react.useState)({}),
      _useState28 = (0, _slicedToArray2.default)(_useState27, 2),
      conditions = _useState28[0],
      setConditions = _useState28[1];

  var _useState29 = (0, _react.useState)({
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
    multiValue: function multiValue(base) {
      if (!interactive) {
        base.color = 'green';
        base.backgroundColor = '#a6eca67a';
      } else {
        base.backgroundColor = '#8bb7ff91';
      }

      return _objectSpread(_objectSpread(_objectSpread({}, base), valueStyle), valueTheme);
    },
    singleValue: function singleValue(base) {
      if (!interactive) {
        base.color = 'green';
      }

      return _objectSpread(_objectSpread(_objectSpread({}, base), valueStyle), valueTheme);
    },
    menuPortal: function menuPortal(base) {
      var top = menuPlacement === 'bottom' ? base.top - 8 + (_menuPortal.bottomTopBias || 0) : base.top + 8 + (_menuPortal.topTopBias || 0);
      var zIndex = _maxSafeInteger.default;
      return _objectSpread(_objectSpread({}, base), {}, {
        top: top,
        zIndex: zIndex
      }, _menuPortal);
    }
  }),
      _useState30 = (0, _slicedToArray2.default)(_useState29, 2),
      reactSelectStyles = _useState30[0],
      setReactSelectStyles = _useState30[1];

  var inputContainer = (0, _react.useRef)(null);
  var reactSelect = (0, _react.useRef)(null);
  var isLoadingOptions = (0, _react.useRef)(false); // this is a ref and not state because it needs to be looked at in async calls and needs real time updates outside of lifecycles - JRA 02/13/2020

  (0, _react.useEffect)(function () {
    var populateConditionObject = function populateConditionObject() {
      var _context;

      var condition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        name: null,
        comparator: null,
        values: []
      };
      if (!condition.hasOwnProperty('values')) condition.values = []; //eslint-disable-line

      var pluggedInValues = [];
      (0, _forEach.default)(_context = (0, _values.default)(condition)).call(_context, function (value) {
        var formValueForThisValueName = values.get(value, '');

        if (formValueForThisValueName && (0, _indexOf.default)(pluggedInValues).call(pluggedInValues, formValueForThisValueName) === -1) {
          pluggedInValues.push(formValueForThisValueName);
        } else {
          pluggedInValues.push(value);
        }
      });
      var value = values.get(condition.name, '');

      if (!pluggedInValues.length && (0, _indexOf.default)(pluggedInValues).call(pluggedInValues, value) === -1) {
        pluggedInValues.push(value);
      }

      condition.values = pluggedInValues;
      return condition;
    };

    var populateFilterBody = function populateFilterBody() {
      var filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      // eslint-disable-next-line
      if (filter.hasOwnProperty('name')) {
        populateConditionObject(filter); // eslint-disable-next-line
      } else if (filter.hasOwnProperty('conditions') && (0, _isArray.default)(filter.conditions)) {
        var _context2;

        (0, _map.default)(_context2 = filter.conditions).call(_context2, function (condition) {
          return populateFilterBody(condition);
        });
      }

      return filter;
    };

    var _typeahead$filter = (0, _filter.default)(typeahead),
        filter = _typeahead$filter === void 0 ? {} : _typeahead$filter;

    if (typeof filter === 'function') filter = filter();
    filter = JSON.parse((0, _stringify.default)(filter)); // deep clone the object as to not mutate the definition

    filter = populateFilterBody(filter);

    if ((0, _stringify.default)(filter) !== (0, _stringify.default)(conditions)) {
      setConditions(filter);
    }
  }, [values, typeahead, conditions]);
  (0, _react.useEffect)(function () {
    var _typeahead$key = typeahead.key,
        key = _typeahead$key === void 0 ? null : _typeahead$key,
        _typeahead$fieldvalue = typeahead.fieldvalue,
        fieldvalue = _typeahead$fieldvalue === void 0 ? null : _typeahead$fieldvalue;
    if (values.get(fieldvalue, '')) key = values.get(fieldvalue, '');
    setDynamicTypeaheadKey(key);
  }, [typeahead, values]);
  (0, _react.useEffect)(function () {
    setReactSelectStyles({
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
      multiValue: function multiValue(base) {
        if (!interactive) {
          base.color = 'green';
          base.backgroundColor = '#a6eca67a';
        } else {
          base.backgroundColor = '#8bb7ff91';
        }

        return _objectSpread(_objectSpread(_objectSpread({}, base), valueStyle), valueTheme);
      },
      singleValue: function singleValue(base) {
        if (!interactive) {
          base.color = 'green';
        }

        return _objectSpread(_objectSpread(_objectSpread({}, base), valueStyle), valueTheme);
      },
      menuPortal: function menuPortal(base) {
        var top = menuPlacement === 'bottom' ? base.top - 8 + (_menuPortal.bottomTopBias || 0) : base.top + 8 + (_menuPortal.topTopBias || 0);
        var zIndex = _maxSafeInteger.default;
        return _objectSpread(_objectSpread({}, base), {}, {
          top: top,
          zIndex: zIndex
        }, _menuPortal);
      }
    }); // going to ignore dynamic style changes for the time being - JRA 07/31/2020
  }, [// eslint-disable-line
  interactive, menuPlacement]);
  (0, _react.useEffect)(function () {
    var _context3;

    if (isRequiredFlag && (0, _trim.default)(_context3 = value + '').call(_context3).length === 0 && !isFocused) {
      if (!components.showValidationError) {
        // if it already is showing validation error, don't needlessly update state, this will cause an infinite loop
        setComponents(_objectSpread(_objectSpread({}, components), {}, {
          DropdownIndicator: function DropdownIndicator() {
            return (0, _core.jsx)(_ValidationErrorIcon.default, {
              message: "This Field is Required"
            });
          },
          showValidationError: true
        }));
      }
    } else if (components.showValidationError) {
      setComponents(_objectSpread(_objectSpread({}, components), {}, {
        showValidationError: false,
        DropdownIndicator: _reactSelect.components.DropdownIndicator
      }));
    } else if (warning) {
      setComponents(_objectSpread(_objectSpread({}, components), {}, {
        DropdownIndicator: function DropdownIndicator() {
          return (0, _core.jsx)(_ValidationErrorIcon.default, {
            message: warning,
            color: "#FFCC00",
            type: "warning"
          });
        }
      }));
    }
  }, [isRequiredFlag, value, isFocused, components, warning]);
  (0, _react.useEffect)(function () {
    changeInput({
      Typeahead: allowcreate ? _asyncCreatable.default : _async.default
    });
  }, [allowcreate, changeInput]);
  (0, _react.useEffect)(function () {
    updateIsZip((label === 'papostalcode' || label === 'Zip Code') && inputValue.length <= 2);
  }, [label, inputValue, updateIsZip]);
  (0, _react.useEffect)(function () {
    updateIsRequiredFlag(required && requiredWarning && !value.length);
  }, [updateIsRequiredFlag, required, requiredWarning, value]);
  var convertValueStringToValueArrayIfNeeded = (0, _react.useCallback)(function (value) {
    if (typeof value === 'number' && !isNaN(value)) value = value + '';

    var attemptConvertStringObjectToObject = function attemptConvertStringObjectToObject(string) {
      try {
        return JSON.parse(string);
      } catch (e) {
        return string;
      }
    };

    if (multi && stringify && value && typeof value === 'string') {
      if (delimiter) {
        value = value.split(delimiter);
        value = (0, _map.default)(value).call(value, function (option) {
          return attemptConvertStringObjectToObject(option);
        });
      } else {
        try {
          value = JSON.parse(value);
        } catch (e) {
          // eslint-disable-next-line
          console.error('The typeahead field >>', name, '<< attempted to JSON parse >>', value, '<< into an array but the string is not proper JSON. This is a no-op which will cause this typeahead to start with no values.');
          value = [];
        }
      }
    }

    return value;
  }, [name, multi, stringify, delimiter]);
  (0, _react.useEffect)(function () {
    var parsedValue = value && typeof value.toJS === 'function' ? value.toJS() : value;
    parsedValue = convertValueStringToValueArrayIfNeeded(parsedValue);

    if ((0, _isArray.default)(parsedValue) && parsedValue.length > 0) {
      parsedValue = (0, _map.default)(parsedValue).call(parsedValue, function (v) {
        if ((0, _typeof2.default)(v) === 'object') return v;
        if (typeof v === 'string' || typeof v === 'number') return {
          value: v,
          label: v
        };
      });
    }

    if ((typeof parsedValue === 'string' || typeof parsedValue === 'number') && parsedValue.length > 0) {
      parsedValue = {
        value: parsedValue,
        label: parsedValue
      };
    }

    if (parsedValue === '') {
      if (multi) parsedValue = [];else parsedValue = {
        label: '',
        value: ''
      };
    }

    updateInputValue('');
    updateSelectValue(parsedValue);
  }, [value, convertValueStringToValueArrayIfNeeded, multi]);
  var loadOptions = (0, _react.useCallback)(function (search) {
    var setDefault = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var fetchResults = function fetchResults(resolve) {
      var _typeahead$key2 = typeahead.key,
          key = _typeahead$key2 === void 0 ? null : _typeahead$key2,
          _typeahead$duplicatio = typeahead.duplication,
          duplication = _typeahead$duplicatio === void 0 ? false : _typeahead$duplicatio,
          _typeahead$fieldvalue2 = typeahead.fieldvalue,
          fieldvalue = _typeahead$fieldvalue2 === void 0 ? null : _typeahead$fieldvalue2;
      var minSearchLength = isZipCode ? 3 : minChars;

      if (!key && !fieldvalue) {
        // eslint-disable-next-line
        console.error("The JSON schema representation for ".concat(name, " does not have a typeahead key or a fieldvalue. A typeahead.key is required for this field type to search for results. This can either be specified directly as config.typeahead.key or it can equal the value of another field by specifying config.typeahead.{name of field}"));
        if (setDefault === true) setDefaultOptions([]);
        return resolve({
          options: []
        });
      }

      if (search.length >= minSearchLength || search === ' ') {
        var _context4;

        if (typeof search === 'string' && (0, _trim.default)(search).call(search) !== '') search = "/".concat(encodeURIComponent(search));
        if (setDefault) reactSelect.current.setState(function () {
          return {
            isLoading: true
          };
        });
        isLoadingOptions.current = true;
        var showQueryCountOption = typeaheadOptions.queryRowCount,
            showDataArrayOption = typeaheadOptions.data,
            useStoredProcedureInSQL = typeaheadOptions.useProcedure;
        return _config.default.ajax.post((0, _concat.default)(_context4 = "/typeahead/name/".concat(encodeURIComponent(dynamicTypeaheadKey), "/search")).call(_context4, search), {
          filter: {
            conditions: conditions
          },
          queryRowCount: showQueryCountOption,

          /* Will return queryRowCount as 0 to UI, time saver for API */
          data: showDataArrayOption,

          /* Returns an empty array in the response, time saver for API */
          useProcedure: useStoredProcedureInSQL
          /* Uses Stored Procedure in backend for search */

        }).then(function (resp) {
          isLoadingOptions.current = false;
          var options = [];

          if ((0, _isArray.default)(resp.data.contains) && (0, _isArray.default)((0, _startsWith.default)(resp.data))) {
            var _context5, _context6;

            var _resp$data = resp.data,
                contains = _resp$data.contains,
                startsWith = (0, _startsWith.default)(_resp$data);
            options.push({
              label: (0, _concat.default)(_context5 = "".concat(startsWith.length, " options start with \"")).call(_context5, decodeURIComponent(search.substring(1)), "\" ..."),
              isDisabled: true
            });
            (0, _forEach.default)(startsWith).call(startsWith, function (value) {
              if (duplication) {
                value.duplication = duplication;
              }

              options.push(value);
            });
            options.push({
              label: (0, _concat.default)(_context6 = "".concat(contains.length, " options contain \"")).call(_context6, decodeURIComponent(search.substring(1)), "\" ..."),
              isDisabled: true,
              className: 'gfb-typeahead-flavor-option'
            });
            (0, _forEach.default)(contains).call(contains, function (value) {
              if (duplication) {
                value.duplication = duplication;
              }

              options.push(value);
            });
          } else {
            var _context7;

            (0, _forEach.default)(_context7 = resp.data.data).call(_context7, function (value) {
              if (duplication) {
                value.duplication = duplication;
              }

              options.push(value);
            });
          }

          if (setDefault === true) setDefaultOptions(options);else setDefaultOptions([]);
          if (setDefault) reactSelect.current.setState(function () {
            return {
              isLoading: false
            };
          });
          return resolve(options);
        }).catch(function (err) {
          isLoadingOptions.current = false;
          console.error('There was an error fetching the options in this typeahead: ', err); // eslint-disable-line

          return resolve([]);
        });
      }

      if (setDefault === true) setDefaultOptions([]);
      return resolve([]);
    };

    return new _promise.default(function (resolve) {
      clearTimeout(debounce);
      var delay = typeof search === 'string' && search.length && (0, _trim.default)(search).call(search) === '' ? 0 : 500; // if they are sending in white space as the search query, don't debounce it, just do a global generic search - JRA 03/31/2020

      debounce = (0, _setTimeout2.default)(function () {
        return fetchResults(resolve);
      }, delay);
      return debounce;
    });
  }, [typeahead, isZipCode, minChars, name, dynamicTypeaheadKey, conditions, typeaheadOptions]);
  var formatCreateLabel = (0, _react.useCallback)(function (value) {
    if (typeof createlabel === 'string') {
      var _context8;

      return (0, _concat.default)(_context8 = "".concat(createlabel, " ")).call(_context8, value);
    }

    return "Click or Tab to Create \"".concat(value, "\"");
  }, [createlabel]);
  var noOptionsMessage = (0, _react.useCallback)(function () {
    if (isZipCode) {
      return '3 Digits Required';
    }
  }, [isZipCode]);
  var handleOnMouseDown = (0, _react.useCallback)(function (e) {
    if (draggable) e.stopPropagation();
  }, [draggable]);
  var handleInputBlur = (0, _react.useCallback)(function () {
    menuIsOpen[name] && updateIsMenuOpen(_objectSpread(_objectSpread({}, menuIsOpen), {}, (0, _defineProperty2.default)({}, name, false)));
    setIsFocused(false);
    updateInputValue('');
  }, [menuIsOpen, updateIsMenuOpen, name]);
  var openMenu = (0, _react.useCallback)(function () {
    if (!readonly && !disabled && !menuIsOpen[name]) {
      updateIsMenuOpen(_objectSpread(_objectSpread({}, menuIsOpen), {}, (0, _defineProperty2.default)({}, name, true)));
    }
  }, [readonly, disabled, updateIsMenuOpen, menuIsOpen, name]);
  var setMenuOpenPosition = (0, _react.useCallback)(function () {
    var placement = fieldPosition < viewPortHeight / 2 ? 'bottom' : 'top';
    updateMenuPlacement(placement);
  }, [fieldPosition, updateMenuPlacement]);
  var setInputFieldPosition = (0, _react.useCallback)(function () {
    if (inputContainer.current) {
      var position = inputContainer.current.getBoundingClientRect().top;

      if (fieldPosition !== position) {
        updateFieldPosition(position);
      } else {
        setMenuOpenPosition();
      }
    }
  }, [setMenuOpenPosition, fieldPosition]);
  var handleInputClick = (0, _react.useCallback)(function () {
    if (!disabled && !readonly && interactive) {
      setInputFieldPosition();
    }
  }, [disabled, interactive, readonly, setInputFieldPosition]);
  var handleOnFocus = (0, _react.useCallback)(function () {
    setIsFocused(true);
    var simpleValue = typeof value.toJS === 'function' ? value.toJS() : value;
    simpleValue = (0, _typeof2.default)(simpleValue) === 'object' ? simpleValue.value || simpleValue.label || '' : simpleValue;

    if (persist && !multi) {
      // this sets the input value equal to the current value so the user can keep editing it instead of creating a new value, MP HATES the default react-select behavior - JRA 12/09/2019
      updateInputValue(simpleValue);
    }

    handleInputClick();
  }, [value, persist, multi, updateInputValue, handleInputClick]);
  (0, _react.useEffect)(function () {
    setMenuOpenPosition();
  }, [fieldPosition, setMenuOpenPosition]);
  var handleOnInputChange = (0, _react.useCallback)(function (val, e) {
    if (e.action === 'input-change') {
      !menuIsOpen[name] && openMenu();
      updateInputValue(val);

      if (typeof val === 'string' && (0, _trim.default)(val).call(val) === '') {
        loadOptions(' ', true);
      }
    } else if (e.action === 'menu-close' && !multi) {
      if (value) {
        updateInputValue('');
      }
    }
  }, [multi, menuIsOpen, name, openMenu, loadOptions, value]);
  var emptyFields = (0, _react.useCallback)(function (fields, changeHandler) {
    (0, _forEach.default)(fields).call(fields, function (field) {
      var e = {
        target: {
          name: field,
          value: ''
        }
      };
      changeHandler(e);
    });
  }, []);
  var handleSingleValueChange = (0, _react.useCallback)(function (newValue) {
    var _context9;

    (0, _forEach.default)(_context9 = (0, _keys.default)(newValue)).call(_context9, function (field) {
      var newVal = newValue[field];
      if (field === 'duplication') newVal = newValue.value;
      var id = null;
      var e = {
        target: {
          name: field,
          value: newVal,
          id: id
        }
      };

      if (field !== 'className' && field !== 'value' && field !== 'label') {
        onChange(e);
      }
    });
  }, [onChange]);
  var handleChange = (0, _react.useCallback)(function (newValue, _ref) {
    var action = _ref.action;
    var _delimit = delimit;
    if (typeof _delimit === 'string') _delimit = [_delimit];
    var _typeahead$fields = typeahead.fields,
        fields = _typeahead$fields === void 0 ? [] : _typeahead$fields;
    var target = {
      name: name,
      value: action === 'create-option' && !multi ? newValue.value : newValue
    };

    switch (action) {
      case 'select-option':
        {
          updateInputValue('');
          break;
        }

      case 'create-option':
        emptyFields(fields, onChange);
        onChange({
          target: target
        });
        return;

      case 'clear':
        {
          emptyFields(fields, onChange);
          onChange({
            target: {
              name: name,
              value: ''
            }
          });
          return;
        }

      case 'remove-value':
        {
          if (!newValue) newValue = [];
        }
    }

    if ((0, _isArray.default)(newValue)) {
      var _value = ''; // it is way too complicated to try to figure out what you want to do with a multiselect typeahead
      // so I'll give it back to the developer raw and let them figure it out -- JRA 7/5/2018

      if (stringify) {
        if (delimiter) {
          if (_delimit && (0, _isArray.default)(_delimit)) {
            var _context10;

            // if we were provided field(s) to delimit by, build up a special string with just those values
            (0, _forEach.default)(_context10 = target.value).call(_context10, function (option) {
              (0, _forEach.default)(_delimit).call(_delimit, function (field) {
                if ((0, _indexOf.default)(_value).call(_value, option[field]) === -1) {
                  _value = _value + option[field] + delimiter;
                }
              });
            });
            _value = (0, _slice.default)(_value).call(_value, 0, -1);
            target.value = _value;
          } else {
            var _context11;

            // if we are supposed to delimit these options but we don't know which field to delimit, we are going to shove the whole object in
            (0, _forEach.default)(_context11 = target.value).call(_context11, function (option) {
              _value = _value + (0, _stringify.default)(option) + delimiter;
            });
            _value = (0, _slice.default)(_value).call(_value, 0, -1);
            target.value = _value;
          }
        } else if (_delimit && !delimiter) {
          var _context12;

          // special case where they decided to delimit by some field but don't have a delimiter, we are going to build it up as a stringified array
          _value = [];
          (0, _forEach.default)(_context12 = target.value).call(_context12, function (option) {
            (0, _forEach.default)(_delimit).call(_delimit, function (field) {
              if ((0, _indexOf.default)(_value).call(_value, option[field]) === -1) {
                _value.push(option[field]);
              }
            });
          });
          _value = (0, _stringify.default)(_value);
          target.value = _value;
        } else {
          // if all we want to do is stringify the value, send it back up unmodified but stringified
          target.value = (0, _stringify.default)(target.value);
        }
      } else if (_delimit && !delimiter) {
        var _context13;

        // special case where they decided to delimit by some field but don't have a delimiter, we are going to build it up as an array
        _value = [];
        (0, _forEach.default)(_context13 = target.value).call(_context13, function (option) {
          (0, _forEach.default)(_delimit).call(_delimit, function (field) {
            if ((0, _indexOf.default)(_value).call(_value, option[field]) === -1) {
              _value.push(option[field]);
            }
          });
        });
        target.value = _value;
      }

      onChange({
        target: target
      });
    } else {
      handleSingleValueChange(newValue);
    }

    menuIsOpen[name] && updateIsMenuOpen(_objectSpread(_objectSpread({}, menuIsOpen), {}, (0, _defineProperty2.default)({}, name, false))); // closes menu when new option gets selected

    updateInputValue('');
  }, [delimit, delimiter, emptyFields, handleSingleValueChange, multi, name, onChange, stringify, typeahead, menuIsOpen]);
  var handleOnKeyDown = (0, _react.useCallback)(function (e) {
    // if the user presses tab before the loaded options come back the default behavior is to tab to the next field and do nothing
    // this will capture that tab event and treat it like a create-option was selected - JRA 02/13/2020
    if (e.keyCode === 9 && allowcreate && inputValue) {
      if (isLoadingOptions.current) {
        handleChange({
          value: inputValue
        }, {
          action: 'create-option'
        });
      }
    }

    if (e.keyCode === 32) {
      // if key is spacebar, prevent what react select is trying to do with it and just let them enter a whitespace - JRA 02/05/2020
      e.preventDefault();
      handleOnInputChange(inputValue + ' ', {
        action: 'input-change'
      });
    }

    onKeyDown();
  }, [onKeyDown, handleChange, allowcreate, inputValue, handleOnInputChange]);
  var closeMenuOnScroll = (0, _react.useCallback)(function (e) {
    var menuOpenState = false;

    if (e && e.target && e.target.classList) {
      menuOpenState = (e.target.classList.contains('gfb-input__menu-list') || e.target.classList.contains('gfb-input__control')) && menuIsOpen[name];
    }

    updateIsMenuOpen(_objectSpread(_objectSpread({}, menuIsOpen), {}, (0, _defineProperty2.default)({}, name, menuOpenState)));
  }, [menuIsOpen, name, updateIsMenuOpen]);
  var Typeahead = input.Typeahead;
  var className = 'gfb-input-inner';
  if (!interactive) className = className + ' gfb-non-interactive-input';
  var outerClass = 'gfb-input-outer';

  if (isRequiredFlag && (0, _trim.default)(_context14 = value + '').call(_context14).length === 0 && !isFocused) {
    outerClass = outerClass + ' gfb-validation-error';
  }

  if (isFocused) {
    outerClass = outerClass + ' gfb-has-focus';
  }

  return (0, _core.jsx)("div", {
    className: outerClass,
    ref: inputContainer,
    onMouseDown: handleOnFocus,
    style: inputOuter
  }, (0, _core.jsx)(TypeaheadPerformanceOptimizer, {
    Typeahead: Typeahead,
    ref: reactSelect,
    className: className,
    classNamePrefix: "gfb-input",
    closeMenuOnScroll: !_utils.isMobile ? closeMenuOnScroll : undefined,
    tabIndex: tabIndex,
    autoFocus: autofocus,
    blurInputOnSelect: true,
    isClearable: isClearable,
    createOptionPosition: "first",
    formatCreateLabel: formatCreateLabel,
    isMulti: multi,
    isDisabled: disabled || readonly || !interactive,
    menuPortalTarget: document.body,
    name: name,
    noOptionsMessage: noOptionsMessage,
    placeholder: placeholder,
    inputValue: inputValue,
    menuIsOpen: !_utils.isMobile ? menuIsOpen[name] : undefined,
    menuPlacement: !_utils.isMobile ? menuPlacement : undefined,
    onKeyDown: handleOnKeyDown,
    onMouseDown: handleOnMouseDown,
    onFocus: handleOnFocus,
    onBlur: handleInputBlur,
    onInputChange: handleOnInputChange,
    loadOptions: loadOptions,
    onChange: handleChange,
    value: selectValue,
    autoComplete: autoComplete,
    components: components,
    defaultOptions: defaultOptions,
    styles: reactSelectStyles
  }));
};

var _default = Typeahead;
exports.default = _default;
Typeahead.defaultProps = {
  onKeyDown: function onKeyDown() {
    return null;
  },
  typeahead: {},
  style: {},
  options: {}
};
Typeahead.propTypes = {
  onChange: _propTypes.default.func,
  name: _propTypes.default.string,
  label: _propTypes.default.string,
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number, _propTypes.default.array, _propTypes.default.object, _propTypes.default.bool]),
  allowcreate: _propTypes.default.bool,
  autofocus: _propTypes.default.bool,
  multi: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  readonly: _propTypes.default.bool,
  placeholder: _propTypes.default.string,
  requiredWarning: _propTypes.default.bool,
  required: _propTypes.default.bool,
  tabIndex: _propTypes.default.number,
  onKeyDown: _propTypes.default.func,
  draggable: _propTypes.default.bool,
  persist: _propTypes.default.bool,
  typeahead: _propTypes.default.object,
  minChars: _propTypes.default.number,
  values: _propTypes.default.object,
  stringify: _propTypes.default.bool,
  delimiter: _propTypes.default.string,
  delimit: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.array]),
  autoComplete: _propTypes.default.string,
  interactive: _propTypes.default.bool,
  style: _propTypes.default.object,
  isClearable: _propTypes.default.bool,
  createlabel: _propTypes.default.string,
  options: _propTypes.default.shape({
    data: _propTypes.default.bool,
    useProcedure: _propTypes.default.bool,
    queryRowCount: _propTypes.default.bool
  }),
  warning: _propTypes.default.string
};