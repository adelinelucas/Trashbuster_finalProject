import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    userId :{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    name :{
        type:String,
        required:[true, 'Merci de donner un nom à l\'opération de collecte de déchets'],
        minlength:3,
        maxlength:150
    },
    street :{
        type:String,
        required:[true, 'Merci de renseigner la rue du lieu du point de déchets à collecter'],
        minlength:3,
        maxlength:20
    },
    postalCode: {
        type:Number,
        required:[true, 'Merci de renseigner le code postal du lieu du point de déchets à collecter']
    },
    city: {
        type:String,
        required:[true, 'Merci de renseigner le code postal du lieu du point de déchets à collecter']
    },
    trash_quantity_total: {
        type:Number,
        required:[true, 'Merci de renseigner la quantité approximative de déchets à collecter']
    },
    trash_quantity_collected: {
        type:[Number],
        required:[true, 'Merci de renseigner la quantité approximative de déchets déjà collectée et jetée']
    },
    trash_picture: {
        type:[String],
        required:[true, 'Merci de poster une photo des déchets à collecter pour faciliter l\'implication de la communauté']
    }
})

const PostModel = mongoose.models['Post'] || mongoose.model('Post', PostSchema );
export default PostModel;