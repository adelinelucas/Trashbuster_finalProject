import mongoose from "mongoose";
import UserModel from '../models/User.js';
import BadgeModel from '../models/Badge.js';
import PostModel from '../models/Post.js';
import CommentModel from '../models/Comment.js';
import QuantityCollectedByPostModel from "../models/QuantityCollectedByPost.js";

/**
 * Méthode register pour créer un nouvel utilisateur
 */
export const register = async(req, res) =>{
    const {email ,password, confirmPassword} = req.body;

    try{
        const existingUser = await UserModel.findOne({email});
        if(existingUser) return res.status(400).json({ message : "Un compte est déjà associé à l'adresse mail renseignée"}); 

        if(password !== confirmPassword) return res.status(400).json({ message : "Le mot de passe et la confirmation de mot de passe ne sont pas identiques."}); 

        const user = await UserModel.create({...req.body});

        const token = user.addJWT();

        res.status(200).json({user, token})

    }catch(err){
        res.status(500).json({message: 'Une erreur est survenue, nous n\'avons pas pu créer un compte utilisateur'})
    }
}

/**
 * Méthode register pour connecter un utilisateur
 */
export const login = async(req, res) =>{
    const {email, password} = req.body;
    try{
        if(email && password){
            const user = await UserModel.findOne({email})
            if(!user) return res.status(404).json({ message : "Les informations renseignées n'ont pas permis de vous identifier"});

            const isPasswordCorrect = await user.checkPassword(password)
            if(!isPasswordCorrect) return res.status(404).json({ message : "Les informations renseignées n'ont pas permis de vous identifier"});
           
            const token = user.addJWT();
            const userInfo = {
                pseudo: user.pseudo,
                email: user.email,
                name: user.name,
                lastname: user.lastname,
                userType: user.userType
            }
            const userId = user._id
            res.status(200).json({userInfo, userId, token})
        }

    }catch(err){
        res.status(500).json({message: 'Une erreur est survenue, nous n\'avons pas pu vous connecter'})
    }
}

/**
 * Méthode pour déconnecter l'utilisateur
 */
export const logout = async(req, res) =>{
    try{
        res.cookie('jwt', '', { maxAge: 1 });
        res.status(200).json({message: "L'utilisateur a bien été déconnecté."})
    }catch(err){
        res.status(500).json({message: 'Une erreur est survenue, nous n\'avons pas pu vous déconnecter'})
    }
}

/**
 * Méthode pour récupérer les infos du user
 * L'id du user récupéré par le middleware
 */
export const getUserInfos = async(req, res) =>{

    if(!req.userId) return res.status(200).json({message: 'Accès refusé, utilisateur non authentifié.'});

    let _id = req.userId
    let user = null;
    // vérification sur l'_id est valid
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({message: 'Une erreur est survenue, aucun profil utilisateur correspondant en base de donnée'});

    try{
        // récupération de la quantité de déchets collecté pour un post
        // recherche dans la table post model
        // const postQuantityTrashCollected = await PostModel.aggregate([
        //     {$match: {userId: mongoose.Types.ObjectId(_id)}},
        //     {
        //         $group: {
        //             _id:null,
        //             trash_quantity_collected: { $sum: "$trash_quantity_collected" },
        //             nb: { $sum: 1 }
        //         }
        //     }
        // ])

        // const commentQuantityTrashCollected = await CommentModel.aggregate([
        //     {$match: {userId: mongoose.Types.ObjectId(_id)}},
        //     {
        //         $group: {
        //             _id:null,
        //             trash_quantity_collected: { $sum: '$trash_quantity_collected' },
        //             nb: { $sum: 1 }
        //         }
        //     }
        // ])
        const userInfos = {
            quantityTrashCollected: 0,
            actionsNumber: 0,
        }
        //  récupération de la quantité de déchets collecté pour un user
        const quantityRequest = await QuantityCollectedByPostModel.aggregate([
            {$match: {userId: mongoose.Types.ObjectId(_id)}},
            {
                $group: {
                    _id:null,
                    trash_quantity_collected: { $sum: '$trash_quantity_collected' },
                    nb: { $sum: 1 }
                }
            }
        ])
        const quantity = quantityRequest[0].trash_quantity_collected;
        const number = quantityRequest[0].nb;
        userInfos.quantityTrashCollected = quantity;
        userInfos.actionsNumber = number;

        // mise à jour du badge utilisateur en fonction de la quantité de déchets total collectée (post + comments)
        if('220'<userInfos.quantityTrashCollected.toString() > '120'){
            const updateBadge = await BadgeModel.find({ level:{$eq:"master"} }, '_id' ).exec()
           let badge = (updateBadge[0]._id)
            user = await UserModel.findByIdAndUpdate(
                {_id}, 
                { badge : badge },
                {new: true})
            
        }else if (userInfos.quantityTrashCollected.toString() >= '220'){
            const updateBadge = await BadgeModel.find({ level:{$eq:"knight"} }, '_id' )
            let badge = updateBadge[0]._id;
            user = await UserModel.findByIdAndUpdate(
                {_id}, 
                { badge : badge },
                {new: true})
        }else{
            user = await UserModel.findOne({_id});
        }
        res.status(200).json({userInfos})
         
    }catch(err){
        res.status(400).json({message:err.message})
    }
}

/**
 * Méthode pour récupérer l'information concernant le badge du user
 */
export const getBadgeCategory = async(req, res) =>{
    if(!req.userId) return res.status(200).json({message: 'Accès refusé, utilisateur non authentifié.'});

    let _id = req.userId
    let user = null;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({message: 'Une erreur est survenue, aucun profil utilisateur correspondant en base de donnée'});

    try{
        const badgeUser = await UserModel.findOne({_id}, 'badge')
        const badgeLevel = await BadgeModel.findOne({_id: badgeUser.badge}, 'level' )
        res.status(200).json({badgeLevel})
    }catch(err){
        res.status(400).json({message:err.message})

    }
}