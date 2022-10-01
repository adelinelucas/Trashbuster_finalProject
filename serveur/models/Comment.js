import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    userId :{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    PostId :{
        type:mongoose.Types.ObjectId,
        ref:'Post',
        required:true
    },
    content:{
        type:String,
        required:[true, 'Un commentaire vide ne peut pas être posté']
    },
    trash_picture: {
        type:String,
        required:[true, 'Merci de poster une photo des déchets collectés pour faciliter l\'implication de la communauté et le suivi de ce point de collecte']
    }
})

const CommentModel = mongoose.models['Comment'] || mongoose.model('Comment', CommentSchema );
export default CommentModel;