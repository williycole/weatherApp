const URL = "https://api.openweathermap.org/data/2.5/";
const KEY = 'e70d740e3c3e8dcc214358600ed578f3';
const units = 'imperial';
const cnt = 7;
let currentCity  = ['Memphis','Denver','Southaven']
let currentState = ['TN','CO','MS']
let currentLat = [35.15, 0]
let currentLon = [-90.05, 0]

////Fetch Current Weather Data
function currentWeather() {
    fetch(`${URL}weather?q=${currentCity},${currentState},US&appid=${KEY}`)
    .then(response => {
        if(!response.ok) {
            throw Error("ERROR");
        }
////FOR TESTING
// console.log(response);
        return response.json();
    })
    .then(data => {
////FOR TESTING
console.log(data);
        ////Grabs current weather conditions and appends them to the page
        const currentWeatherDescription = data.weather[0].description.toUpperCase();
        const currentWeatherIcon = data.weather[0].icon;
        const currentTempK = (data.main.temp);
        const currentTempF = (currentTempK - 273.15) * (9/5) + 32;
////FOR TESTING
// console.log(currentWeatherIcon)
        const currentData = `
        <div id="current-data">
            <h1 id="default-city">${currentCity[0]}, ${currentState[0]}</h1>
            <h1 id="current-day">Current Weather Conditions</h1>
            <div id="conditions-div">
                <img src="http://openweathermap.org/img/w/${currentWeatherIcon}.png" alt="weather icon" class="main-weather-icon"></img>
                <p>${currentWeatherDescription}</p>
            </div>
            <h1 id="current-temp">${Math.round(currentTempF)}&#8457</h1>
            <p id="time"></p>
        </di>
        `;
        ////Determines the time of day and sets the background image for night vs day
        const offSet = data.timezone /3600;
        const utcHours = new Date().getUTCHours();
        const timeCorrection =  (utcHours) + (offSet);
////FOR TESTING
// console.log(offSet);
// console.log(utcHours);
// console.log(timeCorrection);
            const changeToNight = document.querySelector("#current-data");
            if (timeCorrection >= 17 || timeCorrection <= 6) {
                console.log('its night')
                document.body.style.backgroundImage = "url('./styles/pictures/cityScape/NoTextNight.svg')";
                console.log(changeToNight)
            } else {
                console.log('its day')
                // document.body.style.background = "yellow";
                document.body.style.backgroundImage = "url('./styles/pictures/cityScape/NoTextDay.svg')";
            }
        document.querySelector('#current-conditions').insertAdjacentHTML('afterend', currentData);
        ////Updates location and arrys with data for current location as well as checks if valid city was input by user
        let updateArrays = document.querySelector('#select-location-button');
        updateArrays.addEventListener('click', function(event) {
        let oldCurrentData = document.querySelector('#current-data');
        let updatedCity = document.querySelector('#city').value;
        let updatedState = document.querySelector('#state').value;
        let updatedLat = data.coord.lat;
        let updatedLon = data.coord.lon;

        /*////all below will replace code right below it
        if(updatedCity === not a city || updatedState === not a state) {
            update dom user and do not push or change anything
        } else {
            oldCurrentData.remove();
            currentCity.unshift(updatedCity)
            console.log(currentCity);////FOR TESTING
            currentState.unshift(updatedState)
            console.log(currentState);////FOR TESTING
            let sevenDaysSection = document.querySelector('#seven-days-section');
            ////Removes and Updates Dom With New Seven Day Section
            sevenDaysSection.remove();
            let newSevenDaySection = `
                <section id="seven-days-section">
                </section>
            `;
            const appendNewSevenDaySec = document.querySelector('#current-weather-section');
            appendNewSevenDaySec.insertAdjacentHTML('afterend', newSevenDaySection)
            ////call fetch Data
             weatherApp();
            // document.getElementById('select-location-button').addEventListener("click", function(event) {
            //      event.preventDefault();
            // })
            console.log('test')////FOR TESTING
            event.preventDefault();
        }
    */


        oldCurrentData.remove();
        currentCity.unshift(updatedCity)
        currentState.unshift(updatedState)
        currentLat.unshift(updatedLat);
        currentLon.unshift(updatedLon);
        let sevenDaysSection = document.querySelector('#seven-days-section');
        ////Removes and Updates Dom With New Seven Day Section
        sevenDaysSection.remove();
        let newSevenDaySection = `
            <section id="seven-days-section">
            </section>
        `;
        const appendNewSevenDaySec = document.querySelector('#current-weather-section');
        appendNewSevenDaySec.insertAdjacentHTML('afterend', newSevenDaySection)
////FOR TESTING
//  console.log(currentLat)
//  console.log(currentLon)
//  console.log(currentCity);
//  console.log(currentState);
         event.preventDefault();
        });
    })
    .catch(error => {
        console.log(error);
    });
}
currentWeather();


////Fetch day for 27 day forcast
function sevenDayData(){
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${currentLat[0]}&lon=${currentLon[0]}&appid=${KEY}`)
    .then(response => {
        if(!response.ok) {
            throw Error("ERROR");
        }
////FOR TESTING
// console.log(response);
        return response.json();
    })
    .then(data => {
////FOR TESTING
// console.log(data);
        for(let i = 1; i < data.daily.length -2; i++) {////check this tomorrow for errors
            var allDays= ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            var d = new Date(data.daily[i].dt * 1000); // to get the DateTime.
            var dayName = allDays[d.getDay()]; // It will give day index, and based on index we can get day name from the array.
////FOR TESTING
// console.log(dayName)
            const daysCurrentTempK = (data.daily[i].temp.day)
            const daysCurrentTempF = (daysCurrentTempK - 273.15) * (9/5) + 32;
            const weatherDescription = data.daily[i].weather[0].description.toUpperCase();/// all weather description
            const weatherIcon = data.daily[i].weather[0].icon;/// all weather description
            // const loadIcon = `http://openweathermap.org/img/w/${weatherIcon}.png`;
            const humidity = data.daily[i].humidity;/// all humidity for days

            const sevenDayData = `
                <figure class="seven-day-conditions-container">
                    <h1 class="day-text sev-dy-txt">${dayName}</h1>
                    <h2 class="day-text sev-dy-txt">${Math.round(daysCurrentTempF)}&#8457</h2>
                    <img src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="weather icon" class="weather-icons">
                        <p class="day-text sev-dy-txt">${weatherDescription}</p>
                    </img>
                    <!--
                    <ul class="weather-misc-data" class="day-text sev-dy-txt">
                        <li class="weather-data-mi sc-item day-text sev-dy-txt">Humidity: ${humidity}&#8457</li>
                    </ul>
                    -->
                </figure>
            `;
            document.querySelector('#seven-days-section').insertAdjacentHTML('afterbegin', sevenDayData);
        }
    })
    .catch(error => {
        console.log(error);
    });
}
sevenDayData()

////Listen for location update and rerun current and 7 day functions
let updateArrays = document.querySelector('#select-location-button');
updateArrays.addEventListener('click', function(event) {
    currentWeather();
    sevenDayData();
});