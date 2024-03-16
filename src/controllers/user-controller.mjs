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
    const userId = req.user.user_id; 
      // If user is admin, retrieve all entries
    if (userLevel === 'admin') {
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

  // Check that all required fields are included in the request
  if (validationErrors.isEmpty()) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const result = await insertUser({
      username,
      email,
      password: hashedPassword
    },next );

    return res.status(201).json(result);
  } else {
  // Handle validation errors
    const error = new Error('bad request');
    error.status = 400;
    error.errors = validationErrors.errors;
    return next (error);
  }
};
// Only authenticated users can update or modify their own data
const putUser = async (req, res) => {
  // Get user info from req.user object extracted from the token
  const user_id = req.user.user_id;
  const {username, password, email} = req.body;
  // Hash the password if included in the request
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Check that all required fields are included in the request
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
  try {
    // Get the user's role (user_level) from the request object
    const userLevel = req.user.user_level;

    // Check if the user is an admin
    if (userLevel !== 'admin') {
      return res
        .status(403)
        .json({error: 'Unauthorized: Only admins can delete users'});
    }

    // Proceed with deleting the user
    const result = await deleteUserById(req.params.id);

    // Check if there was an error while deleting the user
    if (result.error) {
      return res.status(result.error).json(result);
    }

    // User deleted successfully
    return res.json(result);
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({error: 'Internal Server Error'});
  }
};
export {getUsers, getUserById, postUser, putUser, deleteUser};
