"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorCodes_1 = require("../ErrorCodes");
const CustomError_1 = __importDefault(require("../CustomError"));
// 404 - data not found
class EntityNotFoundError extends CustomError_1.default {
    constructor(message) {
        super({
            message, // Message passed from router
            statusCode: 404, // HTTP status code for "Not Found"
            code: ErrorCodes_1.ErrorCodes.ERR_NOT_FOUND, // Specific error code for "Entity Not Found"
        });
    }
}
exports.default = EntityNotFoundError;
