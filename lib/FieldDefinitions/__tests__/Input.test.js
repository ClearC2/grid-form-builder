'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

var _reactTestingLibrary = require('react-testing-library');

var _FormBuilder = require('../../FormBuilder');

var _FormBuilder2 = _interopRequireDefault(_FormBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var form = {
  'name': 'Input Test',
  'id': 'FDC58F0F0B2099E61BE23AB6110572E1',
  'jsonschema': {
    'layout': [{
      'type': 'field',
      'config': {
        'name': 'firstName',
        'label': 'First Name',
        'type': 'input'
      }
    }]
  }
};

describe('Input', function () {
  var _this = this;

  test('it renders initial value', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
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
  // const Test = () => {
  //   return (
  //     <GridFormBuilder
  //       formSchema={form}
  //       formValues={Map({firstName: 'John'})}
  //     />
  //   )
  // }
  // // global.render comes from jest.setup.js
  // const {getByTestId} = global.render(<Test />)
  // // have to wait for the layout to render and settle
  // const input = await waitForElement(() => getByTestId('firstName-input'))
  // expect(input.value).toBe('John')
  );

  test('it updates value', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
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
  // mock a submit function
  // const onFormSubmit = jest.fn()
  //
  // // set up a test component
  // const Test = () => {
  //   const [values, setValues] = React.useState(Map({}))
  //   const onSubmit = (e) => {
  //     e.preventDefault()
  //     onFormSubmit(values.toJS())
  //   }
  //   const onChange = (e) => {
  //     const {name, value} = e.target
  //     setValues(values.set(name, value))
  //   }
  //   return (
  //     <form onSubmit={onSubmit}>
  //       <GridFormBuilder
  //         formName={form.name}
  //         formSchema={form}
  //         formValues={values}
  //         handleOnChange={onChange}
  //       />
  //       <button type='submit'>Submit</button>
  //     </form>
  //   )
  // }
  // const {getByTestId, getByText} = global.render(<Test />)
  // const input = await waitForElement(() => getByTestId('firstName-input'))
  // fireEvent.change(input, {target: {name: input.name, value: 'testing'}})
  // fireEvent.click(getByText('Submit'))
  // expect(onFormSubmit).toHaveBeenCalledWith({firstName: 'testing'})
  );
});