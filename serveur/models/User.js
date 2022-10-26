import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        minlength: 2,
        maxlength:20,
    },  
    lastname:{
        type:String,
        required:[true, 'Merci de renseigner un nom d\'utilisateur'],
        minlength: 2,
        maxlength:20,
    },
    pseudo:{
        type:String,
        required:[true, 'Merci de renseigner un pseudo'],
        minlength: 2,
        maxlength:15,
    },
    email:{
        type:String,
        unique:true,
        required:[true, 'Merci de renseigner un email'],
        minlength: 2,
        maxlength:20,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 
            'Merci de renseigner un mail valide'
        ],
    },
    password:{
        type: String,
        required:[true, 'Merci de renseigner un mot de passe comprenant au moins 8 caractères '],
        minlength: 4,
    },
    profilPicture:{
        type: String,
        required:[true, 'Merci de choisir une photo de profil '],
    },
    userType:{
        type:String,
        default: 'particulier',
    },
    role:{
        type:[mongoose.Types.ObjectId],
        ref: 'Role',
        default: '6338756521c86af46390b516',
    },
    badge: {
        type:[mongoose.Types.ObjectId],
        ref:'Badge',
        default:'633875c121c86af46390b518'
    },
    trash_quantity_collected:{
        type: [Number]
    }
},
{timestamps: true})

UserSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.checkPassword = function(loginPassword) {
    return bcrypt.compare(loginPassword, this.password)
}

UserSchema.methods.addJWT = function(){
    let token = jwt.sign({userId: this._id, pseudo: this.pseudo}, process.env.JWT_SECRET, {expiresIn:process.env.JWT_LIFETIME})
    console.log('fonction add token ds models ', token)
    return token
}

const UserModel = mongoose.models['User'] || mongoose.model('User', UserSchema );
export default UserModel;