import React from 'react'
import {Map} from 'immutable'
import {fireEvent, waitForElement} from 'react-testing-library'
import GridFormBuilder from '../../FormBuilder'

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
    // const form = getForm({formula: '(quantity x price) - (quantity x discount)'})
    // const Test = () => {
    //   return (
    //     <GridFormBuilder
    //       formName={form.name}
    //       formSchema={form}
    //       formValues={Map({
    //         quantity: 2,
    //         price: 3,
    //         discount: 1
    //       })}
    //     />
    //   )
    // }
    // const {getByTestId} = global.render(<Test />)
    // const input = await waitForElement(() => getByTestId('grand-total-input'))
    // expect(input.value).toBe('$4.00')
  })

  test('it calculates from initial values using fields', async () => {
    // const form = getForm({fields: ['price', 'foo', 'bar']})
    // const Test = () => {
    //   return (
    //     <GridFormBuilder
    //       formName={form.name}
    //       formSchema={form}
    //       formValues={Map({
    //         price: 2,
    //         foo: 3,
    //         bar: 1
    //       })}
    //     />
    //   )
    // }
    // const {getByTestId} = global.render(<Test />)
    // const input = await waitForElement(() => getByTestId('grand-total-input'))
    // expect(input.value).toBe('$6.00')
  })

  test('it recalculates using formula', async () => {
    // const form = getForm({formula: '(quantity x price) - (quantity x discount)'})
    // const Test = () => {
    //   const [values, setValues] = React.useState(Map({
    //     quantity: 2,
    //     price: 3,
    //     discount: 1
    //   }))
    //   const onChange = (e) => {
    //     const {name, value} = e.target
    //     setValues(values.set(name, value))
    //   }
    //   return (
    //     <GridFormBuilder
    //       formName={form.name}
    //       formSchema={form}
    //       formValues={values}
    //       handleOnChange={onChange}
    //     />
    //   )
    // }
    // const {getByTestId} = global.render(<Test />)
    // const discountInput = await waitForElement(() => getByTestId('discount-input'))
    // fireEvent.change(discountInput, {target: {name: 'discount', value: '2'}})
    // const totalInput = getByTestId('grand-total-input')
    // expect(totalInput.value).toBe('$2.00')
  })

  test('it recalculates using fields', async () => {
    // const form = getForm({fields: ['price', 'foo', 'bar']})
    // const Test = () => {
    //   const [values, setValues] = React.useState(Map({
    //     price: 3,
    //     foo: 1,
    //     bar: 2
    //   }))
    //   const onChange = (e) => {
    //     const {name, value} = e.target
    //     setValues(values.set(name, value))
    //   }
    //   return (
    //     <GridFormBuilder
    //       formName={form.name}
    //       formSchema={form}
    //       formValues={values}
    //       handleOnChange={onChange}
    //     />
    //   )
    // }
    // const {getByTestId} = global.render(<Test />)
    // const priceInput = await waitForElement(() => getByTestId('price-input'))
    // fireEvent.change(priceInput, {target: {name: 'price', value: '5'}})
    // const totalInput = getByTestId('grand-total-input')
    // expect(totalInput.value).toBe('$8.00')
  })
})
