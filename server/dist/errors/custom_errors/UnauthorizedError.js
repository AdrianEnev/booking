"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorCodes_1 = require("../ErrorCodes");
const CustomError_1 = __importDefault(require("../CustomError"));
// 401 - used when a user tries to access a resource without being logged in or providing the necessary credentials
class UnauthorizedError extends CustomError_1.default {
    constructor(message) {
        super({
            message, // Message passed from router
            statusCode: 401, // HTTP status code for "Unauthorized"
            code: ErrorCodes_1.ErrorCodes.ERR_UNAUTHORIZED, // Specific error code for "Unauthorized"
        });
    }
}
exports.default = UnauthorizedError;
