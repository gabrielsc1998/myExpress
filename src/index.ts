import app from "./express";

app.get("/x", (req, res) => res.end(`${req.method}`));

app.listen(8000, () => {
  console.log("testando servidor - 8000");
});
