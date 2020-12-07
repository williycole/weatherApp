////NOTES FOR FUTURE UPDATES/ FUTURE REACT APP
////dont uncomment out here copy then take to main script and test
/////https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
/////https://developers.google.com/web/fundamentals/primers/async-functions
////chain then's together and use aysnc/await


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
            console.log('you goofed');////FOR TESTING
            console.log(currentCity);
            document.querySelector('#seven-days-section').remove();
            document.querySelector('#current-weather-section').remove();
            const testText = `<h1>Whoops something seems to have gone wrong</h1>
                              <h1>
                                <a href="https://williycole.github.io/weatherApp/">Click Here To Try Again</a>
                              </h1>
                             `;
            document.querySelector('.attribute').insertAdjacentHTML('beforebegin', testText);


            throw Error("ERROR");
        }
        console.log(currentCity);////FOR TESTING
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

             <!--
                <ul>
                   <li id="current-lat">${currentLat}</li>
                   <li id="current-lon">${currentLon}</li>
                </ul>

             -->
             <h1 id="current-day">Current Conditions</h1>
             <div id="conditions-div">
                 <img src="http://openweathermap.org/img/w/${currentWeatherIcon}.png" alt="weather icon" class="main-weather-icon"></img>
                 <p>${currentWeatherDescription}</p>
             </div>
             <h1 id="current-temp">${Math.round(currentTempF)}&#8457</h1>
             <p id="time"></p>
             <div id="current-data-pic">
         </div>
         `;
         setTimeout(function changeBackground(){
            ////Determines the time of day and sets the background image for night vs day
            const offSet = data.timezone /3600;
            const utcHours = new Date().getUTCHours();
            const timeCorrection =  (utcHours) + (offSet);
            if (timeCorrection >= 17 || timeCorrection <= 6) {
                console.log('its night')
                document.body.style.background = "#12094A";
                setTimeout(function(){
                   const currentData = document.querySelector('#current-data');
                   const currentDataPicNight = document.querySelector('#current-data-pic');
                   currentData.style.color = "#FBD5A6";
                   currentDataPicNight.style.backgroundImage = "url('./styles/pictures/cityScape/NoTextNight.svg')";
                  }, 0);////Gottem for my own amusement example of what you learned about the even loop
            } else {
                setTimeout(function(){
                    console.log('its day')
                    const currentDataPicDay = document.querySelector('#current-data-pic');
                     currentDataPicDay.style.backgroundImage = "url('./styles/pictures/cityScape/NoTextDay.svg')";
                     document.body.style.background = "#7AD8FE";
                }, 0);////Gottem for my own amusement example of what you learned about the even loop
            }
            document.querySelector('#current-conditions').insertAdjacentHTML('afterend', currentData);
         }, 0);


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
        setTimeout(function(){  sevenDayData(); }, 200);
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
    // console.log(response);////FOR TESTING
        return response.json();
    })
    .then(data => {
        // console.log('one call data below'),console.log(data); ////FOR TESTING
        ////--------------------------Keep an eye on days to make sure they work-----------------------------------------
        for(let i = 1; i < data.daily.length -1; i++) {
        var allDays= ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        var d = new Date(data.daily[i].dt * 1000); // to get the DateTime.
        // console.log(d); ////FOR TESTING
        var dayName = allDays[d.getDay()]; // It will give day index, and based on index we can get day name from the array.
        // console.log(dayName) ////FOR TESTING
        const daysCurrentTempK = (data.daily[i].temp.day)
        const daysCurrentTempF = (daysCurrentTempK - 273.15) * (9/5) + 32;////for temp conversions
        const weatherDescription = data.daily[i].weather[0].description.toUpperCase();/// all weather description
        const weatherIcon = data.daily[i].weather[0].icon;/// all weather description
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
