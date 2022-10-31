import mongoose from "mongoose";
import PostModel from "../models/Post.js";
import CommentModel from "../models/Comment.js";
import UserModel from "../models/User.js";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import PictureModel from "../models/Picture.js";
import QuantityCollectedByPostModel from "../models/QuantityCollectedByPost.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const getAllPost = async(req, res)=>{
    try{
        const posts = await PostModel.find({}).sort('-createdAt');
        // const posts = await PostModel.aggregate([{ $sort : { createdAt : -1 } }], { "allowDiskUse" : true })
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

        const postComments = await CommentModel.find({postId})
        // const postComments = await CommentModel.find({postId}).sort('-createdAt')
        res.status(200).json({post, postComments})

    }catch(err){
        res.status(404).json({message:err.message})
    }
}
export const createPost = async(req, res)=>{    
    const {userId, trash_quantity_collected, trash_picture} = req.body
    const newPost = req.body;

    if(!req.userId) return res.status(200).json({message: 'Accès refusé, utilisateur non authentifié.'});

    let _id =req.userId
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({message: 'Une erreur est survenue, aucun profil utilisateur correspondant en base de donnée'});

    try{
        // let update_trash_quantity_collected = await UserModel.findByIdAndUpdate(
        //     {_id}, 
        //     { $push: { trash_quantity_collected : [ trash_quantity_collected] } }
        //     )

           const post = await PostModel.create({...newPost, userId: req.userId});
           console.log(post)
           
           const picture = await PictureModel.create({postId:post._id, trash_picture:trash_picture});
           const add_trash_quantity_collected = await QuantityCollectedByPostModel.create({postId:post._id, trash_quantity_collected});
           res.status(201).json({post, picture})

            // if(typeof req.files != undefined &&typeof req.files.trash_picture != undefined) {

            //     const file = req.files.trash_picture;
            //     const regex = /[^a-z0-9_]/i;
            //     let baseName = file.name.replace(regex,'_').replace('__','_');
            //     let uploadPath = `${__dirname}/../public/images/`;
            //     // let uploadPath = express.static(path.join(__dirname, "./public/images/"))
            //     file.mv(uploadPath+baseName,() => {
                    
            //         res.status(201).json({post})
            //     });

            // }
        
    }catch(err){
        res.status(400).json({message:err.message})
    }
}

export const updatePost = async(req, res)=>{
    // console.log(req.params)
    // console.log(req.body);
    const _id = req.params.id;

    if(!req.userId) return res.status(200).json({message: 'Accès refusé, utilisateur non authentifié.'});
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(400).json({message: 'Une erreur est survenue, aucun post ne correspond à l\'id indiqué'});

    try{
        // const {userId, name,street, postalCode,city,trash_quantity_total, trash_quantity_collected,trash_picture } = req.body;
         // vérifier que les champs sont vides ? 
        // 
        // const post = await PostModel.findByIdAndUpdate({_id},{...req.body, _id},{new:true, runValidators:true})
        const post = await PostModel.findByIdAndUpdate(
            {_id},
            req.body,
            {new:true, runValidators:true}
        )

        const trash_quantity_collected = await QuantityCollectedByPostModel.findOneAndUpdate(
            {postId: _id},
            {trash_quantity_collected: req.body.trash_quantity_collected}
        )
        res.status(200).json({post})
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

export const deletePost = async(req, res)=>{
    const _id = req.params.id;

    if(!req.userId) return res.status(200).json({message: 'Accès refusé, utilisateur non authentifié.'});

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(400).json({message: 'Une erreur est survenue, aucun post ne correspond à l\'id indiqué'});

    try{
        await PostModel.findByIdAndDelete(_id);

        //supprimer les photos associées
        await PictureModel.deleteOne({postId:_id});

        //supprimer les commentaires associés
        await CommentModel.deleteMany({postId:_id});  

        //supprimer les quantités collecté
        await QuantityCollectedByPostModel.deleteMany({postId:_id}); 

        res.json({message: 'Le post et les commentaires associés ont bien été supprimé'})

    }catch(err){
        res.status(500).json({message:err.message})
    }
}

export const getPicture = async(req, res) =>{
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
        // console.log('picture', picture)
        res.json({picture})

    }catch(err){
        res.status(500).json({message:err.message})
    }
}
    
export const getQuantityCollectedByUser = async( req, res) => {
    const _id = req.params.id;
    try{
        const quantityRequest = await QuantityCollectedByPostModel.aggregate([
            {$match: {postId: mongoose.Types.ObjectId(_id)}},
            {
                $group: {
                    _id:null,
                    trash_quantity_collected: { $sum: '$trash_quantity_collected' }
                }
            }
        ])
        const quantity = quantityRequest[0].trash_quantity_collected
        
        res.json({quantity})

    }catch(err){
        res.status(500).json({message:err.message})
    }
}