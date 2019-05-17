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

var _reactSelectStyle = require('../react-select-style');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Multiselect = exports.Multiselect = function (_Component) {
  _inherits(Multiselect, _Component);

  function Multiselect() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Multiselect);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Multiselect.__proto__ || Object.getPrototypeOf(Multiselect)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      fieldValues: [],
      builtOptions: []
    }, _this.componentDidUpdate = function (p) {
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
    }, _this.onChange = function (e) {
      if (e.length === 0) {
        _this.props.handleOnChange({ target: { name: _this.props.config.name, value: '' } });
      } else {
        if (_this.props.conditionalSearch) {
          _this.props.handleOnChange({ target: { name: _this.props.config.name, value: (0, _immutable.fromJS)({ condition: 'is one of', values: (0, _immutable.List)(e.map(function (val) {
                  return val.value;
                })) }) } });
        } else {
          _this.props.handleOnChange({ target: { name: _this.props.config.name, value: (0, _immutable.fromJS)(e.map(function (val) {
                return val.value;
              })) } });
        }
      }
    }, _this.render = function () {
      var _this$props5 = _this.props,
          inline = _this$props5.inline,
          _this$props5$config = _this$props5.config,
          config = _this$props5$config === undefined ? {} : _this$props5$config,
          _this$props5$Icon = _this$props5.Icon,
          Icon = _this$props5$Icon === undefined ? null : _this$props5$Icon,
          requiredWarning = _this$props5.requiredWarning,
          connectDropTarget = _this$props5.connectDropTarget,
          cascadingKeyword = _this$props5.cascadingKeyword,
          CascadeIcon = _this$props5.CascadeIcon,
          tabIndex = _this$props5.tabIndex;
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

      var warn = requiredWarning && _this.state.fieldValues.length === 0 && required;
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
        icon: _extends({
          marginRight: 5,
          width: 15,
          height: 15,
          marginTop: inline ? 3 : -1
        }, iconStyle)
      };

      var inputStyles = {
        input: function input(base) {
          return _extends({}, base, style);
        },
        valueContainer: function valueContainer(base) {
          return _extends({}, base, {
            marginTop: '-4px',
            paddingBottom: '4px',
            paddingLeft: 0
          });
        }
      };

      var className = inline ? 'select-grid-input select-grid-input-inline' : 'select-grid-input';
      className = !warn ? className : className + ' warn-required';
      placeholder = warn ? '* This Field Is Required' : placeholder;
      return connectDropTarget(_react2.default.createElement(
        'div',
        { style: styles.container, onMouseUp: _this.handleAnywhereClick },
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
            { style: styles.label, onClick: !!cascadingKeyword && !CascadeIcon ? _this.handleCascadeKeywordClick : null, className: !!cascadingKeyword && !CascadeIcon ? 'cursor-hand' : '' },
            label
          ),
          !!cascadingKeyword && !!CascadeIcon && _react2.default.createElement(CascadeIcon, { onClick: _this.handleCascadeKeywordClick, className: 'cursor-hand' })
        ),
        _react2.default.createElement(_reactSelect2.default, {
          className: className,
          defaultValue: _this.state.fieldValues,
          isDisabled: disabled,
          isMulti: multi,
          name: name,
          onChange: _this.onChange,
          onKeyDown: onKeyDown,
          options: _this.state.builtOptions,
          placeholder: placeholder,
          styles: _extends({}, (0, _reactSelectStyle.reactSelectStyles)(), inputStyles),
          tabIndex: tabIndex
        })
      ));
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Multiselect, null, [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(prevProps) {
      var _prevProps$config = prevProps.config,
          config = _prevProps$config === undefined ? {} : _prevProps$config;
      var _config$keyword = config.keyword,
          keyword = _config$keyword === undefined ? {} : _config$keyword;
      var _keyword$options = keyword.options,
          options = _keyword$options === undefined ? [] : _keyword$options;

      var incomingValues = prevProps.formValues.get(prevProps.config.name, '');
      if (incomingValues instanceof _immutable.Map) {
        incomingValues = prevProps.formValues.get(prevProps.config.name, (0, _immutable.Map)());
        if (incomingValues instanceof _immutable.Map) {
          incomingValues = incomingValues.get('values', []);
          if (incomingValues instanceof _immutable.List) {
            incomingValues = incomingValues.toJS();
          }
        }
      }
      if (typeof incomingValues === 'string') incomingValues = incomingValues.split('¤');
      if (Array.isArray(incomingValues) || incomingValues instanceof _immutable.List) {
        incomingValues = incomingValues.map(function (value) {
          if (typeof value === 'string' && value !== '') {
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
      if (typeof incomingValues.toJS === 'function') {
        incomingValues = incomingValues.toJS();
      }

      return {
        fieldValues: incomingValues || [],
        builtOptions: options
      };
    }
  }]);

  return Multiselect;
}(_react.Component);

Multiselect.propTypes = {
  config: _propTypes2.default.object,
  formValues: _propTypes2.default.object,
  didDrop: _propTypes2.default.bool,
  isOver: _propTypes2.default.bool,
  droppedItem: _propTypes2.default.object,
  handleDragDropOnInput: _propTypes2.default.func,
  handleCascadeKeywordClick: _propTypes2.default.func,
  handleAnywhereClick: _propTypes2.default.func,
  handleOnChange: _propTypes2.default.func,
  inline: _propTypes2.default.bool,
  Icon: _propTypes2.default.object
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