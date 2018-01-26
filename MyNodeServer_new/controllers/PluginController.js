import pluginService from "../services/PluginService.js";

class PluginController {
    constructor() {
        pluginService.loadPlugins();
    }

    getAllPluginsRequest(req, res) {
        res.end(JSON.stringify(pluginService.getAllPluginsRequest()));
    }

    doRequest(req, res) {
        res.end(JSON.stringify(pluginService.doPluginRequest(req.params.requestId, req.body)));
    }

    addClientSocket(client) {
        pluginService.addClientSocket(client);
    }
}

export default new PluginController(__dirname);
