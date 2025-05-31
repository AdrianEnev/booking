"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = errorHandler;
const getErrorMessage_1 = require("@utils/getErrorMessage");
const serverConfig_1 = __importDefault(require("@config/serverConfig"));
const CustomError_1 = __importDefault(require("../errors/CustomError"));
function errorHandler(error, req, res, next) {
    if (res.headersSent || serverConfig_1.default.debug) {
        next(error);
        return;
    }
    if (error instanceof CustomError_1.default) {
        console.error(`[CustomError] ${error.message}`, {
            code: error.code,
            statusCode: error.statusCode,
            stack: error.stack,
        });
        res.status(error.statusCode).json({
            error: {
                message: error.message,
                code: error.code,
            },
        });
        return;
    }
    // Log full error for internal server errors
    //console.error("[InternalError]", error instanceof Error ? error.stack : error);
    res.status(500).json({
        error: {
            message: (0, getErrorMessage_1.getErrorMessage)(error) ||
                "An error occurred. Please view logs for more details",
        },
    });
}
