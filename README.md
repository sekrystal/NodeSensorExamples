# Node Sensor Examples

This repository will contain examples of how to connect sensors to an embedded processor like a Raspberry Pi or BeagleBone using node.js.

For those familiar with [Arduino](http://www.arduino.cc) or [Processing](http://www.processing.org) or [p5.js](www.p5js.org), I'll attempt to translate the programming concepts with which you're familiar in those environments to this one.

To start with, there generally is no `setup()` and `loop()` function in these examples. Node.js is very event-based, so it's more usual to start your script with global constants and variables to set your configuration, then to define your functions, then to finish your script by calling one or more of those functions. You might, foe example, define interval functions to poll a given sensor periodically and get the latest reading. Or if a sensor's library returns events, such as the [onoff library](https://www.npmjs.com/package/onoff), you might watch the sensor for changes.

One great thing about JavaScript as a platform for sensors is that you can define multiple intervals at different rates. For example, if you wanted to read a temperature sensor once a second, but a potentiometer once every 20 milliseconds, you could do something like this:

````
setInterval(readTemperature, 1000);
setInterval(readPotentiometer, 20);
````

More to come as the repository develops.
