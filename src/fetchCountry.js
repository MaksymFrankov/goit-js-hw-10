export { fetchCountry };

import Notiflix from 'notiflix';

async function fetchCountry(countryName) {
    const url = `https://restcountries.com/v3.1/name/${countryName}`
    const res = await fetch(url);
    if (res.ok) { return res.json(); }

    else {
        const markup = '';
        document.querySelector('.country-info').innerHTML = markup;
        Notiflix.Notify.failure('Oops, there is no country with that name');
    }
};
