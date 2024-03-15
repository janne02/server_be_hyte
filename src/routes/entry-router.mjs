import express from 'express';
import {
  getEntries,
  getEntryById,
  postEntry,
  putEntry,
  deleteEntry,
} from '../controllers/entry-controller.mjs';
import {authenticateToken} from '../middlewares/authentication.mjs';
import { body } from 'express-validator';

const entryRouter = express.Router();

/**
 * @api {get} /entries Retrieve All Entries
 * @apiVersion 1.0.0
 * @apiName GetEntries
 * @apiGroup Entries
 * @apiPermission token
 * @apiHeader {String} Authorization Bearer token.
 *
 * @apiSuccess {Object[]} entries List of entries.
 * @apiSuccess {String} entries._id Entry ID.
 * @apiSuccess {String} entries.entry_date Date of the entry (ISO 8601 format).
 * @apiSuccess {String} entries.mood Mood of the entry.
 * @apiSuccess {Number} entries.weight Weight recorded in the entry.
 * @apiSuccess {Number} entries.sleep_hours Hours of sleep recorded in the entry.
 * @apiSuccess {String} [entries.notes] Additional notes for the entry (optional).
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "_id": "609bd1586a9c1a0015fbd0bb",
 *         "entry_date": "2022-05-12T00:00:00.000Z",
 *         "mood": "Happy",
 *         "weight": 70,
 *         "sleep_hours": 8,
 *         "notes": "Feeling great today!"
 *       }
 *     ]
 *
 * @apiError UnauthorizedError Authentication token is missing or invalid.
 */

entryRouter.route('/').get(authenticateToken, getEntries)

 /**
     * @api {post} /entries Create a new Entry
     * @apiVersion 1.0.0
     * @apiName PostEntry
     * @apiGroup Entries
     * @apiPermission token
     * @apiHeader {String} Authorization Bearer token.
     *
     * @apiParam {String} entry_date Date of the entry (ISO 8601 format).
     * @apiParam {String} mood Mood of the entry.
     * @apiParam {Number} weight Weight recorded in the entry.
     * @apiParam {Number} sleep_hours Hours of sleep recorded in the entry.
     * @apiParam {String} [notes] Additional notes for the entry (optional).
     *
     * @apiSuccess {String} _id Entry ID.
     * @apiSuccess {String} entry_date Date of the entry (ISO 8601 format).
     * @apiSuccess {String} mood Mood of the entry.
     * @apiSuccess {Number} weight Weight recorded in the entry.
     * @apiSuccess {Number} sleep_hours Hours of sleep recorded in the entry.
     * @apiSuccess {String} [notes] Additional notes for the entry (optional).
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "_id": "609bd1586a9c1a0015fbd0bb",
     *       "entry_date": "2022-05-12T00:00:00.000Z",
     *       "mood": "Happy",
     *       "weight": 70,
     *       "sleep_hours": 8,
     *       "notes": "Feeling great today!"
     *     }
     *
     * @apiError UnauthorizedError Authentication token is missing or invalid.
     * @apiError ValidationError One or more input parameters are invalid.
     */
.post(
body('entry_date').isISO8601(),
body('mood').notEmpty().isString(),
body('weight').notEmpty().isNumeric(),
body('sleep_hours').notEmpty().isFloat({ min: 0, max: 24 }).withMessage('Sleep hours must be between 0h and 24h.'),
body('notes').optional().isString(),
authenticateToken,
postEntry);

entryRouter.route('/:id')
  .get(getEntryById)

  /**
 * @api {get} /entries/:id Retrieve Entry by ID
 * @apiVersion 1.0.0
 * @apiName GetEntryById
 * @apiGroup Entries
 *
 * @apiParam {String} id Entry ID.
 *
 * @apiSuccess {String} _id Entry ID.
 * @apiSuccess {String} entry_date Date of the entry (ISO 8601 format).
 * @apiSuccess {String} mood Mood of the entry.
 * @apiSuccess {Number} weight Weight recorded in the entry.
 * @apiSuccess {Number} sleep_hours Hours of sleep recorded in the entry.
 * @apiSuccess {String} [notes] Additional notes for the entry (optional).
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "_id": "609bd1586a9c1a0015fbd0bb",
 *       "entry_date": "2022-05-12T00:00:00.000Z",
 *       "mood": "Happy",
 *       "weight": 70,
 *       "sleep_hours": 8,
 *       "notes": "Feeling great today!"
 *     }
 *
 * @apiError NotFoundError The entry with the specified ID was not found.
 */
  .put(body('entry_date').optional().isISO8601(),
  body('mood').optional().isString(),
  body('weight').optional().isNumeric(),
  body('sleep_hours').optional().isFloat({ min: 0, max: 24 }).withMessage('Sleep hours must be between 0h and 24h'),
  body('notes').optional().isString(),
  authenticateToken, putEntry)
/**
 * @api {put} /entries/:id Update Entry by ID
 * @apiVersion 1.0.0
 * @apiName PutEntry
 * @apiGroup Entries
 * @apiPermission token
 * @apiHeader {String} Authorization Bearer token.
 *
 * @apiParam {String} id Entry ID.
 * @apiParam {String} [entry_date] Date of the entry (ISO 8601 format).
 * @apiParam {String} [mood] Mood of the entry.
 * @apiParam {Number} [weight] Weight recorded in the entry.
 * @apiParam {Number} [sleep_hours] Hours of sleep recorded in the entry.
 * @apiParam {String} [notes] Additional notes for the entry (optional).
 *
 * @apiSuccess {String} _id Entry ID.
 * @apiSuccess {String} entry_date Date of the entry (ISO 8601 format).
 * @apiSuccess {String} mood Mood of the entry.
 * @apiSuccess {Number} weight Weight recorded in the entry.
 * @apiSuccess {Number} sleep_hours Hours of sleep recorded in the entry.
 * @apiSuccess {String} [notes] Additional notes for the entry (optional).
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "_id": "609bd1586a9c1a0015fbd0bb",
 *       "entry_date": "2022-05-12T00:00:00.000Z",
 *       "mood": "Happy",
 *       "weight": 70,
 *       "sleep_hours": 8,
 *       "notes": "Feeling great today!"
 *     }
 *
 * @apiError UnauthorizedError Authentication token is missing or invalid.
 * @apiError NotFoundError The entry with the specified ID was not found.
 * @apiError ValidationError One or more input parameters are invalid.
 */

  .delete(authenticateToken, deleteEntry);
   /**
     * @api {delete} /entries/:id Delete Entry by ID
     * @apiVersion 1.0.0
     * @apiName DeleteEntry
     * @apiGroup Entries
     * @apiPermission token
     * @apiHeader {String} Authorization Bearer token.
     *
     * @apiParam {String} id Entry ID.
     *
     * @apiSuccess {String} message Success message.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "message": "Entry deleted successfully"
     *     }
     *
     * @apiError UnauthorizedError Authentication token is missing or invalid.
     * @apiError NotFoundError The entry with the specified ID was not found.
     */

export default entryRouter;