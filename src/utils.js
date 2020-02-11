import {fromJS} from 'immutable'
import {useRef, useEffect} from 'react'

export const timeStamp = () => {
  let ms = new Date().getTime()
  ms = String(ms).slice(-7)
  return +ms
}

export const randomId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export const isMobile = !!('ontouchstart' in document.documentElement && navigator.userAgent.match(/Mobi/))

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

export const usePrevious = value => {
  const ref = useRef()
  useEffect(() => { ref.current = value })
  return ref.current
}

export const convertDelimitedValueIntoLabelValueArray = ({delimit, delimiter, value, options}) => {
  if (!delimit) delimit = []
  if (delimit && typeof delimit === 'string') delimit = [delimit]
  delimit = delimit.length ? delimit : ['label', 'value']
  let formattedOptions = options || []
  if (!formattedOptions) formattedOptions = []
  if (typeof formattedOptions === 'string') formattedOptions = formattedOptions.split(delimiter)
  if (formattedOptions.toJS) formattedOptions = formattedOptions.toJS()

  const duplicate = {}
  // get rid of duplicates
  formattedOptions = formattedOptions.filter(option => {
    if (!option) return false
    if (typeof option === 'string') return true
    if (typeof option === 'object' && !option.value) option.value = option.label
    if (option.value && !duplicate[option.value]) {
      duplicate[option.value] = true
      return true
    }
  })

  // format into an array of {label, value} objects
  formattedOptions = formattedOptions.map(option => {
    if (typeof option === 'string') option = {label: option, value: option}
    if (!option.value) option.value = option.label
    return option
  })

  let formattedValue = value || []
  if (!formattedValue) formattedValue = []
  if (typeof formattedValue === 'string') {
    if (delimiter) formattedValue = formattedValue.split(delimiter)
    else {
      try {
        formattedValue = JSON.parse(formattedValue)
      } catch (e) {
        formattedValue = [formattedValue]
      }
    }
  }

  // attempting to build value objects based on the provided delimit fields, good luck trying to figure this part out - JRA 02/07/2020
  let values = []
  let tempValueObject = {}
  formattedValue.forEach((value, i) => {
    if (typeof value === 'object') {
      values.push(value)
    } else {
      if (i % delimit.length === 0) tempValueObject = {}
      tempValueObject[delimit[i % delimit.length]] = value
      if ((i + 1) % delimit.length === 0) {
        if (delimit.indexOf('label') === -1) tempValueObject.label = value
        if (delimit.indexOf('value') === -1) tempValueObject.value = value
        values.push(tempValueObject)
      }
    }
  })

  if (formattedOptions.length) { // if we were provided options we are going to try to match the values up with what options we have available
    // a consequence of doing this is that we will lose any value that is not a valid option - JRA 02/07/2020
    const optionEquivalents = []
    values.forEach(value => {
      const option = formattedOptions.find(option => {
        if (typeof value === 'string' || typeof value === 'number') {
          return delimit.find(field => {
            return option[field] === value
          })
        } else {
          return Object.keys(value).find(key => {
            if (key.toLowerCase().indexOf('keyword') === -1) {
              return option[key] === value[key]
            }
          })
        }
      })
      if (option) optionEquivalents.push(option)
    })
    values = optionEquivalents
  }

  return values
}

export const convertLabelValueArrayIntoDelimitedValue = ({delimit, delimiter, stringify, value}) => {
  if (delimit && typeof delimit === 'string') delimit = [delimit]
  if (value === null) value = []
  let formattedValue
  if (stringify) {
    formattedValue = ''
    if (delimiter) {
      if (delimit && Array.isArray(delimit)) {
        // if we were provided field(s) to delimit by, build up a special string with just those values
        value.forEach(option => {
          delimit.forEach(field => {
            if (formattedValue.indexOf(option[field]) === -1) {
              formattedValue = formattedValue + option[field] + delimiter
            }
          })
        })
        formattedValue = formattedValue.slice(0, -delimiter.length)
      } else {
        // if we are supposed to delimit these options but we don't know which field to delimit, we are going to shove the whole object in
        value.forEach(option => {
          formattedValue = formattedValue + JSON.stringify(option) + delimiter
        })
        formattedValue = formattedValue.slice(0, -delimiter.length)
      }
    } else if (delimit && !delimiter) {
      // special case where they decided to delimit by some field but don't have a delimiter, we are going to build it up as a stringified array
      const valueArr = []
      value.forEach(option => {
        delimit.forEach(field => {
          if (valueArr.indexOf(option[field]) === -1) {
            valueArr.push(option[field])
          }
        })
      })
      formattedValue = JSON.stringify(valueArr)
    } else {
      // if all we want to do is stringify the value, send it back up unmodified but stringified
      formattedValue = JSON.stringify(value)
    }
  } else {
    formattedValue = []
    if (delimit) {
      value.forEach(option => {
        delimit.forEach(field => {
          if (formattedValue.indexOf(option[field]) === -1) {
            formattedValue.push(option[field])
          }
        })
      })
    } else {
      formattedValue = value
    }
  }
  return formattedValue
}
