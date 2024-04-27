import express from "express";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

dotenv.config({
  path: "./.env",
});

const app = express();
const port = process.env.PORT || 3000;

//public static path
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDirectory = path.resolve(__dirname, "..", "public");

console.log(publicDirectory);

app.use(express.static(publicDirectory));

app.get("", (req, res) => {
  res.send("welcome");
});

app.get("/about", (req, res) => {
  res.send("welcome to about");
});

app.get("/weather", (req, res) => {
  res.send("welcome to weather");
});

app.get("*", (req, res) => {
  res.send("404 error page");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
