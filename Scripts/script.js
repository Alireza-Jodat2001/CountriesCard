'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const request = new XMLHttpRequest();
request.open('Get', 'https://restcountries.com/v3.1/all');
request.send();
request.addEventListener('load', function () {
    const request = JSON.parse(this.responseText);
    console.log(request);
    request.forEach(country => {
        const { flag, name, region, population, languages, currencies } =
            country;
        const countryEl = `
            <article class="country">
                <img class="country__img" src="${flag}" />
                <div class="country__data">
                    <h3 class="country__name">${name.common}</h3>
                    <h4 class="country__region">${region}</h4>
                    <p class="country__row">
                        <span>👫</span>${(+population / 1_000_000).toFixed(
                            1
                        )} people
                    </p>
                    <p class="country__row">
                        <span>🗣️</span>${languages.name}
                    </p>
                    <p class="country__row">
                        <span>💰</span>${currencies.name}
                    </p>
                </div>
            </article>`;
    });
});
