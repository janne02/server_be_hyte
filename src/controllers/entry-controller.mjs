import { validationResult } from "express-validator";
import {
  listAllEntries,
  findEntryById,
  addEntry,
  deleteEntryById,
  updateEntryById,
  listAllEntriesById,
} from "../models/entry-model.mjs";

const getEntries = async (req, res) => {
  // return only logged in user's own entries
  // - get user's id from token (req.user.user_id)
  const result = await listAllEntriesById(req.user.user_id);
  if (!result.error) {
    res.json(result);
  } else {
    res.status(500);
    res.json(result);
  }
};

const getEntryById = async (req, res) => {
  const entry = await findEntryById(req.params.id);
  if (entry) {
    res.json(entry);
  } else {
    res.sendStatus(404);
  }
};

const postEntry = async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    console.log('Invalid input', errors.array());
    const error = new Error('Invalid input');
    error.status = 400;
    error.errors = validationErrors.errors;
    return next(error);
  }
  const {
    entry_date,
    mood,
    weight,
    sleep_hours,
    notes } = req.body;
  const user_id = req.user.user_id; 
  const newEntry = {
    user_id,
    entry_date,
    mood,
    weight,
    sleep_hours,
    notes,
  };
  const result = await addEntry(newEntry);

  if(result.error) {
    const error = new Error(result.error);
    error.status = 400;
    return next(error);

  }
  res.status(201).json({ message: 'New entry added.', ...result});

};
const putEntry = async (req, res) => {
  const entry_id = req.params.id;

  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });

  }

if(entry_id) {
  try {
    const userIdFromToken = req.user.user_id;

    const entry = await findEntryById(entry_id);
    if(!entry) {
      return req.status(404).json({ error: 'Entry not found' });
    }
    if(entry.user_id !== userIdFromToken) {
      return res.status(403).json({ error: 'Unauthorized'});
    }
    const result = await updateEntryById({ entry_id, ...req.body});
    return res.status(200).json(result);
    } catch(error) {
      console.error('Error updating entry:', error);
      return res.status(500).json({ error: 'Internal server error'})
    }
  } else {
    return res.status(400).json({ error: 400, message: "Bad request" });
  }
};

const deleteEntry = async (req, res) => {
  const entryId = req.params.id;

  try {
    const userIdFromToken = req.user.user_id;

    const entry = await findEntryById(entryId);
    if (!entry) {
      return res.status(404).json({ error: "Entry not found" });
    }

    if (entry.user_id !== userIdFromToken) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const result = await deleteEntryById(entryId);
    if (result.error) {
      return res.status(result.error).json(result);
    }
    return res.json(result);
  } catch (error) {
    console.error("Error deleting entry:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export { getEntries, getEntryById, postEntry, putEntry, deleteEntry };
