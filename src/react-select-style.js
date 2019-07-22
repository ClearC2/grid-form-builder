const reactSelectStyles = () => ({
  clearIndicator: () => ({
    color: '#a0a0a0',
    cursor: 'pointer',
    height: '25px',
    marginTop: '3px',
    minHeight: '25px',
    '&:hover': {
      color: '#ec1c24'
    }
  }),
  control: (base) => ({
    ...base,
    border: '1px solid #a0a0a0',
    borderRadius: '1px',
    /* this breaks mutliselects so that they do not grow in height. If you really need a Multiselect to not grow, or
    // height: '25px',
* some other control to be 25px, use the config object inside your formschema */
    minHeight: '25px',
    minWidth: '200px'
  }),
  dropdownIndicator: () => ({
    color: '#a0a0a0',
    cursor: 'pointer',
    height: '25px',
    marginTop: '3px',
    minHeight: '25px',
    marginRight: '4px'
  }),
  indicatorSeparator: (base) => ({
    ...base,
    display: 'none'
  }),
  menu: (base) => ({
    ...base,
    marginTop: '0px',
    marginBottom: '0px'
  }),
  menuList: (base) => ({
    ...base,
    background: '#f5f5f5',
    border: '1px solid #a0a0a0',
    maxHeight: '250px',
    color: '#404d54',
    overflow: 'scroll'
  }),
  menuPortal: base => ({
    ...base,
    zIndex: Number.MAX_SAFE_INTEGER
  }),
  multiValue: (base) => ({
    ...base,
    background: 'rgba(0, 126, 225, 0.08)'
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: '#007eff'
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: '007eff',
    cursor: 'pointer'
  }),
  option: (base) => ({
    ...base,
    borderBottom: '1px solid #a0a0a0',
    paddingTop: '4px',

    '&:hover': {
      background: '#36a9e1',
      color: '#f5f5f5'
    }
  }),
  valueContainer: (base) => {
    return {
      ...base,
      padding: 0,
      paddingLeft: '4px',
      marginTop: '-4px',
      paddingBottom: '4px'
    }
  }
})

export {
  reactSelectStyles
}
