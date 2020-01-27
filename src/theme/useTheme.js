import React, {createContext, useContext, useMemo, useState} from 'react'
import PropTypes from 'prop-types'
import defaultTheme from './default'
import clone from 'lodash-es/clone'

const ThemeContext = createContext({theme: {}, setTheme: () => {}, setThemeValue: () => {}})

const ThemeProvider = ({children}) => {
  const [theme, setTheme] = useState(defaultTheme)
  const value = useMemo(() => {
    return {
      theme,
      setTheme,
      setThemeValue: (key, value) => {
        const updated = clone(theme)
        updated[key] = value
        setTheme(updated)
      }
    }
  }, [theme])

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

ThemeProvider.propTypes = {
  children: PropTypes.node
}

const useTheme = () => useContext(ThemeContext)

export {
  ThemeContext,
  ThemeProvider
}

export default useTheme
