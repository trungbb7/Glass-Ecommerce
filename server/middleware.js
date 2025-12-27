module.exports = (req, res, next) => {
  // Cho phép trình duyệt truy cập vào các header tùy chỉnh
  res.header("Access-Control-Expose-Headers", "x-total-count");
  next();
};
