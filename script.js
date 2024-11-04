"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");
const rendercountry = function (data, className = "") {
  const countryName =
    data.name && data.name.common ? data.name.common : "Unknown Country"; // Added check for data.name.common
  const flagUrl =
    data.flags && data.flags.png ? data.flags.png : "default-flag.png";
  const languages = data.languages
    ? Object.values(data.languages).join(", ")
    : "N/A";
  const currencies = data.currencies
    ? Object.values(data.currencies)
        .map((cur) => cur.name)
        .join(", ")
    : "N/A";
  const html = `<article class="country ${className} ">
          <img class="country__img" src="${flagUrl}" />
          <div class="country__data">
            <h3 class="country__name">${countryName}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)}</p>
            <p class="country__row"><span>🗣️</span>${languages}</p>
            <p class="country__row"><span>💰</span>${currencies}</p>
          </div>
        </article>`;
  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
};

const req = fetch("https://restcountries.com/v3.1/name/usa");
// console.log(req);
const getcountrydata = function (country) {
  // country 1
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((response) => response.json())

    .then((data) => {
      rendercountry(data[0]);
      console.log(data[0]);
      const neighbour = data[0].borders ? data[0].borders[0] : null;
      // const neighoburo = data[0].borders[0];
      if (!neighbour) return;
    
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then((response) => response.json())
    .then((data) => rendercountry(data, "neighoburo"));
};
getcountrydata("portugal");
// console.log(getcountrydata);
/*
const request = new XMLHttpRequest();
request.open("GET", "https://restcountries.com/v3.1/name/usa");
request.send();
request.addEventListener("load", function () {
  const [datas] = JSON.parse(this.responseText);
  console.log(datas);
});
*/
