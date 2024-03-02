'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const request = new XMLHttpRequest();
request.open('Get', 'https://restcountries.com/v3.1/all');
request.send();
request.addEventListener('load', function () {
    const request = JSON.parse(this.responseText);
});
