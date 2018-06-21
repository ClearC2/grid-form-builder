var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import { Map, Set, List } from 'immutable';
import { Dialog } from 'c2-dialog';
import FormBuilder from '../GridFormBuilder';

/*
  Select Fields are converted to multiselects
  radio buttons are converted to multicheckboxes
  checkboxes are converted to multicheckboxes
 */

var SINGLE_FIELD_INPUTS = Set(['multiselect', 'typeahead', 'multicheckbox', 'listselect']);
var MULTI_FIELD_INPUTS = Set(['input', 'date', 'datetime', 'phone']);
var ONLY_CATEGORICAL_INPUT = Set(['multicheckbox', 'multiselect', 'listselect']);

var Conditionalinput = function (_Component) {
  _inherits(Conditionalinput, _Component);

  function Conditionalinput(props) {
    _classCallCheck(this, Conditionalinput);

    var _this = _possibleConstructorReturn(this, (Conditionalinput.__proto__ || Object.getPrototypeOf(Conditionalinput)).call(this, props));

    _this.handleToggleDialog = function () {
      var newState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !_this.state.showDialog;

      _this.setState({ showDialog: newState });
    };

    _this.getInputType = function () {
      return _this.props.config.inputType || 'input';
    };

    _this.convertListToOptions = function (list) {
      return list.map(function (opt) {
        return { value: opt, label: opt };
      });
    };

    _this.getInputTypeOptionsList = function (type) {
      if (ONLY_CATEGORICAL_INPUT.has(type)) {
        return _this.props.options.categorical;
      }
      return _this.props.options.all;
    };

    _this.calculateModalHeight = function () {
      var titleAndConditionHeight = 145;
      var singleFieldHight = _this.calculateFieldHeight(_this.getInputType()) * 32;
      var nFields = ONLY_CATEGORICAL_INPUT.has(_this.getInputType()) ? 1 : Math.max(_this.state.values.size, 1);
      nFields = Math.min(nFields, _this.getMaxFields());
      var size = titleAndConditionHeight + singleFieldHight * nFields;
      if (size > 500) {
        return '500';
      }
      return '' + size;
    };

    _this.calculateFieldHeight = function (type) {
      if (type === 'radio' || type === 'listselect' || type === 'multicheckbox') {
        return _this.props.config.keyword.options.length;
      }
      return 1;
    };

    _this.formSchema = function () {
      // for Dialog
      var name = _this.props.config.name;

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
                  options: _this.convertListToOptions(_this.getInputTypeOptionsList(_this.getInputType()))
                }
              }
            }, {
              type: 'field',
              dimensions: { x: 1, y: 2, h: _this.calculateFieldHeight(inputType), w: 8 },
              config: _extends({}, _this.props.config, {
                name: name + '-0',
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
      var maxFieldCount = _this.getMaxFields();
      if (MULTI_FIELD_INPUTS.has(_this.getInputType())) {
        var fieldCount = 1;
        while (fieldCount < maxFieldCount && fieldCount < _this.state.values.size + 1) {
          schema.form.jsonschema.layout.push({
            type: 'field',
            dimensions: { x: 1, y: fieldCount + 2, h: _this.calculateFieldHeight(inputType), w: 8 },
            config: {

              name: name + '-' + fieldCount,
              label: '     ...or',
              type: inputType
            }
          });
          fieldCount++;
        }
      }
      return schema.form;
    };

    _this.getMaxFields = function () {
      switch (_this.state.formValues.get('condition', '')) {
        case 'is between':
        case 'is not between':
          return 2;
        default:
          return 999;
      }
    };

    _this.parentFieldName = function () {
      return _this.props.config.name;
    };

    _this.getEventFieldIndex = function (e) {
      var name = e.target.name.split('-');
      return name[name.length - 1];
    };

    _this.handleOnChange = function (e) {
      if (_this.getInputType() === 'typeahead') {
        if (e.target.value.label) {
          e.target.name = _this.parentFieldName() + '-' + _this.state.values.size;
          e.target.value = e.target.value.label;
        } else if (_this.parentFieldName() !== e.target.name.split('-')[0]) {
          return; // escape if its an extraneous typeahead field)
        }
      }
      /* Categorical input come back as arrays and are always one field, and should be put directly into values.
        Other fields have one value per input field, and can have many fields, so have to be put into an array
        based on their input field index.
       */
      var newValues = void 0;
      if (SINGLE_FIELD_INPUTS.has(_this.getInputType())) {
        newValues = e.target.value;
      } else {
        newValues = _this.state.values.set(_this.getEventFieldIndex(e), e.target.value);
      }
      _this.setState({
        formValues: _this.state.formValues.set(e.target.name, e.target.value), // to update mini form
        values: newValues // to update parent readable values
      });
      if (_this.props.handleOnChange) {
        var valEvent = {
          target: {
            value: newValues.toJS(),
            name: _this.parentFieldName()
          }
        };
        _this.props.handleOnChange(valEvent);
        var conditionEvent = {
          target: {
            value: _this.state.formValues.get('condition', ''),
            name: _this.parentFieldName() + '-CONDITION'
          }
        };
        _this.props.handleOnChange(conditionEvent);
      }
    };

    _this.render = function () {
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
      var hideDisplay = _this.state.values.size === 0;
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
          {
            ref: 'conditionalInput-' + name + '-dialog',
            size: {
              width: '40%',
              height: _this.calculateModalHeight()
            },
            center: true,
            style: {
              background: '#fff',
              boxShadow: '0px 0px 15px #444',
              borderRadius: '5px',
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
    };

    _this.state = {
      formValues: Map({
        condition: _this.getInputTypeOptionsList(_this.getInputType())[0]
      }),
      values: List(),
      showDialog: false
    };
    return _this;
  }

  _createClass(Conditionalinput, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      if (props.formValues.get(this.parentFieldName(), '') === '') {
        this.setState({
          formValues: Map({
            condition: this.getInputTypeOptionsList(this.getInputType())[0]
          })
        });
      }
    }
  }]);

  return Conditionalinput;
}(Component);

Conditionalinput.defaultProps = {
  options: {
    all: ['contains', 'is equal to', 'is not equal to', 'does not contain', 'is between', 'is not between', 'is equal to', 'is not equal to', 'is between', 'is not between', 'contains', 'does not contain', 'is greater than', 'is less than', 'is one of', 'is not one of'],
    text: ['contains', 'is equal to', 'is not equal to', 'does not contain', 'is between', 'is not between'],
    number: ['is equal to', 'is not equal to', 'is between', 'is not between', 'contains', 'does not contain', 'is greater than', 'is less than'],
    categorical: ['is one of', 'is not one of']
  }
};
export default Conditionalinput;