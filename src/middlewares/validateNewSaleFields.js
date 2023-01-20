module.exports = (req, res, next) => {
  const arraySales = req.body;
  arraySales.map((object) => {
    const { productId, quantity } = object;
    if (!productId) { 
      return res.status(400).json({ message: ' "productId" is required' });
    }

    if (!quantity) { 
      return res.status(400).json({ message: ' "quantity" is required' });
    }

    return 'Os campos estão preenchidos';
  });

  return next();
};