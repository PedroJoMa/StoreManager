module.exports = (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'Product not found' });
  }

  return next();
};