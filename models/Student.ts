import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    courses: [{
        courseId: {
            type: String,
            required: true,
        },
        courseName: {
            type: String,
            required: true,
        },
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Student || mongoose.model('Student', StudentSchema);