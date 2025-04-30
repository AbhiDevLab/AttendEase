import mongoose from 'mongoose';

const AttendanceSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    courseId: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['present', 'absent', 'late'],
        default: 'present',
    },
    qrToken: {
        type: String,
        required: true,
    },
    deviceInfo: {
        type: Object,
    },
    location: {
        type: {
            latitude: Number,
            longitude: Number,
        },
    },
});

export default mongoose.models.Attendance || mongoose.model('Attendance', AttendanceSchema);