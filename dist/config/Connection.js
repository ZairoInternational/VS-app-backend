"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
async function connectMongoDB() {
    await mongoose_1.default
        .connect(process.env.MONGODB_URI, { dbName: "PropertyDb" })
        .then(() => {
        console.log("connected to db");
    })
        .catch((err) => {
        console.log("Can't connect to db", err);
    });
}
exports.default = connectMongoDB;
//# sourceMappingURL=Connection.js.map