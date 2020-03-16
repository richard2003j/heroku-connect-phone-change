var express = require('express');
var bodyParser = require('body-parser');
var pg = require('pg');

var app = express();

app.set('port', process.env.PORT || 5000);

app.use(express.static('public'));
app.use(bodyParser.json());



app.get('/account-init',function (req, res){
    
    pg.connect(process.env.DATABASE_URL, function (err, conn, done) {
        // watch for any connect issues
        if (err) console.log(err);
		var qrystr = 'Select ' + 
							'Name ,' + 
							'TorihikisakiNo__c ,' + 
							'Eibuntorihikisakimei__c ,' + 
							'Kakogaishamei__c ,' + 
							'Kuni__c ,' + 
							'Yuubimbango__c ,' + 
							'Jusho1__c ,' + 
							'Jusho2__c ,' + 
							'Daihyoshayakushoku__c ,' + 
							'Daihyoshashimei__c ,' + 
							'Busho__c ,' + 
							'Tantoshashimei__c ,' + 
							'Denwabango__c ,' + 
							'Emaiil1__c ,' + 
							'Emaiil2__c ,' + 
							'Emaiil3__c ,' + 
							'KakuninStatus__c ,' + 
							'KeiyakuStatus__c ,' + 
							'Shinseistatus__c ,' + 
							'HerokuId__c ' + 
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
			' KakuninStatus__c,  ' +
			' Tantoshashimei__c,  ' +
			' Denwabango__c, ' +
			' Emaiil1__c , ' +
			' Emaiil2__c, ' +
			' Emaiil3__c) ' +
			' VALUES($1,$2,$3,$4,$5,$6,$7,$8) ' ;
	instvar =[upObj.name,
			herokuId,
			upObj.kakuninstatus__c,
			upObj.tantoshashimei__c,
			upObj.denwabango__c,
			upObj.emaiil1__c,upObj.emaiil2__c,upObj.emaiil3__c,
			];
	//update qry
	updstr = 'Update salesforce.Account SET Name = $1, HerokuId__c = $2, ' +
			' KakuninStatus__c = $3, ' +
			' Tantoshashimei__c = $4, ' +
			' Denwabango__c = $5, ' +
			' Emaiil1__c = $6, ' +
			' Emaiil2__c = $7, ' +
			' Emaiil3__c = $8 ' +
			' WHERE  TorihikisakiNo__c= $9 ' ;
	updvar =[upObj.name,
			herokuId,
			upObj.kakuninstatus__c,
			upObj.tantoshashimei__c,
			upObj.denwabango__c,
			upObj.emaiil1__c,upObj.emaiil2__c,upObj.emaiil3__c,
			idSyc];
	//return qry
	var qrystr = 'Select Name,TorihikisakiNo__c,KakuninStatus__c, HerokuId__c,Tantoshashimei__c, ' + 
		'Denwabango__c, Emaiil1__c, Emaiil2__c, Emaiil3__c ' + 
		'	from salesforce.Account '+
		' where TorihikisakiNo__c= $1 ';
	
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
						[idSyc],
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
