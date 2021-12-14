"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logging_1 = __importDefault(require("../config/logging"));
const NAMESPACE = "impressionPub";
const postImpressions = (req, res, next) => {
    logging_1.default.info(NAMESPACE, `Relie chaque impressions et clics au point d'intérêt le plus proche`);
    const { lat, long, name } = req.body;
    return res.status(200).json({
        message: "lat, long et name",
        lat,
        long,
        name,
    });
};
exports.default = { postImpressions };
