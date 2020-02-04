(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

var theme = {
  gridItem: {},
  cellLabel: {},
  label: {},
  icon: {},
  link: {},
  cascade: {},
  cellInput: {},
  inputOuter: {},
  inputInner: {},
  inputControl: {},
  valueContainer: {},
  indicators: {},
  value: {
    ':focus': {
      borderLeft: '5px solid #ffee77'
    }
  },
  options: {}
};
var _default = theme;
export default _default;
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(theme, "theme", "/Users/davidadams/code/grid-form-builder/src/theme/executive.js");
  reactHotLoader.register(_default, "default", "/Users/davidadams/code/grid-form-builder/src/theme/executive.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();