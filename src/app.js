import express from "express";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import bodyParser from "body-parser";
import cors from "cors";
import hbs from "hbs";
import router from "./routes/index.routes.js";

dotenv.config({
  path: "./.env",
});

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(bodyParser.json());
//public static path
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDirectory = path.resolve(__dirname, "..", "public");
const template_path = path.resolve(__dirname, "..", "templates/views");
const partials_path = path.resolve(__dirname, "..", "templates/partials");

app.use(express.static(publicDirectory));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

// app.get("", (req, res) => {

// });

app.use("", router);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
