var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import { Map, Set, List } from 'immutable';
import { Dialog } from 'c2-dialog';
import ReactDom from 'react-dom';
import FormBuilder from '../GridFormBuilder';

var TEXT_INPUTS = Set(['textarea']);
var NUMBER_INPUTS = Set(['phone', 'input', 'date', 'datetime']);
var CATEGORICAL_INPUTS = Set(['multiselect', 'typeahead', 'checkbox', 'radio', 'select', 'listselect', 'multicheckbox']);

var Conditionalinput = function (_Component) {
  _inherits(Conditionalinput, _Component);

  function Conditionalinput() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Conditionalinput);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Conditionalinput.__proto__ || Object.getPrototypeOf(Conditionalinput)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      formValues: Map(),
      doubleFields: Set(),
      showDialog: false
    }, _this.typeaheadValues = Map(), _this.getInputType = function () {
      return _this.props.config.inputType || 'input';
    }, _this.convertListToOptions = function (list) {
      return list.map(function (opt) {
        return { value: opt, label: opt };
      });
    }, _this.getInputTypeOptionsList = function (type) {
      if (TEXT_INPUTS.has(type)) {
        return _this.props.options.text;
      } else if (NUMBER_INPUTS.has(type)) {
        return _this.props.options.number;
      } else if (CATEGORICAL_INPUTS.has(type)) {
        return _this.props.options.categorical;
      }
      return _this.props.options.text;
    }, _this.calculateFieldHeight = function (type) {
      if (type === 'radio' || type === 'listselect' || type === 'multicheckbox') {
        return _this.props.config.keyword.options.length;
      }
      return 1;
    }, _this.formSchema = function () {
      // for Dialog
      var _this$state = _this.state,
          formValues = _this$state.formValues,
          doubleFields = _this$state.doubleFields;
      var name = _this.props.config.name;

      var condition = formValues.get('condition');
      var inputType = _this.getInputType();
      var schema = {
        form: {
          name: 'Conditional Input1',
          description: 'allow more complex inputs.',
          jsonschema: {
            layout: [{
              type: 'field',
              dimensions: { x: 0, y: 0, h: 1, w: 6 },
              config: {
                name: name,
                type: 'header',
                label: (_this.props.config.label || name) + ' condition:'
              }
            }, {
              type: 'field',
              dimensions: { x: 1, y: 1, h: 1, w: 6 },
              config: {
                name: 'condition',
                label: 'Condition',
                type: 'select',
                keyword: {
                  category: 'NONE',
                  options: _this.convertListToOptions(_this.getInputTypeOptionsList(inputType))
                }
              }
            }, {
              type: 'field',
              dimensions: { x: 1, y: 2, h: _this.calculateFieldHeight(inputType), w: 6 },
              config: _extends({}, _this.props.config, {
                name: 'low ' + name,
                label: '' + (_this.props.config.label || name),
                type: inputType
              })
            }]
          }
        },
        id: 'FDC58F0F0B2099E61BE23AB6110572E1',
        lastUpdateDate: '2018-02-26 10:16:14',
        lastUpdateBy: 'will darden',
        createdDate: '2018-02-26 10:16:14',
        createdBy: 'will darden'
      };
      if (doubleFields.includes(condition)) {
        schema.form.jsonschema.layout.push({
          type: 'field',
          dimensions: { x: 1, y: 3, h: 1, w: 6 },
          config: _extends({}, _this.props.config, {
            name: 'high ' + name,
            label: doubleFields.includes(condition) ? '' + (_this.props.config.label || name) : '',
            type: inputType
          })
        });
      }
      return schema.form;
    }, _this.handleOnChange = function (e) {
      var doubleFields = _this.state.doubleFields;

      var newValues = _this.state.formValues;
      if (e.target.value === '') {
        var _Map;

        var event = { target: { value: '', name: _this.props.config.name } };
        _this.setState({
          formValues: Map((_Map = {
            condition: _this.getInputTypeOptionsList(_this.getInputType())[0],
            doubleFields: Set(_this.props.doubleFields)
          }, _defineProperty(_Map, 'low ' + _this.props.config.name, ''), _defineProperty(_Map, 'high ' + _this.props.config.name, ''), _Map))
        });
        if (_this.props.handleOnChange) {
          _this.props.handleOnChange(event);
        }
        return;
      }
      if (_this.props.config.inputType === 'multiselect') {
        if (e.target.name === 'condition') {
          newValues = newValues.set(e.target.name, e.target.value);
        } else {
          newValues = newValues.set(e.target.name, e.target.value.get('values', []).toJS());
        }
      } else if (_this.props.config.inputType === 'typeahead') {
        if (e.target.name === 'condition' || e.target.name.split(' ')[0] === 'low') {
          _this.typeaheadValues = _this.typeaheadValues.set(e.target.name, e.target.value);
        }
        _this.typeaheadValues.forEach(function (value, key) {
          newValues = newValues.set(key, value);
        });
      } else {
        newValues = newValues.set(e.target.name, e.target.value);
      }
      _this.setState({ formValues: newValues });
      if (_this.props.handleOnChange) {
        var valObject = _this.buildValueObject(newValues);
        var _event = { target: { value: valObject, name: _this.props.config.name } };
        _this.props.handleOnChange(_event);
      }
      // else {
      //   // fix field values if condition changes from multi to single input
      //   if (e.target.name === 'condition' && !doubleFields.includes(e.target.value)) {
      //     newValues = newValues.delete(`high ${this.props.config.name}`)
      //   }
      //   if (e.target.value === '') {
      //     newValues = newValues.delete(e.target.name)
      //   } else {
      //     newValues = newValues.set(e.target.name, e.target.value)
      //   }
      //   this.setState({formValues: newValues})
      //   console.log(e.target.name, e.target.value, 'formValues:', this.state.formValues, 'newValues:', newValues, 'props:', this.props, 'state:', this.state, 'val loggggggg 2')
      //   if (this.props.handleOnChange) {
      //     const valObject = this.buildValueObject(newValues)
      //     const event = {target: {value: valObject, name: this.props.config.name}}
      //     this.props.handleOnChange(event)
      //   }
      // }
    }, _this.buildValueObject = function (formValues) {
      var name = _this.props.config.name;

      if (_this.props.config.inputType === 'multiselect') {
        return Map({ condition: formValues.get('condition', ''), values: formValues.get('low ' + name, '') });
      }

      var doubleFields = _this.state.doubleFields;
      // get current values

      var condition = formValues.get('condition', '');
      var low = formValues.get('low ' + name, '');
      var high = formValues.get('high ' + name, '');
      if (!doubleFields.includes(condition)) {
        high = '';
      } else {
        if (parseInt(low) > parseInt(high)) {
          var tmp = low;
          low = high;
          high = tmp;
        }
      }
      var vals = List();
      if (condition !== '' || low !== '') {
        vals = vals.push(low);
      }
      if (high !== '') {
        vals = vals.push(high);
      }
      return Map({ condition: condition, values: vals });
    }, _this.handleToggleDialog = function () {
      var newState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !_this.state.showDialog;

      _this.setState({ showDialog: newState });
      _this.onModalOpen();
    }, _this.onModalOpen = function () {
      var fieldPos = ReactDom.findDOMNode(_this).getBoundingClientRect();
      _this.setState({ fieldPos: fieldPos });
    }, _this.render = function () {
      var inputType = _this.getInputType();
      var _this$props = _this.props,
          inline = _this$props.inline,
          _this$props$formValue = _this$props.formValues,
          formValues = _this$props$formValue === undefined ? Map() : _this$props$formValue,
          _this$props$config = _this$props.config,
          config = _this$props$config === undefined ? {} : _this$props$config,
          _this$props$Icon = _this$props.Icon,
          Icon = _this$props$Icon === undefined ? null : _this$props$Icon,
          requiredWarning = _this$props.requiredWarning;
      var _config$labelStyle = config.labelStyle,
          labelStyle = _config$labelStyle === undefined ? {} : _config$labelStyle,
          _config$style = config.style,
          style = _config$style === undefined ? {} : _config$style,
          _config$name = config.name,
          name = _config$name === undefined ? null : _config$name,
          _config$iconStyle = config.iconStyle,
          iconStyle = _config$iconStyle === undefined ? {} : _config$iconStyle,
          _config$required = config.required,
          required = _config$required === undefined ? false : _config$required;

      if (!name) return null;
      var _config$label = config.label,
          label = _config$label === undefined ? name : _config$label;

      var warn = requiredWarning && formValues.get(name, '').length === 0 && required;
      // hideDisplay is a bool deciding whether to show colored 'Values...' text in form field or not
      var hideDisplay = !(_this.state.formValues.get('low ' + _this.props.config.name, false) || _this.state.formValues.get('high ' + _this.props.config.name, false));

      var styles = {
        container: {
          display: 'flex',
          flex: 1,
          flexDirection: inline ? 'row' : 'column',
          background: 'transparent'
        },
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
          color: '#383e4b',
          background: 'transparent'
        }, labelStyle),
        input: _extends({
          display: 'flex',
          flexGrow: inline ? 1 : 0,
          paddingLeft: 5,
          backgroundColor: 'transparent',
          borderBottom: warn ? '1px solid #ec1c24' : '1px solid #a0a0a0',
          borderTop: inline ? 0 : warn ? '1px solid #ec1c24' : '1px solid #a0a0a0',
          borderLeft: inline ? 0 : warn ? '1px solid #ec1c24' : '1px solid #a0a0a0',
          borderRight: inline ? 0 : warn ? '1px solid #ec1c24' : '1px solid #a0a0a0',
          minWidth: 177,
          color: '#2b71e2',
          height: inline ? 'auto' : 25
        }, style),
        icon: _extends({
          marginRight: 5,
          width: 15,
          height: 15,
          marginTop: inline ? 4 : -1
        }, iconStyle)
      };
      return React.createElement(
        'div',
        { style: styles.container },
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
            { style: styles.label },
            label
          )
        ),
        React.createElement(
          'div',
          { onClick: function onClick() {
              _this.handleToggleDialog(true);
            }, id: 'conditionalInput-' + name + '-id', style: styles.input },
          hideDisplay ? '' : 'Values...'
        ),
        _this.state.showDialog && React.createElement(
          Dialog,
          { ref: 'conditionalInput-' + name + '-dialog', size: { width: '40%', height: 170 + _this.calculateFieldHeight(inputType) * 22 + 'px' },
            center: true,
            style: {
              background: '#fff',
              boxShadow: '0px 0px 15px #444',
              borderRadius: '5px',
              padding: 10,
              // backgroundColor: '#f5f5f5',
              border: '2px solid #36a9e1',
              position: 'fixed',
              top: '30%', // `${this.state.fieldPos.top - 180 > 0 ? this.state.fieldPos.top - 180 : 30}px`,
              left: '30%', // `${this.state.fieldPos.left + 100}px`,
              bottom: '100px',
              overflowY: 'visible'
            },
            enableResizing: true,
            disableDragging: true
          },
          React.createElement(
            'button',
            { type: 'button', className: 'close', style: { paddingRight: '10px', paddingTop: '5px', display: 'inline-block' }, onClick: function onClick() {
                return _this.handleToggleDialog(false);
              } },
            React.createElement(
              'span',
              null,
              '\xD7'
            )
          ),
          React.createElement(
            'div',
            { style: { display: 'flex', flexDirection: 'column', flex: 1, width: '100%' } },
            React.createElement(FormBuilder, { inline: true, formName: 'conditionalInput-' + name, formSchema: _this.formSchema(), formValues: _this.state.formValues, handleOnChange: _this.handleOnChange, draggable: false })
          )
        )
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Conditionalinput, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({
        formValues: this.state.formValues.set('condition', this.getInputTypeOptionsList(this.getInputType())[0]),
        doubleFields: Set(this.props.doubleFields)
      }); // sets a default condition value
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      if (props.formValues.get(this.props.config.name, '') === '') {
        var _Map2;

        this.setState({
          formValues: Map((_Map2 = {
            condition: this.getInputTypeOptionsList(this.getInputType())[0],
            doubleFields: Set(this.props.doubleFields)
          }, _defineProperty(_Map2, 'low ' + this.props.config.name, ''), _defineProperty(_Map2, 'high ' + this.props.config.name, ''), _Map2))
        });
      }
    }
  }]);

  return Conditionalinput;
}(Component);

Conditionalinput.defaultProps = {
  doubleFields: ['is between', 'is not between'], // conditionOptions part of this set will have two input fields. others only one.
  options: {
    text: ['contains', 'is equal to', 'is not equal to', 'does not contain', 'is between', 'is not between'],
    number: ['is equal to', 'is not equal to', 'is between', 'is not between', 'contains', 'does not contain', 'is greater than', 'is less than'],
    categorical: ['is one of', 'is not one of']
  }
};
export default Conditionalinput;