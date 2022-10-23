import UserModel from '../models/User.js';

export const register = async(req, res) =>{
    console.log(req.body)
    const {email ,password, confirmPassword} = req.body;

    try{
        const existingUser = await UserModel.findOne({email});
        if(existingUser) return res.status(400).json({ message : "Un compte est déjà associé à l'adresse mail renseignée"}); 

        if(password !== confirmPassword) return res.status(400).json({ message : "Le mot de passe et la confirmation de mot de passe ne sont pas identiques."}); 

        const user = await UserModel.create({...req.body});

        const token = user.addJWT();

        console.log(user)
        res.status(200).json({user, token})

    }catch(err){
        console.log(err)
        res.status(500).json({message: 'Une erreur est survenue, nous n\'avons pas pu créer un compte utilisateur'})
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
            
            let quantityTrashCollected = 0;
            let actionsNumber = 0;
            if(user.trash_quantity_collected.length > 0){
                quantityTrashCollected = (user.trash_quantity_collected).reduce((a,b)=>a+b);
                actionsNumber = user.trash_quantity_collected.length
            }
           
            const token = user.addJWT();
            const userInfo = {
                pseudo: user.pseudo,
                name: user.name,
                lastname: user.lastname,
                email: user.email,
                userType: user.userType,
                quantityTrashCollected : quantityTrashCollected,
                actionsNumber:actionsNumber 
            }
            const userId = user._id
            res.status(200).json({userInfo, userId, token})
        }

    }catch(err){
        console.log(err) 
        res.status(500).json({message: 'Une erreur est survenue, nous n\'avons pas pu vous connecter'})
    }
}

export const logout = async(req, res) =>{
    console.log('logout server controller ')
    try{
        res.cookie('jwt', '', { maxAge: 1 });
        // res.redirect('/');
        res.status(200).json({message: "L'utilisateur a bien été déconnecté."})
    }catch(err){
        res.status(500).json({message: 'Une erreur est survenue, nous n\'avons pas pu vous déconnecter'})
    }
}