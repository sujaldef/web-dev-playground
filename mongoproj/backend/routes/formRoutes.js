import express from "express";
import { saveFormData, getFormData } from "../controllers/formController.js";

const router = express.Router();

router.post("/submit", saveFormData);
router.get("/data", getFormData);

export default router;
