var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import { Map, List } from 'immutable';
import { DropTarget } from 'react-dnd';

// this component is designed to return a List() of selected values to the forms handle change function
export var Multicheckbox = function (_Component) {
  _inherits(Multicheckbox, _Component);

  function Multicheckbox(props) {
    _classCallCheck(this, Multicheckbox);

    var _this = _possibleConstructorReturn(this, (Multicheckbox.__proto__ || Object.getPrototypeOf(Multicheckbox)).call(this, props));

    _initialiseProps.call(_this);

    var field = props.field,
        _props$formValues = props.formValues,
        formValues = _props$formValues === undefined ? Map() : _props$formValues,
        _props$opts = props.opts,
        opts = _props$opts === undefined ? {} : _props$opts;

    var value = formValues.get(field, List());
    var _opts$options = opts.options,
        options = _opts$options === undefined ? List() : _opts$options;

    var currentVals = List();
    options.map(function (option) {
      if (value.indexOf(option) > -1) currentVals = currentVals.push(option);
    });
    _this.state = {
      value: currentVals
    };
    return _this;
  }

  return Multicheckbox;
}(Component);

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

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
    var _props = _this2.props,
        _props$config = _props.config,
        config = _props$config === undefined ? {} : _props$config,
        _props$handleOnChange = _props.handleOnChange,
        handleOnChange = _props$handleOnChange === undefined ? function () {} : _props$handleOnChange;
    var name = config.name;
    var value = _this2.state.value;

    if (value.size !== s.value.size) {
      handleOnChange({ target: { name: name, value: value } });
    }

    var _props2 = _this2.props,
        didDrop = _props2.didDrop,
        isOver = _props2.isOver;

    if (didDrop && !p.didDrop && !isOver && p.isOver) {
      // if it was just previously over and dropped (this is to make this event only trigger once)
      var _props3 = _this2.props,
          droppedItem = _props3.droppedItem,
          handleDragDropOnInput = _props3.handleDragDropOnInput,
          _props3$config = _props3.config,
          _config = _props3$config === undefined ? {} : _props3$config,
          _props3$formValues = _props3.formValues,
          formValues = _props3$formValues === undefined ? Map() : _props3$formValues;

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
    var _props4 = _this2.props,
        _props4$handleAnywher = _props4.handleAnywhereClick,
        handleAnywhereClick = _props4$handleAnywher === undefined ? function () {
      return null;
    } : _props4$handleAnywher,
        _props4$formValues = _props4.formValues,
        formValues = _props4$formValues === undefined ? Map() : _props4$formValues;
    var _props$config2 = _this2.props.config,
        config = _props$config2 === undefined ? {} : _props$config2;

    var currentValue = formValues.get(config.name, '');
    config = _extends({ currentValue: currentValue }, config);
    handleAnywhereClick(config, e);
  };

  this.handleCascadeKeywordClick = function (e) {
    var _props5 = _this2.props,
        _props5$handleCascade = _props5.handleCascadeKeywordClick,
        handleCascadeKeywordClick = _props5$handleCascade === undefined ? function () {
      return null;
    } : _props5$handleCascade,
        _props5$formValues = _props5.formValues,
        formValues = _props5$formValues === undefined ? Map() : _props5$formValues;
    var _props$config3 = _this2.props.config,
        config = _props$config3 === undefined ? {} : _props$config3;

    var currentValue = formValues.get(config.name, '');
    config = _extends({ currentValue: currentValue }, config);
    handleCascadeKeywordClick(config);
  };

  this.render = function () {
    var _props6 = _this2.props,
        inline = _props6.inline,
        _props6$config = _props6.config,
        config = _props6$config === undefined ? {} : _props6$config,
        _props6$Icon = _props6.Icon,
        Icon = _props6$Icon === undefined ? null : _props6$Icon,
        requiredWarning = _props6.requiredWarning,
        formValues = _props6.formValues,
        connectDropTarget = _props6.connectDropTarget,
        cascadingKeyword = _props6.cascadingKeyword,
        CascadeIcon = _props6.CascadeIcon;
    var _config$name = config.name,
        name = _config$name === undefined ? null : _config$name,
        _config$required = config.required,
        required = _config$required === undefined ? false : _config$required,
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
      }, iconStyle)
    };

    return connectDropTarget(React.createElement(
      'div',
      { style: styles.container, onMouseUp: _this2.handleAnywhereClick },
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
          { style: styles.label, onClick: !!cascadingKeyword && !CascadeIcon ? _this2.handleCascadeKeywordClick : null, className: !!cascadingKeyword && !CascadeIcon ? 'cursor-hand' : '' },
          label
        ),
        React.createElement(
          'span',
          { style: { fontWeight: 'normal', fontSize: '9pt', marginLeft: 3, marginTop: -1, color: warn ? '#ec1c24' : '#383e4b', marginRight: 5 } },
          placeholder
        ),
        !!cascadingKeyword && !!CascadeIcon && React.createElement(CascadeIcon, { onClick: _this2.handleCascadeKeywordClick, className: 'cursor-hand' })
      ),
      React.createElement(
        'div',
        { style: styles.optionsContainer },
        options.map(function (option, i) {
          return React.createElement(
            'label',
            { key: i, style: styles.label },
            React.createElement('input', { className: 'radio-grid-input', onChange: function onChange() {
                return _this2.handleOnChange(option.value);
              }, style: styles.input, type: 'checkbox', name: name, value: option.value, checked: value.indexOf(option.value) > -1, disabled: disabled, onKeyDown: onKeyDown }),
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

export default DropTarget('FormBuilderDraggable', boxTarget, collect)(Multicheckbox);