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
exports.checkUsernameNSFW = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const InternalError_1 = __importDefault(require("@custom_errors/InternalError"));
dotenv_1.default.config();
const apiToken = process.env.BACKEND_HUGGINGFACE_API_TOKEN;
const checkUsernameNSFW = (username) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Checking username for NSFW content", username);
    // FIX: First, check if the username is in the popular names list
    const isInList = yield isUsernameInList(username.toLowerCase());
    if (isInList) {
        console.log("Username is not NSFW, returning false");
        return false;
    }
    // If the username is NOT in the list, proceed with NSFW detection
    try {
        const response = yield fetch("https://api-inference.huggingface.co/models/facebook/bart-large-mnli", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${apiToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                inputs: username,
                parameters: {
                    candidate_labels: ["offensive", "non-offensive"],
                },
            }),
        });
        const data = yield response.json();
        //console.log(data);
        if (!data || !data.labels || data.labels.length === 0) {
            console.error("Unexpected API response format", data);
            return true; // Assume NSFW if API fails
        }
        //console.log(data.labels[0]);
        if (data.labels[0] === "non-offensive") {
            console.log("Username is not NSFW, returning false");
            return false;
        }
        console.log("Username is NSFW, returning true");
        return true;
    }
    catch (err) {
        throw new InternalError_1.default('Error checking if username is NSFW');
    }
});
exports.checkUsernameNSFW = checkUsernameNSFW;
const isUsernameInList = (username) => {
    const popularNames = new Set([
        "liam", "olivia", "noah", "emma", "oliver", "ava", "elijah", "charlotte", "james", "sophia",
        "william", "amelia", "benjamin", "isabella", "lucas", "mia", "henry", "evelyn", "alexander", "harper",
        "mason", "luna", "michael", "camila", "ethan", "gianna", "daniel", "abigail", "jacob", "ella",
        "logan", "elizabeth", "jackson", "sofia", "sebastian", "avery", "jack", "scarlett", "aiden", "emily",
        "owen", "aria", "samuel", "penelope", "matthew", "chloe", "joseph", "layla", "levi", "mila",
        "mateo", "nora", "david", "hazel", "john", "madison", "wyatt", "ellie", "carter", "lily",
        "julian", "nova", "luke", "isla", "grayson", "grace", "isaac", "violet", "jayden", "aurora",
        "theodore", "riley", "gabriel", "zoey", "anthony", "willow", "dylan", "emilia", "leo", "stella",
        "lincoln", "zoe", "jaxon", "victoria", "asher", "hannah", "christopher", "addison", "josiah", "leah",
        "andrew", "lucy", "thomas", "eliana", "joshua", "ivy", "ezra", "everly", "adrian", "alex", "jordan",
        "gregory", "greg"
    ]);
    return Promise.resolve(popularNames.has(username));
};
exports.default = exports.checkUsernameNSFW;
