import http from 'k6/http'
import { check } from 'k6'
import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js'
import faker from 'https://cdnjs.cloudflare.com/ajax/libs/Faker/3.1.0/faker.min.js'

export const options = {
    vus : 10,
    duration : '5s'
}
const url = "https://reqres.in/api/users";

//create payload with random js
const payLoad = {
    "name": randomString(8),
    "job": "leader"
}; 
// create paylaod with faker js
const paylaodData = {
    "name": faker.name.findName(),
    "job": "leader"
}

export default function() {

    const response = http.post(url,paylaodData);
    console.log("PayLoad", paylaodData);

    check(response, {
        'Status code validation':(response)=> response.status===201,
        'Response ID validation':(response)=> response.body.includes('id'),
        'Response name validation':(response)=> response.body.includes('name')
    }); 
}