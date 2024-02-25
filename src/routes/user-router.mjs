import express from "express";
import { authenticateToken } from "../middlewares/authentication.mjs";

import {
  getUserById,
  getUsers,
  postUser,
  putUser,
  deleteUser,
} from "../controllers/user-controller.mjs";

const userRouter = express.Router();

// /user endpoint
userRouter
  .route("/")
  // list users
  .get(authenticateToken, getUsers)
  // update user
  .put(authenticateToken, putUser)
  // user registration
  .post(postUser);

// /user/:id endpoint
userRouter
  .route("/:id")
  // get info of a user
  .get(authenticateToken, getUserById)

  // delete user based on id
  .delete(authenticateToken, deleteUser);

export default userRouter;
