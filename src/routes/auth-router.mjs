import express from 'express';
import {body} from 'express-validator';
import {getMe, postLogin} from '../controllers/auth-controller.mjs';
import {authenticateToken} from '../middlewares/authentication.mjs';

/**
 * @api {get} https://hyte-janne.northeurope.cloudapp.azure.com/api/resource/:id Request Resource information
 * @apiName GetResource
 * @apiGroup Resource
 *
 * @apiParam {Number} id Resource unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the Resource.
 * @apiSuccess {String} lastname  Lastname of the Resource.
 */

const authRouter = express.Router();

/**
 * @apiDefine all No authentication needed.
 */

/**
 * @apiDefine token Logged in user access only
 * Valid authentication token must be provided within request.
 */

/**
 * @apiDefine UnauthorizedError
 * @apiError UnauthorizedError User name or password invalid.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *       "error": {
 *         "message": "username/password invalid",
 *         "status": 401
 *       }
 *     }
 */
authRouter
  /**
   * @api {post} https://hyte-janne.northeurope.cloudapp.azure.com/api/users/login Login
   * @apiVersion 1.0.0
   * @apiName PostLogin
   * @apiGroup Authentication
   * @apiPermission all
   *
   * @apiDescription Sign in and get an authentication token for the user.
   *
   * @apiParam {String} username Username of the user.
   * @apiParam {String} password Password of the user.
   *
   * @apiParamExample {json} Request-Example:
   *    {
   *      "username": "johnd",
   *      "password": "examplepass"
   *    }
   *
   * @apiSuccess {String} token Token for the user authentication.
   * @apiSuccess {Object} user User info.
   *
   * @apiSuccessExample Success-Response:
   *    HTTP/1.1 200 OK
   *    {
   *      "message": "Logged in successfully",
   *      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyMSwid
   *                XNlcm5hbWUiOiJ1dXNpMSIsImVtYWlsIjoidXVzaTFAZXhhbXBsZS5jb20
   *                iLCJ1c2VyX2xldmVsX2lkIjoyLCJpYXQiOjE3MDEyNzkzMjJ9.3TbVTcXS
   *                dryTDm_huuXC_U1Lg4rL0SOFyn_WAsC6W0Y"
   *      "user": {
   *        "user_id": 21,
   *        "username": "johnd",
   *        "email": "johnd@example.com",
   *        "user_level": "regular"
   *      }
   *    }
   *
   * @apiUse UnauthorizedError
   */

  // user login

  .post(
    '/login',
    body('username').trim().notEmpty(),
    body('password').trim().notEmpty(),
    postLogin,
  )

  /**
   * @api {get} https://hyte-janne.northeurope.cloudapp.azure.com/api/auth/me Request information about current user
   * @apiVersion 1.0.0
   * @apiName GetMe
   * @apiGroup Authentication
   * @apiPermission token
   * @apiHeader {String} Authorization Bearer token.
   *
   * @apiSuccess {Object} user User info.
   * @apiSuccess {Number} user.user_id Id of the User.
   * @apiSuccess {String} user.username Username of the User.
   * @apiSuccess {String} user.email email of the User.
   * @apiSuccess {Number} user.user_level_id User level id of the User.
   * @apiSuccess {Number} user.iat Token creation timestamp.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "user_id": 21,
   *       "username": "johnd",
   *       "email": "johnd@example.com",
   *       "user_level_id": 2,
   *       "iat": 1701279021
   *     }
   *
   * @apiError InvalidToken Authentication token was invalid.
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 403 Forbidden
   *     {
   *       "message": "invalid token"
   *     }
   */
  // get user info
  .get('/me', authenticateToken, getMe);

export default authRouter;
