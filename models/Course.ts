import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
    courseId: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    schedule: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Course || mongoose.model('Course', CourseSchema);