const reactSelectStyles = {
  clearIndicator: () => ({
    color: '#a0a0a0',
    cursor: 'pointer',
    height: '27px',
    minHeight: '27px',
    paddingBottom: '10px',
  }),
  control: (base) => ({
    ...base,
    border: '1px solid #a0a0a0',
    borderRadius: '1px',
    height: '27px',
    minHeight: '27px',
  }),
  dropdownIndicator: () => ({
    color: '#a0a0a0',
    cursor: 'pointer',
    height: '27px',
    minHeight: '27px',
    marginRight: '4px'
  }),
  indicatorSeparator: (base) => ({
    ...base,
    display: 'none'
  }),
  input: (base) => ({
    ...base,
    height: '27px',
    minHeight: '27px',
    marginBottom: '10px',
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
    height: '24px',
    minHeight: '24px',
    margin: 0,
    marginBottom: '14px',
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
      margin: 0,
      height: '27px',
      minHeight: '27px',
      marginBottom: '10px',
      padding: 0
    }
  }
}

export {
  reactSelectStyles
}
