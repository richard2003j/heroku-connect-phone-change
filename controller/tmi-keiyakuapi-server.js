module.exports = function (req, res){
	var pg = require('pg');

     console.log("uri:tmi-keiyakuapi-crud");
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
		inststr = 'INSERT INTO salesforce.TMI_Keiyaku_API__c( ' + 
						'KihonkeiyakuNo__c ,' + 
						'Shinseistatus__c ,' + 
						'Shinseikubun__c ,' + 
						'Shohin__c ,' + 
						'Shanaigyomushiyo__c ,' + 
						'Kaiinseitammatsuservice__c ,' + 
						'Datafeed__c ,' + 
						'Jikibaitai__c ,' + 
						'Onsei__c ,' + 
						'Kabukahyojiboard__c ,' + 
						'Televi__c ,' + 
						'Radio__c ,' + 
						'Insatsubutsu__c ,' + 
						'OpenGataTanmatsuService__c ,' + 
						'Jikoriyo__c ,' + 
						'Sobakeiyakucheck__c ,' + 
						'Hombankaishibi__c ,' + 
						'Honshinseinotekiyobi__c ,' + 
						'Henkoriyuu__c ,' + 
						'Riyochushibi_Yotei__c ,' + 
						'Kaiyakuriyuu__c ,' + 
						'Biko__c ,' + 
						'Himokuryokin1__c ,' + 
						'Himokuryokin2__c ,' + 
						'Himokuryokin3__c ,' + 
						'Himokuryokin4__c ,' + 
						'Himokuryokin5__c ,' + 
						'Hoshokin__c ,' + 
						'Henkomaekeiyaku__c ,' + 
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
						' $19, ' +
						' $20, ' +
						' $21, ' +
						' $22, ' +
						' $23, ' +
						' $24, ' +
						' $25, ' +
						' $26, ' +
						' $27, ' +
						' $28, ' +
						' $29, ' +
						' $30 ' +
				   ') ' ;
		instvar =[
						upInsO.kihonkeiyakuno__c,
						upInsO.shinseistatus__c,
						upInsO.shinseikubun__c,
						upInsO.shohin__c,
						upInsO.shanaigyomushiyo__c==undefined?false:true,
						upInsO.kaiinseitammatsuservice__c==undefined?false:true,
						upInsO.datafeed__c==undefined?false:true,
						upInsO.jikibaitai__c==undefined?false:true,
						upInsO.onsei__c==undefined?false:true,
						upInsO.kabukahyojiboard__c==undefined?false:true,
						upInsO.televi__c==undefined?false:true,
						upInsO.radio__c==undefined?false:true,
						upInsO.insatsubutsu__c==undefined?false:true,
						upInsO.opengatatanmatsuservice__c,
						upInsO.jikoriyo__c==undefined?false:true,
						upInsO.sobakeiyakucheck__c,
						upInsO.hombankaishibi__c==''?null:upInsO.hombankaishibi__c,
						upInsO.honshinseinotekiyobi__c==''?null:upInsO.honshinseinotekiyobi__c,
						upInsO.henkoriyuu__c,
						upInsO.riyochushibi_yotei__c==''?null:upInsO.riyochushibi_yotei__c,
						upInsO.kaiyakuriyuu__c,
						upInsO.biko__c,
						upInsO.himokuryokin1__c==''?null:upInsO.himokuryokin1__c,
						upInsO.himokuryokin2__c==''?null:upInsO.himokuryokin2__c,
						upInsO.himokuryokin3__c==''?null:upInsO.himokuryokin3__c,
						upInsO.himokuryokin4__c==''?null:upInsO.himokuryokin4__c,
						upInsO.himokuryokin5__c==''?null:upInsO.himokuryokin5__c,
						upInsO.hoshokin__c==''?null:upInsO.henkomaekeiyaku__c,
						upInsO.henkomaekeiyaku__c==''?null:upInsO.henkomaekeiyaku__c,
						upInsO.herokuid__c
					];
		//update qry
		updstr = 'Update salesforce.TMI_Keiyaku_API__c SET '+
							'KihonkeiyakuNo__c= $1  ,'  +
							'Shinseistatus__c= $2  ,'  +
							'Shinseikubun__c= $3  ,'  +
							'Shohin__c= $4  ,'  +
							'Shanaigyomushiyo__c= $5  ,'  +
							'Kaiinseitammatsuservice__c= $6  ,'  +
							'Datafeed__c= $7  ,'  +
							'Jikibaitai__c= $8  ,'  +
							'Onsei__c= $9  ,'  +
							'Kabukahyojiboard__c= $10  ,'  +
							'Televi__c= $11  ,'  +
							'Radio__c= $12  ,'  +
							'Insatsubutsu__c= $13  ,'  +
							'OpenGataTanmatsuService__c= $14  ,'  +
							'Jikoriyo__c= $15  ,'  +
							'Sobakeiyakucheck__c= $16  ,'  +
							'Hombankaishibi__c= $17  ,'  +
							'Honshinseinotekiyobi__c= $18  ,'  +
							'Henkoriyuu__c= $19  ,'  +
							'Riyochushibi_Yotei__c= $20  ,'  +
							'Kaiyakuriyuu__c= $21  ,'  +
							'Biko__c= $22  ,'  +
							'Himokuryokin1__c= $23  ,'  +
							'Himokuryokin2__c= $24  ,'  +
							'Himokuryokin3__c= $25  ,'  +
							'Himokuryokin4__c= $26  ,'  +
							'Himokuryokin5__c= $27  ,'  +
							'Hoshokin__c= $28  ,'  +
							'Henkomaekeiyaku__c= $29  ,'  +
							'HerokuId__c= $30  '  +
						' WHERE  Name= $31 ' ;
		updvar =instvar.concat([idSyc]);
	}
	//return qry
	var qrystr = 'Select ' +
							'Name ,' + 
							'KihonkeiyakuNo__c ,' + 
							'Shinseistatus__c ,' + 
							'Shinseikubun__c ,' + 
							'Shohin__c ,' + 
							'Shanaigyomushiyo__c ,' + 
							'Kaiinseitammatsuservice__c ,' + 
							'Datafeed__c ,' + 
							'Jikibaitai__c ,' + 
							'Onsei__c ,' + 
							'Kabukahyojiboard__c ,' + 
							'Televi__c ,' + 
							'Radio__c ,' + 
							'Insatsubutsu__c ,' + 
							'OpenGataTanmatsuService__c ,' + 
							'Jikoriyo__c ,' + 
							'Sobakeiyakucheck__c ,' + 
							'Hombankaishibi__c ,' + 
							'Honshinseinotekiyobi__c ,' + 
							'Henkoriyuu__c ,' + 
							'Riyochushibi_Yotei__c ,' + 
							'Kaiyakuriyuu__c ,' + 
							'Biko__c ,' + 
							'Himokuryokin1__c ,' + 
							'Himokuryokin2__c ,' + 
							'Himokuryokin3__c ,' + 
							'Himokuryokin4__c ,' + 
							'Himokuryokin5__c ,' + 
							'Hoshokin__c ,' + 
							'Henkomaekeiyaku__c ,' + 
							'HerokuId__c ' + 
						' from salesforce.TMI_Keiyaku_API__c   ';
	var qryVar = [idSyc];

	// dispather
	if(action == "create"){
		updstr = inststr;
		updvar = instvar;
		qrystr += ' where HerokuId__c= $1 ';
		qryVar = [herokuId];
	}else if(action == "edit"){
		qrystr += ' where Name = $1 ';
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

