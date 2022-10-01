import UserModel from '../models/User.js';

export const register = async(req, res) =>{
    // console.log(req.body)
    const {email} = req.body.email;

    try{
        const existingUser = await UserModel.findOne({email});
        if(existingUser) return res.status(400).json({ message : "Un compte est déjà associé à l'adresse mail renseignée"}); 
        const user = await UserModel.create({...req.body});
        res.status(200).json({user:user})

    }catch(err){
        console.log(err)
        res.status(401).json({message: err})
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

            const addToken = user.addJWT();
            res.status(200).json({user, addToken})
        }

    }catch(err){
        console.log(err) 
        res.status(500).json({message: 'Une erreur est survenue, nous n\'avons pas pu vous connecter'})
    }
}

export const logout = async(req, res) =>{
    try{
        res.cookie('jwt', '', { maxAge: 1 });
        res.redirect('/');
    }catch(err){
        res.status(500).json({message: 'Une erreur est survenue, nous n\'avons pas pu vous déconnecter'})
    }
}