import React, { useEffect, useState, useRef } from "react"
import { EditorView, basicSetup } from "codemirror"
import { EditorState } from "@codemirror/state"
import { html } from "@codemirror/lang-html"
import { oneDark } from "@codemirror/theme-one-dark"
import { closeBrackets } from "@codemirror/autocomplete"
import { useDispatch, useSelector } from "react-redux"
import { setCode } from "../redux/Slice"

const RightSideEditor = ({ roomId, socketRef, code, onCodeChange }) => {
  const { Allcode } = useSelector((store) => store.all) // Redux state
  const [editorContent, setEditorContent] = useState(
    Allcode ||
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
  const dispatch = useDispatch()

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
              onCodeChange(newContent)
              dispatch(setCode(newContent)) // Save to Redux state
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
      editorView.dispatch(transaction)
    }
  }, [code, editorView])

  const debouncedEmit = useRef(
    debounce((newContent) => {
      socketRef.current.emit("code_change", { roomId, code: newContent })
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
    <div className="grid grid-cols-1 md:grid-cols-2 sm:h-[150vh] overflow-auto md:h-screen h-[200%] gap-3 w-full">
      {/* CodeMirror Editor */}
      <div
        id="editor-container"
        className="md:h-full h-[100%] overflow-auto bg-gray-800 border-red-500 border-2"></div>

      {/* Output iframe */}
      <iframe
        id="output-iframe"
        className="w-full overflow-auto h-[200%] md:h-full border-2"
        title="Rendered Output"></iframe>
    </div>
  )
}

export default RightSideEditor
