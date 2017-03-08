var mapimg;

var clat = 0;
var clon = 0;

var zoom = 1;

var mapWidth;
var mapHeight;

var earthquakes;

function preload() {
  mapWidth = min(1024, window.innerWidth);
  mapHeight = min(1024, window.innerHeight);


  //MAPKEY is a constant stored in a config file which is not included in the repo. Get your own key :)
  mapimg = loadImage("https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/" + clat + "," + clon + "," + zoom + ",0,0/" + mapWidth + "x" + mapWidth + "?access_token=pk.eyJ1IjoianNwc3VuIiwiYSI6ImNpeno1YncycDAwbW0yd2tmYmdteHUydHYifQ.EgbNT1BzOhbP0TFTC2paMQ");

  earthquakes = loadStrings('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv');
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(color(25, 26, 26));
  translate(width / 2, height / 2);
  imageMode(CENTER);
  image(mapimg, 0, 0);

  for (var i = 0; i < earthquakes.length; i++) {
    createEllipse(earthquakes[i].split(/,/), mercX(clon), mercY(clat));
  }
}

function createEllipse(data, cy, cx) {
  var lat = data[1];
  var lon = data[2];
  var realMag = data[4];

  var x = mercX(lon) - cx;
  var y = mercY(lat) - cy;

  //add in different colors for different magnitudes

  var displayMag = sqrt(pow(10, realMag));

  var magmax = sqrt(pow(10, 10));
  var d = map(displayMag, 0, magmax, 0, 350);
  noStroke();

  //ranges for different colors
  var color = hexToRgb("#F44336");

  var mag = Math.ceil(realMag);
  switch (mag) {
    case 1:
      color = hexToRgb("#EF9A9A");
      break;
    case 2:
      color = hexToRgb("#E57373");
      break;
    case 3:
      color = hexToRgb("#EF5350");
      break;
    case 4:
      color = hexToRgb("#F44336");
      break;
    case 5:
      color = hexToRgb("#E53935");
      break;
    case 6:
      color = hexToRgb("#D32F2F");
      break;
    case 7:
      color = hexToRgb("#C62828");
      break;
    case 8:
      color = hexToRgb("#B71C1C");
      break;
    default:
      color = hexToRgb("#D50000");
      break;
  }

  fill(color[0], color[1], color[2], 100);
  ellipse(x, y, d + 2);
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)];

}

function mercX(lon) {
  lon = radians(lon);
  var a = (256 / PI) * pow(2, zoom);
  var b = lon + PI;
  return a * b;
}

function mercY(lat) {
  lat = radians(lat);
  var a = (256 / PI) * pow(2, zoom);
  var b = tan(PI / 4 + lat / 2);
  var c = PI - log(b);
  return a * c;
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
  setup();
};;
