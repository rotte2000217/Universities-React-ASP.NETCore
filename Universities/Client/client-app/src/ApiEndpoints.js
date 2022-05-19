const baseURL = 'https://localhost:44352/';

const endpoints = {
    baseURL: baseURL,
    homePage: baseURL + 'home',
    loginPage: baseURL + 'identity/login',
    registerPage: baseURL + 'identity/register',
    getCountries: baseURL + 'search/getcountries',
    getUniversitiesByCountry: baseURL + 'search/GetUniversitiesByCountry',
    addToWatchlist: baseURL + 'watchlist/Add',
    getWatchlist: baseURL + 'watchlist/Get',
    exportWatchlist: baseURL + 'watchlist/Export'
}

export default endpoints;