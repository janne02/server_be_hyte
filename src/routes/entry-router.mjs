import express from 'express';
import {
  getEntries,
  getEntryById,
  putEntry,
  deleteEntry,
} from '../controllers/entry-controller.mjs';

const entryRouter = express.Router();

entryRouter.route('/').get(getEntries);

entryRouter.route('/:id')
  .get(getEntryById)
  .put(putEntry)
  .delete(deleteEntry);

export default entryRouter;
