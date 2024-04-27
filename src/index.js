import express from "express";

const app = express();
const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("welcome");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port 80000`);
});
