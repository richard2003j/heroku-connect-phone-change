module.exports = function (req, res){
	var pg = require('pg');

    console.log("uri:common-init");
    var action = req.query.action;
	var qrystr =' Select Sfid name,Name label ';
	var qryvar =[];

	console.log("action:" + action);
	//return qry
	if(action == "account-id"){qrystr += ' from salesforce.Account   ';}
	if(action == "contents-id"){qrystr += ' from salesforce.TMI_Contents__c  ';}
	if(action != ''){
		pg.connect(process.env.DATABASE_URL, function (err, conn, done) {
	        // watch for any connect issues
	        if (err) console.log(err);
	        conn.query(
				qrystr,
				qryvar,
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
	 }  //action end

}

