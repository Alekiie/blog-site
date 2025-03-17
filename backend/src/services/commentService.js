import Comment from "../models/commentModel.js";
import Post from "../models/postModel.js";

export const createComment = async (commentData) => {
  const comment = new Comment({
    post: commentData.post,
    author: commentData.author,
    content: commentData.content,
  });
  const savedComment = await comment.save();

  await Post.findByIdAndUpdate(comment.post, {
    $push: { comments: savedComment._id },
  });

  return savedComment;
};

export const getCommentsByPost = async (postId) => {
  return await Comment.find({ post: postId }).populate("author", "username");
};

export const deleteComment = async (id) => {
  return await Comment.findByIdAndDelete(id);
};
