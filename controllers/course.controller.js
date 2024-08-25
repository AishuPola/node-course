import { Courses } from "../entities/courses.entity.js";
import {
  deleteCourse,
  updateCourse,
  CreateNewCourse,
  getCourses,
  getCourseById,
} from "../services/courses.service.js";
import { v4 as uuidv4 } from "uuid";

async function getAllCourse(request, response) {
  try {
    const allCourses = await getCourses();
    response.send(allCourses.data);
  } catch (err) {
    response.status(500).send({ msg: "Unable to get Course" });
  }
}

async function getallCourseById(request, response) {
  try {
    const { id } = request.params;
    // console.log(id);
    const course = await getCourseById(id);
    response.send(course.data);
  } catch (err) {
    response.status(400).send({ msg: "Unable to retrive the Item by Id" });
  }
}

async function CreateNewCourseData(req, res) {
  try {
    const data = req.body;
    const addCourse = {
      ...data,
      id: uuidv4(),
    };
    await CreateNewCourse(addCourse);
    res.send(addCourse);
  } catch (err) {
    res.send({ msg: "Failed to Add the  Course", err });
  }
}

async function updateCourseData(request, response) {
  const { id } = request.params;
  const updateData = request.body;
  const existing = await Courses.get({ id }).go();

  try {
    const final = await updateCourse(existing, updateData);
    // console.log(final.data);
    response.send(final.data);
  } catch (err) {
    console.log(err);
    response.send({ msg: "Failed to Update the Item" });
  }
}

async function deleteCourseData(request, response) {
  const { id } = request.params;
  getCourseById(id);
  console.log(id);

  try {
    await deleteCourse(id);
    console.log("delete clicked");
    response.send({ msg: "Failed to Update the course" });
  } catch (err) {
    response.status(404).send("No such course🥲");
  }
}

export {
  getAllCourse,
  getallCourseById,
  CreateNewCourseData,
  updateCourseData,
  deleteCourseData,
};
