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

server.use(router);

server.listen(3000, () => {
  console.log("JSON Server is running at http://localhost:3000");
});
