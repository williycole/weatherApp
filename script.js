
function weatherApp() {
////API Weather App
// const URI = 'http://api.openweathermap.org/data/2.5/weather'

// const sevenDayKey = 'c16b8d0027d9f401320fa283a1e9f06f';


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
        const currentTemp = data.list[0].main.temp





        console.log(data);
        console.log(data.list);
        console.log(data.list[0].main.temp);


        const myData = `

        <figure id="current-conditions">

                <h1>${city}</h1>
                <h1>${state}</h1>
                <h2>${currDateAndTime}</h2>

        </figure>

                `;

            document.querySelector('#weather-app').innerHTML = `${myData}`////'<p>test</p>'////`${html}`


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