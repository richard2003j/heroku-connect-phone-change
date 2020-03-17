var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.set('port', process.env.PORT || 5000);

app.use(express.static('public'));
app.use(bodyParser.json());

// account list
const AccountListCtl = require('./controller/account-server');
app.get('/account-crud',AccountListCtl);


app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
