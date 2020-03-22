var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.set('port', process.env.PORT || 5000);

app.use(express.static('public'));
app.use(bodyParser.json());

// common sfid, name
const CommonListCtl = require('./controller/common-sfidname');
app.get('/common-init',CommonListCtl);
// tmi-userid-crud
// account list
const AccountListCtl = require('./controller/account-server');
app.get('/account-crud',AccountListCtl);
// contact list
const ContactListCtl = require('./controller/contact-server');
app.get('/contact-crud',ContactListCtl);
// tmi-kihonkeiyaku list
const TmiKihonkeiyakuListCtl = require('./controller/tmi-kihonkeiyaku-server');
app.get('/tmi-kihonkeiyaku-crud',TmiKihonkeiyakuListCtl);
// tmi-keiyakuapi list
const TmiKeiyakuapiListCtl = require('./controller/tmi-keiyakuapi-server');
app.get('/tmi-keiyakuapi-crud',TmiKeiyakuapiListCtl);
// tmi-accesskey list
const TmiAccesskeyListCtl = require('./controller/tmi-accesskey-server');
app.get('/tmi-accesskey-crud',TmiAccesskeyListCtl);
// tmi-userid list
const TmiUseridListCtl = require('./controller/tmi-userid-server');
app.get('/tmi-userid-crud',TmiUseridListCtl);


app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
