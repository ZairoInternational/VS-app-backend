"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const wishlistController_1 = require("../controllers/wishlistController");
const router = express_1.default.Router();
router.post("/add", wishlistController_1.addToWishlist);
router.post("/remove", wishlistController_1.removeFromWishlist);
router.post("/get", wishlistController_1.getWishlist);
exports.default = router;
//# sourceMappingURL=wishlist-routes.js.map