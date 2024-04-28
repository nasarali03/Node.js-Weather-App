const submitBtn = document.getElementById("submitBtn");
const cityName = document.getElementById("cityName");

const city_name = document.getElementById("city_name");

const temp_status = document.getElementById("temp_status");
const temp = document.getElementById("temp");
const imageIcon = document.getElementById("image");

const day = document.getElementById("day");
const today_date = document.getElementById("today_date");
const Month = document.getElementById("month");

const dataHide = document.querySelector(".middle_layer");

const getInfo = async (event) => {
  event.preventDefault();

  let apiKey = "07c2a694609e096e80b0cd504fcc3143";
  let city = cityName.value;

  if (city === "") {
    city_name.innerText = "Plz enter the name and then search";
    dataHide.classList.add("data_hide");
  } else {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();
      //   console.log(data);
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
      let today = weekDay[currentDate.getDay()];
      day.innerText = today;

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
      let month = months[currentDate.getMonth()];
      Month.innerText = month;
      today_date.innerText = currentDate.getDate();
      city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
      temp.innerText = `${arrData[0].main.temp} `;

      const icon = arrData[0].weather[0].icon;
      imageIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}@2x.png" width="100px"> `;
      dataHide.classList.remove("data_hide");
    } catch (error) {
      city_name.innerText = "Plz enter the correct name and then search";
      dataHide.classList.add("data_hide");
    }
  }
};

submitBtn.addEventListener("click", getInfo);
