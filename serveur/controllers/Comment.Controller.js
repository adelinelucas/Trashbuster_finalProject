import CommentModel from "../models/Comment.js";
import PostModel from "../models/Post.js";
import UserModel from "../models/User.js";

export const createComment = async(req,res) =>{
    if(!req.userId) return res.status(200).json({message: 'Accès refusé, utilisateur non authentifié.'});

    try{
        const comment = await CommentModel.create(req.body);
        res.status(200).json({comment})

    }catch(err){
        res.status(500).json({message:err})
    }
}

export const updateComment = async(req,res) =>{
    if(!req.userId) return res.status(200).json({message: 'Accès refusé, utilisateur non authentifié.'});

    console.log(req.params.id)
    try{
        console.log('test1')
        const _id = req.params.id;

        // if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({message: 'Une erreur est survenue, aucun commentaire correspondant en base de données'})

        const comment = await CommentModel.findByIdAndUpdate(
            {_id},
            req.body,
            {new:true, runValidators:true}
        )

        console.log(comment)
        // je récupère l'id du post lié au commentaire
        const postId = comment.postId
        const userId = comment.userId

        // if(!mongoose.Types.ObjectId.isValid(postId)) return res.status(404).json({message: 'Une erreur est survenue, aucun post n\'est lié à ce commentaire'})

        const trash_quantity_collected = req.body;
        console.log(trash_quantity_collected)
        // je mets à jours le post de l'id concerné et je 
        const updatePost = await PostModel.findByIdAndUpdate(
            {_id: postId},
            trash_quantity_collected,
            {new:true, runValidators:true}
        )

        const updateUser = await UserModel.findByIdAndUpdate(
            {_id: userId},
            trash_quantity_collected,
            {new:true, runValidators:true}
        )

        console.log(updatePost)
        console.log(updateUser)

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