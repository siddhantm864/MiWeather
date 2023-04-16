
const temperateField = document.querySelector(".weather1");
const cityField = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather2 span");
const emojiField = document.querySelector(".weather3 img");
const weatherField = document.querySelector(".weather3 span");
const searchField = document.querySelector(".searchField");
const form = document.querySelector("form");

// astro
const one = document.querySelector(".one span");
const two = document.querySelector(".two span");
const three = document.querySelector(".three span");
const four = document.querySelector(".four span");

// wind
const wind1 = document.querySelector(".w1 span");
const wind2 = document.querySelector(".w2 span");
const wind3 = document.querySelector(".w3 span");

// Adding event listen to the form
form.addEventListener("submit", search);


// Default Location
let target = "sultanpur";

// Function to fetch Data from Weather API
const fetchData = async (target) => {
  try {
    const url = `http://api.weatherapi.com/v1/forecast.json?key=56bd3d15a0dd4e68808123820231102&q=${target}&days=1&aqi=yes&alerts=no`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    // Destructuring
    const {
      current: {
        temp_c,
        condition: { text, icon },
        humidity,
        wind_dir,
        wind_kph,
        wind_degree,
        air_quality: { co, no2, o3, so2, us_epa_index }
      },
      location: { name, localtime },
      forecast: {
        forecastday: {
          0: {
            astro: {
              moonrise, moonset, sunrise, sunset
            }
          }
        }
      }

    } = data;

    // Calling update Dom Function
    updateDom(temp_c, name, localtime, icon, text, humidity, wind_dir,
      wind_kph,
      moonrise, moonset, sunrise, sunset);
  } catch (error) {
    // alert("Location not found");
  }
};

// Function to update Dom
function updateDom(temperate, city, time, emoji, text, humidity, wind_dir,
  wind_kph,
  moonrise, moonset, sunrise, sunset) {
  const exactTime = time.split(" ")[1];
  const exactDate = time.split(" ")[0];
  const exactDay = getDayFullName(new Date(exactDate).getDay());

  temperateField.innerText = temperate + '°C';
  cityField.innerText = city;
  dateField.innerText = `${exactTime} - ${exactDay}   ${exactDate}`;
  emojiField.src = emoji;
  weatherField.innerText = text;
  // astro
  one.innerText = "Sunrise   " + sunrise;
  two.innerText = "Sunset   " + sunset;
  three.innerText = "Moonrise  " + moonrise;
  four.innerText = "Moonset   " + moonset;
  // wind
  wind1.innerText = "Wind Speed =" + wind_kph + "Kph";
  wind2.innerText = "Wind Direction =" + wind_dir;
  wind3.innerText = "Humidity =" + humidity;
}

fetchData(target);

function search(e) {
  e.preventDefault();

  target = searchField.value;

  fetchData(target);
}

// Function to get the name of day
function getDayFullName(num) {
  switch (num) {
    case 0:
      return "Sunday";

    case 1:
      return "Monday";

    case 2:
      return "Tuesday";

    case 3:
      return "Wednesday";

    case 4:
      return "Thursday";

    case 5:
      return "Friday";

    case 6:
      return "Saturday";

    default:
      return "Don't Know";
  }
    }

