//Initialize express router
let router = require('express').Router();

//Invoke Light Sensor
router.get('/islight', function (req, res) {
    const { spawn } = require('child_process');
    const pyprog = spawn('python', ['../light-sensor.py']);

    pyprog.stdout.on('data', function(data) {
        res.write(data);
	res.end('end');
    });
});

//Invoke Movement Sensor
router.get('/detectMotion', function (req, res) {
    const { spawn } = require('child_process');
    const pyprog = spawn('python3', ['../motionsensor.py']);
    /*res.writeHead(200, {
	    'Content-Type': 'text/event-stream',
	    'Cache-Control': 'no-cache',
	    'Connection': 'keep-alive',
	});
    res.write('\n');*/
    pyprog.stdout.on('data', function(data) {
	res.write("event: message\n");
	res.write("data:" + JSON.stringify(JSON.parse(data)));
	res.write("\n\n");
	res.end();
    });
    pyprog.stderr.on('data', function(data) {
	console.log(data.toString('utf8'));
    });

});

//Turn off light
router.get('/turnLightOff', function (req, res) {
    const { spawn } = require('child_process');
    const pyprog = spawn('python3', ['../lightOff.py']);
    pyprog.stdout.on('data', function(data) {
	res.send({"data": "Off"});
    });    
});

//Start video-registration
router.get('/startRec', function (req, res) {
    const { spawn } = require('child_process');
    const pyprog = spawn('python3', ['../securitycamera.py']);
    /*res.writeHead(200, {
	    'Content-Type': 'text/event-stream',
	    'Cache-Control': 'no-cache',
	    'Connection': 'keep-alive',
	});
    res.write('\n');*/
    pyprog.stdout.on('data', function(data) {
	res.write("event: message\n");
	res.write("data:" + JSON.stringify(JSON.parse(data)));
	res.write("\n\n");
	res.end();
    });
});


//Export API routes
module.exports = router;



//Export API routes
module.exports = router;
