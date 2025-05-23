import mongoose from "mongoose";

const connectDb = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('mongodb connect');
    }
    catch(error){
        console.log("error occured",error);
    }
}
export default connectDb;