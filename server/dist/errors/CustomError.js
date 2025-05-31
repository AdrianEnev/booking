"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomError extends Error {
    constructor({ message, statusCode, code, }) {
        super(message);
        this.message = message; // Assign message explicitly
        this.statusCode = statusCode;
        this.code = code;
        // Set prototype chain
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.default = CustomError;
