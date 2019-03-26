const reactSelectStyles = () => ({
  clearIndicator: () => ({
    color: '#a0a0a0',
    cursor: 'pointer',
    height: '25px',
    marginTop: '3px',
    minHeight: '25px',
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
    color: '#404d54'
  }),
  multiValue: (base) => ({
    ...base,
    background: 'rgba(0, 126, 225, 0.08)',
    height: '23px',
    minHeight: '23px',
    margin: 0,
    marginBottom: '15px',
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
      height: '23px',
      marginBottom: '3px',
      minHeight: '23px',
      padding: 0
    }
  }
})

export {
  reactSelectStyles
}
