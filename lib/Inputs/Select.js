'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var viewPortHeight = document.documentElement.clientHeight;

var Select = function Select(props) {
  var allowcreate = props.allowcreate,
      value = props.value,
      tabIndex = props.tabIndex,
      autofocus = props.autofocus,
      disabled = props.disabled,
      readonly = props.readonly,
      name = props.name,
      keyword = props.keyword,
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
      interactive = _props$interactive === undefined ? true : _props$interactive;
  var options = keyword.options;

  var _useState = (0, _react.useState)({ Select: allowcreate ? _creatable2.default : _reactSelect2.default }),
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

  var _useState11 = (0, _react.useState)({ label: '', value: '' }),
      _useState12 = _slicedToArray(_useState11, 2),
      selectValue = _useState12[0],
      updateSelectValue = _useState12[1];

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
  }, [menuIsOpen, updateIsMenuOpen]);

  var setInputFieldPosition = (0, _react.useCallback)(function () {
    var position = inputContainer.current.getBoundingClientRect().top;
    if (fieldPosition !== position) {
      updateFieldPosition(position);
    }
    setTimeout(openMenu); // this needs to be refactored so it actually updates with react instead of hacking around the problem - JRA 12/18/2019
  }, [openMenu, fieldPosition]);

  var handleInputClick = (0, _react.useCallback)(function () {
    if (!disabled && !readonly) {
      setInputFieldPosition();
    }
  }, [disabled, readonly, setInputFieldPosition]);

  var handleOnFocus = (0, _react.useCallback)(function () {
    handleInputClick();
  }, [handleInputClick]);

  (0, _react.useEffect)(function () {
    setMenuOpenPosition();
  }, [fieldPosition, setMenuOpenPosition]);

  (0, _react.useEffect)(function () {
    changeInput({ Select: allowcreate ? _creatable2.default : _reactSelect2.default });
  }, [allowcreate, changeInput]);

  (0, _react.useEffect)(function () {
    updateIsRequiredFlag(required && requiredWarning && !value.length);
  }, [updateIsRequiredFlag, required, requiredWarning, value]);

  (0, _react.useEffect)(function () {
    var keyMap = options.reduce(function (acc, cv) {
      acc[cv.value] = cv.label;
      return acc;
    }, {});
    updateSelectValue({ label: keyMap[value], value: value });
  }, [value, updateSelectValue, options]);

  var handleOnKeyDown = (0, _react.useCallback)(function () {
    if (!menuIsOpen) openMenu();
    onKeyDown();
  }, [onKeyDown, menuIsOpen, openMenu]);

  var handleChange = (0, _react.useCallback)(function (e) {
    onChange({
      target: {
        name: name,
        value: e === null ? '' : e.value
      }
    });
    menuIsOpen && updateIsMenuOpen(false);
  }, [onChange, name, menuIsOpen]);

  var Select = input.Select;

  return _react2.default.createElement(
    'div',
    { className: 'gfb-input-outer', ref: inputContainer, onMouseDown: handleOnFocus },
    _react2.default.createElement(Select, {
      className: 'gfb-input-inner',
      classNamePrefix: 'gfb-input',
      tabIndex: tabIndex,
      autofocus: autofocus,
      isClearable: true,
      isDisabled: disabled || readonly,
      menuPortalTarget: document.body,
      menuShouldBlockScroll: true,
      name: name,
      options: options,
      placeholder: isRequiredFlag ? '* This Field Is Required' : placeholder,
      onFocus: handleOnFocus,
      onKeyDown: handleOnKeyDown,
      onBlur: handleInputBlur,
      menuIsOpen: !_utils.isMobile ? menuIsOpen : undefined,
      menuPlacement: !_utils.isMobile ? menuPlacement : undefined,
      value: selectValue,
      defaultValue: selectValue,
      onChange: handleChange,
      autoComplete: autoComplete,
      styles: {
        menuPortal: function menuPortal(base) {
          var top = menuPlacement === 'bottom' ? base.top - 28 : base.top - 12;
          return _extends({}, base, { top: top });
        }
      }
    })
  );
};

exports.default = Select;


Select.propTypes = {
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
  interactive: _propTypes2.default.bool
};