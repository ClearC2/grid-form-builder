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

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _creatable = require('react-select/creatable');

var _creatable2 = _interopRequireDefault(_creatable);

var _utils = require('../utils');

var _ValidationErrorIcon = require('../ValidationErrorIcon');

var _ValidationErrorIcon2 = _interopRequireDefault(_ValidationErrorIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var viewPortHeight = document.documentElement.clientHeight;

var Multiselect = function Multiselect(props) {
  var allowcreate = props.allowcreate,
      _props$value = props.value,
      value = _props$value === undefined ? '' : _props$value,
      tabIndex = props.tabIndex,
      autofocus = props.autofocus,
      disabled = props.disabled,
      readonly = props.readonly,
      name = props.name,
      _props$keyword = props.keyword,
      keyword = _props$keyword === undefined ? {} : _props$keyword,
      placeholder = props.placeholder,
      requiredWarning = props.requiredWarning,
      required = props.required,
      _props$onKeyDown = props.onKeyDown,
      onKeyDown = _props$onKeyDown === undefined ? function () {
    return null;
  } : _props$onKeyDown,
      onChange = props.onChange,
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

  var _useState = (0, _react.useState)({ Select: !interactive ? _creatable2.default : allowcreate ? _creatable2.default : _reactSelect2.default }),
      _useState2 = _slicedToArray(_useState, 2),
      input = _useState2[0],
      changeInput = _useState2[1];

  var _useState3 = (0, _react.useState)(required && requiredWarning && !value.length),
      _useState4 = _slicedToArray(_useState3, 2),
      isRequiredFlag = _useState4[0],
      updateIsRequiredFlag = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      menuIsOpen = _useState6[0],
      updateIsMenuOpen = _useState6[1];

  var _useState7 = (0, _react.useState)('bottom'),
      _useState8 = _slicedToArray(_useState7, 2),
      menuPlacement = _useState8[0],
      updateMenuPlacement = _useState8[1];

  var _useState9 = (0, _react.useState)(0),
      _useState10 = _slicedToArray(_useState9, 2),
      fieldPosition = _useState10[0],
      updateFieldPosition = _useState10[1];

  var _useState11 = (0, _react.useState)([]),
      _useState12 = _slicedToArray(_useState11, 2),
      selectValue = _useState12[0],
      updateSelectValue = _useState12[1];

  var _useState13 = (0, _react.useState)([]),
      _useState14 = _slicedToArray(_useState13, 2),
      options = _useState14[0],
      updateSelectOptions = _useState14[1];

  var _useState15 = (0, _react.useState)(false),
      _useState16 = _slicedToArray(_useState15, 2),
      isFocused = _useState16[0],
      setIsFocused = _useState16[1];

  var inputContainer = (0, _react.useRef)(null);

  var openMenu = (0, _react.useCallback)(function () {
    if (!readonly && !disabled && !menuIsOpen) {
      updateIsMenuOpen(true);
    }
  }, [readonly, disabled, updateIsMenuOpen, menuIsOpen]);

  var setMenuOpenPosition = (0, _react.useCallback)(function () {
    var placement = fieldPosition < viewPortHeight / 2 ? 'bottom' : 'top';
    updateMenuPlacement(placement);
  }, [fieldPosition, updateMenuPlacement]);

  var handleInputBlur = (0, _react.useCallback)(function () {
    menuIsOpen && updateIsMenuOpen(false);
    setIsFocused(false);
  }, [menuIsOpen, updateIsMenuOpen]);

  var setInputFieldPosition = (0, _react.useCallback)(function () {
    var position = inputContainer.current.getBoundingClientRect().top;
    if (fieldPosition !== position) {
      updateFieldPosition(position);
    }
    setTimeout(openMenu); // this needs to be refactored so it actually updates with react instead of hacking around the problem - JRA 12/18/2019
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

  (0, _react.useEffect)(function () {
    var formattedOptions = keyword.options || [];
    if (!formattedOptions) formattedOptions = [];
    if (typeof formattedOptions === 'string') formattedOptions = formattedOptions.split('¤');
    if (formattedOptions.toJS) formattedOptions = formattedOptions.toJS();

    var duplicate = {};
    // get rid of duplicates
    formattedOptions = formattedOptions.filter(function (option) {
      if (!option) return false;
      if (typeof option === 'string') return true;
      if ((typeof option === 'undefined' ? 'undefined' : _typeof(option)) === 'object' && !option.value) option.value = option.label;
      if (option.value && !duplicate[option.value]) {
        duplicate[option.value] = true;
        return true;
      }
    });

    // format into an array of {label, value} objects
    formattedOptions = formattedOptions.map(function (option) {
      if (typeof option === 'string') option = { label: option, value: option };
      if (!option.value) option.value = option.label;
      return option;
    });

    updateSelectOptions(formattedOptions);
  }, [keyword.options]);

  (0, _react.useEffect)(function () {
    setMenuOpenPosition();
  }, [fieldPosition, setMenuOpenPosition]);

  (0, _react.useEffect)(function () {
    changeInput({ Select: !interactive ? _creatable2.default : allowcreate ? _creatable2.default : _reactSelect2.default });
  }, [allowcreate, changeInput, interactive]);

  (0, _react.useEffect)(function () {
    updateIsRequiredFlag(required && requiredWarning && !value.length);
  }, [updateIsRequiredFlag, required, requiredWarning, value]);

  (0, _react.useEffect)(function () {
    var formattedValue = value;
    // first lets try to get this value normalized to what react-select wants, which is an array of values
    if (!formattedValue) formattedValue = [];
    if (formattedValue.toJS) formattedValue = formattedValue.toJS();
    if (typeof formattedValue === 'string') formattedValue = formattedValue.split('¤');
    if (!Array.isArray(formattedValue) && (typeof formattedValue === 'undefined' ? 'undefined' : _typeof(formattedValue)) === 'object') {
      formattedValue = Object.values(formattedValue);
    }
    if (!Array.isArray(formattedValue)) {
      console.warn('The field', name, 'is a multiselect but its value was not a valid multi value. Multivalues should be a delimited string or an array of values, but instead got', value); //eslint-disable-line
      formattedValue = [];
    }

    var duplicate = {};
    // lets filter out any blanks they may have snuck in
    formattedValue.filter(function (value) {
      if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') value = value.value; // if value is an object but does not have a value key, we are going to drop the value as well - JRA 12/19/2019
      if (!value) return false;
      if (!duplicate[value]) {
        duplicate[value] = true;
        return true;
      }
    });

    // now lets make sure each value in the array is a {label, value} object
    formattedValue = formattedValue.map(function (value) {
      if (typeof value === 'string') {
        value = { label: value, value: value };
      }
      if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && !value.label) {
        value.label = value.value;
      }
      return value;
    });

    updateSelectValue(formattedValue);
  }, [value, updateSelectValue, name]);

  var handleOnKeyDown = (0, _react.useCallback)(function () {
    if (!menuIsOpen) openMenu();
    onKeyDown();
  }, [onKeyDown, menuIsOpen, openMenu]);

  var handleChange = (0, _react.useCallback)(function (e) {
    onChange({
      target: {
        name: name,
        value: e === null ? [] : e
      }
    });
    menuIsOpen && updateIsMenuOpen(false);
  }, [onChange, name, menuIsOpen]);

  var Select = input.Select;


  var className = 'gfb-input-inner';
  if (!interactive) className = className + ' gfb-non-interactive-input';

  var outerClass = 'gfb-input-outer';
  var components = {};
  if (isRequiredFlag && value.length === 0 && !isFocused) {
    outerClass = outerClass + ' gfb-validation-error';
    components.DropdownIndicator = function () {
      return _react2.default.createElement(_ValidationErrorIcon2.default, { message: 'This Field is Required' });
    };
  }

  return _react2.default.createElement(
    'div',
    { className: outerClass, ref: inputContainer, onMouseDown: handleOnFocus, style: inputOuter },
    _react2.default.createElement(Select, {
      className: className,
      classNamePrefix: 'gfb-input',
      tabIndex: tabIndex,
      autofocus: autofocus,
      isClearable: true,
      isDisabled: disabled || readonly || !interactive,
      menuPortalTarget: document.body,
      menuShouldBlockScroll: true,
      isMulti: true,
      name: name,
      options: options,
      placeholder: placeholder,
      onFocus: handleOnFocus,
      onKeyDown: handleOnKeyDown,
      onBlur: handleInputBlur,
      menuIsOpen: !_utils.isMobile ? menuIsOpen : undefined,
      menuPlacement: !_utils.isMobile ? menuPlacement : undefined,
      value: selectValue,
      defaultValue: selectValue,
      onChange: handleChange,
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
        menuPortal: function menuPortal(base) {
          var top = menuPlacement === 'bottom' ? base.top - 28 : base.top - 12;
          return _extends({}, base, { top: top });
        }
      }
    })
  );
};

exports.default = Multiselect;


Multiselect.propTypes = {
  onChange: _propTypes2.default.func,
  name: _propTypes2.default.string,
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number, _propTypes2.default.array, _propTypes2.default.object]),
  keyword: _propTypes2.default.object,
  tabIndex: _propTypes2.default.number,
  allowcreate: _propTypes2.default.bool,
  autofocus: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,
  readonly: _propTypes2.default.bool,
  placeholder: _propTypes2.default.string,
  requiredWarning: _propTypes2.default.bool,
  required: _propTypes2.default.bool,
  values: _propTypes2.default.object,
  persist: _propTypes2.default.bool,
  onKeyDown: _propTypes2.default.func,
  autoComplete: _propTypes2.default.string,
  interactive: _propTypes2.default.bool,
  style: _propTypes2.default.object
};