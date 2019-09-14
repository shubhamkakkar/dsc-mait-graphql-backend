
import { Schema, model } from "mongoose";

const TeamMember = new Schema({
    userId: {
        type: String,
        required: true
    },
    linkedin : {
        type: String,
        required: true
    },
    github : {
        type: String,
    },
    bio : {
        type: String,
        required: true
    },
}, { collection: "TeamMember" });

export default model('TeamMember', TeamMember);
