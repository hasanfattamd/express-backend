import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            minlength: 2,
            maxlenth: 50,
            require: [true, "Name is required"],
        },
        email: {
            type: String,
            trim: true,
            require: [true, "Email is required"],
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            require: [true, "Password is required"],
            minlength: 8,
            select: false,
            // We know
        },
        role: {
            type: String,
            enum: ["customer", "seller", "admin"],
            default: "customer",
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        verificationToken: {
            type: String,
            select: false,
        },
        refreshToken: {
            type: String,
            select: false,
        },
        resetPasswordToken: {
            type: String,
            select: false,
        },
        resetPasswordExpires: {
            type: Date,
            select: false,
        },
    },
    { timestamps: true },
);

export default mongoose.model("User", userSchema);
