import mongoose from "mongoose";
export const connectBD= (url) =>mongoose.connect(url,{
    useNewUrlParser: true, 
    useUnifiedTypology: true
})