import app from "./express";

app.get("/x", (req, res) => {
  res.status(201);
  res.setHeader("teste", "123");
  res.send(`${req.method} - ${req.url}`);
});
app.get("/x2", (req, res) => res.send(`${req.method} - ${req.url}`));
app.get("/x1", (req, res) => res.send(`${req.method} - ${req.url}`));

app.post("/teste", (req, res) => {
  // console.log(req);
  console.log(req.body);
  // const { teste } = req.body;
  res.send(req.body);
});

app.listen(8000, () => {
  console.log("testando servidor - 8000");
});
