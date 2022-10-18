import mongoose from "mongoose";
import PostModel from "../models/Post.js";
import CommentModel from "../models/Comment.js";

export const getAllPost = async(req, res)=>{
    try{
        const posts = await PostModel.find({}).sort('-createdAt');
        res.status(200).json({posts })

    }catch(err){
        res.status(500).json({message:err})
    }
}

export const getNumberOfPosts = async(req, res)=>{
    try{
        const numberOfPost = await PostModel.count({});
        res.status(200).json({numberOfPost })

    }catch(err){
        res.status(500).json({message:err})
    }
}

export const getAllPostByUser = async(req, res)=>{

    const userId = req.body.userId;

    try{
        const post = await PostModel.findOne({userId});  
        res.status(200).json({post})

    }catch(err){
        res.status(500).json({message:err})
    }
}

export const getPostById = async(req, res) =>{
    const postId = req.params.id;

    try{
        if(!mongoose.Types.ObjectId.isValid(postId)) return res.status(404).json({message: 'Une erreur est survenue, aucun post ne correspond à l\'id indiqué'});
        const post = await PostModel.findOne({_id: postId});

        const postComments = await CommentModel.find({postId}).sort('-createdAt')
        
        res.status(200).json({post, postComments})

    }catch(err){
        res.status(500).json({message:err})
    }
}
export const createPost = async(req, res)=>{
    const userId = req.body.userId
    try{
        if(!mongoose.Types.ObjectId.isValid(userId)) return res.status(200).json({message: 'Une erreur est survenue, aucun profil utilisateur correspondant en base de donnée'});

        const post = await PostModel.create(req.body);
        res.status(200).json({post})

    }catch(err){
        res.status(500).json({message:err})
    }
}

export const updatePost = async(req, res)=>{
    console.log(req.params)
    console.log(req.body);
    try{
        const _id = req.params.id;

        if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(200).json({message: 'Une erreur est survenue, aucun post ne correspond à l\'id indiqué'});

        const {userId, name,street, postalCode,city,trash_quantity_total, trash_quantity_collected,trash_picture } = req.body;
         // vérifier que les champs sont vides ? 

        const post = await PostModel.findByIdAndUpdate(
            {_id},
            req.body,
            {new:true, runValidators:true}
        )
        res.status(200).json({post})
    }catch(err){
        res.status(500).json({message:err})
    }
}

export const deletePost = async(req, res)=>{
    try{
        const _id = req.params.id;
        if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(200).json({message: 'Une erreur est survenue, aucun post ne correspond à l\'id indiqué'});

        await PostModel.findByIdAndDelete(_id);

        //supprimer les commentaires associés
        await CommentModel.deleteMany({postId:_id});

        res.json({message: 'Le post et les commentaires associés ont bien été supprimé'})

    }catch(err){
        res.status(500).json({message:err})
    }
}