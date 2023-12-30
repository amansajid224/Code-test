import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
    fullName: string;
    email: string;
    password: string;
}

const UserSchema: Schema<IUser> = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
        minlength: [6, 'Password must be at least 6 characters'],
    },
});

export const User = mongoose.models.Users || mongoose.model<IUser>('Users', UserSchema);