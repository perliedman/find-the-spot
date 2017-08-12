var L = require('leaflet')

var TargetLocation = L.Evented.extend({
	initialize: function() {
		var target = localStorage.targetLocation
		var location
		try {
			location = JSON.parse(target)
		} catch (e) {
			location = {
				latitude: 57.74325,
				longitude: 11.93227
			}
		}

		this.latitude = location.latitude
		this.longitude = location.longitude
	},

	set: function(l) {
		localStorage.targetLocation = JSON.stringify(l)

		this.latitude = l.latitude
		this.longitude = l.longitude
		this.fire('change', this)
	}
})

module.exports = new TargetLocation()
