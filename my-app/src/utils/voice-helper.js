import PCRE from 'pcre-to-regexp';

export { searchRequest };

function searchRequest(recognitionText, requests) {
    console.log("phrase a reconnaitre : " + recognitionText);
    for (var i in requests) {
        console.log("request[" + i + "]" + "=" + requests[i]);
        var keys = [];
        var re = PCRE("%" + requests[i] + "$%ui", keys);
        var match = re.exec(recognitionText.trim());
        if (match) {
            var data = mapKeysMatches(keys, match);
            return { "id": i, "data": data };
        }
    }
    return null;
}

function mapKeysMatches(keys, match) {
    var datas = {};
    for (var i = 0; i < keys.length; i++) {
        if ("string" === typeof keys[i]) {
            datas[keys[i]] = match[i + 1];
        }
    }
    return datas;
}