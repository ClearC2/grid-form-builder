import React from 'react';
import PropTypes from 'prop-types';
import Select from './Select';
import NativeSelect from './NativeSelect';

var Container = function Container(props) {
  var native = props.native;
  return native ? React.createElement(NativeSelect, props) : React.createElement(Select, props);
};

Container.propTypes = {
  native: PropTypes.bool
};
export default Container;