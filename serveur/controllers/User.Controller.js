import mongoose from "mongoose";
import UserModel from '../models/User.js';
import BadgeModel from '../models/Badge.js';
import PostModel from '../models/Post.js';
import CommentModel from '../models/Comment.js';

export const register = async(req, res) =>{
    console.log(req.body)
    const {email ,password, confirmPassword} = req.body;

    try{
        const existingUser = await UserModel.findOne({email});
        if(existingUser) return res.status(400).json({ message : "Un compte est déjà associé à l'adresse mail renseignée"}); 

        if(password !== confirmPassword) return res.status(400).json({ message : "Le mot de passe et la confirmation de mot de passe ne sont pas identiques."}); 

        const user = await UserModel.create({...req.body});

        const token = user.addJWT();

        console.log(user)
        res.status(200).json({user, token})

    }catch(err){
        console.log(err)
        res.status(500).json({message: 'Une erreur est survenue, nous n\'avons pas pu créer un compte utilisateur'})
    }
}

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
                lastname: user.lastname
            }
            const userId = user._id
            res.status(200).json({userInfo, userId, token})
        }

    }catch(err){
        console.log(err) 
        res.status(500).json({message: 'Une erreur est survenue, nous n\'avons pas pu vous connecter'})
    }
}

export const logout = async(req, res) =>{
    console.log('logout server controller ')
    try{
        res.cookie('jwt', '', { maxAge: 1 });
        res.status(200).json({message: "L'utilisateur a bien été déconnecté."})
    }catch(err){
        res.status(500).json({message: 'Une erreur est survenue, nous n\'avons pas pu vous déconnecter'})
    }
}

/**
 * Méthode pour récupérer les infos du user
 * id du user récupérer par le middleware
 */
export const getUserInfos = async(req, res) =>{
    // console.log('getUserInfos req => ',req)
    // console.log('getUserInfos req => ')
    if(!req.userId) return res.status(200).json({message: 'Accès refusé, utilisateur non authentifié.'});

    let _id = req.userId
    // const _id = req.params.id;
    let user = null;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({message: 'Une erreur est survenue, aucun profil utilisateur correspondant en base de donnée'});

    try{
        const postQuantityTrashCollected = await PostModel.aggregate([
            {$match: {userId: mongoose.Types.ObjectId(_id)}},
            {
                $group: {
                    _id:null,
                    trash_quantity_collected: { $sum: "$trash_quantity_collected" },
                    nb: { $sum: 1 }
                }
            }
        ])

        const commentQuantityTrashCollected = await CommentModel.aggregate([
            {$match: {userId: mongoose.Types.ObjectId(_id)}},
            {
                $group: {
                    _id:null,
                    trash_quantity_collected: { $sum: '$trash_quantity_collected' },
                    nb: { $sum: 1 }
                }
            }
        ])
        const userInfos = {
            quantityTrashCollected: 0,
            actionsNumber: 0,
        }
        let postQuantity = 0;
        let postActions = 0;
        let commentQuantity =0;
        let commentActions = 0;
        if(postQuantityTrashCollected.length> 0){
            postQuantity = postQuantityTrashCollected[0].trash_quantity_collected;
            postActions = postQuantityTrashCollected[0].nb
        }
        if(commentQuantityTrashCollected.length> 0){
            commentQuantity = commentQuantityTrashCollected[0].trash_quantity_collected;
            commentActions = commentQuantityTrashCollected[0].nb
        }
        userInfos.quantityTrashCollected = postQuantity + commentQuantity;
        userInfos.actionsNumber = postActions + commentActions;

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
        // console.log('ligne 142',userInfos)
        res.status(200).json({userInfos})
         
    }catch(err){
        res.status(400).json({message:err.message})
    }
}

export const getBadgeCategory = async(req, res) =>{
    if(!req.userId) return res.status(200).json({message: 'Accès refusé, utilisateur non authentifié.'});

    let _id = req.userId
    console.log(_id)
    // const _id = req.params.id;
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