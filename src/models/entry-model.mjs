// Note: db functions are async and must be called with await from the controller
// How to handle errors in controller?
import promisePool from '../utils/database.mjs';

const listAllEntries = async () => {
  try {
    const [rows] = await promisePool.query('SELECT user_id, entry_id, entry_date, mood, weight, sleep_hours, notes FROM DiaryEntries');
    console.log('rows', rows);
    return rows;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const findEntryById = async (id) => {
  try {
    const sql = 'SELECT * FROM DiaryEntries WHERE entry_id = ?';
    const params = [id];
    const [rows] = await promisePool.query(sql, params);
    if(rows.length === 0) {
      return {error: 404, message: 'Entry not found'};
    }
    return rows[0];
  } catch (error) {
    console.error('findEntryById', error);
    return {error: 500, message: 'Database error'};
  }
};
const updateEntryById = async (entry_id, entry) => {
  try {
      const sql = 'UPDATE DiaryEntries SET mood=?, weight=?, sleep_hours=?, notes=?, created_at=? WHERE entry_id=?';
      const params = [entry.mood, entry.weight, entry.sleep_hours, entry.notes, entry.created_at, entry_id];
      await promisePool.query(sql,params);
      return {message: 'Entry data updated', entry_id: entry_id};
  } catch (error) {
      console.error('updatedEntryById', error);
      return {error: 500, message: 'db error'};
  }
};
const deleteEntryById = async(id) => {
    try {
        const sql = 'DELETE FROM DiaryEntries WHERE entry_id=?';
        const params = [id];
        const [result] = await promisePool.query(sql, params);
        console.log(result);
        if(result.affectedRows === 0) {
            return {error: 404, message: 'entry not found'};
        }
        return {message: 'entry deleted', entry_id: id};
    } catch (error) {
        console.error('deleteEntryById', error);
        return {error: 500, message: 'db error'};
    }
};
export {listAllEntries, findEntryById, updateEntryById, deleteEntryById};
