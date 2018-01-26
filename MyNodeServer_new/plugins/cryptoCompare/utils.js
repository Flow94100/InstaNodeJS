import axios from 'axios';
import openSocket from 'socket.io-client';
var request = require('sync-request');

const BASE_URL = 'http://localhost:3000';

export {getCurrentMonneyValue, sendRequest, getPluginsViews, start};

function getCurrentMonneyValue(monnaie){
  const url = "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC&tsyms=USD,EUR&e=Coinbase&extraParams=your_app_name";
  var res = request('GET', url);
  console.log("Body---------------------: "+res.getBody());
  return res.getBody();
}

function sendRequest(requestId, requestData){
  console.log("Send de la request post");
  const url = `${BASE_URL}/request/`+requestId;
  return axios.post(url,requestData).then(response.data);
}

function getPluginsViews(){
  console.log("GET plugins");
  const url = `${BASE_URL}/plugins`;
  return axios.get(url).then(response => response.data);
}

function start(myObj){
  var obj = myObj;
  setTimeout(function(){
    
    obj.service.emitEvent("serverSensor"+obj.name+"Values", "Echange");
    obj.service.pluginsEvents.emit("serverSensor"+obj.name+"Values", "Echange 2");
      
    start(myObj);
  }, 10000);
}
