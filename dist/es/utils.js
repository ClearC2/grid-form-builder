import _JSON$stringify from "@babel/runtime-corejs3/core-js-stable/json/stringify";
import _Array$isArray from "@babel/runtime-corejs3/core-js-stable/array/is-array";
import _someInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/some";
import _includesInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/includes";
import _trimInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/trim";
import _sliceInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/slice";
import { fromJS } from 'immutable';
import { useRef, useEffect } from 'react';
export var timeStamp = function timeStamp() {
  var _context;

  var ms = new Date().getTime();
  ms = _sliceInstanceProperty(_context = String(ms)).call(_context, -7);
  return +ms;
};
export var randomId = function randomId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};
export var isMobile = !!('ontouchstart' in document.documentElement && navigator.userAgent.match(/Mobi/));
export var emailValidator = function emailValidator(email) {
  var _context2, _context3, _context4;

  // If email is null, undefined, empty array or string
  if (!email) {
    return false;
  }

  email = _trimInstanceProperty(_context2 = String(email)).call(_context2); // https://www.mailboxvalidator.com/resources/articles/acceptable-email-address-syntax-rfc/

  var emailInput = email.split('@');

  var emailLocal = _trimInstanceProperty(_context3 = emailInput[0]).call(_context3); // email does not contain "@"


  if (emailInput.length === 1) {
    return false;
  } // validating local part of the email


  if (emailLocal.length > 64 || emailLocal.length < 1 || _includesInstanceProperty(emailLocal).call(emailLocal, '..') || emailLocal[0] === '.' || emailLocal[emailLocal.length - 1] === '.') {
    return false;
  }

  var domainPart = _trimInstanceProperty(_context4 = emailInput[1]).call(_context4);

  var emailDomains = domainPart.split('.'); // Entire domain part of the email does not contain "." or is greater than 255 characters

  if (emailDomains.length < 2 || domainPart.length > 255) {
    return false;
  }

  var validateDomainSegment = function validateDomainSegment(segment) {
    // A true here means the domain segment failed validation
    // eslint-disable-next-line
    return segment.length > 63 || segment.length < 1 || segment[0] === '-' || segment[segment.length - 1] === '-';
  }; // emailDomains MAY consist of subdomain1.subDomain2.domain.topLevelDomain need to validate each domain segment


  if (_someInstanceProperty(emailDomains).call(emailDomains, validateDomainSegment)) {
    return false;
  } // Top level domains may not be entirely numeric


  var tld = emailDomains[emailDomains.length - 1];

  if (tld.length < 2 || tld.match(/^[0-9]+$/)) {
    return false;
  }

  return true;
};
export var uppercaseFirstLetter = function uppercaseFirstLetter(string) {
  return string.charAt(0).toUpperCase() + _sliceInstanceProperty(string).call(string, 1).toLowerCase();
};
export var searchForLayoutArray = function searchForLayoutArray(schema) {
  if (schema.toJS) schema = schema.toJS();
  if (schema.form) schema = schema.form;
  if (schema.jsonschema) schema = schema.jsonschema;
  if (schema.layout) schema = schema.layout;
  if (schema.toJS) schema = schema.toJS();

  if (!_Array$isArray(schema)) {
    schema = [];
  }

  return schema;
};
export var updateLayoutArray = function updateLayoutArray(schema, newArray) {
  // this is just a sanity check to ensure the schema passed down is passed back up in the same shape - JRA 11/06/2019
  var immutable = false;

  if (schema.toJS) {
    immutable = true;
    schema = schema.toJS();
  }

  if (_Array$isArray(schema)) {
    schema = newArray;
  } else if (schema.form && _Array$isArray(schema.form)) {
    schema.form = newArray;
  } else if (schema.form && schema.form.jsonschema && _Array$isArray(schema.form.jsonschema)) {
    schema.form.jsonschema = newArray;
  } else if (schema.form && schema.form.jsonschema && schema.form.jsonschema.layout && _Array$isArray(schema.form.jsonschema.layout)) {
    schema.form.jsonschema.layout = newArray;
  } else if (schema.jsonschema && _Array$isArray(schema.jsonschema)) {
    schema.jsonschema = newArray;
  } else if (schema.jsonschema && schema.jsonschema.layout && _Array$isArray(schema.jsonschema.layout)) {
    schema.jsonschema.layout = newArray;
  } else if (schema.layout && _Array$isArray(schema.layout)) {
    schema.layout = newArray;
  }

  if (immutable) {
    schema = fromJS(schema);
  } else {
    // if the schema is plain js, we want to make a completely new schema
    // that way this value can be set directly and it will diff all the way through react
    schema = JSON.parse(_JSON$stringify(schema));
  }

  return schema;
};
export var usePrevious = function usePrevious(value) {
  var ref = useRef();
  useEffect(function () {
    ref.current = value;
  });
  return ref.current;
<<<<<<< HEAD:lib/utils.js
};

__signature__(usePrevious, "useRef{ref}\nuseEffect{}");

;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(timeStamp, "timeStamp", "C:\\Development\\Projects\\grid-form-builder\\src\\utils.js");
  reactHotLoader.register(randomId, "randomId", "C:\\Development\\Projects\\grid-form-builder\\src\\utils.js");
  reactHotLoader.register(isMobile, "isMobile", "C:\\Development\\Projects\\grid-form-builder\\src\\utils.js");
  reactHotLoader.register(emailValidator, "emailValidator", "C:\\Development\\Projects\\grid-form-builder\\src\\utils.js");
  reactHotLoader.register(uppercaseFirstLetter, "uppercaseFirstLetter", "C:\\Development\\Projects\\grid-form-builder\\src\\utils.js");
  reactHotLoader.register(searchForLayoutArray, "searchForLayoutArray", "C:\\Development\\Projects\\grid-form-builder\\src\\utils.js");
  reactHotLoader.register(updateLayoutArray, "updateLayoutArray", "C:\\Development\\Projects\\grid-form-builder\\src\\utils.js");
  reactHotLoader.register(usePrevious, "usePrevious", "C:\\Development\\Projects\\grid-form-builder\\src\\utils.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
=======
};
>>>>>>> aa68762e12dc6f3f09855b63bf3638f1d4b23f1b:dist/es/utils.js
