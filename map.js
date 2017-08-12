var L = require('leaflet')
var targetLocation = require('./target-location')

var map = module.exports = L.map('map').setView([57.74325, 11.93227], 17)

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

L.marker([targetLocation.latitude, targetLocation.longitude], {draggable: true})
.on('dragend', function() {
	var ll = this.getLatLng()
	targetLocation.set({
		latitude: ll.lat,
		longitude: ll.lng
	})
})
.addTo(map)
