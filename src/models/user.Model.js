import { Schema,model } from "mongoose";

const userSchema = new Schema({
    username:{
        type:String,
        required:[true,"Please provide an username"],
        unique:true,
    },
    email:{
        type:String,
        required:[true,"Please provide an email "],
        unique:true,
    },
    password:{
        type:String,
        required:[true,"Please provide a password "],
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    isAdmin:{
        type:Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokanExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry : Date,
});


const User  = mongoose.models.users || model('user', userSchema);

export default User;