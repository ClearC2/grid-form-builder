'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

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
    var Test, _global$render, getByTestId, input;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            Test = function Test() {
              return _react2.default.createElement(_FormBuilder2.default, {
                formSchema: form,
                formValues: (0, _immutable.Map)({ firstName: 'John' })
              });
            };
            // global.render comes from jest.setup.js


            _global$render = global.render(_react2.default.createElement(Test, null)), getByTestId = _global$render.getByTestId;
            // have to wait for the layout to render and settle

            _context.next = 4;
            return (0, _reactTestingLibrary.waitForElement)(function () {
              return getByTestId('firstName-input');
            });

          case 4:
            input = _context.sent;

            expect(input.value).toBe('John');

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  })));

  test('it updates value', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var onFormSubmit, Test, _global$render2, getByTestId, getByText, input;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // mock a submit function
            onFormSubmit = jest.fn();

            // set up a test component

            Test = function Test() {
              var _React$useState = _react2.default.useState((0, _immutable.Map)({})),
                  _React$useState2 = _slicedToArray(_React$useState, 2),
                  values = _React$useState2[0],
                  setValues = _React$useState2[1];

              var onSubmit = function onSubmit(e) {
                e.preventDefault();
                onFormSubmit(values.toJS());
              };
              var onChange = function onChange(e) {
                var _e$target = e.target,
                    name = _e$target.name,
                    value = _e$target.value;

                setValues(values.set(name, value));
              };
              return _react2.default.createElement(
                'form',
                { onSubmit: onSubmit },
                _react2.default.createElement(_FormBuilder2.default, {
                  formName: form.name,
                  formSchema: form,
                  formValues: values,
                  handleOnChange: onChange
                }),
                _react2.default.createElement(
                  'button',
                  { type: 'submit' },
                  'Submit'
                )
              );
            };

            _global$render2 = global.render(_react2.default.createElement(Test, null)), getByTestId = _global$render2.getByTestId, getByText = _global$render2.getByText;
            _context2.next = 5;
            return (0, _reactTestingLibrary.waitForElement)(function () {
              return getByTestId('firstName-input');
            });

          case 5:
            input = _context2.sent;

            _reactTestingLibrary.fireEvent.change(input, { target: { name: input.name, value: 'testing' } });
            _reactTestingLibrary.fireEvent.click(getByText('Submit'));
            expect(onFormSubmit).toHaveBeenCalledWith({ firstName: 'testing' });

          case 9:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, _this);
  })));
});