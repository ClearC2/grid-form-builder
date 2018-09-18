"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var timeStamp = exports.timeStamp = function timeStamp() {
  var ms = new Date().getTime();
  ms = String(ms).slice(-7);
  return +ms;
};