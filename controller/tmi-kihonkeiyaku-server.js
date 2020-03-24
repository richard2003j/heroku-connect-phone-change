module.exports = function (req, res){
	var pg = require('pg');

     console.log("uri:tmi-kihonkeiyaku-crud");
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
		var inststr = 'INSERT INTO salesforce.TMI_KihonKeiyaku__c( ' + 
						'Contents__c ,' + 
						'Torihikisakimei__c ,' + 
						'Keiyakustatus__c ,' + 
						'Keiyakutantosha__c ,' + 
						'Seikyutantosha_Kihonryokin__c ,' + 
						'Seikyutantosha_Juryoryokin__c ,' + 
						'Seikyutantosha_Sonotaryokin__c ,' + 
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
		var instvar =[
						upInsO.contents__c,
						upInsO.torihikisakimei__c,
						upInsO.keiyakustatus__c,
						upInsO.keiyakutantosha__c,
						upInsO.seikyutantosha_kihonryokin__c,
						upInsO.seikyutantosha_juryoryokin__c,
						upInsO.seikyutantosha_sonotaryokin__c,
						upInsO.herokuid__c
					];
		//update qry
		var updstr = 'Update salesforce.TMI_KihonKeiyaku__c SET '+
						'Contents__c= $1  ,'  +
						'Torihikisakimei__c= $2  ,'  +
						'Keiyakustatus__c= $3  ,'  +
						'Keiyakutantosha__c= $4  ,'  +
						'Seikyutantosha_Kihonryokin__c= $5  ,'  +
						'Seikyutantosha_Juryoryokin__c= $6  ,'  +
						'Seikyutantosha_Sonotaryokin__c= $7  ,'  +
						'HerokuId__c= $8  '  +
				' WHERE  Name= $9 ' ;
		var updvar =[
						upInsO.contents__c,
						upInsO.torihikisakimei__c,
						upInsO.keiyakustatus__c,
						upInsO.keiyakutantosha__c,
						upInsO.seikyutantosha_kihonryokin__c,
						upInsO.seikyutantosha_juryoryokin__c,
						upInsO.seikyutantosha_sonotaryokin__c,
						upInsO.herokuid__c,
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
						'Contents__c ,' + 
						'Torihikisakimei__c ,' + 
						'Keiyakustatus__c ,' + 
						'Keiyakutantosha__c ,' + 
						'Seikyutantosha_Kihonryokin__c ,' + 
						'Seikyutantosha_Juryoryokin__c ,' + 
						'Seikyutantosha_Sonotaryokin__c ,' + 
						'HerokuId__c ,' + 
						'sf_message ' + 
				' from salesforce.TMI_KihonKeiyaku__c a left join  ' + log_msg +  ' on a.id = b.record_id  ';

	var qryVar = ['tmi_kihonkeiyaku__c'];

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
		updstr = "select count(id) from salesforce.Account ";
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

