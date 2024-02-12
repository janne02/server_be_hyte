import express from 'express';
import {
  getUserById,
  getUsers,
  postUser,
  deleteUser,
  postLogin,
  putUser,
} from '../controllers/user-controller.mjs';


const userRouter = express.Router();

// /user endpoint
userRouter.route('/')
  // list users
  .get(getUsers)
  // user registration
  .post(postUser);

// /user/:id endpoint
userRouter.route('/:id')
  // get info of a user
  .get(getUserById)
  // update user
  .put(putUser)
  // delete user
  .delete(deleteUser);
// user login
userRouter.post('/login', postLogin);

export default userRouter;
