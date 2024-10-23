

let latitude= -31.523816357689018
let longitude= -64.46595408929724

// Inicializacion de mapa y zoom
 var map = L.map('map').setView([latitude, longitude], 16);

 // Añade 'tile layer' (fondo) de OpenStreetMap
 L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
     maxZoom: 19
 }).addTo(map);

 // Marcador inicial
 var marker = L.marker([latitude, longitude]).addTo(map);

 // Actualizar posición del marcador
 function updateMarker(lat, lon) {
     marker.setLatLng([lat, lon]);
    //  map.setView([lat, lon], 16); // Opcional: centra el mapa en la nueva ubicación
 }

 // Función simulada para obtener la ubicación del vehículo (se puede reemplazar con una API real)
 function getVehicleLocation() {
     // Aquí puedes implementar una llamada a una API que te devuelva las coordenadas en tiempo real.
     // Simulando cambios de ubicación con coordenadas aleatorias cercanas:
     return {
         lat: latitude + (Math.random() - 0.5) * 0.001, // Valor aleatorio cerca de 51.505
         lon: longitude + (Math.random() - 0.5) * 0.001  // Valor aleatorio cerca de -0.09
     };
 }

 // Actualizar la ubicación del vehículo cada 2 segundos
 setInterval(() => {
     var location = getVehicleLocation();
     updateMarker(location.lat, location.lon);
 }, 2000);