import mongoose from "mongoose";
import CommentModel from "../models/Comment.js";
import PostModel from "../models/Post.js";
import UserModel from "../models/User.js";
import QuantityCollectedByPostModel from "../models/QuantityCollectedByPost.js"

export const createComment = async(req,res) =>{
    console.log('create comment ligne 7')
    if(!req.userId) return res.status(200).json({message: 'Accès refusé, utilisateur non authentifié.'});

    try{
        const {postId, title, content, trash_quantity_collected} = req.body
        const userId =req.userId;

        const author = await UserModel.findOne({_id:mongoose.Types.ObjectId(userId)}, 'pseudo');

        const comment = await CommentModel.create({postId, title, content, trash_quantity_collected, userId:mongoose.Types.ObjectId(userId), author: author.pseudo});

        const add_trash_quantity_collected = await QuantityCollectedByPostModel.create({postId, trash_quantity_collected, commentId: comment._id});

        res.status(200).json({comment})

    }catch(err){
        res.status(500).json({message:err})
    }
}

export const updateComment = async(req,res) =>{
    if(!req.userId) return res.status(200).json({message: 'Accès refusé, utilisateur non authentifié.'});

    console.log(req.params.id)
    try{
        const _id = req.params.id;

        // if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({message: 'Une erreur est survenue, aucun commentaire correspondant en base de données'})

        const comment = await CommentModel.findByIdAndUpdate(
            {_id},
            req.body,
            {new:true, runValidators:true}
        )

        console.log(comment)

        const trash_quantity_collected = req.body;
        console.log(trash_quantity_collected)
        // je mets à jours le post de l'id concerné et je 
        const updatePost = await QuantityCollectedByPostModel.findOneAndUpdate(
            {commentId: _id},
            trash_quantity_collected,
            {new:true, runValidators:true}
        )

        console.log(updatePost)

        res.status(200).json({comment})
    }catch(err){
        res.status(400).json({message:err})
    }
}

export const deleteComment = async(req,res) =>{

    if(!req.userId) return res.status(200).json({message: 'Accès refusé, utilisateur non authentifié.'});

    try{
        const _id = req.params.id;
        const deletedComment = await CommentModel.findByIdAndDelete(_id)

        res.status(200).json({message:'Le commentaire a bien été supprimé'});

    }catch(err){
        res.status(400).json({message:err})
    }   
}