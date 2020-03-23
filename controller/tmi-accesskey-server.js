module.exports = function (req, res){
	var pg = require('pg');

     console.log("uri:tmi-accesskey-crud");
     var action = req.query.action;

     //dispather
     if(action == 'edit' || action == 'create'){
		 var idSyc = Object.keys(req.query.data)[0];
		 var upInsO = req.query.data[idSyc];
		 var herokuId = upInsO.herokuid__c;

	    console.log("id: " + idSyc);
	    console.log("herokuId: " +herokuId);
	    console.log("object:" );
	    console.log( upInsO);
	    console.log("action:" + req.query.action);
	

		//insert qry
		if( action == "create" && herokuId =='' ){
			res.status(400).json({error: '新規作成でHerokuIDが必須です。'});
			return;
		}
		inststr = 'INSERT INTO salesforce.TMI_Accesskey_API__c( ' + 
						'KihonkeiyakuNo__c ,' + 
						'Torihikisakimei__c ,' + 
						'Status__c ,' + 
						'AccesskeynoKirikaebi__c ,' + 
						'TestSetsuzokukaishibi__c ,' + 
						'Henkomaeaccesskey__c ,' + 
						'Henkoriyu__c ,' + 
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
						' $8  ' +
					') ' ;
		instvar =[
						upInsO.kihonkeiyakuno__c,
						upInsO.torihikisakimei__c,
						upInsO.status__c,
						upInsO.accesskeynokirikaebi__c==''?null:upInsO.accesskeynokirikaebi__c,
						upInsO.testsetsuzokukaishibi__c==''?null:upInsO.testsetsuzokukaishibi__c,
						upInsO.henkomaeaccesskey__c,
						upInsO.henkoriyu__c,
						upInsO.herokuid__c
					];
		//update qry
		updstr = 'Update salesforce.TMI_Accesskey_API__c SET '+
							'KihonkeiyakuNo__c= $1  ,'  +
							'Torihikisakimei__c= $2  ,'  +
							'Status__c= $3  ,'  +
							'AccesskeynoKirikaebi__c= $4  ,'  +
							'TestSetsuzokukaishibi__c= $5  ,'  +
							'Henkomaeaccesskey__c= $6  ,'  +
							'Henkoriyu__c= $7  ,'  +
							'HerokuId__c= $8  '  +
						' WHERE  Name= $9 ' ;
		updvar =[
					upInsO.kihonkeiyakuno__c,
					upInsO.torihikisakimei__c,
					upInsO.status__c,
					upInsO.accesskeynokirikaebi__c==''?null:upInsO.accesskeynokirikaebi__c,
					upInsO.testsetsuzokukaishibi__c==''?null:upInsO.testsetsuzokukaishibi__c,
					upInsO.henkomaeaccesskey__c,
					upInsO.henkoriyu__c,
					upInsO.herokuid__c,
					idSyc
				];
	}
	//return qry
	var qrystr = 'Select ' +
						'Name ,' + 
						'KihonkeiyakuNo__c ,' + 
						'Torihikisakimei__c ,' + 
						'Status__c ,' + 
						"to_char(AccesskeynoKirikaebi__c,'YYYY-MM-DD') as AccesskeynoKirikaebi__c," + 
						"to_char(TestSetsuzokukaishibi__c,'YYYY-MM-DD') as TestSetsuzokukaishibi__c," + 
						'Henkomaeaccesskey__c ,' + 
						'Henkoriyu__c ,' + 
						'HerokuId__c, ' + 
						'sf_message ' + 
					' from salesforce.TMI_Accesskey_API__c a left join  salesforce._trigger_log b on a.sfid = b.sfid  ';
	var qryVar = [idSyc];

	// dispather
	if(action == "create"){
		updstr = inststr;
		updvar = instvar;
		qrystr += ' and HerokuId__c= $1 ';
		qryVar = [herokuId];
	}else if(action == "edit"){
		qrystr += ' and Name = $1 ';
	}else{
		updstr = "select count(id) from salesforce.Contact ";
		updvar = [];
		qrystr = qrystr;
		qryVar = [];
	}

    console.log( updstr);
    console.log( updvar);

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
						qryVar,
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
}

