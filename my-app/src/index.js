import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
//import {subscribeToEvent} from './utils/home.api.js'
ReactDOM.render(
  <App />,
  document.getElementById('root')
);



//subscribeToEvent("connection", function(){console.log('Ecoute');})