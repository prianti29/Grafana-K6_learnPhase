import http from 'k6/http'
import { check } from 'k6'
import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js'

export const options = {
    vus : 10,
    duration : '5s'
}
const url = "https://reqres.in/api/users";

//if the payLoad is too big then use extarnal json file
// const payLoadData = open('./payload.json'); 

const payLoad = {
    "name": randomString(8),
    "job": "leader"
}; 

export default function() {

    const response = http.post(url,payLoad);
    // console.log("PayLoad", payLoad);
    check(response, {
        'Status code validation':(response)=> response.status===201,
        'Response ID validation':(response)=> response.body.includes('id'),
        'Response name validation':(response)=> response.body.includes('name')
    }); 
}