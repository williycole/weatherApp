////API for Memphis Weather App
const URI = 'http://api.openweathermap.org/data/2.5/weather'
const KEY = 'e70d740e3c3e8dcc214358600ed578f3'
fetch(`${URI}?q=Memphis&appid=${KEY}`).then((res) => {
    console.log(res);
    return res.json();
}).then((data) => {
// console.log(data);
// console.log(data.name);
});
// console.log(data)
