import { Cart } from "../entities/cart.entity.js";
import { Courses } from "../entities/courses.entity.js";
import { getCourseById } from "../service/course.service.js";
async function getAllCartItem() {
  return (await Cart.scan.go()).data;
}
async function createCartCourse(addCourse) {
  await Cart.put(addCourse).go();
}
async function getUserIdById(Id) {
  return await Cart.get({ userId: Id }).go();
}

async function deleteFromCartById(id) {
  await Cart.delete({ userId: id }).go();
}
export { getAllCartItem, createCartCourse, getUserIdById, deleteFromCartById };
