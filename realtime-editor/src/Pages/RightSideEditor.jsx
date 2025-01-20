import React, { useEffect, useState, useRef } from "react"
import { EditorView, basicSetup } from "codemirror"
import { EditorState } from "@codemirror/state"
import { html } from "@codemirror/lang-html"
import { oneDark } from "@codemirror/theme-one-dark"
import { closeBrackets } from "@codemirror/autocomplete"
import ACTIONS from "../Action"

const RightSideEditor = ({ roomId, socketRef, code,onCodeChange }) => {
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
  const [editorView, setEditorView] = useState(null)
  const editorRef = useRef(null)

  // Debounce function to limit the frequency of state updates
  const debounce = (func, delay) => {
    let timer
    return (...args) => {
      clearTimeout(timer)
      timer = setTimeout(() => func(...args), delay)
    }
  }

  useEffect(() => {
    const editorContainer = document.getElementById("editor-container")

    const view = new EditorView({
      state: EditorState.create({
        doc: editorContent,
        extensions: [
          basicSetup,
          html(),
          oneDark,
          closeBrackets(),
          EditorView.updateListener.of((update) => {
            if (update.docChanged) {
              const newContent = update.state.doc.toString()
              setEditorContent(newContent) // Sync content state
               debouncedEmit(newContent)
               onCodeChange(newContent);
            }
          }),
        ],
      }),
      parent: editorContainer,
    })

    editorRef.current = view
    setEditorView(view)

    return () => {
      if (view) view.destroy()
    }
  }, [])

  useEffect(() => {
    if (editorView && code) {
      // Save the current selection (cursor position) before updating content
      const currentSelection = editorView.state.selection

      // Create a transaction to update content without affecting the cursor position
      const transaction = editorView.state.update({
        changes: {
          from: 0,
          to: editorView.state.doc.length,
          insert: code,
        },
        selection: currentSelection, // Preserve the cursor position
      })
      setEditorContent(code)

      // Dispatch the transaction to update content
      editorView.dispatch(transaction)
    }
  }, [code])

  const debouncedEmit = useRef(
    debounce((newContent) => {
      socketRef.current.emit("code_change", { roomId, code: newContent })
      // console.log(roomId, newContent)
    }, 300)
  ).current


  useEffect(() => {
    const iframe = document.getElementById("output-iframe")
    if (iframe) {
      const doc = iframe.contentDocument || iframe.contentWindow.document
      doc.open()
      doc.write(editorContent)
      doc.close()
    }
  }, [editorContent])

  return (
    <div className="grid grid-cols-2 h-screen gap-3 w-full">
      {/* CodeMirror Editor */}
      <div
        id="editor-container"
        className="h-full overflow-auto bg-gray-800 border-red-500 border-2"></div>

      {/* Output iframe */}
      <iframe
        id="output-iframe"
        className="w-full overflow-auto h-full border-2"
        title="Rendered Output"></iframe>
    </div>
  )
}

export default RightSideEditor
