import express from 'express';
import {authenticateToken} from '../middlewares/authentication.mjs'
import { body } from 'express-validator';
import {validationErrorHandler} from '../middlewares/error-handler.mjs';


import {
  getUserById,
  getUsers,
  postUser,
  putUser,
  deleteUser,
} from '../controllers/user-controller.mjs';

const userRouter = express.Router();

/**
 * @api {get} /user Get All Users
 * @apiVersion 1.0.0
 * @apiName GetUsers
 * @apiGroup User
 * @apiPermission token
 * @apiHeader {String} Authorization Bearer token.
 *
 * @apiSuccess {Object[]} users List of users.
 * @apiSuccess {Number} users.user_id User ID.
 * @apiSuccess {String} users.username Username of the user.
 * @apiSuccess {String} users.email Email of the user.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "user_id": 1,
 *         "username": "john_doe",
 *         "email": "john@example.com"
 *       },
 *       {
 *         "user_id": 2,
 *         "username": "jane_doe",
 *         "email": "jane@example.com"
 *       }
 *     ]
 *
 * @apiError UnauthorizedError User is not authenticated.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *       "message": "Unauthorized"
 *     }
 */


userRouter.route('/')
  .get(authenticateToken, getUsers)




/**
 * @api {put} /user Update User
 * @apiVersion 1.0.0
 * @apiName PutUser
 * @apiGroup User
 * @apiPermission token
 * @apiHeader {String} Authorization Bearer token.
 *
 * @apiParam {String} username New username of the user.
 * @apiParam {String} password New password of the user.
 * @apiParam {String} email New email of the user.
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "username": "new_username",
 *       "password": "new_password",
 *       "email": "new_email@example.com"
 *     }
 *
 * @apiSuccess {String} message Success message.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "User updated successfully"
 *     }
 *
 * @apiError UnauthorizedError User is not authenticated.
 * @apiError ValidationError Validation error occurred.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Validation error"
 *     }
 */

  .put(body('username').trim().isLength({min: 3, max: 20}).isAlphanumeric(),
  body('password').trim().isLength({min: 8, max: 128}),
  body('email').trim().isEmail(),authenticateToken, validationErrorHandler, putUser)






  /**
 * @api {post} /user Register User
 * @apiVersion 1.0.0
 * @apiName PostUser
 * @apiGroup User
 * @apiPermission all
 *
 * @apiDescription Register a new user.
 *
 * @apiParam {String} username Username of the user.
 * @apiParam {String} password Password of the user.
 * @apiParam {String} email Email of the user.
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "username": "new_user",
 *       "password": "password123",
 *       "email": "new_user@example.com"
 *     }
 *
 * @apiSuccess {String} message Success message.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *       "message": "User created successfully"
 *     }
 *
 * @apiError ValidationError Validation error occurred.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Validation error"
 *     }
 */
  .post(body('username').trim().isLength({min: 3, max: 20}).isAlphanumeric(),
  body('password').trim().isLength({min: 8, max: 128}),
  body('email').trim().isEmail(),
  postUser, validationErrorHandler
  );

/**
 * @api {get} /user/:id Get User by ID
 * @apiVersion 1.0.0
 * @apiName GetUserById
 * @apiGroup User
 * @apiPermission token
 * @apiHeader {String} Authorization Bearer token.
 *
 * @apiParam {Number} id User ID.
 *
 * @apiSuccess {Number} user_id User ID.
 * @apiSuccess {String} username Username of the user.
 * @apiSuccess {String} email Email of the user.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "user_id": 1,
 *       "username": "john_doe",
 *       "email": "john@example.com"
 *     }
 *
 * @apiError UnauthorizedError User is not authenticated.
 * @apiError NotFoundError User not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "User not found"
 *     }
 */
userRouter.route('/:id')
  .get(authenticateToken, getUserById)

  /**
 * @api {delete} /user/:id Delete User by ID
 * @apiVersion 1.0.0
 * @apiName DeleteUserById
 * @apiGroup User
 * @apiPermission token
 * @apiHeader {String} Authorization Bearer token.
 *
 * @apiParam {Number} id User ID.
 *
 * @apiSuccess {String} message Success message.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "User deleted successfully"
 *     }
 *
 * @apiError UnauthorizedError User is not authenticated.
 * @apiError NotFoundError User not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "User not found"
 *     }
 */
  .delete(authenticateToken, deleteUser);



export default userRouter;