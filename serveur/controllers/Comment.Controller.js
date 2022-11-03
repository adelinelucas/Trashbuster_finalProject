import mongoose from "mongoose";
import CommentModel from "../models/Comment.js";
import PostModel from "../models/Post.js";
import UserModel from "../models/User.js";
import QuantityCollectedByPostModel from "../models/QuantityCollectedByPost.js"
import PictureModel from "../models/Picture.js";

/**
 * Méthode créer un commentaire
 */
export const createComment = async(req,res) =>{

    // vérification que l'utilisateur est bien identifié
    if(!req.userId) return res.status(200).json({message: 'Accès refusé, utilisateur non authentifié.'});

    try{
        const {postId, title, content, trash_quantity_collected, trash_picture} = req.body
        const userId =req.userId;

        /// je récupère le pseudo de l'auteur du commentaire
        const author = await UserModel.findOne({_id:mongoose.Types.ObjectId(userId)}, 'pseudo');

        const comment = await CommentModel.create({postId, title, content, trash_quantity_collected, userId:mongoose.Types.ObjectId(userId), author: author.pseudo});

        /// j'ajout à la collecte QuantityCollectedByPostModel la quantité collectée indiquée dans le commentaire '
        const add_trash_quantity_collected = await QuantityCollectedByPostModel.create({postId, trash_quantity_collected, commentId: comment._id, userId });
        
        const commentId = comment._id

        // j'ajoute la photo du commentaire dans la collection Picture
        const picture = await PictureModel.create({postId,trash_picture, commentId:mongoose.Types.ObjectId(commentId) });

        res.status(200).json({comment})

    }catch(err){
        res.status(400).json({message:err})
    }
}

/**
 * Méthode récupérer la photo correspondant à un commentaire
 */
export const getCommentPicture = async(req, res) =>{
    const _id = req.params.id;
    try{
        let picture ;
        const commentPicture = await PictureModel.findOne({commentId:_id});
        res.json({picture})

    }catch(err){
        res.status(400).json({message:err.message})
    }
}

/**
 * Méthode mettre à jour un commentaire
 * methode non finalisé ajoutée en case de demande de feature du client
 */
export const updateComment = async(req,res) =>{
    if(!req.userId) return res.status(200).json({message: 'Accès refusé, utilisateur non authentifié.'});

    // console.log(req.params.id)
    try{
        const _id = req.params.id;

        // if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({message: 'Une erreur est survenue, aucun commentaire correspondant en base de données'})

        const comment = await CommentModel.findByIdAndUpdate(
            {_id},
            req.body,
            {new:true, runValidators:true}
        )

        const trash_quantity_collected = req.body;
        // je mets à jours le post de l'id concerné et je 
        const updatePost = await QuantityCollectedByPostModel.findOneAndUpdate(
            {commentId: _id},
            trash_quantity_collected,
            {new:true, runValidators:true}
        )

        res.status(200).json({comment})
    }catch(err){
        res.status(400).json({message:err})
    }
}

/**
 * Méthode supprimer un commentaire
 */
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