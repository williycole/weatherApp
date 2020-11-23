// ////Remove Location Data
// updateButton.addEventListener('click', () => {
//     console.log('test 1')
//     let defaultCity = document.querySelector('#default-city');
//     let defaultState = document.querySelector('#default-state');
//     let sevenDaysSection = document.querySelector('#seven-days-section');


//     console.log(defaultCity);
//     defaultCity.remove();
//     defaultState.remove();
//     sevenDaysSection.remove();


//     localStorage.clear();

//     window.caches.delete(weatherData)

//     // location.reload(true);

//     // weatherData.delete().then(function(weatherData) {
//     //     console.log('your cache entry has been deleted if found');
//     //   });



// });
// ////Update Location Data
// updateButton.addEventListener('click', () => {
//     console.log('test 2')
//     let updateCity = document.querySelector('#city').value;
//     let updateState = document.querySelector('#state').value;
//     ////Updates Dom With Current Location
//     let newLocation = `
//         <h1 id="default-city">${updateCity}</h1>
//         <h1 id="default-state">${updateState}</h1>
//     `;
//     const appendNewCurrentLoc = document.querySelector('#current-conditions');
//     appendNewCurrentLoc.insertAdjacentHTML('afterbegin', newLocation)
//     ////Updates Dom With New Seven Day Section
//     let newSevenDaySection = `
//         <section id="seven-days-section">

//         </section>
//     `;
//     const appendNewSevenDaySec = document.querySelector('#current-weather-section');
//     appendNewSevenDaySec.insertAdjacentHTML('afterend', newSevenDaySection)
//     ////Re runs weather app to fetch new data
//     weatherData();
// });


//   /////UTC Time Conversion
//   const offSet = data.city.timezone /3600;
//   // console.log(offSet)////FOR TESTING
//   const mins = new Date().getUTCMinutes();
//   // console.log(mins);////FOR TESTING
//   const dayNumber = new Date().getUTCDay();
//   console.log(dayNumber)////FOR TESTING
//   const year = new Date().getFullYear();
//   const UTCYear = Math.trunc(year/100);
//   // year.substring(2)
//   // console.log(UTCYear);////FOR TESTING
//   const month = new Date().getMonth();
//   const date = new Date().getDate();
//   // Date.UTC(year, month[, day[, hour[, minute[, second[, millisecond]]]]])
//   const newDateTest = new Date(Date.UTC(year, month, 2, (-6), mins, 0));
//   // 0, month, date, (12 + offSet +1), (mins), 13, 0
//   console.log(newDateTest)////FOR TESTING
//   ////const correctedTime = ((new Date().getHours() -12) + ':' + (new Date().getMinutes()) + (-6) + data.city.timezone);
//   ////console.log(correctedTime);////FOR TESTING
