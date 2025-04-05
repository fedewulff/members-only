require("dotenv").config();
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name VARCHAR ( 40 ) NOT NULL,
  last_name VARCHAR ( 40 ) NOT NULL,
  username VARCHAR ( 40 ) NOT NULL,
  password VARCHAR ( 255 ) NOT NULL,
  is_member BOOLEAN DEFAULT FALSE,
  is_admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS messages (
  member_id INTEGER NOT NULL,
  title VARCHAR ( 40 ) NOT NULL,
  message VARCHAR ( 150 ) NOT NULL,
  posting_date DATE NOT NULL DEFAULT CURRENT_DATE
);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.CONNECTION_STRING,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
