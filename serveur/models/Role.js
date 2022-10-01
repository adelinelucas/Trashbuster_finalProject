import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema({
    access: {
        type:String,
        required:true
    }
})

const RoleModel = mongoose.models['Role'] || mongoose.model('Role', RoleSchema)
export default RoleModel;