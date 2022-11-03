import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
 
/**
 * Middleware pour vérifier le token JWT 
 * + vérification que le token correspond bien au token de l'utilisateur
 */
const auth = async(req, res, next) =>{
    try{
        const token = req.headers.authorization.split(' ')[1];
        let decodedData;
        decodedData = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decodedData.userId;
        
        next();
    }catch(err){
        res.status(400).json({message: 'Une erreur est survenue, nous n\'avons pas pu vous authentifier'})
    }
}

export default auth;