import { getAllNames } from './api.js';
import { createMiniCountries, makeApiAndCreate } from './createCountries.js';

export const declareEvents = () => {
    //nav bar
    let navList = document.querySelectorAll('nav a');
    navList.forEach(item => {
        item.addEventListener('click', (e) => {
            document.getElementById('select').selectedIndex = 0;
            //home
            if (e.target.dataset.name == "all") {
                makeApiAndCreate("home", "mini")
            }
            //other
            else {
                makeApiAndCreate("code", "full", e.target.dataset["name"])
            }
        })
    })

    //search
    let searchBtn = document.querySelector('#search_button');
    let searchValue = document.querySelector('#search_input');
    const search = () => {
        document.getElementById('select').selectedIndex = 0;
        let allNames = getAllNames();
        document.querySelector('.row').innerHTML = "Loading..."
        allNames.then(res => {
            let filtered = res.filter(item => {
                if (item.name.common.toLowerCase().includes(searchValue.value.toLowerCase())) {
                    return item;
                }
            })
            if (filtered == "") {
                document.querySelector('.row').innerHTML = `<span class="fs-2 text-center">There is no country called ${searchValue.value}:(</span>`
                document.querySelector('#search_input').value = ""
            }
            else {
                createMiniCountries(filtered, `<span class="fs-2 mb-1 text-center">Showing results for ${searchValue.value}:</span>`);
                document.querySelector('#search_input').value = ""
            }
        })
    }

    searchBtn.addEventListener('click', search)
    searchValue.addEventListener('keypress', (e) => {
        if (e.key === "Enter") {
            search();
        }
    })

    //select

    //select Initialize
    let select = document.querySelector('#select');
    const selectInitialize = () => {
        let allCountries = getAllNames();
        allCountries.then(countries => {
            countries.forEach(country => {
                let name = document.createElement('option');
                name.innerHTML = country.name.common;
                select.append(name);
            })
        })
        select.removeEventListener('click', selectInitialize)
    }

    select.addEventListener('click', selectInitialize)

    //select choice
    select.addEventListener('change', (e) => {
        const selectedValue = e.target.value;
        makeApiAndCreate("name", "full", selectedValue)
    })
}
