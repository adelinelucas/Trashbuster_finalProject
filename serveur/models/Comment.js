import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    userId :{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    author :{
        type:String,
        required:true
    },
    postId :{
        type:mongoose.Types.ObjectId,
        ref:'Post',
        required:true
    },
    title:{
        type:String,
        required:[true, 'Merci de renseigner un titre pour votre commentaire']
    },
    content:{
        type:String,
        required:[true, 'Un commentaire vide ne peut pas être posté']
    },
    trash_quantity_collected: {
        type:Number,
        required:[true, 'Merci de renseigner la quantité approximative de déchets déjà collectée et jetée']
    }
},
{timestamps: true})

const CommentModel = mongoose.models['Comment'] || mongoose.model('Comment', CommentSchema );
export default CommentModel;