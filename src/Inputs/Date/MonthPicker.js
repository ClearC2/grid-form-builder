import React, {forwardRef, useState, useEffect, useMemo, useCallback} from 'react'
import PropTypes from 'prop-types'
import Portal from '../../Portal'
import moment from 'moment'
import '../../styles/month-picker.css'
import {FaChevronLeft, FaChevronRight} from 'react-icons/fa'

const MonthPicker = forwardRef((props, ref) => {
  const {
    elementId,
    pastYears,
    futureYears,
    startDate,
    changeShowPicker,
    showPicker,
    onChange,
    name,
    format
  } = props

  const [yearOptions, setYearOptions] = useState([])

  const [currentYear, setCurrentYear] = useState(+moment().format('YYYY'))
  const [currentMonth, setCurrentMonth] = useState(+moment().format('MM'))

  const isSelectedMonth = useCallback(month => {
    return month === currentMonth
  }, [currentMonth])

  const incrementYear = useCallback(() => {
    const index = yearOptions.indexOf(currentYear)
    let year = currentYear
    if (index + 1 === yearOptions.length) year = yearOptions[0]
    else year = yearOptions[index + 1]
    setCurrentYear(year)
    setCurrentMonth(0)
  }, [yearOptions, currentYear])

  const decrementYear = useCallback(() => {
    const index = yearOptions.indexOf(currentYear)
    let year = currentYear
    if (index === 0) year = yearOptions[yearOptions.length - 1]
    else year = yearOptions[index - 1]
    setCurrentYear(year)
    setCurrentMonth(0)
  }, [yearOptions, currentYear])

  const cancelDateChange = useCallback(() => {
    changeShowPicker(false)
  }, [changeShowPicker])

  const applyDateChange = useCallback(() => {
    if (currentYear && currentMonth) {
      onChange({
        target: {
          name,
          value: moment(`${currentMonth}/${currentYear}`, 'M/YYYY').format(format)
        }
      })
      changeShowPicker(false)
    }
  }, [changeShowPicker, currentMonth, currentYear, format, name, onChange])

  const windowClickListener = useMemo(() => {
    return e => {
      const pathHandler = (e.path || e.composedPath())
      const insideClick = pathHandler.some(path => {
        return (
          path.id && (
            path.id === elementId.current ||
            path.id === ref.current.state.id
          )
        )
      })
      if (!insideClick) {
        if (currentYear && currentMonth) {
          onChange({
            target: {
              name,
              value: moment(`${currentMonth}/${currentYear}`, 'M/YYYY').format(format)
            }
          })
        }
        changeShowPicker(false)
      }
    }
  }, [elementId, ref, changeShowPicker, onChange, currentYear, currentMonth, name, format])

  useEffect(() => {
    if (showPicker) window.addEventListener('mousedown', windowClickListener)
    else window.removeEventListener('mousedown', windowClickListener)
    return () => {
      window.removeEventListener('mousedown', windowClickListener)
    }
  }, [showPicker, windowClickListener])

  useEffect(() => {
    const options = []
    const thisYear = +moment().format('YYYY')
    for (let i = +pastYears; i > 0; i--) {
      options.push(thisYear - i)
    }
    for (let i = 0; i <= futureYears; i++) {
      options.push(thisYear + i)
    }
    setYearOptions(options)
  }, [pastYears, futureYears])

  useEffect(() => {
    const date = startDate || moment()
    const year = +date.format('YYYY')
    const month = +date.format('MM')
    setCurrentYear(year)
    setCurrentMonth(month)
  }, [startDate])

  return (
    <Portal id={elementId} ref={ref}>
      <div className='gfb-month-picker-container'>
        <div className='gfb-month-picker-year-header'>
          <div
            className='gfb-month-picker-left-month-arrow'
            onClick={decrementYear}
          >
            <FaChevronLeft />
          </div>
          <div className='gfb-month-picker-selected-year'>
            <select
              value={currentYear}
              onChange={e => {
                setCurrentYear(+e.target.value)
                setCurrentMonth(0)
              }}
              className='gfb-month-picker-year-select'
            >
              {yearOptions.map((year, i) => {
                return (
                  <option key={i} value={year}>{year}</option>
                )
              })}
            </select>
          </div>
          <div
            className='gfb-month-picker-right-month-arrow'
            onClick={incrementYear}
          >
            <FaChevronRight />
          </div>
        </div>
        <div className='gfb-month-picker-month-cluster'>
          <div className='gfb-month-cluser-row'>
            <div
              className={`gfb-month-cluster-month-button${isSelectedMonth(1) ? ' month-selected' : ''}`}
              onClick={() => setCurrentMonth(1)}
            >
              Jan
            </div>
            <div
              className={`gfb-month-cluster-month-button${isSelectedMonth(2) ? ' month-selected' : ''}`}
              onClick={() => setCurrentMonth(2)}
            >
              Feb
            </div>
            <div
              className={`gfb-month-cluster-month-button${isSelectedMonth(3) ? ' month-selected' : ''}`}
              onClick={() => setCurrentMonth(3)}
            >
              Mar
            </div>
          </div>
          <div className='gfb-month-cluser-row'>
            <div
              className={`gfb-month-cluster-month-button${isSelectedMonth(4) ? ' month-selected' : ''}`}
              onClick={() => setCurrentMonth(4)}
            >
              Apr
            </div>
            <div
              className={`gfb-month-cluster-month-button${isSelectedMonth(5) ? ' month-selected' : ''}`}
              onClick={() => setCurrentMonth(5)}
            >
              May
            </div>
            <div
              className={`gfb-month-cluster-month-button${isSelectedMonth(6) ? ' month-selected' : ''}`}
              onClick={() => setCurrentMonth(6)}
            >
              June
            </div>
          </div>
          <div className='gfb-month-cluser-row'>
            <div
              className={`gfb-month-cluster-month-button${isSelectedMonth(7) ? ' month-selected' : ''}`}
              onClick={() => setCurrentMonth(7)}
            >
              July
            </div>
            <div
              className={`gfb-month-cluster-month-button${isSelectedMonth(8) ? ' month-selected' : ''}`}
              onClick={() => setCurrentMonth(8)}
            >
              Aug
            </div>
            <div
              className={`gfb-month-cluster-month-button${isSelectedMonth(9) ? ' month-selected' : ''}`}
              onClick={() => setCurrentMonth(9)}
            >
              Sep
            </div>
          </div>
          <div className='gfb-month-cluser-row'>
            <div
              className={`gfb-month-cluster-month-button${isSelectedMonth(10) ? ' month-selected' : ''}`}
              onClick={() => setCurrentMonth(10)}
            >
              Oct
            </div>
            <div
              className={`gfb-month-cluster-month-button${isSelectedMonth(11) ? ' month-selected' : ''}`}
              onClick={() => setCurrentMonth(11)}
            >
              Nov
            </div>
            <div
              className={`gfb-month-cluster-month-button${isSelectedMonth(12) ? ' month-selected' : ''}`}
              onClick={() => setCurrentMonth(12)}
            >
              Dec
            </div>
          </div>
        </div>
        <div className='gfb-month-picker-footer'>
          <button
            className='gfb-month-button-cancel cancelBtn btn btn-sm btn-default'
            type='button'
            onClick={cancelDateChange}
          >
            Cancel
          </button>
          <button
            className='gfb-month-button-apply applyBtn btn btn-sm btn-primary'
            type='button'
            onClick={applyDateChange}
          >
            Apply
          </button>
        </div>
      </div>
    </Portal>
  )
})

export default MonthPicker

MonthPicker.propTypes = {
  elementId: PropTypes.string,
  onChange: PropTypes.func,
  changeShowPicker: PropTypes.func,
  startDate: PropTypes.instanceOf(moment),
  format: PropTypes.string,
  pastYears: PropTypes.number,
  futureYears: PropTypes.number,
  showPicker: PropTypes.bool,
  name: PropTypes.string
}
