"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Properties = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const generateVSID = (length) => {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let uniqueId = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        uniqueId += charset.charAt(randomIndex);
    }
    return uniqueId;
};
const PropertySchema = new mongoose_1.Schema({
    VSID: {
        type: String,
        default: () => generateVSID(7),
    },
    commonId: String,
    email: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    rentalType: {
        type: String,
        default: "Short Term",
    },
    isInstantBooking: Boolean,
    propertyType: String,
    rentalForm: String,
    propertyName: String,
    placeName: String,
    newPlaceName: String,
    street: String,
    postalCode: String,
    city: String,
    state: String,
    country: String,
    center: {
        type: {
            lat: Number,
            lng: Number,
        },
    },
    size: Number,
    guests: Number,
    bedrooms: Number,
    beds: Number,
    bathroom: Number,
    kitchen: Number,
    childrenAge: Number,
    basePrice: Number,
    weekendPrice: Number,
    weeklyDiscount: Number,
    pricePerDay: [[Number]],
    basePriceLongTerm: Number,
    monthlyDiscount: Number,
    currency: String,
    icalLinks: {
        type: Map,
        of: String,
    },
    generalAmenities: {
        type: Map,
        of: Boolean,
    },
    otherAmenities: {
        type: Map,
        of: Boolean,
    },
    safeAmenities: {
        type: Map,
        of: Boolean,
    },
    smoking: String,
    pet: String,
    party: String,
    cooking: String,
    additionalRules: [String],
    reviews: String,
    newReviews: String,
    propertyImages: [String],
    propertyCoverFileUrl: String,
    propertyPictureUrls: [String],
    night: [Number],
    time: [Number],
    datesPerPortion: [String],
    area: String,
    subarea: String,
    neighbourhood: String,
    floor: String,
    isTopFloor: {
        type: Boolean,
        default: false,
    },
    orientation: String,
    levels: Number,
    zones: String,
    propertyStyle: String,
    constructionYear: Number,
    isSuitableForStudents: {
        type: Boolean,
        default: true,
    },
    monthlyExpenses: Number,
    heatingType: String,
    heatingMedium: String,
    energyClass: String,
    nearbyLocations: {
        type: Map,
        of: mongoose_1.Schema.Types.Mixed,
    },
    hostedFrom: String,
    hostedBy: String,
    listedOn: {
        type: [String],
        default: ["VacationSaga"],
    },
    lastUpdatedBy: {
        type: [String],
        default: [],
    },
    lastUpdates: {
        type: [[String]],
        default: [[]],
    },
    isLive: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });
exports.Properties = mongoose_1.default.model("properties", PropertySchema);
//# sourceMappingURL=Properties.js.map