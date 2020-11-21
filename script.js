function weatherApp() {
 ////API Weather App
 const KEY = 'e70d740e3c3e8dcc214358600ed578f3';
 const units = 'imperial';
 const city = 'Memphis';
 // const city = document.querySelector('#user-city-input').value;
 ////use user input to pick city
 ////account for default and wrong city, if error alert user and put required on input don't forget lables
 const state = 'TN';
 ////const state = document.querySelector('#user-state-input').value
 ////use scroll list to pick variable
const sevDay = 'http://api.openweathermap.org/data/2.5/forecast';
const cnt = 7;
const currDateAndTime = new Date();

////Fetch for 7 Day Forcast
fetch(`${sevDay}?q=${city}&${state}&units=${units}&cnt=${cnt}&appid=${KEY}`)
    .then(response => {
        if(!response.ok) {
            throw Error("ERROR");
        }
        console.log(response);
        return response.json();
    })
    .then(data => {
        console.log(data.list);
        const myData = `
        <figure id="current-conditions">
        <h1>${city}</h1>
        <h1>${state}</h1>
                <p>${currDateAndTime}</p>
            </figure>
        `;
        document.querySelector('#weather-app').innerHTML = `${myData}`////'<p>test</p>'////`${html}`
        for(let i = 0; i < data.list.length; i++){
            const temp = data.list[i].main.temp;/// all days temps
            const weatherDescription = data.list[i].weather[0].description.toUpperCase();/// all weather description
            const feelsLike = Math.trunc(data.list[i].main.feels_like);/// all feels like temps for days
            const humidity = data.list[i].main.humidity;/// all humidity for days
            const windSpeed = data.list[i].wind.speed;/// all wind speed for days
            const windDirection = data.list[i].wind.deg;/// all wind direction

            const sevDayData = `
                <figure class="seven-day-conditions-container">
                    <h1>${temp}</h1>
                    <h2>${weatherDescription}</h2>
                    <ul class="weather-misc-data">
                        <li class="weather-data-misc-item">Feels Like: ${feelsLike}</li>
                        <li class="weather-data-misc-item">Humidity: ${humidity}</li>
                        <li class="weather-data-misc-item">Wind Speed: ${windSpeed}</li>
                        <li class="weather-data-misc-item">Wind Direction: ${windDirection} deg</li>
                    </ul>
                </figure>
            `;
            document.querySelector('#seven-days-section').insertAdjacentHTML('afterbegin', sevDayData);
        }
    })
    .catch(error => {
        console.log(error);
    });
    ////weather gif function
}
weatherApp();










///////---------------OLD DATA
// const URI = 'http://api.openweathermap.org/data/2.5/weather';
// ////Fetch for Current Weather
// fetch(`${URI}?q=${city}&appid=${KEY}`)
//     .then(response => {
    //     if(!response.ok) {
        //         throw Error("ERROR");
        //     }
        //     // console.log(response);
        //     return response.json();
        //     })
        //     .then(data => {
            //         console.log(data);
//         // console.log(data.weather),
//         // console.log(data.name),
//         // console.log(data.main),
//         // console.log(data.sys.sunrise),
//         // console.log(data.sys.sunset),
//         // console.log(data.wind),
//         // console.log(data.weather[0].description)
//             let cityName = data.name;
//             const myData = `
//                 <h1>${cityName}</h1>
//             `;
//         // const html = data.data.map(weatherData => {
//         //     return `<p>city: ${weatherData.sys.name}</p>`;
//         // });
//         // console.log(html);
//     document.querySelector('#weather-app').innerHTML = `${myData}`////'<p>test</p>'////`${html}`
//     })
//     .catch(error => {
//         console.log(error);
//     });


// const URI = 'http://api.openweathermap.org/data/2.5/weather'
// const sevenDayKey = 'c16b8d0027d9f401320fa283a1e9f06f';

    /////-------------------->Testing Data
             // console.log(i)
             // console.log(data.list[i].main.temp);/// all days temps
             // console.log(data.list[i].weather[0].description);/// all weather description
             // console.log(data.list[i].main.feels_like);/// all feels like temps for days
             // console.log(data.list[i].main.humidity);/// all humidity for days
             // console.log(data.list[i].wind.speed);/// all wind speed for days
             // console.log(data.list[i].wind.deg);/// all wind direction
    /////-------------------------------->
