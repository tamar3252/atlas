export const getHomeApi = async () => {
    let url = `https://restcountries.com/v3.1/alpha?codes=ISR,USA,THA,FRA`
    const resp = await fetch(url);
    let data = await resp.json();
    return data;
}
export const getAllNames = async () => {
    let url = `https://restcountries.com/v3.1/independent?status=true&fields=name,flags`
    const resp = await fetch(url);
    let data = await resp.json();
    return data;
}
export const getApiByCode = async (code) => {
    let url = `https://restcountries.com/v3.1/alpha?codes=${code}`
    const resp = await fetch(url);
    let data = await resp.json();
    return data;
}
export const getApiByName = async (name) => {
    let url = `https://restcountries.com/v3.1/name/${name}`
    const resp = await fetch(url);
    let data = await resp.json();
    return data;
}
