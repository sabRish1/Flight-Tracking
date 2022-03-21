import request from "../request";

import {FLIGHT_STATUS_URL} from '../constants'


export const getDetails = (departureDate,origin,destination) => new Promise((resolve,reject) => {

    var requestUrl =  `${FLIGHT_STATUS_URL}?departureDate=${departureDate}&origin=${origin}&destination=${destination}`
    
    const listofAirpots = request(requestUrl);

    listofAirpots.then((response) => {
        resolve(response.data);
    }).catch((error) =>{
        reject(error);
    });
});
