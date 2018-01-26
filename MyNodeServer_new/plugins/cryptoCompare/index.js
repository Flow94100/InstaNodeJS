import Plugin from "../../models/Plugin.js";
import axios from 'axios';
import { getCurrentMonneyValue, subscribeToEvent, start } from './utils.js';


class CryptoPlugin extends Plugin {

    doRequest(id, data) {
        console.log("request : " + id);
        switch (id) {
            case "crypto":
                var res = getCurrentMonneyValue("BTC");

                console.log("response : " + res);
                var obj = JSON.parse(res);
                var btc = obj["BTC"]["EUR"];
                var eth = obj["ETH"]["EUR"];
                var ltc = obj["LTC"]["EUR"];
                return { "toSay": "Le Bitcoin vaut : " + btc + " €, le Litecoin : " + ltc + " €, l'Etherum : " + eth + " €.", "val": obj };
        }
        return null;
    }

    setService(service) {
        this.service = service;

    }

}

export default new CryptoPlugin(__dirname);
