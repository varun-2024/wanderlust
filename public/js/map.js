let map = L.map("map").setView([28.6139, 77.2088], 15);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 20,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);
let marker = L.marker([28.6139, 77.2088]).addTo(map);
marker.bindPopup("<b>Luxury Stay</b><br>Relax with your family.").openPopup();
