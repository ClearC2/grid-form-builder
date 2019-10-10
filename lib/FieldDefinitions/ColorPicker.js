'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Portal = require('./Portal');

var _Portal2 = _interopRequireDefault(_Portal);

var _reactDnd = require('react-dnd');

require('../../styles/colorpicker.css');

var _reactColor = require('react-color');

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ColorPicker = function (_Component) {
  _inherits(ColorPicker, _Component);

  function ColorPicker() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ColorPicker);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ColorPicker.__proto__ || Object.getPrototypeOf(ColorPicker)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      picker: '',
      color: '',
      id: ''
    }, _this.clickListener = function (e) {
      var outsideClick = true;
      e.path.forEach(function (path) {
        if (path.id === _this.state.id) {
          outsideClick = false;
        } else if (path.id === _this.portal.state.id) {
          outsideClick = false;
        }
      });

      if (outsideClick) {
        _this.toggleActive();
        _this.input.blur();
      }
    }, _this.handleAnywhereClick = function (e) {
      var _this$props = _this.props,
          _this$props$handleAny = _this$props.handleAnywhereClick,
          handleAnywhereClick = _this$props$handleAny === undefined ? function () {
        return null;
      } : _this$props$handleAny,
          _this$props$formValue = _this$props.formValues,
          formValues = _this$props$formValue === undefined ? (0, _immutable.Map)() : _this$props$formValue;
      var _this$props$config = _this.props.config,
          config = _this$props$config === undefined ? {} : _this$props$config;

      var currentValue = formValues.get(config.name, '');
      config = _extends({ currentValue: currentValue }, config);
      if (!config.disabled) {
        handleAnywhereClick(config, e);
      }
    }, _this.toggleActive = function () {
      var set = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var picker = _this.state.picker;


      if (typeof set === 'boolean') {
        _this.setState({ picker: set ? 'compact' : '' });
      } else if (!picker) {
        _this.setState({ picker: 'compact' });
      } else {
        _this.setState({ picker: '' });
      }
    }, _this.togglePicker = function () {
      var picker = _this.state.picker;


      if (picker !== 'compact') {
        _this.setState({ picker: 'compact' });
      } else if (picker === 'compact') {
        _this.setState({ picker: 'sketch' });
      }
    }, _this.onColorChange = function (color) {
      var _this$props2 = _this.props,
          _this$props2$config = _this$props2.config,
          config = _this$props2$config === undefined ? {} : _this$props2$config,
          handleOnChange = _this$props2.handleOnChange;


      _this.input.focus();

      if (color.hex) {
        color = color.hex;
      }

      handleOnChange({
        target: {
          name: config.name,
          value: color.toUpperCase()
        }
      });

      _this.setState(function () {
        return { color: color };
      });
    }, _this.onApply = function () {
      _this.input.blur();
      _this.toggleActive();

      var _this$props3 = _this.props,
          _this$props3$config = _this$props3.config,
          config = _this$props3$config === undefined ? {} : _this$props3$config,
          handleOnChange = _this$props3.handleOnChange;
      var color = _this.state.color;


      handleOnChange({
        target: {
          name: config.name,
          value: color
        }
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ColorPicker, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          formValues = _props.formValues,
          _props$config = _props.config,
          config = _props$config === undefined ? {} : _props$config;

      this.setState({ id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) });

      var color = formValues.get(config.name);
      if (color) {
        this.setState({ color: color });
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(p, s) {
      var _props2 = this.props,
          didDrop = _props2.didDrop,
          isOver = _props2.isOver,
          _props2$formValues = _props2.formValues,
          formValues = _props2$formValues === undefined ? (0, _immutable.Map)() : _props2$formValues,
          _props2$config = _props2.config,
          config = _props2$config === undefined ? {} : _props2$config;

      if (didDrop && !p.didDrop && !isOver && p.isOver) {
        // if it was just previously over and dropped (this is to make this event only trigger once)
        var _props3 = this.props,
            droppedItem = _props3.droppedItem,
            handleDragDropOnInput = _props3.handleDragDropOnInput;

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

      if (!!this.state.picker && !s.picker) {
        window.addEventListener('mousedown', this.clickListener);
      } else if (!!s.picker && !this.state.picker) {
        window.removeEventListener('mousedown', this.clickListener);
      }

      if (!formValues.equals(p.formValues)) {
        var color = formValues.get(config.name) ? formValues.get(config.name) : '';
        this.setState(function () {
          return { color: color };
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('mousedown', this.clickListener);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props4 = this.props,
          connectDropTarget = _props4.connectDropTarget,
          config = _props4.config,
          inline = _props4.inline,
          cascadingKeyword = _props4.cascadingKeyword,
          CascadeIcon = _props4.CascadeIcon;
      var _config$styles = config.styles,
          styles = _config$styles === undefined ? {} : _config$styles,
          required = config.required,
          Icon = config.Icon,
          label = config.label,
          _config$classNames = config.classNames,
          classNames = _config$classNames === undefined ? {} : _config$classNames;
      var _config$compactProps = config.compactProps,
          compactProps = _config$compactProps === undefined ? {} : _config$compactProps,
          _config$sketchProps = config.sketchProps,
          sketchProps = _config$sketchProps === undefined ? {} : _config$sketchProps;


      var style = {
        container: _extends({
          display: 'flex',
          flex: 1,
          flexDirection: inline ? 'row' : 'column',
          background: 'transparent'
        }, styles.container),
        labelContainer: _extends({
          display: 'flex',
          flexDirection: 'row',
          width: inline ? 150 : '100%',
          minWidth: inline ? 150 : '100%',
          height: 15,
          marginTop: inline ? 4 : 0,
          background: 'transparent'
        }, styles.labelContainer),
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
        }, styles.label),
        icon: _extends({
          marginRight: 5,
          width: 15,
          height: 15,
          marginTop: inline ? 3 : -1
        }, styles.icon),
        inputContainer: _extends({
          width: 'calc(100% + 15px)',
          marginLeft: 0
        }, styles.inputContainer),
        input: _extends({
          width: 'calc(100% - 21px)'
        }, styles.input),
        block: _extends({
          border: '1px solid'
        }, styles.block)
      };

      return connectDropTarget(_react2.default.createElement(
        'div',
        { className: classNames.container, style: style.container, onMouseUp: this.handleAnywhereClick },
        _react2.default.createElement(
          'div',
          { className: classNames.labelContainer, style: style.labelContainer },
          required && _react2.default.createElement(
            'div',
            { style: { color: '#ec1c24', fontWeight: 'bold', fontSize: '15pt', lineHeight: '10pt' } },
            '*'
          ),
          Icon && _react2.default.createElement(Icon, { style: style.icon }),
          _react2.default.createElement(
            'strong',
            {
              style: style.label,
              className: 'cursor-hand ' + classNames.label
            },
            label
          )
        ),
        _react2.default.createElement(
          'div',
          {
            className: 'row ' + classNames.inputContainer,
            style: _extends({}, style.inputContainer),
            id: this.state.id
          },
          _react2.default.createElement('input', {
            value: this.state.color,
            ref: function ref(_ref2) {
              _this2.input = _ref2;
            },
            onClick: function onClick() {
              return _this2.toggleActive(true);
            },
            onChange: function onChange(e) {
              return _this2.onColorChange(e.target.value);
            },
            spellCheck: false,
            className: classNames.input,
            style: style.input
          }),
          _react2.default.createElement('div', {
            className: 'color-picker-block ' + classNames.block,
            onClick: function onClick() {
              _this2.toggleActive(true);
              _this2.input.focus();
            },
            style: _extends({}, style.block, {
              background: this.state.color
            })
          })
        ),
        _react2.default.createElement(
          _Portal2.default,
          { id: this.state.id, style: styles.portal, ref: function ref(_ref3) {
              _this2.portal = _ref3;
            } },
          _react2.default.createElement(
            'div',
            { style: _extends({ display: 'grid' }, styles.pickerContainer) },
            !!this.state.picker.length && _react2.default.createElement(
              'div',
              {
                className: 'cursor-hand color-picker-toggle-button ' + classNames.toggleContainer,
                style: styles.toggleContainer,
                onClick: this.togglePicker
              },
              _react2.default.createElement(
                'div',
                {
                  className: 'button-center ' + classNames.toggle
                },
                'Toggle Picker'
              )
            ),
            ['compact'].includes(this.state.picker) && _react2.default.createElement(_reactColor.CompactPicker, _extends({
              onChange: function onChange(e) {
                return _this2.onColorChange(e);
              },
              color: this.state.color
            }, compactProps)),
            ['sketch'].includes(this.state.picker) && _react2.default.createElement(_reactColor.SketchPicker, _extends({
              onChange: function onChange(e) {
                return _this2.onColorChange(e);
              },
              color: this.state.color
            }, sketchProps)),
            !!this.state.picker.length && _react2.default.createElement(
              'div',
              {
                className: '' + classNames.applyContainer,
                style: styles.applyContainer
              },
              _react2.default.createElement(
                'div',
                {
                  className: 'cursor-hand color-picker-apply-button ' + classNames.apply,
                  style: styles.apply,
                  onClick: this.onApply
                },
                'Apply'
              )
            )
          )
        )
      ));
    }
  }]);

  return ColorPicker;
}(_react.Component);

ColorPicker.propTypes = {
  autoComplete: _propTypes2.default.string,
  didDrop: _propTypes2.default.bool,
  isOver: _propTypes2.default.bool,
  CascadeIcon: _propTypes2.default.any,
  cascadingKeyword: _propTypes2.default.any,
  config: _propTypes2.default.object,
  connectDropTarget: _propTypes2.default.any,
  droppedItem: _propTypes2.default.any,
  handleOnChange: _propTypes2.default.func.isRequired,
  handleDragDropOnInput: _propTypes2.default.func,
  handleAnywhereClick: _propTypes2.default.func,
  handleCascadeKeywordClick: _propTypes2.default.func,
  draggable: _propTypes2.default.bool,
  minChars: _propTypes2.default.number,
  formValues: _propTypes2.default.object,
  Icon: _propTypes2.default.any,
  requiredWarning: _propTypes2.default.bool,
  inline: _propTypes2.default.bool,
  tabIndex: _propTypes2.default.number,
  taMaxHeight: _propTypes2.default.string,
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

exports.default = (0, _reactDnd.DropTarget)('FormBuilderDraggable', boxTarget, collect)(ColorPicker);