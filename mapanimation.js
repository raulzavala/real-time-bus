const busStops = [];
mapboxgl.accessToken =
  "pk.eyJ1IjoicmF1bHphdmFsYWwiLCJhIjoiY2wzMTFuNTFjMXV4bjNsbXZxN3Z2eW0xdyJ9._7ctilCmKcOJIWFPr4mOxw";
let defaultCoord = [-71.093729, 42.359244];

let map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/satellite-streets-v11",
  center: [-71.104081, 42.365554],
  zoom: 14,
});

const marker = new mapboxgl.Marker().setLngLat(defaultCoord).addTo(map);

const popup = new mapboxgl.Popup()
  .setLngLat(defaultCoord)
  .setHTML("Bus Stop: -71.093729. 42.359244")
  .addTo(map);

let counter = 0;
function move() {
  setTimeout(() => {
    console.log(busStops.length);
    if (counter >= busStops.length) return;
    marker.setLngLat(busStops[counter]);
    popup
      .setLngLat(busStops[counter])
      .setHTML(
        "Bus Stop: " + busStops[counter][0] + ", " + busStops[counter][1]
      );
    counter++;
    move();
  }, 1000);
}

async function getBusLocations() {
  const url = "https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip";
  const response = await fetch(url);
  const json = await response.json();
  return json.data;
}

async function loadPositions() {
  const positions = await getBusLocations();
  positions.forEach((position) => {
    let coord = [position.attributes.longitude, position.attributes.latitude];
    busStops.push(coord);
  });
  console.log(busStops.length);
}

loadPositions();
