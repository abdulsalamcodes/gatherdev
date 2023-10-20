import { IUser } from "../../../stores/AuthStore";
import { IPost } from "../../../types/post";
import Link from "next/link";
import React from "react";
import {
  AiOutlineHeart,
  AiOutlineComment,
  AiOutlineBook,
} from "react-icons/ai";
import styles from "./PostCard.module.scss"; // Import styles from your module
import Image from "next/image";

const PostCard = ({ post, user }: { post: IPost; user?: IUser }) => {
  return (
    <div className={styles.postCard}>
      {/* Author Details */}
      <div className={styles.authorDetails}>
        <Image
          height={40}
          width={40}
          src={
            post.author?.profilePicture ||
            "https://randomuser.me/api/portraits/men/1.jpg"
          }
          alt="Author"
          className={styles.authorImage}
        />
        <div>
          <Link
            href={`/profile/${post.author?.username}`}
            className={styles.authorUsername}
          >
            {user?.fullname}
          </Link>
          <p className={styles.authorTitle}>{user?.username}</p>
        </div>
      </div>

      {/* Text-based Content */}
      <p className={styles.contentText}>{post.content}</p>

      {/* Code Section */}
      <div className={styles.codeSection}>
        <div className={styles.codeBlock}>
          <pre>{post?.code}</pre>
        </div>
      </div>

      {/* <div className={styles.topicTags}>
        {post?.topicTag && (
          <div className={styles.topicTag}>{post?.topicTag}</div>
        )}
      </div> */}

      {/* Action Buttons */}
      <div className={styles.actionButtons}>
        <button className={styles.actionButton}>
          <AiOutlineHeart className={styles.icon} />
          <span>{post.likes} Like</span>
        </button>
        <button className={styles.actionButton}>
          <AiOutlineComment className={styles.icon} />
          <span>Comment</span>
        </button>
        <button className={styles.actionButton}>
          <AiOutlineBook className={styles.icon} />
          <span>Bookmark</span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;
