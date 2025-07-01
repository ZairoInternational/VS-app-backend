"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.sendEmail = exports.updateProfilePic = exports.getUser = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const traveller_1 = __importDefault(require("@/models/traveller"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const register = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;
        const existingUser = await traveller_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const newUser = new traveller_1.default({
            name,
            email,
            phone,
            password: hashedPassword,
            isVerified: false,
        });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
        return;
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await traveller_1.default.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        res.status(200).json({ message: "Login successful", token, user });
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
        return;
    }
};
exports.login = login;
const getUser = async (req, res) => {
    try {
        const { userId } = req.body;
        const objectId = new mongoose_1.default.Types.ObjectId(userId);
        const user = await traveller_1.default.findById(objectId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({ user });
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
        return;
    }
};
exports.getUser = getUser;
const updateProfilePic = async (req, res) => {
    const { userId, profilePic } = req.body;
    if (!userId || !profilePic) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
    }
    try {
        const user = await traveller_1.default.findByIdAndUpdate(userId, { profilePic }, { new: true });
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.status(200).json({ message: 'Profile picture updated', user });
        return;
    }
    catch (err) {
        console.error('Update Error:', err);
        res.status(500).json({ error: 'Server error' });
        return;
    }
};
exports.updateProfilePic = updateProfilePic;
const sendEmail = async (req, res) => {
    const { name, email, message } = req.body;
    if (!email || !name || !message) {
        res.status(400).json({ error: "Missing fields required" });
        return;
    }
    try {
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });
        await transporter.sendMail({
            from: `"${name}" <${email}>`,
            to: `${process.env.EMAIL}`,
            subject: `New Contact Form Message from ${name}`,
            html: `
        <h3>Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
        });
        res.status(200).json({ success: true, message: "Email sent successfully" });
    }
    catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Failed to send email" });
    }
};
exports.sendEmail = sendEmail;
const updateProfile = async (req, res) => {
    const { userId, ...fieldsToUpdate } = req.body;
    try {
        const user = await traveller_1.default.findByIdAndUpdate(userId, fieldsToUpdate, { new: true });
        if (!user) {
            res.status(404).json({ message: "user not found" });
            return;
        }
        res.status(200).json({ message: "profile updated", user });
        return;
    }
    catch (error) {
    }
};
exports.updateProfile = updateProfile;
//# sourceMappingURL=UserController.js.map