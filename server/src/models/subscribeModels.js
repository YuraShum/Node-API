import mongoose from "mongoose";

const subscribeShema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },

})

const subscribeModel = mongoose.model('Subscribe', subscribeShema)
export default subscribeModel