import _Object$defineProperty from "@babel/runtime-corejs3/core-js-stable/object/define-property";
import _Object$defineProperties from "@babel/runtime-corejs3/core-js-stable/object/define-properties";
import _Object$getOwnPropertyDescriptors from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors";
import _Object$getOwnPropertyDescriptor from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor";
import _Object$getOwnPropertySymbols from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols";
import _Number$MAX_SAFE_INTEGER from "@babel/runtime-corejs3/core-js-stable/number/max-safe-integer";
import _defineProperty from "@babel/runtime-corejs3/helpers/esm/defineProperty";
import _sliceInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/slice";
import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _concatInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/concat";
import _trimInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/trim";
import _JSON$stringify from "@babel/runtime-corejs3/core-js-stable/json/stringify";
import _Promise from "@babel/runtime-corejs3/core-js-stable/promise";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import _indexOfInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/index-of";
import _forEachInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/for-each";
import _typeof from "@babel/runtime-corejs3/helpers/esm/typeof";
import _Array$isArray from "@babel/runtime-corejs3/core-js-stable/array/is-array";
import _mapInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/map";
import _slicedToArray from "@babel/runtime-corejs3/helpers/esm/slicedToArray";
import _valuesInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/values";

function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); if (enumerableOnly) symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { var _context10; _forEachInstanceProperty(_context10 = ownKeys(Object(source), true)).call(_context10, function (key) { _defineProperty(target, key, source[key]); }); } else if (_Object$getOwnPropertyDescriptors) { _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)); } else { var _context11; _forEachInstanceProperty(_context11 = ownKeys(Object(source))).call(_context11, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } } return target; }

/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import Async from 'react-select/async';
import AsyncCreatable from 'react-select/async-creatable';
import { isMobile } from '../utils';
import GFBConfig from '../config';
import ValidationErrorIcon from '../ValidationErrorIcon';
import useTheme from '../theme/useTheme';
var viewPortHeight = document.documentElement.clientHeight;

