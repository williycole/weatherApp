////API Weather App data and Fetch variables
const KEY = 'e70d740e3c3e8dcc214358600ed578f3';
const URL = 'https://api.openweathermap.org/data/2.5/forecast';
const units = 'imperial';
const cnt = 7;
// const currDateAndTime = new Date();
let currentCity  = ['Denver','Memphis']


let currentState = ['CO','TN']

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
        console.log(data)
        // for(let i = 0; i < data.list.length; i++) {

        //       // console.log(temp), console.log(data.list[i].dt_txt);
        //     //   console.log(data.list[i])
        // }
    });
}
weatherApp();



  // document.querySelector('#default-city').innerHTML = updatedCity;
    // document.querySelector('#default-state').innerHTML = updatedState;