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


  //MAPKEY is a constant stored in a .env file which is not included in the repo. Get your own key :)
  MAPKEY = process.env.MAPKEY;

  mapimg = loadImage("https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/" + clat + "," + clon + "," + zoom + ",0,0/" + mapWidth + "x" + mapWidth + "?access_token=" + window.env.MAPKEY);

  earthquakes = loadStrings('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv');
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(color(25, 26, 26));
  translate(width / 2, height / 2);
  imageMode(CENTER);
  image(mapimg, 0, 0);

  var cx = mercX(clon);
  var cy = mercY(clat);

  for (var i = 0; i < earthquakes.length; i++) {
    var data = earthquakes[i].split(/,/);
    var lat = data[1];
    var lon = data[2];
    var mag = data[4];

    var x = mercX(lon) - cx;
    var y = mercY(lat) - cy;

    mag = pow(10, mag);
    mag = sqrt(mag);

    var magmax = sqrt(pow(10, 10));
    var d = map(mag, 0, magmax, 0, 350);
    noStroke();
    fill(255, 0, 255, 100);
    ellipse(x, y, d + 2);
  }
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
};