var Typeahead = function Typeahead(props) {
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
  var delimit = props.delimit,
      delimiter = props.delimiter;

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

  var _useState11 = useState(false),
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

  var inputContainer = useRef(null);
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
  }, [value, convertValueStringToValueArrayIfNeeded]);
  var populateConditionObject = useCallback(function () {
    var _context;

    var condition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      name: null,
      comparator: null,
      values: []
    };
    if (!condition.hasOwnProperty('values')) condition.values = [];
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
  }, [values]);
  var populateFilterBody = useCallback(function () {
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
  }, [populateConditionObject]);
  var loadOptions = useCallback(function (search) {
    var _typeahead$key = typeahead.key,
        key = _typeahead$key === void 0 ? null : _typeahead$key,
        _typeahead$duplicatio = typeahead.duplication,
        duplication = _typeahead$duplicatio === void 0 ? false : _typeahead$duplicatio,
        _typeahead$fieldvalue = typeahead.fieldvalue,
        fieldvalue = _typeahead$fieldvalue === void 0 ? null : _typeahead$fieldvalue,
        _typeahead$filter = _filterInstanceProperty(typeahead),
        filter = _typeahead$filter === void 0 ? {} : _typeahead$filter;

    if (typeof filter === 'function') filter = filter();
    var minSearchLength = isZipCode ? 3 : minChars;

    if (!key && !fieldvalue) {
      // eslint-disable-next-line
      console.error("The JSON schema representation for ".concat(name, " does not have a typeahead key or a fieldvalue. A typeahead.key is required for this field type to search for results. This can either be specified directly as config.typeahead.key or it can equal the value of another field by specifying config.typeahead.{name of field}"));
      return _Promise.resolve({
        options: []
      });
    }

    filter = JSON.parse(_JSON$stringify(filter)); // deep clone the object as to not mutate the definition

    populateFilterBody(filter);
    if (values.get(fieldvalue, '')) key = values.get(fieldvalue, '');

    if (search.length >= minSearchLength || search === ' ') {
      var _context3;

      if (typeof search === 'string' && _trimInstanceProperty(search).call(search) !== '') search = "/".concat(search);
      return GFBConfig.ajax.post(_concatInstanceProperty(_context3 = "/typeahead/name/".concat(key, "/search")).call(_context3, search), {
        filter: filter
      }).then(function (resp) {
        var _context4;

        return _mapInstanceProperty(_context4 = resp.data.data).call(_context4, function (value) {
          if (duplication) {
            value.duplication = duplication;
          }

          return value;
        });
      });
    }

    return _Promise.resolve([]);
  }, [typeahead, populateFilterBody, name, values, minChars, isZipCode]);
  var formatCreateLabel = useCallback(function (value) {
    return "Click or Tab to Create \"".concat(value, "\"");
  }, []);
  var noOptionsMessage = useCallback(function () {
    if (isZipCode) {
      return '3 Digits Required';
    }
  }, [isZipCode]);
  var handleOnMouseDown = useCallback(function (e) {
    if (draggable) e.stopPropagation();
  }, [draggable]);
  var handleInputBlur = useCallback(function () {
    menuIsOpen && updateIsMenuOpen(false);
    setIsFocused(false);
  }, [menuIsOpen, updateIsMenuOpen]);
  var openMenu = useCallback(function () {
    if (!readonly && !disabled && !menuIsOpen) {
      updateIsMenuOpen(true);
    }
  }, [readonly, disabled, updateIsMenuOpen, menuIsOpen]);
  var setMenuOpenPosition = useCallback(function () {
    var placement = fieldPosition < viewPortHeight / 2 ? 'bottom' : 'top';
    updateMenuPlacement(placement);
  }, [fieldPosition, updateMenuPlacement]);
  var setInputFieldPosition = useCallback(function () {
    var position = inputContainer.current.getBoundingClientRect().top;

    if (fieldPosition !== position) {
      updateFieldPosition(position);
    } else {
      setMenuOpenPosition();
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
      !menuIsOpen && openMenu();
      updateInputValue(val);
    } else if (e.action === 'menu-close' && !multi) {
      if (value) {
        updateInputValue('');
      }
    }
  }, [menuIsOpen, openMenu, updateInputValue, multi, value]);
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
    var _context5;

    _forEachInstanceProperty(_context5 = _Object$keys(newValue)).call(_context5, function (field) {
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
    }

    if (_Array$isArray(newValue)) {
      var _value = ''; // it is way too complicated to try to figure out what you want to do with a multiselect typeahead
      // so I'll give it back to the developer raw and let them figure it out -- JRA 7/5/2018

      if (stringify) {
        if (delimiter) {
          if (_delimit && _Array$isArray(_delimit)) {
            var _context6;

            // if we were provided field(s) to delimit by, build up a special string with just those values
            _forEachInstanceProperty(_context6 = target.value).call(_context6, function (option) {
              _forEachInstanceProperty(_delimit).call(_delimit, function (field) {
                if (_indexOfInstanceProperty(_value).call(_value, option[field]) === -1) {
                  _value = _value + option[field] + delimiter;
                }
              });
            });

            _value = _sliceInstanceProperty(_value).call(_value, 0, -1);
            target.value = _value;
          } else {
            var _context7;

            // if we are supposed to delimit these options but we don't know which field to delimit, we are going to shove the whole object in
            _forEachInstanceProperty(_context7 = target.value).call(_context7, function (option) {
              _value = _value + _JSON$stringify(option) + delimiter;
            });

            _value = _sliceInstanceProperty(_value).call(_value, 0, -1);
            target.value = _value;
          }
        } else if (_delimit && !delimiter) {
          var _context8;

          // special case where they decided to delimit by some field but don't have a delimiter, we are going to build it up as a stringified array
          _value = [];

          _forEachInstanceProperty(_context8 = target.value).call(_context8, function (option) {
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
        var _context9;

        // special case where they decided to delimit by some field but don't have a delimiter, we are going to build it up as an array
        _value = [];

        _forEachInstanceProperty(_context9 = target.value).call(_context9, function (option) {
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

    menuIsOpen && updateIsMenuOpen(false); // closes menu when new option gets selected

    updateInputValue('');
  }, [delimit, delimiter, emptyFields, handleSingleValueChange, multi, name, onChange, stringify, typeahead, menuIsOpen]);
  var handleOnKeyDown = useCallback(function (e) {
    // This fixes the issue where users type and tab too quickly on create fields and the value does not register in the system
    if (e.keyCode === 9 && allowcreate && inputValue) {
      handleChange({
        value: inputValue
      }, {
        action: 'create-option'
      });
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
    style: inputOuter
  }, jsx(Typeahead, {
    className: className,
    classNamePrefix: "gfb-input",
    tabIndex: tabIndex,
    autofocus: autofocus,
    blurInputOnSelect: true,
    cacheOptions: true,
    isClearable: true,
    createOptionPosition: "first",
    formatCreateLabel: formatCreateLabel,
    isMulti: multi,
    isDisabled: disabled || readonly || !interactive,
    menuPortalTarget: document.body,
    menuShouldBlockScroll: true,
    name: name,
    noOptionsMessage: noOptionsMessage,
    placeholder: placeholder,
    inputValue: inputValue,
    menuIsOpen: !isMobile ? menuIsOpen : undefined,
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
        var zIndex = _Number$MAX_SAFE_INTEGER;
        return _objectSpread({}, base, {
          top: top,
          zIndex: zIndex
        });
      }
    }
  }));
};

<<<<<<< HEAD:lib/Inputs/Typeahead.js
__signature__(Typeahead, "useTheme{{theme}}\nuseState{[input, changeInput]({Typeahead: allowcreate ? AsyncCreatable : Async})}\nuseState{[inputValue, updateInputValue]('')}\nuseState{[selectValue, updateSelectValue](multi ? [] : {label: '', value: ''})}\nuseState{[isZipCode, updateIsZip]((label === 'papostalcode' || label === 'Zip Code') && inputValue.length <= 2)}\nuseState{[isRequiredFlag, updateIsRequiredFlag](required && requiredWarning && !value.length)}\nuseState{[menuIsOpen, updateIsMenuOpen](false)}\nuseState{[menuPlacement, updateMenuPlacement]('bottom')}\nuseState{[fieldPosition, updateFieldPosition](0)}\nuseState{[isFocused, setIsFocused](false)}\nuseRef{inputContainer}\nuseEffect{}\nuseEffect{}\nuseEffect{}\nuseCallback{convertValueStringToValueArrayIfNeeded}\nuseEffect{}\nuseCallback{populateConditionObject}\nuseCallback{populateFilterBody}\nuseCallback{loadOptions}\nuseCallback{formatCreateLabel}\nuseCallback{noOptionsMessage}\nuseCallback{handleOnMouseDown}\nuseCallback{handleInputBlur}\nuseCallback{openMenu}\nuseCallback{setMenuOpenPosition}\nuseCallback{setInputFieldPosition}\nuseCallback{handleInputClick}\nuseCallback{handleOnFocus}\nuseEffect{}\nuseCallback{handleOnInputChange}\nuseCallback{emptyFields}\nuseCallback{handleSingleValueChange}\nuseCallback{handleChange}\nuseCallback{handleOnKeyDown}", function () {
  return [useTheme];
});

var _default = Typeahead;
export default _default;
=======
export default Typeahead;
>>>>>>> aa68762e12dc6f3f09855b63bf3638f1d4b23f1b:dist/es/Inputs/Typeahead.js
Typeahead.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object]),
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
  style: PropTypes.object
<<<<<<< HEAD:lib/Inputs/Typeahead.js
};
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(viewPortHeight, "viewPortHeight", "C:\\Development\\Projects\\grid-form-builder\\src\\Inputs\\Typeahead.js");
  reactHotLoader.register(Typeahead, "Typeahead", "C:\\Development\\Projects\\grid-form-builder\\src\\Inputs\\Typeahead.js");
  reactHotLoader.register(_default, "default", "C:\\Development\\Projects\\grid-form-builder\\src\\Inputs\\Typeahead.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
=======
};
>>>>>>> aa68762e12dc6f3f09855b63bf3638f1d4b23f1b:dist/es/Inputs/Typeahead.js
