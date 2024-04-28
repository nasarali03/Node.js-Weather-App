import express from "express";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import hbs from "hbs";

dotenv.config({
  path: "./.env",
});

const app = express();
const port = process.env.PORT || 3000;

//public static path
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDirectory = path.resolve(__dirname, "..", "public");
const template_path = path.resolve(__dirname, "..", "templates/views");
const partials_path = path.resolve(__dirname, "..", "templates/partials");

app.use(express.static(publicDirectory));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.get("", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/weather", (req, res) => {
  res.render("weather");
});

app.get("*", (req, res) => {
  res.render("404error", {
    errorMSg: "Opps! Page Not Found",
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
