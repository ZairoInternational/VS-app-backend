"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const discountCouponControllers_1 = require("../controllers/discountCouponControllers");
const router = express_1.default.Router();
router.post('/create', discountCouponControllers_1.createCoupon);
router.get('/get-all', discountCouponControllers_1.getAllCoupons);
router.post('/apply', discountCouponControllers_1.applyCoupon);
router.post('/update-usage', discountCouponControllers_1.updateCouponUsage);
exports.default = router;
//# sourceMappingURL=discount-coupon-route.js.map