import { user } from "../entities/user.entity.js";
import { Session } from "../entities/session.entity.js";

async function createUser(addUser) {
  return await user.create(addUser).go();
}

async function getUserByName(username) {
  return await user.get({ username: username }).go();
}

async function createSession(sessionData) {
  return await Session.create(sessionData).go();
}

export { createUser, getUserByName, createSession };
