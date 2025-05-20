/* let map = L.map("map").setView([28.6139, 77.2088], 15);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 20,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);
let marker = L.marker([28.6139, 77.2088]).addTo(map);
marker.bindPopup("<b>Luxury Stay</b><br>Relax with your family.").openPopup(); */

/* new L.Control.Geocoder().addTo(map);

let geocoder = L.Control.geocoder({
  defaultMarkGeocode: false,
})
  .on("markgeocode", function (e) {
    let bbox = e.geocode.bbox;
    let poly = new L.Polygon([
      bbox.getSouthEast(),
      bbox.getNorthEast(),
      bbox.getNorthWest(),
      bbox.getSouthWest(),
    ]).addTo(map);
    map.fitBounds(poly.getBounds());
  })
  .addTo(map);*/
