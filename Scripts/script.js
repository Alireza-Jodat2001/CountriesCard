'use strict';

const btn = document.querySelector('.btn-country'),
    countriesContainer = document.querySelector('.countries'),
    form = document.querySelector('.search-field');

///////////////////////////////////////

const request = new XMLHttpRequest();
request.open('Get', 'https://restcountries.com/v3.1/name/brasil');
request.send();
request.addEventListener('load', function () {
    const request = JSON.parse(this.responseText);
    request.forEach(country => {
        const { flags, name, region, population, languages, currencies } =
                country,
            // calculation pop
            popM = +population / 1_000_000,
            popCalced = popM < 0.099 ? popM.toFixed(2) : popM.toFixed(1);
        let currName, langName;
        for (const key in currencies) {
            currName = currencies[key].name;
        }
        for (const key in languages) {
            langName = languages[key];
        }
        // Create Element
        const countryEl = `
            <article class="country">
                <img class="country__img" src="${flags.svg}" />
                <div class="country__data">
                    <h3 class="country__name">${name.common}</h3>
                    <h4 class="country__region">${region}</h4>
                    <p class="country__row">
                        <span>👫</span>${popCalced} people
                    </p>
                    <p class="country__row">
                        <span>🗣️</span>${langName}
                    </p>
                    <p class="country__row">
                        <span>💰</span>${currName}
                    </p>
                </div>
            </article>`;
        // Insert Element
        countriesContainer.insertAdjacentHTML('beforeend', countryEl);
        countriesContainer.style.opacity = 1;
    });
});

form.addEventListener('submit', e => e.preventDefault);
