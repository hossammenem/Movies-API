import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type: String, required: [true, 'Enter Your Name']},
    email: {type: String, required: [true, 'Enter Your Email'], unique: true},
    password: {type: String, required: [true, 'Enter Your Password']},
    watchlist: [{ type: String }],
}, { timestamps: true });

const userModel = mongoose.model("User", userSchema);

export default userModel;