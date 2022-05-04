import _Object$defineProperty from "@babel/runtime-corejs3/core-js-stable/object/define-property";
import _Object$defineProperties from "@babel/runtime-corejs3/core-js-stable/object/define-properties";
import _Object$getOwnPropertyDescriptors from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors";
import _Object$getOwnPropertyDescriptor from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor";
import _Object$getOwnPropertySymbols from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols";
import _sliceInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/slice";
import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _Promise from "@babel/runtime-corejs3/core-js-stable/promise";
import _startsWithInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/starts-with";
import _concatInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/concat";
import _typeof from "@babel/runtime-corejs3/helpers/esm/typeof";
import _trimInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/trim";
import _JSON$stringify from "@babel/runtime-corejs3/core-js-stable/json/stringify";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import _mapInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/map";
import _Array$isArray from "@babel/runtime-corejs3/core-js-stable/array/is-array";
import _indexOfInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/index-of";
import _forEachInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/for-each";
import _Number$MAX_SAFE_INTEGER from "@babel/runtime-corejs3/core-js-stable/number/max-safe-integer";
import _extends from "@babel/runtime-corejs3/helpers/esm/extends";
import _setTimeout from "@babel/runtime-corejs3/core-js-stable/set-timeout";
import _slicedToArray from "@babel/runtime-corejs3/helpers/esm/slicedToArray";
import _valuesInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/values";
import _classCallCheck from "@babel/runtime-corejs3/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime-corejs3/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs3/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime-corejs3/helpers/esm/inherits";
import _defineProperty from "@babel/runtime-corejs3/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); if (enumerableOnly) symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { var _context15; _forEachInstanceProperty(_context15 = ownKeys(Object(source), true)).call(_context15, function (key) { _defineProperty(target, key, source[key]); }); } else if (_Object$getOwnPropertyDescriptors) { _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)); } else { var _context16; _forEachInstanceProperty(_context16 = ownKeys(Object(source))).call(_context16, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } } return target; }

/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useState, useEffect, useCallback, useRef, PureComponent } from 'react';
import PropTypes from 'prop-types';
import Async from 'react-select/async';
import AsyncCreatable from 'react-select/async-creatable';
import { components as ReactSelectBaseComponents } from 'react-select';
import { isMobile } from '../utils';
import GFBConfig from '../config';
import ValidationErrorIcon from '../ValidationErrorIcon';
import useTheme from '../theme/useTheme';
var viewPortHeight = document.documentElement.clientHeight;
var debounce = null;
var labelCopyTimer = null;

