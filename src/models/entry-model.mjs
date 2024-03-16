import promisePool from '../utils/database.mjs';
//function to retrieve list of all diaryentries with associated usernames from the database
const listAllEntries = async () => {
  try {
    const [rows] = await promisePool.query(`
      SELECT d.*, u.username
      FROM DiaryEntries d
      JOIN Users u ON d.user_id = u.user_id
    `);
    console.log('rows', rows);
    return rows;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};
//function to retrieve list of all diaryentries associated with specific user_id from the database
const listAllEntriesById = async (id) => {
  try {
    const sql = `
      SELECT d.*, u.username
      FROM DiaryEntries d
      JOIN Users u ON d.user_id = u.user_id
      WHERE d.user_id=?
    `;
    const params = [id];
    const [rows] = await promisePool.query(sql, params);
    console.log('rows', rows);
    return rows;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};
//function to find diaryentry by its id in the database
const findEntryById = async (id) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT * FROM DiaryEntries WHERE entry_id = ?',
      [id],
    );
    return rows[0];
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};
//function to add new diaryentry to the database
const addEntry = async (entry) => {
  const {user_id, entry_date, mood, weight, sleep_hours, notes} = entry;
  const sql = `INSERT INTO DiaryEntries (user_id, entry_date, mood, weight, sleep_hours, notes)
               VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [user_id, entry_date, mood, weight, sleep_hours, notes];
  try {
    const [rows] = await promisePool.query(sql, params);
    console.log('rows', rows);
    return {entry_id: rows.insertId};
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};
//function to update existing diaryentry by id from the database
const updateEntryById = async (entry) => {
  const {entry_id, entry_date, mood, weight, sleep_hours, notes} = entry;
  try {
    const sql =
      'UPDATE DiaryEntries SET entry_date=?, mood=?, weight=?, sleep_hours=?, notes=? WHERE entry_id=?';
    const params = [entry_date, mood, weight, sleep_hours, notes, entry_id];
    const [result] = await promisePool.query(sql, params);
    if (result.affectedRows === 0) {
      return {error: 404, message: 'entry not found'};
    }
    return {message: 'entry data updated', entry_id};
  } catch (error) {
    console.error('updateEntryById', error);
    return {error: 500, message: 'db error'};
  }
};
//function to delete diaryentry by its id from the database
const deleteEntryById = async (id) => {
  try {
    const sql = 'DELETE FROM DiaryEntries WHERE entry_id=?';
    const params = [id];
    const [result] = await promisePool.query(sql, params);
    if (result.affectedRows === 0) {
      return {error: 404, message: 'entry not found'};
    }
    return {message: 'entry deleted', entry_id: id};
  } catch (error) {
    console.error('deleteEntryById', error);
    return {error: 500, message: 'db error'};
  }
};

export {
  listAllEntries,
  listAllEntriesById,
  findEntryById,
  addEntry,
  updateEntryById,
  deleteEntryById,
};
