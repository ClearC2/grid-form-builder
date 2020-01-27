import React, {createContext, useContext, useMemo, useState} from 'react'
import PropTypes from 'prop-types'
import defaultTheme from './default'
import executiveTheme from './executive'
import clone from 'lodash-es/clone'

const ThemeContext = createContext({theme: {}, setTheme: () => {}, setThemeValue: () => {}})

const ThemeProvider = ({children, theme: themeOverride}) => {
  const [theme, setTheme] = useState(defaultTheme)
  const value = useMemo(() => {
    let newTheme
    if (typeof themeOverride === 'string') {
      switch (themeOverride.toLowerCase()) {
        case 'classic':
        case 'default': {
          newTheme = defaultTheme; break
        }
        case 'executive': {
          newTheme = executiveTheme; break
        }
        default: newTheme = defaultTheme
      }
    } else if (typeof themeOverride === 'object') {
      newTheme = themeOverride
    } else {
      newTheme = theme
    }
    return {
      theme: newTheme,
      setTheme,
      setThemeValue: (key, value) => {
        const updated = clone(theme)
        updated[key] = value
        setTheme(updated)
      }
    }
  }, [theme, themeOverride])

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

ThemeProvider.propTypes = {
  children: PropTypes.node,
  theme: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
}

const useTheme = () => useContext(ThemeContext)

export {
  ThemeContext,
  ThemeProvider
}

export default useTheme
