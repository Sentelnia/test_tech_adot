"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const impressionPub_1 = __importDefault(require("../controllers/impressionPub"));
const router = express_1.default.Router();
router.post("/", impressionPub_1.default.postImpressions);
module.exports = router;
