"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authChecker = void 0;
const tokenUtils_1 = require("../../utils/tokenUtils");
const authChecker = ({ context: { accessToken }, }) => {
    try {
        const data = (0, tokenUtils_1.decodeAccessToken)(accessToken);
        return true;
    }
    catch (error) {
        // token is invalid for some reason
        return false;
    }
};
exports.authChecker = authChecker;
