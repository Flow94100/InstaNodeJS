import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import VoiceRecognition from './components/VoiceComponents/VoiceRecognition.js'
import Crypto from './components/CryptoComponents/Crypto.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Crypto/>
      </div>
    );
  }
}

export default App;
