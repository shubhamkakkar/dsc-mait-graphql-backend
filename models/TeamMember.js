
import { Schema, model } from "mongoose";

const TeamMember = new Schema({
    name: {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    linkedin : {
        type: String,
        required: true
    },
    github : {
        type: String,
        required: true
    },
    bio : {
        type: String,
        required: true
    },
}, { collection: "TeamMember" });

export default model('TeamMember', TeamMember);
