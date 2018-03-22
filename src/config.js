const ajaxConfigErrorMessage = url => {
  console.error('The ajax client was not initialized for Grid Form Builder. Attempted to reach:', url)
  return Promise.resolve({error: {code: 428, message: 'The ajax client was not initialized for Grid Form Builder.'}})
}

const config = {
  ajax: {
    get: ajaxConfigErrorMessage,
    post: ajaxConfigErrorMessage,
    put: ajaxConfigErrorMessage
  }
}

export const initFormBuilderAjax = func => func(config)

export default config
