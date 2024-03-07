'use strict';

const btn = document.querySelector('.btn-country'),
    countriesContainer = document.querySelector('.countries'),
    form = document.querySelector('.search-field'),
    searchInput = form.querySelector('.search-input'),
    searchContainer = document.querySelector('.search-container'),
    nav = document.querySelector('.navbar'),
    searchPreset = document.querySelector('.search-preset'),
    backdrop = document.querySelector('.backdrop');

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
// createRequest('all');

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

// form submited
form.addEventListener('submit', e => {
    e.preventDefault();
    countriesContainer.textContent = '';
    // Create Request
    createRequest(searchInput.value);
});

// Element Class
class Element {
    #element;
    constructor(element) {
        this.#element = element;
    }
    // show search preset
    _showEl() {
        this.#element.classList.replace('hide', 'show');
    }
    _hideEl() {
        this.#element.classList.replace('show', 'hide');
    }
}
// new Element instance of class
const searchPresetC = new Element(searchPreset),
    backdropC = new Element(backdrop);

// navbar click event
nav.addEventListener('click', e => {
    const { target } = e;
    if (target.closest('.search-container'))
        [searchPresetC, backdropC].forEach(el => el._showEl());
    else if (target.closest('.navbar'))
        [searchPresetC, backdropC].forEach(el => el._hideEl());
});

// backdrop click event
backdrop.addEventListener('click', function () {
    [searchPresetC, backdropC].forEach(el => el._hideEl());
});
