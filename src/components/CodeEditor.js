"use client";
import React, { useRef } from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = ({ code, setCode, onRunQuery, status }) => {
    const onRunQueryRef = useRef(onRunQuery);
    const editorRef = useRef(null);

    // Update ref whenever onRunQuery changes
    React.useEffect(() => {
        onRunQueryRef.current = onRunQuery;
    }, [onRunQuery]);

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor;

        editor.addCommand(
            monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyK,
            () => {
                console.log("Ctrl + Shift + K pressed inside Monaco!");
                myCustomFunction();
            }
        );

        editor.addCommand(
            monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyK,
            () => {
                console.log("Ctrl + K pressed inside Monaco!");
                if (onRunQueryRef.current) {
                    onRunQueryRef.current();
                }
            }
        );

        editor.addCommand(
            monaco.KeyMod.CtrlCmd | monaco.KeyMod.Enter,
            () => {
                console.log("Ctrl + Enter pressed inside Monaco!");
                myCustomFunction();
            }
        );
    }

    const myCustomFunction = () => {
        alert("Shortcut triggered!");
    };
    return (
        <div className="h-full w-full">
            <Editor
                height="100%"
                defaultLanguage="sql"
                theme="vs-dark"
                value={code}
                onChange={(value) => setCode(value)}
                options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                }}
                onMount={handleEditorDidMount}
            />
        </div>
    );
};

export default CodeEditor;
