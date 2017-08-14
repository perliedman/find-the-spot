require('./radio-locator')
var targetMap = require('./map')

var toggleMode = function () {
	var locator = document.querySelector('canvas')
	var map = document.querySelector('#map')
	var isLocator = locator.style.display !== 'none'
	if (isLocator) {
		locator.style.display = 'none'
		map.style.display = ''
		targetMap.invalidateSize()
	} else {
		map.style.display = 'none'
		locator.style.display = ''
	}
}

var firstTap
var taps
var onTap = function () {
	var now = +new Date()
	if (!firstTap || now - firstTap > 500) {
		firstTap = now
		taps = 0
	} else {
		taps++
		if (taps >= 4) {
			toggleMode()
			firstTap = null
		}
	}
}

document.body.addEventListener('mousedown', onTap)
document.body.addEventListener('pointerdown', onTap)
document.body.addEventListener('touchstart', onTap)
