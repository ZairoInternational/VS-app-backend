"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PropertyController_1 = require("@/controllers/PropertyController");
const router = express_1.default.Router();
router.post("/getAllProperties", PropertyController_1.getAllProperties);
router.post("/getParticularProperty", PropertyController_1.getParticularProperty);
router.get("/getProperties", PropertyController_1.getProperties);
exports.default = router;
//# sourceMappingURL=property-route.js.map