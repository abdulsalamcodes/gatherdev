import React, { useCallback, useState } from "react";
import CButton from "../AtomicComponents/CButton";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { vscodeDarkInit } from "@uiw/codemirror-theme-vscode";

type Props = {
  onSubmit: (
    content: string,
    code: string,
    language: string,
    topicTag: string
  ) => void;
  isPosting: boolean;
};

const CreateNewPost = ({ onSubmit, isPosting }: Props) => {
  const [content, setContent] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [topicTag, setTopicTag] = useState<string>("");
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = () => {
    if (content.trim() !== "") {
      onSubmit(content, code, language, topicTag);
      setContent("");
      setCode("");
      setLanguage("javascript");
      setTopicTag("");
    }
    setShowModal(false)
  };

  const handleCodeChange = useCallback((value: string, viewUpdate: any) => {
    setCode(value);
  }, []);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTopicTag(e.target.value);
    e.target.value = ""; // Clear the input field after adding the tag
  };

  return (
    <div className="shadow-md mb-4">
      {/* Button-like UI to open the modal */}
      <div
        className="cursor-pointer text-white rounded-full text-center bg-blue-500 hover:bg-blue-600 px-6 py-3 shadow-md transition-all duration-200 ease-in-out mb-4"
        onClick={() => setShowModal(true)}
      >
        Create New Post
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="   bg-gray-800 w-full sm:w-1/3 p-8 rounded-lg shadow-md">
            {/* Input for Language */}
            <div className="mb-4">
              <label
                htmlFor="language"
                className="block text-gray-700  text-white mb-2"
              >
                Language:
              </label>
              <select
                id="language"
                className="w-full p-2 border border-gray-300  border-gray-600 rounded mb-2    bg-gray-800 text-gray-800  text-white focus:outline-none focus:border-accent-primary"
                value={language}
                onChange={handleLanguageChange}
              >
                <option value="javascript">JavaScript</option>
                <option value="typescript">TypeScript</option>
                <option value="python">Python</option>
                {/* Add more options for other languages */}
              </select>
            </div>

            {/* Input for Tags */}
            <div className="mb-4">
              <label
                htmlFor="tag"
                className="block text-gray-700  text-white mb-2"
              >
                Tag:
              </label>
              <input
                type="text"
                id="tag"
                value={topicTag}
                className="w-full p-2 border border-gray-300  border-gray-600 rounded mb-2    bg-gray-800 text-gray-800  text-white focus:outline-none focus:border-accent-primary"
                placeholder="Add tag (e.g., react, next.js, motivation, etc.)"
                onChange={handleTagsChange}
              />
            </div>

            {/* Code Editor */}
            <div className="mb-4">
              <label
                htmlFor="code-editor"
                className="block text-gray-700  text-white mb-2"
              >
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
              className="w-full p-2 border border-gray-300  border-gray-600 rounded mb-4 resize-none    bg-gray-800 text-gray-800  text-white focus:outline-none focus:border-accent-primary"
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
        </div>
      )}
    </div>
  );
};

export default CreateNewPost;
