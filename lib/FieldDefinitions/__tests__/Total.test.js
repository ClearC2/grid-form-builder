'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

var _reactTestingLibrary = require('react-testing-library');

var _FormBuilder = require('../../FormBuilder');

var _FormBuilder2 = _interopRequireDefault(_FormBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function getForm() {
  var totalFieldProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return {
    'name': 'Total Test',
    'id': 'FDC58F0F0B2099E61BE23AB6110572E1',
    'jsonschema': {
      'layout': [{
        'type': 'field',
        'config': {
          'name': 'quantity',
          'label': 'Qty',
          'type': 'number'
        }
      }, {
        'type': 'field',
        'config': {
          'name': 'price',
          'label': 'Price',
          'type': 'currency'
        }
      }, {
        'type': 'field',
        'config': {
          'name': 'discount',
          'label': 'Discount',
          'type': 'currency'
        }
      }, {
        'type': 'field',
        'config': _extends({
          'name': 'grand-total',
          'label': 'Total',
          'type': 'total'
        }, totalFieldProps)
      }]
    }
  };
}

describe('Total', function () {
  var _this = this;

  test('it calculates from initial values using formula', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  }))
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
  );

  test('it calculates from initial values using fields', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, _this);
  }))
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
  );

  test('it recalculates using formula', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, _this);
  }))
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
  );

  test('it recalculates using fields', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, _this);
  }))
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
  );
});