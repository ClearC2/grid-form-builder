"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.convertLabelValueArrayIntoDelimitedValue = exports.convertDelimitedValueIntoLabelValueArray = exports.usePrevious = exports.updateLayoutArray = exports.searchForLayoutArray = exports.uppercaseFirstLetter = exports.emailValidator = exports.isMobile = exports.randomId = exports.timeStamp = void 0;

var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/keys"));

var _find = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/find"));

var _indexOf = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/index-of"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/typeof"));

var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/filter"));

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

var convertDelimitedValueIntoLabelValueArray = function convertDelimitedValueIntoLabelValueArray(_ref) {
  var delimit = _ref.delimit,
      delimiter = _ref.delimiter,
      value = _ref.value,
      options = _ref.options;
  if (!delimit) delimit = [];
  if (delimit && typeof delimit === 'string') delimit = [delimit];
  delimit = delimit.length ? delimit : ['label', 'value'];
  var formattedOptions = options || [];
  if (!formattedOptions) formattedOptions = [];
  if (typeof formattedOptions === 'string') formattedOptions = formattedOptions.split(delimiter);
  if (formattedOptions.toJS) formattedOptions = formattedOptions.toJS();
  var duplicate = {}; // get rid of duplicates

  formattedOptions = (0, _filter.default)(formattedOptions).call(formattedOptions, function (option) {
    if (!option) return false;
    if (typeof option === 'string') return true;
    if ((0, _typeof2.default)(option) === 'object' && !option.value) option.value = option.label;

    if (option.value && !duplicate[option.value]) {
      duplicate[option.value] = true;
      return true;
    }
  }); // format into an array of {label, value} objects

  formattedOptions = (0, _map.default)(formattedOptions).call(formattedOptions, function (option) {
    if (typeof option === 'string') option = {
      label: option,
      value: option
    };
    if (!option.value) option.value = option.label;
    return option;
  });
  var formattedValue = value || [];
  if (!formattedValue) formattedValue = [];

  if (typeof formattedValue === 'string') {
    if (delimiter) formattedValue = formattedValue.split(delimiter);else {
      try {
        formattedValue = JSON.parse(formattedValue);
      } catch (e) {
        formattedValue = [formattedValue];
      }
    }
  } // attempting to build value objects based on the provided delimit fields, good luck trying to figure this part out - JRA 02/07/2020


  var values = [];
  var tempValueObject = {};
  (0, _forEach.default)(formattedValue).call(formattedValue, function (value, i) {
    if ((0, _typeof2.default)(value) === 'object') {
      values.push(value);
    } else {
      if (i % delimit.length === 0) tempValueObject = {};
      tempValueObject[delimit[i % delimit.length]] = value;

      if ((i + 1) % delimit.length === 0) {
        if ((0, _indexOf.default)(delimit).call(delimit, 'label') === -1) tempValueObject.label = value;
        if ((0, _indexOf.default)(delimit).call(delimit, 'value') === -1) tempValueObject.value = value;
        values.push(tempValueObject);
      }
    }
  });

  if (formattedOptions.length) {
    // if we were provided options we are going to try to match the values up with what options we have available
    // a consequence of doing this is that we will lose any value that is not a valid option - JRA 02/07/2020
    var optionEquivalents = [];
    (0, _forEach.default)(values).call(values, function (value) {
      var option = (0, _find.default)(formattedOptions).call(formattedOptions, function (option) {
        if (typeof value === 'string' || typeof value === 'number') {
          return (0, _find.default)(delimit).call(delimit, function (field) {
            return option[field] === value;
          });
        } else {
          var _context5;

          return (0, _find.default)(_context5 = (0, _keys.default)(value)).call(_context5, function (key) {
            var _context6;

            if ((0, _indexOf.default)(_context6 = key.toLowerCase()).call(_context6, 'keyword') === -1) {
              return option[key] === value[key];
            }
          });
        }
      });
      if (option) optionEquivalents.push(option);
    });
    values = optionEquivalents;
  }

  return values;
};

exports.convertDelimitedValueIntoLabelValueArray = convertDelimitedValueIntoLabelValueArray;

var convertLabelValueArrayIntoDelimitedValue = function convertLabelValueArrayIntoDelimitedValue(_ref2) {
  var delimit = _ref2.delimit,
      delimiter = _ref2.delimiter,
      stringify = _ref2.stringify,
      value = _ref2.value;
  if (delimit && typeof delimit === 'string') delimit = [delimit];
  if (value === null) value = [];
  var formattedValue;

  if (stringify) {
    formattedValue = '';

    if (delimiter) {
      if (delimit && (0, _isArray.default)(delimit)) {
        // if we were provided field(s) to delimit by, build up a special string with just those values
        (0, _forEach.default)(value).call(value, function (option) {
          (0, _forEach.default)(delimit).call(delimit, function (field) {
            if ((0, _indexOf.default)(formattedValue).call(formattedValue, option[field]) === -1) {
              formattedValue = formattedValue + option[field] + delimiter;
            }
          });
        });
        formattedValue = (0, _slice.default)(formattedValue).call(formattedValue, 0, -delimiter.length);
      } else {
        // if we are supposed to delimit these options but we don't know which field to delimit, we are going to shove the whole object in
        (0, _forEach.default)(value).call(value, function (option) {
          formattedValue = formattedValue + (0, _stringify.default)(option) + delimiter;
        });
        formattedValue = (0, _slice.default)(formattedValue).call(formattedValue, 0, -delimiter.length);
      }
    } else if (delimit && !delimiter) {
      // special case where they decided to delimit by some field but don't have a delimiter, we are going to build it up as a stringified array
      var valueArr = [];
      (0, _forEach.default)(value).call(value, function (option) {
        (0, _forEach.default)(delimit).call(delimit, function (field) {
          if ((0, _indexOf.default)(valueArr).call(valueArr, option[field]) === -1) {
            valueArr.push(option[field]);
          }
        });
      });
      formattedValue = (0, _stringify.default)(valueArr);
    } else {
      // if all we want to do is stringify the value, send it back up unmodified but stringified
      formattedValue = (0, _stringify.default)(value);
    }
  } else {
    formattedValue = [];

    if (delimit) {
      (0, _forEach.default)(value).call(value, function (option) {
        (0, _forEach.default)(delimit).call(delimit, function (field) {
          if ((0, _indexOf.default)(formattedValue).call(formattedValue, option[field]) === -1) {
            formattedValue.push(option[field]);
          }
        });
      });
    } else {
      formattedValue = value;
    }
  }

  return formattedValue;
};

exports.convertLabelValueArrayIntoDelimitedValue = convertLabelValueArrayIntoDelimitedValue;