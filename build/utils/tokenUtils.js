"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeAccessToken = exports.extractTokenFromHeader = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../configs/config");
const { JWT_SECRET, TOKEN_EXPIRATION } = (0, config_1.getConfig)();
const generateAccessToken = (user) => {
    const payload = {
        _id: user._id,
        username: user.username,
    };
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET, {
        expiresIn: TOKEN_EXPIRATION || '1d',
    });
};
exports.generateAccessToken = generateAccessToken;
const extractTokenFromHeader = (headerValue) => {
    if (!headerValue) {
        return null;
    }
    const [type, token] = headerValue.split(' ');
    if (type === 'Token' && token) {
        return token;
    }
    return null;
};
exports.extractTokenFromHeader = extractTokenFromHeader;
const decodeAccessToken = (token) => {
    const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
    return decoded;
};
exports.decodeAccessToken = decodeAccessToken;
