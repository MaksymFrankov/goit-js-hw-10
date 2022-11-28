import './css/styles.css';
import debounce from "lodash.debounce";


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

const refs = {
    countryContainer: document.querySelector('.country-info'),
    searchForm: document.querySelector('#search-box')
};
import countryCardTpl from './tamplates/country-card.hbs';

refs.searchForm.addEventListener('input', debounce(onInput,DEBOUNCE_DELAY));

function onInput(e) {
    e.preventDefault();
    // console.log(refs.searchForm.value);
    fetchCountry(refs.searchForm.value.trim())
    .then(renderCountryCard)
    .catch(onFetchError);
}

// function initialize(countriesData) {
//     const markup = countryCardTpl(countriesData[0]);
//     console.log(countriesData[0].languages);
//     refs.countryContainer.innerHTML = markup;
//     console.log(markup);
// }



function fetchCountry(countryName) {
    const url = `https://restcountries.com/v3.1/name/${countryName}`
    return fetch(url)
        .then(res => { if (res.ok) { return res.json() } else {alert('NERABOTAET POCHEMUTO')} })
    // .then(renderCountryCard)
    // .catch(err => console.log('Error' + err)); 
}

function renderCountryCard(countriesData) {
    const markup = countryCardTpl(countriesData[0]);
    refs.countryContainer.innerHTML = markup;
    // console.log(countriesData[0].languages);
    
    // console.log(markup);
}

function onFetchError(error) {
    alert('NERABOTAET POCHEMUTO')
}
    