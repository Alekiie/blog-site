import * as commentService from "../services/commentService.js";

export const createNewComment = async (req, res) =>{
    try {
        const { postId, content } = req.body;
        const userId = req.user._id;
        const comment = await commentService.createComment({post:postId, author:userId, content});
        res.status(200).json({message:"Commented Successfully", comment});
    } catch (error) {
        res.status(500).json({message :error.message});
    }
};

export const getPostComment = async (req, res) => {
    try {
        const comment = await commentService.getCommentsByPost(req.params.postId);
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({message :error.message});
    }
};

export const deleteCommentById = async (req, res) => {
    try {
        const comment = await commentService.deleteComment(req.params.id, req.user.id);

        if (!comment) {
            return res.status(404).json({message:"Comment not found"});
        }
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({message :error.message});
    }
};