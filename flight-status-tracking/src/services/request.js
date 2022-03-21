import axios from 'axios';

export default function request(url,options){
    let Urloptions = {
        url : url
    }

    return axios(Urloptions)
    //.then(parseJson)
    .then(data => {return Promise.resolve({data})})
    .catch(error => {return Promise.resolve({error})})
}

function parseJson(response){
    return response.json();
}