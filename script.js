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





        ////------Testing for below
        ////Arrays for Days
        // const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        ////use different days arrays for different correct dates aka shfit stuff over based on correct date        const currentDay = data.list[i].dt;
        ////Arrays for Days Date/Day handling
        const currentDayArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        ////get current day and use it to pick from other arrays you can choose to use based on that day that accounts for shifitn gn the day
        var date = new Date();
        var currentDayIndex = date.getUTCDay();
        // console.log(currentDayIndex);
        ////could use index to slice behind index and pop on array  then loop throug array in for loop to pick day corrected days from array

        ////this might be to complex but you couldor maybe make objects and use the day as key value
        //// ex. key, value
            //// 0: Sunday,
            //// 1: Monday,
            //// 2 : Tuesday,
            //// etc.....
         ////------


        const currentWeatherDescription = data.list[0].weather[0].description.toUpperCase();/// all weather description
        const currentWeatherIcon = data.list[0].weather[0].icon;/// all weather description
        console.log(data)////FOR TESTING
        const currentData = `
            <div id="current-data">
                <h1 id="default-city">${currentCity[0]}, ${currentState[0]}</h1>
                <h1 id="current-day">${currentDayArray[currentDayIndex]}</h1>
                <div id="conditions-div">
                    <img src="http://openweathermap.org/img/w/${currentWeatherIcon}.png" alt="weather icon" class="main-weather-icon"></img>
                    <p>${currentWeatherDescription}</p>
                </div>
                <h1 id="current-temp">${Math.trunc(data.list[0].main.temp)}&#8457</h1>
                <p id="time"></p>
            </di>
        `;
        ////Determines the time of day for background change
        const offSet = data.city.timezone /3600;
        const utcHours = new Date().getUTCHours();
        const timeCorrection =  (utcHours) + (offSet);
        // console.log(offSet)
        // console.log(utcHours);
        // console.log(timeCorrection);
          if (timeCorrection >= 18 || timeCorrection <= 6) {
              console.log('its night')
              // document.body.style.background = "purple";
              document.body.style.backgroundImage = "url('./styles/pictures/cityScape/NoTextNight.svg')";
            //   const changeToNight = document.querySelector("#current-data").innerHTML;
            //   changeToNight.sytle.color = "#FBD5A6";



          } else {
              console.log('its day')
              // document.body.style.background = "yellow";
              document.body.style.backgroundImage = "url('./styles/pictures/cityScape/NoTextDay.svg')";
          }
        document.querySelector('#current-conditions').insertAdjacentHTML('afterend', currentData);

            //--------------
          ////Testing for below
          var allDays= ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
          var d = new Date(data.list[6].dt * 1000);
          console.log(d)
          var dayName = allDays[d.getDay()];
          console.log(dayName)

        for(let i = 1; i < data.list.length; i++) {
            ////try this first from stack overflow
            // var d = new Date(data.list[i].dt * 1000); // to get the DateTime.
            // var dayName = allDays[d.getDay()]; // It will give day index, and based on index we can get day name from the array.
            // console.log(dayName)
            //--------------


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
                    <!--<h1 class="day-text sev-dy-txt">${dayName}</h1>-->
                    <h2 class="day-text sev-dy-txt">${temp}&#8457</h2>
                    <img src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="weather icon" class="weather-icons">
                        <p class="day-text sev-dy-txt">${weatherDescription}</p>
                    </img>
                    <!--
                    <ul class="weather-misc-data" class="day-text sev-dy-txt">
                        <li class="weather-data-misc-item day-text sev-dy-txt">Feels Like: ${feelsLike}&#8457</li>
                        <li class="weather-data-mi sc-item day-text sev-dy-txt">Humidity: ${humidity}&#8457</li>
                        <li class="weather-data-misc-item day-text sev-dy-txt">Wind Speed: ${windSpeed}</li>
                        <li class="weather-data-misc-item day-text sev-dy-txt">Wind Direction: ${windDirection} deg</li>
                    </ul>
                    -->
                </figure>
            `;
            document.querySelector('#seven-days-section').insertAdjacentHTML('afterbegin', sevenDayData);
        }
        // console.log(iCatch); /////FOR TESTING
    })
    .catch(error => {
        console.log(error);
    });
}
weatherApp();

////Updating Location
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
    console.log('test')////FOR TESTING
    event.preventDefault();
});

