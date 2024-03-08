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

// Create Request
function createRequest(type, search, borderChecked) {
   let URL;

   if (type === 'all') URL = `https://restcountries.com/v3.1/all`;
   else if (type === 'name')
      URL = `https://restcountries.com/v3.1/name/${search}`;

   fetch(URL)
      .then(res => {
         if (!res.ok)
            throw new Error(`Could not found country (${res.status})`);
         return res.json();
      })
      .then(data => {
         // extracting data and create card El
         data.forEach(country => {
            createCardEl(extractingData(country));
         });

         // check border checkbox
         if (!borderChecked) return;

         // create request for border countries
         const borderURL = `https://restcountries.com/v3.1/alpha/`;
         data.forEach(country => {
            country.borders.forEach(border => {
               fetch(borderURL + border)
                  .then(res => {
                     if (!res.ok)
                        throw new Error(
                           `Could not found country (${res.status})`
                        );
                     return res.json();
                  })
                  .then(data => {
                     // extracting data and create border El
                     data.forEach(country =>
                        createCardEl(extractingData(country, 'neighbour'))
                     );
                     return data;
                  });
            });
         });
      })
      .catch(err => console.log(err.message))
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
function extractingData(country, className = '') {
   const { flags, name, region, population, languages, currencies } = country;
   const popM = +population / 1_000_000;
   const popCalced = popM < 0.099 ? popM.toFixed(2) : popM.toFixed(1);
   // Extracting languages and currencies
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

// Create card elements
function createCardEl(argument) {
   const { flags, name, region, popCalced, currName, langName, className } =
      argument;
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

/////////////////////////////////////

// // find my location
// function getMyLoc() {
//    navigator.geolocation.getCurrentPosition(successPos, () =>
//       alert('Could not get your location...')
//    );
// }
// getMyLoc();

// // success Position callBack
// function successPos(position) {
//    const { latitude: lat, longitude: lng } = position.coords;
//    findMyCountry(lat, lng);
// }

// // fetching my country
// function findMyCountry(lat, lng) {
//    fetch(
//       // `https://geocode.xyz/${lat},${lng}?geoit=json`
//       `https://geocode.xyz/[${lat}, ${lng}]&auth=11227039688444783192x8771`
//    )
//       .then(res => res.json())
//       .then(data => console.log(data));
// }

// JavaScript Course
267;
// Promise
// ساختگی ایجاد کنیم Promise در ادامه میخواهیم یک
// را در دو خط متوالی قرار دهیم Promise , setTimeOut در حالت کلی اگر یک
// ها setTimeOut ها انجام میشوند و سپس microTask همانطور که میدانیم اول

// 1. به صورت زنجیر وار نوشتن
(() => {
   let check = false;
   const myPromise = new Promise((resolve, reject) => {
      check ? resolve('I am S') : reject(new Error('I have a problem...'));
   });
   // consume promise
   myPromise
      .then(res => console.log(res))
      .catch(err => console.log(err.message));
})();

// 2. به صورت جدا جدا
(() => {
   let check = false;
   check && Promise.resolve('successfull...').then(res => console.log(res));
   !check &&
      Promise.reject(new Error('unSuccsessfull...')).catch(err =>
         console.log(err.message)
      );
})();
