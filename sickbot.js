var five = require("johnny-five");
var Spark = require("spark-io");
var keypress = require("keypress");

// //Activate keypress code
	keypress(process.stdin);

// Create Johnny-Five board connected via Spark
var board = new five.Board({
	io: new Spark({
		token: '3adb56a3c47a00f4a7f791968da1af987ed0adef',
		deviceId: 'sickbot'
	})
});

//Declare variables of items that will be in use
var sickBotLeft, sickBotRight;
//var ledEyes;

board.on("ready", function() {
	console.log("Alert, I am assemebling...");

	//WHEELS
	//Created a Servo object - will eventually need to set up 2 in order to controll seperately
	var sickBotLeft =  new five.Servo({	pin: 'D0', 	type: "continuous"}).stop();
	var sickBotRight  =  new five.Servo({	pin: 'A0', 	type: "continuous"}).stop();
	
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

      console.log("CW");
      sickBotLeft.ccw();
      sickBotRight.cw();

    } else if (key.name === "down") {

      console.log("CCW");
      sickBotLeft.cw();
      sickBotRight.ccw();

    } else if (key.name === "space") {

      console.log("Stopping");
      sickBotLeft.stop();
      sickBotRight.stop();

    } else if (key.name === "left") {

	  console.log("Left");
      sickBotLeft.ccw();
      sickBotRight.ccw();

    } else if (key.name === "right") {

	  console.log("Right");
      sickBotLeft.cw();
      sickBotRight.cw();

    }

});

//EYES
	// ledEyes = new five.Led('D0');
	// ledEyes.strobe(3000);

//Allow access directly from command line	
	board.repl.inject({
		sickBotLeft: sickBotLeft,
		sickBotRight: sickBotRight//,
		//ledEyes: ledEyes
	}); 
	console.log("Fully asssembled. Let's go!");
}); //End of board.on function