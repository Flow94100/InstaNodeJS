import React from 'react';
import PropTypes from 'prop-types';
import SpeechRecognition from 'react-speech-recognition';

import { getRequestdata, sendRequest } from '../../utils/home.api';
import { searchRequest } from '../../utils/voice-helper';

import { Button, Glyphicon } from 'react-bootstrap';
import './crypto.css';
import 'bootstrap/dist/css/bootstrap.css';

import greenArrow from './Img/GreenArrow.png';
import redArrow from './Img/redArrow.png';

const propTypes = {
    transcript: PropTypes.string,
    resetTranscript: PropTypes.func,
    browserSupportsSpeechRecognition: PropTypes.bool
}

class Crypto extends React.Component {

    constructor(props) {
        super(props);
        this.synth = window.speechSynthesis;
        this.coursBTC = 0;
        this.coursETH = 0;
        this.coursLTC = 0;
        this.coursBTCOld = 0;
        this.coursETHOld = 0;
        this.coursLTCOld = 0;
    }

    getRequestData() {
        getRequestdata().then((requests) => {
            console.log(requests);
            var obj = this;
            this.props.recognition.onresult = function (event) {
                var result = event.results[event.results.length - 1]
                if (result.isFinal) {
                    console.log(result);
                    var now = new Date();
                    var objRequest = searchRequest(result[0].transcript, requests);
                    if (objRequest) {
                        obj.sendRequest(objRequest.id, objRequest.data);
                    }
                }
            }
        });
    }

    sendRequest(requestId, requestData) {
        sendRequest(requestId, requestData).then((response) => {
            console.log(response);
            var ulterThis = new SpeechSynthesisUtterance(response["toSay"]);
            this.coursBTCOld = this.coursBTC;
            this.coursETHOld = this.coursETH;
            this.coursLTCOld = this.coursLTC;

            this.coursBTC = response["val"]["BTC"]["EUR"];
            this.coursETH = response["val"]["ETH"]["EUR"];
            this.coursLTC = response["val"]["LTC"]["EUR"];
            this.synth.speak(ulterThis);
            this.props.stopListening();
        })
    }

    componentDidMount() {
        this.getRequestData();
    }

    render() {
        const { startListening, stopListening, browserSupportsSpeechRecognition } = this.props;
        if (!browserSupportsSpeechRecognition) {
            console.log("Non supporte");
            return null;
        }

        return (
            <div class="body">

                <div class="image-aboutus-banner">
                    <h2>Cryptocurrencies</h2>
                </div>

                <div class="question">
                    {
                        this.props.listening ?
                            <Button onClick={stopListening} bsStyle="success" class="question1 btnsize" bsSize="large">Je vous écoutes...</Button> :
                            <Button onClick={startListening} bsStyle="default" class="question1" bsSize="large">Crypto</Button>
                    }
                </div>

                <hr />

                <div class="bitcoinlist">
                    <div class="bitcoin">
                        <table>
                            <tr>
                                <td><Button bsStyle="danger" bsSize="large">BITCOIN</Button></td>
                                <td>
                                    {
                                        this.coursBTC >= this.coursBTCOld ?
                                            <div><h3 class="myGreen">{this.coursBTC} € </h3> <img class="myImg" src={greenArrow} /> </div> :
                                            <div><h3 class="myRed">{this.coursBTC} €</h3> <img class="myImg" src={redArrow} /></div>
                                    }
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <hr />
                <div class="bitcoinlist">
                    <div class="bitcoin">
                        <table>
                            <tr>
                                <td><Button bsStyle="warning" bsSize="large">LITECOIN</Button></td>
                                <td>
                                    {
                                        this.coursLTC >= this.coursLTCOld ?
                                            <div><h3 class="myGreen">{this.coursLTC} €</h3> <img class="myImg" src={greenArrow} /></div> :
                                            <div><h3 class="myRed">{this.coursLTC} €</h3> <img class="myImg" src={redArrow} /></div>
                                    }
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <hr />
                <div class="bitcoinlist">
                    <div class="bitcoin">
                        <table>
                            <tr>
                                <td><Button bsStyle="primary" bsSize="large">ETHEREUM</Button></td>
                                <td>
                                    {
                                        this.coursETH >= this.coursETHOld ?
                                            <div><h3 class="myGreen">{this.coursETH} €</h3> <img class="myImg" src={greenArrow} /></div> :
                                            <div><h3 class="myRed">{this.coursETH} €</h3> <img class="myImg" src={redArrow} /></div>
                                    }
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <hr />
            </div>
        )
    }
}

const options = {
    autoStart: false
}

Crypto.propTypes = propTypes;
export default SpeechRecognition(options)(Crypto);