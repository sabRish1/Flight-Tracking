import request from "../request";

import {AIRPORT_LIST_URL} from '../constants'


export const getListOfAirports = () => new Promise((resolve,reject) => {
    const listofAirpots = request(AIRPORT_LIST_URL);

    listofAirpots.then((response) => {
        resolve(response.data);
    }).catch((error) =>{
        reject(error);
    });
});
