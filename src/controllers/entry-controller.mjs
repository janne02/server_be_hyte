import {validationResult} from 'express-validator';
import {
  listAllEntries,
  findEntryById,
  addEntry,
  deleteEntryById,
  updateEntryById,
  listAllEntriesById,
} from '../models/entry-model.mjs';
//function to GET requests to retrieve entries
const getEntries = async (req, res) => {
  try {
    let result;
    const userLevel = req.user.user_level;
      // Retrieve all entries if user is admin
    if (userLevel === 'admin') {
      result = await listAllEntries();
    } else {
      // Retrieve only logged-in user's entries if not admin
      result = await listAllEntriesById(req.user.user_id);
    }

    res.json(result);
  } catch (error) {
    console.error('Error getting entries:', error);
    res.status(500).json({error: 'Internal Server Error'});
  }
};

//function to GET requests to retrieve entries by id
const getEntryById = async (req, res) => {
  const entry = await findEntryById(req.params.id);
  if (entry) {
    res.json(entry);
  } else {
    res.sendStatus(404);
  }
};

//function to POST requests to add new entry
const postEntry = async (req, res, next) => {
  const errors = validationResult(req);

  // check for validation errors
  if (!errors.isEmpty()) {
    console.log('postEntry errors', errors.array());
    const error = new Error('Invalid input');
    error.status = 400;
    error.errors = validationErrors.errors;
    return next(error);
  }

   // Extract fields from request body
  const {entry_date, mood, weight, sleep_hours, notes} = req.body;
  // User ID added by authenticateToken middleware
  const user_id = req.user.user_id;
   // Combine fields into a new entry object
  const newEntry = {user_id, entry_date, mood, weight, sleep_hours, notes};
  const result = await addEntry(newEntry);

  if (result.error) {
    const error = new Error(result.error);
    error.status = 400;
    return next(error);
  }

  res.status(201).json({message: 'New entry added.', ...result});
};

//function to PUT requests to update entry
const putEntry = async (req, res, next) => {
  const entry_id = req.params.id;

  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }

  if (entry_id) {
    try {
      const userIdFromToken = req.user.user_id;

      const entry = await findEntryById(entry_id);
      if (!entry) {
        return res.status(404).json({error: 'Entry not found'});
      }
      // Check if the userId from token matches the userId
      if (entry.user_id !== userIdFromToken) {
        return res.status(403).json({error: 'Unauthorized'});
      }
      // If the user is authorized, update the entry
      const result = await updateEntryById({entry_id, ...req.body});
      return res.status(200).json(result);
    } catch (error) {
      console.error('Error updating entry:', error);
      return res.status(500).json({error: 'Internal server error'});
    }
  } else {
    return res.status(400).json({error: 400, message: 'Bad request'});
  }
};

// Function to handle DELETE requests for deleting an entry
const deleteEntry = async (req, res, next) => {
  const result = await deleteEntryById(req.params.id, req.user.user_id);
  if (result.error) {
    return next(customError(result.message, result.error));
  }
  return res.json(result);
};

export {getEntries, getEntryById, postEntry, putEntry, deleteEntry};
