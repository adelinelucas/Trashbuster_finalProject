import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
 

const auth = async(req, res, next) =>{
    // console.log(req.headers.authorization)
    try{
        const token = req.headers.authorization.split(' ')[1];
        let decodedData;
        // console.log('my token', token)
        // console.log('étape token')
        console.log(jwt.verify(token, process.env.JWT_SECRET))
        decodedData = jwt.verify(token, process.env.JWT_SECRET)
        // console.log('étape decodedData')
        req.userId = decodedData.userId;
        
        // console.log('étape req.userId')

        next();
    }catch(err){
        res.status(400).json({message: 'Une erreur est survenue, nous n\'avons pas pu vous authentifier'})
    }
}

export default auth;