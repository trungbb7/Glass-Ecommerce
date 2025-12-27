import jsonServer from "json-server";
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use((req, res, next) => {
  res.setHeader("Access-Control-Expose-Headers", "X-Total-Count");
  next();
});

server.use(router);

server.listen(3000, () => {
  console.log("JSON Server running on port 3000");
});
