import mongoose from "mongoose";
import moongoose from "moongoose";

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
    role : {
        type : String,
        required : true,
        default : 'job-seeker',
    }
})

const User = moongoose.model.users || mongoose.model('users', userSchema);
export default User;