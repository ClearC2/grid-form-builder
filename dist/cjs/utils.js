"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.usePrevious = exports.updateLayoutArray = exports.searchForLayoutArray = exports.uppercaseFirstLetter = exports.emailValidator = exports.isMobile = exports.randomId = exports.timeStamp = void 0;

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/json/stringify"));

var _isArray = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/array/is-array"));

var _some = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/some"));

var _includes = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/includes"));

var _trim = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/trim"));

var _slice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/slice"));

var _immutable = require("immutable");

var _react = require("react");

var timeStamp = function timeStamp() {
  var _context;

  var ms = new Date().getTime();
  ms = (0, _slice.default)(_context = String(ms)).call(_context, -7);
  return +ms;
};

exports.timeStamp = timeStamp;

var randomId = function randomId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

exports.randomId = randomId;
var isMobile = !!('ontouchstart' in document.documentElement && navigator.userAgent.match(/Mobi/));
exports.isMobile = isMobile;

var emailValidator = function emailValidator(email) {
  var _context2, _context3, _context4;

  // If email is null, undefined, empty array or string
  if (!email) {
    return false;
  }

  email = (0, _trim.default)(_context2 = String(email)).call(_context2); // https://www.mailboxvalidator.com/resources/articles/acceptable-email-address-syntax-rfc/

  var emailInput = email.split('@');
  var emailLocal = (0, _trim.default)(_context3 = emailInput[0]).call(_context3); // email does not contain "@"

  if (emailInput.length === 1) {
    return false;
  } // validating local part of the email


  if (emailLocal.length > 64 || emailLocal.length < 1 || (0, _includes.default)(emailLocal).call(emailLocal, '..') || emailLocal[0] === '.' || emailLocal[emailLocal.length - 1] === '.') {
    return false;
  }

  var domainPart = (0, _trim.default)(_context4 = emailInput[1]).call(_context4);
  var emailDomains = domainPart.split('.'); // Entire domain part of the email does not contain "." or is greater than 255 characters

  if (emailDomains.length < 2 || domainPart.length > 255) {
    return false;
  }

  var validateDomainSegment = function validateDomainSegment(segment) {
    // A true here means the domain segment failed validation
    // eslint-disable-next-line
    return segment.length > 63 || segment.length < 1 || segment[0] === '-' || segment[segment.length - 1] === '-';
  }; // emailDomains MAY consist of subdomain1.subDomain2.domain.topLevelDomain need to validate each domain segment


  if ((0, _some.default)(emailDomains).call(emailDomains, validateDomainSegment)) {
    return false;
  } // Top level domains may not be entirely numeric


  var tld = emailDomains[emailDomains.length - 1];

  if (tld.length < 2 || tld.match(/^[0-9]+$/)) {
    return false;
  }

  return true;
};

exports.emailValidator = emailValidator;

var uppercaseFirstLetter = function uppercaseFirstLetter(string) {
  return string.charAt(0).toUpperCase() + (0, _slice.default)(string).call(string, 1).toLowerCase();
};

exports.uppercaseFirstLetter = uppercaseFirstLetter;

var searchForLayoutArray = function searchForLayoutArray(schema) {
  if (schema.toJS) schema = schema.toJS();
  if (schema.form) schema = schema.form;
  if (schema.jsonschema) schema = schema.jsonschema;
  if (schema.layout) schema = schema.layout;
  if (schema.toJS) schema = schema.toJS();

  if (!(0, _isArray.default)(schema)) {
    schema = [];
  }

  return schema;
};

exports.searchForLayoutArray = searchForLayoutArray;

var updateLayoutArray = function updateLayoutArray(schema, newArray) {
  // this is just a sanity check to ensure the schema passed down is passed back up in the same shape - JRA 11/06/2019
  var immutable = false;

  if (schema.toJS) {
    immutable = true;
    schema = schema.toJS();
  }

  if ((0, _isArray.default)(schema)) {
    schema = newArray;
  } else if (schema.form && (0, _isArray.default)(schema.form)) {
    schema.form = newArray;
  } else if (schema.form && schema.form.jsonschema && (0, _isArray.default)(schema.form.jsonschema)) {
    schema.form.jsonschema = newArray;
  } else if (schema.form && schema.form.jsonschema && schema.form.jsonschema.layout && (0, _isArray.default)(schema.form.jsonschema.layout)) {
    schema.form.jsonschema.layout = newArray;
  } else if (schema.jsonschema && (0, _isArray.default)(schema.jsonschema)) {
    schema.jsonschema = newArray;
  } else if (schema.jsonschema && schema.jsonschema.layout && (0, _isArray.default)(schema.jsonschema.layout)) {
    schema.jsonschema.layout = newArray;
  } else if (schema.layout && (0, _isArray.default)(schema.layout)) {
    schema.layout = newArray;
  }

  if (immutable) {
    schema = (0, _immutable.fromJS)(schema);
  } else {
    // if the schema is plain js, we want to make a completely new schema
    // that way this value can be set directly and it will diff all the way through react
    schema = JSON.parse((0, _stringify.default)(schema));
  }

  return schema;
};

exports.updateLayoutArray = updateLayoutArray;

var usePrevious = function usePrevious(value) {
  var ref = (0, _react.useRef)();
  (0, _react.useEffect)(function () {
    ref.current = value;
  });
  return ref.current;
};

exports.usePrevious = usePrevious;