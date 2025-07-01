"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWishlist = exports.removeFromWishlist = exports.addToWishlist = void 0;
const traveller_1 = __importDefault(require("../models/traveller"));
const addToWishlist = async (req, res) => {
    try {
        const { userId, propertyId } = req.body;
        const user = await traveller_1.default.findById(userId);
        if (!user) {
            res.status(404).json({ message: "user not found" });
            return;
        }
        if (user.wishlist.includes(propertyId)) {
            res.status(400).json({ message: "property already in woshlist" });
            return;
        }
        user.wishlist.push(propertyId);
        await user.save();
        res.status(200).json({ message: "property added to wishlist", wishlist: user.wishlist });
        return;
    }
    catch (err) {
        res.status(500).json({ message: "internal server error", error: err.message });
        return;
    }
};
exports.addToWishlist = addToWishlist;
const removeFromWishlist = async (req, res) => {
    try {
        const { userId, propertyId } = req.body;
        const user = await traveller_1.default.findById(userId);
        if (!user) {
            res.status(404).json({ message: "user not found" });
            return;
        }
        user.wishlist = user.wishlist.filter((id) => id.toString() !== propertyId);
        await user.save();
        res.status(200).json({ message: "property removed from wishlist", wishlist: user.wishlist });
        return;
    }
    catch (error) {
        res.status(500).json({ message: "internal server error", error: error.message });
        return;
    }
};
exports.removeFromWishlist = removeFromWishlist;
const getWishlist = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await traveller_1.default.findById(userId).populate("wishlist");
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({ wishlist: user.wishlist });
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
        return;
    }
};
exports.getWishlist = getWishlist;
//# sourceMappingURL=wishlistController.js.map