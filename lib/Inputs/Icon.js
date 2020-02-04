(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

// this type of input is handled with the icon prop in core/LabelContainer.js
// if we want to render something else where an input would normally be in a cell, add it here - JRA 01/16/2020
var Icon = function Icon() {
  return null;
};

var _default = Icon;
export default _default;
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Icon, "Icon", "/Users/davidadams/code/grid-form-builder/src/Inputs/Icon.js");
  reactHotLoader.register(_default, "default", "/Users/davidadams/code/grid-form-builder/src/Inputs/Icon.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();