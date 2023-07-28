import React, { useCallback, useState } from "react";
import CButton from "../AtomicComponents/CButton";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { vscodeDarkInit } from "@uiw/codemirror-theme-vscode";

type Props = {
  onSubmit: (content: string, code: string) => void;
  isPosting: boolean;
};

const CreateNewPost = ({ onSubmit, isPosting }: Props) => {
  const [content, setContent] = useState("");
  const [code, setCode] = useState("");

  const handleSubmit = () => {
    if (content.trim() !== "") {
      onSubmit(content, code);
      setContent("");
      setCode("");
    }
  };

  const handleCodeChange = useCallback(
    (value: string, viewUpdate: any) => {
      setCode(value);
    },
    []
  );

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4">
      <div className="mb-4">
        <label htmlFor="code-editor" className="block text-gray-700 dark:text-white mb-2">
          Enter your code:
        </label>
        <CodeMirror
          id="code-editor"
          value={code}
          height="200px"
          extensions={[javascript({ jsx: true, typescript: true })]}
          theme={vscodeDarkInit({
            settings: {
              caret: "#c6c6c6",
              fontFamily: "monospace",
              gutterBorder: "5px solid",
              gutterBackground: "#1e1e1e",
            },
          })}
          onChange={handleCodeChange}
        />
      </div>

      {/* Textarea for Content */}
      <textarea
        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded mb-4 resize-none bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:border-accent-primary"
        placeholder="Join the coding conversation 🚀"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {/* Button */}
      <CButton
        onClick={handleSubmit}
        label="Post"
        isLoading={isPosting}
      />
    </div>
  );
};

export default CreateNewPost;
