"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorCodes_1 = require("../ErrorCodes");
const CustomError_1 = __importDefault(require("../CustomError"));
// 409 -  Indicates that there is a conflict with the current state of the server (often caused by duplicate data or conflicting resource states).
// often used when attempting to create a resource that already exists, or a request that conflicts with an existing resource's state.
// Example: Trying to register a user with an email address that's already taken.
class ConflictError extends CustomError_1.default {
    constructor(message) {
        super({
            message, // Message passed from router
            statusCode: 409, // HTTP status code for "Conflict"
            code: ErrorCodes_1.ErrorCodes.ERR_CONFLICT, // Specific error code for "Conflict"
        });
    }
}
exports.default = ConflictError;
