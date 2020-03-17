var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.set('port', process.env.PORT || 5000);

app.use(express.static('public'));
app.use(bodyParser.json());

// account list
const AccountListCtl = require('./controller/account-list');
app.get('/account-init',AccountListCtl);
// account update insert
const AccountEidtCtl = require('./controller/account-edit');
app.get('/account-create-edit',AccountEidtCtl);


app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
