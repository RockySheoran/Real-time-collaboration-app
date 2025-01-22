import mongoose from "mongoose"


const codeSchema =  mongoose.Schema ({
    roomId:{
        type:String,
        required:true,
    },
    code:{
        type:String
    }

})

 export const codeModel = mongoose.model("code",codeSchema)