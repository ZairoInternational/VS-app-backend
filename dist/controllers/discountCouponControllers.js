"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCouponUsage = exports.applyCoupon = exports.getAllCoupons = exports.createCoupon = void 0;
const discountCoupon_1 = __importDefault(require("../models/discountCoupon"));
const createCoupon = async (req, res) => {
    const { code, discountType, discountValue, expiryDate, usageLimit, usedCount, minOrderValue } = req.body;
    try {
        const existingCoupon = await discountCoupon_1.default.findOne({ code: code.toUpperCase() });
        if (existingCoupon) {
            res.status(400).json({ message: "Coupon already exists" });
        }
        const newCoupon = new discountCoupon_1.default({
            code: code.toUpperCase(),
            discountType,
            discountValue,
            expiryDate,
            usageLimit,
            usedCount,
            minOrderValue
        });
        await newCoupon.save();
        res.status(201).json({ message: "Coupon created successfully", coupon: newCoupon });
    }
    catch (err) {
        res.status(500).json({ message: "Internal server error", error: err });
    }
};
exports.createCoupon = createCoupon;
const getAllCoupons = async (req, res) => {
    try {
        const coupons = await discountCoupon_1.default.find();
        res.status(200).json({ message: 'Coupons fetched successfully', coupons });
    }
    catch (err) {
        res.status(500).json({ message: 'Error fetching coupons', error: err });
    }
};
exports.getAllCoupons = getAllCoupons;
const applyCoupon = async (req, res) => {
    const { code, orderValue } = req.body;
    try {
        const coupon = await discountCoupon_1.default.findOne({ code: code.toUpperCase() });
        if (!coupon) {
            res.status(404).json({ message: 'Invalid coupon code' });
        }
        else if (coupon.expiryDate && coupon.expiryDate < new Date()) {
            res.status(400).json({ message: 'Coupon expired' });
        }
        else if (coupon.usedCount !== undefined && coupon.usedCount >= coupon.usageLimit) {
            res.status(400).json({ message: 'Coupon usage limit exceeded' });
        }
        else if (orderValue < coupon.minOrderValue) {
            res.status(400).json({
                message: `Minimum order value should be ₹${coupon.minOrderValue}`,
            });
        }
        else {
            let discountAmount = 0;
            if (coupon.discountType === 'percentage') {
                discountAmount = (orderValue * coupon.discountValue) / 100;
            }
            else {
                discountAmount = coupon.discountValue;
            }
            const finalAmount = orderValue - discountAmount;
            res.status(200).json({
                message: 'Coupon applied successfully',
                discountAmount,
                finalAmount,
            });
        }
    }
    catch (err) {
        res.status(500).json({ message: 'Error applying coupon', error: err });
    }
};
exports.applyCoupon = applyCoupon;
const updateCouponUsage = async (req, res) => {
    const { code } = req.body;
    try {
        const coupon = await discountCoupon_1.default.findOne({ code: code.toUpperCase() });
        if (!coupon) {
            res.status(404).json({ message: 'Invalid coupon code' });
        }
        else {
            if (coupon.usedCount !== undefined) {
                coupon.usedCount += 1;
                await coupon.save();
            }
            res.status(200).json({ message: 'Coupon usage updated successfully' });
        }
    }
    catch (err) {
        res.status(500).json({ message: 'Error updating usage', error: err });
    }
};
exports.updateCouponUsage = updateCouponUsage;
//# sourceMappingURL=discountCouponControllers.js.map