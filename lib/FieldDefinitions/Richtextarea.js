var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import { Map } from 'immutable';
import { DropTarget } from 'react-dnd';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

var Richtextarea = function (_Component) {
  _inherits(Richtextarea, _Component);

  function Richtextarea() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Richtextarea);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Richtextarea.__proto__ || Object.getPrototypeOf(Richtextarea)).call.apply(_ref, [this].concat(args))), _this), _this.handleOnChange = function (e, editor) {
      var _this$props = _this.props,
          handleOnChange = _this$props.handleOnChange,
          _this$props$config = _this$props.config,
          config = _this$props$config === undefined ? {} : _this$props$config;
      var _config$name = config.name,
          name = _config$name === undefined ? null : _config$name;

      var value = editor.getData();
      if (value !== '<p>&nbsp;</p>') {
        // when this component renders with no data it sends up this html string as an on change, just ignore it - JRA 08/21/2018
        handleOnChange({
          target: {
            name: name,
            value: value
          }
        });
      }
    }, _this.componentDidUpdate = function (p) {
      var _this$props2 = _this.props,
          didDrop = _this$props2.didDrop,
          isOver = _this$props2.isOver;

      if (didDrop && !p.didDrop && !isOver && p.isOver) {
        // if it was just previously over and dropped (this is to make this event only trigger once)
        var _this$props3 = _this.props,
            droppedItem = _this$props3.droppedItem,
            handleDragDropOnInput = _this$props3.handleDragDropOnInput,
            _this$props3$config = _this$props3.config,
            config = _this$props3$config === undefined ? {} : _this$props3$config,
            _this$props3$formValu = _this$props3.formValues,
            formValues = _this$props3$formValu === undefined ? Map() : _this$props3$formValu;

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
      var _this$props4 = _this.props,
          _this$props4$handleAn = _this$props4.handleAnywhereClick,
          handleAnywhereClick = _this$props4$handleAn === undefined ? function () {
        return null;
      } : _this$props4$handleAn,
          _this$props4$formValu = _this$props4.formValues,
          formValues = _this$props4$formValu === undefined ? Map() : _this$props4$formValu;
      var _this$props$config2 = _this.props.config,
          config = _this$props$config2 === undefined ? {} : _this$props$config2;

      var currentValue = formValues.get(config.name, '');
      config = _extends({ currentValue: currentValue }, config);
      handleAnywhereClick(config, e);
    }, _this.handleCascadeKeywordClick = function (e) {
      var _this$props5 = _this.props,
          _this$props5$handleCa = _this$props5.handleCascadeKeywordClick,
          handleCascadeKeywordClick = _this$props5$handleCa === undefined ? function () {
        return null;
      } : _this$props5$handleCa,
          _this$props5$formValu = _this$props5.formValues,
          formValues = _this$props5$formValu === undefined ? Map() : _this$props5$formValu;
      var _this$props$config3 = _this.props.config,
          config = _this$props$config3 === undefined ? {} : _this$props$config3;

      var currentValue = formValues.get(config.name, '');
      config = _extends({ currentValue: currentValue }, config);
      handleCascadeKeywordClick(config);
    }, _this.onMouseDown = function (e) {
      if (_this.props.draggable) e.stopPropagation();
    }, _this.render = function () {
      var _this$props6 = _this.props,
          inline = _this$props6.inline,
          _this$props6$formValu = _this$props6.formValues,
          formValues = _this$props6$formValu === undefined ? Map() : _this$props6$formValu,
          _this$props6$config = _this$props6.config,
          config = _this$props6$config === undefined ? {} : _this$props6$config,
          _this$props6$Icon = _this$props6.Icon,
          Icon = _this$props6$Icon === undefined ? null : _this$props6$Icon,
          requiredWarning = _this$props6.requiredWarning,
          connectDropTarget = _this$props6.connectDropTarget,
          cascadingKeyword = _this$props6.cascadingKeyword,
          CascadeIcon = _this$props6.CascadeIcon;
      var _config$name2 = config.name,
          name = _config$name2 === undefined ? null : _config$name2,
          _config$required = config.required,
          required = _config$required === undefined ? false : _config$required;
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

      var warn = requiredWarning && formValues.get(name, '').length === 0 && required;
      var _config$readonly = config.readonly,
          readonly = _config$readonly === undefined ? false : _config$readonly,
          _config$disabled = config.disabled,
          disabled = _config$disabled === undefined ? false : _config$disabled;

      disabled = disabled || readonly;
      var value = formValues.get(name, '<p>&nbsp;</p>');

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
          color: !!cascadingKeyword && !CascadeIcon ? 'blue' : '#383e4b',
          background: 'transparent',
          marginRight: 5
        }, labelStyle),
        input: _extends({
          display: 'flex',
          flexGrow: inline ? 1 : 0,
          paddingLeft: 5,
          backgroundColor: disabled ? '#eee' : 'white',
          borderBottom: warn ? '1px solid #ec1c24' : '1px solid #a0a0a0',
          borderTop: inline ? 0 : warn ? '1px solid #ec1c24' : '1px solid #a0a0a0',
          borderLeft: inline ? 0 : warn ? '1px solid #ec1c24' : '1px solid #a0a0a0',
          borderRight: inline ? 0 : warn ? '1px solid #ec1c24' : '1px solid #a0a0a0',
          minWidth: 90,
          height: inline ? 'auto' : 25
        }, style),
        icon: _extends({
          marginRight: 5,
          width: 15,
          height: 15,
          marginTop: inline ? 4 : -1
        }, iconStyle)
      };

      return connectDropTarget(React.createElement(
        'div',
        { style: styles.container, onMouseUp: _this.handleAnywhereClick },
        React.createElement(
          'div',
          { style: styles.labelContainer },
          required && React.createElement(
            'div',
            { style: { color: '#ec1c24', fontWeight: 'bold', fontSize: '15pt', lineHeight: '10pt' } },
            '*'
          ),
          Icon && React.createElement(Icon, { style: styles.icon }),
          React.createElement(
            'strong',
            { style: styles.label, onClick: !!cascadingKeyword && !CascadeIcon ? _this.handleCascadeKeywordClick : null, className: !!cascadingKeyword && !CascadeIcon ? 'cursor-hand' : '' },
            label
          ),
          !!cascadingKeyword && !!CascadeIcon && React.createElement(CascadeIcon, { onClick: _this.handleCascadeKeywordClick, className: 'cursor-hand' })
        ),
        React.createElement(CKEditor, {
          editor: ClassicEditor,
          onChange: _this.handleOnChange,
          data: value
        })
      ));
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return Richtextarea;
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

export default DropTarget('FormBuilderDraggable', boxTarget, collect)(Richtextarea);