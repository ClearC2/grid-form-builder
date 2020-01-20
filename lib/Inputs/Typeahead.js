'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _async = require('react-select/async');

var _async2 = _interopRequireDefault(_async);

var _asyncCreatable = require('react-select/async-creatable');

var _asyncCreatable2 = _interopRequireDefault(_asyncCreatable);

var _utils = require('../utils');

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _ValidationErrorIcon = require('../ValidationErrorIcon');

var _ValidationErrorIcon2 = _interopRequireDefault(_ValidationErrorIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var viewPortHeight = document.documentElement.clientHeight;

var Typeahead = function Typeahead(props) {
  var name = props.name,
      label = props.label,
      _props$value = props.value,
      value = _props$value === undefined ? '' : _props$value,
      values = props.values,
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
      onKeyDown = _props$onKeyDown === undefined ? function () {
    return null;
  } : _props$onKeyDown,
      draggable = props.draggable,
      _props$persist = props.persist,
      persist = _props$persist === undefined ? true : _props$persist,
      _props$typeahead = props.typeahead,
      typeahead = _props$typeahead === undefined ? {} : _props$typeahead,
      _props$minChars = props.minChars,
      minChars = _props$minChars === undefined ? 1 : _props$minChars,
      stringify = props.stringify,
      autoComplete = props.autoComplete,
      _props$interactive = props.interactive,
      interactive = _props$interactive === undefined ? true : _props$interactive,
      _props$style = props.style,
      style = _props$style === undefined ? {} : _props$style;

  var _style$value = style.value,
      valueStyle = _style$value === undefined ? {} : _style$value,
      _style$inputOuter = style.inputOuter,
      inputOuter = _style$inputOuter === undefined ? {} : _style$inputOuter,
      _style$inputInner = style.inputInner,
      inputInner = _style$inputInner === undefined ? {} : _style$inputInner,
      _style$inputControl = style.inputControl,
      inputControl = _style$inputControl === undefined ? {} : _style$inputControl,
      _style$valueContainer = style.valueContainer,
      _valueContainer = _style$valueContainer === undefined ? {} : _style$valueContainer,
      _style$indicators = style.indicators,
      indicators = _style$indicators === undefined ? {} : _style$indicators,
      _style$options = style.options,
      optionsStyle = _style$options === undefined ? {} : _style$options;

  var delimit = props.delimit,
      delimiter = props.delimiter;

  var _useState = (0, _react.useState)({ Typeahead: allowcreate ? _asyncCreatable2.default : _async2.default }),
      _useState2 = _slicedToArray(_useState, 2),
      input = _useState2[0],
      changeInput = _useState2[1];

  var _useState3 = (0, _react.useState)(''),
      _useState4 = _slicedToArray(_useState3, 2),
      inputValue = _useState4[0],
      updateInputValue = _useState4[1];

  var _useState5 = (0, _react.useState)({ label: '', value: '' }),
      _useState6 = _slicedToArray(_useState5, 2),
      selectValue = _useState6[0],
      updateSelectValue = _useState6[1];

  var _useState7 = (0, _react.useState)((label === 'papostalcode' || label === 'Zip Code') && inputValue.length <= 2),
      _useState8 = _slicedToArray(_useState7, 2),
      isZipCode = _useState8[0],
      updateIsZip = _useState8[1];

  var _useState9 = (0, _react.useState)(required && requiredWarning && !value.length),
      _useState10 = _slicedToArray(_useState9, 2),
      isRequiredFlag = _useState10[0],
      updateIsRequiredFlag = _useState10[1];

  var _useState11 = (0, _react.useState)(false),
      _useState12 = _slicedToArray(_useState11, 2),
      menuIsOpen = _useState12[0],
      updateIsMenuOpen = _useState12[1];

  var _useState13 = (0, _react.useState)('bottom'),
      _useState14 = _slicedToArray(_useState13, 2),
      menuPlacement = _useState14[0],
      updateMenuPlacement = _useState14[1];

  var _useState15 = (0, _react.useState)(0),
      _useState16 = _slicedToArray(_useState15, 2),
      fieldPosition = _useState16[0],
      updateFieldPosition = _useState16[1];

  var _useState17 = (0, _react.useState)(false),
      _useState18 = _slicedToArray(_useState17, 2),
      isFocused = _useState18[0],
      setIsFocused = _useState18[1];

  var inputContainer = (0, _react.useRef)(null);

  (0, _react.useEffect)(function () {
    changeInput({ Typeahead: allowcreate ? _asyncCreatable2.default : _async2.default });
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
        value = value.map(function (option) {
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
    if (Array.isArray(parsedValue) && parsedValue.length > 0) {
      parsedValue = parsedValue.map(function (v) {
        if ((typeof v === 'undefined' ? 'undefined' : _typeof(v)) === 'object') return v;
        if (typeof v === 'string' || typeof v === 'number') return { value: v, label: v };
      });
    }
    if ((typeof parsedValue === 'string' || typeof parsedValue === 'number') && parsedValue.length > 0) {
      parsedValue = { value: parsedValue, label: parsedValue };
    }
    if (parsedValue === '') parsedValue = { label: '', value: '' };
    updateInputValue('');
    updateSelectValue(parsedValue);
  }, [value, convertValueStringToValueArrayIfNeeded]);

  var populateConditionObject = (0, _react.useCallback)(function () {
    var condition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { name: null, comparator: null, values: [] };

    if (!condition.hasOwnProperty('values')) condition.values = [];
    var value = values.get(condition.name, '');
    condition.values.push(value);
    return condition;
  }, [values]);

  var populateFilterBody = (0, _react.useCallback)(function () {
    var filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    // eslint-disable-next-line
    if (filter.hasOwnProperty('name')) {
      populateConditionObject(filter);
      // eslint-disable-next-line
    } else if (filter.hasOwnProperty('conditions') && Array.isArray(filter.conditions)) {
      filter.conditions.map(function (condition) {
        return populateFilterBody(condition);
      });
    }
    return filter;
  }, [populateConditionObject]);

  var loadOptions = (0, _react.useCallback)(function (search) {
    var _typeahead$key = typeahead.key,
        key = _typeahead$key === undefined ? null : _typeahead$key,
        _typeahead$duplicatio = typeahead.duplication,
        duplication = _typeahead$duplicatio === undefined ? false : _typeahead$duplicatio,
        _typeahead$fieldvalue = typeahead.fieldvalue,
        fieldvalue = _typeahead$fieldvalue === undefined ? null : _typeahead$fieldvalue,
        _typeahead$filter = typeahead.filter,
        filter = _typeahead$filter === undefined ? {} : _typeahead$filter;

    if (typeof filter === 'function') filter = filter();
    var minSearchLength = isZipCode ? 3 : minChars;

    if (!key && !fieldvalue) {
      // eslint-disable-next-line
      console.error('The JSON schema representation for ' + name + ' does not have a typeahead key or a fieldvalue. A typeahead.key is required for this field type to search for results. This can either be specified directly as config.typeahead.key or it can equal the value of another field by specifying config.typeahead.{name of field}');
      return Promise.resolve({ options: [] });
    }

    filter = JSON.parse(JSON.stringify(filter)); // deep clone the object as to not mutate the definition
    populateFilterBody(filter);

    if (values.get(fieldvalue, '')) key = values.get(fieldvalue, '');

    if (search.length >= minSearchLength || search === ' ') {
      if (typeof search === 'string' && search.trim() !== '') search = '/' + search;
      return _config2.default.ajax.post('/typeahead/name/' + key + '/search' + search, { filter: filter }).then(function (resp) {
        return resp.data.data.map(function (value) {
          if (duplication) {
            value.duplication = duplication;
          }
          return value;
        });
      });
    }

    return Promise.resolve({ options: [] });
  }, [typeahead, populateFilterBody, name, values, minChars, isZipCode]);

  var formatCreateLabel = (0, _react.useCallback)(function (value) {
    return 'Click or Tab to Create "' + value + '"';
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
    menuIsOpen && updateIsMenuOpen(false);
    setIsFocused(false);
  }, [menuIsOpen, updateIsMenuOpen]);

  var openMenu = (0, _react.useCallback)(function () {
    if (!readonly && !disabled && !menuIsOpen) {
      updateIsMenuOpen(true);
    }
  }, [readonly, disabled, updateIsMenuOpen, menuIsOpen]);

  var setMenuOpenPosition = (0, _react.useCallback)(function () {
    var placement = fieldPosition < viewPortHeight / 2 ? 'bottom' : 'top';
    updateMenuPlacement(placement);
  }, [fieldPosition, updateMenuPlacement]);

  var setInputFieldPosition = (0, _react.useCallback)(function () {
    var position = inputContainer.current.getBoundingClientRect().top;
    if (fieldPosition !== position) {
      updateFieldPosition(position);
    } else {
      setMenuOpenPosition();
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
    simpleValue = (typeof simpleValue === 'undefined' ? 'undefined' : _typeof(simpleValue)) === 'object' ? simpleValue.value || simpleValue.label || '' : simpleValue;
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
      !menuIsOpen && openMenu();
      updateInputValue(val);
    } else if (e.action === 'menu-close' && !multi) {
      if (value) {
        updateInputValue('');
      }
    }
  }, [menuIsOpen, openMenu, updateInputValue, multi, value]);

  var emptyFields = (0, _react.useCallback)(function (fields, changeHandler) {
    fields.forEach(function (field) {
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
    Object.keys(newValue).forEach(function (field) {
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
        fields = _typeahead$fields === undefined ? [] : _typeahead$fields;


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
        onChange({ target: target });
        return;
      case 'clear':
        {
          emptyFields(fields, onChange);
          onChange({ target: { name: name, value: '' } });
          return;
        }
    }

    var value = '';
    if (Array.isArray(newValue)) {
      // it is way too complicated to try to figure out what you want to do with a multiselect typeahead
      // so I'll give it back to the developer raw and let them figure it out -- JRA 7/5/2018
      if (stringify) {
        if (delimiter) {
          if (_delimit && Array.isArray(_delimit)) {
            // if we were provided field(s) to delimit by, build up a special string with just those values
            target.value.forEach(function (option) {
              _delimit.forEach(function (field) {
                if (value.indexOf(option[field]) === -1) {
                  value = value + option[field] + delimiter;
                }
              });
            });
            value = value.slice(0, -1);
            target.value = value;
          } else {
            // if we are supposed to delimit these options but we don't know which field to delimit, we are going to shove the whole object in
            target.value.forEach(function (option) {
              value = value + JSON.stringify(option) + delimiter;
            });
            value = value.slice(0, -1);
            target.value = value;
          }
        } else if (_delimit && !delimiter) {
          // special case where they decided to delimit by some field but don't have a delimiter, we are going to build it up as a stringified array
          value = [];
          target.value.forEach(function (option) {
            _delimit.forEach(function (field) {
              if (value.indexOf(option[field]) === -1) {
                value.push(option[field]);
              }
            });
          });
          value = JSON.stringify(value);
          target.value = value;
        } else {
          // if all we want to do is stringify the value, send it back up unmodified but stringified
          target.value = JSON.stringify(target.value);
        }
      } else if (_delimit && !delimiter) {
        // special case where they decided to delimit by some field but don't have a delimiter, we are going to build it up as an array
        value = [];
        target.value.forEach(function (option) {
          _delimit.forEach(function (field) {
            if (value.indexOf(option[field]) === -1) {
              value.push(option[field]);
            }
          });
        });
        target.value = value;
      }
      onChange({ target: target });
    } else {
      handleSingleValueChange(newValue);
    }
    menuIsOpen && updateIsMenuOpen(false); // closes menu when new option gets selected
    updateInputValue('');
  }, [delimit, delimiter, emptyFields, handleSingleValueChange, multi, name, onChange, stringify, typeahead, menuIsOpen]);

  var handleOnKeyDown = (0, _react.useCallback)(function (e) {
    // This fixes the issue where users type and tab too quickly on create fields and the value does not register in the system
    if (e.keyCode === 9 && allowcreate && inputValue) {
      handleChange({ value: inputValue }, { action: 'create-option' });
    }
    onKeyDown();
  }, [onKeyDown, handleChange, allowcreate, inputValue]);

  var Typeahead = input.Typeahead;


  var className = 'gfb-input-inner';
  if (!interactive) className = className + ' gfb-non-interactive-input';

  var outerClass = 'gfb-input-outer';
  var components = {};

  if (isRequiredFlag && (value + '').length === 0 && !isFocused) {
    outerClass = outerClass + ' gfb-validation-error';
    components.DropdownIndicator = function () {
      return _react2.default.createElement(_ValidationErrorIcon2.default, { message: 'This Field is Required' });
    };
  }

  return _react2.default.createElement(
    'div',
    { className: outerClass, ref: inputContainer, onMouseDown: handleOnFocus, style: inputOuter },
    _react2.default.createElement(Typeahead, {
      className: className,
      classNamePrefix: 'gfb-input',
      tabIndex: tabIndex,
      autofocus: autofocus,
      blurInputOnSelect: true,
      cacheOptions: true,
      isClearable: true,
      createOptionPosition: 'first',
      formatCreateLabel: formatCreateLabel,
      multi: multi,
      isDisabled: disabled || readonly || !interactive,
      menuPortalTarget: document.body,
      menuShouldBlockScroll: true,
      name: name,
      noOptionsMessage: noOptionsMessage,
      placeholder: placeholder,
      inputValue: inputValue,
      menuIsOpen: !_utils.isMobile ? menuIsOpen : undefined,
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
      styles: {
        container: function container(base) {
          return _extends({}, base, inputInner);
        },
        control: function control(base) {
          return _extends({}, base, inputControl);
        },
        valueContainer: function valueContainer(base) {
          return _extends({}, base, _valueContainer);
        },
        indicatorsContainer: function indicatorsContainer(base) {
          return _extends({}, base, indicators);
        },
        option: function option(base) {
          return _extends({}, base, optionsStyle);
        },
        multiValue: function multiValue(base) {
          if (!interactive) {
            base.color = 'green';
            base.backgroundColor = '#a6eca67a';
          } else {
            base.backgroundColor = '#8bb7ff91';
          }
          return _extends({}, base, valueStyle);
        },
        singleValue: function singleValue(base) {
          if (!interactive) {
            base.color = 'green';
          }
          return _extends({}, base, valueStyle);
        },
        menuPortal: function menuPortal(base) {
          var top = menuPlacement === 'bottom' ? base.top - 8 : base.top + 8;
          var zIndex = Number.MAX_SAFE_INTEGER;
          return _extends({}, base, { top: top, zIndex: zIndex });
        }
      }
    })
  );
};

exports.default = Typeahead;


Typeahead.propTypes = {
  onChange: _propTypes2.default.func,
  name: _propTypes2.default.string,
  label: _propTypes2.default.string,
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number, _propTypes2.default.array, _propTypes2.default.object]),
  allowcreate: _propTypes2.default.bool,
  autofocus: _propTypes2.default.bool,
  multi: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,
  readonly: _propTypes2.default.bool,
  placeholder: _propTypes2.default.string,
  requiredWarning: _propTypes2.default.bool,
  required: _propTypes2.default.bool,
  tabIndex: _propTypes2.default.number,
  onKeyDown: _propTypes2.default.func,
  draggable: _propTypes2.default.bool,
  persist: _propTypes2.default.bool,
  typeahead: _propTypes2.default.object,
  minChars: _propTypes2.default.number,
  values: _propTypes2.default.object,
  stringify: _propTypes2.default.bool,
  delimiter: _propTypes2.default.string,
  delimit: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.array]),
  autoComplete: _propTypes2.default.string,
  interactive: _propTypes2.default.bool,
  style: _propTypes2.default.object
};