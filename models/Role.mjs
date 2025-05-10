import mongoose from 'mongoose';
import Permission from './Permission.mjs';

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    permissions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Permission'
    }]
}, { timestamps: true });

const Role = mongoose.model('Role', roleSchema);
export default Role;