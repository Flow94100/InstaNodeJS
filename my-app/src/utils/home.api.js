import axios from "axios";
import openSocket from 'socket.io-client';

const BASE_URL = "http://localhost:4001";

export { getRequestdata, sendRequest };

function getRequestdata() {
  const url = BASE_URL + "/requests";
  return axios.get(url).then(response => response.data);
}

function sendRequest(requestId, requestData) {
  const url = BASE_URL + "/request/" + requestId;
  return axios.post(url, requestData).then(response => response.data);
}

function getPluginsViews() {
  console.log("GET plugins");
  const url = `${BASE_URL}/plugins`;
  return axios.get(url).then(response => response.data);
}