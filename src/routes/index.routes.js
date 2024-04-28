import { Router } from "express";
import axios from "axios";
import dotenv from "dotenv";
// import { currentWeather } from "../controllers/currrentWeather.controller.js";

const router = Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/about", (req, res) => {
  res.render("about");
});

router.get("/weather", (req, res) => {
  res.render("weather");
});

router.post("/weather", async (req, res) => {
  const { city } = req.body;
  console.log(city);
  const apiKey = process.env.APIKEY;
  try {
    console.log("Api:", apiKey);
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );
    // https://api.openweathermap.org/data/2.5/weather?q=${Islamabad}&units=metric&appid=${apiKey}
    const data = response;

    // console.log(arData);

    let currentDate = new Date();
    let weekDay = new Array();
    weekDay[0] = "Sunday";
    weekDay[1] = "Monday";
    weekDay[2] = "Tuesday";
    weekDay[3] = "Wednesday";
    weekDay[4] = "Thursday";
    weekDay[5] = "Friday";
    weekDay[6] = "Saturday";
    const today = weekDay[currentDate.getDay()];
    console.log("Today:", today);
    const today_date = currentDate.getDate();
    console.log("Today date:", today_date);
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Dec",
    ];

    const month = months[currentDate.getMonth()];
    console.log("Month:", month);
    const city_name = data.data.name;
    console.log(city_name);
    const country_name = data.data.sys.country;
    const temp = data.data.main.temp;
    const icon = data.data.weather[0].icon;

    const weatherData = {
      today: today,
      today_date: today_date,
      month: month,
      city_name: city_name,
      country_name: country_name,
      temp: temp,
      icon: icon,
    };
    console.log(weatherData);
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
  // try {
  //   const weatherData = currentWeather;
  //   res.render("weather", { weatherData });
  //   // res.json(weatherData);
  // } catch (error) {
  //   res.status(500).json({ error: "Internal Server Error" });
  // }
  // res.render("weather");
});

router.get("*", (req, res) => {
  res.render("404error", {
    errorMSg: "Opps! Page Not Found",
  });
});
export default router;
