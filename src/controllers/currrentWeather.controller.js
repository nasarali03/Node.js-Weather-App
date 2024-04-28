import { asyncHandler } from "../utils/asyncHandler.js";
import axios from "axios";

const currentWeather = async (req, res, next) => {
  try {
    const city = req.query.city;
    const apiKey = process.env.APIKEY;
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${Islamabad}&units=metric&appid=${apiKey}`
    );
    const data = await response.json();
    console.log(data);
    const arrData = [data];

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

    const today_date = currentDate.getDate();
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

    const city_name = arrData[0].name;
    const country_name = arrData[0].sys.country;
    const temp = arrData[0].main.temp;
    const icon = arrData[0].weatherData[0].icon;

    const weatherData = {
      weekDay: weekDay,
      today_date: today_date,
      month: month,
      city_name: city_name,
      country_name: country_name,
      temp: temp,
      icon: icon,
    };
    return weatherData;
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default { currentWeather };
