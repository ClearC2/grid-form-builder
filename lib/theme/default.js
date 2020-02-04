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
  value: {},
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

  reactHotLoader.register(theme, "theme", "C:\\Development\\Projects\\grid-form-builder\\src\\theme\\default.js");
  reactHotLoader.register(_default, "default", "C:\\Development\\Projects\\grid-form-builder\\src\\theme\\default.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();