'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Typeahead = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

var _reactSelect = require('react-select');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _config2 = require('../config');

var _config3 = _interopRequireDefault(_config2);

var _reactDnd = require('react-dnd');

var _reactSelectStyle = require('../react-select-style');

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var viewPortHeight = document.documentElement.clientHeight;

var Placeholder = function (_Component) {
  _inherits(Placeholder, _Component);

  function Placeholder() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Placeholder);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Placeholder.__proto__ || Object.getPrototypeOf(Placeholder)).call.apply(_ref, [this].concat(args))), _this), _this.componentDidMount = function () {
      return _this.props.handleMount();
    }, _this.render = function () {
      return null;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return Placeholder;
}(_react.Component);

Placeholder.propTypes = {
  handleMount: _propTypes2.default.func.isRequired
};

var Typeahead = exports.Typeahead = function (_Component2) {
  _inherits(Typeahead, _Component2);

  function Typeahead() {
    var _ref2;

    var _temp2, _this2, _ret2;

    _classCallCheck(this, Typeahead);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp2 = (_this2 = _possibleConstructorReturn(this, (_ref2 = Typeahead.__proto__ || Object.getPrototypeOf(Typeahead)).call.apply(_ref2, [this].concat(args))), _this2), _this2.state = {
      currentOptions: {},
      fieldPosition: 0,
      inputValue: '', // used to keep previous input in typeahead if supressInputReset is true
      menuIsOpen: false,
      menuPlacement: 'bottom',
      shouldRemount: false
    }, _this2.componentDidUpdate = function (p, s) {
      var _this2$props = _this2.props,
          didDrop = _this2$props.didDrop,
          isOver = _this2$props.isOver,
          formValues = _this2$props.formValues,
          _this2$props$config = _this2$props.config,
          config = _this2$props$config === undefined ? {} : _this2$props$config,
          _this2$props$handleOn = _this2$props.handleOnChange,
          handleOnChange = _this2$props$handleOn === undefined ? function () {
        return null;
      } : _this2$props$handleOn;

      if (didDrop && !p.didDrop && !isOver && p.isOver) {
        // if it was just previously over and dropped (this is to make this event only trigger once)
        var _this2$props2 = _this2.props,
            droppedItem = _this2$props2.droppedItem,
            handleDragDropOnInput = _this2$props2.handleDragDropOnInput,
            _this2$props2$config = _this2$props2.config,
            _config = _this2$props2$config === undefined ? {} : _this2$props2$config,
            _this2$props2$formVal = _this2$props2.formValues,
            _formValues = _this2$props2$formVal === undefined ? (0, _immutable.Map)() : _this2$props2$formVal;

        droppedItem = droppedItem === null ? null : droppedItem.widget;
        var currentValue = _formValues.get(_config.name, '');
        _config = _extends({ currentValue: currentValue }, _config);
        if (droppedItem && !p.droppedItem) {
          handleDragDropOnInput({
            source: droppedItem,
            target: _config
          });
        }
      }

      var _config$name = config.name,
          name = _config$name === undefined ? null : _config$name,
          _config$typeahead = config.typeahead,
          typeahead = _config$typeahead === undefined ? {} : _config$typeahead;
      var _typeahead$fieldvalue = typeahead.fieldvalue,
          fieldvalue = _typeahead$fieldvalue === undefined ? null : _typeahead$fieldvalue,
          _typeahead$fields = typeahead.fields,
          fields = _typeahead$fields === undefined ? [] : _typeahead$fields;

      if (fieldvalue !== null) {
        if (formValues.get(fieldvalue, '') !== p.formValues.get(fieldvalue, '')) {
          var resetValues = _defineProperty({}, name, '');
          fields.map(function (field) {
            resetValues[field] = '';
          });
          Object.keys(resetValues).forEach(function (field) {
            handleOnChange({
              target: {
                name: field,
                value: resetValues[field]
              }
            });
          });
        }
      }

      if (formValues.get(config.name) !== p.formValues.get(config.name) && !config.multi) {
        _this2.setState({ inputValue: formValues.get(config.name) });
      }

      if (s.fieldPosition !== _this2.state.fieldPosition) {
        _this2.setMenuOpenPosition();
      }
    }, _this2.handleAnywhereClick = function (e) {
      var _this2$props3 = _this2.props,
          _this2$props3$handleA = _this2$props3.handleAnywhereClick,
          handleAnywhereClick = _this2$props3$handleA === undefined ? function () {
        return null;
      } : _this2$props3$handleA,
          _this2$props3$formVal = _this2$props3.formValues,
          formValues = _this2$props3$formVal === undefined ? (0, _immutable.Map)() : _this2$props3$formVal;
      var _this2$props$config2 = _this2.props.config,
          config = _this2$props$config2 === undefined ? {} : _this2$props$config2;

      var currentValue = formValues.get(config.name, '');
      config = _extends({ currentValue: currentValue }, config);
      if (!config.disabled) {
        handleAnywhereClick(config, e);
      }
    }, _this2.onMouseOut = function () {
      _this2.setState({
        menuPlacement: 'top',
        menuIsOpen: false
      });
    }, _this2.handleCascadeKeywordClick = function (e) {
      var _this2$props4 = _this2.props,
          _this2$props4$handleC = _this2$props4.handleCascadeKeywordClick,
          handleCascadeKeywordClick = _this2$props4$handleC === undefined ? function () {
        return null;
      } : _this2$props4$handleC,
          _this2$props4$formVal = _this2$props4.formValues,
          formValues = _this2$props4$formVal === undefined ? (0, _immutable.Map)() : _this2$props4$formVal;
      var _this2$props$config3 = _this2.props.config,
          config = _this2$props$config3 === undefined ? {} : _this2$props$config3;

      var currentValue = formValues.get(config.name, '');
      config = _extends({ currentValue: currentValue }, config);
      handleCascadeKeywordClick(config);
    }, _this2.onMouseDown = function (e) {
      if (_this2.props.draggable) e.stopPropagation();
    }, _this2.setShouldRemount = function () {
      var shouldRemount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      return _this2.setState({ shouldRemount: shouldRemount });
    }, _this2.emptyFields = function (fields, changeHandler) {
      fields.forEach(function (field) {
        var e = {
          target: {
            name: field,
            value: ''
          }
        };
        changeHandler(e);
      });
    }, _this2.onInputChange = function (val, e) {
      var multi = _this2.props.config.multi;

      _this2.openMenu();
      if (e.action === 'input-change') {
        _this2.setState({ inputValue: val });
      } else if (e.action === 'menu-close' && !multi) {
        if (_this2.props.formValues.get(_this2.props.config.name)) {
          _this2.setState({ inputValue: _this2.props.formValues.get(_this2.props.config.name) });
        }
      }
    }, _this2.handleChange = function (newValue, _ref3) {
      var action = _ref3.action;
      var _this2$props5 = _this2.props,
          handleOnChange = _this2$props5.handleOnChange,
          _this2$props5$config = _this2$props5.config,
          config = _this2$props5$config === undefined ? {} : _this2$props5$config;
      var _config$name2 = config.name,
          name = _config$name2 === undefined ? null : _config$name2,
          _config$typeahead2 = config.typeahead,
          typeahead = _config$typeahead2 === undefined ? {} : _config$typeahead2,
          stringify = config.stringify,
          multi = config.multi;
      var delimiter = config.delimiter,
          delimit = config.delimit;

      if (typeof delimit === 'string') delimit = [delimit];
      if (delimiter && typeof delimiter !== 'string') delimiter = '¤';
      var _typeahead$fields2 = typeahead.fields,
          fields = _typeahead$fields2 === undefined ? [] : _typeahead$fields2;


      var target = {
        name: name,
        value: action === 'create-option' && !config.multi ? newValue.value : newValue
      };

      switch (action) {
        case 'create-option':
          _this2.emptyFields(fields, handleOnChange);
          handleOnChange({ target: target });
          return;
        case 'clear':
          {
            if (!newValue && (!_this2.state.inputValue || _this2.state.inputValue.length) || multi) {
              _this2.emptyFields(fields, handleOnChange);
              handleOnChange({ target: { name: name, value: '' } });
            }
            return;
          }
      }

      var value = '';
      if (Array.isArray(newValue)) {
        // it is way too complicated to try to figure out what you want to do with a multiselect typeahead
        // so I'll give it back to the developer raw and let them figure it out -- JRA 7/5/2018
        if (stringify) {
          if (delimiter) {
            if (delimit && Array.isArray(delimit)) {
              // if we were provided field(s) to delimit by, build up a special string with just those values
              target.value.forEach(function (option) {
                delimit.forEach(function (field) {
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
          } else if (delimit && !delimiter) {
            // special case where they decided to delimit by some field but don't have a delimiter, we are going to build it up as a stringified array
            value = [];
            target.value.forEach(function (option) {
              delimit.forEach(function (field) {
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
        } else if (delimit && !delimiter) {
          // special case where they decided to delimit by some field but don't have a delimiter, we are going to build it up as an array
          value = [];
          target.value.forEach(function (option) {
            delimit.forEach(function (field) {
              if (value.indexOf(option[field]) === -1) {
                value.push(option[field]);
              }
            });
          });
          target.value = value;
        }
        // this prevent input characters from showing in multi fields when selection options
        if (multi) {
          _this2.setState({ inputValue: '' });
        }
        handleOnChange({ target: target });
      } else {
        _this2.handleSingleValueChange(newValue);
      }
      _this2.setState({ menuIsOpen: false }); // closes menu when new option gets selected
    }, _this2.handleSingleValueChange = function (newValue) {
      var handleOnChange = _this2.props.handleOnChange;

      Object.keys(newValue).forEach(function (field) {
        var value = newValue[field];
        if (field === 'duplication') value = newValue.value;
        var id = null;
        var e = {
          target: {
            name: field,
            value: value,
            id: id
          }
        };
        if (field !== 'className' && field !== 'value' && field !== 'label') {
          handleOnChange(e);
        }
      });
    }, _this2.populateFilterBody = function () {
      var filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      // eslint-disable-next-line
      if (filter.hasOwnProperty('name')) {
        _this2.populateConditionObject(filter);
        // eslint-disable-next-line
      } else if (filter.hasOwnProperty('conditions') && Array.isArray(filter.conditions)) {
        filter.conditions.map(function (condition) {
          return _this2.populateFilterBody(condition);
        });
      }
      return filter;
    }, _this2.populateConditionObject = function () {
      var condition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { name: null, comparator: null, values: [] };
      var _this2$props$formValu = _this2.props.formValues,
          formValues = _this2$props$formValu === undefined ? (0, _immutable.Map)() : _this2$props$formValu;
      // eslint-disable-next-line

      if (!condition.hasOwnProperty('values')) condition.values = [];
      var value = formValues.get(condition.name, '');
      condition.values.push(value);
      return condition;
    }, _this2.loadOptions = function (search) {
      var _this2$props6 = _this2.props,
          _this2$props6$config = _this2$props6.config,
          config = _this2$props6$config === undefined ? {} : _this2$props6$config,
          _this2$props6$formVal = _this2$props6.formValues,
          formValues = _this2$props6$formVal === undefined ? (0, _immutable.Map)() : _this2$props6$formVal;
      var _config$name3 = config.name,
          name = _config$name3 === undefined ? null : _config$name3,
          _config$typeahead3 = config.typeahead,
          typeahead = _config$typeahead3 === undefined ? {} : _config$typeahead3;
      var _typeahead$key = typeahead.key,
          key = _typeahead$key === undefined ? null : _typeahead$key,
          _typeahead$duplicatio = typeahead.duplication,
          duplication = _typeahead$duplicatio === undefined ? false : _typeahead$duplicatio,
          _typeahead$fieldvalue2 = typeahead.fieldvalue,
          fieldvalue = _typeahead$fieldvalue2 === undefined ? null : _typeahead$fieldvalue2;
      var _typeahead$filter = typeahead.filter,
          filter = _typeahead$filter === undefined ? {} : _typeahead$filter;

      if (typeof filter === 'function') {
        filter = filter();
      }
      if (!key && !fieldvalue) {
        // eslint-disable-next-line
        console.error('The JSON schema representation for ' + name + ' does not have a typeahead key or a fieldvalue. A typeahead.key is required for this field type to search for results. This can either be specified directly as config.typeahead.key or it can equal the value of another field by specifying config.typeahead.{name of field}');
        return Promise.resolve({ options: [] });
      }

      filter = JSON.parse(JSON.stringify(filter)); // deep clone the object as to not mutate the definition
      _this2.populateFilterBody(filter);

      if (formValues.get(fieldvalue, '')) key = formValues.get(fieldvalue, '');

      if (search.length >= _this2.props.minChars || search === ' ') {
        if (typeof search === 'string' && search.trim() !== '') search = '/' + search;
        return _config3.default.ajax.post('/typeahead/name/' + key + '/search' + search, { filter: filter }).then(function (resp) {
          var results = resp.data.data.map(function (value) {
            if (duplication) {
              value.duplication = duplication;
            }
            return value;
          });
          return results;
        });
      }

      return Promise.resolve({ options: [] });
    }, _this2.handleOnFocus = function () {
      var _this2$props7 = _this2.props,
          _this2$props7$config = _this2$props7.config,
          config = _this2$props7$config === undefined ? {} : _this2$props7$config,
          _this2$props7$formVal = _this2$props7.formValues,
          formValues = _this2$props7$formVal === undefined ? (0, _immutable.Map)() : _this2$props7$formVal;
      var _config$multi = config.multi,
          multi = _config$multi === undefined ? false : _config$multi,
          _config$persist = config.persist,
          persist = _config$persist === undefined ? true : _config$persist,
          _config$name4 = config.name,
          name = _config$name4 === undefined ? null : _config$name4;

      var value = formValues.get(name, '') || '';
      value = typeof value.toJS === 'function' ? value.toJS() : value;
      value = (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' ? value.value || value.label || '' : value;

      if (persist && !multi) {
        // this is done to place cursor at the end of the input field
        _this2.setState({ inputValue: '' }, function () {
          return _this2.setState({ inputValue: value });
        });
      }
      _this2.handleInputClick();
    }, _this2.handleInputBlur = function () {
      _this2.setState({ menuIsOpen: false });
    }, _this2.convertValueStringToValueArrayIfNeeded = function (value) {
      var _this2$props$config4 = _this2.props.config,
          config = _this2$props$config4 === undefined ? {} : _this2$props$config4;
      var _config$multi2 = config.multi,
          multi = _config$multi2 === undefined ? false : _config$multi2,
          _config$stringify = config.stringify,
          stringify = _config$stringify === undefined ? false : _config$stringify,
          name = config.name;
      var delimiter = config.delimiter;

      if (delimiter && typeof delimiter !== 'string') delimiter = '¤';
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
    }, _this2.handleInputClick = function () {
      if (!_this2.props.config.disabled) {
        _this2.setInputFieldPosition(_this2.inputContainer); // position gets set when menu opens
      }
    }, _this2.handleLinkClick = function () {
      var _this2$props8 = _this2.props,
          _this2$props8$config = _this2$props8.config,
          config = _this2$props8$config === undefined ? {} : _this2$props8$config,
          handleLinkClick = _this2$props8.handleLinkClick;
      var link = config.link;

      handleLinkClick(link);
    }, _this2.setInputFieldPosition = function () {
      if (_this2.state.fieldPosition !== _this2.inputContainer.getBoundingClientRect().top) {
        _this2.setState({ fieldPosition: _this2.inputContainer.getBoundingClientRect().top });
      } else {
        _this2.setMenuOpenPosition();
      }
    }, _this2.setMenuOpenPosition = function () {
      var menuPlacement = _this2.state.fieldPosition < viewPortHeight / 2 ? 'bottom' : 'top';
      _this2.setState({ menuPlacement: menuPlacement }, _this2.openMenu());
    }, _this2.openMenu = function () {
      var _this2$props$config5 = _this2.props.config,
          disabled = _this2$props$config5.disabled,
          readonly = _this2$props$config5.readonly;

      var fieldIsDisabled = false;
      if (typeof disabled === 'boolean') fieldIsDisabled = disabled;
      if (typeof readonly === 'boolean') fieldIsDisabled = readonly;
      if (!fieldIsDisabled) {
        _this2.setState({ menuIsOpen: true });
      }
    }, _this2.onKeyDown = function (e) {
      var _this2$props$config6 = _this2.props.config,
          _this2$props$config6$ = _this2$props$config6.allowcreate,
          allowcreate = _this2$props$config6$ === undefined ? false : _this2$props$config6$,
          _this2$props$config6$2 = _this2$props$config6.onKeyDown,
          onKeyDown = _this2$props$config6$2 === undefined ? function () {
        return null;
      } : _this2$props$config6$2;
      // This fixes the issue where users type and tab too quickly on create fields and the value does not register in the system

      if (e.keyCode === 9 && allowcreate && _this2.state.inputValue) {
        _this2.handleChange({ value: _this2.state.inputValue }, { action: 'create-option' });
      }
      onKeyDown();
    }, _this2.render = function () {
      var _this2$props9 = _this2.props,
          inline = _this2$props9.inline,
          _this2$props9$formVal = _this2$props9.formValues,
          formValues = _this2$props9$formVal === undefined ? (0, _immutable.Map)() : _this2$props9$formVal,
          _this2$props9$config = _this2$props9.config,
          config = _this2$props9$config === undefined ? {} : _this2$props9$config,
          _this2$props9$Icon = _this2$props9.Icon,
          Icon = _this2$props9$Icon === undefined ? null : _this2$props9$Icon,
          requiredWarning = _this2$props9.requiredWarning,
          connectDropTarget = _this2$props9.connectDropTarget,
          cascadingKeyword = _this2$props9.cascadingKeyword,
          CascadeIcon = _this2$props9.CascadeIcon,
          tabIndex = _this2$props9.tabIndex,
          _this2$props9$taMaxHe = _this2$props9.taMaxHeight,
          taMaxHeight = _this2$props9$taMaxHe === undefined ? '29px' : _this2$props9$taMaxHe,
          LinkIcon = _this2$props9.LinkIcon;
      var _this2$state = _this2.state,
          inputValue = _this2$state.inputValue,
          menuIsOpen = _this2$state.menuIsOpen,
          menuPlacement = _this2$state.menuPlacement;
      var _config$name5 = config.name,
          name = _config$name5 === undefined ? null : _config$name5,
          _config$required = config.required,
          required = _config$required === undefined ? false : _config$required,
          _config$multi3 = config.multi,
          multi = _config$multi3 === undefined ? false : _config$multi3,
          _config$onKeyDown = config.onKeyDown,
          onKeyDown = _config$onKeyDown === undefined ? function () {
        return null;
      } : _config$onKeyDown,
          _config$allowcreate = config.allowcreate,
          allowcreate = _config$allowcreate === undefined ? false : _config$allowcreate,
          link = config.link;
      var _config$labelStyle = config.labelStyle,
          labelStyle = _config$labelStyle === undefined ? {} : _config$labelStyle,
          _config$style = config.style,
          style = _config$style === undefined ? {} : _config$style,
          _config$containerStyl = config.containerStyle,
          containerStyle = _config$containerStyl === undefined ? {} : _config$containerStyl,
          _config$iconStyle = config.iconStyle,
          iconStyle = _config$iconStyle === undefined ? {} : _config$iconStyle,
          _config$menuStyle = config.menuStyle,
          menuStyle = _config$menuStyle === undefined ? {} : _config$menuStyle;

      containerStyle = typeof containerStyle === 'string' ? JSON.parse(containerStyle) : containerStyle;
      labelStyle = typeof labelStyle === 'string' ? JSON.parse(labelStyle) : labelStyle;
      menuStyle = typeof menuStyle === 'string' ? JSON.parse(menuStyle) : menuStyle;
      style = typeof style === 'string' ? JSON.parse(style) : style;
      iconStyle = typeof iconStyle === 'string' ? JSON.parse(iconStyle) : iconStyle;
      if (!name) return null;
      var _config$label = config.label,
          label = _config$label === undefined ? name : _config$label;

      var blankValue = { value: '', label: '' };
      var value = formValues.get(name, null);
      value = value && typeof value.toJS === 'function' ? value.toJS() : value;
      value = _this2.convertValueStringToValueArrayIfNeeded(value);
      if (Array.isArray(value) && value.length > 0) {
        value = value.map(function (v) {
          if ((typeof v === 'undefined' ? 'undefined' : _typeof(v)) === 'object') return v;
          if (typeof v === 'string' || typeof v === 'number') return { value: v, label: v };
        });
      }
      if ((typeof value === 'string' || typeof value === 'number') && value.length > 0) value = { value: value, label: value };
      var warn = requiredWarning && formValues.get(name, '').length === 0 && required;
      var _config$readonly = config.readonly,
          readonly = _config$readonly === undefined ? false : _config$readonly,
          _config$disabled = config.disabled,
          disabled = _config$disabled === undefined ? false : _config$disabled,
          _config$placeholder = config.placeholder,
          placeholder = _config$placeholder === undefined ? '' : _config$placeholder,
          _config$typeahead4 = config.typeahead,
          typeahead = _config$typeahead4 === undefined ? {} : _config$typeahead4;
      var _typeahead$fieldvalue3 = typeahead.fieldvalue,
          fieldvalue = _typeahead$fieldvalue3 === undefined ? null : _typeahead$fieldvalue3;

      disabled = disabled || readonly;
      if (fieldvalue !== null && String(formValues.get(fieldvalue, '')).length === 0) disabled = true;
      var linkIconStyle = link && _typeof(link.style) === 'object' ? link.style : {};
      var isZipCode = (label === 'papostalcode' || label === 'Zip Code') && inputValue.length <= 2;

      var styles = {
        container: _extends({
          display: 'flex',
          flex: 1,
          flexDirection: inline ? 'row' : 'column',
          background: 'transparent'
        }, containerStyle),
        labelContainer: _extends({
          display: 'flex',
          flexDirection: 'row',
          width: inline ? 150 : '100%',
          minWidth: inline ? 150 : '100%',
          height: 15,
          marginTop: inline ? 4 : 0,
          background: 'transparent'
        }, labelStyle),
        label: _extends({
          display: 'flex',
          justifyContent: 'flex-start',
          lineHeight: inline ? '23px' : '15px',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          fontSize: inline ? '10pt' : '8pt',
          background: 'transparent',
          marginRight: 5,
          color: !!cascadingKeyword && !CascadeIcon ? 'blue' : '#383e4b'
        }, labelStyle),
        icon: _extends({
          marginRight: 5,
          width: 15,
          height: 15,
          marginTop: inline ? 4 : 0
        }, iconStyle),
        linkIconStyle: linkIconStyle
      };

      var selectStyles = _extends({}, (0, _reactSelectStyle.reactSelectStyles)(), {
        control: function control(base) {
          return _extends({}, base, {
            border: '1px solid #a0a0a0',
            borderRadius: '1px',
            height: '25px',
            minHeight: '25px',
            minWidth: '200px'
          }, style);
        },
        menu: function menu(base) {
          return _extends({}, base, {
            borderRadius: '1px',
            margin: 0
          }, menuStyle);
        },
        input: function input(base) {
          return _extends({}, base, {
            opacity: 3
          });
        }
      });

      var multiSelectStyles = _extends({}, (0, _reactSelectStyle.reactSelectStyles)(), {
        control: function control(base) {
          return _extends({}, base, {
            border: '1px solid #a0a0a0',
            borderRadius: '1px',
            maxHeight: taMaxHeight,
            overflowY: 'scroll',
            minWidth: '200px'
          });
        },
        indicatorsContainer: function indicatorsContainer(base) {
          return _extends({}, base, {
            alignItems: 'flex-start'
          });
        },
        valueContainer: function valueContainer(base) {
          return _extends({}, base, {
            padding: 0,
            paddingLeft: '4px'
          });
        }
      });

      var className = inline ? 'select-grid-input select-grid-input-inline' : 'select-grid-input';
      className = !warn ? className : className + ' warn-required';
      placeholder = warn ? '* This Field Is Required' : placeholder;

      if (_this2.state.shouldRemount) {
        return _react2.default.createElement(Placeholder, { handleMount: _this2.setShouldRemount });
      } else {
        return connectDropTarget(_react2.default.createElement(
          'div',
          {
            style: styles.container,
            onMouseUp: _this2.handleAnywhereClick,
            onBlur: _this2.onMouseOut
          },
          _react2.default.createElement(
            'div',
            { style: styles.labelContainer },
            required && _react2.default.createElement(
              'div',
              { style: { color: '#ec1c24', fontWeight: 'bold', fontSize: '15pt', lineHeight: '10pt' } },
              '*'
            ),
            Icon && _react2.default.createElement(Icon, { style: styles.icon }),
            _react2.default.createElement(
              'strong',
              {
                style: styles.label,
                onClick: !!cascadingKeyword && !CascadeIcon ? _this2.handleCascadeKeywordClick : link ? _this2.handleLinkClick : null,
                className: !!cascadingKeyword && !CascadeIcon || link ? 'cursor-hand' : ''
              },
              label
            ),
            !!cascadingKeyword && !!CascadeIcon && _react2.default.createElement(CascadeIcon, { onClick: _this2.handleCascadeKeywordClick, className: 'cursor-hand' }),
            !!link && !!LinkIcon && _react2.default.createElement(LinkIcon, { onClick: _this2.handleLinkClick, className: 'cursor-hand', style: styles.linkIconStyle })
          ),
          _react2.default.createElement(
            'div',
            {
              ref: function ref(r) {
                _this2.inputContainer = r;
              },
              onMouseDown: _this2.handleOnFocus
            },
            allowcreate && _react2.default.createElement(_reactSelect.AsyncCreatable, {
              autoFocus: _this2.props.config.autofocus,
              blurInputOnSelect: true,
              cacheOptions: true,
              className: className,
              createOptionPosition: 'first',
              formatCreateLabel: function formatCreateLabel(val) {
                return 'Click or Tab to Create "' + val + '"';
              },
              inputValue: inputValue,
              isClearable: true,
              isDisabled: disabled,
              isMulti: multi,
              loadOptions: _this2.loadOptions,
              menuIsOpen: !_utils.isMobile ? menuIsOpen : undefined,
              menuPlacement: !_utils.isMobile ? menuPlacement : undefined,
              menuPortalTarget: document.body,
              menuShouldBlockScroll: true,
              name: name,
              onBlur: _this2.handleInputBlur,
              onChange: _this2.handleChange,
              onFocus: _this2.handleOnFocus,
              onInputChange: _this2.onInputChange,
              onKeyDown: _this2.onKeyDown,
              onMouseDown: _this2.onMouseDown,
              placeholder: placeholder,
              ref: function ref(r) {
                _this2.input = r;
              },
              styles: multi ? multiSelectStyles : selectStyles,
              tabIndex: tabIndex,
              value: !inputValue && menuIsOpen && !multi ? blankValue : value
            }),
            !allowcreate && _react2.default.createElement(_reactSelect.Async, {
              autoFocus: _this2.props.config.autofocus,
              blurInputOnSelect: true,
              cacheOptions: true,
              className: className,
              inputValue: inputValue,
              isClearable: true,
              isDisabled: disabled,
              isMulti: multi,
              loadOptions: !isZipCode ? _this2.loadOptions : undefined,
              classNamePrefix: 'typeahead',
              menuIsOpen: !_utils.isMobile ? menuIsOpen : undefined,
              menuPlacement: !_utils.isMobile ? menuPlacement : undefined,
              menuPortalTarget: document.body,
              menuShouldBlockScroll: true,
              name: name,
              noOptionsMessage: function noOptionsMessage() {
                return isZipCode ? '3 Digits Required' : undefined;
              },
              onBlur: _this2.handleInputBlur,
              onChange: _this2.handleChange,
              onFocus: _this2.handleOnFocus,
              onInputChange: _this2.onInputChange,
              onKeyDown: onKeyDown,
              onMouseDown: _this2.onMouseDown,
              placeholder: placeholder,
              ref: function ref(r) {
                _this2.input = r;
              },
              styles: multi ? multiSelectStyles : selectStyles,
              tabIndex: tabIndex,
              value: !inputValue && menuIsOpen && !multi ? blankValue : value
            })
          )
        ));
      }
    }, _temp2), _possibleConstructorReturn(_this2, _ret2);
  }

  _createClass(Typeahead, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          formValues = _props.formValues,
          _props$config = _props.config,
          config = _props$config === undefined ? {} : _props$config;


      if (formValues.get(config.name) && !this.state.inputValue && !config.multi) {
        this.setState({ inputValue: formValues.get(config.name) });
      }
    }
  }]);

  return Typeahead;
}(_react.Component);

Typeahead.propTypes = {
  autoComplete: _propTypes2.default.string,
  didDrop: _propTypes2.default.bool,
  isOver: _propTypes2.default.bool,
  CascadeIcon: _propTypes2.default.any,
  cascadingKeyword: _propTypes2.default.any,
  config: _propTypes2.default.object,
  connectDropTarget: _propTypes2.default.any,
  droppedItem: _propTypes2.default.any,
  handleOnChange: _propTypes2.default.func.isRequired,
  handleDragDropOnInput: _propTypes2.default.func,
  handleAnywhereClick: _propTypes2.default.func,
  handleCascadeKeywordClick: _propTypes2.default.func,
  draggable: _propTypes2.default.bool,
  minChars: _propTypes2.default.number,
  formValues: _propTypes2.default.object,
  Icon: _propTypes2.default.any,
  requiredWarning: _propTypes2.default.bool,
  inline: _propTypes2.default.bool,
  tabIndex: _propTypes2.default.number,
  taMaxHeight: _propTypes2.default.string,
  LinkIcon: _propTypes2.default.func,
  handleLinkClick: _propTypes2.default.func
};
Typeahead.defaultProps = {
  minChars: 1
};


function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    droppedItem: monitor.getDropResult(),
    didDrop: monitor.didDrop(),
    isOver: monitor.isOver()
  };
}

var boxTarget = {
  drop: function drop(props, monitor) {
    return {
      widget: monitor.getItem()
    };
  }
};

exports.default = (0, _reactDnd.DropTarget)('FormBuilderDraggable', boxTarget, collect)(Typeahead);