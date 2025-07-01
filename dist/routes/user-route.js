"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const google_auth_library_1 = require("google-auth-library");
const traveller_1 = __importDefault(require("../models/traveller"));
const UserController_1 = require("../controllers/UserController");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post('/login', UserController_1.login);
router.post('/register', UserController_1.register);
router.post('/getUser', UserController_1.getUser);
router.post('/contact', UserController_1.sendEmail);
router.put('/updateProfilePic', UserController_1.updateProfilePic);
router.put('/update', UserController_1.updateProfile);
const client = new google_auth_library_1.OAuth2Client("360635271354-f7vr696f94nqqniijfrhqrmqpsvm2st2.apps.googleusercontent.com");
router.post('/verify-google-token', async (req, res) => {
    const { token } = req.body;
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: "360635271354-f7vr696f94nqqniijfrhqrmqpsvm2st2.apps.googleusercontent.com",
        });
        const payload = ticket.getPayload();
        const googleId = payload?.sub;
        const email = payload?.email;
        const name = payload?.name;
        const profilePicture = payload?.picture;
        let user = await traveller_1.default.findOne({ googleId });
        if (!user) {
            user = new traveller_1.default({
                name,
                email,
                googleId,
                profilePicture,
                isVerified: true,
            });
            await user.save();
        }
        res.json({ message: 'Token verified', userId: user._id });
    }
    catch (error) {
        console.error('Token verification failed:', error);
        console.error('Error Details:', error.message, error.stack, JSON.stringify(error));
        res.status(401).json({ message: 'Token verification failed' });
    }
});
exports.default = router;
//# sourceMappingURL=user-route.js.map