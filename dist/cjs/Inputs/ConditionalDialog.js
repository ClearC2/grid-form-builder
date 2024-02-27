"use strict";

var _typeof = require("@babel/runtime-corejs3/helpers/typeof");

var _WeakMap = require("@babel/runtime-corejs3/core-js-stable/weak-map");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

var _Object$getOwnPropertyDescriptor = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _c2Dialog = require("c2-dialog");

var _immutable = require("immutable");

var _ConditionalPredicate = _interopRequireDefault(require("./ConditionalPredicate"));

var _Toggle = _interopRequireDefault(require("../QueryBuilder/Where/ConditionalTable/Toggle"));

function _getRequireWildcardCache(nodeInterop) { if (typeof _WeakMap !== "function") return null; var cacheBabelInterop = new _WeakMap(); var cacheNodeInterop = new _WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = _Object$defineProperty && _Object$getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? _Object$getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { _Object$defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var ConditionalDialog = function ConditionalDialog(props) {
  var value = props.value;

  var _useState = (0, _react.useState)(value && value.get ? value.get('conditions', (0, _immutable.List)()).size : 1),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      conditions = _useState2[0],
      setConditions = _useState2[1]; // const [value, setValue] = useState(props.value)


  (0, _react.useEffect)(function () {
    if (value && value.get('type')) {
      setConditions(value.get('conditions').size);
    } else {
      setConditions(1);
    }
  }, [value]);

  var onChange = function onChange(e, i) {
    if (conditions > 1) {
      if (value && !value.get('type')) {
        var filter = (0, _immutable.Map)({
          type: 'and',
          conditions: (0, _immutable.List)([value])
        });
        e.target.value = e.target.value.set('name', e.target.name);
        var newValues = filter.get('conditions', (0, _immutable.List)());

        if (!filter.getIn(['conditions', i])) {
          newValues = newValues.push(e.target.value);
        } else {
          newValues = newValues.set(i, e.target.value);
        }

        filter = filter.set('conditions', newValues);
        props.onChange({
          target: {
            name: e.target.name,
            value: filter
          }
        });
      } else {
        var _filter = value;

        var _newValues = _filter.get('conditions', (0, _immutable.List)());

        if (!_filter.getIn(['conditions', i])) {
          _newValues = _newValues.push(e.target.value);
        } else {
          _newValues = _newValues.set(i, e.target.value);
        }

        _filter = _filter.set('conditions', _newValues);
        props.onChange({
          target: {
            name: e.target.name,
            value: _filter
          }
        });
      }
    } else {
      props.onChange(e);
    }
  };

  var renderConditions = function renderConditions() {
    var conditionElements = [];

    for (var i = 0; i < conditions; i++) {
      var indexedValue = value;

      if (value && value.get('type')) {
        indexedValue = value.getIn(['conditions', i], (0, _immutable.Map)({
          condition: 'contains',
          values: (0, _immutable.List)()
        }));
      } else if (conditions > 1) {
        indexedValue = (0, _immutable.Map)({
          name: props.name,
          condition: 'contains',
          values: (0, _immutable.List)()
        });
      }

      if (typeof indexedValue === 'string') {
        indexedValue = (0, _immutable.Map)({
          name: props.name,
          condition: 'contains',
          values: (0, _immutable.List)()
        });
      }

      conditionElements.push( /*#__PURE__*/_react.default.createElement("div", {
        style: {
          borderTop: '1px solid lightgray'
        },
        key: i
      }, /*#__PURE__*/_react.default.createElement(_ConditionalPredicate.default, (0, _extends2.default)({}, props, {
        value: indexedValue,
        onChange: onChange,
        index: i
      }))));
    }

    return conditionElements;
  };

  var handleToggleClick = function handleToggleClick(e) {
    if (e) {
      // switch to or
      var filter = value;
      filter = filter.set('type', 'or');
      props.onChange({
        target: {
          name: props.name,
          value: filter
        }
      });
    } else {
      // switch to and
      var _filter2 = value;
      _filter2 = _filter2.set('type', 'and');
      props.onChange({
        target: {
          name: props.name,
          value: _filter2
        }
      });
    }
  };

  var closeModal = function closeModal() {
    return props.handleClose(false);
  };

  var addCondition = function addCondition() {
    return setConditions(conditions + 1);
  };

  return /*#__PURE__*/_react.default.createElement(_c2Dialog.Dialog, {
    size: {
      width: '800px',
      height: "420px"
    },
    default: {
      y: window.innerHeight / 2 - 250 + window.scrollY,
      x: window.innerWidth / 2 - 260
    },
    center: true,
    style: {
      background: '#fff',
      boxShadow: '0px 0px 15px #444',
      borderRadius: '5px',
      border: '2px solid #36a9e1',
      overflowY: 'visible'
    },
    enableResizing: true,
    disableDragging: true
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "gfb-condition-dialog-content",
    style: {
      width: '100%',
      height: '100%'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'row',
      padding: '10px',
      height: '54px'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: '90%'
    }
  }, /*#__PURE__*/_react.default.createElement("h4", {
    style: {
      height: '100%',
      margin: 0,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, props.label, " condition:"), conditions > 1 && value && value.get('type') && /*#__PURE__*/_react.default.createElement("span", {
    className: "pull-right",
    style: {
      marginTop: '-32px'
    }
  }, /*#__PURE__*/_react.default.createElement(_Toggle.default, {
    value: value.get('type') === 'and',
    onToggle: handleToggleClick,
    activeLabel: "and",
    inactiveLabel: "or"
  }))), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: '10%'
    }
  }, /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    className: "close",
    onClick: closeModal
  }, /*#__PURE__*/_react.default.createElement("span", null, "\xD7")))), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: '100%',
      height: 'calc(100% - 54px)',
      padding: '10px',
      overflow: 'auto',
      display: 'flex',
      flexDirection: 'column'
    }
  }, renderConditions()), /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    className: "btn btn-primary",
    style: {
      height: 35,
      position: 'absolute',
      bottom: 15,
      right: 90
    },
    onClick: addCondition
  }, "Add Condition"), /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    className: "btn btn-primary",
    style: {
      height: 35,
      position: 'absolute',
      bottom: 15,
      right: 30
    },
    onClick: closeModal
  }, "Ok")));
};

var _default = ConditionalDialog;
exports.default = _default;
ConditionalDialog.propTypes = {
  onChange: _propTypes.default.func,
  handleClose: _propTypes.default.func,
  handleOnChange: _propTypes.default.func,
  name: _propTypes.default.string,
  inputType: _propTypes.default.string,
  label: _propTypes.default.string,
  values: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number, _propTypes.default.array, _propTypes.default.object]),
  disabled: _propTypes.default.bool,
  readonly: _propTypes.default.bool,
  autofocus: _propTypes.default.bool,
  placeholder: _propTypes.default.string,
  tabIndex: _propTypes.default.number,
  autoComplete: _propTypes.default.string,
  interactive: _propTypes.default.bool,
  requiredWarning: _propTypes.default.bool,
  style: _propTypes.default.object,
  value: _propTypes.default.object,
  typeahead: _propTypes.default.object,
  keyword: _propTypes.default.object
};