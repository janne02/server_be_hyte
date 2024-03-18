import bcrypt from 'bcryptjs';
import {validationResult} from 'express-validator';
import {
  deleteUserById,
  insertUser,
  listAllUsers,
  selectUserById,
  updateUserById,
} from '../models/user-model.mjs';

//function to fetch users
const getUsers = async (req, res) => {
  try {
    let result;
    const userLevel = req.user.user_level;
    const userId = req.user.user_id; // Get the user ID of the logged-in user

    if (userLevel === 'admin') {
      // If user is admin, retrieve all entries
      result = await listAllUsers();
    } else {
      // If not admin, retrieve only the logged-in user's data
      result = await selectUserById(userId);
      // Wrap the single user's data in an array to maintain consistency
      result = [result];
    }

    res.json(result);
  } catch (error) {
    console.error('Error getting entries:', error);
    res.status(500).json({error: 'Internal Server Error'});
  }
};
//functions to fetch users by id
const getUserById = async (req, res) => {
  const result = await selectUserById(req.params.id);
  if (result.error) {
    return res.status(result.error).json(result);
  }
  return res.json(result);
};
//function to handle POST requests to create new user
const postUser = async (req, res, next) => {
  const {username, password, email} = req.body;
  const validationErrors = validationResult(req);

  // check that all needed fields are included in request
  if (validationErrors.isEmpty()) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const result = await insertUser(
      {
        username,
        email,
        password: hashedPassword,
      },
      next,
    );

    return res.status(201).json(result);
  } else {
    const error = new Error('bad request');
    error.status = 400;
    error.errors = validationErrors.errors;
    return next(error);
  }
};
// only user authenticated by token can update or modify own data
const putUser = async (req, res) => {
  //get userinfo from req.user object extracted from token
  const user_id = req.user.user_id;
  const {username, password, email} = req.body;
  //hash password if included in request
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // check that all needed fields are included in request
  if (user_id && username && password && email) {
    const result = await updateUserById({
      user_id,
      username,
      password: hashedPassword,
      email,
    });
    if (result.error) {
      return res.status(result.error).json(result);
    }
    return res.status(201).json(result);
  } else {
    return res.status(400).json({error: 400, message: 'bad request'});
  }
};
//function to DELETE requests to delete user by id
const deleteUser = async (req, res) => {
  const result = await deleteUserById(req.params.id);
  if (result.error) {
    return res.status(result.error).json(result);
  }
  return res.json(result);
};

export {getUsers, getUserById, postUser, putUser, deleteUser};
