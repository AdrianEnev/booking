"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const checkUsernameNSFW_1 = __importDefault(require("@services/models/checkUsernameNSFW"));
const express_1 = __importDefault(require("express"));
const modelsRouter = express_1.default.Router();
modelsRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () { }));
modelsRouter.get('/checkUsernameNSFW/:username', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.params.username;
    const isUsernameNSFW = yield (0, checkUsernameNSFW_1.default)(username);
    res.json({ isUsernameNSFW });
}));
exports.default = modelsRouter;
