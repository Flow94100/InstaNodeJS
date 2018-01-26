"use strict";

import { request } from "https";
const JSON = require('circular-json');

const fs = require("fs");
import EventEmitter from 'events';

class PluginService{

    constructor(){
        this.plugins = []
        this.clientsSockets = [];
        this.pluginsEvents = new EventEmitter();
    }

    addClientSocket(client){
      console.log("new client connected : ");
      for(var i in this.plugins){
        //console.log('plugin ' + JSON.stringify(this.plugins[i]));
        this.plugins[i].subscribeEvent(client);
      }
      this.clientsSockets.push(client);
    }

    emitEvent(name, data){
      for(var i in this.clientsSockets){
        this.clientsSockets[i].emit(name, data);
      }
    }

    loadPlugins(){
        var pluginsFolder = "./plugins"
        this.plugins = []
        fs.readdir(pluginsFolder, (err, files) => {
            files.forEach(file => {
                console.log('load file : ' + file);
                var tmpPlug = require("../" +pluginsFolder +"/"+ file+"/index.js").default;
                tmpPlug.setService(this);
                this.plugins.push(tmpPlug);
            })
        })

    }

    getAllPluginsRequest(){
        var allRequests = {}
        console.log(this.plugins)
        console.log("-----------------------------")
        console.log(this.plugins[0].requests["cryptoCompare"])
        for (var i in this.plugins){
            for(var j in this.plugins[i].getRequests()){
                allRequests[j] = this.plugins[i].getRequests()[j];
                console.log("J -> " + j)
                //allRequests.push(this.plugins[i].requests[j]);
                //allRequests.push({ time: 'quelle heure est-il' });
            }
        }
        return allRequests;
    }

    doPluginRequest(requestId, data){
        var tmpPlug = this.getPluginByRequestId(requestId)
        if(tmpPlug !== null){
            return tmpPlug.doRequest(requestId, data)
        }else{
            return "ret do pluginRequest"
        }
    }

    getPluginByRequestId(requestId){
        console.log(requestId)
        console.log("----------------------")
        console.log(this.plugins[0].getRequests())
        for(var i in this.plugins){
            for(var j in this.plugins[i].getRequests()){
                console.log("J : "+j)
                if(requestId === j){
                    return this.plugins[i]
                }
            }
        }
        return null
    }
}

export default new PluginService();
