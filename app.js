// Sélectionne l'élément avec la classe 'container'
const container = document.querySelector('.container');

// Sélectionne le bouton dans l'élément avec la classe 'search-box'
const search = document.querySelector('.search-box button');

// Sélectionne l'élément avec la classe 'meteo-box'
const meteoBox = document.querySelector('.meteo-box');

// Sélectionne l'élément avec la classe 'meteo-details'
const meteoDetails = document.querySelector('.meteo-details');

// Ajoute un écouteur d'événement pour le clic sur le bouton de recherche
search.addEventListener('click', () => {
    // Clé API pour accéder à l'API OpenWeatherMap
    const APIkey = '19b446b81b2ff32454c263c0ca19aeb1';

    // Récupère la valeur de l'entrée de l'utilisateur dans la boîte de recherche
    const city = document.querySelector('.search-box input').value;

    // Vérifie si la ville est vide et arrête l'exécution si c'est le cas
    if (city === '') return; // Utiliser '===' pour la comparaison stricte

    // Effectue une requête à l'API OpenWeatherMap avec la ville et la clé API
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=metric`)
        .then(response => response.json()) // Convertit la réponse en JSON
        .then(json => {
            // Vérifie si la réponse de l'API est un succès (code 200)
            if (json.cod !== 200) {
                alert("Ville non trouvée !");
                return;
            }

            // Sélectionne l'image de l'élément 'meteo-box'
            const image = document.querySelector('.meteo-box img');

            // Sélectionne l'élément de température dans 'meteo-box'
            const temperature = document.querySelector('.meteo-box .temperature');

            // Sélectionne l'élément de description dans 'meteo-box'
            const description = document.querySelector('.meteo-box .description');

            // Sélectionne l'élément d'humidité dans 'meteo-box'
            const humidity = document.querySelector('.meteo-details .humidity span');

            // Sélectionne l'élément de vent dans 'meteo-box'
            const wind = document.querySelector('.meteo-details .info-wind span');



            // Change l'image selon le type de météo reçu de l'API
            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'img/clear.png';
                    break;

                case 'Rain':
                    image.src = 'img/rain.png';
                    break;

                case 'Snow':
                    image.src = 'img/snow.png';
                    break;

                case 'Clouds':
                    image.src = 'img/cloud.png';
                    break;

                case 'Mist':
                case 'Haze': // Haze utilise aussi mist.png, on peut regrouper les cas
                    image.src = 'img/mist.png';
                    break;

                default:
                    image.src = 'img/cloud.png';
            }

            // Met à jour les informations de température, description, humidité et vent
            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity} %`;
            wind.innerHTML = `${parseInt(json.wind.speed)} Km/h`;

        });
});
