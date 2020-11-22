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
