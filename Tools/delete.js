//Initialize Firebase
var config = {
  apiKey: "AIzaSyAcalVfAlB8d92ndFkGZ-D0vpNOZxi0_Zw",
  authDomain: "quakemap-caee7.firebaseapp.com",
  databaseURL: "https://quakemap-caee7.firebaseio.com",
  storageBucket: "quakemap-caee7.appspot.com",
  messagingSenderId: "662155618011"
};
var firebase.initializeApp(config);
var database=firebase.database();
var ref=database.ref('earthquakes');

ref.removeValue();
