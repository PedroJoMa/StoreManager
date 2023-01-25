const camelize = require('camelize');
const snakeize = require('snakeize');
const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products;',
  );
  return camelize(result); 
};

const findById = async (productId) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [productId],
  );
  return camelize(product);
};

const insert = async (product) => {
  const columns = Object.keys(snakeize(product)).join(', ');

  const placeholders = Object.keys(product)
    .map((_key) => '?')
    .join(', ');
  
  const [{ insertId }] = await connection.execute(
  `INSERT INTO StoreManager.products (${columns}) VALUES (${placeholders})`,
  [...Object.values(product)],
  );
  
  return insertId;
};

const updateById = async (product) => connection.execute(
    `UPDATE StoreManager.products
     SET name = ?
     WHERE id = ?;`,
    [product.name, product.id],
  );

module.exports = {
  findAll,
  findById,
  insert,
  updateById,
};
