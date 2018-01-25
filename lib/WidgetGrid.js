var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Map, fromJS } from 'immutable';
import sizeMe from 'react-sizeme';
import { Responsive } from 'react-grid-layout';
import CustomGridWidthProvider from './CustomGridWidthProvider';
import '../node_modules/react-grid-layout/css/styles.css';
import '../node_modules/react-resizable/css/styles.css';

import { setComponentLayouts } from './redux';

var GridLayout = CustomGridWidthProvider(Responsive);
var SizeMeHOC = sizeMe({ monitorHeight: true });
var SizedWidgetWrapper = SizeMeHOC(WidgetWrapper);

export var Grid = function (_Component) {
  _inherits(Grid, _Component);

  function Grid(props) {
    _classCallCheck(this, Grid);

    var _this = _possibleConstructorReturn(this, (Grid.__proto__ || Object.getPrototypeOf(Grid)).call(this, props));

    _this.handleLayoutChange = function (currentLayout, allLayouts) {
      if (!_this.props.saveLayout) return;

      var _this$props = _this.props,
          appState = _this$props.appState,
          compName = _this$props.compName,
          _this$props$dashboard = _this$props.dashboard,
          dashboard = _this$props$dashboard === undefined ? false : _this$props$dashboard,
          _this$props$location = _this$props.location,
          location = _this$props$location === undefined ? { pathname: '/' } : _this$props$location;

      var keyPath = [compName];
      var pathDashboard = location.pathname.split('/')[1] ? location.pathname.split('/')[1] : 'landingPage';
      if (dashboard) {
        keyPath = Array.isArray(compName) ? compName : [pathDashboard, compName];
      }
      keyPath.push('layouts');
      var savedLayouts = appState.getIn(keyPath, Map());

      var layouts = _extends({}, allLayouts);

      var bp = _this.determineBreakpoint() || 'xxl';

      layouts[bp] = currentLayout;

      keyPath.pop();
      var name = dashboard ? keyPath : compName;
      if (!fromJS(layouts).equals(savedLayouts)) {
        _this.props.setComponentLayouts(name, allLayouts, true);
      }
    };

    _this.handleRemoveWidgetClick = function (id) {
      var bp = _this.determineBreakpoint() || 'xxl';
      var layout = _this.props.layouts[bp] || [];
      var _this$props2 = _this.props,
          compName = _this$props2.compName,
          _this$props2$location = _this$props2.location,
          location = _this$props2$location === undefined ? { pathname: '/' } : _this$props2$location,
          _this$props2$dashboar = _this$props2.dashboard,
          dashboard = _this$props2$dashboar === undefined ? false : _this$props2$dashboar;


      var newLayouts = _extends({}, _this.props.layouts, _defineProperty({}, bp, layout.filter(function (l) {
        return l.i !== id;
      })));

      if (_this.props.handleRemoveWidgetClick) {
        newLayouts = _this.props.handleRemoveWidgetClick(id, _extends({}, newLayouts), bp);
      }

      var name = compName;
      if (dashboard) {
        var pathDashboard = location.pathname.split('/')[1] ? location.pathname.split('/')[1] : 'landingPage';
        name = Array.isArray(compName) ? compName : [pathDashboard, compName];
      }

      _this.props.setComponentLayouts(name, newLayouts, true);
    };

    _this.breakpoints = { xxl: 2200, xl: 1920, lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0
      // all forms and dashboards use these breakpoints, if you change this there will be a cascade issue with sizing throughout the app
    };
    _this.cols = { xxl: 12, xl: 12, lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 };

    _this.componentDidMount = function () {
      var _this$props3 = _this.props,
          compName = _this$props3.compName,
          _this$props3$location = _this$props3.location,
          location = _this$props3$location === undefined ? { pathname: '/' } : _this$props3$location,
          _this$props3$dashboar = _this$props3.dashboard,
          dashboard = _this$props3$dashboar === undefined ? false : _this$props3$dashboar;

      var name = compName;
      if (dashboard) {
        var pathDashboard = location.pathname.split('/')[1] ? location.pathname.split('/')[1] : 'landingPage';
        name = Array.isArray(compName) ? compName : [pathDashboard, compName];
      }
      if (!_this.props.appState.get(name, null)) {
        // if current component has no layouts in redux, add this one
        var layout = [];
        var breakpoint = _this.determineBreakpoint() || 'xxl';

        React.Children.forEach(_this.props.children, function (child, i) {
          var key = child.props.gridId || (child.props.defaultDataGrid ? child.props.defaultDataGrid.i : i);
          var dataGrid = void 0;
          if (_this.props.layouts) {
            var _layout = _this.props.layouts[breakpoint] || [];
            dataGrid = _layout.find(function (item) {
              return item.i === key;
            });
          }
          if (!dataGrid) dataGrid = child.props.defaultDataGrid;
          if (dataGrid) layout.push(dataGrid);
        });

        _this.props.setComponentLayouts(name, _defineProperty({}, breakpoint, layout), true);
      }
    };

    _this.determineBreakpoint = _this.determineBreakpoint.bind(_this);
    return _this;
  }

  _createClass(Grid, [{
    key: 'determineBreakpoint',
    value: function determineBreakpoint() {
      var breakpoint = void 0;

      if (this.grid) {
        for (var key in this.breakpoints) {
          if (this.breakpoints[key] < this.grid.state.width) {
            breakpoint = key;
            break;
          }
        }
      } else {
        var breakpoints = Object.entries(this.breakpoints);

        breakpoints = breakpoints.reverse();

        var breakpointTuple = breakpoints.find(function (b) {
          return b[1] >= window.innerWidth;
        });

        breakpoint = breakpointTuple ? breakpointTuple[0] : breakpoint;
      }

      return breakpoint;
    }

    // must be from largest to smallest

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var layout = [];
      var children = [];

      var breakpoint = this.determineBreakpoint() || 'xxl';

      React.Children.forEach(this.props.children, function (child, i) {
        var key = child.props.gridId || (child.props.defaultDataGrid ? child.props.defaultDataGrid.i : i);

        var dataGrid = void 0;

        if (_this2.props.layouts) {
          var _layout2 = _this2.props.layouts[breakpoint] || [];
          dataGrid = _layout2.find(function (item) {
            return item.i === key;
          });
        }

        if (!dataGrid) {
          var _props = _this2.props,
              compName = _props.compName,
              appState = _props.appState,
              _props$location = _props.location,
              location = _props$location === undefined ? { pathname: '/' } : _props$location,
              _props$dashboard = _props.dashboard,
              dashboard = _props$dashboard === undefined ? false : _props$dashboard;

          var name = [compName];
          if (dashboard) {
            var pathDashboard = location.pathname.split('/')[1] ? location.pathname.split('/')[1] : 'landingPage';
            name = [pathDashboard, compName];
          }
          name.push('layouts');
          var currentLayout = appState.getIn(name, Map());
          if (currentLayout.size === 1) currentLayout = currentLayout.first();else if (currentLayout.get(breakpoint)) currentLayout = currentLayout.get(breakpoint);else currentLayout = null;
          if (currentLayout) {
            // if we have the current layout in redux and have a handle for it, use it
            currentLayout.some(function (widget) {
              if (child.props.defaultDataGrid.i === widget.get('i')) {
                dataGrid = JSON.parse(JSON.stringify(widget.toJS())); // this shenanigans removes keys that have undefined values
                return true;
              } else return false;
            });
          } else {
            dataGrid = child.props.defaultDataGrid;
          }
        }

        if (dataGrid) {
          // if component is explicitly passed a size prop, we don't want to overwrite it
          var _Component2 = child.props.size ? WidgetWrapper : SizedWidgetWrapper;

          layout.push(dataGrid);
          children.push(React.createElement(
            'div',
            {
              key: key,
              style: { background: 'white', overflow: 'visible', height: '100%' }
            },
            React.createElement(_Component2, {
              key: key,
              widgetKey: key,
              handleRemoveWidgetClick: _this2.handleRemoveWidgetClick,
              child: child
            })
          ));
        }
      });

      var layouts = this.props.layouts;

      if (layouts) {
        // make sure all layouts have the same number of widgets
        Object.keys(this.breakpoints).forEach(function (bp) {
          if ((layouts[bp] || []).length !== layout.length) {
            layouts[bp] = layout;
          }
        });
      } else {
        var _props2 = this.props,
            compName = _props2.compName,
            appState = _props2.appState,
            _props2$location = _props2.location,
            location = _props2$location === undefined ? { pathname: '/' } : _props2$location,
            _props2$dashboard = _props2.dashboard,
            dashboard = _props2$dashboard === undefined ? false : _props2$dashboard;

        var name = [compName];
        if (dashboard) {
          var pathDashboard = location.pathname.split('/')[1] ? location.pathname.split('/')[1] : 'landingPage';
          name = [pathDashboard, compName];
        }
        name.push('layouts');
        layouts = appState.getIn(name, Map({ undef: true })).toJS(); // if we have the current layout in redux and have a handle for it, use it
        if (layouts.undef) layouts = _defineProperty({}, breakpoint, layout);
      }

      var _props3 = this.props,
          _props3$verticalCompa = _props3.verticalCompact,
          verticalCompact = _props3$verticalCompa === undefined ? true : _props3$verticalCompa,
          _props3$margin = _props3.margin,
          margin = _props3$margin === undefined ? [10, 10] : _props3$margin;


      var rowHeight = 25;
      if (this.props.rowHeight) {
        rowHeight = this.props.rowHeight;
      } else {
        switch (breakpoint) {
          case 'xxs':
            rowHeight = 10;break;
          case 'xs':
            rowHeight = 15;break;
          case 'sm':
            rowHeight = 15;break;
          case 'md':
            rowHeight = 15;break;
          case 'lg':
            rowHeight = 20;break;
          case 'xl':
            rowHeight = 25;break;
          case 'xxl':
            rowHeight = 33;break;
          default:
            rowHeight = 25;
        }
      }

      return !(this.props.layouts || layout.length > 0) ? null : React.createElement(
        GridLayout,
        _extends({
          ref: function ref(grid) {
            _this2.grid = grid;
          }
        }, this.props, {
          className: 'layout',
          layouts: layouts,
          verticalCompact: verticalCompact,
          margin: margin,
          onLayoutChange: this.handleLayoutChange,
          breakpoints: this.breakpoints,
          cols: this.cols,
          rowHeight: rowHeight,
          onResizeStop: this.props.onResizeStop
        }),
        children
      );
    }
  }]);

  return Grid;
}(Component);

