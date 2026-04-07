// backend/config/db.js
const sql = require("mssql");


const config = {
  user: "sa",             
  password: "",           
  server: "localhost",   
  database: "url_shortener",
  options: {
    encrypt: false,              
    trustServerCertificate: true  
  },
  port: 1433                     
};


const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log("✅ DB Connected successfully!");
    return pool;
  })
  .catch(err => {
    console.log("❌ DB Connection Failed:", err);
    process.exit(1); 
  });

module.exports = { sql, poolPromise };