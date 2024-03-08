'use strict';

const btn = document.querySelector('.btn-country'),
    countriesContainer = document.querySelector('.countries'),
    form = document.querySelector('.search-field'),
    searchInput = form.querySelector('.search-input'),
    searchContainer = document.querySelector('.search-container'),
    nav = document.querySelector('.navbar'),
    searchPreset = document.querySelector('.search-preset'),
    backdrop = document.querySelector('.backdrop'),
    checkboxInput = document.querySelector('.checkbox-input');

let checked = false;

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

///////////////////////////////////////

// // Create Request
// function createRequest(search, borderChecked) {
//     const routeURL = search === 'all' ? 'all' : `name/${search}`;
//     fetch(`https://restcountries.com/v3.1/${routeURL}`)
//         .then(response => {
//             if (!response.ok)
//                 throw new Error(`Could not found country (${response.status})`);
//             return response.json();
//         })
//         .then(requestJSON => {
//             requestJSON.forEach(country => {
//                 extractingData(country);
//             });
//             // create request for border countries
//             if (borderChecked) borderRequest(requestJSON);
//             return requestJSON;
//         })
//         .catch(error => console.log(error.message))
//         .finally(() => console.log('finally...'));
// }
// // createRequest('all', false);

// // form submited
// form.addEventListener('submit', e => {
//     e.preventDefault();
//     countriesContainer.textContent = '';
//     // Create Request
//     createRequest(searchInput.value, checked);
// });

// // checkbox event
// checkboxInput.addEventListener('change', function () {
//     checked = this.checked;
// });

// // extracting data of fetch
// function extractingData(country, className) {
//     const { flags, name, region, population, languages, currencies } = country,
//         popM = +population / 1_000_000,
//         popCalced = popM < 0.099 ? popM.toFixed(2) : popM.toFixed(1);
//     let currName, langName;
//     for (const key in currencies) currName = currencies[key].name;
//     for (const key in languages) langName = languages[key];
//     // create arguments
//     const argument = {
//         flags,
//         name,
//         region,
//         popCalced,
//         currName,
//         langName,
//         className,
//     };
//     // Create Card
//     createCardEl(argument);
// }

// // create request for border countries
// function borderRequest(requestJSON) {
//     console.log(requestJSON.forEach(e => console.log(e)));
//     requestJSON.forEach(country => {
//         country.borders.forEach(border => {
//             fetch(`https://restcountries.com/v3.1/alpha/${border}`)
//                 .then(response => {
//                     if (!response.ok)
//                         throw new Error(
//                             `Could not found country (${response.status})`
//                         );
//                     return response.json();
//                 })
//                 .then(requestJSON => {
//                     requestJSON.forEach(country =>
//                         extractingData(country, 'neighbour')
//                     );
//                     return requestJSON;
//                 })
//                 .catch(error => console.log(error.message))
//                 .finally(() => console.log('finally...'));
//         });
//     });
// }

// // Create card elements
// function createCardEl(argument) {
//     const {
//         flags,
//         name,
//         region,
//         popCalced,
//         currName,
//         langName,
//         className = '',
//     } = argument;
//     // Create Element
//     const countryEl = `
//         <article class="country ${className}">
//             <img class="country__img" src="${flags.svg}" />
//             <div class="country__data">
//                 <h3 class="country__name">${name.common}</h3>
//                 <h4 class="country__region">${region}</h4>
//                 <p class="country__row">
//                     <span>👫</span>${popCalced} people
//                 </p>
//                 <p class="country__row">
//                     <span>🗣️</span>${langName}
//                 </p>
//                 <p class="country__row">
//                     <span>💰</span>${currName}
//                 </p>
//             </div>
//         </article>`;
//     // Insert Element
//     countriesContainer.insertAdjacentHTML('beforeend', countryEl);
//     countriesContainer.style.opacity = 1;
// }

// // navbar click event
// nav.addEventListener('click', e => {
//     const { target } = e;
//     if (target.closest('.search-container'))
//         [searchPresetC, backdropC].forEach(el => el._showEl());
//     else if (target.closest('.navbar'))
//         [searchPresetC, backdropC].forEach(el => el._hideEl());
// });

// // backdrop click event
// backdrop.addEventListener('click', function () {
//     [searchPresetC, backdropC].forEach(el => el._hideEl());
// });

// Create Request
function createRequest(type, search, borderChecked) {
    let URL;

    switch (type) {
        case 'all':
            URL = `https://restcountries.com/v3.1/all`;
            break;
        case 'name':
            URL = `https://restcountries.com/v3.1/name/${search}`;
            break;
        case 'alpha':
            URL = `https://restcountries.com/v3.1/alpha/${border}`;
            break;
        default:
            return type;
            break;
    }

    fetch(URL)
        .then(res => {
            if (!res.ok)
                throw new Error(`Could not found country (${res.status})`);
            return res.json();
        })
        .then(data => {
            data.forEach(country => {
                createCardEl(extractingData(country));
            });
            // create request for border countries
            if (!borderChecked) return;
            borderRequest(data);
            return data;
        })
        .catch(error => console.log(error.message))
        .finally(() => console.log('finally...'));
}
// createRequest('all', 'all', false);

// form submited
form.addEventListener('submit', e => {
    e.preventDefault();
    countriesContainer.textContent = '';
    // Create Request
    createRequest('name', searchInput.value, checked);
});

// checkbox event
checkboxInput.addEventListener('change', function () {
    checked = this.checked;
});

// extracting data of fetch
function extractingData(country, className) {
    const { flags, name, region, population, languages, currencies } = country;
    const popM = +population / 1_000_000;
    const popCalced = popM < 0.099 ? popM.toFixed(2) : popM.toFixed(1);
    let currName, langName;
    for (const key in currencies) currName = currencies[key].name;
    for (const key in languages) langName = languages[key];
    // return arguments
    return {
        flags,
        name,
        region,
        popCalced,
        currName,
        langName,
        className,
    };
}

// create request for border countries
function borderRequest(requestJSON) {
    requestJSON.forEach(country => {
        country.borders.forEach(border => {
            fetch(`https://restcountries.com/v3.1/alpha/${border}`)
                .then(response => {
                    if (!response.ok)
                        throw new Error(
                            `Could not found country (${response.status})`
                        );
                    return response.json();
                })
                .then(requestJSON => {
                    requestJSON.forEach(country =>
                        extractingData(country, 'neighbour')
                    );
                    return requestJSON;
                })
                .catch(error => console.log(error.message))
                .finally(() => console.log('finally...'));
        });
    });
}

// Create card elements
function createCardEl(argument) {
    const {
        flags,
        name,
        region,
        popCalced,
        currName,
        langName,
        className = '',
    } = argument;
    // Create Element
    const countryEl = `
        <article class="country ${className}">
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