var TypeaheadPerformanceOptimizer =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(TypeaheadPerformanceOptimizer, _PureComponent);

  function TypeaheadPerformanceOptimizer() {
    _classCallCheck(this, TypeaheadPerformanceOptimizer);

    return _possibleConstructorReturn(this, _getPrototypeOf(TypeaheadPerformanceOptimizer).apply(this, arguments));
  }

  _createClass(TypeaheadPerformanceOptimizer, [{
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
      return jsx(Typeahead, {
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
}(PureComponent);

_defineProperty(TypeaheadPerformanceOptimizer, "propTypes", {
  Typeahead: PropTypes.func,
  setRef: PropTypes.any,
  className: PropTypes.string,
  classNamePrefix: PropTypes.string,
  closeMenuOnScroll: PropTypes.func,
  tabIndex: PropTypes.number,
  autoFocus: PropTypes.bool,
  blurInputOnSelect: PropTypes.bool,
  isClearable: PropTypes.bool,
  createOptionPosition: PropTypes.string,
  formatCreateLabel: PropTypes.func,
  isMulti: PropTypes.bool,
  isDisabled: PropTypes.bool,
  menuPortalTarget: PropTypes.any,
  name: PropTypes.string,
  noOptionsMessage: PropTypes.func,
  placeholder: PropTypes.string,
  inputValue: PropTypes.string,
  menuIsOpen: PropTypes.bool,
  menuPlacement: PropTypes.string,
  onKeyDown: PropTypes.func,
  onMouseDown: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onInputChange: PropTypes.func,
  loadOptions: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.any,
  autoComplete: PropTypes.any,
  components: PropTypes.object,
  defaultOptions: PropTypes.any,
  styles: PropTypes.object
});

var Typeahead = function Typeahead(props) {
  var _context14;

  var name = props.name,
      label = props.label,
      _props$value = props.value,
      value = _props$value === void 0 ? '' : _props$value,
      values = _valuesInstanceProperty(props),
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
      typeaheadOptions = props.options;

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
    Typeahead: allowcreate ? AsyncCreatable : Async
  }),
      _useState2 = _slicedToArray(_useState, 2),
      input = _useState2[0],
      changeInput = _useState2[1];

  var _useState3 = useState(''),
      _useState4 = _slicedToArray(_useState3, 2),
      inputValue = _useState4[0],
      updateInputValue = _useState4[1];

  var _useState5 = useState(multi ? [] : {
    label: '',
    value: ''
  }),
      _useState6 = _slicedToArray(_useState5, 2),
      selectValue = _useState6[0],
      updateSelectValue = _useState6[1];

  var _useState7 = useState((label === 'papostalcode' || label === 'Zip Code') && inputValue.length <= 2),
      _useState8 = _slicedToArray(_useState7, 2),
      isZipCode = _useState8[0],
      updateIsZip = _useState8[1];

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

  var _useState17 = useState(false),
      _useState18 = _slicedToArray(_useState17, 2),
      isFocused = _useState18[0],
      setIsFocused = _useState18[1];

  var _useState19 = useState([]),
      _useState20 = _slicedToArray(_useState19, 2),
      defaultOptions = _useState20[0],
      setDefaultOptions = _useState20[1];

  var _useState21 = useState({
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

      return jsx(ReactSelectBaseComponents.Option, base);
    },
    MultiValue: function MultiValue(base) {
      var _base$children = base.children,
          children = _base$children === void 0 ? '' : _base$children;

      var _useState23 = useState(children),
          _useState24 = _slicedToArray(_useState23, 2),
          label = _useState24[0],
          setLabel = _useState24[1]; // eslint-disable-line


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
      }, jsx(ReactSelectBaseComponents.MultiValue, _extends({}, base, {
        children: label
      })));
    }
  }),
      _useState22 = _slicedToArray(_useState21, 2),
      components = _useState22[0],
      setComponents = _useState22[1];

  var _useState25 = useState(null),
      _useState26 = _slicedToArray(_useState25, 2),
      dynamicTypeaheadKey = _useState26[0],
      setDynamicTypeaheadKey = _useState26[1];

  var _useState27 = useState({}),
      _useState28 = _slicedToArray(_useState27, 2),
      conditions = _useState28[0],
      setConditions = _useState28[1];

  var _useState29 = useState({
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
    singleValue: function singleValue(base) {
      if (!interactive) {
        base.color = 'green';
      }

      return _objectSpread({}, base, {}, valueStyle, {}, valueTheme);
    },
    menuPortal: function menuPortal(base) {
      var top = menuPlacement === 'bottom' ? base.top - 8 + (_menuPortal.bottomTopBias || 0) : base.top + 8 + (_menuPortal.topTopBias || 0);
      var zIndex = _Number$MAX_SAFE_INTEGER;
      return _objectSpread({}, base, {
        top: top,
        zIndex: zIndex
      }, _menuPortal);
    }
  }),
      _useState30 = _slicedToArray(_useState29, 2),
      reactSelectStyles = _useState30[0],
      setReactSelectStyles = _useState30[1];

  var inputContainer = useRef(null);
  var reactSelect = useRef(null);
  var isLoadingOptions = useRef(false); // this is a ref and not state because it needs to be looked at in async calls and needs real time updates outside of lifecycles - JRA 02/13/2020

  useEffect(function () {
    var populateConditionObject = function populateConditionObject() {
      var _context;

      var condition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        name: null,
        comparator: null,
        values: []
      };
      if (!condition.hasOwnProperty('values')) condition.values = []; //eslint-disable-line

      var pluggedInValues = [];

      _forEachInstanceProperty(_context = _valuesInstanceProperty(condition)).call(_context, function (value) {
        var formValueForThisValueName = values.get(value, '');

        if (formValueForThisValueName && _indexOfInstanceProperty(pluggedInValues).call(pluggedInValues, formValueForThisValueName) === -1) {
          pluggedInValues.push(formValueForThisValueName);
        } else {
          pluggedInValues.push(value);
        }
      });

      var value = values.get(condition.name, '');

      if (!pluggedInValues.length && _indexOfInstanceProperty(pluggedInValues).call(pluggedInValues, value) === -1) {
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
      } else if (filter.hasOwnProperty('conditions') && _Array$isArray(filter.conditions)) {
        var _context2;

        _mapInstanceProperty(_context2 = filter.conditions).call(_context2, function (condition) {
          return populateFilterBody(condition);
        });
      }

      return filter;
    };

    var _typeahead$filter = _filterInstanceProperty(typeahead),
        filter = _typeahead$filter === void 0 ? {} : _typeahead$filter;

    if (typeof filter === 'function') filter = filter();
    filter = JSON.parse(_JSON$stringify(filter)); // deep clone the object as to not mutate the definition

    filter = populateFilterBody(filter);

    if (_JSON$stringify(filter) !== _JSON$stringify(conditions)) {
      setConditions(filter);
    }
  }, [values, typeahead, conditions]);
  useEffect(function () {
    var _typeahead$key = typeahead.key,
        key = _typeahead$key === void 0 ? null : _typeahead$key,
        _typeahead$fieldvalue = typeahead.fieldvalue,
        fieldvalue = _typeahead$fieldvalue === void 0 ? null : _typeahead$fieldvalue;
    if (values.get(fieldvalue, '')) key = values.get(fieldvalue, '');
    setDynamicTypeaheadKey(key);
  }, [typeahead, values]);
  useEffect(function () {
    setReactSelectStyles({
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
      singleValue: function singleValue(base) {
        if (!interactive) {
          base.color = 'green';
        }

        return _objectSpread({}, base, {}, valueStyle, {}, valueTheme);
      },
      menuPortal: function menuPortal(base) {
        var top = menuPlacement === 'bottom' ? base.top - 8 + (_menuPortal.bottomTopBias || 0) : base.top + 8 + (_menuPortal.topTopBias || 0);
        var zIndex = _Number$MAX_SAFE_INTEGER;
        return _objectSpread({}, base, {
          top: top,
          zIndex: zIndex
        }, _menuPortal);
      }
    }); // going to ignore dynamic style changes for the time being - JRA 07/31/2020
  }, [// eslint-disable-line
  interactive, menuPlacement]);
  useEffect(function () {
    var _context3;

    if (isRequiredFlag && _trimInstanceProperty(_context3 = value + '').call(_context3).length === 0 && !isFocused) {
      if (!components.showValidationError) {
        // if it already is showing validation error, don't needlessly update state, this will cause an infinite loop
        setComponents(_objectSpread({}, components, {
          DropdownIndicator: function DropdownIndicator() {
            return jsx(ValidationErrorIcon, {
              message: "This Field is Required"
            });
          },
          showValidationError: true
        }));
      }
    } else if (components.showValidationError) {
      setComponents(_objectSpread({}, components, {
        showValidationError: false,
        DropdownIndicator: ReactSelectBaseComponents.DropdownIndicator
      }));
    }
  }, [isRequiredFlag, value, isFocused, components]);
  useEffect(function () {
    changeInput({
      Typeahead: allowcreate ? AsyncCreatable : Async
    });
  }, [allowcreate, changeInput]);
  useEffect(function () {
    updateIsZip((label === 'papostalcode' || label === 'Zip Code') && inputValue.length <= 2);
  }, [label, inputValue, updateIsZip]);
  useEffect(function () {
    updateIsRequiredFlag(required && requiredWarning && !value.length);
  }, [updateIsRequiredFlag, required, requiredWarning, value]);
  var convertValueStringToValueArrayIfNeeded = useCallback(function (value) {
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
        value = _mapInstanceProperty(value).call(value, function (option) {
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
  useEffect(function () {
    var parsedValue = value && typeof value.toJS === 'function' ? value.toJS() : value;
    parsedValue = convertValueStringToValueArrayIfNeeded(parsedValue);

    if (_Array$isArray(parsedValue) && parsedValue.length > 0) {
      parsedValue = _mapInstanceProperty(parsedValue).call(parsedValue, function (v) {
        if (_typeof(v) === 'object') return v;
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
  var loadOptions = useCallback(function (search) {
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

        if (typeof search === 'string' && _trimInstanceProperty(search).call(search) !== '') search = "/".concat(encodeURIComponent(search));
        if (setDefault) reactSelect.current.setState(function () {
          return {
            isLoading: true
          };
        });
        isLoadingOptions.current = true;
        var showQueryCountOption = typeaheadOptions.queryRowCount,
            showDataArrayOption = typeaheadOptions.data,
            useStoredProcedureInSQL = typeaheadOptions.useProcedure;
        return GFBConfig.ajax.post(_concatInstanceProperty(_context4 = "/typeahead/name/".concat(encodeURIComponent(dynamicTypeaheadKey), "/search")).call(_context4, search), {
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

          if (_Array$isArray(resp.data.contains) && _Array$isArray(_startsWithInstanceProperty(resp.data))) {
            var _context5, _context6;

            var _resp$data = resp.data,
                contains = _resp$data.contains,
                startsWith = _startsWithInstanceProperty(_resp$data);

            options.push({
              label: _concatInstanceProperty(_context5 = "".concat(startsWith.length, " options start with \"")).call(_context5, decodeURIComponent(search.substring(1)), "\" ..."),
              isDisabled: true
            });

            _forEachInstanceProperty(startsWith).call(startsWith, function (value) {
              if (duplication) {
                value.duplication = duplication;
              }

              options.push(value);
            });

            options.push({
              label: _concatInstanceProperty(_context6 = "".concat(contains.length, " options contain \"")).call(_context6, decodeURIComponent(search.substring(1)), "\" ..."),
              isDisabled: true,
              className: 'gfb-typeahead-flavor-option'
            });

            _forEachInstanceProperty(contains).call(contains, function (value) {
              if (duplication) {
                value.duplication = duplication;
              }

              options.push(value);
            });
          } else {
            var _context7;

            _forEachInstanceProperty(_context7 = resp.data.data).call(_context7, function (value) {
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
          return _Promise.reject(err);
        });
      }

      if (setDefault === true) setDefaultOptions([]);
      return resolve([]);
    };

    return new _Promise(function (resolve) {
      clearTimeout(debounce);
      var delay = typeof search === 'string' && search.length && _trimInstanceProperty(search).call(search) === '' ? 0 : 500; // if they are sending in white space as the search query, don't debounce it, just do a global generic search - JRA 03/31/2020

      debounce = _setTimeout(function () {
        return fetchResults(resolve);
      }, delay);
      return debounce;
    });
  }, [typeahead, isZipCode, minChars, name, dynamicTypeaheadKey, conditions, typeaheadOptions]);
  var formatCreateLabel = useCallback(function (value) {
    if (typeof createlabel === 'string') {
      var _context8;

      return _concatInstanceProperty(_context8 = "".concat(createlabel, " ")).call(_context8, value);
    }

    return "Click or Tab to Create \"".concat(value, "\"");
  }, [createlabel]);
  var noOptionsMessage = useCallback(function () {
    if (isZipCode) {
      return '3 Digits Required';
    }
  }, [isZipCode]);
  var handleOnMouseDown = useCallback(function (e) {
    if (draggable) e.stopPropagation();
  }, [draggable]);
  var handleInputBlur = useCallback(function () {
    menuIsOpen[name] && updateIsMenuOpen(_objectSpread({}, menuIsOpen, _defineProperty({}, name, false)));
    setIsFocused(false);
    updateInputValue('');
  }, [menuIsOpen, updateIsMenuOpen, name]);
  var openMenu = useCallback(function () {
    if (!readonly && !disabled && !menuIsOpen[name]) {
      updateIsMenuOpen(_objectSpread({}, menuIsOpen, _defineProperty({}, name, true)));
    }
  }, [readonly, disabled, updateIsMenuOpen, menuIsOpen, name]);
  var setMenuOpenPosition = useCallback(function () {
    var placement = fieldPosition < viewPortHeight / 2 ? 'bottom' : 'top';
    updateMenuPlacement(placement);
  }, [fieldPosition, updateMenuPlacement]);
  var setInputFieldPosition = useCallback(function () {
    if (inputContainer.current) {
      var position = inputContainer.current.getBoundingClientRect().top;

      if (fieldPosition !== position) {
        updateFieldPosition(position);
      } else {
        setMenuOpenPosition();
      }
    }
  }, [setMenuOpenPosition, fieldPosition]);
  var handleInputClick = useCallback(function () {
    if (!disabled && !readonly && interactive) {
      setInputFieldPosition();
    }
  }, [disabled, interactive, readonly, setInputFieldPosition]);
  var handleOnFocus = useCallback(function () {
    setIsFocused(true);
    var simpleValue = typeof value.toJS === 'function' ? value.toJS() : value;
    simpleValue = _typeof(simpleValue) === 'object' ? simpleValue.value || simpleValue.label || '' : simpleValue;

    if (persist && !multi) {
      // this sets the input value equal to the current value so the user can keep editing it instead of creating a new value, MP HATES the default react-select behavior - JRA 12/09/2019
      updateInputValue(simpleValue);
    }

    handleInputClick();
  }, [value, persist, multi, updateInputValue, handleInputClick]);
  useEffect(function () {
    setMenuOpenPosition();
  }, [fieldPosition, setMenuOpenPosition]);
  var handleOnInputChange = useCallback(function (val, e) {
    if (e.action === 'input-change') {
      !menuIsOpen[name] && openMenu();
      updateInputValue(val);

      if (typeof val === 'string' && _trimInstanceProperty(val).call(val) === '') {
        loadOptions(' ', true);
      }
    } else if (e.action === 'menu-close' && !multi) {
      if (value) {
        updateInputValue('');
      }
    }
  }, [multi, menuIsOpen, name, openMenu, loadOptions, value]);
  var emptyFields = useCallback(function (fields, changeHandler) {
    _forEachInstanceProperty(fields).call(fields, function (field) {
      var e = {
        target: {
          name: field,
          value: ''
        }
      };
      changeHandler(e);
    });
  }, []);
  var handleSingleValueChange = useCallback(function (newValue) {
    var _context9;

    _forEachInstanceProperty(_context9 = _Object$keys(newValue)).call(_context9, function (field) {
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
  var handleChange = useCallback(function (newValue, _ref) {
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

    if (_Array$isArray(newValue)) {
      var _value = ''; // it is way too complicated to try to figure out what you want to do with a multiselect typeahead
      // so I'll give it back to the developer raw and let them figure it out -- JRA 7/5/2018

      if (stringify) {
        if (delimiter) {
          if (_delimit && _Array$isArray(_delimit)) {
            var _context10;

            // if we were provided field(s) to delimit by, build up a special string with just those values
            _forEachInstanceProperty(_context10 = target.value).call(_context10, function (option) {
              _forEachInstanceProperty(_delimit).call(_delimit, function (field) {
                if (_indexOfInstanceProperty(_value).call(_value, option[field]) === -1) {
                  _value = _value + option[field] + delimiter;
                }
              });
            });

            _value = _sliceInstanceProperty(_value).call(_value, 0, -1);
            target.value = _value;
          } else {
            var _context11;

            // if we are supposed to delimit these options but we don't know which field to delimit, we are going to shove the whole object in
            _forEachInstanceProperty(_context11 = target.value).call(_context11, function (option) {
              _value = _value + _JSON$stringify(option) + delimiter;
            });

            _value = _sliceInstanceProperty(_value).call(_value, 0, -1);
            target.value = _value;
          }
        } else if (_delimit && !delimiter) {
          var _context12;

          // special case where they decided to delimit by some field but don't have a delimiter, we are going to build it up as a stringified array
          _value = [];

          _forEachInstanceProperty(_context12 = target.value).call(_context12, function (option) {
            _forEachInstanceProperty(_delimit).call(_delimit, function (field) {
              if (_indexOfInstanceProperty(_value).call(_value, option[field]) === -1) {
                _value.push(option[field]);
              }
            });
          });

          _value = _JSON$stringify(_value);
          target.value = _value;
        } else {
          // if all we want to do is stringify the value, send it back up unmodified but stringified
          target.value = _JSON$stringify(target.value);
        }
      } else if (_delimit && !delimiter) {
        var _context13;

        // special case where they decided to delimit by some field but don't have a delimiter, we are going to build it up as an array
        _value = [];

        _forEachInstanceProperty(_context13 = target.value).call(_context13, function (option) {
          _forEachInstanceProperty(_delimit).call(_delimit, function (field) {
            if (_indexOfInstanceProperty(_value).call(_value, option[field]) === -1) {
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

    menuIsOpen[name] && updateIsMenuOpen(_objectSpread({}, menuIsOpen, _defineProperty({}, name, false))); // closes menu when new option gets selected

    updateInputValue('');
  }, [delimit, delimiter, emptyFields, handleSingleValueChange, multi, name, onChange, stringify, typeahead, menuIsOpen]);
  var handleOnKeyDown = useCallback(function (e) {
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
  var closeMenuOnScroll = useCallback(function (e) {
    var menuOpenState = false;

    if (e && e.target && e.target.classList) {
      menuOpenState = e.target.classList.contains('gfb-input__menu-list') && menuIsOpen[name];
    }

    updateIsMenuOpen(_objectSpread({}, menuIsOpen, _defineProperty({}, name, menuOpenState)));
  }, [menuIsOpen, name, updateIsMenuOpen]);
  var Typeahead = input.Typeahead;
  var className = 'gfb-input-inner';
  if (!interactive) className = className + ' gfb-non-interactive-input';
  var outerClass = 'gfb-input-outer';

  if (isRequiredFlag && _trimInstanceProperty(_context14 = value + '').call(_context14).length === 0 && !isFocused) {
    outerClass = outerClass + ' gfb-validation-error';
  }

  if (isFocused) {
    outerClass = outerClass + ' gfb-has-focus';
  }

  return jsx("div", {
    className: outerClass,
    ref: inputContainer,
    onMouseDown: handleOnFocus,
    style: inputOuter
  }, jsx(TypeaheadPerformanceOptimizer, {
    Typeahead: Typeahead,
    ref: reactSelect,
    className: className,
    classNamePrefix: "gfb-input",
    closeMenuOnScroll: !isMobile ? closeMenuOnScroll : undefined,
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
    menuIsOpen: !isMobile ? menuIsOpen[name] : undefined,
    menuPlacement: !isMobile ? menuPlacement : undefined,
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

export default Typeahead;
Typeahead.defaultProps = {
  onKeyDown: function onKeyDown() {
    return null;
  },
  typeahead: {},
  style: {},
  options: {}
};
Typeahead.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object, PropTypes.bool]),
  allowcreate: PropTypes.bool,
  autofocus: PropTypes.bool,
  multi: PropTypes.bool,
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  placeholder: PropTypes.string,
  requiredWarning: PropTypes.bool,
  required: PropTypes.bool,
  tabIndex: PropTypes.number,
  onKeyDown: PropTypes.func,
  draggable: PropTypes.bool,
  persist: PropTypes.bool,
  typeahead: PropTypes.object,
  minChars: PropTypes.number,
  values: PropTypes.object,
  stringify: PropTypes.bool,
  delimiter: PropTypes.string,
  delimit: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  autoComplete: PropTypes.string,
  interactive: PropTypes.bool,
  style: PropTypes.object,
  isClearable: PropTypes.bool,
  createlabel: PropTypes.string,
  options: PropTypes.shape({
    data: PropTypes.bool,
    useProcedure: PropTypes.bool,
    queryRowCount: PropTypes.bool
  })
};