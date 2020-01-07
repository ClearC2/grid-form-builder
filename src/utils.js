import {fromJS} from 'immutable'

export const timeStamp = () => {
  let ms = new Date().getTime()
  ms = String(ms).slice(-7)
  return +ms
}

// export const isMobile = !!('ontouchstart' in document.documentElement && navigator.userAgent.match(/Mobi/))

export const emailValidator = email => {
  // If email is null, undefined, empty array or string
  if (!email) {
    return false
  }
  email = String(email).trim()

  // https://www.mailboxvalidator.com/resources/articles/acceptable-email-address-syntax-rfc/
  const emailInput = email.split('@')
  const emailLocal = emailInput[0].trim()

  // email does not contain "@"
  if (emailInput.length === 1) {
    return false
  }

  // validating local part of the email
  if (
    (emailLocal.length > 64) ||
    (emailLocal.length < 1) ||
    (emailLocal.includes('..')) ||
    (emailLocal[0] === '.') ||
    (emailLocal[emailLocal.length - 1] === '.')
  ) {
    return false
  }

  const domainPart = emailInput[1].trim()
  const emailDomains = domainPart.split('.')

  // Entire domain part of the email does not contain "." or is greater than 255 characters
  if (emailDomains.length < 2 || domainPart.length > 255) {
    return false
  }

  const validateDomainSegment = (segment) => {
    // A true here means the domain segment failed validation
    // eslint-disable-next-line
    return ((segment.length > 63) || (segment.length < 1) || (segment[0] === '-') || (segment[segment.length - 1] === '-'))
  }

  // emailDomains MAY consist of subdomain1.subDomain2.domain.topLevelDomain need to validate each domain segment
  if (emailDomains.some(validateDomainSegment)) {
    return false
  }

  // Top level domains may not be entirely numeric
  const tld = emailDomains[emailDomains.length - 1]
  if ((tld.length < 2) || (tld.match(/^[0-9]+$/))) {
    return false
  }

  return true
}

export const uppercaseFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()

export const searchForLayoutArray = schema => {
  if (schema.toJS) schema = schema.toJS()
  if (schema.form) schema = schema.form
  if (schema.jsonschema) schema = schema.jsonschema
  if (schema.layout) schema = schema.layout
  if (schema.toJS) schema = schema.toJS()
  if (!Array.isArray(schema)) {
    schema = []
  }
  return schema
}

export const updateLayoutArray = (schema, newArray) => {
  // this is just a sanity check to ensure the schema passed down is passed back up in the same shape - JRA 11/06/2019
  let immutable = false
  if (schema.toJS) {
    immutable = true
    schema = schema.toJS()
  }
  if (Array.isArray(schema)) {
    schema = newArray
  } else if (schema.form && Array.isArray(schema.form)) {
    schema.form = newArray
  } else if (schema.form && schema.form.jsonschema && Array.isArray(schema.form.jsonschema)) {
    schema.form.jsonschema = newArray
  } else if (
    schema.form &&
    schema.form.jsonschema &&
    schema.form.jsonschema.layout &&
    Array.isArray(schema.form.jsonschema.layout)
  ) {
    schema.form.jsonschema.layout = newArray
  } else if (schema.jsonschema && Array.isArray(schema.jsonschema)) {
    schema.jsonschema = newArray
  } else if (
    schema.jsonschema &&
    schema.jsonschema.layout &&
    Array.isArray(schema.jsonschema.layout)
  ) {
    schema.jsonschema.layout = newArray
  } else if (schema.layout && Array.isArray(schema.layout)) {
    schema.layout = newArray
  }
  if (immutable) {
    schema = fromJS(schema)
  } else {
    // if the schema is plain js, we want to make a completely new schema
    // that way this value can be set directly and it will diff all the way through react
    schema = JSON.parse(JSON.stringify(schema))
  }
  return schema
}
