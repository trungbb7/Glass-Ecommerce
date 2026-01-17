import jsonServer from "json-server";
import express from "express";
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// Default middlewares
server.use(middlewares);

// Middleware for json parsing
server.use(express.json());

server.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log(`Email: ${email}`);
  console.log(`Password: ${password}`);
  const db = router.db;
  const user = db.get("users").find({ email, password }).value();

  if (user) {
    res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        address: user.address,
        tel: user.tel,
        role: user.role,
        token: user.token,
      },
    });
  } else {
    res.status(401).json({ error: "Sai tài khoản hoặc mật khẩu" });
  }
});

server.post("/register", (req, res) => {
  const { email, fullName, address, tel, password } = req.body;
  const db = router.db;

  const userExists = db.get("users").find({ email }).value();

  if (userExists) {
    return res.status(400).json({ error: "Email đã tồn tại!" });
  }

  const timestamp = Date.now();
  const newUser = {
    id: timestamp,
    email,
    fullName,
    address,
    tel,
    password,
    role: "user",
    token: timestamp,
  };

  db.get("users").push(newUser).write();

  // 4. Trả về thông báo thành công (không trả về mật khẩu)
  const { password: _, ...userWithoutPassword } = newUser;
  res.status(201).json({
    message: "Đăng ký thành công!",
    user: userWithoutPassword,
  });
});

// Update user profile
server.patch("/users/:id/profile", (req, res) => {
  const { id } = req.params;
  const { fullName, address, tel, email } = req.body;
  const db = router.db;

  const user = db.get("users").find({ id: id }).value() ||
               db.get("users").find({ id: parseInt(id) }).value();

  if (!user) {
    return res.status(404).json({ error: "Người dùng không tồn tại" });
  }

  // Check if email is being changed and if it's already taken
  if (email && email !== user.email) {
    const emailExists = db.get("users").find({ email }).value();
    if (emailExists) {
      return res.status(400).json({ error: "Email đã được sử dụng" });
    }
  }

  // Update user
  const updatedUser = {
    ...user,
    fullName: fullName || user.fullName,
    address: address || user.address,
    tel: tel || user.tel,
    email: email || user.email,
  };

  db.get("users")
    .find({ id: user.id })
    .assign(updatedUser)
    .write();

  const { password: _, ...userWithoutPassword } = updatedUser;
  res.status(200).json({
    message: "Cập nhật thông tin thành công!",
    user: userWithoutPassword,
  });
});

// Change password
server.patch("/users/:id/password", (req, res) => {
  const { id } = req.params;
  const { currentPassword, newPassword } = req.body;
  const db = router.db;

  const user = db.get("users").find({ id: id }).value() ||
               db.get("users").find({ id: parseInt(id) }).value();

  if (!user) {
    return res.status(404).json({ error: "Người dùng không tồn tại" });
  }

  if (user.password !== currentPassword) {
    return res.status(400).json({ error: "Mật khẩu hiện tại không đúng" });
  }

  db.get("users")
    .find({ id: user.id })
    .assign({ password: newPassword })
    .write();

  res.status(200).json({ message: "Đổi mật khẩu thành công!" });
});

// Create order
server.post("/orders/create", (req, res) => {
  const { userId, items, shippingAddress, paymentMethod, voucherCode } = req.body;
  const db = router.db;

  // Calculate totals
  let totalAmount = 0;
  const orderItems = [];

  for (const item of items) {
    const product = db.get("products").find({ id: item.productId }).value();
    if (!product) {
      return res.status(400).json({ error: `Sản phẩm ${item.productId} không tồn tại` });
    }

    totalAmount += product.finalPrice * item.quantity;
    orderItems.push({
      productId: item.productId,
      name: product.name,
      quantity: item.quantity,
      price: product.finalPrice,
      selectedColor: item.selectedColor,
      imageUrl: product.images[0],
    });
  }

  // Calculate discount
  let discountAmount = 0;
  if (voucherCode) {
    const voucher = db.get("vouchers").find({ code: voucherCode }).value();
    if (voucher && totalAmount >= voucher.minOrderAmount) {
      discountAmount = voucher.discountAmount;
      // Decrease voucher quantity
      db.get("vouchers")
        .find({ code: voucherCode })
        .assign({ quantity: voucher.quantity - 1 })
        .write();
    }
  }

  const shippingFee = 30000;
  const finalAmount = totalAmount - discountAmount + shippingFee;

  const orderId = `ORD${Date.now()}`;
  const newOrder = {
    id: orderId,
    userId,
    items: orderItems,
    shippingAddress,
    paymentMethod,
    status: "PENDING",
    totalAmount,
    discountAmount,
    shippingFee,
    finalAmount,
    voucherCode: voucherCode || null,
    orderDate: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  db.get("orders").push(newOrder).write();

  // Clear user's cart
  const cart = db.get("carts").find({ userId: userId }).value() ||
               db.get("carts").find({ userId: String(userId) }).value();
  if (cart) {
    db.get("carts")
      .find({ id: cart.id })
      .assign({ items: [] })
      .write();
  }

  res.status(201).json({
    message: "Đặt hàng thành công!",
    order: newOrder,
  });
});

// Get user orders
server.get("/orders/user/:userId", (req, res) => {
  const { userId } = req.params;
  const { status } = req.query;
  const db = router.db;

  let orders = db.get("orders")
    .filter((order) => order.userId === userId || order.userId === String(userId))
    .value();

  if (status && status !== "all") {
    orders = orders.filter((order) => order.status === status);
  }

  // Sort by order date descending
  orders.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());

  res.status(200).json(orders);
});

// Cancel order
server.patch("/orders/:orderId/cancel", (req, res) => {
  const { orderId } = req.params;
  const db = router.db;

  const order = db.get("orders").find({ id: orderId }).value();

  if (!order) {
    return res.status(404).json({ error: "Đơn hàng không tồn tại" });
  }

  if (order.status !== "PENDING") {
    return res.status(400).json({ error: "Chỉ có thể hủy đơn hàng đang chờ xử lý" });
  }

  db.get("orders")
    .find({ id: orderId })
    .assign({ status: "CANCELLED", updatedAt: new Date().toISOString() })
    .write();

  res.status(200).json({ message: "Hủy đơn hàng thành công!" });
});

// Validate voucher
server.post("/vouchers/validate", (req, res) => {
  const { code, orderAmount } = req.body;
  const db = router.db;

  const voucher = db.get("vouchers").find({ code }).value();

  if (!voucher) {
    return res.status(404).json({ error: "Mã giảm giá không tồn tại" });
  }

  if (voucher.quantity <= 0) {
    return res.status(400).json({ error: "Mã giảm giá đã hết lượt sử dụng" });
  }

  if (new Date(voucher.expiryDate) < new Date()) {
    return res.status(400).json({ error: "Mã giảm giá đã hết hạn" });
  }

  if (orderAmount < voucher.minOrderAmount) {
    return res.status(400).json({
      error: `Đơn hàng tối thiểu ${voucher.minOrderAmount.toLocaleString()}đ để áp dụng mã này`
    });
  }

  res.status(200).json({
    valid: true,
    voucher: {
      code: voucher.code,
      description: voucher.description,
      discountAmount: voucher.discountAmount,
    },
  });
});

server.use(router);

server.listen(3000, () => {
  console.log("JSON Server is running at http://localhost:3000");
});
