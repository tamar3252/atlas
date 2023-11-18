import { getApiByCode, getApiByName } from './api.js';
import {  makeApiAndCreate } from './createCountries.js';

export default class Country {
    constructor(parent, item) {
        this.parent = parent;
        this.name = item.name.common;
        this.capital = item.capital?.[0];
        this.languages = item.languages;
        this.population = item.population;
        this.region = item.region;
        this.flag = item.flags.png;
        this.borders = item.borders;
        this.lat = item.latlng?.[0];
        this.lon = item.latlng?.[1];
    }
    render() {
        let { name, capital, languages, population, region, borders, flag } = this;
        languages = Object.values(languages);

        let div = document.createElement("div");
        div.className = "text-secondary border bg-white w-100 border border-4 p-0";
        document.querySelector(this.parent).append(div);
        div.innerHTML += `
        <div class="d-flex justify-content-between p-0 row">
        <div class="col-md-12 col-xl-4 ms-1 fs-5">
        <h1 class="text-center"><b>${name}</b></h1>
        <img class="w-100" src=${flag}>
        <div class="mt-1"><b>capital: </b>${capital}</div>
        <div><b>population: </b>${population}</div>
        <div><b>region: </b>${region}</div>
        <div><b>languages: </b>${(languages)}</div>
        </div>
        <div class="col-md-12 col-xl-7">
        <iframe class="me-0 pe-0" width="100%" height="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"
        src="https://maps.google.com/maps?q=${this.lat},${this.lon}&hl=es&z=8&amp;output=embed">
        </iframe>
        </div>
        </div>
        `
        div.setAttribute('data-aos', 'flip-left');
        div.setAttribute('data-aos-duration', '2000');

        //borders
        if (borders) {
            let bordersDiv = document.createElement("div");
            bordersDiv.innerHTML = '<b>borders: </b>'
            borders.forEach((element, i) => {
                let a = document.createElement("a");
                a.href = "#";
                a.style.textDecoration = "none";
                a.style.color = 'black'
                let country = getApiByCode(element)
                country.then(item => {
                        if (i == borders.length - 1) {
                            a.innerHTML = `${item[0].name.common}.`
                        }
                        else {
                            a.innerHTML = `${item[0].name.common}, `
                        }
                        bordersDiv.appendChild(a);
                })
                a.addEventListener(
                    'click', () => {
                        document.getElementById('select').selectedIndex = 0;
                        makeApiAndCreate("code", "full", element)
                    }
                )
            })
            div.querySelector('div').querySelector('div').appendChild(bordersDiv)
        }

        //home button
        let btnHome = document.createElement("button");
        btnHome.innerHTML = 'Home';
        btnHome.className = "btn btn-secondary"
        btnHome.addEventListener('click', () => {
            makeApiAndCreate("home", "mini")
        })
        div.querySelector('div').querySelector('div').append(btnHome);
    }


    
    renderMini() {
        let { name, flag } = this;
        let div = document.createElement("div");
        div.className = "box bg-gradient border border-3 p-0";
        document.querySelector(this.parent).append(div);
        div.innerHTML += `
        <h1 class="text-center mt-1"><b>${name}</b></h1>
        <img class="img w-100 mb-0 pb-0" src=${flag} >`

        div.setAttribute('data-aos', 'zoom-in-up');
        div.setAttribute('data-aos-duration', '3000');

        div.addEventListener('click', () => {
            let country = getApiByName(name)
            country.then(i => {
                i.forEach(item => {
                    this.capital = item.capital[0];
                    this.languages = item.languages;
                    this.population = item.population;
                    this.region = item.region;
                    this.borders = item.borders;
                    this.lat = item.latlng?.[0];
                    this.lon = item.latlng?.[1];
                })
                document.querySelector(this.parent).innerHTML = ""
                this.render();
            })
        })
    }
}