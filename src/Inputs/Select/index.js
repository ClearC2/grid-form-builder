import React from 'react'
import PropTypes from 'prop-types'
import Select from './Select'
import NativeSelect from './NativeSelect'

const Container = props => {
  const {native} = props
  return native ? (
    <NativeSelect {...props} />
  ) : (
    <Select {...props} />
  )
}

Container.propTypes = {
  native: PropTypes.bool
}

export default Container
