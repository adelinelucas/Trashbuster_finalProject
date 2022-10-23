import jwt from 'jsonwebtoken';

const auth = async(req, res, next) =>{
    next();
    return;
    try{
        const token = req.headers.authorization.split('')[1];
        let decodedData;

        if(!token){
            const redirectUser = "Vous n'êtez pas connecté pour accéder à cette page !"
            return res.render('/', {redirectUser})
        }

        decodedData = jwt.verify(token, process.env.JWT_SECRET)
        req.body.userId = decodeData.userId;
        console.log(decodedData);

        const userToken = tokenAuth.user
        
        next();
    }catch(err){
        res.status(400).json({message: 'Une erreur est survenue, nous n\'avons pas pu vous authentifier'})
    }
}

export default auth;