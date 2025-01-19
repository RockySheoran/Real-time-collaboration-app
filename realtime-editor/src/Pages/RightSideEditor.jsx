import React, { useEffect, useRef, useState } from "react"
import { EditorView, basicSetup } from "codemirror"
import { EditorState } from "@codemirror/state"
import { html } from "@codemirror/lang-html"
import { oneDark } from "@codemirror/theme-one-dark"
import { closeBrackets } from "@codemirror/autocomplete"

const RightSideEditor = () => {
  const editorRef = useRef(null) // Ref for CodeMirror parent div
  const iframeRef = useRef(null) // Ref for iframe
  const editorInstance = useRef(null) // Ref to store CodeMirror instance          
  const [editorContent, setEditorContent] = useState(
    `<!DOCTYPE html>
<html>
  <head>
    <title>Rendered Output</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f0f0f0;
        text-align: center;
        margin: 0;
        padding: 0;
      }
      h1 {
        color: #333;
      }
    </style>
  </head>
  <body>
    <h1>Hello, World!</h1>
    <button onclick="sayHello()">Click Me</button>
    <script>
      function sayHello() {
        alert('Hello from JavaScript!');
      }
    </script>
  </body>
</html>`
  )

  useEffect(() => {
    if (!editorRef.current) return

    // Initialize CodeMirror
    editorInstance.current = new EditorView({
      state: EditorState.create({
        doc: editorContent,
        extensions: [
          basicSetup, // Basic setup for CodeMirror
          html(), // HTML syntax and features
          oneDark, // Theme
          closeBrackets(), // Auto-close tags and brackets
          EditorView.updateListener.of((update) => {
            if (update.docChanged) {
              const newContent = update.state.doc.toString()
              setEditorContent(newContent) // Sync content
            }
          }),
        ],
      }),
      parent: editorRef.current,
    })

    return () => editorInstance.current.destroy()
  }, [])

  useEffect(() => {
    // Update iframe content whenever editorContent changes
    if (iframeRef.current) {
      const iframeDoc =
        iframeRef.current.contentDocument ||
        iframeRef.current.contentWindow.document
      iframeDoc.open()
      iframeDoc.write(editorContent)
      iframeDoc.close()
    }
  }, [editorContent])

  return (
    <div className="grid grid-cols-2 h-screen gap-3 w-full">
      {/* CodeMirror Editor */}
      <div
        ref={editorRef}
        className="h-full  overflow-auto bg-gray-800 border-red-500 border-2"></div>

      {/* Output iframe */}
      <iframe
        ref={iframeRef}
        className="w-full  overflow-auto h-full border-2"
        title="Rendered Output"></iframe>
    </div>
  )
}

export default RightSideEditor
