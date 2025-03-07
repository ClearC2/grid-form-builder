import {useEffect} from 'react'
import PropTypes from 'prop-types'
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext'
import {BLUR_COMMAND, FOCUS_COMMAND, COMMAND_PRIORITY_LOW} from 'lexical'

const FocusPlugin = ({onFocus = () => null, onBlur = () => null}) => {
  const [editor] = useLexicalComposerContext()
  useEffect(
    () =>
      editor.registerCommand(
        BLUR_COMMAND,
        () => {
          onBlur()
          return false
        },
        COMMAND_PRIORITY_LOW
      ),
    [editor, onBlur]
  )

  useEffect(
    () =>
      editor.registerCommand(
        FOCUS_COMMAND,
        () => {
          onFocus()
          return false
        },
        COMMAND_PRIORITY_LOW
      ),
    [editor, onFocus]
  )
  return null
}

FocusPlugin.propTypes = {
  onFocus: PropTypes.func,
  onBlur: PropTypes.func
}

export default FocusPlugin
