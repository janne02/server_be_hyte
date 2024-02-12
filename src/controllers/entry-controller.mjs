import {
  listAllEntries,
  findEntryById,
  updateEntryById,
  deleteEntryById,
} from '../models/entry-model.mjs';

const getEntries = async (req, res) => {
  try {
    const result = await listAllEntries();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
}

const getEntryById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await findEntryById(id);
    return res.json(result);
} catch (error) {
    return res.status(500).json({ error: 'Server Error' });
}
};
const putEntry = (req, res) => {
    // placeholder for future implementation
    res.sendStatus(200);
};
const deleteEntry = async (req, res) => {
  const result = await deleteEntryById(req.params.id);
  if (result.error) {
    return res.status(result.error).json(result);
  }
  return res.json(result);
};

export {getEntries, getEntryById, putEntry, deleteEntry};
