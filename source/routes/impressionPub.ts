import express from "express";
import controller from "../controllers/impressionPub";

const router = express.Router();

router.post("/", controller.postImpressions);

export = router;
