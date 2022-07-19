import React from 'react'
import './index.css'

const Traditional = () => {
  const onFormSubmit = e => {
    e.preventDefault()
    const values = {}
    e.target.forEach(input => {
      if (input.tagName === 'INPUT') {
        values[input.name] = input.value
      }
    })
    console.log(values)
  }
  return (
    <div className='form-container'>
      <form onSubmit={onFormSubmit}>
        <label>
          Favorite Color:
          <input name='favoritecolor' />
        </label>
        <label>
          Distance:
          <input name='distance' />
        </label>
        <label>
          Favorite Number:
          <input name='favoritenumber' />
        </label>
        <button type='submit'>
          Submit
        </button>
      </form>
    </div>
  )
}

export default Traditional
