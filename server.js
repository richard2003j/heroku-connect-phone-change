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
            'UPDATE salesforce.Contact SET Phone = $1, MobilePhone =$1 WHERE LOWER(FirstName) = LOWER($2) AND LOWER(LastName) = LOWER($3) AND LOWER(Email) = LOWER($4)',
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
						console.log(result);
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
            

app.get('/account-init',function (req, res){
    
    pg.connect(process.env.DATABASE_URL, function (err, conn, done) {
        // watch for any connect issues
        if (err) console.log(err);
		var qrystr = 'Select Name,TorihikisakiNo__c, HerokuId__c,Tantoshashimei__c, ' + 
		'Denwabango__c, Emaiil1__c, Emaiil2__c, Emaiil3__c ' + 
		'	from salesforce.Account ';

        conn.query(
			qrystr,
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
app.get('/account-create-edit',function (req, res){
     console.log("uri:account-create-edit");
	 var idSyc = Object.keys(req.query.data)[0];
	 var upObj = req.query.data[idSyc];
	 var herokuId = upObj.herokuid__c;
	 var action = req.query.action;

    console.log("id: " +idSyc);
    console.log("herokuId: " +herokuId);
    console.log("object:" );
    console.log( upObj);
    console.log("action:" + req.query.action);

	//insert qry
	if( action == "create" && herokuId =='' ){
		res.status(400).json({error: '新規作成でHerokuIDが必須です。'});
		return;
	}
	inststr = 'INSERT INTO salesforce.Account( Name, HerokuId__c, ' +
			' Tantoshashimei__c,  ' +
			' Denwabango__c, ' +
			' Emaiil1__c , ' +
			' Emaiil2__c, ' +
			' Emaiil3__c) ' +
			' VALUES($1,$2,$3,$4,$5,$6,$7) ' ;
	instvar =[upObj.name,
			herokuId,
			upObj.tantoshashimei__c,
			upObj.denwabango__c,
			upObj.emaiil1__c,upObj.emaiil2__c,upObj.emaiil3__c,
			];
	//update qry
	updstr = 'Update salesforce.Account SET Name = $1, HerokuId__c = $2, ' +
			' Tantoshashimei__c = $3, ' +
			' Denwabango__c = $4, ' +
			' Emaiil1__c = $5, ' +
			' Emaiil2__c = $6, ' +
			' Emaiil3__c = $7 ' +
			' WHERE  TorihikisakiNo__c= $8 ' ;
	updvar =[upObj.name,
			herokuId,
			upObj.tantoshashimei__c,
			upObj.denwabango__c,
			upObj.emaiil1__c,upObj.emaiil2__c,upObj.emaiil3__c,
			idSyc];
	//return qry
	var qrystr = 'Select Name,TorihikisakiNo__c, HerokuId__c,Tantoshashimei__c, ' + 
		'Denwabango__c, Emaiil1__c, Emaiil2__c, Emaiil3__c ' + 
		'	from salesforce.Account '+
		' where TorihikisakiNo__c= $1 or HerokuId__c = $2';
	
	if(action == "create"){
		updstr = inststr;
		updvar = instvar;
	}

    console.log( updstr);

	pg.connect(process.env.DATABASE_URL, function (err, conn, done) {
        // watch for any connect issues
        if (err) console.log(err);
        conn.query(
			updstr,
			updvar,
            function(err, result) {
                if (err != null ) {
					res.status(400).json({error: err.message});
                }
                else {
					conn.query(
						qrystr,
						[idSyc,herokuId],
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
                }
            }
        );
    });
});

app.get('/',function (req, res){
   res.sendFile('./public/simple-tbl.html'); 
});

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
