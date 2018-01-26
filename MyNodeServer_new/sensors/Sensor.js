const schedule = require('node-schedule');

class Sensor {

  constructor(name, period, script, service){
    this.name = name;
    this.period = period;
    this.script = path.resolve(__dirname, 'lib/'+script);
    this.job = null;
    this.service = service;
  }

  start(){
      var obj = this;
      setTimeout(function(){
        var command = 'python' + obj.script;
        //console.log(command);
        var process = child.exec(command, options, function (error, stdout, stderr){
          try {
            obj.service.emitEvent("serverSensor"+obj.name+"Values",JSON.parse(stdout));
            obj.service.pluginsEvents.emit("serverSensor"+obj.name+"Values",JSON.parse(stdout));
          } catch (e) {
            console.log(e);
          }
          if(error){
            console.log(stderr);
          }
        });
        obj.start();
      }, this.period);
  }
}

export default Sensor;
