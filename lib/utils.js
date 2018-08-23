export var timeStamp = function timeStamp() {
  var ms = new Date().getTime();
  ms = String(ms).slice(-7);
  return +ms;
};