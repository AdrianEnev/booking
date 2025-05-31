"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FIRESTORE_ADMIN = exports.FIREBASE_ADMIN = exports.FIRESTORE_DB = exports.FIREBASE_APP = void 0;
// Import the functions you need from the SDKs you need
const app_1 = require("firebase/app");
const firestore_1 = require("firebase/firestore");
//import { getAnalytics } from "firebase/analytics";
const admin = __importStar(require("firebase-admin"));
const fs_1 = __importDefault(require("fs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Read the Firebase Admin SDK JSON dynamically
const serviceAccountPath = process.env.BACKEND_FIREBASE_ADMIN_PATH;
if (!serviceAccountPath || !fs_1.default.existsSync(serviceAccountPath)) {
    throw new Error("Firebase Admin SDK JSON file not found! Check FIREBASE_ADMIN_PATH.");
}
const serviceAccount = JSON.parse(fs_1.default.readFileSync(serviceAccountPath, "utf-8"));
const firebaseConfig = {
    apiKey: process.env.BACKEND_FIREBASE_API_KEY,
    authDomain: process.env.BACKEND_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.BACKEND_FIREBASE_PROJECT_ID,
    storageBucket: process.env.BACKEND_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.BACKEND_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.BACKEND_FIREBASE_APP_ID,
    measurementId: process.env.BACKEND_FIREBASE_MEASUREMENT_ID,
};
// Initialize Firebase App
const FIREBASE_APP = (0, app_1.initializeApp)(firebaseConfig);
exports.FIREBASE_APP = FIREBASE_APP;
const FIRESTORE_DB = (0, firestore_1.getFirestore)(FIREBASE_APP);
exports.FIRESTORE_DB = FIRESTORE_DB;
// Initialize Firebase Admin
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.BACKEND_FIREBASE_STORAGE_BUCKET
});
const FIREBASE_ADMIN = admin;
exports.FIREBASE_ADMIN = FIREBASE_ADMIN;
const FIRESTORE_ADMIN = FIREBASE_ADMIN.firestore();
exports.FIRESTORE_ADMIN = FIRESTORE_ADMIN;
