import mongoose  from "mongoose";

export const  db = async () =>{
    try {
        mongoose.connect(process.env.MONGO)
      console.log('database add')
        
    } catch (error) {
        console.log("database is not connect")
    }
}