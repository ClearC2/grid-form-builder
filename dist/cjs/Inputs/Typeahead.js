"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty2 = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty2(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/define-property"));

var _defineProperties = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/define-properties"));

var _getOwnPropertyDescriptors = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors"));

var _getOwnPropertyDescriptor = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor"));

var _getOwnPropertySymbols = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols"));

var _maxSafeInteger = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/number/max-safe-integer"));

var _slice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/slice"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/keys"));

var _defineProperty3 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));

var _trim = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/trim"));

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/json/stringify"));

var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/promise"));

var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/filter"));

var _indexOf = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/index-of"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/typeof"));

var _isArray = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/array/is-array"));

var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));

var _values = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/values"));

var _core = require("@emotion/core");

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _async = _interopRequireDefault(require("react-select/async"));

var _asyncCreatable = _interopRequireDefault(require("react-select/async-creatable"));

var _utils = require("../utils");

var _config = _interopRequireDefault(require("../config"));

var _ValidationErrorIcon = _interopRequireDefault(require("../ValidationErrorIcon"));

var _useTheme2 = _interopRequireDefault(require("../theme/useTheme"));

function ownKeys(object, enumerableOnly) { var keys = (0, _keys.default)(object); if (_getOwnPropertySymbols.default) { var symbols = (0, _getOwnPropertySymbols.default)(object); if (enumerableOnly) symbols = (0, _filter.default)(symbols).call(symbols, function (sym) { return (0, _getOwnPropertyDescriptor.default)(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { var _context10; (0, _forEach.default)(_context10 = ownKeys(Object(source), true)).call(_context10, function (key) { (0, _defineProperty3.default)(target, key, source[key]); }); } else if (_getOwnPropertyDescriptors.default) { (0, _defineProperties.default)(target, (0, _getOwnPropertyDescriptors.default)(source)); } else { var _context11; (0, _forEach.default)(_context11 = ownKeys(Object(source))).call(_context11, function (key) { (0, _defineProperty2.default)(target, key, (0, _getOwnPropertyDescriptor.default)(source, key)); }); } } return target; }

var viewPortHeight = document.documentElement.clientHeight;

var Typeahead = function Typeahead(props) {
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
      _props$onKeyDown = props.onKeyDown,
      onKeyDown = _props$onKeyDown === void 0 ? function () {
    return null;
  } : _props$onKeyDown,
      draggable = props.draggable,
      _props$persist = props.persist,
      persist = _props$persist === void 0 ? true : _props$persist,
      _props$typeahead = props.typeahead,
      typeahead = _props$typeahead === void 0 ? {} : _props$typeahead,
      _props$minChars = props.minChars,
      minChars = _props$minChars === void 0 ? 1 : _props$minChars,
      stringify = props.stringify,
      autoComplete = props.autoComplete,
      _props$interactive = props.interactive,
      interactive = _props$interactive === void 0 ? true : _props$interactive,
      _props$style = props.style,
      style = _props$style === void 0 ? {} : _props$style,
      delimit = props.delimit,
      delimiter = props.delimiter,
      _props$isClearable = props.isClearable,
      isClearable = _props$isClearable === void 0 ? true : _props$isClearable;

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

  var inputContainer = (0, _react.useRef)(null);
  var reactSelect = (0, _react.useRef)(null);
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
  var populateConditionObject = (0, _react.useCallback)(function () {
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
  }, [values]);
  var populateFilterBody = (0, _react.useCallback)(function () {
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
  }, [populateConditionObject]);
  var loadOptions = (0, _react.useCallback)(function (search) {
    var setDefault = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var _typeahead$key = typeahead.key,
        key = _typeahead$key === void 0 ? null : _typeahead$key,
        _typeahead$duplicatio = typeahead.duplication,
        duplication = _typeahead$duplicatio === void 0 ? false : _typeahead$duplicatio,
        _typeahead$fieldvalue = typeahead.fieldvalue,
        fieldvalue = _typeahead$fieldvalue === void 0 ? null : _typeahead$fieldvalue,
        _typeahead$filter = (0, _filter.default)(typeahead),
        filter = _typeahead$filter === void 0 ? {} : _typeahead$filter;

    if (typeof filter === 'function') filter = filter();
    var minSearchLength = isZipCode ? 3 : minChars;

    if (!key && !fieldvalue) {
      // eslint-disable-next-line
      console.error("The JSON schema representation for ".concat(name, " does not have a typeahead key or a fieldvalue. A typeahead.key is required for this field type to search for results. This can either be specified directly as config.typeahead.key or it can equal the value of another field by specifying config.typeahead.{name of field}"));
      if (setDefault === true) setDefaultOptions([]);
      return _promise.default.resolve({
        options: []
      });
    }

    filter = JSON.parse((0, _stringify.default)(filter)); // deep clone the object as to not mutate the definition

    populateFilterBody(filter);
    if (values.get(fieldvalue, '')) key = values.get(fieldvalue, '');

    if (search.length >= minSearchLength || search === ' ') {
      var _context3;

      if (typeof search === 'string' && (0, _trim.default)(search).call(search) !== '') search = "/".concat(search);
      if (setDefault) reactSelect.current.setState(function () {
        return {
          isLoading: true
        };
      });
      return _config.default.ajax.post((0, _concat.default)(_context3 = "/typeahead/name/".concat(key, "/search")).call(_context3, search), {
        filter: filter
      }).then(function (resp) {
        var _context4;

        var options = (0, _map.default)(_context4 = resp.data.data).call(_context4, function (value) {
          if (duplication) {
            value.duplication = duplication;
          }

          return value;
        });
        if (setDefault === true) setDefaultOptions(options);else setDefaultOptions([]);
        if (setDefault) reactSelect.current.setState(function () {
          return {
            isLoading: false
          };
        });
        return options;
      });
    }

    if (setDefault === true) setDefaultOptions([]);
    return _promise.default.resolve([]);
  }, [typeahead, populateFilterBody, name, values, minChars, isZipCode]);
  var formatCreateLabel = (0, _react.useCallback)(function (value) {
    return "Click or Tab to Create \"".concat(value, "\"");
  }, []);
  var noOptionsMessage = (0, _react.useCallback)(function () {
    if (isZipCode) {
      return '3 Digits Required';
    }
  }, [isZipCode]);
  var handleOnMouseDown = (0, _react.useCallback)(function (e) {
    if (draggable) e.stopPropagation();
  }, [draggable]);
  var handleInputBlur = (0, _react.useCallback)(function () {
    menuIsOpen[name] && updateIsMenuOpen(_objectSpread({}, menuIsOpen, (0, _defineProperty3.default)({}, name, false)));
    setIsFocused(false);
  }, [menuIsOpen, updateIsMenuOpen, name]);
  var openMenu = (0, _react.useCallback)(function () {
    if (!readonly && !disabled && !menuIsOpen[name]) {
      updateIsMenuOpen(_objectSpread({}, menuIsOpen, (0, _defineProperty3.default)({}, name, true)));
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
    var _context5;

    (0, _forEach.default)(_context5 = (0, _keys.default)(newValue)).call(_context5, function (field) {
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

      if (values.get(field) !== newVal && field !== 'className' && field !== 'value' && field !== 'label') {
        onChange(e);
      }
    });
  }, [values, onChange]);
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
    }

    if ((0, _isArray.default)(newValue)) {
      var _value = ''; // it is way too complicated to try to figure out what you want to do with a multiselect typeahead
      // so I'll give it back to the developer raw and let them figure it out -- JRA 7/5/2018

      if (stringify) {
        if (delimiter) {
          if (_delimit && (0, _isArray.default)(_delimit)) {
            var _context6;

            // if we were provided field(s) to delimit by, build up a special string with just those values
            (0, _forEach.default)(_context6 = target.value).call(_context6, function (option) {
              (0, _forEach.default)(_delimit).call(_delimit, function (field) {
                if ((0, _indexOf.default)(_value).call(_value, option[field]) === -1) {
                  _value = _value + option[field] + delimiter;
                }
              });
            });
            _value = (0, _slice.default)(_value).call(_value, 0, -1);
            target.value = _value;
          } else {
            var _context7;

            // if we are supposed to delimit these options but we don't know which field to delimit, we are going to shove the whole object in
            (0, _forEach.default)(_context7 = target.value).call(_context7, function (option) {
              _value = _value + (0, _stringify.default)(option) + delimiter;
            });
            _value = (0, _slice.default)(_value).call(_value, 0, -1);
            target.value = _value;
          }
        } else if (_delimit && !delimiter) {
          var _context8;

          // special case where they decided to delimit by some field but don't have a delimiter, we are going to build it up as a stringified array
          _value = [];
          (0, _forEach.default)(_context8 = target.value).call(_context8, function (option) {
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
        var _context9;

        // special case where they decided to delimit by some field but don't have a delimiter, we are going to build it up as an array
        _value = [];
        (0, _forEach.default)(_context9 = target.value).call(_context9, function (option) {
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

    menuIsOpen[name] && updateIsMenuOpen(_objectSpread({}, menuIsOpen, (0, _defineProperty3.default)({}, name, false))); // closes menu when new option gets selected

    updateInputValue('');
  }, [delimit, delimiter, emptyFields, handleSingleValueChange, multi, name, onChange, stringify, typeahead, menuIsOpen]);
  var handleOnKeyDown = (0, _react.useCallback)(function (e) {
    // This fixes the issue where users type and tab too quickly on create fields and the value does not register in the system
    if (e.keyCode === 9 && allowcreate && inputValue) {
      handleChange({
        value: inputValue
      }, {
        action: 'create-option'
      });
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
      menuOpenState = e.target.classList.contains('gfb-input__menu-list') && menuIsOpen[name];
    }

    updateIsMenuOpen(_objectSpread({}, menuIsOpen, (0, _defineProperty3.default)({}, name, menuOpenState)));
  }, [menuIsOpen, name, updateIsMenuOpen]);
  var Typeahead = input.Typeahead;
  var className = 'gfb-input-inner';
  if (!interactive) className = className + ' gfb-non-interactive-input';
  var outerClass = 'gfb-input-outer';
  var components = {};

  if (isRequiredFlag && (value + '').length === 0 && !isFocused) {
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

  return (0, _core.jsx)("div", {
    className: outerClass,
    ref: inputContainer,
    onMouseDown: handleOnFocus,
    style: inputOuter
  }, (0, _core.jsx)(Typeahead, {
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
      singleValue: function singleValue(base) {
        if (!interactive) {
          base.color = 'green';
        }

        return _objectSpread({}, base, {}, valueStyle, {}, valueTheme);
      },
      menuPortal: function menuPortal(base) {
        var top = menuPlacement === 'bottom' ? base.top - 8 : base.top + 8;
        var zIndex = _maxSafeInteger.default;
        return _objectSpread({}, base, {
          top: top,
          zIndex: zIndex
        });
      }
    }
  }));
};

var _default = Typeahead;
exports.default = _default;
Typeahead.propTypes = {
  onChange: _propTypes.default.func,
  name: _propTypes.default.string,
  label: _propTypes.default.string,
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number, _propTypes.default.array, _propTypes.default.object]),
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
  isClearable: _propTypes.default.bool
};