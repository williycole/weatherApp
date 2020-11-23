/////-----------------Working bugs/fixes list
////prevent default not working, get it to work?
////also need to save local storage when reload
////also need to add in units for wind direction
////also need to add weather gif function or icons
////add in errors for form control
////Set Time
//// const currDateAndTime = new Date();
//// const time = `
////     <p id="time">${currDateAndTime}</p>
//// `;
//// const appendTime = document.querySelector('#default-state');
//// appendTime.insertAdjacentHTML('afterend', time)


////_____PROGRAM STARTS HERE_____
////API Weather App data and Fetch variables
const KEY = 'e70d740e3c3e8dcc214358600ed578f3';
const URL = 'https://api.openweathermap.org/data/2.5/forecast';
const units = 'imperial';
const cnt = 7;
let currentCity  = ['Memphis','Denver','Southaven', 'TEST']
let currentState = ['TN','CO','MS', 'TEST']
///Fetch for 7 Day Forcast
function weatherApp() {
fetch(`${URL}?q=${currentCity[0]}&${currentState[0]}&units=${units}&cnt=${cnt}&appid=${KEY}`)
    .then(response => {
        if(!response.ok) {
            throw Error("ERROR");
        }
        console.log(response);
        return response.json();
    })
    .then(data => {
        const offSet = data.city.timezone /3600;
        console.log(offSet)
        const utcHours = new Date().getUTCHours();
        console.log(utcHours);
        const timeCorrection =  (utcHours) + (offSet);
        console.log(timeCorrection);

        if (timeCorrection >= 18 || timeCorrection <= 6) {
            console.log('its night')
            // document.body.style.background = "purple";
            document.body.style.backgroundImage = "url('./styles/pictures/cityScape/NoTextNight.svg')";
        } else {
            console.log('its day')
            // document.body.style.background = "yellow";
            document.body.style.backgroundImage = "url('./styles/pictures/cityScape/NoTextDay.svg')";
        }


        const currentWeatherDescription = data.list[0].weather[0].description.toUpperCase();/// all weather description
        const currentWeatherIcon = data.list[0].weather[0].icon;/// all weather description
        console.log(data)////FOR TESTING
        const currentData = `
            <div id="current-data">
                <h1 id="default-city">${currentCity[0]}</h1>
                <h1 id="default-state">${currentState[0]}</h1>
                <h1>${Math.trunc(data.list[0].main.temp)}&#8457</h1>
                <img src="http://openweathermap.org/img/w/${currentWeatherIcon}.png" alt="weather icon" class="weather-icons">
                    <p>${currentWeatherDescription}</p>
                </img>
                <p id="time"></p>
            </di>
        `;
        document.querySelector('#current-conditions').insertAdjacentHTML('afterbegin', currentData);
        for(let i = 1; i < data.list.length; i++) {
            const temp =Math.trunc(data.list[i].main.temp);/// all days temps
            const weatherDescription = data.list[i].weather[0].description.toUpperCase();/// all weather description
            const weatherIcon = data.list[i].weather[0].icon;/// all weather description
            // const loadIcon = `http://openweathermap.org/img/w/${weatherIcon}.png`;
            const feelsLike = Math.trunc(data.list[i].main.feels_like);/// all feels like temps for days
            const humidity = data.list[i].main.humidity;/// all humidity for days
            const windSpeed = data.list[i].wind.speed;/// all wind speed for days
            const windDirection = data.list[i].wind.deg;/// all wind direction
            const sevenDayData = `
                <figure class="seven-day-conditions-container">
                    <p class="day-text">${temp}&#8457</p>
                    <img src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="weather icon" class="weather-icons">
                        <p class="day-text">${weatherDescription}</p>
                    </img>
                    <ul class="weather-misc-data" class="day-text">
                        <li class="weather-data-misc-item day-text">Feels Like: ${feelsLike}&#8457</li>
                        <li class="weather-data-mi sc-item day-text">Humidity: ${humidity}&#8457</li>
                        <li class="weather-data-misc-item day-text">Wind Speed: ${windSpeed}</li>
                        <li class="weather-data-misc-item day-text">Wind Direction: ${windDirection} deg</li>
                    </ul>
                </figure>
            `;
            document.querySelector('#seven-days-section').insertAdjacentHTML('afterbegin', sevenDayData);
        }
        // console.log(data); /////FOR TESTING
    })
    .catch(error => {
        console.log(error);
    });
}
weatherApp();

let updateButton = document.querySelector('#select-location-button');
updateButton.addEventListener('click', function(event) {
    let oldCurrentData = document.querySelector('#current-data');
    let updatedCity = document.querySelector('#city').value;
    let updatedState = document.querySelector('#state').value;



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
    ////Fetch data again for update
    weatherApp();
    // document.getElementById('select-location-button').addEventListener("click", function(event) {
    //      event.preventDefault();
    // })
    console.log('test')////FOR TESTING
    event.preventDefault();
});

