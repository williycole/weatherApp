////API Weather App data and Fetch variables
const KEY = 'e70d740e3c3e8dcc214358600ed578f3';
const units = 'imperial';
const sevDay = 'http://api.openweathermap.org/data/2.5/forecast';
const cnt = 7;
const currDateAndTime = new Date();
let currentCity  = document.querySelector('#default-city').innerHTML;
let currentState = document.querySelector('#default-state').innerHTML;


///Fetch for 7 Day Forcast

function weatherData() {
fetch(`${sevDay}?q=${currentCity}&${currentState}&units=${units}&cnt=${cnt}&appid=${KEY}`)
    .then(response => {
        if(!response.ok) {
            throw Error("ERROR");
        }
        // console.log(response);
        return response.json();
    })
    .then(data => {
        // console.log(data.list);
        console.log(data);
        console.log(data.city.name);
        for(let i = 0; i < data.list.length; i++){
            const temp =Math.trunc(data.list[i].main.temp);/// all days temps
            const weatherDescription = data.list[i].weather[0].description.toUpperCase();/// all weather description
            const feelsLike = Math.trunc(data.list[i].main.feels_like);/// all feels like temps for days
            const humidity = data.list[i].main.humidity;/// all humidity for days
            const windSpeed = data.list[i].wind.speed;/// all wind speed for days
            const windDirection = data.list[i].wind.deg;/// all wind direction
            const sevDayData = `
                <figure class="seven-day-conditions-container">
                    <h1>${temp} F</h1>
                    <h2>${weatherDescription}</h2>
                    <ul class="weather-misc-data">
                        <li class="weather-data-misc-item">Feels Like: ${feelsLike} F</li>
                        <li class="weather-data-misc-item">Humidity: ${humidity} F</li>
                        <li class="weather-data-misc-item">Wind Speed: ${windSpeed}</li>
                        <li class="weather-data-misc-item">Wind Direction: ${windDirection} deg</li>
                    </ul>
                </figure>
            `;
            document.querySelector('#seven-days-section').insertAdjacentHTML('afterbegin', sevDayData);
        }
        ////Prevent Default
        document.querySelector('#select-location-button').addEventListener("click", function(event){
            event.preventDefault()
        });
    })
    .catch(error => {
        console.log(error);
    });
}
weatherData();


/////Currently working here
let updateButton = document.querySelector('#select-location-button');
updateButton.addEventListener('click', () => {
    let updatedCity = document.querySelector('#city').value;
    let updatedState = document.querySelector('#state').value;
    let sevenDaysSection = document.querySelector('#seven-days-section');
    console.log(city),console.log(state);
    document.querySelector('#default-city').textContent = updatedCity;
    document.querySelector('#default-state').textContent = updatedState;
    sevenDaysSection.remove();

     ////Updates Dom With New Seven Day Section
    let newSevenDaySection = `
        <section id="seven-days-section">

        </section>
    `;
    const appendNewSevenDaySec = document.querySelector('#current-weather-section');
    appendNewSevenDaySec.insertAdjacentHTML('afterend', newSevenDaySection)
    ////clear cache from fetch here here


    ////reFetch Data
    weatherData();
});


/////-----------------pick up here
////need to possibly get rid of prevent default and add in local storage handler as well as default location setting for on load
////also need to save local storage when reload
////also need to add in units for wind direction
////also need to add weather gif function
////add in errors for form control
////Set Time
// const time = `
//     <p id="time">${currDateAndTime}</p>
// `;
// const appendTime = document.querySelector('#default-state');
// appendTime.insertAdjacentHTML('afterend', time)