import './css/styles.css';

const DEBOUNCE_DELAY = 300;
// fetchCountries(name)

// fetch('https://restcountries.com/v3.1/name/peru')
//     .then(function (res) {
//         return res.json();
//     })
//     .then(function (data) {
//         console.log(data);
//     })
//     .catch(function (err) {
//         console.log('error' + err);
//     })

// let countries;
import countryCardTpl from './tamplates/country-card.hbs';
fetch('https://restcountries.com/v3.1/name/peru')
    .then(res => res.json())
    .then(data => initialize(data))
    .catch(err => console.log('Error' + err));

function initialize(countriesData) {
    const markup = countryCardTpl(countriesData[0]);
    console.log(countriesData[0].languages);
    console.log(markup);
}
    