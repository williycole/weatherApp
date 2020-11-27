////dont uncomment out here copy then take to main script and test
/////Redo with this in reacth
/////https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
////chain then's together and use aysnc/await





// const KEY = 'b3638aa8f784f7ed596080c809e2bd91';////tech901 key
const URL = "https://api.openweathermap.org/data/2.5/";
const KEY = 'e70d740e3c3e8dcc214358600ed578f3';////personal key
const units = 'imperial';
const cnt = 7;
let currentCity  = ['Memphis']
let currentState = ['TN']
let latArray = [35.15];
let lonArray = [-90.05]

////Fetch Current Weather Data
function currentWeather() {
    fetch(`${URL}weather?q=${currentCity[0]},${currentState[0]},US&appid=${KEY}`)
    .then(response => {
        if(!response.ok) {
            throw Error("ERROR");
        }
        return response.json();
    })
    .then(data => {
        console.log('current data below'),console.log(data); ////FOR TESTING
        ////Grabs current weather conditions and appends them to the page
        const currentLat = data.coord.lat;
        const currentLon = data.coord.lon;
        latArray.unshift(currentLat);
        lonArray.unshift(currentLon);
        // console.log(latArray), console.log(lonArray)

         const currentWeatherDescription = data.weather[0].description.toUpperCase();
         const currentWeatherIcon = data.weather[0].icon;
         const currentTempK = (data.main.temp);
         const currentTempF = (currentTempK - 273.15) * (9/5) + 32;
         const currentData = `
         <div id="current-data">
             <h1 id="default-city">${currentCity[0]}, ${currentState[0]}</h1>
             <ul>
                <li id="current-lat">${currentLat}</li>
                <li id="current-lon">${currentLon}</li>
             </ul>
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
         if (timeCorrection >= 17 || timeCorrection <= 6) {
             console.log('its night')
             document.body.style.backgroundImage = "url('./styles/pictures/cityScape/NoTextNight.svg')";
         } else {
             console.log('its day')
             // document.body.style.background = "yellow";
             document.body.style.backgroundImage = "url('./styles/pictures/cityScape/NoTextDay.svg')";
         }
        document.querySelector('#current-conditions').insertAdjacentHTML('afterend', currentData);

        let updateArrays = document.querySelector('#select-location-button');
        updateArrays.addEventListener('click', function(event) {
        let updatedCity = document.querySelector('#city').value;
        let updatedState = document.querySelector('#state').value;
        currentCity.unshift(updatedCity);
        currentState.unshift(updatedState);
////****latArray.unshift(currentLat);/////dont use these unshifts here here its double dipping
////****lonArray.unshift(currentLon);/////dont use these unshifts here here its double dipping
        console.log(latArray), console.log(lonArray);
        let oldCurrentData = document.querySelector('#current-data');
        console.log(oldCurrentData)
        oldCurrentData.remove();
        let sevenDaysSection = document.querySelector('#seven-days-section');
        ////Removes and Updates Dom With New Seven Day Section
        sevenDaysSection.remove();
        let newSevenDaySection = `
        <section id="seven-days-section">
        </section>
        `;
        const appendNewSevenDaySec = document.querySelector('#current-weather-section');
        appendNewSevenDaySec.insertAdjacentHTML('afterend', newSevenDaySection)
        currentWeather();
        setTimeout(function(){  sevenDayData(); }, 1000);
        event.preventDefault();
        });
    })
    .catch(error => {
        console.log(error);
    });
}
currentWeather();


function sevenDayData(){
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latArray[0]}&lon=${lonArray[0]}&exclude=minutely,hourly,alerts&appid=${KEY}`)
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
        console.log('one call data below'),console.log(data);
        for(let i = 1; i < data.daily.length -2; i++) {////check this tomorrow for errors
        var allDays= ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        var d = new Date(data.daily[i].dt * 100); // to get the DateTime.
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
