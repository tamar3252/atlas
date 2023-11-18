import Country from './country.js';
import { getApiByCode, getApiByName, getHomeApi, getAllNames } from './api.js';

export const createCountries = (countries) => {
    document.querySelector('.row').innerHTML = ""
    countries.forEach(item => {
        let country = new Country(".row", item);
        country.render();
    });
}
export const createMiniCountries = (countries, title = "") => {
    document.querySelector('.row').innerHTML = `${title}<br</br>`
    countries.forEach(item => {
        let country = new Country(".row", item);
        country.renderMini();
    });
}

export const makeApiAndCreate = (apiName, createName, value = "") => {
    let arr;
    switch (apiName) {
        case "name":
            arr = getApiByName(value);
            break;
        case "code":
            arr = getApiByCode(value);
            break;
        case "all":
            arr = getAllNames();
            break;
        case "home":
            arr = getHomeApi();
            break;
    }
    switch (createName) {
        case "full":
            arr.then(res => {
                createCountries(res);
            })
            break;
        case "mini":
            arr.then(res => {
                createMiniCountries(res);
            })
            break;
    }
}


