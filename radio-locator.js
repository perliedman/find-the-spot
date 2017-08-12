var haversine = require('haversine-distance')
var runningAverage = require('./running-average')
var fs = require('fs')
var fragShader = fs.readFileSync(__dirname + '/shader.frag', 'utf8')
var lastUpdate


var pulseFrequency = runningAverage(20)
pulseFrequency.put(1)
function updateBeep (beep, distance) {
	var logDist = Math.log(Math.max(0,Math.max(0.1, distance) / 2))

	var toneFrequency = Math.max(400, 4000 - Math.pow(logDist, 3) * 25)
	beep.setToneFrequence(toneFrequency)

	if (distance < 5) {
		beep.setConstant()
		pulseFrequency.put(20)
	} else {
		var frequency = 10 / Math.max(0.5, logDist)
		beep.setBeeping()
	    beep.setBeepFrequence(frequency)
		pulseFrequency.put(frequency)
	}

	var now = +new Date()
	if (lastUpdate) {
		var dt = now -lastUpdate
		document.querySelector('#timing').innerHTML = dt
	}
	lastUpdate = now
}

function createBeep() {
	var context = new AudioContext();

	//defaults to A440Hz, sine wave
	var src = context.createOscillator();

	// Now let's create a modulator to turn beeps on and off
	var mod = context.createOscillator();
	mod.type="square";
	mod.frequency.value = "2";  // Start at 2Hz

	var gain = context.createGain();
	var scaler = context.createGain();

	src.connect(gain);
	gain.connect(context.destination);

	mod.connect(scaler); // Mod signal is [-1,1]
	scaler.gain.value = 0.5; // we need it to be [-0.5,0.5]
	gain.gain.value = 0.5; // then it's summed with 0.5, so [0,1]
	scaler.connect(gain.gain);

	//start it up
	src.start(0);
	mod.start(0);

	var constant = false

	return {
		setToneFrequence: function setToneFrequence (f) {
			src.frequency.value = f
		},
		setBeepFrequence: function setBeepFrequence (f) {
			mod.frequency.value = f
		},
		setConstant: function setConstant () {
			if (!constant) {
				src.disconnect(gain)
				src.connect(context.destination)
				constant = true
			}
		},
		setBeeping: function setBeeping () {
			if (constant) {
				src.disconnect(context.destination)
				src.connect(gain)
				constant = false
			}
		}
	}
}

var beep
var target = require('./target-location')
var dimension = [window.innerWidth, window.innerHeight]
var canvas = document.createElement('canvas')
canvas.width = dimension[0] / window.devicePixelRatio
canvas.height = dimension[1] / window.devicePixelRatio
document.body.appendChild(canvas)

var regl = require('regl')(canvas)
var drawPulse = regl({
	frag: fragShader,
	vert: `
	  precision mediump float;
	  attribute vec2 position;
	  varying vec2 uv;
	  void main () {
	    uv = position;
	    gl_Position = vec4(2.0 * position - 1.0, 0, 1);
	  }`,

	attributes: {
	    position: [
	      -2, 0,
	      0, -2,
	      2, 2]
	},
  	uniforms: {
		u_resolution: [canvas.width, canvas.height],
		u_time: function (context) { return context.time },
		u_frequency: function () { return pulseFrequency.get() }
  	},
  	count: 3
})

regl.frame(function () {
	regl.clear({ color: [0, 0, 0, 1] })
	drawPulse()
})

var lastLocation
var updateLocation = function(p) {
	if (!p) { return }

	var distance = haversine(p.coords, target)
	if (!beep) {
		beep = createBeep()
	}
	updateBeep(beep, distance)
	lastLocation = p
	document.querySelector('#distance').innerHTML = distance.toFixed(0)
}

navigator.geolocation.watchPosition(updateLocation, function(err) {
    console.log(err);
}, {
    enableHighAccuracy: true,
    maximumAge: 0
});

target.on('change', function() {
	updateLocation(lastLocation)
})
