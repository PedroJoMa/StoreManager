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

// Função generateDate gera data para inserir um produto no banco de dados;
// const generateDate = () => {
//   const d = new Date();
//   const day = d.getDate();
//   const month = d.getMonth() + 1;
//   const year = d.getFullYear();
//   const hour = d.getHours();
//   const minutes = d.getMinutes();
//   const seconds = d.getSeconds();
//   const date = `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
  
//   return date;
// };

// const insert = async (sale) => {
//   const timeNow = generateDate();

//   const columns = Object.keys(snakeize(sale)).join(', ');

//   const placeholders = Object.keys(sale)
//     .map((_key) => '?')
//     .join(', ');

//   const insertTableSales = await connection.execute(
//     'INSERT INTO StoreManager.sales (date) VALUES (?)',
//     [timeNow],
//   );

//   const insertTableSalesProduct = await connection.execute(
//     'INSERT INTO StoreManager.sales_products () VALUES ()',
//     [],
//   );

// };

module.exports = {
  findAll,
  findById,
  // insert,
};

// {
//   "id": 3,
//   "itemsSold": [
//     {
//       "productId": 1,
//       "quantity": 1
//     },
//     {
//       "productId": 2,
//       "quantity": 5
//     }
//   ]
// }

// SELECT COUNT(id)
// FROM StoreManager.sales;