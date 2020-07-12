const Pool = require("pg").Pool;

// const pool = new Pool({
//   user: process.env.USER,
//   host: process.env.HOST,
//   database: process.env.DB,
//   password: process.env.PASSWORD,
//   port: process.env.DB_PORT,
// });
const pool = new Pool({
  user: "server",
  host: "localhost",
  database: "werdb",
  password: "root",
  port: "5432",
});

const getProducts = () => {
  console.log("start request for db");
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM products ORDER BY id ASC", (error, results) => {
      if (error) {
        console.log("reject", error);
        reject(error);
      }
      console.log("resolve");
      resolve(results);
    });
  });
};

const createProduct = (body) => {
  return new Promise(function (resolve, reject) {
    const { name, email } = body;
    pool.query(
      "INSERT INTO product (name, email) VALUES ($1, $2) RETURNING *",
      [name, email],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`A new product has been added added: ${results.rows[0]}`);
      }
    );
  });
};

const deleteProduct = () => {
  return new Promise(function (resolve, reject) {
    const id = parseInt(request.params.id);
    pool.query("DELETE FROM products WHERE id = $1", [id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(`Product deleted with ID: ${id}`);
    });
  });
};

module.exports = {
  getProducts,
  createProduct,
  deleteProduct,
};
