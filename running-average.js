var runningAverage = module.exports = function runningAverage (windowSize) {
	var queue = []
	var index = 0
	var count = 0
	var sum = 0
	return {
		put: function (v) {
			var old = queue[index % windowSize]
			if (old) { sum -= old }
			queue[index++ % windowSize] = v
			sum += v
			count = Math.min(count + 1, windowSize)
			/*
			console.log(queue)
			console.log(sum)
			console.log(count)
			*/
		},
		get: function () {
			return sum / count
		}
	}
}

/*
var a = runningAverage(3)
a.put(1)
a.put(2)
a.put(3)
a.put(4)
a.get()
*/
