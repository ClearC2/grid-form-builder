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
    height: '25px',
    minHeight: '25px',
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
    borderRadius: '1px',
    height: '30px',
    margin: 0
  }),
  menuList: () => ({
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
    background: 'rgba(0, 126, 225, 0.08)',
    paddingLeft: 0
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: '#007eff',
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
      marginTop: '-4px',
      paddingBottom: '4px',
      paddingLeft: '4px'
    }
  }
})

export {
  reactSelectStyles
}
