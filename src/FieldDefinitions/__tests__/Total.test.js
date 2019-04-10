import React from 'react'
import {Map} from 'immutable'
import {waitForElement} from 'react-testing-library'
import GridFormBuilder from '../../GridFormBuilder'

function getForm (totalFieldProps = {}) {
  return {
    'name': 'Total Test',
    'id': 'FDC58F0F0B2099E61BE23AB6110572E1',
    'jsonschema': {
      'layout': [
        {
          'type': 'field',
          'config': {
            'name': 'quantity',
            'label': 'Qty',
            'type': 'number'
          }
        },
        {
          'type': 'field',
          'config': {
            'name': 'price',
            'label': 'Price',
            'type': 'currency'
          }
        },
        {
          'type': 'field',
          'config': {
            'name': 'discount',
            'label': 'Discount',
            'type': 'currency'
          }
        },
        {
          'type': 'field',
          'config': {
            'name': 'grand-total',
            'label': 'Total',
            'type': 'total',
            ...totalFieldProps
          }
        }
      ]
    }
  }
}

describe('Total', function () {
  test('it calculates from initial values using formula', async () => {
    const form = getForm({formula: '(quantity x price) - (quantity x discount)'})
    const Test = () => {
      return (
        <GridFormBuilder
          formName={form.name}
          formSchema={form}
          formValues={Map({
            quantity: 2,
            price: 3,
            discount: 1
          })}
        />
      )
    }
    const {getByTestId} = global.render(<Test />)
    const input = await waitForElement(() => getByTestId('grand-total-input'))
    expect(input.value).toBe('$4.00')
  })

  test('it calculates from initial values using fields', async () => {
    const form = getForm({fields: ['price', 'foo', 'bar']})
    const Test = () => {
      return (
        <GridFormBuilder
          formName={form.name}
          formSchema={form}
          formValues={Map({
            price: 2,
            foo: 3,
            bar: 1
          })}
        />
      )
    }
    const {getByTestId} = global.render(<Test />)
    const input = await waitForElement(() => getByTestId('grand-total-input'))
    expect(input.value).toBe('$6.00')
  })
})
