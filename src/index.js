import { camelCase } from "lodash";

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
    const { name: city,
            main:{temp, humidity}, 
            sys:{country},
            weather: [{description}]} = data;
    
    CARD.textContent = "";

    const CITYSTATEDISPLAY = document.createElement("h1");
    const TEMPDISPLAY = document.createElement("p");
    const HUMIDITYDISPLAY = document.createElement("p");
    const DESCDISPLAY = document.createElement("p");
    const COUNTRYDISPLAY = document.createElement("p");
    


    CITYSTATEDISPLAY.textContent = camelCase(city);
    CARD.appendChild(CITYSTATEDISPLAY);
    TEMPDISPLAY.textContent = `${((temp - 273.15) * (9/5) + 32).toFixed(1)} F`;
    CARD.appendChild(TEMPDISPLAY);
    HUMIDITYDISPLAY.textContent = `${humidity} %`;
    CARD.appendChild(HUMIDITYDISPLAY);
    DESCDISPLAY.textContent = description;
    CARD.appendChild(DESCDISPLAY);
    COUNTRYDISPLAY.textContent = country;
    CARD.appendChild(COUNTRYDISPLAY);


}


function displayError(message) {
    const ERRORDISPLAY = document.createElement("p");
    ERRORDISPLAY.textContent = message;
    ERRORDISPLAY.classList.add("errordisplay");
    CARD.textContent = "";
    CARD.appendChild(ERRORDISPLAY);
}

