const pool = require("./pool");

exports.doesUsernameExist = async function (username) {
  const { rows } = await pool.query("SELECT * FROM users WHERE username = ($1)", [username]);
  return rows;
};

exports.postSignUpData = async function (first_name, last_name, username, password) {
  await pool.query(
    "INSERT into users (first_name,last_name,username,password) VALUES ($1,$2,$3,$4)",
    [first_name, last_name, username, password]
  );
};

exports.getUserByUsername = async function (username) {
  const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
  return rows[0];
};

exports.getUserById = async function (id) {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return rows[0];
};

exports.getMessages = async function () {
  const { rows } = await pool.query(
    "SELECT username,title,message,posting_date FROM users JOIN messages ON users.id = messages.member_id"
  );
  return rows;
};

exports.setMessage = async function (member_id, title, message) {
  await pool.query("INSERT into messages (member_id,title,message) VALUES ($1,$2,$3)", [
    member_id,
    title,
    message,
  ]);
};
