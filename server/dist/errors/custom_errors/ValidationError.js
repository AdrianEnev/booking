"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorCodes_1 = require("../ErrorCodes");
const CustomError_1 = __importDefault(require("../CustomError"));
// 422 - Represents a validation error, meaning the server understands the request, but the data provided is invalid or incomplete.
// Summary - Correct FORMAt but DATA fails validation checks
// (e.g., an email address is invalid, a password is too short, or a date is in the wrong format).
class ValidationError extends CustomError_1.default {
    constructor(message) {
        super({
            message, // Message passed from router
            statusCode: 422, // HTTP status code for "Unprocessable Entity" (Validation error)
            code: ErrorCodes_1.ErrorCodes.ERR_VALID, // Specific error code for "Unprocessable Entity" (Validation error)
        });
    }
}
exports.default = ValidationError;
