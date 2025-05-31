"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorCodes_1 = require("../ErrorCodes");
const CustomError_1 = __importDefault(require("../CustomError"));
// 400 - The request is malformed or invalid in some way that prevents the server from processing it. This is often due to the structure or format of the request.
// Summary: Correct DATA but missing required fields or is incorrectly formatted
// (e.g., invalid data types, wrong format for dates, or missing required parameters).
class BadRequestError extends CustomError_1.default {
    constructor(message) {
        super({
            message, // Message passed from router
            statusCode: 400, // HTTP status code for "Bad Request"
            code: ErrorCodes_1.ErrorCodes.ERR_BAD_REQUEST, // Specific error code for "Bad Request"
        });
    }
}
exports.default = BadRequestError;
