const camelize = require('camelize');
// const snakeize = require('snakeize');
const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    `
    SELECT spdt.sale_id, s.date, spdt.product_id, spdt.quantity
    FROM StoreManager.sales_products AS spdt
    INNER JOIN StoreManager.sales AS s
    ON spdt.sale_id = s.id
    ORDER BY sale_id ASC;
    `,
  );
      return camelize(result);
};

const findById = async (saleId) => {
  const [sale] = await connection.execute(
    `
    SELECT s.date, spdt.product_id, spdt.quantity
    FROM StoreManager.sales_products AS spdt
    INNER JOIN StoreManager.sales AS s
    ON spdt.sale_id = s.id
    WHERE sale_id = ?
    ORDER BY sale_id ASC;
    `,
    [saleId],
  );

  return camelize(sale);
};

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
  findById,
  // insert,
};