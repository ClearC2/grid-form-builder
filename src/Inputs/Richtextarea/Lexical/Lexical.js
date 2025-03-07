/** @jsx jsx */
import {jsx} from '@emotion/core'
import {useCallback, forwardRef} from 'react'
import PropTypes from 'prop-types'
import {LexicalComposer} from '@lexical/react/LexicalComposer'
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin'
import {ContentEditable} from '@lexical/react/LexicalContentEditable'
import {LexicalErrorBoundary} from '@lexical/react/LexicalErrorBoundary'
import {TablePlugin} from '@lexical/react/LexicalTablePlugin'
import {TableNode, TableCellNode, TableRowNode} from '@lexical/table'
import HTMLPlugin from './HTMLPlugin'
import ToolbarPlugin from './ToolbarPlugin'
import theme from './theme'
import '../../../styles/rich-text-editor.css'

const LexicalRTE = forwardRef((props, ref) => {
  const {
    name,
    value = '',
    onChange = () => null
  } = props

  const onError = useCallback(e => {
    console.error(e) //eslint-disable-line
  }, [])

  const initialConfig = {
    namespace: name,
    nodes: [
      TableNode,
      TableCellNode,
      TableRowNode
    ],
    theme,
    onError
  }

  return (
    <LexicalComposer
      initialConfig={initialConfig}
    >
      <ToolbarPlugin />
      <RichTextPlugin
        contentEditable={
          <div className='lexical-rte-parent'>
            <ContentEditable className='lexical-rte-content-editable' />
          </div>
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HTMLPlugin
        onHtmlChanged={onChange}
        value={value}
      />
      <TablePlugin />
    </LexicalComposer>
  )
})

LexicalRTE.propTypes = {
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object, PropTypes.bool]),
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  autofocus: PropTypes.bool,
  placeholder: PropTypes.string,
  tabIndex: PropTypes.number,
  autoComplete: PropTypes.string,
  interactive: PropTypes.bool,
  requiredWarning: PropTypes.bool,
  style: PropTypes.object,
  required: PropTypes.bool,
  format: PropTypes.string,
  maxlength: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  warning: PropTypes.string
}

export default LexicalRTE
