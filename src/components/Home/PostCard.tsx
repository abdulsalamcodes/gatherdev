import { IUser } from "@/stores/AuthStore";
import { IPost } from "@/types/post";
import React from "react";
import { AiOutlineHeart, AiOutlineComment, AiOutlineBook } from "react-icons/ai";

const PostCard = ({ post }: { post: IPost }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-5">
      {/* Author Details */}
      <div className="flex items-center mb-2">
        <img
          src={
            post.author?.profilePicture ||
            "https://randomuser.me/api/portraits/men/1.jpg"
          }
          alt="Author"
          className="w-8 h-8 rounded-full mr-2"
        />
        <div>
          <span className="text-gray-500 dark:text-gray-300 text-sm font-semibold">
            {post.author?.username}
          </span>
          <p className="text-gray-500 dark:text-gray-300 text-sm">
            {post.author?.title}
          </p>
        </div>
      </div>

      {/* Text-based Content */}
      <p className="text-gray-800 dark:text-white mb-4">{post.content}</p>

      {/* Code Section */}
      <pre className="bg-gray-900 text-white p-4 rounded-lg mb-4">
        <code>{post?.code}</code>
      </pre>

      {/* Topic Tag */}
      {post?.topicTag && (
        <div className="bg-accent-primary text-white py-1 px-3 rounded-lg mb-4">
          #{post?.topicTag}
        </div>
      )}

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
