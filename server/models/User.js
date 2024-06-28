import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    displayName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
    mobileNumber: {
        type: String,
        unique: true,
    },
    gender: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        default: "user"
    },
    dateOfBirth: {
        type: Date,
    },
    location: {
        type: String,
    }
}, 
{timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;
