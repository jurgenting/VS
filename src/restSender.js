// const axios = require('axios');
import axios from 'axios';

let data = JSON.stringify({
  "message": "Hello Kafka"
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'http://127.0.0.1:3000/send',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let i = 0;

while(i < 300) {
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


