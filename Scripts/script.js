'use strict';

const btn = document.querySelector('.btn-country'),
    countriesContainer = document.querySelector('.countries'),
    form = document.querySelector('.search-field'),
    searchInput = form.querySelector('.search-input'),
    searchContainer = document.querySelector('.search-container'),
    searchPreset = document.querySelector('.search-preset');

///////////////////////////////////////

// Create Request
function createRequest(search) {
    const request = new XMLHttpRequest();
    // route URL
    const routeURL = search === 'all' ? 'all' : `name/${search}`;
    request.open('Get', `https://restcountries.com/v3.1/${routeURL}`);
    request.send();
    request.addEventListener('load', function () {
        const requestJSON = JSON.parse(this.responseText);
        requestJSON.forEach(country => extractingData(country));
    });
}
createRequest('all');

// extracting data of fetch
function extractingData(country) {
    const { flags, name, region, population, languages, currencies } = country,
        popM = +population / 1_000_000,
        popCalced = popM < 0.099 ? popM.toFixed(2) : popM.toFixed(1);
    let currName, langName;
    for (const key in currencies) currName = currencies[key].name;
    for (const key in languages) langName = languages[key];
    // create arguments
    const argument = { flags, name, region, popCalced, currName, langName };
    // Create Card
    createCardEl(argument);
}

// Create card elements
function createCardEl(argument) {
    const { flags, name, region, popCalced, currName, langName } = argument;
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
}

// showing search preset
searchContainer.addEventListener('click', function (e) {
    // console.log(this, e);
    if (!searchPreset.classList.contains('search-preset-active')) {
    }
});

// form submited
form.addEventListener('submit', e => {
    e.preventDefault();
    countriesContainer.textContent = '';
    // Create Request
    createRequest(searchInput.value);
});
