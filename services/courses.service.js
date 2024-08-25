import { Courses } from "../entities/courses.entity.js";

async function deleteCourse(id) {
  console.log("service delete");
  return await Courses.delete({ id }).go();
}

async function updateCourse(existing, updateData) {
  return await Courses.put({ ...existing.data, ...updateData }).go();
}

async function CreateNewCourse(addCourse) {
  return await Courses.create(addCourse).go();
}

async function getCourseById(id) {
  return await Courses.get({ id }).go();
}

async function getCourses() {
  return await Courses.scan.go();
}

export {
  deleteCourse,
  updateCourse,
  CreateNewCourse,
  getCourseById,
  getCourses,
};
