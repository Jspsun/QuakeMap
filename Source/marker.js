function Marker(data) {
  this.lat = data[1];
  this.lon = data[2];
  this.realMag = data[4];
  var x = mercX(this.lon) - cx;
  var y = mercY(this.lat) - cy;

  var displayMag = sqrt(pow(10, this.realMag));
  var magmax = sqrt(pow(10, 10));
  var d = map(displayMag, 0, magmax, 0, 350);
  noStroke();

  //color based on magnitude
  var color;
  var mag = Math.ceil(this.realMag);
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
