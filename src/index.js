import './css/styles.css';
import debounce from "lodash.debounce";
import countryCardTpl from './tamplates/country-card.hbs';
import countryCardList from './tamplates/countrys-list.hbs';
import Notiflix from 'notiflix';


const refs = {
    searchForm: document.querySelector('#search-box'),
    countryContainer: document.querySelector('.country-info'),
    countrysList: document.querySelector('.country-list')
};

const DEBOUNCE_DELAY = 300;


refs.searchForm.addEventListener('input', debounce(onInput,DEBOUNCE_DELAY));

function onInput(e) {
    e.preventDefault();
    // console.log(refs.searchForm.value);
    if (refs.searchForm.value.trim()) {
        fetchCountry(refs.searchForm.value.trim())
            .then(renderCountryCard)
            .catch(onFetchError);
    }
    else {
        const markup = '';
        refs.countryContainer.innerHTML = markup;
    }
}


function fetchCountry(countryName) {
    const url = `https://restcountries.com/v3.1/name/${countryName}`
    return fetch(url)
        .then(res => {
            if (res.ok)
            { return res.json() }
            else
            {
                const markup = '';
                refs.countryContainer.innerHTML = markup;
                Notiflix.Notify.failure('Oops, there is no country with that name')
            }
        })
    // .then(renderCountryCard)
    // .catch(err => console.log('Error' + err)); 
}

function renderCountryCard(countriesData) {
    if (countriesData.length >= 10)
    {
        const markup = '';
        refs.countryContainer.innerHTML = markup;
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
    }
    else if (countriesData.length < 10 && countriesData.length >= 2)
    {
        // console.log(countriesData)
        markup = countryCardList(countriesData);
        refs.countryContainer.innerHTML = markup;
    }
    else if (countriesData.length === 1)
    {
        const markup = countryCardTpl(countriesData[0]);
        refs.countryContainer.innerHTML = markup;
    }
}

function onFetchError(error) {
    console.log('Somthing go wrong' + error)
}


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

// function initialize(countriesData) {
//     const markup = countryCardTpl(countriesData[0]);
//     console.log(countriesData[0].languages);
//     refs.countryContainer.innerHTML = markup;
//     console.log(markup);
// }
