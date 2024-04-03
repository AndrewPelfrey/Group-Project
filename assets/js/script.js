<<<<<<< Updated upstream
// GRABBING ELEMENTS FROM THE DOM
let buttonEl = document.querySelector("#submit");
let searchHistoryEl = document.querySelector("#search-history");
let currentCity = document.querySelector("#current-location-input")
let city = document.querySelector("#desired-location-input");


// ADDING GOOGLE MAPS API
(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})
          ({key: "AIzaSyCV-KxEPg8JUzGUCcmCjBZv3hS5woEOVoM", v: "weekly"});

// VARIABLE DECLARATION
=======
>>>>>>> Stashed changes
let map;
let mapPreset;

<<<<<<< Updated upstream
async function initMap() {
// CLEVELAND COORDINATES
  const position = { lat: 41.4993, lng: -81.6944 };

// IMPORTING MAP LIBRAIES
  const { Map } = await google.maps.importLibrary("maps");

// MAP CENTERING ON CLEVELAND, DECLARED BY mapID 
  map = new Map(document.getElementById("map"), {
=======
function initMap() {
  // Cleveland coordinates
  mapPreset = { lat: 41.4993, lng: -81.6944 };

  const { Map } = google.maps.importLibrary("maps");

  map = new google.maps.Map(document.getElementById("map"), {
>>>>>>> Stashed changes
    zoom: 11,
    center: mapPreset,
    mapId: "Cleveland",
    
  });
}

<<<<<<< Updated upstream
// JS FOR BULMA MODAL
=======
var directionsService = new google.maps.DirectionsService();

var directionsDisplay = new google.maps.DirectionsRenderer(); 

directionsDisplay.setMap(map);

const submit = document.getElementById("submit");
submit.addEventListener('click', calcRoute);

// calculating routes from start to destination
function calcRoute() {
  var request = {
    origin: document.getElementById("current-location-input").value,
    destination: document.getElementById("desired-location-input").value,
    // travel mode: driving, walking, bicycle, train, etc
    travelMode: google.maps.TravelMode.DRIVING,
    // using miles
    unitSystem: google.maps.UnitSystem.IMPERIAL,
  };
  console.log(calcRoute)

  directionsService.route(request, (result, status) => {
    if (status == google.maps.DirectionsStatus.OK) {
      console.log(result);

      directionsDisplay.setDirections(result);
    } else {
      console.log(error);

      map.setCenter(mapPreset);
    }
  });
}

initMap();


// JS for Bulma Modal
>>>>>>> Stashed changes
const openModalButton = document.getElementById('openModal');
const closeModalButton = document.getElementById('closeModal');
const modal = document.getElementById('myModal');

openModalButton.addEventListener('click', function() {
    modal.classList.add('is-active');
  });

closeModalButton.addEventListener('click', function() {
    modal.classList.remove('is-active');
  });

// FUNCTION TO HANDLE FORM SUBMISSION AND LOCATION SEARCH
function handleLocationSearch(event) {
  // Implementation to search for a location and retrieve sunset data
}

// FUNCTION TO DISPLAY CURRENT SUNSET TIMES
function getSunsetTime(latitude, longitude, date) {
  const apiUrl = `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&date=${date}&formatted=0`;

  fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
          const sunset = new Date(data.results.sunset);

          const options = {
              timeZone: 'America/New_York',
              hour: 'numeric',
              minute: 'numeric',
              second: 'numeric'
          };

          const sunsetTime = sunset.toLocaleTimeString('en-US', options);

          const sunsetElement = document.getElementById('sunset-time');
          sunsetElement.innerHTML = `<h3>Sunset Time: ${sunsetTime}</h3>`;
      })
      .catch(error => console.error('Error fetching sunset time:', error));
}

const latitude = 41.4993; // Latitude of Cleveland
const longitude = -81.6944; // Longitude of Cleveland
const date = '2024-04-8'; // Project Due Date

getSunsetTime(latitude, longitude, date);

// FUNCTION TO DISPLAY TOMORROW'S SUNSET TIMES
function displayTomorrowsSunset(location, sunsetData) {
  // Implementation to display tomorrow's sunset times
}

// FUNCTION TO DISPLAY SUNSET WEATHER
function fetchWeatherData(city) {
    let openWeatherQueryURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=289d20f1ae5e1a64488055403d91c79b`;
    
    fetch(openWeatherQueryURL)
        .then(function (response) {
            if(!response.ok) {
                throw response.json();
            }
            return response.json();
        })
    
        .then(function (data) {
            console.log(data); // Returns an array object with cities and lat/long coordinates
    
            const lat = data[0].lat;
            const lon = data[0].lon;
    
            console.log(lat);
            console.log(lon);
    
            // Using latitude and longitude to get forcast data
            let openForecastQueryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=289d20f1ae5e1a64488055403d91c79b&units=imperial`
    
            return fetch(openForecastQueryURL)
        })
                
        .then(function (response) {
            if(!response.ok) {
                throw alert('Error fecthing forecast data:')
            }
            return response.json();
        })
    
        .then(function (forecastData) {
            console.log(forecastData.list[0].main.temp);
    
            renderResults(forecastData); // Calls function to display current weather
            // Save to localStorage
            saveToLocalStorage(city);
            // Update search history display
            displaySearchHistory();
        })
    
        .catch(function (error) {
            console.log(error);
            alert('Error fetching weather data:', error);
        });
    
    }

// FUNCTION TO SAVE THE SEARCHED CITY TO LOCALSTORAGE
function saveToLocalStorage(city) {
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    // Add the searched city to the search history array
    searchHistory.push(city);

    // CREATED BY CHATGPT: Keep only the last 8 entries in the search history array
    if (searchHistory.length > 4) {
        searchHistory = searchHistory.slice(-4);
    }
    // Save the updated search history array back to localStorage
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
}

// Function to display search history from localStorage
function displaySearchHistory() {
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    // Clear the existing search history displayed on the page
    searchHistoryEl.innerHTML = '';

    // Loop through the search history array and create list items to display each searched city

    // Add event listener to each list item to handle click event
    
    // Call fetchWeatherData function with the clicked city

    // Need to finish this function to append to the searchHistoryEl
}
// FUNCTION TO TOGGLE BETWEEN LIGHT AND DARK MODE
const themeSwitcher = document.getElementById("theme-switcher");
    themeSwitcher.addEventListener("change", function() {
        if (this.checked) {
            document.documentElement.classList.add("dark-theme");
        } else {
            document.documentElement.classList.remove("dark-theme");
        }
    });

<<<<<<< Updated upstream
// ADDING CURRENT TIME STAMP
=======
// adding current time stamp
>>>>>>> Stashed changes
const currentTime = dayjs().format(`h:mm A`);
$(`#timeStamp`).text(`Time: ` + currentTime);

// SUBMIT BUTTON EVENT LISTENER
buttonEl.addEventListener('submit', handleLocationSearch());

// CALLING ALL NECESSARY FUNCTIONS ON DOCUMENT PAGE LOAD
$(document).ready(function() {
    $('<div id="datepicker"></div>').insertAfter('label[for="datepicker"]').datepicker();

    $('#datepicker').datepicker({
        dateFormat: 'yy-mm-dd',
        changeMonth: true, 
        changeYear: true 
    });

    initMap();
});

