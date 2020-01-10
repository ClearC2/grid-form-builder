import React, {useState, useEffect, useCallback, createContext, useContext, createRef} from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import Portal from '../Portal'

DateTime.propTypes = {
  inputProps: PropTypes.object,
  timeFormat: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(moment)
  ])
}

const Time = createContext({timeFormat: 'hh:mm a', typing: false, setTyping: () => {}})

export function DateTime (props) {
  const [inputId, setId] = useState('')
  const [display, setDisplay] = useState('')
  const [typedValues, setValues] = useState([])
  const [open, setOpen] = useState(false)
  const [typing, setTyping] = useState(false)

  const {
    inputProps = {},
    timeFormat = 'hh:mm a',
    onChange = () => {},
    className = '',
    value,
    ...timeProps
  } = props

  useEffect(() => {
    setId(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15))
    // eslint-disable-next-line
  }, [])

  return (
    <Time.Provider value={{timeFormat, typing, setTyping}}>
      <div className={className}>
        <Input
          {...inputProps}
          onChange={onChange}
          display={display}
          setDisplay={setDisplay}
          setOpen={setOpen}
          setValues={setValues}
          open={open}
          id={inputId}
        />
        <TimePopout
          {...timeProps}
          display={display}
          setDisplay={setDisplay}
          typedValues={typedValues}
          onChange={onChange}
          open={open}
          value={value}
          id={inputId}
        />
      </div>
    </Time.Provider>
  )
}

function OnOutsideClick (e, id, onBlur, ref, setOpen) {
  let found = false
  const onClickPath = e.path || e.composedPath()

  onClickPath.forEach(path => {
    if (path.id === id) {
      found = true
      ref.focus()
    } else if (path.id === `timePicker-${id}`) {
      found = true
      ref.focus()
    }
  })

  if (!found) {
    setOpen(false)
    ref.blur()
    if (onBlur) {
      onBlur(e)
    }
  }
}

Input.propTypes = {
  display: PropTypes.string,
  onClick: PropTypes.func,
  setOpen: PropTypes.func,
  onBlur: PropTypes.func,
  open: PropTypes.bool,
  setRef: PropTypes.func,
  onChange: PropTypes.func,
  setDisplay: PropTypes.func,
  setValues: PropTypes.func,
  id: PropTypes.string
}

function Input (props) {
  const {
    display,
    onClick,
    setOpen,
    onBlur,
    open,
    setRef,
    onChange,
    setDisplay,
    setValues,
    id,
    ...rest
  } = props
  const {typing, setTyping} = useContext(Time)
  const [listener, setListener] = useState({})
  const [inputValue, setInput] = useState(display)
  const [inputRef] = useState(createRef())

  const OnInputClick = useCallback((e) => {
    setListener({
      type: 'click',
      func: (e) => OnOutsideClick(e, id, onBlur, inputRef.current, setOpen)
    })

    if (onClick) {
      onClick(e)
    }

    setOpen(true)
  }, [onClick, setOpen, id, onBlur, inputRef])

  const OnInputChange = useCallback((e) => {
    setTyping(true)
    const value = e.target.value

    if (value) {
      setDisplay(value)
      let [newHour = 12, newMinute = 0, newZone = 'am'] = value.split(/[: ]/g)

      if (isNaN(newHour) || !newHour || +newHour > 23 || +newHour < 0) {
        newHour = 12
      }
      if (isNaN(newMinute) || !newMinute || +newMinute > 59 || +newMinute < 0) {
        newMinute = 0
      }
      if (!newZone || newZone.length > 2) {
        newZone = 'am'
      }

      onChange(value)
      setInput(value)
      setValues([newHour, newMinute, newZone])
    } else {
      onChange('')
      setInput('')
      setValues([12, 0, 'am'])
    }
  }, [onChange, setDisplay, setValues, setTyping])

  const showDisplay = useCallback((inputValue, display) => {
    if (typing) {
      return inputValue
    } else {
      return display
    }
  }, [typing])

  useEffect(() => {
    if (setRef) {
      setRef(inputRef.current)
    }
  }, [setRef, inputRef])

  useEffect(() => {
    if (!open) {
      setListener({})
      window.removeEventListener(listener.type, listener.func)
    } else if (listener.type) {
      window.addEventListener(listener.type, listener.func)
    }
  }, [open, listener.type, listener.func])

  return (
    <input
      {...rest}
      value={showDisplay(inputValue, display)}
      onClick={OnInputClick}
      onChange={OnInputChange}
      ref={inputRef}
      id={id}
    />
  )
}

TimePopout.propTypes = {
  setDisplay: PropTypes.func,
  open: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(moment)
  ]),
  typedValues: PropTypes.array,
  onChange: PropTypes.func,
  id: PropTypes.string
}

