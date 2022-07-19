import React, {useState} from 'react'
import './index.css'
import {GFBInput} from '../../../src'

const Standalone = () => {
  const [values, updateValues] = useState({
    distance: '134 miles',
    id: '1234ABCD'
  })

  const onInputChange = e => {
    const {name, value} = e.target
    updateValues({...values, [name]: value})
  }

  const onSubmit = () => {
    console.log(values)
  }

  return (
    <div className='form-container'>
      <div>
        <GFBInput
          name='favoritecolor'
          label='Favorite Color:'
          type='select'
          keyword={{
            options: [
              {value: 'red', label: 'Red'},
              {value: 'blue', label: 'Blue'}
            ]
          }}
          onChange={onInputChange}
          value={values.favoritecolor || ''}
        />
      </div>
      <div>
        <GFBInput
          name='distance'
          label='Distance:'
          onChange={onInputChange}
          value={values.distance || ''}
        />
      </div>
      <div>
        <GFBInput
          name='favoritenumber'
          label='Favorite Number'
          onChange={onInputChange}
          value={values.favoritenumber || ''}
        />
      </div>
      <button onClick={onSubmit}>
        Submit
      </button>
    </div>
  )
}

export default Standalone
