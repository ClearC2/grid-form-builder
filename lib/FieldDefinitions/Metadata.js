var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { Map } from 'immutable';

export var Header = function (_Component) {
  _inherits(Header, _Component);

  function Header() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Header);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Header.__proto__ || Object.getPrototypeOf(Header)).call.apply(_ref, [this].concat(args))), _this), _this.componentDidUpdate = function (p) {
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
            formValues = _this$props2$formValu === undefined ? Map() : _this$props2$formValu;

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
          formValues = _this$props3$formValu === undefined ? Map() : _this$props3$formValu;
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
          formValues = _this$props4$formValu === undefined ? Map() : _this$props4$formValu;
      var _this$props$config2 = _this.props.config,
          config = _this$props$config2 === undefined ? {} : _this$props$config2;

      var currentValue = formValues.get(config.name, '');
      config = _extends({ currentValue: currentValue }, config);
      handleCascadeKeywordClick(config);
    }, _this.render = function () {
      var _this$props5 = _this.props,
          _this$props5$config = _this$props5.config,
          config = _this$props5$config === undefined ? {} : _this$props5$config,
          connectDropTarget = _this$props5.connectDropTarget,
          cascadingKeyword = _this$props5.cascadingKeyword,
          CascadeIcon = _this$props5.CascadeIcon,
          _this$props5$formValu = _this$props5.formValues,
          formValues = _this$props5$formValu === undefined ? Map() : _this$props5$formValu;
      var _config$name = config.name,
          name = _config$name === undefined ? null : _config$name;
      var _config$style = config.style,
          style = _config$style === undefined ? {} : _config$style,
          _config$containerStyl = config.containerStyle,
          containerStyle = _config$containerStyl === undefined ? {} : _config$containerStyl,
          _config$labelStyle = config.labelStyle,
          labelStyle = _config$labelStyle === undefined ? {} : _config$labelStyle;

      style = typeof style === 'string' ? JSON.parse(style) : style;
      if (!name) return null;
      var _config$label = config.label,
          label = _config$label === undefined ? name : _config$label;

      return connectDropTarget(React.createElement(
        'div',
        { style: _extends({ display: 'flex', flex: 1, flexDirection: 'row' }, containerStyle), onMouseUp: _this.handleAnywhereClick },
        React.createElement(
          'div',
          { style: _extends({ color: '#a0a0a0', fontSize: '9pt', fontWeight: 'bold', display: 'flex', flexDirection: 'row', width: '100%', minWidth: 150, marginTop: 4, justifyContent: 'space-between', alignItems: 'center' }, style) },
          React.createElement(
            'span',
            {
              style: _extends({ display: 'flex', justifyContent: 'flex-start', whiteSpace: 'nowrap', textOverflow: 'ellipsis', marginRight: 5 }, labelStyle),
              onClick: !!cascadingKeyword && !CascadeIcon ? _this.handleCascadeKeywordClick : null, className: !!cascadingKeyword && !CascadeIcon ? 'cursor-hand' : ''
            },
            label
          ),
          React.createElement(
            'span',
            {
              style: _extends({ display: 'flex', justifyContent: 'flex-start', whiteSpace: 'nowrap', textOverflow: 'ellipsis', marginRight: 5 }, style),
              onClick: !!cascadingKeyword && !CascadeIcon ? _this.handleCascadeKeywordClick : null, className: !!cascadingKeyword && !CascadeIcon ? 'cursor-hand' : ''
            },
            formValues.get(name, '')
          ),
          !!cascadingKeyword && !!CascadeIcon && React.createElement(CascadeIcon, { size: 13, onClick: _this.handleCascadeKeywordClick, className: 'cursor-hand' })
        )
      ));
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return Header;
}(Component);

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

export default DropTarget('FormBuilderDraggable', boxTarget, collect)(Header);