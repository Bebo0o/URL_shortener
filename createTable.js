// createTable.js
const db = require("./config/db");

const createTable = async () => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS links (
      id SERIAL PRIMARY KEY,
      long_url TEXT NOT NULL,
      short_code VARCHAR(10) UNIQUE NOT NULL,
      clicks INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  console.log("Table created");
};

createTable();