var five = require("johnny-five");
var Spark = require("spark-io");
var keypress = require("keypress");
//var sonar = require("sonar");

// //Activate keypress code
	keypress(process.stdin);

// Create Johnny-Five board connected via Spark
var board = new five.Board({
	io: new Spark({
		token: '3adb56a3c47a00f4a7f791968da1af987ed0adef',
		deviceId: 'sickbot'
	})
});

//Servos variables before renaming
var servosLeft, servosRight, servos;

board.on("ready", function() {
	console.log("Alert, I am assemebling...");

	//SENSOR
	var sensor = new five.Sensor({
		pin: 'A1',
		freq: 250,
		threshold: 5
	});
		sensor.scale([0, 10]).on('data', function(){
			console.log(this.value);
		});

	//WHEELS
	servosLeft = new five.Servo({pin: 'D0', type: "continuous"}).stop();
	servosRight =  new five.Servo({pin: 'A0', type: "continuous"}).stop();


	//Using Keypress to control wheels
	process.stdin.resume();
	process.stdin.setEncoding("utf8");
  	process.stdin.setRawMode(true);

  	process.stdin.on("keypress", function(ch, key) {

    if (!key) {
      return;
    }

    if (key.name === "q") {

      console.log("Quitting");
      process.exit();

    } else if (key.name === "up") {

      console.log("CCW");
      servosLeft.cw();
      servosRight.ccw();


    } else if (key.name === "down") {

      console.log("CW");
      servosLeft.ccw();
      servosRight.cw();

    } else if (key.name === "space") {

      console.log("Stopping");
      servosLeft.stop();
      servosRight.stop();

    } else if (key.name === "left") {

	  console.log("Left");
      servosLeft.ccw();
      servosRight.ccw();

    } else if (key.name === "right") {

	  console.log("Right");
      servosLeft.cw();
      servosRight.cw();

    }

});

//Allow access directly from command line	
	board.repl.inject({
		servosLeft:servosLeft,
		servosRight: servosRight
	}); 
	console.log("Fully asssembled. Let's go!");
}); //End of board.on function