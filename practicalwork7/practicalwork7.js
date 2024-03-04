module.exports = function(RED) {
    function TemperatureConverterNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;

        node.on('input', function(msg) {
            var temperature = parseFloat(msg.payload);
            var unit = config.units || "Celsius";

            if (isNaN(temperature)) {
                node.error("Invalid input temperature");
                return;
            }

            var convertedTemperature;
            if (unit === "Celsius") {
                convertedTemperature = (temperature - 32) * (5/9);
            } else {
                convertedTemperature = (temperature * (9/5)) + 32;
            }

            msg.payload = convertedTemperature;
            node.send(msg);
        });
    }

    RED.nodes.registerType("pw7", TemperatureConverterNode);
}
