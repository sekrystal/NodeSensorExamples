/*
 GPIO input

 created 17 Feb 2019
 by Tom Igoe
*/

let Gpio = require('onoff').Gpio; // include onoff library

// set I/O pin as input, listening for both rising and falling changes:
let button = new Gpio(18, 'in', 'both');   

// event listener function for button:
function readButton(error, value) {
    if (error) throw error;
    console.log(value);
}
 
// start the event listener:
button.watch(readValue);