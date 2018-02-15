var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import { Map, Set, List } from 'immutable';
import { Portal } from 'react-portal';
import { Dialog } from 'c2-dialog';
import ReactDom from 'react-dom';
import FormBuilder from '../GridFormBuilder';

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
    }, _this.formSchema = function () {
      var _Map;

      // for Dialog
      var _this$state = _this.state,
          formValues = _this$state.formValues,
          doubleFields = _this$state.doubleFields;
      var field = _this.props.field;

      var condition = formValues.get('condition');
      var inputType = _this.props.opts.inputType || 'input';
      var schema = Map((_Map = {}, _defineProperty(_Map, field, {
        label: (_this.props.opts.label || field) + ' condition:',
        type: 'Header',
        dimensions: { x: 0, y: 0, h: 1, w: 6 }
      }), _defineProperty(_Map, 'condition', {
        type: 'select',
        options: _this.props.conditionOptions,
        dimensions: { x: 6, y: 0, h: 1, w: 6 },
        label: 'Condition'
      }), _defineProperty(_Map, 'low ' + field, {
        type: inputType,
        label: '' + (_this.props.opts.label || field),
        dimensions: { x: 3, y: 0, h: 1, w: 6 }
      }), _defineProperty(_Map, 'high ' + field, {
        type: inputType,
        label: doubleFields.includes(condition) ? '' + (_this.props.opts.label || field) : '',
        dimensions: { x: 3, y: 3, h: 1, w: 6 },
        style: { opacity: doubleFields.includes(condition) ? 1 : 0 }
      }), _Map));
      if (inputType === 'Multiselect') {
        schema = schema.set('');
        console.log('ERROR: Multiselect has not been implemented for conditional inputs');
      }
      return schema.toJS();
    }, _this.handleOnChange = function (e) {
      var doubleFields = _this.state.doubleFields;

      var newValues = _this.state.formValues;
      // fix field values if condition changes from multi to single input
      if (e.target.name === 'condition' && !doubleFields.includes(e.target.value)) {
        newValues = newValues.delete('high ' + _this.props.field);
      }
      if (e.target.value === '') {
        newValues = newValues.delete(e.target.name);
      } else {
        newValues = newValues.set(e.target.name, e.target.value);
      }
      _this.setState({ formValues: newValues });
      if (_this.props.handleOnChange) {
        var valObject = _this.buildValueObject(newValues);
        var event = { target: { value: valObject, name: _this.props.field } };
        _this.props.handleOnChange(event);
      }
    }, _this.buildValueObject = function (formValues) {
      var field = _this.props.field;
      var doubleFields = _this.state.doubleFields;
      // get current values

      var condition = formValues.get('condition', '');
      var low = formValues.get('low ' + field, '');
      var high = formValues.get('high ' + field, '');
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
    }, _this.render = function () {
      var _this$props = _this.props,
          field = _this$props.field,
          _this$props$opts = _this$props.opts,
          opts = _this$props$opts === undefined ? {} : _this$props$opts; // formValues = Map(), handleOnChange = () => {},

      var _opts$label = opts.label,
          label = _opts$label === undefined ? field : _opts$label,
          _opts$style = opts.style,
          style = _opts$style === undefined ? {} : _opts$style,
          _opts$labelStyle = opts.labelStyle,
          labelStyle = _opts$labelStyle === undefined ? {} : _opts$labelStyle,
          _opts$Icon = opts.Icon,
          Icon = _opts$Icon === undefined ? null : _opts$Icon,
          _opts$iconProps = opts.iconProps,
          iconProps = _opts$iconProps === undefined ? {} : _opts$iconProps; // , props = {}
      // hideDisplay is a bool deciding whether to show colored 'Values...' text in form field or not

      var hideDisplay = _this.props.formValues.getIn([field, 'condition'], '') === '' && _this.props.formValues.getIn([field, 'values', 0], '') === '';
      return React.createElement(
        'div',
        { style: { display: 'flex', flex: 1, flexDirection: 'row' } },
        React.createElement(
          'div',
          { style: _extends({ display: 'flex', flexDirection: 'row', width: 150, minWidth: 150, height: 15, marginTop: 4 }, labelStyle) },
          !!Icon && React.createElement(Icon, _extends({ size: 20, style: { marginRight: 5, width: 20 } }, iconProps)),
          React.createElement(
            'strong',
            { style: _extends({ display: 'flex', justifyContent: 'flex-start', lineHeight: '23px', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }, labelStyle) },
            label
          )
        ),
        React.createElement(
          Portal,
          {
            isOpened: _this.state.showDialog,
            ref: 'conditionalInput-' + field + '-portal',
            node: document && document.getElementById('conditionalInput-' + field),
            closeOnOutsideClick: true,
            closeOnEsc: true,
            onClose: function onClose() {
              _this.handleToggleDialog(false);
            }
          },
          React.createElement(
            Dialog,
            { size: { width: '430px', height: '180px', overflow: 'hidden' }, style: { backgroundColor: '#f5f5f5', border: '2px solid #36a9e1' } },
            React.createElement(
              'button',
              { type: 'button', className: 'close', style: { paddingRight: '10px', paddingTop: '5px', display: 'inline-block' }, onClick: function onClick() {
                  _this.handleToggleDialog(false);
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
              React.createElement(FormBuilder, { formName: 'conditionalInput-' + field, formSchema: _this.formSchema(), formValues: _this.state.formValues, handleOnChange: _this.handleOnChange, draggable: false })
            )
          )
        ),
        React.createElement(
          'div',
          {
            onClick: function onClick() {
              _this.handleToggleDialog(true);
            },
            id: 'conditionalInput-' + field,
            style: _extends({
              display: 'flex',
              flexGrow: 1,
              textAlign: 'center',
              whiteSpace: 'nowrap',
              paddingLeft: 5,
              border: 0,
              backgroundColor: 'transparent',
              borderBottom: '1px solid #a0a0a0',
              minWidth: 90,
              color: '#1e8fc6'
            }, style)
          },
          hideDisplay ? '' : 'Values...'
        )
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Conditionalinput, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({
        formValues: this.state.formValues.set('condition', this.props.conditionOptions[0]),
        doubleFields: Set(this.props.doubleFields)
      }); // sets a default condition value
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      if (props.formValues.get(this.props.field, '') === '') {
        var _Map2;

        this.setState({
          formValues: Map((_Map2 = {
            condition: this.props.conditionOptions[0],
            doubleFields: Set(this.props.doubleFields)
          }, _defineProperty(_Map2, 'low ' + this.props.field, ''), _defineProperty(_Map2, 'high ' + this.props.field, ''), _Map2))
        });
      }
    }

    // onModalOpen = () => {
    //   const portal = this.refs[`conditionalInput-${this.props.field}-portal`]
    //   const fieldPos = ReactDom.findDOMNode(this).getBoundingClientRect()
    //   portal.node.style.position = 'absolute'
    //   portal.node.style.top = `${fieldPos.top + document.documentElement.scrollTop}px`
    //   portal.node.style.left = `${fieldPos.left + document.documentElement.scrollLeft}px`
    //   // console.log(portal, portal.node, portal.node.style, ReactDom.findDOMNode(this).getBoundingClientRect(), fieldPos, 'portal logggs')
    // }

  }]);

  return Conditionalinput;
}(Component);

Conditionalinput.defaultProps = {
  conditionOptions: ['is equal to', 'is not equal to', 'is between', 'contains:', 'does not contain'],
  doubleFields: ['is between'] // conditionOptions part of this set will have two input fields. others only one.
};
export default Conditionalinput;