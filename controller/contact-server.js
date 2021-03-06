module.exports = function (req, res){
	var pg = require('pg');

     console.log("uri:contact-crud");
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
	var	inststr = 'INSERT INTO salesforce.Contact( ' + 
					'LastName ,' + 
					'AccountId ,' + 
					'Tantokubun__c ,' + 
					'Kaishamei__c ,' + 
					'Eibuntorihikisakimei__c ,' + 
					'Kuni__c ,' + 
					'Yuubimbango__c ,' + 
					'Jusho1__c ,' + 
					'Jusho2__c ,' + 
					'Busho__c ,' + 
					'Denwabango__c ,' + 
					'Email1__c ,' + 
					'Email2__c ,' + 
					'Email3__c ,' + 
					'Biko__c ,' + 
					'KakuninStatus__c ,' + 
					'Contents__c ,' + 
					'HerokuId__c ,' + 
					'Seikyushohakko__c ' + 
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
	var	instvar =[
						upInsO.lastname,
						upInsO.accountid,
						upInsO.tantokubun__c,
						upInsO.kaishamei__c,
						upInsO.eibuntorihikisakimei__c,
						upInsO.kuni__c,
						upInsO.yuubimbango__c,
						upInsO.jusho1__c,
						upInsO.jusho2__c,
						upInsO.busho__c,
						upInsO.denwabango__c,
						upInsO.email1__c,
						upInsO.email2__c,
						upInsO.email3__c,
						upInsO.biko__c,
						upInsO.kakuninstatus__c,
						upInsO.contents__c,
						upInsO.herokuid__c,
						upInsO.seikyushohakko__c
				];
		//update qry
	var	updstr = 'Update salesforce.Contact SET '+
							'LastName= $1  ,'  +
							'AccountId= $2  ,'  +
							'Tantokubun__c= $3  ,'  +
							'Kaishamei__c= $4  ,'  +
							'Eibuntorihikisakimei__c= $5  ,'  +
							'Kuni__c= $6  ,'  +
							'Yuubimbango__c= $7  ,'  +
							'Jusho1__c= $8  ,'  +
							'Jusho2__c= $9  ,'  +
							'Busho__c= $10  ,'  +
							'Denwabango__c= $11  ,'  +
							'Email1__c= $12  ,'  +
							'Email2__c= $13  ,'  +
							'Email3__c= $14  ,'  +
							'Biko__c= $15  ,'  +
							'KakuninStatus__c= $16  ,'  +
							'Contents__c= $17  ,'  +
							'HerokuId__c= $18  ,'  +
							'Seikyushohakko__c= $19  '  +
				' WHERE  Name= $20 ' ;
	var	updvar =[
					upInsO.lastname,
					upInsO.accountid,
					upInsO.tantokubun__c,
					upInsO.kaishamei__c,
					upInsO.eibuntorihikisakimei__c,
					upInsO.kuni__c,
					upInsO.yuubimbango__c,
					upInsO.jusho1__c,
					upInsO.jusho2__c,
					upInsO.busho__c,
					upInsO.denwabango__c,
					upInsO.email1__c,
					upInsO.email2__c,
					upInsO.email3__c,
					upInsO.biko__c,
					upInsO.kakuninstatus__c,
					upInsO.contents__c,
					upInsO.herokuid__c==''?null:upInsO.herokuid__c,
					upInsO.seikyushohakko__c,
					idSyc
				];
	}
	//return qry
	var log_msg = ' (select record_id, table_name, sf_message from salesforce._trigger_log ' +
		' where (record_id, table_name, processed_at) in ' + 
		'(select record_id, table_name,  max(processed_at) as processed_at  from salesforce._trigger_log ' + 
		' where table_name = $1 ' +
		' group by record_id, table_name) ) b ';
	
	
	var qrystr = 'Select ' +
					'Name ,' + 
					'LastName ,' + 
					'AccountId ,' + 
					'Tantokubun__c ,' + 
					'Kaishamei__c ,' + 
					'Eibuntorihikisakimei__c ,' + 
					'Kuni__c ,' + 
					'Yuubimbango__c ,' + 
					'Jusho1__c ,' + 
					'Jusho2__c ,' + 
					'Busho__c ,' + 
					'Denwabango__c ,' + 
					'Email1__c ,' + 
					'Email2__c ,' + 
					'Email3__c ,' + 
					'Biko__c ,' + 
					'KakuninStatus__c ,' + 
					'Contents__c ,' + 
					'HerokuId__c ,' + 
					'Seikyushohakko__c, ' + 
					'sf_message ' + 
				' from salesforce.Contact a left join  ' + log_msg +  ' on a.id = b.record_id  ';
	
	var qryVar = ['contact'];

	// dispather
	if(action == "create"){
		updstr = inststr;
		updvar = instvar;
		qrystr += ' and HerokuId__c= $2 ';
		qryVar = qryVar.concat([herokuId]);
	}else if(action == "edit"){
		qrystr += ' and Name = $2 ';
		qryVar = qryVar.concat([idSyc]);
	}else{
		updstr = "select count(id) from salesforce.Contact ";
		updvar = [];
		qrystr = qrystr;
		qryVar = qryVar;
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

