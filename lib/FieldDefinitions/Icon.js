'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Icon = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDnd = require('react-dnd');

var _immutable = require('immutable');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactTooltip = require('react-tooltip');

var _reactTooltip2 = _interopRequireDefault(_reactTooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Icon = exports.Icon = function (_Component) {
  _inherits(Icon, _Component);

  function Icon() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Icon);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Icon.__proto__ || Object.getPrototypeOf(Icon)).call.apply(_ref, [this].concat(args))), _this), _this.componentDidUpdate = function (p) {
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
    }, _this.handleCascadeKeywordClick = function () {
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
    }, _this.handleLinkClick = function () {
      var _this$props5 = _this.props,
          _this$props5$config = _this$props5.config,
          config = _this$props5$config === undefined ? {} : _this$props5$config,
          handleLinkClick = _this$props5.handleLinkClick;
      var link = config.link;

      handleLinkClick(link);
    }, _this.render = function () {
      var _this$props6 = _this.props,
          _this$props6$config = _this$props6.config,
          config = _this$props6$config === undefined ? {} : _this$props6$config,
          _this$props6$Icon = _this$props6.Icon,
          Icon = _this$props6$Icon === undefined ? null : _this$props6$Icon,
          connectDropTarget = _this$props6.connectDropTarget,
          cascadingKeyword = _this$props6.cascadingKeyword,
          CascadeIcon = _this$props6.CascadeIcon,
          LinkIcon = _this$props6.LinkIcon;
      var _config$onClick = config.onClick,
          onClick = _config$onClick === undefined ? function () {
        return null;
      } : _config$onClick,
          link = config.link,
          tooltip = config.tooltip;
      var _config$style = config.style,
          style = _config$style === undefined ? {} : _config$style,
          _config$iconStyle = config.iconStyle,
          iconStyle = _config$iconStyle === undefined ? {} : _config$iconStyle;

      style = typeof style === 'string' ? JSON.parse(style) : style;
      iconStyle = typeof iconStyle === 'string' ? JSON.parse(iconStyle) : iconStyle;
      var linkIconStyle = link && _typeof(link.style) === 'object' ? link.style : {};
      return connectDropTarget(_react2.default.createElement(
        'div',
        {
          onClick: onClick,
          className: 'cursor-hand',
          style: _extends({
            display: 'flex',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center'
          }, style),
          onMouseUp: _this.handleAnywhereClick
        },
        Icon && _react2.default.createElement(Icon, {
          style: _extends({ height: 20, width: 20, marginRight: 5 }, iconStyle),
          onClick: !!cascadingKeyword && !CascadeIcon ? _this.handleCascadeKeywordClick : link ? _this.handleLinkClick : null,
          className: !!cascadingKeyword && !CascadeIcon || link ? 'cursor-hand' : '',
          'data-tip': true,
          'data-for': 'icon-tooltip'
        }),
        tooltip && _react2.default.createElement(
          _reactTooltip2.default,
          { id: 'icon-tooltip', style: { zIndex: Number.MAX_SAFE_INTEGER } },
          _react2.default.createElement(
            'span',
            null,
            tooltip
          )
        ),
        !!cascadingKeyword && !!CascadeIcon && _react2.default.createElement(CascadeIcon, { onClick: _this.handleCascadeKeywordClick, className: 'cursor-hand' }),
        !!link && !!LinkIcon && _react2.default.createElement(LinkIcon, { onClick: _this.handleLinkClick, className: 'cursor-hand', style: linkIconStyle })
      ));
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return Icon;
}(_react.Component);

Icon.propTypes = {
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

exports.default = (0, _reactDnd.DropTarget)('FormBuilderDraggable', boxTarget, collect)(Icon);