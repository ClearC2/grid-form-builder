'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

var _reactTestingLibrary = require('react-testing-library');

var _GridFormBuilder = require('../../GridFormBuilder');

var _GridFormBuilder2 = _interopRequireDefault(_GridFormBuilder);

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
    var form, Test, _global$render, getByTestId, input;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            form = getForm({ formula: '(quantity x price) - (quantity x discount)' });

            Test = function Test() {
              return _react2.default.createElement(_GridFormBuilder2.default, {
                formName: form.name,
                formSchema: form,
                formValues: (0, _immutable.Map)({
                  quantity: 2,
                  price: 3,
                  discount: 1
                })
              });
            };

            _global$render = global.render(_react2.default.createElement(Test, null)), getByTestId = _global$render.getByTestId;
            _context.next = 5;
            return (0, _reactTestingLibrary.waitForElement)(function () {
              return getByTestId('grand-total-input');
            });

          case 5:
            input = _context.sent;

            expect(input.value).toBe('$4.00');

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  })));

  test('it calculates from initial values using fields', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var form, Test, _global$render2, getByTestId, input;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            form = getForm({ fields: ['price', 'foo', 'bar'] });

            Test = function Test() {
              return _react2.default.createElement(_GridFormBuilder2.default, {
                formName: form.name,
                formSchema: form,
                formValues: (0, _immutable.Map)({
                  price: 2,
                  foo: 3,
                  bar: 1
                })
              });
            };

            _global$render2 = global.render(_react2.default.createElement(Test, null)), getByTestId = _global$render2.getByTestId;
            _context2.next = 5;
            return (0, _reactTestingLibrary.waitForElement)(function () {
              return getByTestId('grand-total-input');
            });

          case 5:
            input = _context2.sent;

            expect(input.value).toBe('$6.00');

          case 7:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, _this);
  })));

  test('it recalculates using formula', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var form, Test, _global$render3, getByTestId, discountInput, totalInput;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            form = getForm({ formula: '(quantity x price) - (quantity x discount)' });

            Test = function Test() {
              var _React$useState = _react2.default.useState((0, _immutable.Map)({
                quantity: 2,
                price: 3,
                discount: 1
              })),
                  _React$useState2 = _slicedToArray(_React$useState, 2),
                  values = _React$useState2[0],
                  setValues = _React$useState2[1];

              var onChange = function onChange(e) {
                var _e$target = e.target,
                    name = _e$target.name,
                    value = _e$target.value;

                setValues(values.set(name, value));
              };
              return _react2.default.createElement(_GridFormBuilder2.default, {
                formName: form.name,
                formSchema: form,
                formValues: values,
                handleOnChange: onChange
              });
            };

            _global$render3 = global.render(_react2.default.createElement(Test, null)), getByTestId = _global$render3.getByTestId;
            _context3.next = 5;
            return (0, _reactTestingLibrary.waitForElement)(function () {
              return getByTestId('discount-input');
            });

          case 5:
            discountInput = _context3.sent;

            _reactTestingLibrary.fireEvent.change(discountInput, { target: { name: 'discount', value: '2' } });
            totalInput = getByTestId('grand-total-input');

            expect(totalInput.value).toBe('$2.00');

          case 9:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, _this);
  })));

  test('it recalculates using fields', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    var form, Test, _global$render4, getByTestId, priceInput, totalInput;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            form = getForm({ fields: ['price', 'foo', 'bar'] });

            Test = function Test() {
              var _React$useState3 = _react2.default.useState((0, _immutable.Map)({
                price: 3,
                foo: 1,
                bar: 2
              })),
                  _React$useState4 = _slicedToArray(_React$useState3, 2),
                  values = _React$useState4[0],
                  setValues = _React$useState4[1];

              var onChange = function onChange(e) {
                var _e$target2 = e.target,
                    name = _e$target2.name,
                    value = _e$target2.value;

                setValues(values.set(name, value));
              };
              return _react2.default.createElement(_GridFormBuilder2.default, {
                formName: form.name,
                formSchema: form,
                formValues: values,
                handleOnChange: onChange
              });
            };

            _global$render4 = global.render(_react2.default.createElement(Test, null)), getByTestId = _global$render4.getByTestId;
            _context4.next = 5;
            return (0, _reactTestingLibrary.waitForElement)(function () {
              return getByTestId('price-input');
            });

          case 5:
            priceInput = _context4.sent;

            _reactTestingLibrary.fireEvent.change(priceInput, { target: { name: 'price', value: '5' } });
            totalInput = getByTestId('grand-total-input');

            expect(totalInput.value).toBe('$8.00');

          case 9:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, _this);
  })));
});