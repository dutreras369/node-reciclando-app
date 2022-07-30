(function() {
    const lat = -33.4488814;
    const lng = -70.6692553;
    const map = L.map('map').setView([lat, lng ], 14);
    let marker;

    // util Provider & Geocoder
    const geocodeService = L.esri.Geocoding.geocodeService();


    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // add pin
    marker = new L.marker([lat, lng], {
        draggable: true,
        autoPan: true
    })
    .addTo(map)

    // detect mov pin event
    marker.on('moveend', function(e){
        marker = e.target

        const posicion = marker.getLatLng();

        map.panTo(new L.LatLng(posicion.lat, posicion.lng))

        // get addres
        geocodeService.reverse().latlng(posicion, 14)
        .run(function(error, res){
            marker.bindPopup(res.address.LongLabel)
            // fill field
            document.querySelector('.street').textContent = res?.address?.Address ?? '';
            document.querySelector('#street').value = res?.address?.Address ?? '';
            document.querySelector('#lat').value = res?.latlng?.lat ?? '';
            document.querySelector('#lng').value = res?.latlng?.lng ?? '';
        })
    })

})()