function TimePopout (props) {
  const [hour, setHour] = useState(12)
  const [minute, setMinute] = useState(0)
  const [zone, setZone] = useState('am')
  const [isInit, setInit] = useState(true)
  const {timeFormat} = useContext(Time)
  const {setDisplay, open, value, typedValues, onChange, id} = props

  useEffect(() => {
    if (value._d && value.isValid()) {
      const initHour = value.hour() % 12 === 0 ? 12 : value.hour() % 12
      const initZone = value.hour() > 11 ? 'pm' : 'am'
      setHour(initHour)
      setMinute(value.minutes())
      setZone(initZone)
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    let [newHour, newMinute, newZone] = typedValues

    if (newHour !== undefined) {
      setHour(+newHour)
    }
    if (newMinute !== undefined) {
      setMinute(+newMinute)
    }
    if (newZone !== undefined) {
      newZone = newZone.includes('a') ? 'am' : 'pm'
      setZone(newZone)
    }
  }, [typedValues])

  useEffect(() => {
    if (!isInit) {
      const display = moment(`${hour}:${minute} ${zone}`, timeFormat).format(timeFormat)
      onChange(display)
      setDisplay(display)
    } else {
      setInit(false)
    }
  }, [hour, minute, zone, timeFormat, setDisplay, onChange, isInit])

  return (
    <Portal id={id}>
      <div className='row ml-0' id={`timePicker-${id}`}>
        <div className='rdtPicker rdtTime' style={{display: open ? 'inline-flex' : 'none', alignItems: 'center'}}>
          <div className='rdtCounters' style={{margin: 'auto'}}>
            <Hour display={hour} setDisplay={setHour} />
            <div className='rdtCounterSeparator'>:</div>
            <Minutes display={minute} setDisplay={setMinute} />
            <AMPM display={zone} setDisplay={setZone} />
          </div>
        </div>
      </div>
    </Portal>
  )
}

Counter.propTypes = {
  children: PropTypes.any,
  onClick: PropTypes.func
}

function Counter (props) {
  const {onClick = () => {}} = props
  const {setTyping} = useContext(Time)

  const upClick = useCallback(() => {
    setTyping(false)
    onClick('up')
  }, [onClick, setTyping])

  const downClick = useCallback(() => {
    setTyping(false)
    onClick('down')
  }, [onClick, setTyping])

  return (
    <div
      className='rdtCounter'
      style={{textAlign: 'center'}}
    >
      <span className='rdtBtn' onClick={upClick}>▲</span>
      {props.children}
      <span className='rdtBtn' onClick={downClick}>▼</span>
    </div>
  )
}

Hour.propTypes = {
  display: PropTypes.number,
  setDisplay: PropTypes.func
}

function Hour (props) {
  let {display, setDisplay} = props
  const [range, setRange] = useState(12)
  const {timeFormat} = useContext(Time)

  useEffect(() => {
    if (timeFormat.includes('h')) {
      setRange(12)
    } else if (timeFormat.includes('H')) {
      setRange(24)
    }
  }, [timeFormat])

  const callBack = useCallback((env) => {
    if (env === 'up') {
      if (display + 1 > range) {
        setDisplay(1)
      } else {
        setDisplay(display + 1)
      }
    } else if (env === 'down') {
      if (display - 1 < 1) {
        setDisplay(range - 1)
      } else {
        setDisplay(display - 1)
      }
    }
  }, [display, setDisplay, range])

  display = display % range === 0 && range === 12 ? 12 : display % range

  return (
    <Counter onClick={callBack}>
      <div className='rdtCount'>{display}</div>
    </Counter>
  )
}

Minutes.propTypes = {
  display: PropTypes.number,
  setDisplay: PropTypes.func
}

function Minutes (props) {
  const {display, setDisplay} = props
  const [range] = useState(60)

  const callBack = useCallback((env) => {
    if (env === 'up') {
      if (display + 1 >= range) {
        setDisplay(1)
      } else {
        setDisplay(display + 1)
      }
    } else if (env === 'down') {
      if (display - 1 < 0) {
        setDisplay(range - 1)
      } else {
        setDisplay(display - 1)
      }
    }
  }, [display, setDisplay, range])

  return (
    <Counter onClick={callBack}>
      <div className='rdtCount'>{`${display < 10 ? '0' : ''}`}{display}</div>
    </Counter>
  )
}

AMPM.propTypes = {
  display: PropTypes.string,
  setDisplay: PropTypes.func
}

function AMPM (props) {
  const {display, setDisplay} = props
  const [isUpper, setUpper] = useState(false)
  const {timeFormat} = useContext(Time)

  useEffect(() => {
    if (timeFormat.includes('A')) {
      setUpper(true)
    } else if (timeFormat.includes('a')) {
      setUpper(false)
    }
  }, [timeFormat])

  const callBack = useCallback((env) => {
    let value = 'am'
    if (display.toLowerCase() === 'am') {
      value = 'pm'
    }
    value = isUpper ? value.toUpperCase() : value
    setDisplay(value)
  }, [setDisplay, display, isUpper])

  return (
    <Counter onClick={callBack}>
      <div className='rdtCount'>{display}</div>
    </Counter>
  )
}