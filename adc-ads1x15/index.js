/*
  Potentiometer and temperature sensor reader for
  ADS1x15 analog-to-digital converter on Raspberry Pi.

  This script reads two analog sensors through
  a Texas Instruments ADS1x15 ADC. Channel 1 has a potentiometer attached,
  and channel 2 has an Analog Devices TMP36 temperature sensor.
  The script reads the potentiometer once every 20ms,
  and the temperature sensor once a second.

  Relies on this library for the ADS1x15 sensors:
  https://github.com/alphacharlie/node-ads1x15

  Datasheet on the TMP36 can be found here:
  http://www.analog.com/media/en/technical-documentation/data-sheets/TMP35_36_37.pdf

  Datasheet on the ADS1015 can be found here:
  http://www.ti.com/lit/ds/symlink/ads1015-q1.pdf

  created 18 Feb 2018
  by Tom Igoe

*/

const ads1x15 = require('node-ads1x15');    // include the library
const chip = 0;                     // set the model number: 0 for ads1015, 1 for ads1115
var adc = new ads1x15(chip);

// see https://github.com/alphacharlie/node-ads1x15 for acceptable values on these:
var samplesPerSecond = '250';
var progGainAmp = '4096';

// define an object with all the sensor values:
var device = {
  temperature: 0,
  potentiometer: 0
}

// a watch function for the potentiometer:
function potentimeterWatch() {
  readChannel(0, readPotentiometer);
  console.log('Potentiometer: ' + device.potentiometer);
}

// a watch function for the temperature sensor:
function temperatureWatch() {
  readChannel(1, convertTemperature);
  console.log('\t temperature: ' + device.temperature + '°C');
}

// reads a channel of the ADC:
function readChannel(channel, callback) {
  if(!adc.busy) {
    adc.readADCSingleEnded(channel, progGainAmp, samplesPerSecond, callback);
  }
}

// takes the potentiometer reading and puts it in the device object:
function readPotentiometer(error, reading) {
  if (error) {
    throw error;
  } else {
    device.potentiometer = reading;
  }
}

// converts TMP36 sensor reading to temperature and
// puts it in the device object:
function convertTemperature(error, reading) {
  if (error) {
    throw error;
  } else {
    let voltageRange = 3.3;
    let sensorRange = 3300;
    let voltage = reading * voltageRange / sensorRange;
    let temperature = (voltage - (voltageRange/10)) /.01;
    device.temperature = temperature;
  }
}

// run the sensor watches:
setInterval(potentimeterWatch, 20);   // potentiometer every 20ms
setInterval(temperatureWatch, 1000);  // temperature every second
