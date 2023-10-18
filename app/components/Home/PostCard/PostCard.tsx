import { IUser } from "../../../stores/AuthStore";
import { IPost } from "../../../types/post";
import Link from "next/link";
import React, { useState } from "react";
import {
  AiOutlineHeart,
  AiOutlineComment,
  AiOutlineBook,
} from "react-icons/ai";
import styles from "./PostCard.module.scss";
import Image from "next/image";
import clsx from "clsx";

const PostCard = ({ post, user }: { post: IPost; user?: IUser }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikePost = () => {
    setIsLiked(!isLiked);
    // get the post like count
    // increase the like count by 1
    // psuedo update of the count on UI.
    // update the post like count on the database.
  };
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
            {user?.username}
          </Link>
          <p className={styles.authorTitle}>{user?.title}</p>
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

      <div className={styles.topicTags}>
        {/* Topic Tag */}
        {post?.language && (
          <div className={styles.topicTag}>#{post?.language}</div>
        )}
        {/* Topic Tag */}
        {post?.topicTag && (
          <div className={styles.topicTag}>{post?.topicTag}</div>
        )}
      </div>

      {/* Action Buttons */}
      <div className={styles.actions}>
        <button
          className={clsx({
            [styles.actions__btn]: true,
            [styles.liked]: isLiked,
          })}
          onClick={handleLikePost}
        >
          <AiOutlineHeart className={styles.actions__icon} />
          <span className={styles.actions__text}> 10 Upvotes</span>
        </button>
        <button className={styles.actions__btn}>
          <AiOutlineComment className={styles.actions__icon} />
          <span className={styles.actions__text}>Comment</span>
        </button>
        <button className={styles.actions__btn}>
          <AiOutlineBook className={styles.actions__icon} />
          <span className={styles.actions__text}>Bookmark</span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;
