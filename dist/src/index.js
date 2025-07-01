"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
const Connection_1 = __importDefault(require("../config/Connection"));
const property_route_1 = __importDefault(require("../routes/property-route"));
const user_route_1 = __importDefault(require("../routes/user-route"));
const discount_coupon_route_1 = __importDefault(require("../routes/discount-coupon-route"));
const wishlist_routes_1 = __importDefault(require("../routes/wishlist-routes"));
dotenv_1.default.config();
(0, Connection_1.default)();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    secret: process.env.JWT_SECRET || "default_secret",
    resave: false,
    saveUninitialized: true,
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.get("/", (req, res) => {
    res.json({ name: "Welcome to Vacationsaga Mobile App" });
});
app.use("/properties", property_route_1.default);
app.use("/user", user_route_1.default);
app.use("/wishlist", wishlist_routes_1.default);
app.use("/coupon", discount_coupon_route_1.default);
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map