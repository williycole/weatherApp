
function weatherApp() {
////API Weather App
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


////make this a lets
// const URI = 'http://api.openweathermap.org/data/2.5/weather';
const KEY = 'e70d740e3c3e8dcc214358600ed578f3';
const units = 'imperial';
const city = 'Memphis';
const state = 'TN';
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

        <figure class="current-conditions">
                <h1>${city}</h1>
                <h1>${state}</h1>
                <h2>${currDateAndTime}</h2>
        </figure>

<!--
        <section id="seven-days-section">
            <figure class="current-conditions-container">
                    <h1>${temp}</h1>
                    <h2>${temp}</h2>
                    <h2>${weatherDescription}</h2>
                    <ul class="weather-misc-data">
                        <li class="weather-data-misc-item">${feelsLike}</li>
                        <li class="weather-data-misc-item">${humidity}</li>
                        <li class="weather-data-misc-item">${windSpeed}</li>
                        <li class="weather-data-misc-item">${windDirection}deg</li>
                    </ul>
            </figure>
        </section>
-->
        `;
        document.querySelector('#weather-app').innerHTML = `${myData}`////'<p>test</p>'////`${html}`
        for(let i = 0; i < data.list.length; i++){
         var temp = data.list[i].main.temp;/// all days temps
         var weatherDescription = data.list[i].weather[0].description;/// all weather description
         var feelsLike = Math.trunc(data.list[i].main.feels_like);/// all feels like temps for days
         var humidity = data.list[i].main.humidity;/// all humidity for days
         var windSpeed = data.list[i].wind.speed;/// all wind speed for days
         var windDirection = data.list[i].wind.deg;/// all wind direction

         const sevDayData = `

                 <figure class="current-conditions-container">
                         <h1>${temp}</h1>
                         <h2>${temp}</h2>
                         <h2>${weatherDescription}</h2>
                         <ul class="weather-misc-data">
                             <li class="weather-data-misc-item">${feelsLike}</li>
                             <li class="weather-data-misc-item">${humidity}</li>
                             <li class="weather-data-misc-item">${windSpeed}</li>
                             <li class="weather-data-misc-item">${windDirection}deg</li>
                         </ul>
                 </figure>

             `;
             document.querySelector('#seven-days-section').insertAdjacentHTML('afterbegin', sevDayData);
        }
    })
    .catch(error => {
        console.log(error);
    });




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




}
weatherApp();