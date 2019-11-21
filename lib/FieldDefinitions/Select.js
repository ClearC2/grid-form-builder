'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Select = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _creatable = require('react-select/creatable');

var _creatable2 = _interopRequireDefault(_creatable);

var _reactDnd = require('react-dnd');

var _reactSelectStyle = require('../react-select-style');

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var viewPortHeight = document.documentElement.clientHeight;

var Select = exports.Select = function (_Component) {
  _inherits(Select, _Component);

  function Select() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Select);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Select.__proto__ || Object.getPrototypeOf(Select)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      fieldPosition: 0,
      fieldValues: [],
      menuIsOpen: false,
      menuPlacement: 'bottom'
    }, _this.componentDidUpdate = function (p, s) {
      var _this$props = _this.props,
          didDrop = _this$props.didDrop,
          isOver = _this$props.isOver;

      if (didDrop && !p.didDrop && !isOver && p.isOver) {
        // if it was just previously over and dropped (this is to make this event only trigger once)
        var _this$props2 = _this.props,
            droppedItem = _this$props2.droppedItem,
            handleDragDropOnInput = _this$props2.handleDragDropOnInput,
            _this$props2$config = _this$props2.config,
            config = _this$props2$config === undefined ? {} : _this$props2$config,
            _this$props2$formValu = _this$props2.formValues,
            formValues = _this$props2$formValu === undefined ? (0, _immutable.Map)() : _this$props2$formValu;

        droppedItem = droppedItem === null ? null : droppedItem.widget;
        var currentValue = formValues.get(config.name, '');
        config = _extends({ currentValue: currentValue }, config);
        if (droppedItem && !p.droppedItem) {
          handleDragDropOnInput({
            source: droppedItem,
            target: config
          });
        }
      }

      if (s.fieldPosition !== _this.state.fieldPosition) {
        _this.setMenuOpenPosition();
      }
    }, _this.handleAnywhereClick = function (e) {
      var _this$props3 = _this.props,
          _this$props3$handleAn = _this$props3.handleAnywhereClick,
          handleAnywhereClick = _this$props3$handleAn === undefined ? function () {
        return null;
      } : _this$props3$handleAn,
          _this$props3$formValu = _this$props3.formValues,
          formValues = _this$props3$formValu === undefined ? (0, _immutable.Map)() : _this$props3$formValu;
      var _this$props$config = _this.props.config,
          config = _this$props$config === undefined ? {} : _this$props$config;

      var currentValue = formValues.get(config.name, '');
      config = _extends({ currentValue: currentValue }, config);
      handleAnywhereClick(config, e);
    }, _this.onMouseOut = function () {
      return _this.setState({ menuPlacement: 'top', menuIsOpen: false });
    }, _this.handleCascadeKeywordClick = function (e) {
      var _this$props4 = _this.props,
          _this$props4$handleCa = _this$props4.handleCascadeKeywordClick,
          handleCascadeKeywordClick = _this$props4$handleCa === undefined ? function () {
        return null;
      } : _this$props4$handleCa,
          _this$props4$formValu = _this$props4.formValues,
          formValues = _this$props4$formValu === undefined ? (0, _immutable.Map)() : _this$props4$formValu;
      var _this$props$config2 = _this.props.config,
          config = _this$props$config2 === undefined ? {} : _this$props$config2;

      var currentValue = formValues.get(config.name, '');
      config = _extends({ currentValue: currentValue }, config);
      handleCascadeKeywordClick(config);
    }, _this.handleOnChange = function () {}, _this.onChange = function (e) {
      var _this$props5 = _this.props,
          _this$props5$config = _this$props5.config,
          config = _this$props5$config === undefined ? {} : _this$props5$config,
          _this$props5$handleOn = _this$props5.handleOnChange,
          handleOnChange = _this$props5$handleOn === undefined ? _this.handleOnChange : _this$props5$handleOn;
      var _config$name = config.name,
          name = _config$name === undefined ? null : _config$name;

      var value = e === null ? e = '' : e.value;
      _this.setState({ menuIsOpen: false });
      handleOnChange({
        target: {
          name: name,
          value: value
        }
      });
    }, _this.getValue = function (value, options) {
      if (value) {
        var keyMap = options.reduce(function (acc, cv) {
          acc[cv.value] = cv.label;
          return acc;
        }, {});

        return { label: keyMap[value], value: value };
      }
    }, _this.handleLinkClick = function () {
      var _this$props6 = _this.props,
          _this$props6$config = _this$props6.config,
          config = _this$props6$config === undefined ? {} : _this$props6$config,
          handleLinkClick = _this$props6.handleLinkClick;
      var link = config.link;

      handleLinkClick(link);
    }, _this.handleOnFocus = function () {
      _this.setInputFieldPosition();
    }, _this.handleOnBlur = function () {
      _this.setState({ menuIsOpen: false });
    }, _this.setInputFieldPosition = function () {
      if (_this.state.fieldPosition !== _this.input.getBoundingClientRect().top) {
        _this.setState({ fieldPosition: _this.input.getBoundingClientRect().top });
      } else {
        _this.setMenuOpenPosition();
      }
    }, _this.setMenuOpenPosition = function () {
      var menuPlacement = _this.state.fieldPosition < viewPortHeight / 2 ? 'bottom' : 'top';
      _this.setState({ menuPlacement: menuPlacement }, _this.openMenu);
    }, _this.onKeyDown = function () {
      var _this$props$config$on = _this.props.config.onKeyDown,
          onKeyDown = _this$props$config$on === undefined ? function () {
        return null;
      } : _this$props$config$on;

      _this.openMenu();
      onKeyDown();
    }, _this.openMenu = function () {
      var _this$props$config3 = _this.props.config,
          disabled = _this$props$config3.disabled,
          readonly = _this$props$config3.readonly;

      var fieldIsDisabled = false;
      if (typeof disabled === 'boolean') fieldIsDisabled = disabled;
      if (typeof readonly === 'boolean') fieldIsDisabled = readonly;
      if (!fieldIsDisabled) {
        _this.setState({ menuIsOpen: true });
      }
    }, _this.render = function () {
      var _this$props7 = _this.props,
          inline = _this$props7.inline,
          _this$props7$formValu = _this$props7.formValues,
          formValues = _this$props7$formValu === undefined ? (0, _immutable.Map)() : _this$props7$formValu,
          _this$props7$config = _this$props7.config,
          config = _this$props7$config === undefined ? {} : _this$props7$config,
          _this$props7$Icon = _this$props7.Icon,
          Icon = _this$props7$Icon === undefined ? null : _this$props7$Icon,
          requiredWarning = _this$props7.requiredWarning,
          connectDropTarget = _this$props7.connectDropTarget,
          cascadingKeyword = _this$props7.cascadingKeyword,
          CascadeIcon = _this$props7.CascadeIcon,
          tabIndex = _this$props7.tabIndex,
          LinkIcon = _this$props7.LinkIcon;
      var _config$name2 = config.name,
          name = _config$name2 === undefined ? null : _config$name2,
          _config$required = config.required,
          required = _config$required === undefined ? false : _config$required,
          link = config.link;
      var _config$labelStyle = config.labelStyle,
          labelStyle = _config$labelStyle === undefined ? {} : _config$labelStyle,
          _config$style = config.style,
          style = _config$style === undefined ? {} : _config$style,
          _config$containerStyl = config.containerStyle,
          containerStyle = _config$containerStyl === undefined ? {} : _config$containerStyl,
          _config$iconStyle = config.iconStyle,
          iconStyle = _config$iconStyle === undefined ? {} : _config$iconStyle,
          _config$keyword = config.keyword,
          keyword = _config$keyword === undefined ? {} : _config$keyword;

      containerStyle = typeof containerStyle === 'string' ? JSON.parse(containerStyle) : containerStyle;
      labelStyle = typeof labelStyle === 'string' ? JSON.parse(labelStyle) : labelStyle;
      style = typeof style === 'string' ? JSON.parse(style) : style;
      iconStyle = typeof iconStyle === 'string' ? JSON.parse(iconStyle) : iconStyle;
      if (!name) return null;
      var _config$label = config.label,
          label = _config$label === undefined ? name : _config$label,
          _config$creatable = config.creatable,
          creatable = _config$creatable === undefined ? false : _config$creatable;

      var warn = requiredWarning && _this.state.fieldValues.length === 0 && required;
      var _config$readonly = config.readonly,
          readonly = _config$readonly === undefined ? false : _config$readonly,
          _config$disabled = config.disabled,
          disabled = _config$disabled === undefined ? false : _config$disabled,
          _config$placeholder = config.placeholder,
          placeholder = _config$placeholder === undefined ? '' : _config$placeholder;

      disabled = disabled || readonly;
      var _keyword$options = keyword.options,
          options = _keyword$options === undefined ? [] : _keyword$options;

      var value = formValues.get(name, '');
      value = typeof value === 'string' ? _this.getValue(value, options) : value;
      var linkIconStyle = link && _typeof(link.style) === 'object' ? link.style : {};

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
          marginTop: inline ? 3 : -1
        }, iconStyle),
        linkIconStyle: linkIconStyle
      };

      var inputStyles = _extends({}, (0, _reactSelectStyle.reactSelectStyles)(), {
        control: function control(base) {
          return _extends({}, base, {
            border: '1px solid #a0a0a0',
            borderRadius: '1px',
            height: inline ? 'auto' : 25,
            minHeight: '25px',
            minWidth: '200px'
          }, style);
        }
      });

      var className = warn ? 'warn-required' : '';
      placeholder = warn ? '* This Field Is Required' : placeholder;
      var clearable = true;
      if (config.clearable === false) {
        clearable = false;
      }
      var Select = creatable ? _creatable2.default : _reactSelect2.default;

      return connectDropTarget(_react2.default.createElement(
        'div',
        {
          style: styles.container,
          ref: function ref(r) {
            _this.input = r;
          },
          onMouseUp: _this.handleAnywhereClick,
          onBlur: _this.onMouseOut
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
              onClick: !!cascadingKeyword && !CascadeIcon ? _this.handleCascadeKeywordClick : link ? _this.handleLinkClick : null,
              className: !!cascadingKeyword && !CascadeIcon || link ? 'cursor-hand' : ''
            },
            label
          ),
          !!cascadingKeyword && !!CascadeIcon && _react2.default.createElement(CascadeIcon, { onClick: _this.handleCascadeKeywordClick, className: 'cursor-hand' }),
          !!link && !!LinkIcon && _react2.default.createElement(LinkIcon, { onClick: _this.handleLinkClick, className: 'cursor-hand', style: styles.linkIconStyle })
        ),
        _react2.default.createElement(
          'div',
          { onMouseUp: _this.openMenu },
          _react2.default.createElement(Select, {
            autoFocus: _this.props.config.autofocus,
            className: className,
            isClearable: clearable,
            isDisabled: disabled,
            menuIsOpen: !_utils.isMobile ? _this.state.menuIsOpen : undefined,
            menuPlacement: !_utils.isMobile ? _this.state.menuPlacement : undefined,
            menuPortalTarget: document.body,
            menuShouldBlockScroll: true,
            name: name,
            onBlur: _this.handleOnBlur,
            onChange: _this.onChange,
            onFocus: _this.handleOnFocus,
            onKeyDown: _this.onKeyDown,
            options: options,
            placeholder: placeholder,
            styles: inputStyles,
            tabIndex: tabIndex,
            defaultValue: value,
            value: value
          })
        )
      ));
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return Select;
}(_react.Component);

Select.propTypes = {
  formValues: _propTypes2.default.object,
  config: _propTypes2.default.object,
  didDrop: _propTypes2.default.bool,
  isOver: _propTypes2.default.bool,
  droppedItem: _propTypes2.default.object,
  handleDragDropOnInput: _propTypes2.default.func,
  handleAnywhereClick: _propTypes2.default.func,
  handleCascadeKeywordClick: _propTypes2.default.func,
  handleOnChange: _propTypes2.default.func,
  draggable: _propTypes2.default.bool,
  inline: _propTypes2.default.bool,
  Icon: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.node]),
  requiredWarning: _propTypes2.default.bool,
  connectDropTarget: _propTypes2.default.func,
  cascadingKeyword: _propTypes2.default.string,
  CascadeIcon: _propTypes2.default.func,
  tabIndex: _propTypes2.default.number,
  LinkIcon: _propTypes2.default.func,
  handleLinkClick: _propTypes2.default.func
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

exports.default = (0, _reactDnd.DropTarget)('FormBuilderDraggable', boxTarget, collect)(Select);