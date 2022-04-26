"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const getConfig = () => {
    return {
        GRAPHQL_PATH: process.env.GRAPHQL_PATH,
        PORT: process.env.PORT,
        MONGODB_URL: process.env.MONGODB_URL,
        JWT_SECRET: process.env.JWT_SECRET,
        TOKEN_EXPIRATION: process.env.TOKEN_EXPIRATION,
    };
};
exports.getConfig = getConfig;
