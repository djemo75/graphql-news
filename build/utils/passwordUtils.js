"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePasswords = exports.encryptPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const encryptPassword = (password) => {
    return bcryptjs_1.default.hashSync(password, 10);
};
exports.encryptPassword = encryptPassword;
const comparePasswords = async (passwordOne, passwordTwo) => {
    const isValid = await bcryptjs_1.default.compare(passwordOne, passwordTwo);
    return isValid;
};
exports.comparePasswords = comparePasswords;
