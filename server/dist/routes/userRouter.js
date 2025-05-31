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
const getIsUserAdmin_1 = __importDefault(require("@services/users/getIsUserAdmin"));
const getUserInfo_1 = __importDefault(require("@services/users/getUserInfo"));
const setUserAdmin_1 = __importDefault(require("@services/users/setUserAdmin"));
const validateUserId_1 = __importDefault(require("@services/users/validateUserId"));
const express_1 = __importDefault(require("express"));
const userRouter = express_1.default.Router();
userRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () { }));
userRouter.get('/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    yield (0, validateUserId_1.default)(userId);
    const userInfo = yield (0, getUserInfo_1.default)(userId);
    res.status(200).json(userInfo);
}));
userRouter.get('/:userId/admin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    yield (0, validateUserId_1.default)(userId);
    const isUserAdmin = yield (0, getIsUserAdmin_1.default)(userId);
    res.status(200).json({ isAdmin: isUserAdmin });
}));
// Change user "isAdmin" custom claims in firebase
userRouter.put('/:userId/admin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    yield (0, validateUserId_1.default)(userId);
    const { isAdmin } = req.body;
    (0, setUserAdmin_1.default)(userId, isAdmin);
    res.status(204).send();
}));
exports.default = userRouter;