Grid.propTypes = {
  setComponentLayouts: PropTypes.func.isRequired,
  handleRemoveWidgetClick: PropTypes.func,
  onResizeStop: PropTypes.func,

  compName: PropTypes.string.isRequired,
  saveLayout: PropTypes.bool.isRequired,
  verticalCompact: PropTypes.bool.isRequired,
  layouts: PropTypes.object,
  children: PropTypes.node,
  appState: PropTypes.object.isRequired
};
Grid.defaultProps = {
  saveLayout: true,
  verticalCompact: true
};
WidgetWrapper.propTypes = {
  size: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  }),
  child: PropTypes.node.isRequired,
  widgetKey: PropTypes.string.isRequired,
  handleRemoveWidgetClick: PropTypes.func.isRequired
};

function WidgetWrapper(_ref) {
  var size = _ref.size,
      child = _ref.child,
      widgetKey = _ref.widgetKey,
      handleRemoveWidgetClick = _ref.handleRemoveWidgetClick;

  var handleClick = function handleClick() {
    // grid level function
    if (handleRemoveWidgetClick) {
      handleRemoveWidgetClick(widgetKey);
    }

    // // widget level function
    if (child.props.handleRemoveWidgetClick) {
      child.props.handleRemoveWidgetClick(widgetKey, child.props);
    }
  };

  return React.createElement(
    'div',
    { style: { height: '100%', width: '100%', display: 'flex' } },
    size ? React.cloneElement(child, { size: size, removeSelf: handleClick }) : child
  );
}

var props = function props(state) {
  return {
    appState: state.getIn(['form-layouts', 'layouts'], Map())
  };
};

export default connect(props, { setComponentLayouts: setComponentLayouts }, null, { withRef: true })(Grid);