const cep = document.getElementById("cepInput");
const button = document.getElementById("button");
const temp = document.querySelector("#temp");
const temp_min = document.querySelector("#temp_min");
const temp_max = document.querySelector("#temp_max");
const description = document.querySelector("#description");
const imagem = document.querySelector("#imagem");

let latitude;
let longitude;

async function pesquisarCep() {
    const pesquisa = cep.value;

    const data = {
        cep: pesquisa,
    };

    await fetch("http://localhost:8080/search", {
        method: "POST",
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        latitude = data.lat;
        longitude = data.lng;

        pesquisaClima(latitude, longitude)
    })
    .catch(error => {
        console.error(error)
    });
}

async function pesquisaClima(latitude, longitude) {
    const url = "https://weather.contrateumdev.com.br/api/weather?lat=" + latitude + "&lon=" + longitude;
    await fetch(url, {
        method: "GET",
    })
    .then(response => response.json())
    .then(data => {
        imagem.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        temp.innerHTML = `Atual ${data.main.temp}ºC`;
        temp_min.innerHTML = `Mínimo ${data.main.temp_min}ºC`;
        temp_max.innerHTML = `Máximo ${data.main.temp_max}ºC`;
        description.innerHTML = data.weather[0].description;
    })
    .catch(error => {
        console.error(error)
    })
}

button.addEventListener('click', pesquisarCep);