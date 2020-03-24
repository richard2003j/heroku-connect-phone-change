module.exports = function (req, res){
	var pg = require('pg');

     console.log("uri:tmi-userid-crud");
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
		if( action == "edit" && idSyc == 'null' ){
			res.status(400).json({error: '該当データが不整合なので、変更できません。'});
			return;
		}
		if( action == "create" && herokuId =='' ){
			res.status(400).json({error: '新規作成でHerokuIDが必須です。'});
			return;
		}
		var inststr = 'INSERT INTO salesforce.TMI_Setsuzokuuser_UserId__c( ' + 
						'UserId__c ,' + 
						'ShokaiPassword__c ,' + 
						'Torihikisakimei__c ,' + 
						'Keiyaku_kihonjohotoroku__c ,' + 
						'Keiyaku_toroku_Hikimodoshi_API_Soba__c ,' + 
						'Keiyaku_etsurankengen_API_Soba__c ,' + 
						'SeikyuKengen_API_Soba__c ,' + 
						'Keiyaku_toroku_Hikimodoshi_API_Tekiji__c ,' + 
						'Keiyaku_etsuranKengen_API_Tekiji__c ,' + 
						'Seikyukengen_API_Tekiji__c ,' + 
						'Kaishibi_Yotei__c ,' + 
						'Shuryobi_Yotei__c ,' + 
						'Teamnaishoninsha__c ,' + 
						'Saishushoninsha__c ,' + 
						'Teamnaishoninskip__c ,' + 
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
						 ' $16 ' +
				') ' ;
		var instvar =[
						upInsO.userid__c,
						upInsO.shokaipassword__c,
						upInsO.torihikisakimei__c,
						upInsO.keiyaku_kihonjohotoroku__c==undefined?false:true,
						upInsO.keiyaku_toroku_hikimodoshi_api_soba__c==undefined?false:true,
						upInsO.keiyaku_etsurankengen_api_soba__c==undefined?false:true,
						upInsO.seikyukengen_api_soba__c==undefined?false:true,
						upInsO.keiyaku_toroku_hikimodoshi_api_tekiji__c==undefined?false:true,
						upInsO.keiyaku_etsurankengen_api_tekiji__c,
						upInsO.seikyukengen_api_tekiji__c,
						upInsO.kaishibi_yotei__c==''?null:upInsO.shuryobi_yotei__c,
						upInsO.shuryobi_yotei__c==''?null:upInsO.shuryobi_yotei__c,
						upInsO.teamnaishoninsha__c,
						upInsO.saishushoninsha__c,
						upInsO.teamnaishoninskip__c==undefined?false:true,
						upInsO.herokuid__c
				];
		//update qry
		var updstr = 'Update salesforce.TMI_Setsuzokuuser_UserId__c SET '+
					'UserId__c= $1  ,'  +
					'ShokaiPassword__c= $2  ,'  +
					'Torihikisakimei__c= $3  ,'  +
					'Keiyaku_kihonjohotoroku__c= $4  ,'  +
					'Keiyaku_toroku_Hikimodoshi_API_Soba__c= $5  ,'  +
					'Keiyaku_etsurankengen_API_Soba__c= $6  ,'  +
					'SeikyuKengen_API_Soba__c= $7  ,'  +
					'Keiyaku_toroku_Hikimodoshi_API_Tekiji__c= $8  ,'  +
					'Keiyaku_etsuranKengen_API_Tekiji__c= $9  ,'  +
					'Seikyukengen_API_Tekiji__c= $10  ,'  +
					'Kaishibi_Yotei__c= $11  ,'  +
					'Shuryobi_Yotei__c= $12  ,'  +
					'Teamnaishoninsha__c= $13  ,'  +
					'Saishushoninsha__c= $14  ,'  +
					'Teamnaishoninskip__c= $15  ,'  +
					'HerokuId__c= $16  '  +
						' WHERE  Name= $17 ' ;
		var updvar =[
					upInsO.userid__c,
					upInsO.shokaipassword__c,
					upInsO.torihikisakimei__c,
					upInsO.keiyaku_kihonjohotoroku__c==undefined?false:true,
					upInsO.keiyaku_toroku_hikimodoshi_api_soba__c==undefined?false:true,
					upInsO.keiyaku_etsurankengen_api_soba__c==undefined?false:true,
					upInsO.seikyukengen_api_soba__c==undefined?false:true,
					upInsO.keiyaku_toroku_hikimodoshi_api_tekiji__c==undefined?false:true,
					upInsO.keiyaku_etsurankengen_api_tekiji__c,
					upInsO.seikyukengen_api_tekiji__c,
					upInsO.kaishibi_yotei__c==''?null:upInsO.kaishibi_yotei__c,
					upInsO.shuryobi_yotei__c==''?null:upInsO.shuryobi_yotei__c,
					upInsO.teamnaishoninsha__c,
					upInsO.saishushoninsha__c,
					upInsO.teamnaishoninskip__c==undefined?false:true,
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
						'UserId__c ,' + 
						'ShokaiPassword__c ,' + 
						'Torihikisakimei__c ,' + 
						'Keiyaku_kihonjohotoroku__c ,' + 
						'Keiyaku_toroku_Hikimodoshi_API_Soba__c ,' + 
						'Keiyaku_etsurankengen_API_Soba__c ,' + 
						'SeikyuKengen_API_Soba__c ,' + 
						'Keiyaku_toroku_Hikimodoshi_API_Tekiji__c ,' + 
						'Keiyaku_etsuranKengen_API_Tekiji__c ,' + 
						'Seikyukengen_API_Tekiji__c ,' + 
						"to_char(Kaishibi_Yotei__c,'YYYY-MM-DD') as Kaishibi_Yotei__c," + 
						"to_char(Shuryobi_Yotei__c,'YYYY-MM-DD') as Shuryobi_Yotei__c," + 
						'Teamnaishoninsha__c ,' + 
						'Saishushoninsha__c ,' + 
						'Teamnaishoninskip__c ,' + 
						'HerokuId__c ,' + 
						'sf_message ' + 
				' from salesforce.TMI_Setsuzokuuser_UserId__c a left join  ' + log_msg +  ' on a.id = b.record_id  ';

	var qryVar = ['tmi_setsuzokuuser_userid__c'];

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

