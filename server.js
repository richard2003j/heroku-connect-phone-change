var express = require('express');
var bodyParser = require('body-parser');
var pg = require('pg');

var app = express();

app.set('port', process.env.PORT || 5000);

app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/update', function(req, res) {
    pg.connect(process.env.DATABASE_URL, function (err, conn, done) {
        // watch for any connect issues
        if (err) console.log(err);
        conn.query(
            'UPDATE salesforce.Contact SET Phone = $1, MobilePhone =WHERE LOWER(FirstName) = LOWER($2) AND LOWER(LastName) = LOWER($3) AND LOWER(Email) = LOWER($4)',
            [req.body.phone.trim(), req.body.firstName.trim(), req.body.lastName.trim(), req.body.email.trim()],
            function(err, result) {
                if (err != null || result.rowCount == 0) {
                  conn.query('INSERT INTO salesforce.Contact (Phone, MobilePhone, HomePhone, FirstName, LastName, Email) VALUES ($1, $2, $3, $4, $5, $6)',
                  [req.body.phone.trim(), req.body.phone.trim(),req.body.phone.trim(), req.body.firstName.trim(), req.body.lastName.trim(), req.body.email.trim()],
                  function(err, result) {
                    done();
                    if (err) {
                        res.status(400).json({error: err.message});
                    }
                    else {
                        // this will still cause jquery to display 'Record updated!'
                        // eventhough it was inserted
                        res.json(result);
                    }
                  });
                }
                else {
                    done();
                    res.json(result);
                }
            }
        );
    });
});
            

app.get('/init-act',function (req, res){
    
    pg.connect(process.env.DATABASE_URL, function (err, conn, done) {
        // watch for any connect issues
        if (err) console.log(err);
        conn.query(
			'Select Name,TorihikisakiNo__c,Tantoshashimei__c,Denwabango__c, Emaiil1__c, Emaiil2__c, Emaiil3__c from salesforce.Account ',
			[],
            function(err, result) {
                if (err != null ) {
					res.status(400).json({error: err.message});
                }
                else {
                    done();
                    res.json({data: result.rows});
                }
            }
        );
    });
});
app.post('/init-act-edit',function (req, res){
    
    console.log('action : ' + req.action);
	console.log('data name : ' + req.data[0].name);
	res.json({data: req.data});
});
app.get('/',function (req, res){
   res.sendFile('./public/simple-tbl.html'); 
});

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
