import mongoose from "mongoose";

const PictureSchema = new mongoose.Schema({
    trash_picture: {
        type:String,
        // required:[true, 'Merci de poster une photo des déchets collectés pour faciliter l\'implication de la communauté et le suivi de ce point de collecte']
    },
    postId :{
        type:mongoose.Types.ObjectId,
        ref:'Post',
        required:true
    },
    commentId :{
        type:mongoose.Types.ObjectId,
        ref:'Comment',
    }
})

const PictureModel = mongoose.models['Picture'] || mongoose.model('Picture', PictureSchema );
export default PictureModel;