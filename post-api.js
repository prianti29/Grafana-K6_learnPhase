import http from 'k6/http'
import { check } from 'k6'

export const options = {
    vus : 10,
    duration : '5s'
}
const url = "https://reqres.in/api/users";

//if the payLoad is too big then use extarnal json file
const payLoadData = open('./payload.json'); 

const payLoad = {
    "name": "morpheus",
    "job": "leader"
}; 

export default function() {

    const response = http.post(url,payLoadData);
    console.log("PayLoad", payLoadData);
    console.log("Response", response.body);
    check(response, {
        'Status code validation':(response)=> response.status===201,
        'Response ID validation':(response)=> response.body.includes('id'),
        'Response name validation':(response)=> response.body.includes('name')
    }); 
}