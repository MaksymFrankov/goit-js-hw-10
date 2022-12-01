export { fetchCountry };

async function fetchCountry(countryName) {
    const url = `https://restcountries.com/v3.1/name/${countryName}`
    const res = await fetch(url);
    // console.log(res);
    if (res.status == 200) {return res.json();  }
    else if (res.status == 404) { return 'Not found' }
    else {return 'Unexpected error'}
};