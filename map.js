var L = require('leaflet')
var targetLocation = require('./target-location')

var map = module.exports = L.map('map')
.setView([targetLocation.latitude, targetLocation.longitude], 17)

var locationMarker;
map.locate({
	watch: true,
	enableHighAccuracy: true
})
.on('locationfound', function (e) {
	if (!locationMarker) {
		locationMarker = L.circleMarker(e.latlng, {
			radius: 5,
		}).addTo(map)
	} else {
		locationMarker.setLatLng(e.latlng)
	}
})

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
