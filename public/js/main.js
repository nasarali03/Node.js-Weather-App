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

  let city = cityName.value;
  if (city === "") {
    city_name.innerText = "Plz enter the name and then search";
    dataHide.classList.add("data_hide");
  } else {
    try {
      console.log(city);
      fetch(`/weather`, {
        method: "POST", // Specify the HTTP method as POST
        headers: {
          "Content-Type": "application/json", // Specify the content type as JSON
        },
        body: JSON.stringify({ city: city }), // Convert data to JSON format
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          day.innerText = data.today;
          Month.innerText = data.month;
          today_date.innerText = data.today_date;
          city_name.innerText = `${data.city_name}, ${data.country_name}`;
          temp.innerText = `${data.temp} `;

          const icon = data.icon;
          imageIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}@2x.png" width="100px"> `;
          dataHide.classList.remove("data_hide");
        });
    } catch (error) {
      city_name.innerText = "Plz enter the correct name and then search";
      dataHide.classList.add("data_hide");
    }
  }
};

submitBtn.addEventListener("click", getInfo);
