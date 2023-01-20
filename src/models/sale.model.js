const camelize = require('camelize');
// const snakeize = require('snakeize');
const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    `
    SELECT spdt.sale_id, s.date, spdt.product_id, spdt.quantity
    FROM StoreManager.sales_products AS spdt
    INNER JOIN StoreManager.sales AS s
    ON spdt.sale_id = s.id;
    `,
  );
      return camelize(result);
};

// const findById = async (productId) => {
//   const [[sale]] = await connection.execute(
//     'SELECT * FROM StoreManager.sales WHERE id = ?',
//     [productId],
//   );

//   return camelize(sale);
// };

// const insert = async (sale) => {
//   const columns = Object.keys(snakeize(sale)).join(', ');

//   const placeholders = Object.keys(sale)
//     .map((_key) => '?')
//     .join(', ');

//   const [{ insertId }] = await connection.execute(
//   `INSERT INTO StoreManager.sales (${columns}) VALUE (${placeholders})`,
//   [...Object.values(sale)],
//   );
    
//   return insertId;
// };

module.exports = {
  findAll,
  // findById,
  // insert,
};