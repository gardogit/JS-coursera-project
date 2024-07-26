// VERSIÓN SIMPLE DE COURSERA
function showweatherDetails(event) {
      event.preventDefault();

    const city = document.getElementById('city').value;
    const apiKey = '00eee821605e2b50130b54a586e87d25';
    const apiCity = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;

 fetch(apiCity)
      .then(response => response.json())
      .then(geo => {
      let lat = geo[0].lat;
      let lon = geo[0].lon;
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;      
        
      return fetch(apiUrl)
    })
        .then(response => response.json())
        .then(data => {
          const weatherInfo = document.getElementById('weatherInfo');
          weatherInfo.innerHTML = `<h2>Weather in ${data.name}</h2>
                                  <p>Temperature: ${data.main.temp} &#8451;</p>
                                  <p>Weather: ${data.weather[0].description}</p>`;
        }).catch(error => {
            console.error('Error fetching weather:', error);
            const weatherInfo = document.getElementById('weatherInfo');
            weatherInfo.innerHTML = `<p>Failed: wrong citry name. Please try again.</p>`;
          });
}   
 document.getElementById('weatherForm').addEventListener('submit',showweatherDetails );

/* VERSIÓN MEJORADA
function showweatherDetails(event) {
    event.preventDefault();

    const city = document.getElementById('city').value;
    const apiKey = '00eee821605e2b50130b54a586e87d25';
    const apiCity = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;

    fetch(apiCity)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(geo => {
            // Verifica que el array geo no esté vacío
            if (geo.length > 0) {
                let lat = geo[0].lat;
                let lon = geo[0].lon;

                const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
                
                return fetch(apiUrl);
            } else {
                throw new Error('Ciudad no encontrada');
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const weatherInfo = document.getElementById('weatherInfo');
            weatherInfo.innerHTML = `<h2>Weather in ${data.name}</h2>
                                      <p>Temperature: ${data.main.temp} &#8451;</p>
                                      <p>Weather: ${data.weather[0].description}</p>`;
        })
        .catch(error => {
            console.error('Error:', error);
            const weatherInfo = document.getElementById('weatherInfo');
            weatherInfo.innerHTML = `<p>Error: ${error.message}</p>`;
        });
}

document.getElementById('weatherForm').addEventListener('submit', showweatherDetails);

*/