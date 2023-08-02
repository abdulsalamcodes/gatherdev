import { IUser } from "@/stores/AuthStore";
import { IPost } from "@/types/post";
import Link from "next/link";
import React from "react";
import {
  AiOutlineHeart,
  AiOutlineComment,
  AiOutlineBook,
} from "react-icons/ai";

const PostCard = ({ post, user }: { post: IPost; user?: IUser }) => {
  return (
    <div className="   bg-gray-800 p-4 rounded-lg shadow-md mb-5">
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
          <Link
            href={`/profile/${post.author?.username}`}
            className="text-gray-500  text-gray-300 text-sm font-semibold"
          >
            {user?.username}
          </Link>
          <p className="text-gray-500  text-gray-300 text-sm">
            {user?.title}
          </p>
        </div>
      </div>

      {/* Text-based Content */}
      <p className="text-gray-800  text-white mb-4">{post.content}</p>

      {/* Code Section */}
      <div className="overflow-auto bg-gray-900 text-white rounded-lg mb-4">
        <pre className="p-4">{post?.code}</pre>
      </div>

      <div className="mb-4 flex items-center gap-2">
        {/* Topic Tag */}
        {post?.language && (
          <div className="bg-accent-primary text-white rounded-lg">
            #{post?.language}
          </div>
        )}
        {/* Topic Tag */}
        {post?.topicTag && (
          <div className="bg-accent-primary text-white rounded-lg">
            #{post?.topicTag}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <button className="text-gray-500  text-gray-300 flex items-center space-x-2">
          <AiOutlineHeart className="h-5 w-5" />
          <span>Like</span>
        </button>
        <button className="text-gray-500  text-gray-300 flex items-center space-x-2">
          <AiOutlineComment className="h-5 w-5" />
          <span>Comment</span>
        </button>
        <button className="text-gray-500  text-gray-300 flex items-center space-x-2">
          <AiOutlineBook className="h-5 w-5" />
          <span>Bookmark</span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;
