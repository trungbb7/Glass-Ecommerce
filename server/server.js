import jsonServer from "json-server";
import express from "express";
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// Default middlewares
server.use(middlewares);

// Middleware đor json parsing
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

server.use(router);

server.listen(3000, () => {
  console.log("JSON Server is running at http://localhost:3000");
});
