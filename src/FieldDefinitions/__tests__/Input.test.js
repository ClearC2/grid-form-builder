import React from 'react'
import {Map} from 'immutable'
import {fireEvent, waitForElement} from 'react-testing-library'
import GridFormBuilder from '../../FormBuilder'

const form = {
  'name': 'Input Test',
  'id': 'FDC58F0F0B2099E61BE23AB6110572E1',
  'jsonschema': {
    'layout': [
      {
        'type': 'field',
        'config': {
          'name': 'firstName',
          'label': 'First Name',
          'type': 'input'
        }
      }
    ]
  }
}

describe('Input', function () {
  test('it renders initial value', async () => {
    const Test = () => {
      return (
        <GridFormBuilder
          formSchema={form}
          formValues={Map({firstName: 'John'})}
        />
      )
    }
    // global.render comes from jest.setup.js
    const {getByTestId} = global.render(<Test />)
    // have to wait for the layout to render and settle
    const input = await waitForElement(() => getByTestId('firstName-input'))
    expect(input.value).toBe('John')
  })

  test('it updates value', async () => {
    // mock a submit function
    const onFormSubmit = jest.fn()

    // set up a test component
    const Test = () => {
      const [values, setValues] = React.useState(Map({}))
      const onSubmit = (e) => {
        e.preventDefault()
        onFormSubmit(values.toJS())
      }
      const onChange = (e) => {
        const {name, value} = e.target
        setValues(values.set(name, value))
      }
      return (
        <form onSubmit={onSubmit}>
          <GridFormBuilder
            formName={form.name}
            formSchema={form}
            formValues={values}
            handleOnChange={onChange}
          />
          <button type='submit'>Submit</button>
        </form>
      )
    }
    const {getByTestId, getByText} = global.render(<Test />)
    const input = await waitForElement(() => getByTestId('firstName-input'))
    fireEvent.change(input, {target: {name: input.name, value: 'testing'}})
    fireEvent.click(getByText('Submit'))
    expect(onFormSubmit).toHaveBeenCalledWith({firstName: 'testing'})
  })
})
