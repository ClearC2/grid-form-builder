import React from 'react'
import {LexicalComposer} from '@lexical/react/LexicalComposer'
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin'
import {ContentEditable} from '@lexical/react/LexicalContentEditable'
import {LexicalErrorBoundary} from '@lexical/react/LexicalErrorBoundary'

const theme = {}

const onError = err => {
  console.error(err)
}

const LexicalRTE = () => {
  const initialConfig = {
    namespace: 'MyEditor',
    theme,
    onError
  }

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <RichTextPlugin
        contentEditable={<ContentEditable />}
        placeholder={<div>Enter some text...</div>}
        ErrorBoundary={LexicalErrorBoundary}
      />
    </LexicalComposer>
  )
}

export default LexicalRTE
