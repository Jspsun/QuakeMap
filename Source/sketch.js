var mapimg;

var clat = 0;
var clon = 0;

var zoom = 1;

var mapWidth;
var mapHeight;

var earthquakes;
var markers = [];

var cx;
var cy;

//database
var config;
var database;
var ref;

//loads up map
function preload() {
  mapWidth = min(1024, window.innerWidth);
  mapHeight = min(1024, window.innerHeight);

  cx = mercX(clon);
  cy = mercY(clat);

  mapimg = loadImage("https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/" + clat + "," + clon + "," + zoom + ",0,0/" + mapWidth + "x" + mapWidth + "?access_token=pk.eyJ1IjoianNwc3VuIiwiYSI6ImNpeno1YncycDAwbW0yd2tmYmdteHUydHYifQ.EgbNT1BzOhbP0TFTC2paMQ");

  earthquakes = loadStrings('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv');

  //Initialize Firebase
  config = {
    apiKey: "AIzaSyAcalVfAlB8d92ndFkGZ-D0vpNOZxi0_Zw",
    authDomain: "quakemap-caee7.firebaseapp.com",
    databaseURL: "https://quakemap-caee7.firebaseio.com",
    storageBucket: "quakemap-caee7.appspot.com",
    messagingSenderId: "662155618011"
  };
  firebase.initializeApp(config);

  database=firebase.database();
  ref=database.ref('earthquakes');
}

//sets up map image and loads up data for earthquakes and makes markers for each one
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(color(25, 26, 26));
  translate(width / 2, height / 2);
  imageMode(CENTER);
  image(mapimg, 0, 0);

  for (var i = 0; i < earthquakes.length; i++) {
    var temp=new Marker(earthquakes[i].split(/,/));
    markers.push(temp);
  }
}

//method to deal with the window being resized
function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
  setup();
}
