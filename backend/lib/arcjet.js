//arcjet.js is a file that contains the configuration for arcjet, a library that helps you protect your app from bots and malicious traffic. It also provides rate limiting to prevent abuse of your API.


import arcjet,{ tokenBucket,shield,detectBot } from '@arcjet/node';

import dotenv from "dotenv";
dotenv.config();

//initialize arcjet with your secret key

export const aj=arcjet({
    key: process.env.ARCJET_KEY,
    characteristics:["ip.src"],
    rules:[
        //shield and detectBot are two rules that we can use to protect our app from bots and malicious traffic 
      shield({ mode:"DRY_RUN"}),
      detectBot({ 
        mode:"DRY_RUN",
        allow:["CATEGORY_SEARCH_ENGINE"]
    }),
    //rate limiting
    tokenBucket({
      mode: "DRY_RUN",
      interval:5,
      capacity: 20,
      refillRate: 30
    })
    ]
});



