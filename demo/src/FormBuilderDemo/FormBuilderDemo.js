import React, {useState} from 'react'
import './index.css'
import {FormBuilder} from '../../../src'
import {fromJS} from 'immutable'

const FormBuilderDemo = () => {
  const [values, updateValues] = useState({
    distance: '134 miles',
    id: '1234ABCD'
  })

  const layout = fromJS([
    {
      dimensions: {x: 0, y: 0, h: 1, w: 6},
      config: {
        name: 'favoritecolor',
        label: 'Favorite Color:',
        type: 'select',
        keyword: {
          options: [
            {value: 'red', label: 'Red'},
            {value: 'blue', label: 'Blue'}
          ]
        }
      }
    },
    {
      dimensions: {x: 6, y: 0, h: 1, w: 6},
      config: {
        name: 'distance',
        label: 'Distance:'
      }
    },
    {
      dimensions: {x: 0, y: 1, h: 2, w: 12},
      config: {
        name: 'favoritenumber',
        label: 'Favorite Number:'
      }
    }
  ])

  const onInputChange = e => {
    const {name, value} = e.target
    updateValues({...values, [name]: value})
  }

  const onSubmit = () => {
    console.log(values)
  }

  return (
    <div className='form-container'>
      <FormBuilder
        handleOnChange={onInputChange}
        formValues={values}
        formSchema={layout}
      />
      <button onClick={onSubmit}>Submit</button>
    </div>
  )
}

export default FormBuilderDemo
