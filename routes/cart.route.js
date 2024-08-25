import express from "express";
const router = express.Router();
import { auth } from "../middlewares/auth.middleware.js";
import {
  getAllCartItemCtrl,
  AddToCartCtrl,
  deleteFromCartByIdCtrl,
  tocheckuserid,
} from "../controllers/cart.controller.js";
router.get("/", auth, getAllCartItemCtrl);
router.post("/add", auth, AddToCartCtrl);
router.delete("/del", auth, deleteFromCartByIdCtrl);
router.get("/check/:userId", tocheckuserid);
export default router;
