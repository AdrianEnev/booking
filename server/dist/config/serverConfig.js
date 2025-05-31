"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const serverConfig = {
    debug: process.env.BACKEND_APP_DEBUG === "true",
};
exports.default = serverConfig;
