import mongoose from "mongoose";
import PostModel from "../models/Post.js";
import CommentModel from "../models/Comment.js";
import UserModel from "../models/User.js";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const getAllPost = async(req, res)=>{
    try{
        const posts = await PostModel.find({}).sort('-createdAt');
        res.status(200).json({posts })

    }catch(err){
        res.status(404).json({message:err.message})
    }
}

export const getNumberOfPosts = async(req, res)=>{
    try{
        const numberOfPost = await PostModel.count({});
        res.status(200).json({numberOfPost })

    }catch(err){
        res.status(404).json({message:err.message})
    }
}

export const getAllPostByUser = async(req, res)=>{

    const userId = req.params.id;

    try{
        const posts = await PostModel.find({userId});  
        res.status(200).json({posts})

    }catch(err){
        res.status(404).json({message:err.message})
    }
}

export const getPostById = async(req, res) =>{
    const postId = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(postId)) return res.status(404).json({message: 'Une erreur est survenue, aucun post ne correspond à l\'id indiqué'});

    try{
        const post = await PostModel.findOne({_id: postId});

        const postComments = await CommentModel.find({postId}).sort('-createdAt')
        
        res.status(200).json({post, postComments})

    }catch(err){
        res.status(404).json({message:err.message})
    }
}
export const createPost = async(req, res)=>{    
    const {userId, trash_quantity_collected} = req.body
    console.log('111',req.body);
    if(!mongoose.Types.ObjectId.isValid(userId)) return res.status(404).json({message: 'Une erreur est survenue, aucun profil utilisateur correspondant en base de donnée'});

    try{

        let update_trash_quantity_collected = await UserModel.findByIdAndUpdate(
            {_id: userId}, 
            { $push: { trash_quantity_collected : [ trash_quantity_collected] } }
            )
            console.log('aa',req.body);
            const post = await PostModel.create(req.body);
            if(typeof req.files != undefined &&typeof req.files.trash_picture != undefined) {
                // console.log(req.body);
                console.log('tt',req.body);
                const file = req.files.trash_picture;
                const regex = /[^a-z0-9_]/i;
                let baseName = file.name.replace(regex,'_').replace('__','_');
                let uploadPath = `${__dirname}/../public/images/`;

                file.mv(uploadPath+baseName,() => {

                    res.status(201).json({post})
                });

            }
        

    }catch(err){
        console.log('bbbbb',req.body);
        res.status(400).json({message:err.message})
    }
}

export const updatePost = async(req, res)=>{
    // console.log(req.params)
    // console.log(req.body);
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(400).json({message: 'Une erreur est survenue, aucun post ne correspond à l\'id indiqué'});

    try{
        const _id = req.params.id;

        const {userId, name,street, postalCode,city,trash_quantity_total, trash_quantity_collected,trash_picture } = req.body;
         // vérifier que les champs sont vides ? 
        // 
        // const post = await PostModel.findByIdAndUpdate({_id},{...req.body, _id},{new:true, runValidators:true})
        const post = await PostModel.findByIdAndUpdate(
            {_id},
            req.body,
            {new:true, runValidators:true}
        )
        res.status(200).json({post})
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

export const deletePost = async(req, res)=>{
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(400).json({message: 'Une erreur est survenue, aucun post ne correspond à l\'id indiqué'});

    try{
        const _id = req.params.id;

        await PostModel.findByIdAndDelete(_id);

        //supprimer les commentaires associés
        await CommentModel.deleteMany({postId:_id});

        res.json({message: 'Le post et les commentaires associés ont bien été supprimé'})

    }catch(err){
        res.status(500).json({message:err.message})
    }
}