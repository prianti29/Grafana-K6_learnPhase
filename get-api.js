import http from 'k6/http'
import {check} from 'k6'

export const options = {
    vus : 10,
    iterations : 20
}
const params = {
    headers : {
        'Authorization' : 'Bearer e956d6119166c4e5acd9a641b995234453475f23517454556ec2b7cfa3c77f87'
    }
}
let api_headers = {
    'Authorization' : 'Bearer e956d6119166c4e5acd9a641b995234453475f23517454556ec2b7cfa3c77f87'
}

const url = "https://gorest.co.in/public/v2/users";
export default function() {
    //with headers
    //const response =  http.get("https://gorest.co.in/public/v2/users",{ headers : api_headers}); 
   //with parameter
   const response =  http.get(url,{ params }); 

 
   check(response, {
    'Status code validation':(response)=> response.status===200
   })
}