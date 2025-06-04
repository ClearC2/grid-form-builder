import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _Object$getOwnPropertySymbols from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import _Object$getOwnPropertyDescriptor from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor";
import _forEachInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/for-each";
import _Object$getOwnPropertyDescriptors from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors";
import _Object$defineProperties from "@babel/runtime-corejs3/core-js-stable/object/define-properties";
import _Object$defineProperty from "@babel/runtime-corejs3/core-js-stable/object/define-property";
import _defineProperty from "@babel/runtime-corejs3/helpers/esm/defineProperty";
import _setTimeout from "@babel/runtime-corejs3/core-js-stable/set-timeout";
import _reduceInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/reduce";
import _trimInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/trim";
function ownKeys(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var _context2, _context3; var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? _forEachInstanceProperty(_context2 = ownKeys(Object(t), !0)).call(_context2, function (r) { _defineProperty(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : _forEachInstanceProperty(_context3 = ownKeys(Object(t))).call(_context3, function (r) { _Object$defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useEffect, useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import ReactSelect, { components as ReactSelectBaseComponents } from 'react-select';
import Creatable from 'react-select/creatable';
import { isMobile, randomId } from '../../utils';
import ValidationErrorIcon from '../../ValidationErrorIcon';
import useTheme from '../../theme/useTheme';
import PortalTooltip from '../../Tooltip';
const viewPortHeight = document.documentElement.clientHeight;
const Select = props => {
  var _context;
  const {
    allowcreate,
    value = '',
    tabIndex,
    autofocus,
    disabled,
    readonly,
    name,
    keyword = {},
    placeholder,
    requiredWarning,
    required,
    onKeyDown = () => null,
    // sometimes provided in the config object
    onChange,
    autoComplete,
    interactive = true,
    style = {},
    isClearable = true,
    warning,
    onBlur,
    showOptionTooltips = false,
    // this flag is used to show tooltips for each individual option
    createOptionPosition = 'last'
  } = props;
  const {
    value: valueStyle = {},
    inputOuter = {},
    inputInner = {},
    inputControl = {},
    valueContainer = {},
    indicators = {},
    options: optionsStyle = {}
  } = style;
  const {
    theme
  } = useTheme();
  const {
    value: valueTheme = {},
    inputInner: inputInnerTheme = {},
    inputControl: inputControlTheme = {},
    valueContainer: valueContainerTheme = {},
    indicators: indicatorsTheme = {},
    options: optionsTheme = {}
  } = theme;
  const [options, setOptions] = useState(keyword.options || []);
  const [input, changeInput] = useState({
    Select: !interactive ? Creatable : allowcreate ? Creatable : ReactSelect
  });
  const [isRequiredFlag, updateIsRequiredFlag] = useState(required && requiredWarning && !value.length);
  const [menuIsOpen, updateIsMenuOpen] = useState({});
  const [menuPlacement, updateMenuPlacement] = useState('bottom');
  const [fieldPosition, updateFieldPosition] = useState(0);
  const [selectValue, updateSelectValue] = useState({
    label: '',
    value: '',
    color: ''
  });
  const [isFocused, setIsFocused] = useState(false);
  const inputContainer = useRef(null);
  const openMenu = useCallback(() => {
    if (!readonly && !disabled && !menuIsOpen[name]) {
      updateIsMenuOpen(_objectSpread(_objectSpread({}, menuIsOpen), {}, {
        [name]: true
      }));
    }
  }, [readonly, disabled, menuIsOpen, updateIsMenuOpen, name]);
  const setMenuOpenPosition = useCallback(() => {
    const placement = fieldPosition < viewPortHeight / 2 ? 'bottom' : 'top';
    updateMenuPlacement(placement);
  }, [fieldPosition, updateMenuPlacement]);
  const handleInputBlur = useCallback(e => {
    if (typeof onBlur === 'function') {
      onBlur(e);
    }
    menuIsOpen[name] && updateIsMenuOpen(_objectSpread(_objectSpread({}, menuIsOpen), {}, {
      [name]: false
    }));
    setIsFocused(false);
  }, [menuIsOpen, updateIsMenuOpen, name, onBlur]);
  const setInputFieldPosition = useCallback(() => {
    if (inputContainer.current) {
      const position = inputContainer.current.getBoundingClientRect().top;
      if (fieldPosition !== position) {
        updateFieldPosition(position);
      }
    }
    _setTimeout(openMenu); // this needs to be refactored so it actually updates with react instead of hacking around the problem - JRA 12/18/2019
  }, [openMenu, fieldPosition]);
  const handleInputClick = useCallback(() => {
    if (!disabled && !readonly && interactive) {
      setInputFieldPosition();
    }
  }, [disabled, interactive, readonly, setInputFieldPosition]);
  const handleOnFocus = useCallback(e => {
    handleInputClick();
    setIsFocused(true);
  }, [handleInputClick]);
  const closeMenuOnScroll = useCallback(e => {
    let menuOpenState = false;
    if (e && e.target && e.target.classList) {
      menuOpenState = (e.target.classList.contains('gfb-input__menu-list') || e.target.classList.contains('gfb-input__control')) && menuIsOpen[name];
    }
    updateIsMenuOpen(_objectSpread(_objectSpread({}, menuIsOpen), {}, {
      [name]: menuOpenState
    }));
  }, [menuIsOpen, name, updateIsMenuOpen]);
  useEffect(() => {
    setOptions(keyword.options);
  }, [keyword.options, keyword.options.length]);
  useEffect(() => {
    setMenuOpenPosition();
  }, [fieldPosition, setMenuOpenPosition]);
  useEffect(() => {
    changeInput({
      Select: !interactive ? Creatable : allowcreate ? Creatable : ReactSelect
    });
  }, [interactive, allowcreate, changeInput]);
  useEffect(() => {
    updateIsRequiredFlag(required && requiredWarning && !value.length);
  }, [updateIsRequiredFlag, required, requiredWarning, value]);
  useEffect(() => {
    const keyMap = _reduceInstanceProperty(options).call(options, (acc, cv) => {
      acc[cv.value] = {
        label: cv.label,
        color: cv.color || ''
      };
      return acc;
    }, {});
    const selectValue = {
      label: value,
      value,
      color: ''
    };
    if (keyMap[value] && keyMap[value].label) selectValue.label = keyMap[value].label;
    if (keyMap[value] && keyMap[value].color) selectValue.color = keyMap[value].color;
    updateSelectValue(selectValue);
  }, [value, updateSelectValue, options]);
  const handleOnKeyDown = useCallback(() => {
    if (!menuIsOpen[name]) openMenu();
    onKeyDown();
  }, [onKeyDown, menuIsOpen, openMenu, name]);
  const handleChange = useCallback(e => {
    onChange({
      target: {
        name,
        value: e === null ? '' : e.value
      }
    });
    menuIsOpen[name] && updateIsMenuOpen(_objectSpread(_objectSpread({}, menuIsOpen), {}, {
      [name]: false
    }));
  }, [onChange, name, menuIsOpen]);
  const {
    Select
  } = input;
  let className = 'gfb-input-inner';
  if (!interactive) className = className + ' gfb-non-interactive-input';
  let outerClass = 'gfb-input-outer';
  const customComponents = {};
  if (warning && !isRequiredFlag) {
    customComponents.DropdownIndicator = () => {
      return jsx(ValidationErrorIcon, {
        message: warning,
        color: "#FFCC00",
        type: "warning"
      });
    };
  }
  if (isRequiredFlag && _trimInstanceProperty(_context = value + '').call(_context).length === 0 && !isFocused) {
    outerClass = outerClass + ' gfb-validation-error';
    customComponents.DropdownIndicator = () => {
      return jsx(ValidationErrorIcon, {
        message: "This Field is Required"
      });
    };
  }
  const Option = props => {
    if (!showOptionTooltips) {
      return jsx(ReactSelectBaseComponents.Option, props);
    } else {
      const optionId = randomId();
      return jsx("div", {
        "data-tip": true,
        "data-for": optionId
      }, jsx(PortalTooltip, {
        id: optionId,
        message: props.data?.tooltip
      }), jsx(ReactSelectBaseComponents.Option, props));
    }
  };
  if (isFocused) {
    outerClass = outerClass + ' gfb-has-focus';
  }
  const inputOuterCSS = _objectSpread(_objectSpread({}, theme.inputOuter), inputOuter);
  return jsx("div", {
    className: outerClass,
    ref: inputContainer,
    onMouseDown: setInputFieldPosition,
    style: inputOuter,
    css: inputOuterCSS
  }, jsx(Select, {
    className: className,
    classNamePrefix: "gfb-input",
    tabIndex: tabIndex,
    autoFocus: autofocus,
    closeMenuOnScroll: !isMobile ? closeMenuOnScroll : undefined,
    isClearable: isClearable,
    isDisabled: disabled || readonly,
    menuPortalTarget: document.body,
    name: name,
    options: options,
    placeholder: placeholder
    // onFocus={handleOnFocus}
    ,
    onKeyDown: handleOnKeyDown,
    onBlur: handleInputBlur
    // menuIsOpen={!isMobile ? menuIsOpen[name] : undefined}
    ,
    menuPlacement: !isMobile ? menuPlacement : undefined,
    value: selectValue,
    defaultValue: selectValue,
    onChange: handleChange,
    autoComplete: autoComplete,
    createOptionPosition: createOptionPosition,
    components: _objectSpread(_objectSpread({}, customComponents), {}, {
      Option
    }),
    styles: {
      container: base => {
        return _objectSpread(_objectSpread(_objectSpread({}, base), inputInner), inputInnerTheme);
      },
      control: base => {
        return _objectSpread(_objectSpread(_objectSpread({}, base), inputControl), inputControlTheme);
      },
      valueContainer: base => {
        const valueColor = {};
        if (selectValue.color) {
          valueColor.backgroundColor = selectValue.color;
        }
        return _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, base), valueContainer), valueContainerTheme), valueColor);
      },
      indicatorsContainer: base => {
        return _objectSpread(_objectSpread(_objectSpread({}, base), indicators), indicatorsTheme);
      },
      option: base => {
        return _objectSpread(_objectSpread(_objectSpread({}, base), optionsStyle), optionsTheme);
      },
      singleValue: base => {
        if (!interactive) {
          base.color = 'green';
        }
        return _objectSpread(_objectSpread(_objectSpread({}, base), valueStyle), valueTheme);
      },
      menuPortal: base => {
        const top = menuPlacement === 'bottom' ? base.top - 8 : base.top + 8;
        const zIndex = 9999; // this keeps the select menu below the option tooltip portal
        return _objectSpread(_objectSpread({}, base), {}, {
          top,
          zIndex
        });
      }
    }
  }));
};
export default Select;
Select.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object, PropTypes.bool]),
  keyword: PropTypes.object,
  tabIndex: PropTypes.number,
  allowcreate: PropTypes.bool,
  autofocus: PropTypes.bool,
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  placeholder: PropTypes.string,
  requiredWarning: PropTypes.bool,
  required: PropTypes.bool,
  values: PropTypes.object,
  persist: PropTypes.bool,
  onKeyDown: PropTypes.func,
  autoComplete: PropTypes.string,
  interactive: PropTypes.bool,
  style: PropTypes.object,
  isClearable: PropTypes.bool,
  warning: PropTypes.string,
  onBlur: PropTypes.func,
  showOptionTooltips: PropTypes.bool,
  data: PropTypes.object,
  createOptionPosition: PropTypes.string
};