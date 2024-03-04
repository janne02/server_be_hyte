import express from 'express';
import {body} from 'express-validator';
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
  .post(
    body('username').trim().isLength({min: 3, max: 20}).isAlphanumeric(),
    body('password').trim().isLength({min: 8, max: 128}),
    body('email').trim().isEmail(),
    postUser
  );

// /user/:id endpoint
userRouter
  .route("/:id")
  // get info of a user
  .get(authenticateToken, getUserById)

  // delete user based on id
  .delete(authenticateToken, deleteUser);

export default userRouter;
