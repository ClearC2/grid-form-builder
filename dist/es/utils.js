import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _findInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/find";
import _indexOfInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/index-of";
import _forEachInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/for-each";
import _mapInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/map";
import _typeof from "@babel/runtime-corejs3/helpers/esm/typeof";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
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
var _window = window,
    _window$device = _window.device,
    device = _window$device === void 0 ? {
  cordova: false,
  model: 'browser',
  platform: 'browser',
  uuid: 'browser',
  version: 'browser'
} : _window$device;
export var isMobile = device.platform.toLowerCase() === 'ios' || device.platform.toLowerCase() === 'android';
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
};
export var convertDelimitedValueIntoLabelValueArray = function convertDelimitedValueIntoLabelValueArray(_ref) {
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

  formattedOptions = _filterInstanceProperty(formattedOptions).call(formattedOptions, function (option) {
    if (!option) return false;
    if (typeof option === 'string') return true;
    if (_typeof(option) === 'object' && !option.value) option.value = option.label;

    if (option.value && !duplicate[option.value]) {
      duplicate[option.value] = true;
      return true;
    }
  }); // format into an array of {label, value} objects

  formattedOptions = _mapInstanceProperty(formattedOptions).call(formattedOptions, function (option) {
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

  _forEachInstanceProperty(formattedValue).call(formattedValue, function (value, i) {
    if (_typeof(value) === 'object') {
      values.push(value);
    } else {
      if (i % delimit.length === 0) tempValueObject = {};
      tempValueObject[delimit[i % delimit.length]] = value;

      if ((i + 1) % delimit.length === 0) {
        if (_indexOfInstanceProperty(delimit).call(delimit, 'label') === -1) tempValueObject.label = value;
        if (_indexOfInstanceProperty(delimit).call(delimit, 'value') === -1) tempValueObject.value = value;
        values.push(tempValueObject);
      }
    }
  });

  if (formattedOptions.length) {
    // if we were provided options we are going to try to match the values up with what options we have available
    // a consequence of doing this is that we will lose any value that is not a valid option - JRA 02/07/2020
    var optionEquivalents = [];

    _forEachInstanceProperty(values).call(values, function (value) {
      if (value.toJS) value = value.toJS();

      var option = _findInstanceProperty(formattedOptions).call(formattedOptions, function (option) {
        if (typeof value === 'string' || typeof value === 'number') {
          return _findInstanceProperty(delimit).call(delimit, function (field) {
            return option[field] === value;
          });
        } else {
          var _context5;

          return _findInstanceProperty(_context5 = _Object$keys(value)).call(_context5, function (key) {
            var _context6;

            if (_indexOfInstanceProperty(_context6 = key.toLowerCase()).call(_context6, 'keyword') === -1) {
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
export var convertLabelValueArrayIntoDelimitedValue = function convertLabelValueArrayIntoDelimitedValue(_ref2) {
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
      if (delimit && _Array$isArray(delimit)) {
        // if we were provided field(s) to delimit by, build up a special string with just those values
        _forEachInstanceProperty(value).call(value, function (option) {
          _forEachInstanceProperty(delimit).call(delimit, function (field) {
            if (_indexOfInstanceProperty(formattedValue).call(formattedValue, option[field]) === -1) {
              formattedValue = formattedValue + option[field] + delimiter;
            }
          });
        });

        formattedValue = _sliceInstanceProperty(formattedValue).call(formattedValue, 0, -delimiter.length);
      } else {
        // if we are supposed to delimit these options but we don't know which field to delimit, we are going to shove the whole object in
        _forEachInstanceProperty(value).call(value, function (option) {
          formattedValue = formattedValue + _JSON$stringify(option) + delimiter;
        });

        formattedValue = _sliceInstanceProperty(formattedValue).call(formattedValue, 0, -delimiter.length);
      }
    } else if (delimit && !delimiter) {
      // special case where they decided to delimit by some field but don't have a delimiter, we are going to build it up as a stringified array
      var valueArr = [];

      _forEachInstanceProperty(value).call(value, function (option) {
        _forEachInstanceProperty(delimit).call(delimit, function (field) {
          if (_indexOfInstanceProperty(valueArr).call(valueArr, option[field]) === -1) {
            valueArr.push(option[field]);
          }
        });
      });

      formattedValue = _JSON$stringify(valueArr);
    } else {
      // if all we want to do is stringify the value, send it back up unmodified but stringified
      formattedValue = _JSON$stringify(value);
    }
  } else {
    formattedValue = [];

    if (delimit) {
      _forEachInstanceProperty(value).call(value, function (option) {
        _forEachInstanceProperty(delimit).call(delimit, function (field) {
          if (_indexOfInstanceProperty(formattedValue).call(formattedValue, option[field]) === -1) {
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