'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Multicheckbox = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

var _reactDnd = require('react-dnd');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// this component is designed to return a List() of selected values to the forms handle change function
var Multicheckbox = exports.Multicheckbox = function (_Component) {
  _inherits(Multicheckbox, _Component);

  function Multicheckbox(props) {
    _classCallCheck(this, Multicheckbox);

    var _this = _possibleConstructorReturn(this, (Multicheckbox.__proto__ || Object.getPrototypeOf(Multicheckbox)).call(this, props));

    _initialiseProps.call(_this);

    var _props$formValues = props.formValues,
        formValues = _props$formValues === undefined ? (0, _immutable.Map)() : _props$formValues,
        _props$config = props.config,
        config = _props$config === undefined ? {} : _props$config;

    var field = config.name;
    var value = formValues.get(field, (0, _immutable.List)());
    var options = [];
    if (config.keyword && config.keyword.options) {
      options = config.keyword.options;
    }
    var currentVals = (0, _immutable.List)();
    options.forEach(function (option) {
      if (value.indexOf(option.value) > -1) currentVals = currentVals.push(option.value);
    });
    _this.state = {
      value: currentVals
    };
    return _this;
  }

  return Multicheckbox;
}(_react.Component);

Multicheckbox.propTypes = {
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
  field: _propTypes2.default.string,
  opts: _propTypes2.default.object,
  LinkIcon: _propTypes2.default.func,
  handleLinkClick: _propTypes2.default.func
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.validateFormValuesAgainstAvailableOptions = function () {
    var _props = _this2.props,
        _props$formValues2 = _props.formValues,
        formValues = _props$formValues2 === undefined ? (0, _immutable.Map)() : _props$formValues2,
        _props$config2 = _props.config,
        config = _props$config2 === undefined ? {} : _props$config2;

    var field = config.name;
    var value = formValues.get(field, (0, _immutable.List)());
    var options = [];
    if (config.keyword && config.keyword.options) {
      options = config.keyword.options;
    }
    var currentVals = (0, _immutable.List)();
    options.forEach(function (option) {
      if (value.indexOf(option.value) > -1) currentVals = currentVals.push(option.value);
    });
    _this2.setState(function () {
      return {
        value: currentVals
      };
    });
  };

  this.handleOnChange = function (changingVal) {
    var value = _this2.state.value;

    if (value.indexOf(changingVal) > -1) {
      value = value.filter(function (option) {
        return option !== changingVal;
      });
    } else {
      value = value.push(changingVal);
    }
    _this2.setState({ value: value });
  };

  this.componentDidUpdate = function (p, s) {
    var _props2 = _this2.props,
        _props2$config = _props2.config,
        config = _props2$config === undefined ? {} : _props2$config,
        _props2$handleOnChang = _props2.handleOnChange,
        handleOnChange = _props2$handleOnChang === undefined ? function () {} : _props2$handleOnChang;
    var name = config.name;
    var value = _this2.state.value;

    if (value.size !== s.value.size) {
      handleOnChange({ target: { name: name, value: value } });
    }
    var newPropValue = (0, _immutable.fromJS)(_this2.props.formValues.get(name, []));
    var oldPropValue = (0, _immutable.fromJS)(p.formValues.get(name, []));
    if (!oldPropValue.equals(newPropValue) && !newPropValue.equals(s.value)) {
      _this2.validateFormValuesAgainstAvailableOptions();
    }

    var _props3 = _this2.props,
        didDrop = _props3.didDrop,
        isOver = _props3.isOver;

    if (didDrop && !p.didDrop && !isOver && p.isOver) {
      // if it was just previously over and dropped (this is to make this event only trigger once)
      var _props4 = _this2.props,
          droppedItem = _props4.droppedItem,
          handleDragDropOnInput = _props4.handleDragDropOnInput,
          _props4$config = _props4.config,
          _config = _props4$config === undefined ? {} : _props4$config,
          _props4$formValues = _props4.formValues,
          formValues = _props4$formValues === undefined ? (0, _immutable.Map)() : _props4$formValues;

      droppedItem = droppedItem === null ? null : droppedItem.widget;
      var currentValue = formValues.get(_config.name, '');
      _config = _extends({ currentValue: currentValue }, _config);
      if (droppedItem && !p.droppedItem) {
        handleDragDropOnInput({
          source: droppedItem,
          target: _config
        });
      }
    }
  };

  this.handleAnywhereClick = function (e) {
    var _props5 = _this2.props,
        _props5$handleAnywher = _props5.handleAnywhereClick,
        handleAnywhereClick = _props5$handleAnywher === undefined ? function () {
      return null;
    } : _props5$handleAnywher,
        _props5$formValues = _props5.formValues,
        formValues = _props5$formValues === undefined ? (0, _immutable.Map)() : _props5$formValues;
    var _props$config3 = _this2.props.config,
        config = _props$config3 === undefined ? {} : _props$config3;

    var currentValue = formValues.get(config.name, '');
    config = _extends({ currentValue: currentValue }, config);
    handleAnywhereClick(config, e);
  };

  this.handleCascadeKeywordClick = function (e) {
    var _props6 = _this2.props,
        _props6$handleCascade = _props6.handleCascadeKeywordClick,
        handleCascadeKeywordClick = _props6$handleCascade === undefined ? function () {
      return null;
    } : _props6$handleCascade,
        _props6$formValues = _props6.formValues,
        formValues = _props6$formValues === undefined ? (0, _immutable.Map)() : _props6$formValues;
    var _props$config4 = _this2.props.config,
        config = _props$config4 === undefined ? {} : _props$config4;

    var currentValue = formValues.get(config.name, '');
    config = _extends({ currentValue: currentValue }, config);
    handleCascadeKeywordClick(config);
  };

  this.handleLinkClick = function () {
    var _props7 = _this2.props,
        _props7$config = _props7.config,
        config = _props7$config === undefined ? {} : _props7$config,
        handleLinkClick = _props7.handleLinkClick;
    var link = config.link;

    handleLinkClick(link);
  };

  this.render = function () {
    var _props8 = _this2.props,
        inline = _props8.inline,
        _props8$config = _props8.config,
        config = _props8$config === undefined ? {} : _props8$config,
        _props8$Icon = _props8.Icon,
        Icon = _props8$Icon === undefined ? null : _props8$Icon,
        requiredWarning = _props8.requiredWarning,
        formValues = _props8.formValues,
        connectDropTarget = _props8.connectDropTarget,
        cascadingKeyword = _props8.cascadingKeyword,
        CascadeIcon = _props8.CascadeIcon,
        tabIndex = _props8.tabIndex,
        LinkIcon = _props8.LinkIcon;
    var _config$name = config.name,
        name = _config$name === undefined ? null : _config$name,
        _config$required = config.required,
        required = _config$required === undefined ? false : _config$required,
        _config$onKeyDown = config.onKeyDown,
        onKeyDown = _config$onKeyDown === undefined ? function () {
      return null;
    } : _config$onKeyDown,
        link = config.link;
    var _config$labelStyle = config.labelStyle,
        labelStyle = _config$labelStyle === undefined ? {} : _config$labelStyle,
        _config$style = config.style,
        style = _config$style === undefined ? {} : _config$style,
        _config$containerStyl = config.containerStyle,
        containerStyle = _config$containerStyl === undefined ? {} : _config$containerStyl,
        _config$iconStyle = config.iconStyle,
        iconStyle = _config$iconStyle === undefined ? {} : _config$iconStyle;

    containerStyle = typeof containerStyle === 'string' ? JSON.parse(containerStyle) : containerStyle;
    labelStyle = typeof labelStyle === 'string' ? JSON.parse(labelStyle) : labelStyle;
    style = typeof style === 'string' ? JSON.parse(style) : style;
    iconStyle = typeof iconStyle === 'string' ? JSON.parse(iconStyle) : iconStyle;
    if (!name) return null;
    var _config$label = config.label,
        label = _config$label === undefined ? name : _config$label,
        _config$keyword = config.keyword,
        keyword = _config$keyword === undefined ? {} : _config$keyword,
        boxed = config.boxed;
    var _keyword$options = keyword.options,
        options = _keyword$options === undefined ? [] : _keyword$options;
    var value = _this2.state.value;

    var boxStyle = !boxed ? {} : { border: '1px solid lightgrey', backgroundColor: '#f5f5f5' };
    var _config$readonly = config.readonly,
        readonly = _config$readonly === undefined ? false : _config$readonly,
        _config$disabled = config.disabled,
        disabled = _config$disabled === undefined ? false : _config$disabled,
        _config$placeholder = config.placeholder,
        placeholder = _config$placeholder === undefined ? '' : _config$placeholder;

    disabled = disabled || readonly;
    var warn = requiredWarning && formValues.get(name, '').length === 0 && required;
    placeholder = warn ? 'This Field Is Required' : placeholder;
    var linkIconStyle = link && _typeof(link.style) === 'object' ? link.style : {};

    var styles = {
      container: _extends({
        display: 'flex',
        flex: 1,
        flexDirection: inline ? 'row' : 'column',
        background: 'transparent',
        minWidth: 177
      }, boxStyle, containerStyle),
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
        lineHeight: inline ? '12pt' : '11pt',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        fontSize: inline ? '10pt' : '8pt',
        background: 'transparent',
        marginRight: 5,
        color: !!cascadingKeyword && !CascadeIcon ? 'blue' : '#383e4b'
      }, labelStyle),
      optionsContainer: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        marginLeft: inline ? 0 : 10,
        marginTop: inline ? 10 : 5
      },
      input: _extends({
        display: 'flex',
        marginRight: 5,
        marginTop: 0
      }, style),
      icon: _extends({
        marginRight: 5,
        width: 15,
        height: 15,
        marginTop: -1
      }, iconStyle),
      linkIconStyle: linkIconStyle
    };

    return connectDropTarget(_react2.default.createElement(
      'div',
      { style: styles.container, onMouseUp: _this2.handleAnywhereClick },
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
        _react2.default.createElement(
          'span',
          {
            style: {
              fontWeight: 'normal',
              fontSize: '9pt',
              marginLeft: 3,
              marginTop: -1,
              color: warn ? '#ec1c24' : '#383e4b',
              marginRight: 5
            }
          },
          placeholder
        ),
        !!cascadingKeyword && !!CascadeIcon && _react2.default.createElement(CascadeIcon, { onClick: _this2.handleCascadeKeywordClick, className: 'cursor-hand' }),
        !!link && !!LinkIcon && _react2.default.createElement(LinkIcon, { onClick: _this2.handleLinkClick, className: 'cursor-hand', style: styles.linkIconStyle })
      ),
      _react2.default.createElement(
        'div',
        { style: styles.optionsContainer },
        options.map(function (option, i) {
          return _react2.default.createElement(
            'label',
            { key: i, style: styles.label },
            _react2.default.createElement('input', {
              tabIndex: tabIndex,
              className: 'radio-grid-input',
              onChange: function onChange() {
                return _this2.handleOnChange(option.value);
              },
              style: styles.input,
              type: 'checkbox',
              name: name,
              value: option.value,
              checked: value.indexOf(option.value) > -1,
              disabled: disabled,
              onKeyDown: onKeyDown
            }),
            option.label ? option.label : option.value
          );
        })
      )
    ));
  };
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

exports.default = (0, _reactDnd.DropTarget)('FormBuilderDraggable', boxTarget, collect)(Multicheckbox);