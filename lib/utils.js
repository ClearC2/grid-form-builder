'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var timeStamp = exports.timeStamp = function timeStamp() {
  var ms = new Date().getTime();
  ms = String(ms).slice(-7);
  return +ms;
};

var emailValidator = exports.emailValidator = function emailValidator(email) {
  // If email is null, undefined, empty array or string
  if (!email) {
    return false;
  }
  email = String(email).trim();

  // https://www.mailboxvalidator.com/resources/articles/acceptable-email-address-syntax-rfc/
  var emailInput = email.split('@');
  var emailLocal = emailInput[0].trim();

  // email does not contain "@"
  if (emailInput.length === 1) {
    return false;
  }

  // validating local part of the email
  if (emailLocal.length > 64 || emailLocal.length < 1 || emailLocal.includes('..') || emailLocal[0] === '.' || emailLocal[emailLocal.length - 1] === '.') {
    return false;
  }

  var domainPart = emailInput[1].trim();
  var emailDomains = domainPart.split('.');

  // Entire domain part of the email does not contain "." or is greater than 255 characters
  if (emailDomains.length < 2 || domainPart.length > 255) {
    return false;
  }

  var validateDomainSegment = function validateDomainSegment(segment) {
    // A true here means the domain segment failed validation
    return segment.length > 63 || segment.length < 1 || segment[0] === '-' || segment[segment.length - 1] === '-';
  };

  // emailDomains MAY consist of subdomain1.subDomain2.domain.topLevelDomain need to validate each domain segment
  if (emailDomains.some(validateDomainSegment)) {
    return false;
  }

  // Top level domains may not be entirely numeric
  var tld = emailDomains[emailDomains.length - 1];
  if (tld.length < 2 || tld.match(/^[0-9]+$/)) {
    return false;
  }

  return true;
};