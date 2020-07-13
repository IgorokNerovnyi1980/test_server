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

const queries = {
  getAllData:
    "select * from products left join product_img on products.id=product_img.product_id",
  createNew:
    "insert into products(label, description, price) values($1, $2, $3) returning *",
  update:
    "update products SET label=$2, SET description=$3, set price=$4 WHERE id=$1",
  delete: "delete from product_img where id =$1",
  addImg: "insert into product_img(url,product_id) values($1, $2)",
  updateImg: "update product_img SET url=$2 WHERE product_id=$1",
  deleteImg: "delete from product_img where product_id = $1",
};

const getProducts = () => {
  console.log("getProducts for db");
  return new Promise(function (resolve, reject) {
    pool.query(queries.getAllData, (error, results) => {
      if (error) {
        console.log(" getProducts reject", error);
        reject(error);
      }
      console.log(" getProducts resolve");
      resolve(results.rows);
    });
  });
};

const addImgLink = (newUrl) => {
  return new Promise(function (resolve, reject) {
    const data = getProducts();
    console.log("test", data.length);
    const id = data.length + 1;
    pool.query(quries.addImg, [id, newUrl], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(`A new imgs link was added for product with id:${id}`);
    });
  });
};

const updateImgLink = (newUrl, productId) => {
  return new Promise(function (resolve, reject) {
    pool.query(quries.updateImg, [productId, newUrl], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(`A new imgs link was added for product with id:${productId}`);
    });
  });
};

const deleteImgLink = (productId) => {
  return new Promise(function (resolve, reject) {
    pool.query(quries.deleteImg, [productId], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(`A imgs link was deleted for product with id:${productId}`);
    });
  });
};

const createProduct = (body) => {
  console.log("in create fn", body);
  return new Promise(function (resolve, reject) {
    const { label, description, price } = body;
    pool.query(
      quries.createNew,
      [label, description, Number(price)],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`A new product has been added added: ${results.rows[0]}`);
      }
    );
  });
};

const updateProduct = (body) => {
  return new Promise(function (resolve, reject) {
    const { id, label, description, price, url } = body;
    pool.query(
      quries.createNew,
      [id, label, description, price],
      (error, results) => {
        if (error) {
          reject(error);
        }
        updateImgLink(url, id);
        resolve(`A product with id:${id} has been update`);
      }
    );
  });
};

const deleteProduct = (id) => {
  console.log("in delete fn");
  return new Promise(function (resolve, reject) {
    // const id = Number(request.params.id);
    console.log("in fn", id, typeof id);
    pool.query(quries.delete, [Number(id)], (error, results) => {
      console.log("pool");
      if (error) {
        console.log("reject", error);
        reject(error);
      }
      console.log("resolve");
      deleteImgLink(id);
      resolve(`was deleted product with ID: ${id}`);
    });
  });
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
