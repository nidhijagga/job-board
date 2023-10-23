import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    providerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', // Reference to the User model
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    }
});

const Job = mongoose.models.jobs || mongoose.model('jobs', jobSchema);
export default Job;
