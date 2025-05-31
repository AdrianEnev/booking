"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorCodes_1 = require("../ErrorCodes");
const CustomError_1 = __importDefault(require("../CustomError"));
// 500 -  Represents an internal server error. This is a catch-all for unexpected conditions or failures on the server side that prevent it from fulfilling the request
// indicates something went wrong on the server, usually due to a bug, failed database query, etc.
class InternalError extends CustomError_1.default {
    constructor(message) {
        super({
            message, // Message passed from router
            statusCode: 500, // HTTP status code for "Internal Error"
            code: ErrorCodes_1.ErrorCodes.ERR_INTERNAL, // Specific error code for "Internal Error"
        });
    }
}
exports.default = InternalError;
