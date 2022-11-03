import mongoose from "mongoose";

const BadgeSchema = new mongoose.Schema({
    level:{
        type: String,
        minlength:2,
        maxlength:15
    }
})

const BadgeModel = mongoose.models['Badge'] || mongoose.model('Badge', BadgeSchema );
export default BadgeModel;