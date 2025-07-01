"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bookings = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bookingsSchema = new mongoose_1.default.Schema({
    propertyId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Property",
        required: true,
    },
    ownerId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    travellerId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    guests: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    bookingStatus: {
        type: String,
        enum: ["confirmed", "pending", "cancelled"],
        default: "confirmed",
    },
}, { timestamps: true });
exports.Bookings = mongoose_1.default.models.Bookings || mongoose_1.default.model("Bookings", bookingsSchema);
//# sourceMappingURL=Booking.js.map