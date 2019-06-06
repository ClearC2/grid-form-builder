'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Listselect = undefined;

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
var Listselect = exports.Listselect = function (_Component) {
  _inherits(Listselect, _Component);

  function Listselect(props) {
    _classCallCheck(this, Listselect);

    var _this = _possibleConstructorReturn(this, (Listselect.__proto__ || Object.getPrototypeOf(Listselect)).call(this, props));

    _this.handleOnChange = function (e) {
      var _this$props$config = _this.props.config,
          config = _this$props$config === undefined ? {} : _this$props$config;
      var _config$readonly = config.readonly,
          readonly = _config$readonly === undefined ? false : _config$readonly,
          _config$disabled = config.disabled,
          disabled = _config$disabled === undefined ? false : _config$disabled;

      disabled = disabled || readonly;
      if (disabled) return;
      var updatingValue = e.target.innerHTML;
      var value = _this.state.value;

      if (value.indexOf(updatingValue) > -1) {
        value = value.filter(function (option) {
          return option !== updatingValue;
        });
      } else {
        value = value.push(updatingValue);
      }
      _this.setState(function () {
        return { value: value };
      });
    };

    _this.selectAllOptions = function () {
      var _this$props$config2 = _this.props.config,
          config = _this$props$config2 === undefined ? {} : _this$props$config2;
      var _config$keyword = config.keyword,
          keyword = _config$keyword === undefined ? {} : _config$keyword;
      var _keyword$options = keyword.options,
          options = _keyword$options === undefined ? [] : _keyword$options;
      var _config$readonly2 = config.readonly,
          readonly = _config$readonly2 === undefined ? false : _config$readonly2,
          _config$disabled2 = config.disabled,
          disabled = _config$disabled2 === undefined ? false : _config$disabled2;

      disabled = disabled || readonly;
      if (disabled) return;
      var values = options.map(function (options) {
        return options.value;
      });
      _this.setState({ value: (0, _immutable.fromJS)(values) });
    };

    _this.deselectAllOptions = function () {
      var _this$props$config3 = _this.props.config,
          config = _this$props$config3 === undefined ? {} : _this$props$config3;
      var _config$readonly3 = config.readonly,
          readonly = _config$readonly3 === undefined ? false : _config$readonly3,
          _config$disabled3 = config.disabled,
          disabled = _config$disabled3 === undefined ? false : _config$disabled3;

      disabled = disabled || readonly;
      if (disabled) return;
      _this.setState({ value: (0, _immutable.List)() });
    };

    _this.componentDidUpdate = function (p, s) {
      var _this$props$handleOnC = _this.props.handleOnChange,
          handleOnChange = _this$props$handleOnC === undefined ? function () {} : _this$props$handleOnC;
      var value = _this.state.value;

      if (value.size !== s.value.size) {
        handleOnChange({ target: { name: _this.props.config.name, value: value } });
      }

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
    };

    _this.handleAnywhereClick = function (e) {
      var _this$props3 = _this.props,
          _this$props3$handleAn = _this$props3.handleAnywhereClick,
          handleAnywhereClick = _this$props3$handleAn === undefined ? function () {
        return null;
      } : _this$props3$handleAn,
          _this$props3$formValu = _this$props3.formValues,
          formValues = _this$props3$formValu === undefined ? (0, _immutable.Map)() : _this$props3$formValu;
      var _this$props$config4 = _this.props.config,
          config = _this$props$config4 === undefined ? {} : _this$props$config4;

      var currentValue = formValues.get(config.name, '');
      config = _extends({ currentValue: currentValue }, config);
      handleAnywhereClick(config, e);
    };

    _this.handleCascadeKeywordClick = function (e) {
      var _this$props4 = _this.props,
          _this$props4$handleCa = _this$props4.handleCascadeKeywordClick,
          handleCascadeKeywordClick = _this$props4$handleCa === undefined ? function () {
        return null;
      } : _this$props4$handleCa,
          _this$props4$formValu = _this$props4.formValues,
          formValues = _this$props4$formValu === undefined ? (0, _immutable.Map)() : _this$props4$formValu;
      var _this$props$config5 = _this.props.config,
          config = _this$props$config5 === undefined ? {} : _this$props$config5;

      var currentValue = formValues.get(config.name, '');
      config = _extends({ currentValue: currentValue }, config);
      handleCascadeKeywordClick(config);
    };

    _this.handleLinkClick = function () {
      var _this$props5 = _this.props,
          _this$props5$config = _this$props5.config,
          config = _this$props5$config === undefined ? {} : _this$props5$config,
          handleLinkClick = _this$props5.handleLinkClick;
      var link = config.link;

      handleLinkClick(link);
    };

    _this.render = function () {
      var _this$props6 = _this.props,
          inline = _this$props6.inline,
          _this$props6$config = _this$props6.config,
          config = _this$props6$config === undefined ? {} : _this$props6$config,
          _this$props6$Icon = _this$props6.Icon,
          Icon = _this$props6$Icon === undefined ? null : _this$props6$Icon,
          requiredWarning = _this$props6.requiredWarning,
          connectDropTarget = _this$props6.connectDropTarget,
          cascadingKeyword = _this$props6.cascadingKeyword,
          CascadeIcon = _this$props6.CascadeIcon,
          LinkIcon = _this$props6.LinkIcon;
      var _config$name = config.name,
          name = _config$name === undefined ? null : _config$name,
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
          iconStyle = _config$iconStyle === undefined ? {} : _config$iconStyle;

      containerStyle = typeof containerStyle === 'string' ? JSON.parse(containerStyle) : containerStyle;
      labelStyle = typeof labelStyle === 'string' ? JSON.parse(labelStyle) : labelStyle;
      style = typeof style === 'string' ? JSON.parse(style) : style;
      iconStyle = typeof iconStyle === 'string' ? JSON.parse(iconStyle) : iconStyle;
      if (!name) return null;
      var _config$label = config.label,
          label = _config$label === undefined ? name : _config$label,
          _config$keyword2 = config.keyword,
          keyword = _config$keyword2 === undefined ? {} : _config$keyword2;
      var _keyword$options2 = keyword.options,
          options = _keyword$options2 === undefined ? [] : _keyword$options2;
      var _this$state$value = _this.state.value,
          value = _this$state$value === undefined ? [] : _this$state$value;

      var warn = requiredWarning && value.size === 0 && required;
      var _config$readonly4 = config.readonly,
          readonly = _config$readonly4 === undefined ? false : _config$readonly4,
          _config$disabled4 = config.disabled,
          disabled = _config$disabled4 === undefined ? false : _config$disabled4,
          _config$placeholder = config.placeholder,
          placeholder = _config$placeholder === undefined ? '' : _config$placeholder;

      disabled = disabled || readonly;
      placeholder = warn ? 'This Field Is Required' : placeholder;
      var linkIconStyle = link && _typeof(link.style) === 'object' ? link.style : {};

      var styles = {
        container: _extends({
          display: 'flex',
          flex: 1,
          flexDirection: inline ? 'row' : 'column',
          background: 'transparent',
          minWidth: 177
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
          display: 'flex',
          flexDirection: 'column',
          flexGrow: inline ? 1 : 0,
          height: inline ? 'auto' : 'calc(100% - 21px)',
          resize: 'none',
          backgroundColor: disabled ? '#eee' : 'transparent',
          minWidth: 90,
          marginTop: inline ? 25 : 0
        }, style),
        icon: _extends({
          marginRight: 5,
          width: 15,
          height: 15,
          marginTop: inline ? 4 : -1
        }, iconStyle),
        linkIconStyle: linkIconStyle
      };

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
            {
              style: styles.label,
              onClick: !!cascadingKeyword && !CascadeIcon ? _this.handleCascadeKeywordClick : null,
              className: !!cascadingKeyword && !CascadeIcon ? 'cursor-hand' : ''
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
          !!cascadingKeyword && !!CascadeIcon && _react2.default.createElement(CascadeIcon, { onClick: _this.handleCascadeKeywordClick, className: 'cursor-hand' }),
          !!link && !!LinkIcon && _react2.default.createElement(LinkIcon, { onClick: _this.handleLinkClick, className: 'cursor-hand', style: styles.linkIconStyle })
        ),
        _react2.default.createElement(
          'div',
          { style: styles.input },
          _react2.default.createElement(
            'div',
            {
              style: {
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
                minHeight: 10,
                border: warn ? '1px solid #ec1c24' : '1px solid lightgrey',
                height: 'calc(100% - 18px)',
                overflowY: 'scroll'
              }
            },
            options.map(function (option, i) {
              return _react2.default.createElement(
                'div',
                {
                  key: i,
                  onClick: _this.handleOnChange,
                  style: _extends({
                    display: 'flex',
                    height: 27,
                    minHeight: 27,
                    margin: 0,
                    alignItems: 'center',
                    paddingLeft: 5,
                    width: '100%',
                    borderBottom: '1px solid lightgrey',
                    backgroundColor: value.indexOf(option.value) > -1 ? '#a1c3fa' : 'transparent'
                  }, style)
                },
                option.label ? option.label : option.value
              );
            })
          ),
          _react2.default.createElement(
            'div',
            { style: { display: 'flex', justifyContent: 'flex-end', height: 15, minHeight: 15 } },
            _react2.default.createElement(
              'span',
              {
                onClick: _this.selectAllOptions,
                style: {
                  marginRight: 5,
                  fontSize: '8pt',
                  textDecoration: 'underline',
                  color: 'blue',
                  cursor: 'pointer'
                }
              },
              'Select All'
            ),
            _react2.default.createElement(
              'span',
              {
                onClick: _this.deselectAllOptions,
                style: {
                  marginRight: 5,
                  fontSize: '8pt',
                  textDecoration: 'underline',
                  color: 'blue',
                  cursor: 'pointer'
                }
              },
              'Deselect All'
            )
          )
        )
      ));
    };

    var incomingValues = props.formValues.get(props.config.name, '');
    if (incomingValues instanceof _immutable.Map) {
      incomingValues = props.formValues.get(props.config.name, (0, _immutable.Map)());
      if (incomingValues instanceof _immutable.Map) {
        incomingValues = incomingValues.get('values', []);
        if (incomingValues instanceof _immutable.List) {
          incomingValues = incomingValues.toJS();
        }
      }
    }
    if (typeof incomingValues === 'string') incomingValues = incomingValues.split('¤');
    incomingValues = (0, _immutable.fromJS)(incomingValues);
    _this.state = {
      value: incomingValues
    };
    return _this;
  }

  return Listselect;
}(_react.Component);

Listselect.propTypes = {
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

exports.default = (0, _reactDnd.DropTarget)('FormBuilderDraggable', boxTarget, collect)(Listselect);