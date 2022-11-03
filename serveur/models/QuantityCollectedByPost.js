import mongoose from "mongoose";

const QuantityCollectedByPostSchema = new mongoose.Schema({
    trash_quantity_collected: {
        type:Number,
    },
    postId :{
        type:mongoose.Types.ObjectId,
        ref:'Post',
    },
    commentId :{
        type:mongoose.Types.ObjectId,
        ref:'Comment',
    },
    userId : {
        type:mongoose.Types.ObjectId,
        ref:'User',
        required: true
    }
})

const QuantityCollectedByPostModel = mongoose.models['QuantityCollectedByPost'] || mongoose.model('QuantityCollectedByPost', QuantityCollectedByPostSchema );
export default QuantityCollectedByPostModel;