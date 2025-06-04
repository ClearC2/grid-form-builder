import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _Object$getOwnPropertySymbols from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import _Object$getOwnPropertyDescriptor from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor";
import _forEachInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/for-each";
import _Object$getOwnPropertyDescriptors from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors";
import _Object$defineProperties from "@babel/runtime-corejs3/core-js-stable/object/define-properties";
import _Object$defineProperty from "@babel/runtime-corejs3/core-js-stable/object/define-property";
import _defineProperty from "@babel/runtime-corejs3/helpers/esm/defineProperty";
function ownKeys(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var _context, _context2; var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? _forEachInstanceProperty(_context = ownKeys(Object(t), !0)).call(_context, function (r) { _defineProperty(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : _forEachInstanceProperty(_context2 = ownKeys(Object(t))).call(_context2, function (r) { _Object$defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
let portal;
class PortalTarget extends Component {
  constructor() {
    super(...arguments);
    _defineProperty(this, "state", {
      id: ''
    });
    _defineProperty(this, "element", document.createElement('div'));
    _defineProperty(this, "setStyles", () => {
      const {
        style = {}
      } = this.props;
      const offset = {};
      let target = document.getElementById(this.props.id);
      /*
      * Finds target from DOM, sets portal under the target
      */
      if (this.props.id && target) {
        target = target.getBoundingClientRect();
        offset['marginLeft'] = target.x;
        offset['marginTop'] = target.top + target.height + window.pageYOffset + 1;

        /*
        * Allows minor adjustments at portal drop location, allows for minor changes on margin styling
        */
        if (style.portalLeft) {
          offset.marginLeft += style.portalLeft;
        }
        if (style.portalTop) {
          offset.marginTop += style.portalTop;
        }
        // eslint-disable-next-line
        const cssText = `position: absolute;z-index: 10000;margin-left:${offset.marginLeft}px;margin-top:${offset.marginTop}px`;
        this.element.setAttribute('style', cssText);
      }
      return _objectSpread({}, style);
    });
  }
  componentDidMount() {
    const {
      portalTarget
    } = this.props;
    const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    this.element.style.cssText = 'position: absolute;z-index: 10000';
    this.element.id = id;
    portal = document.getElementsByTagName(portalTarget)[0];
    if (portal) {
      portal.prepend(this.element);
    }
    this.setState({
      id
    });
  }
  componentDidUpdate(prevProps) {
    if (this.props.portalTarget && !prevProps.portalTarget) {
      portal = document.getElementsByTagName(this.props.portalTarget)[0];
      portal.prepend(this.element);
    }
  }
  componentWillUnmount() {
    /*
    * Cleanup on DOM exit
    */
    portal.removeChild(this.element);
  }
  render() {
    const {
      children,
      className
    } = this.props;
    return /*#__PURE__*/createPortal(/*#__PURE__*/React.createElement("div", {
      style: _objectSpread({}, this.setStyles()),
      className: className
    }, children), this.element);
  }
}
_defineProperty(PortalTarget, "propTypes", {
  children: PropTypes.any,
  className: PropTypes.string,
  id: PropTypes.string,
  portalTarget: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
});
_defineProperty(PortalTarget, "defaultProps", {
  id: 'portal',
  /*
  * Renders directly off body tag, unless specified otherwise
  */
  portalTarget: 'body'
});
export default PortalTarget;