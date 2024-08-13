import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true, "Your email address is required"],
        unique: true,
        trim: true,
    },
    password:{
        type: String,
        required: [true, "Your password is required"],
    },
    username:{
        type: String,
        required: [true, "Your username is required"],
        unique: true,
        trim: true
    }
})


const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;