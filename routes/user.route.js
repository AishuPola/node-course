import express from "express";

import { createNewUser, getUserInfo } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signup", express.json(), createNewUser);

router.post("/login", express.json(), getUserInfo);

export default router;
