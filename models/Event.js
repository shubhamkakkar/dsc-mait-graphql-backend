import { Schema, model } from "mongoose";

const EventSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    registrationForm: {
        type: String,
        required: true
    },
}, { collection: "Event" });

export default model('Event', EventSchema);
