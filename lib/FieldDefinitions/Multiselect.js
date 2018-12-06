'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Multiselect = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _reactDnd = require('react-dnd');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Multiselect = exports.Multiselect = function (_Component) {
  _inherits(Multiselect, _Component);

  function Multiselect(props) {
    _classCallCheck(this, Multiselect);

    var _this = _possibleConstructorReturn(this, (Multiselect.__proto__ || Object.getPrototypeOf(Multiselect)).call(this, props));

    _initialiseProps.call(_this);

    var _props$config = props.config,
        config = _props$config === undefined ? {} : _props$config;
    var _config$keyword = config.keyword,
        keyword = _config$keyword === undefined ? {} : _config$keyword;
    var _keyword$options = keyword.options,
        options = _keyword$options === undefined ? [] : _keyword$options;

    var incomingValues = null;
    if (props.formValues && props.formValues instanceof _immutable.Map) {
      incomingValues = props.formValues.get(props.config.name, (0, _immutable.Map)());
      if (incomingValues instanceof _immutable.Map) {
        incomingValues = incomingValues.get('values', []);
        if (incomingValues instanceof _immutable.List) {
          incomingValues = incomingValues.toJS();
        }
      }
    }
    if (Array.isArray(props.formValues.get(props.config.name)) || props.formValues.get(props.config.name) instanceof _immutable.List) {
      incomingValues = props.formValues.get(props.config.name).map(function (value) {
        if (typeof value === 'string') {
          return {
            label: value,
            value: value
          };
        } else {
          if (typeof value.toJS === 'function') value = value.toJS();
          return value;
        }
      });
    }
    if (typeof incomingValues.toJS === 'function') incomingValues = incomingValues.toJS();
    _this.state = {
      fieldValues: incomingValues || [],
      builtOptions: options
    };
    return _this;
  }

  _createClass(Multiselect, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      var val = props.formValues.get(props.config.name, null);
      if (!val && this.state.fieldValues !== []) {
        this.setState({ fieldValues: [] });
      }
    }
  }]);

  return Multiselect;
}(_react.Component);

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.componentDidUpdate = function (p) {
    var _props = _this2.props,
        didDrop = _props.didDrop,
        isOver = _props.isOver;

    if (didDrop && !p.didDrop && !isOver && p.isOver) {
      // if it was just previously over and dropped (this is to make this event only trigger once)
      var _props2 = _this2.props,
          droppedItem = _props2.droppedItem,
          handleDragDropOnInput = _props2.handleDragDropOnInput,
          _props2$config = _props2.config,
          config = _props2$config === undefined ? {} : _props2$config,
          _props2$formValues = _props2.formValues,
          formValues = _props2$formValues === undefined ? (0, _immutable.Map)() : _props2$formValues;

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
  };

  this.handleAnywhereClick = function (e) {
    var _props3 = _this2.props,
        _props3$handleAnywher = _props3.handleAnywhereClick,
        handleAnywhereClick = _props3$handleAnywher === undefined ? function () {
      return null;
    } : _props3$handleAnywher,
        _props3$formValues = _props3.formValues,
        formValues = _props3$formValues === undefined ? (0, _immutable.Map)() : _props3$formValues;
    var _props$config2 = _this2.props.config,
        config = _props$config2 === undefined ? {} : _props$config2;

    var currentValue = formValues.get(config.name, '');
    config = _extends({ currentValue: currentValue }, config);
    handleAnywhereClick(config, e);
  };

  this.handleCascadeKeywordClick = function (e) {
    var _props4 = _this2.props,
        _props4$handleCascade = _props4.handleCascadeKeywordClick,
        handleCascadeKeywordClick = _props4$handleCascade === undefined ? function () {
      return null;
    } : _props4$handleCascade,
        _props4$formValues = _props4.formValues,
        formValues = _props4$formValues === undefined ? (0, _immutable.Map)() : _props4$formValues;
    var _props$config3 = _this2.props.config,
        config = _props$config3 === undefined ? {} : _props$config3;

    var currentValue = formValues.get(config.name, '');
    config = _extends({ currentValue: currentValue }, config);
    handleCascadeKeywordClick(config);
  };

  this.onChange = function (e) {
    _this2.setState({ fieldValues: e });
    if (e.length === 0) {
      _this2.props.handleOnChange({ target: { name: _this2.props.config.name, value: '' } });
    } else {
      if (_this2.props.conditionalSearch) {
        _this2.props.handleOnChange({ target: { name: _this2.props.config.name, value: (0, _immutable.fromJS)({ condition: 'is one of', values: (0, _immutable.List)(e.map(function (val) {
                return val.value;
              })) }) } });
      } else {
        _this2.props.handleOnChange({ target: { name: _this2.props.config.name, value: (0, _immutable.fromJS)((0, _immutable.List)(e.map(function (val) {
              return val.value;
            }))) } });
      }
    }
  };

  this.render = function () {
    var _props5 = _this2.props,
        inline = _props5.inline,
        _props5$config = _props5.config,
        config = _props5$config === undefined ? {} : _props5$config,
        _props5$Icon = _props5.Icon,
        Icon = _props5$Icon === undefined ? null : _props5$Icon,
        requiredWarning = _props5.requiredWarning,
        connectDropTarget = _props5.connectDropTarget,
        cascadingKeyword = _props5.cascadingKeyword,
        CascadeIcon = _props5.CascadeIcon,
        tabIndex = _props5.tabIndex;
    var _config$name = config.name,
        name = _config$name === undefined ? null : _config$name,
        _config$required = config.required,
        required = _config$required === undefined ? false : _config$required,
        _config$multi = config.multi,
        multi = _config$multi === undefined ? true : _config$multi,
        _config$onKeyDown = config.onKeyDown,
        onKeyDown = _config$onKeyDown === undefined ? function () {
      return null;
    } : _config$onKeyDown;
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
        label = _config$label === undefined ? name : _config$label;

    var warn = requiredWarning && _this2.state.fieldValues.length === 0 && required;
    var _config$readonly = config.readonly,
        readonly = _config$readonly === undefined ? false : _config$readonly,
        _config$disabled = config.disabled,
        disabled = _config$disabled === undefined ? false : _config$disabled,
        _config$placeholder = config.placeholder,
        placeholder = _config$placeholder === undefined ? '' : _config$placeholder;

    disabled = disabled || readonly;

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
      input: _extends({
        height: inline ? 'auto' : 25,
        backgroundColor: disabled ? '#eee' : 'white',
        minWidth: 170
      }, style),
      icon: _extends({
        marginRight: 5,
        width: 15,
        height: 15,
        marginTop: inline ? 3 : -1
      }, iconStyle)
    };

    var className = inline ? 'select-grid-input select-grid-input-inline' : 'select-grid-input';
    className = !warn ? className : className + ' warn-required';
    placeholder = warn ? '* This Field Is Required' : placeholder;
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
          { style: styles.label, onClick: !!cascadingKeyword && !CascadeIcon ? _this2.handleCascadeKeywordClick : null, className: !!cascadingKeyword && !CascadeIcon ? 'cursor-hand' : '' },
          label
        ),
        !!cascadingKeyword && !!CascadeIcon && _react2.default.createElement(CascadeIcon, { onClick: _this2.handleCascadeKeywordClick, className: 'cursor-hand' })
      ),
      _react2.default.createElement(_reactSelect2.default, {
        onChange: _this2.onChange,
        className: className,
        style: styles.input,
        multi: multi,
        name: name,
        options: _this2.state.builtOptions,
        value: _this2.state.fieldValues,
        disabled: disabled,
        onKeyDown: onKeyDown,
        placeholder: placeholder,
        tabIndex: tabIndex
      })
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

exports.default = (0, _reactDnd.DropTarget)('FormBuilderDraggable', boxTarget, collect)(Multiselect);