import mongoose from "mongoose";
import PostModel from "../models/Post.js";
import CommentModel from "../models/Comment.js";
import UserModel from "../models/User.js";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import PictureModel from "../models/Picture.js";
import QuantityCollectedByPostModel from "../models/QuantityCollectedByPost.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Méthode pour récupérer tous les posts en bdd
 * pas d'authentification requise
 */
export const getAllPost = async(req, res)=>{
    try{
        const posts = await PostModel.find({}).sort('-createdAt');
        // const posts = await PostModel.aggregate([{ $sort : { createdAt : -1 } }], { "allowDiskUse" : true })
        res.status(200).json({posts })

    }catch(err){
        res.status(404).json({message:err.message})
    }
}

/**
 * Méthode pour compter tous en bdd 
 * pas d'authentification requise
 */
export const getNumberOfPosts = async(req, res)=>{
    try{
        const numberOfPost = await PostModel.count({});
        res.status(200).json({numberOfPost })

    }catch(err){
        res.status(404).json({message:err.message})
    }
}

/**
 * Méthode pour récupérer tous les posts d'un user 
 */
export const getAllPostByUser = async(req, res)=>{

    const userId = req.params.id;

    try{
        const posts = await PostModel.find({userId});  
        res.status(200).json({posts})

    }catch(err){
        res.status(404).json({message:err.message})
    }
}

/**
 * Méthode pour récupérer un post par Id + récupération des commentaires associés
 */
export const getPostById = async(req, res) =>{
    const postId = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(postId)) return res.status(404).json({message: 'Une erreur est survenue, aucun post ne correspond à l\'id indiqué'});

    try{
        const post = await PostModel.findOne({_id: postId});
        const postComments = await CommentModel.find({postId})

        const trash_quantity_collected_all_posts = await QuantityCollectedByPostModel.aggregate([
            {$match: {postId: mongoose.Types.ObjectId(postId)}},
            {
                $group: {
                    _id:null,
                    total: { $sum: '$trash_quantity_collected' }
                }
            }
        ])
        const total = trash_quantity_collected_all_posts[0].total
        res.status(200).json({post, postComments, total})

    }catch(err){
        res.status(404).json({message:err.message})
    }
}

/**
 * Méthode pour créer un post
 */
export const createPost = async(req, res)=>{    
    const {userId, trash_quantity_collected, trash_picture} = req.body
    const newPost = req.body;

    if(!req.userId) return res.status(200).json({message: 'Accès refusé, utilisateur non authentifié.'});

    let _id =req.userId
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({message: 'Une erreur est survenue, aucun profil utilisateur correspondant en base de donnée'});

    try{
        const post = await PostModel.create({...newPost, userId: req.userId});
        // ajout de la photo dans la collection Picture model
        const picture = await PictureModel.create({postId:post._id, trash_picture:trash_picture});
         // ajout de la quantité de déchets collectée dans la collection QuantityCollectedByPostModel
        const add_trash_quantity_collected = await QuantityCollectedByPostModel.create({postId:post._id, trash_quantity_collected, userId: req.userId});
        res.status(201).json({post, picture})
        
    }catch(err){
        res.status(400).json({message:err.message})
    }
}

/**
 * Méthode pour mettre à jour un post
 */
export const updatePost = async(req, res)=>{

    const _id = req.params.id;

    if(!req.userId) return res.status(200).json({message: 'Accès refusé, utilisateur non authentifié.'});
    // vérification de l'id du user est valide
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(400).json({message: 'Une erreur est survenue, aucun post ne correspond à l\'id indiqué'});

    try{
        const post = await PostModel.findByIdAndUpdate(
            {_id},
            req.body,
            {new:true, runValidators:true}
        )

        // update de la quantité collecté dans la collection QuantityCollectedByPostModel
        const trash_quantity_collected = await QuantityCollectedByPostModel.findOneAndUpdate(
            {postId: _id},
            {trash_quantity_collected: req.body.trash_quantity_collected}
        )
        res.status(200).json({post})
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

/**
 * Méthode pour supprimer un post
 */
export const deletePost = async(req, res)=>{
    const _id = req.params.id;

    if(!req.userId) return res.status(200).json({message: 'Accès refusé, utilisateur non authentifié.'});

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(400).json({message: 'Une erreur est survenue, aucun post ne correspond à l\'id indiqué'});

    try{
        await PostModel.findByIdAndDelete(_id);

        //supprimer les photos associées
        await PictureModel.deleteOne({postId:_id});

        //supprimer tous les commentaires associés
        await CommentModel.deleteMany({postId:_id});  

        //supprimer toutes les quantités collectées
        await QuantityCollectedByPostModel.deleteMany({postId:_id}); 

        res.json({message: 'Le post et les commentaires associés ont bien été supprimé'})

    }catch(err){
        res.status(400).json({message:err.message})
    }
}

/**
 * Méthode pour récupérer la photo d'un post
 */
export const getPostPicture = async(req, res) =>{
    const _id = req.params.id;
    try{
        let picture ;
        const postPicture = await PictureModel.findOne({postId:_id});
        if(!postPicture){
            const commentPicture = await PictureModel.findOne({commentId:_id});
            picture = commentPicture;
        }else{
            picture = postPicture;
        }
        res.json({picture})

    }catch(err){
        res.status(500).json({message:err.message})
    }
}