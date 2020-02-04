/** @jsx jsx */
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import { FaImage as Image } from 'react-icons/fa';

var Toolbar = function Toolbar(_ref) {
  var id = _ref.id;
  return jsx("div", {
    id: id,
    style: {
      backgroundColor: '#fafafa'
    }
  }, jsx("select", {
    className: "ql-header",
    defaultValue: 'normal',
    onChange: function onChange(e) {
      return e.persist();
    }
  }, jsx("option", {
    value: "1"
  }), jsx("option", {
    value: "2"
  }), jsx("option", {
    value: "3"
  }), jsx("option", {
    value: "normal"
  })), jsx("button", {
    className: "ql-bold"
  }), jsx("button", {
    className: "ql-italic"
  }), jsx("button", {
    className: "ql-underline"
  }), jsx("button", {
    className: "ql-link"
  }), jsx("button", {
    className: "ql-list",
    value: "bullet"
  }), jsx("button", {
    className: "ql-list",
    value: "ordered"
  }), jsx("button", {
    className: "ql-blockquote"
  }), jsx("button", {
    className: "ql-insertImage"
  }, jsx(Image, null)));
};

export default Toolbar;
Toolbar.propTypes = {
  id: PropTypes.string
};