const WEATHERFORM = document.querySelector(".container");
const CITYINPUT = document.querySelector(".cityInput");
const CARD = document.querySelector(".card");
const APIKEY = "a31d96cc4c32ddd4f61566cce2e3d39f";

WEATHERFORM.addEventListener("submit", async event => {

    event.preventDefault();

    const city = CITYINPUT.value;

    if (city){

        try {

            const WEATHERDATA = await getWeather(city);
            displayWeatherInfo(WEATHERDATA);

        } 
        catch(error) {

            console.log(error);
            displayError(error);
        }

    } else {

        displayError("Please Enter City");
    }
});

async function getWeather(city) {

    const APIURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}`;
    const RESPONSE = await fetch(APIURL);
    if(!RESPONSE.ok){
        throw new Error("City Not Found");
    }

    return await RESPONSE.json();
}

function displayWeatherInfo(data) {
    console.log(data);
}

function getWeatherEmoji(weatherid) {

}

function displayError(message) {
    const ERRORDISPLAY = document.createElement("p");
    ERRORDISPLAY.textContent = message;
    ERRORDISPLAY.classList.add("errordisplay");
    CARD.textContent = "";
    CARD.appendChild(ERRORDISPLAY);
}