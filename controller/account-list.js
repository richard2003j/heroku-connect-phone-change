module.exports = function (req, res){
    var pg = require('pg');

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
}
