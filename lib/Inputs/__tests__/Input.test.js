'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// import React from 'react'
// import FormBuilder from '../../FormBuilder'
// import {Map} from 'immutable'
// import {fireEvent, waitForElement} from 'react-testing-library'

describe('Input', function () {
  var _this = this;

  test('is a test', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
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
  //     <FormBuilder
  //       formSchema={{
  //         'jsonschema': {
  //           'layout': [
  //             {
  //               'type': 'field',
  //               'config': {
  //                 'name': 'firstName',
  //                 'label': 'First Name',
  //                 'type': 'input'
  //               }
  //             }
  //           ]
  //         }
  //       }}
  //       formValues={Map({firstName: 'John'})}
  //     />
  //   )
  // }
  //
  // const {getByTestId} = global.render(<Test />)
  //
  // const input = await waitForElement(() => getByTestId('firstName-input'))
  //
  // expect(input.value).toBe('John')
  //
  // fireEvent.change(input, {target: {name: input.name, value: 'testing'}})
  //
  // expect(input.value).toBe('testing')
  );
});