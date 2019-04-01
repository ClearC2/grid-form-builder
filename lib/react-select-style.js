'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var reactSelectStyles = function reactSelectStyles() {
  return {
    clearIndicator: function clearIndicator() {
      return {
        color: '#a0a0a0',
        cursor: 'pointer',
        height: '25px',
        marginTop: '3px',
        minHeight: '25px',
        '&:hover': {
          color: '#ec1c24'
        }
      };
    },
    control: function control(base) {
      return _extends({}, base, {
        border: '1px solid #a0a0a0',
        borderRadius: '1px',
        height: '25px',
        minHeight: '25px'
      });
    },
    dropdownIndicator: function dropdownIndicator() {
      return {
        color: '#a0a0a0',
        cursor: 'pointer',
        height: '25px',
        marginTop: '3px',
        minHeight: '25px',
        marginRight: '4px'
      };
    },
    indicatorSeparator: function indicatorSeparator(base) {
      return _extends({}, base, {
        display: 'none'
      });
    },
    menu: function menu(base) {
      return _extends({}, base, {
        borderRadius: '1px',
        height: '30px',
        margin: 0
      });
    },
    menuList: function menuList(base) {
      return _extends({}, base, {
        background: '#f5f5f5',
        border: '1px solid #a0a0a0',
        maxHeight: '250px',
        color: '#404d54',
        overflow: 'scroll'
      });
    },
    menuPortal: function menuPortal(base) {
      return _extends({}, base, {
        zIndex: Number.MAX_SAFE_INTEGER
      });
    },
    multiValue: function multiValue(base) {
      return _extends({}, base, {
        background: 'rgba(0, 126, 225, 0.08)'
      });
    },
    multiValueLabel: function multiValueLabel(base) {
      return _extends({}, base, {
        color: '#007eff'
      });
    },
    multiValueRemove: function multiValueRemove(base) {
      return _extends({}, base, {
        color: '007eff',
        cursor: 'pointer'
      });
    },
    option: function option(base) {
      return _extends({}, base, {
        borderBottom: '1px solid #a0a0a0',
        paddingTop: '4px',

        '&:hover': {
          background: '#36a9e1',
          color: '#f5f5f5'
        }
      });
    },
    valueContainer: function valueContainer(base) {
      return _extends({}, base, {
        padding: 0,
        marginTop: '-4px',
        paddingBottom: '4px',
        paddingLeft: '4px'
      });
    }
  };
};

exports.reactSelectStyles = reactSelectStyles;