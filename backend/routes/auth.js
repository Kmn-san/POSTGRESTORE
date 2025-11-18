import express from "express";
import { getUser,createUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/login",getUser);
router.post("/register",createUser);

export default router;