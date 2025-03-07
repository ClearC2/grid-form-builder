import React, {useEffect, useCallback} from 'react'
import PropTypes from 'prop-types'
import {OnChangePlugin} from '@lexical/react/LexicalOnChangePlugin'
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext'
import {$generateHtmlFromNodes, $generateNodesFromDOM} from '@lexical/html'
import {$insertNodes, $getRoot} from 'lexical'
import useFocusContext from './focusContext'

const {DOMParser} = window

let cache = null

const HTMLPlugin = ({value = '', onHtmlChanged = () => null}) => {
  const [editor] = useLexicalComposerContext()
  const {setActiveElement, focusActiveElement} = useFocusContext()

  useEffect(() => {
    if (value !== cache && editor) {
      cache = value
      editor.update(() => {
        const parser = new DOMParser()
        const dom = parser.parseFromString(value, 'text/html')
        const root = $getRoot()
        root.clear()
        const nodes = $generateNodesFromDOM(editor, dom) || []
        setActiveElement()
        $insertNodes(nodes) // this steals focus, even if this input isn't focused
        focusActiveElement()
      })
    }
  }, [editor, value, setActiveElement, focusActiveElement])

  const onChange = useCallback(editorState => {
    editorState.read(() => {
      onHtmlChanged($generateHtmlFromNodes(editor))
    })
  }, [editor, onHtmlChanged])

  return <OnChangePlugin onChange={onChange} />
}

HTMLPlugin.propTypes = {
  value: PropTypes.string,
  onHtmlChanged: PropTypes.func
}

export default HTMLPlugin
