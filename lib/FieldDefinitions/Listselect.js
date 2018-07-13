var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import { Map, List, fromJS } from 'immutable';
import { DropTarget } from 'react-dnd';

// this component is designed to return a List() of selected values to the forms handle change function
export var Listselect = function (_Component) {
  _inherits(Listselect, _Component);

  function Listselect(props) {
    _classCallCheck(this, Listselect);

    var _this = _possibleConstructorReturn(this, (Listselect.__proto__ || Object.getPrototypeOf(Listselect)).call(this, props));

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

  return Listselect;
}(Component);

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.handleOnChange = function (e) {
    var _props$config = _this2.props.config,
        config = _props$config === undefined ? {} : _props$config;
    var _config$readonly = config.readonly,
        readonly = _config$readonly === undefined ? false : _config$readonly,
        _config$disabled = config.disabled,
        disabled = _config$disabled === undefined ? false : _config$disabled;

    disabled = disabled || readonly;
    if (disabled) return;
    var updatingValue = e.target.innerHTML;
    var value = _this2.state.value;

    if (value.indexOf(updatingValue) > -1) {
      value = value.filter(function (option) {
        return option !== updatingValue;
      });
    } else {
      value = value.push(updatingValue);
    }
    _this2.setState({ value: value });
  };

  this.selectAllOptions = function () {
    var _props$config2 = _this2.props.config,
        config = _props$config2 === undefined ? {} : _props$config2;
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
    _this2.setState({ value: fromJS(values) });
  };

  this.deselectAllOptions = function () {
    var _props$config3 = _this2.props.config,
        config = _props$config3 === undefined ? {} : _props$config3;
    var _config$readonly3 = config.readonly,
        readonly = _config$readonly3 === undefined ? false : _config$readonly3,
        _config$disabled3 = config.disabled,
        disabled = _config$disabled3 === undefined ? false : _config$disabled3;

    disabled = disabled || readonly;
    if (disabled) return;
    _this2.setState({ value: List() });
  };

  this.componentDidUpdate = function (p, s) {
    var _props$handleOnChange = _this2.props.handleOnChange,
        handleOnChange = _props$handleOnChange === undefined ? function () {} : _props$handleOnChange;
    var value = _this2.state.value;

    if (value.size !== s.value.size) {
      handleOnChange({ target: { name: _this2.props.config.name, value: value } });
    }

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
          formValues = _props2$formValues === undefined ? Map() : _props2$formValues;

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

  this.handleAnywhereClick = function () {
    var _props3 = _this2.props,
        _props3$handleAnywher = _props3.handleAnywhereClick,
        handleAnywhereClick = _props3$handleAnywher === undefined ? function () {
      return null;
    } : _props3$handleAnywher,
        _props3$formValues = _props3.formValues,
        formValues = _props3$formValues === undefined ? Map() : _props3$formValues;
    var _props$config4 = _this2.props.config,
        config = _props$config4 === undefined ? {} : _props$config4;

    var currentValue = formValues.get(config.name, '');
    config = _extends({ currentValue: currentValue }, config);
    handleAnywhereClick(config);
  };

  this.handleCascadeKeywordClick = function (e) {
    var _props4 = _this2.props,
        _props4$handleCascade = _props4.handleCascadeKeywordClick,
        handleCascadeKeywordClick = _props4$handleCascade === undefined ? function () {
      return null;
    } : _props4$handleCascade,
        _props4$formValues = _props4.formValues,
        formValues = _props4$formValues === undefined ? Map() : _props4$formValues;
    var _props$config5 = _this2.props.config,
        config = _props$config5 === undefined ? {} : _props$config5;

    var currentValue = formValues.get(config.name, '');
    config = _extends({ currentValue: currentValue }, config);
    handleCascadeKeywordClick(config);
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
        CascadeIcon = _props5.CascadeIcon;
    var _config$labelStyle = config.labelStyle,
        labelStyle = _config$labelStyle === undefined ? {} : _config$labelStyle,
        _config$style = config.style,
        style = _config$style === undefined ? {} : _config$style,
        _config$name = config.name,
        name = _config$name === undefined ? null : _config$name,
        _config$iconStyle = config.iconStyle,
        iconStyle = _config$iconStyle === undefined ? {} : _config$iconStyle,
        _config$required = config.required,
        required = _config$required === undefined ? false : _config$required,
        _config$containerStyl = config.containerStyle,
        containerStyle = _config$containerStyl === undefined ? {} : _config$containerStyl;

    if (!name) return null;
    var _config$label = config.label,
        label = _config$label === undefined ? name : _config$label,
        _config$keyword2 = config.keyword,
        keyword = _config$keyword2 === undefined ? {} : _config$keyword2;
    var _keyword$options2 = keyword.options,
        options = _keyword$options2 === undefined ? [] : _keyword$options2;
    var _state$value = _this2.state.value,
        value = _state$value === undefined ? [] : _state$value;

    var warn = requiredWarning && value.size === 0 && required;
    var _config$readonly4 = config.readonly,
        readonly = _config$readonly4 === undefined ? false : _config$readonly4,
        _config$disabled4 = config.disabled,
        disabled = _config$disabled4 === undefined ? false : _config$disabled4,
        _config$placeholder = config.placeholder,
        placeholder = _config$placeholder === undefined ? '' : _config$placeholder;

    disabled = disabled || readonly;
    placeholder = warn ? 'This Field Is Required' : placeholder;

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
        { style: styles.input },
        React.createElement(
          'div',
          { style: { display: 'flex', flex: 1, flexDirection: 'column', minHeight: 10, border: warn ? '1px solid #ec1c24' : '1px solid lightgrey', height: 'calc(100% - 18px)', overflowY: 'scroll' } },
          options.map(function (option, i) {
            return React.createElement(
              'div',
              {
                key: i,
                onClick: _this2.handleOnChange,
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
        React.createElement(
          'div',
          { style: { display: 'flex', justifyContent: 'flex-end', height: 15, minHeight: 15 } },
          React.createElement(
            'span',
            { onClick: _this2.selectAllOptions, style: { marginRight: 5, fontSize: '8pt', textDecoration: 'underline', color: 'blue', cursor: 'pointer' } },
            'Select All'
          ),
          React.createElement(
            'span',
            { onClick: _this2.deselectAllOptions, style: { marginRight: 5, fontSize: '8pt', textDecoration: 'underline', color: 'blue', cursor: 'pointer' } },
            'Deselect All'
          )
        )
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

export default DropTarget('FormBuilderDraggable', boxTarget, collect)(Listselect);