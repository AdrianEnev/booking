"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorCodes_1 = require("../ErrorCodes");
const CustomError_1 = __importDefault(require("../CustomError"));
// 403 - Indicates that the request was valid, but the authenticated user does not have permission to perform the requested action on the resource.
class ForbiddenError extends CustomError_1.default {
    constructor(message) {
        super({
            message, // Message passed from router
            statusCode: 403, // HTTP status code for "Forbidden"
            code: ErrorCodes_1.ErrorCodes.ERR_FORBIDDEN, // Specific error code for "Forbidden"
        });
    }
}
exports.default = ForbiddenError;
