import './css/styles.css';
import debounce from "lodash.debounce";
import countryCardTpl from './tamplates/country-card.hbs';
import countryCardList from './tamplates/countrys-list.hbs';
import Notiflix from 'notiflix';
import { fetchCountry } from './fetchCountry.js';

const refs = {
    searchForm: document.querySelector('#search-box'),
    countryContainer: document.querySelector('.country-info'),
    countrysList: document.querySelector('.country-list'),
};

const DEBOUNCE_DELAY = 300;
const INFO_MESSAGE = 'Too many matches found. Please enter a more specific name.';
const NO_COUNTRY_FOUND_MESSAGE = 'Oops, there is no country with that name';
const ERROR_MESSAGE = 'Oops, somthing go wrong, please try later';


refs.searchForm.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
    e.preventDefault();
    if (refs.searchForm.value.trim()) {
        fetchCountry(refs.searchForm.value.trim())
            .then(onRespondCheck)
            .catch(onFetchError);
    }
    else {
        clearMarkup();
    }
};

function onRespondCheck(countriesData) {
    if (countriesData=== 'Not found') {
        clearMarkup();
        Notiflix.Notify.failure(NO_COUNTRY_FOUND_MESSAGE);
    }
    else if (countriesData === 'Unexpected error') {
        Notiflix.Notify.failure(ERROR_MESSAGE);
    }
    else if (countriesData) {

        if (countriesData.length >= 10) {
            clearMarkup();
            Notiflix.Notify.info(INFO_MESSAGE);
        }

        else if (countriesData.length < 10 && countriesData.length >= 2) {
            renderCountriesList(countriesData);
        }
        
        else if (countriesData.length === 1) {
            renderCountryCard(countriesData);
        }
    } 
}

function renderCountriesList(countriesData) {
    refs.countryContainer.innerHTML = countryCardList(countriesData);
};

function renderCountryCard(countriesData) {
    refs.countryContainer.innerHTML = countryCardTpl(countriesData[0]);
}

function clearMarkup() {
    refs.countrysList.innerHTML = '';
    refs.countryContainer.innerHTML = '';
};

function onFetchError(error) {
    console.log(error);
};