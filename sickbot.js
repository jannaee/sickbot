var five = require("johnny-five"),
	Spark = require("spark-io"),
	keypress  = require('keypress');

//Activate keypress code
keypress(process.stdin);

// Create Johnny-Five board connected via Spark
var board = new five.Board({
	io: new Spark({
		token: '3adb56a3c47a00f4a7f791968da1af987ed0adef',
		deviceId: 'sickbot'
	})
});

//Declare variables of items that will be in use
var sickBot, ledEyes;

board.on("ready", function() {
	console.log("Assemebled");



//WHEELS
	//Created a Servo object - will eventually need to set up 2 in order to controll seperately
	sickBot =  new five.Servo({
		//PWM is available on D0, D1. Should include A0, A1, A5
		pin: 'A0', 
		type:"continuous"
	}).stop();

	sickBot.cw();	

//Using Keypress to control wheels



//EYES
	ledEyes = new five.Led('D0');
	ledEyes.strobe(3000);

//Allow access directly from command line	
	board.repl.inject({
		sickBot: sickBot,
		ledEyes: ledEyes
	}); 
	console.log("Loaded");
}); //End of board.on function