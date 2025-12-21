import express from "express";
import { sendEnquiryEmail } from "../controllers/emailController.js";

const router = express.Router();

router.post("/sendemail", sendEnquiryEmail);

export default router;
