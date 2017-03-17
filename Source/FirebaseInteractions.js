//database
var database;
var ref;

function setUpFirebase(){
  //Initialize Firebase
  var config = {
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

function pushEarthquakeToFB(data){
  var earthquake= {
    timeStamp:data[0],
    latitude:data[1],
    longitude:data[2],
    magnitude:data[4]
  }
  ref.push(earthquake);
}

function pullFromFB(){
  ref.on('value',gotData,errData);
}

function gotData(data){
  // console.log(data.val());
  var quakes= data.val();
  var keys=Object.keys(quakes);
  console.log(keys);

}

function errData(err){
  console.log('Error:');
  console.log(err);
}
