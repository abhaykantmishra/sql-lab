"use client";
import React, { useRef } from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = ({ code, setCode, onRunQuery, onSave, status }) => {
    const onRunQueryRef = useRef(onRunQuery);
    const onSaveRef = useRef(onSave);
    const editorRef = useRef(null);

    // Update ref whenever onRunQuery changes
    React.useEffect(() => {
        onRunQueryRef.current = onRunQuery;
    }, [onRunQuery]);

    React.useEffect(() => {
        onSaveRef.current = onSave;
    }, [onSave]);

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

        // editor.addCommand(
        //     monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyK,
        //     () => {
        //         console.log("Ctrl + K pressed inside editor!");
        //         if (onRunQueryRef.current) {
        //             onRunQueryRef.current();
        //         }
        //     }
        // );

        editor.addCommand(
            monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
            () => {
                console.log("Ctrl + Enter pressed inside editor!");
                if (onRunQueryRef.current) {
                    onRunQueryRef.current();
                }
            }
        );

        editor.addCommand(
            monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS,
            () => {
                console.log("Ctrl + S pressed inside editor!");
                if (onSaveRef.current) {
                    onSaveRef.current();
                }
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
