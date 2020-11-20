////API for Memphis Weather App
const URI = 'http://api.openweathermap.org/data/2.5/weather'
const KEY = 'e70d740e3c3e8dcc214358600ed578f3'
fetch(`${URI}?q=Memphis&appid=${KEY}`)
    .then(response => {
    if(!response.ok) {
        throw Error("ERROR");
    }
    // console.log(response);
    return response.json();
    })
    .then(data => {
        console.log(data);
        console.log(data.weather),
        console.log(data.name),
        console.log(data.main),
        console.log(data.sys.sunrise),
        console.log(data.sys.sunset),
        console.log(data.wind),
        console.log(data.weather[0].description)
            let locationName = data.name;
            const myData = `
                <h1>${locationName}</h1>


            `;


        // const html = data.data.map(weatherData => {
        //     return `<p>Location: ${weatherData.sys.name}</p>`;
        // });
        // console.log(html);
    document.querySelector('#weather-app').innerHTML = `${myData}`////'<p>test</p>'////`${html}`
    })
    .catch(error => {
        console.log(error);
    });
