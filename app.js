const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.APP_PORT || 3000;

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.DB_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.DB_PORT
});

app.get('/', (req, res) => res.send('<h1>Web App is Running!</h1>'));

app.get('/db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW() AS now');
    res.send('Connected to DB! Server Time: ' + result.rows[0].now);
  } catch (err) {
    res.status(500).send('DB Connection Error: ' + err.message);
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));

