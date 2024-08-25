import {
  createUser,
  getUserByName,
  createSession,
} from "../services/user.service.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const genHashpassword = async (password) => {
  const NO_OF_ROUNDS = 10;
  const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

async function createNewUser(request, response) {
  try {
    const data = request.body;
    const password = data.password;
    const roleId = 1;

    if (password.length < 8) {
      return response.status(400).send({ msg: "Password is too short" });
    }

    const existingUser = await getUserByName(data.username);

    if (existingUser.data) {
      return response.status(400).send({ msg: "User already exists" });
    }

    const hashpassword = await genHashpassword(password);
    const hashedData = {
      username: data.username,
      password: hashpassword,
      roleId: roleId,
    };

    const createdUser = await createUser(hashedData);

    if (createdUser) {
      const token = jwt.sign(
        { username: data.username },
        process.env.SECRET_KEY
      );
      return response.json({
        msg: "User created successfully",
        token: token,
        roleId: roleId,
      });
    }
  } catch (error) {
    console.error("Error creating new user:", error.message);
    return response.status(500).send({ msg: "Internal Server Error" });
  }
}

async function getUserInfo(request, response) {
  const data = request.body;
  const username = data.username;
  const storedDBUser = await getUserByName(data.username);

  if (!storedDBUser.data) {
    response.status(404).send({ msg: "Invalid credentials" });
    return;
  }
  const storedPassword = storedDBUser.data.password;
  const providedPassword = data.password;

  console.log(providedPassword, storedPassword);

  const isPasswordCheck = await bcrypt.compare(
    providedPassword,
    storedPassword
  );
  console.log(isPasswordCheck);
  if (isPasswordCheck) {
    var token = jwt.sign(
      { foo: storedDBUser.data.username },
      process.env.SECRET_KEY
    );

    const sessionData = { username, token };
    const roleId = storedDBUser.data.roleId;
    await createSession(sessionData);
    response
      .status(200)
      .send({ msg: "Login Successful", token, roleId, username });
    return;
  } else {
    response.status(400).send({ msg: "Invalid credentials" });
    return;
  }
}

export { createNewUser, getUserInfo };
