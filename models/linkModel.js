// backend/models/linkModel.js
const { sql, poolPromise } = require("../config/db");

// ➤ Create Link
exports.createLink = async (longUrl, shortCode) => {
  try {
    const pool = await poolPromise;

    await pool
      .request()
      .input("longUrl", sql.NVarChar, longUrl)
      .input("shortCode", sql.NVarChar, shortCode)
      .query(`
        INSERT INTO links (long_url, short_code)
        VALUES (@longUrl, @shortCode)
      `);

    return { longUrl, shortCode };
  } catch (err) {
    console.error("DB Error createLink:", err.message);
    throw err;
  }
};

// ➤ Get Link by Short Code
exports.getLinkByCode = async (code) => {
  try {
    const pool = await poolPromise;

    const result = await pool
      .request()
      .input("code", sql.NVarChar, code)
      .query(`
        SELECT * FROM links WHERE short_code = @code
      `);

    return result.recordset[0]; // ترجع صف واحد
  } catch (err) {
    console.error("DB Error getLinkByCode:", err.message);
    throw err;
  }
};

// ➤ Increment Clicks
exports.incrementClicks = async (code) => {
  try {
    const pool = await poolPromise;

    await pool
      .request()
      .input("code", sql.NVarChar, code)
      .query(`
        UPDATE links SET clicks = clicks + 1
        WHERE short_code = @code
      `);
  } catch (err) {
    console.error("DB Error incrementClicks:", err.message);
    throw err;
  }
};

// ➤ Get All Links
exports.getAllLinks = async () => {
  try {
    const pool = await poolPromise;

    const result = await pool
      .request()
      .query(`
        SELECT * FROM links ORDER BY created_at DESC
      `);

    return result.recordset;
  } catch (err) {
    console.error("DB Error getAllLinks:", err.message);
    throw err;
  }
};