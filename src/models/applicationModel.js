import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    jobID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'jobs', // Reference to the Job model
        required: true,
    },
    seekerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', // Reference to the User model
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: 'Pending',
    }
});

const Application = mongoose.models.applications || mongoose.model('applications', applicationSchema);
export default Application;
