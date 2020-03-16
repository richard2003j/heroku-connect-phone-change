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
	 var upInsO = req.query.data[idSyc];
	 var herokuId = upInsO.herokuid__c;
	 var action = req.query.action;

    console.log("id: " +idSyc);
    console.log("herokuId: " +herokuId);
    console.log("object:" );
    console.log( upInsO);
    console.log("action:" + req.query.action);

	//insert qry
	if( action == "create" && herokuId =='' ){
		res.status(400).json({error: '新規作成でHerokuIDが必須です。'});
		return;
	}
	inststr = 'INSERT INTO salesforce.Account( ' + 
						'Name ,' + 
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
			') ' +
			' VALUES( ' + 
					 ' $1, ' +
					 ' $2, ' +
					 ' $3, ' +
					 ' $4, ' +
					 ' $5, ' +
					 ' $6, ' +
					 ' $7, ' +
					 ' $8, ' +
					 ' $9, ' +
					 ' $10, ' +
					 ' $11, ' +
					 ' $12, ' +
					 ' $13, ' +
					 ' $14, ' +
					 ' $15, ' +
					 ' $16, ' +
					 ' $17, ' +
					 ' $18, ' +
					 ' $19 ' +
			') ' ;
	instvar =[
					upInsO.name,
					upInsO.eibuntorihikisakimei__c,
					upInsO.kakogaishamei__c,
					upInsO.kuni__c,
					upInsO.yuubimbango__c,
					upInsO.jusho1__c,
					upInsO.jusho2__c,
					upInsO.daihyoshayakushoku__c,
					upInsO.daihyoshashimei__c,
					upInsO.busho__c,
					upInsO.tantoshashimei__c,
					upInsO.denwabango__c,
					upInsO.emaiil1__c,
					upInsO.emaiil2__c,
					upInsO.emaiil3__c,
					upInsO.kakuninstatus__c,
					upInsO.keiyakustatus__c,
					upInsO.shinseistatus__c,
					upInsO.herokuid__c
			];
	//update qry
	updstr = 'Update salesforce.Account SET '+
					'Name= $1  ,'  +
					'Eibuntorihikisakimei__c= $2  ,'  +
					'Kakogaishamei__c= $3  ,'  +
					'Kuni__c= $4  ,'  +
					'Yuubimbango__c= $5  ,'  +
					'Jusho1__c= $6  ,'  +
					'Jusho2__c= $7  ,'  +
					'Daihyoshayakushoku__c= $8  ,'  +
					'Daihyoshashimei__c= $9  ,'  +
					'Busho__c= $10  ,'  +
					'Tantoshashimei__c= $11  ,'  +
					'Denwabango__c= $12  ,'  +
					'Emaiil1__c= $13  ,'  +
					'Emaiil2__c= $14  ,'  +
					'Emaiil3__c= $15  ,'  +
					'KakuninStatus__c= $16  ,'  +
					'KeiyakuStatus__c= $17  ,'  +
					'Shinseistatus__c= $18  ,'  +
					'HerokuId__c= $19  '  +
			' WHERE  TorihikisakiNo__c= $20 ' ;
	updvar =[
					upInsO.name,
					upInsO.eibuntorihikisakimei__c,
					upInsO.kakogaishamei__c,
					upInsO.kuni__c,
					upInsO.yuubimbango__c,
					upInsO.jusho1__c,
					upInsO.jusho2__c,
					upInsO.daihyoshayakushoku__c,
					upInsO.daihyoshashimei__c,
					upInsO.busho__c,
					upInsO.tantoshashimei__c,
					upInsO.denwabango__c,
					upInsO.emaiil1__c,
					upInsO.emaiil2__c,
					upInsO.emaiil3__c,
					upInsO.kakuninstatus__c,
					upInsO.keiyakustatus__c,
					upInsO.shinseistatus__c,
					upInsO.herokuid__c,
					upInsO.torihikisakino__c
			];
	//return qry
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
				' from salesforce.Account '+
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

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
