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
<<<<<<< HEAD:lib/Inputs/Richtextarea/Toolbar.js
};
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Toolbar, "Toolbar", "C:\\Development\\Projects\\grid-form-builder\\src\\Inputs\\Richtextarea\\Toolbar.js");
  reactHotLoader.register(_default, "default", "C:\\Development\\Projects\\grid-form-builder\\src\\Inputs\\Richtextarea\\Toolbar.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
=======
};
>>>>>>> aa68762e12dc6f3f09855b63bf3638f1d4b23f1b:dist/es/Inputs/Richtextarea/Toolbar.js
