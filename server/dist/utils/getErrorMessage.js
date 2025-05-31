"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getErrorMessage = getErrorMessage;
const serverConfig_1 = __importDefault(require("../config/serverConfig"));
function getErrorMessage(error) {
    if (serverConfig_1.default.debug && error instanceof Error) {
        return `${error.message}\n${error.stack}`;
    }
    if (error && typeof error === "object" && "message" in error) {
        return String(error.message);
    }
    if (typeof error === "string") {
        return error;
    }
    return "An error occurred";
}
