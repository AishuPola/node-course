import jwt from "jsonwebtoken";
import { Session } from "../entities/session.entity.js";
import { user } from "../entities/user.entity.js";
// middleware are function

const ADMIN = 0;

const authIsAdmin = async (request, response, next) => {
  const token = request.header("x-auth-token");
  try {
    // jwt.verify(token, process.env.SECRET_KEY);
    const results = await Session.get({ token: token }).go();
    const role = await user.get({ username: results.data.username }).go();
    // console.log(results, role);
    // console.log(role)

    if (role.data.roleId === ADMIN) {
      // console.log("Yes he is admin ")
      next();
    } else {
      throw new Error("Unauthorized");
    }
    // next();
  } catch (err) {
    response.status(401).send({ msg: err.message });
  }
};

export { authIsAdmin };
