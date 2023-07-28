import React from "react";
import { AiOutlineHeart, AiOutlineComment, AiOutlineBook } from "react-icons/ai";

type IPost = {
    author?: string;
    content?: string;
    code?: string;
}
const PostCard = ({ post }: { post: IPost}) => {
  // Dummy data for the post
//   const post = {
//     author: "John Doe",
//     content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     code: "function add(a, b) {\n  return a + b;\n}",
//   };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-5">
      {/* Author Details */}
      <div className="flex items-center mb-2">
        <img
          src="https://randomuser.me/api/portraits/men/1.jpg"
          alt="Author"
          className="w-8 h-8 rounded-full mr-2"
        />
        <span className="text-gray-500 dark:text-gray-300 text-sm">{post.author}</span>
      </div>

      {/* Text-based Content */}
      <p className="text-gray-800 dark:text-white mb-4">{post.content}</p>

      {/* Code Section */}
      <pre className="bg-gray-900 text-white p-4 rounded-lg mb-4">
        <code>{post.code}</code>
      </pre>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <button className="text-gray-500 dark:text-gray-300 flex items-center space-x-2">
          <AiOutlineHeart className="h-5 w-5" />
          <span>Like</span>
        </button>
        <button className="text-gray-500 dark:text-gray-300 flex items-center space-x-2">
          <AiOutlineComment className="h-5 w-5" />
          <span>Comment</span>
        </button>
        <button className="text-gray-500 dark:text-gray-300 flex items-center space-x-2">
          <AiOutlineBook className="h-5 w-5" />
          <span>Bookmark</span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;
