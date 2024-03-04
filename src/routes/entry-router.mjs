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

entryRouter.route('/').get(authenticateToken, getEntries).post(
body('entry_date').isISO8601(),
body('mood').notEmpty().isString(),
body('weight').notEmpty().isNumeric(),
body('sleep_hours').notEmpty().isFloat({ min: 0, max: 24 }).withMessage('Sleep hours must be between 0h and 24h.'),
body('notes').optional().isString(),
authenticateToken,
postEntry);

entryRouter.route('/:id')
  .get(getEntryById)
  .put(body('entry_date').optional().isISO8601(),
  body('mood').optional().isString(),
  body('weight').optional().isNumeric(),
  body('sleep_hours').optional().isFloat({ min: 0, max: 24 }).withMessage('Sleep hours must be between 0h and 24h'),
  body('notes').optional().isString(),
  authenticateToken, putEntry)
  .delete(authenticateToken, deleteEntry);

export default entryRouter;