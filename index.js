var express = require('express');
var app = express();
MAPKEY = process.env.MAPKEY;

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname));

// views is directory for all template files
app.set('view engine', 'html');

app.get('/', function(request, response) {
  response.render('Source/index')
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
