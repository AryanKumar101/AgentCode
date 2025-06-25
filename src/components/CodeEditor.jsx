import { Box, HStack, Text } from '@chakra-ui/react'
import { Editor } from '@monaco-editor/react'
import { useRef, useState } from 'react'
import Output from './Output'

const CodeEditor = () => {
  const editorRef = useRef()
  const [value, setValue] = useState('print("Hello from Python!")')

  const onMount = (editor) => {
    editorRef.current = editor
    editor.focus()
  }

  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold" color="white" mb={4}>
        AgentCode
      </Text>

      <HStack spacing={4} align="start">
        {/* Styled wrapper to match Output pane */}
        <Box
          w="50%"
          height="80vh"
          p={2}
          border="1px solid"
          borderColor="#333"
          borderRadius={4}
          bg="#1e1e1e"
        >
          <Editor
            theme="vs-dark"
            height="100%"
            defaultLanguage="python"
            value={value}
            onMount={onMount}
            onChange={(val) => setValue(val)}
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              padding: { top: 8 },
            }}
          />
        </Box>

        <Output code={value} />
      </HStack>
    </Box>
  )
}

export default CodeEditor
