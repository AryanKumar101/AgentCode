import { Box, Button, Text, Spinner, HStack } from "@chakra-ui/react"
import { useState } from "react"
import { runPython } from "../utils/pyRunner"

const Output = ({ code }) => {
  const [output, setOutput] = useState("")
  const [loading, setLoading] = useState(false)

  const handleRunCode = async () => {
    setLoading(true)
    const result = await runPython(code)
    setOutput(result.output || result.error || "No output.")
    setLoading(false)
  }

  const handlePlaceholder = (action) => {
    setOutput(`[${action}] feature is not implemented yet.`)
  }

  return (
    <Box
      w="50%"
      height="80vh"
      p={2}
      border="1px solid"
      borderColor="#333"
      borderRadius={4}
      bg="#1e1e1e"
      display="flex"
      flexDirection="column"
    >
      <Text mb={2} fontSize="lg" fontWeight="semibold">Output</Text>

      <HStack mb={2}>
        <Button colorScheme="green" onClick={handleRunCode} isDisabled={loading}>
          {loading ? <Spinner size="sm" /> : "Run Code"}
        </Button>
        <Button colorScheme="blue" variant="outline" onClick={() => handlePlaceholder("Debug")}>Debug</Button>
        <Button colorScheme="orange" variant="outline" onClick={() => handlePlaceholder("Test")}>Test</Button>
        <Button colorScheme="purple" variant="outline" onClick={() => handlePlaceholder("Explain")}>Explain</Button>
      </HStack>

      <Box
        flex={1}
        whiteSpace="pre-wrap"
        overflowY="auto"
        borderTop="1px solid"
        borderColor="#444"
        mt={2}
        p={2}
      >
        {output}
      </Box>
    </Box>
  )
}

export default Output
