import React, { useCallback, useState } from "react";
import CButton from "../../AtomicComponents/CButton/CButton";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { vscodeDarkInit } from "@uiw/codemirror-theme-vscode";
import { AiOutlineClose } from "react-icons/ai";
import { PostStore } from "../../../stores/postStore";
import { AuthStore } from "../../../stores/AuthStore";
import styles from "./CreateNewPost.module.scss"; // Import styles from your module

type Props = {
  onSubmit: (
    content: string,
    code: string,
    language: string,
    topicTag: string
  ) => void;
  isPosting: boolean;
};

const CreateNewPost = () => {
  const [content, setContent] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [topicTag, setTopicTag] = useState<string>("");
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = () => {
    if (content.trim() !== "") {
      PostStore.createPost(AuthStore.currentUser?.id!, {
        content,
        code,
        language,
        id: "",
        topicTag: "",
        author: AuthStore.currentUser!,
      });
      setContent("");
      setCode("");
      setLanguage("javascript");
      setTopicTag("");
    }
    setShowModal(false);
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
    <div className={styles.postCard}>
      <div className={styles.createButton} onClick={() => setShowModal(true)}>
        Create New Post
      </div>

      {showModal && (
        <>
          <button
            className={styles.overlay}
            onClick={() => setShowModal(false)}
          />
          <div className={styles.modal}>
            <div className={styles.closeButton}>
              <AiOutlineClose color="white" size={30} />
            </div>
            <section className={styles.actions}>
              <div className={styles.languageSelect}>
                <label htmlFor="language">Language:</label>
                <select
                  id="language"
                  value={language}
                  onChange={handleLanguageChange}
                >
                  <option value="javascript">JavaScript</option>
                  <option value="typescript">TypeScript</option>
                  <option value="python">Python</option>
                </select>
              </div>
              <div className={styles.tagInput}>
                <label htmlFor="tag">Tag:</label>
                <input
                  type="text"
                  id="tag"
                  value={topicTag}
                  placeholder="Add tag (e.g., #react, #nextJs, #motivation, etc.)"
                  onChange={handleTagsChange}
                />
              </div>
            </section>
            <div className={styles.codeEditor}>
              <label htmlFor="code-editor">Enter your code:</label>
              <CodeMirror
                id="code-editor"
                value={code}
                height="100%"
                className={`${styles.CodeMirror} primaryCodeMirror`}
                extensions={[javascript({ jsx: true, typescript: true })]}
                theme={vscodeDarkInit({
                  settings: {
                    caret: "#c66c6",
                    fontFamily: "monospace",
                    gutterBorder: "5px solid",
                    gutterBackground: "hsla(221, 89%, 7%, 0.5)",

                    background: "#020d24",
                  },
                })}
                onChange={handleCodeChange}
              />
            </div>
            <textarea
              placeholder="Join the coding conversation 🚀"
              value={content}
              className={styles.textarea}
              onChange={(e) => setContent(e.target.value)}
            />
            <CButton
              onClick={handleSubmit}
              label="Post"
              isLoading={PostStore.posting}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CreateNewPost;
