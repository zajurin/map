var map = L.map('map-template').setView([20.630103, -103.321758], 10);

const socket = io();

const tileURL= 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png';

L.tileLayer(tileURL).addTo(map);


map.locate({enableHighAccuracy: true}); //false para desactivar
map.on('locationfound', e =>{
    const coords = [e.latlng.lat, e.latlng.lng];
    const marker = L.marker(coords);
    marker.bindPopup('You are here');
    map.addLayer(marker);
    socket.emit('userCoordinates', e.latlng);
    
});

socket.on('newUserCoordinates', (coords)=>{
    console.log('new user is connected');
    
    const marker = L.marker([coords.lat + 40, coords.lng + 40]);
    marker.bindPopup('Hello there');
    map.addLayer(marker);    
});

// const marker = L.marker([20.630103, -103.321758]);
// marker.bindPopup('Hello there');
// map.addLayer(marker);


