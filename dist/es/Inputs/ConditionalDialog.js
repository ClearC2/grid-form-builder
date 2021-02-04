import _extends from "@babel/runtime-corejs3/helpers/esm/extends";
import _slicedToArray from "@babel/runtime-corejs3/helpers/esm/slicedToArray";
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Dialog } from 'c2-dialog';
import { Map, List } from 'immutable';
import ConditionalPredicate from './ConditionalPredicate';
import Toggle from '../QueryBuilder/Where/ConditionalTable/Toggle';

var ConditionalDialog = function ConditionalDialog(props) {
  var value = props.value;

  var _useState = useState(value && value.get ? value.get('conditions', List()).size : 1),
      _useState2 = _slicedToArray(_useState, 2),
      conditions = _useState2[0],
      setConditions = _useState2[1]; // const [value, setValue] = useState(props.value)


  useEffect(function () {
    console.log(value, 'value logggggggg');

    if (value && value.get('type')) {
      setConditions(value.get('conditions').size);
    } else {
      setConditions(1);
    }
  }, [value]);

  var onChange = function onChange(e, i) {
    if (conditions > 1) {
      if (value && !value.get('type')) {
        var filter = Map({
          type: 'and',
          conditions: List([value])
        });
        e.target.value = e.target.value.set('name', e.target.name);
        var newValues = filter.get('conditions', List());

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

        var _newValues = _filter.get('conditions', List());

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
        indexedValue = value.getIn(['conditions', i], Map({
          condition: 'contains',
          values: List()
        }));
      } else if (conditions > 1) {
        indexedValue = Map({
          condition: 'contains',
          values: List()
        });
      }

      console.log(indexedValue, 'value logggggg');

      if (typeof indexedValue === 'string') {
        indexedValue = Map({
          condition: 'contains',
          values: List()
        });
      }

      conditionElements.push(React.createElement("div", {
        style: {
          borderTop: '1px solid lightgray'
        }
      }, React.createElement(ConditionalPredicate, _extends({}, props, {
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

  return React.createElement(Dialog, {
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
  }, React.createElement("div", {
    style: {
      width: '100%',
      height: '100%'
    }
  }, React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'row',
      padding: '10px',
      height: '54px'
    }
  }, React.createElement("div", {
    style: {
      width: '90%'
    }
  }, React.createElement("h4", {
    style: {
      height: '100%',
      margin: 0,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, props.label, " condition:"), conditions > 1 && value && value.get('type') && React.createElement("span", {
    className: "pull-right",
    style: {
      marginTop: '-32px'
    }
  }, React.createElement(Toggle, {
    value: value.get('type') === 'and',
    onToggle: handleToggleClick,
    activeLabel: "and",
    inactiveLabel: "or"
  }))), React.createElement("div", {
    style: {
      width: '10%'
    }
  }, React.createElement("button", {
    type: "button",
    className: "close",
    onClick: closeModal
  }, React.createElement("span", null, "\xD7")))), React.createElement("div", {
    style: {
      width: '100%',
      height: 'calc(100% - 54px)',
      padding: '10px',
      overflow: 'auto',
      display: 'flex',
      flexDirection: 'column'
    }
  }, renderConditions()), React.createElement("button", {
    type: "button",
    className: "btn btn-primary",
    style: {
      height: 35,
      position: 'absolute',
      bottom: 15,
      right: 90
    },
    onClick: addCondition
  }, "Add Condition"), React.createElement("button", {
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

export default ConditionalDialog;
ConditionalDialog.propTypes = {
  onChange: PropTypes.func,
  handleClose: PropTypes.func,
  handleOnChange: PropTypes.func,
  name: PropTypes.string,
  inputType: PropTypes.string,
  label: PropTypes.string,
  values: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object]),
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  autofocus: PropTypes.bool,
  placeholder: PropTypes.string,
  tabIndex: PropTypes.number,
  autoComplete: PropTypes.string,
  interactive: PropTypes.bool,
  requiredWarning: PropTypes.bool,
  style: PropTypes.object,
  value: PropTypes.object,
  typeahead: PropTypes.object,
  keyword: PropTypes.object
};