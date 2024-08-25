import express from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { authIsAdmin } from "../middlewares/isadmin.middleware.js";
import {
  CreateNewCourseData,
  deleteCourseData,
  getAllCourse,
  getallCourseById,
  updateCourseData,
} from "../controllers/course.controller.js";

const router = express.Router();

router.route("/").get(getAllCourse).post(CreateNewCourseData);

router
  .route("/:id")
  .get(getallCourseById)
  .put(updateCourseData)
  .delete(deleteCourseData);

export default router;
