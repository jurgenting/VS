// const axios = require('axios');
import axios from 'axios';


let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://petstore.swagger.io/v2/pet/findByStatus?status=pending',
  headers: { 
    'Content-Type': 'application/json'
  }
};


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let i = 0;

while(i < 1) {
    await sleep(100);
    axios.request(config)
        .then((response) => {
        console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
        console.log(error);
        });
    
        i = i + 1;

}


