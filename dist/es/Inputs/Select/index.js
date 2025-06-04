import React from 'react';
import PropTypes from 'prop-types';
import Select from './Select';
import NativeSelect from './NativeSelect';
const Container = props => {
  const {
    native
  } = props;
  return native ? /*#__PURE__*/React.createElement(NativeSelect, props) : /*#__PURE__*/React.createElement(Select, props);
};
Container.propTypes = {
  native: PropTypes.bool
};
export default Container;