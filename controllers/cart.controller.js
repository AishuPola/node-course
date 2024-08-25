// import { Courses } from "../entities/courses.entity.js";
// import {
//   getAllCartItem,
//   createCartCourse,
//   getUserIdById as getCartByUserId,
//   deleteFromCartById,
// } from '../services/cart.service.js';
//
// import { usernameToken } from "../service/user.service.js";

async function getAllCartItemCtrl(request, response) {
  try {
    response.send(await getAllCartItem());
  } catch (error) {
    response.send("courses not found ");
  }
}

async function AddToCartCtrl(request, response) {
  const courses = request.body;
  console.log(courses);
  const token = request.headers["x-auth-token"];
  const username = await usernameToken(token);
  console.log(username);

  try {
    const existingCart = await Cart.query
      .primary({ username })
      .go()
      .then((response) => response.data[0]);

    if (!existingCart) {
      const initialCart = {
        username: username,
        courses: [courses],
        totalPrice: newCourse.price,
      };

      await Cart.put(initialCart).go();
      console.log(`Cart created for ${username}`);
    } else {
      const updatedCourses = [...existingCart.courses, newCourse];

      const updatedTotalPrice = updatedCourses.reduce(
        (acc, course) => acc + course.price * course.quantity,
        0
      );

      await Cart.update({ username })
        .set({ courses: updatedCourses, totalPrice: updatedTotalPrice })
        .go();

      console.log(`Cart updated for ${username}`);
    }
  } catch (error) {
    console.error("Error adding course to cart:", error);
  }
}

async function tocheckuserid(request, response) {
  const { userId } = request.params;
  console.log(userId);
  const existingUser = await getCartByUserId(userId);
  response.send(existingUser);
}
async function deleteFromCartByIdCtrl(request, response) {
  const token = request.headers["x-auth-token"];
  const userfromtoken = await usernameToken(token);
  try {
    const res = await getCartByUserId(userfromtoken.data.username);
    if (res.data) {
      await deleteFromCartById(userfromtoken.data.username);
      response.send({ msg: "deleted successfully", data: res.data });
    } else {
      response.status(404).send({ msg: "Course not found" });
    }
  } catch (error) {
    response.status(500).send("deleted failed");
  }
}
export {
  getAllCartItemCtrl,
  AddToCartCtrl,
  deleteFromCartByIdCtrl,
  tocheckuserid,
};

function calculateTotalPriceQty(courses) {
  let totalPrice = 0;

  for (const course of courses) {
    totalPrice += course.price * course.quantity;
  }

  return totalPrice;
}
