	function makeDic(o){
						str = '';
						for(var i=0; i<o.length; i++){
						//if(o[i].label==r){selv = o[i].value; break;}
						if(i==0)
							str += "'" + o[i].value + "':'" + o[i].label + "'";
						else
							str += ", '" +o[i].value + "':'" +  o[i].label + "'";
						}
						str = "{" + str + "}";
						return (new Function("return" + str))();
	}

	var editor; // use a global for the submit and return data rendering in the examples
	var mTable;
	var com_account; // id, name for account
	var com_user; // id, name for user
	var account_dic;
	var user_dic;
	// sanple for client js
	var data_act = [{"name":"SU-000022","userid__c":"test001id","shokaipassword__c":"pass1234","torihikisakimei__c":"0015D00000bAi6pQAC","keiyaku_kihonjohotoroku__c":true,"keiyaku_toroku_hikimodoshi_api_soba__c":false,"keiyaku_etsurankengen_api_soba__c":true,"seikyukengen_api_soba__c":false,"keiyaku_toroku_hikimodoshi_api_tekiji__c":false,"keiyaku_etsurankengen_api_tekiji__c":false,"seikyukengen_api_tekiji__c":false,"kaishibi_yotei__c":"2020-01-22","shuryobi_yotei__c":null,"teamnaishoninsha__c":"005O0000006Uf0EIAS","saishushoninsha__c":"005O0000006Uf0EIAS","teamnaishoninskip__c":false,"herokuid__c":111,"sf_message":1111}];
	var com_account=[{"value":"001O000001gFydsIAC","label":"tttt1"},{"value":"001O000001gG0FLIA0","label":"t5"},{"value":"001O000001gG0voIAC","label":"QA取引先（削除用）"},{"value":"0015D00000bAi6pQAC","label":"テスト取引先"},{"value":"0015D00000bDFrqQAG","label":"東京海上日動火災保険株式会社"},{"value":"0015D00000bf9cUQAQ","label":"メールテストテスト"},{"value":"001O000001ftha6IAA","label":"ワークフロールールテスト会社"}];
	var com_user=[{"value":"0052v00000cehFkAAI","label":"Process Automated"},{"value":"0052v00000cehKiAAI","label":"Platform Integration User"},{"value":"005O0000006Uf0EIAS","label":"システム"}];
	account_dic = makeDic(com_account);
	user_dic = 	makeDic(com_user);
	// xxx
	$(document).ready(function() {

		// common data account sfid, name
		 $.ajax({
                url:'/common-init?action=' + 'account-id',
                method:'get',
                async: false
    		}).done(function(data){
				com_account=data.data;
				account_dic = makeDic(com_account);
			});

		// common user sfid, name
		 $.ajax({
                url:'/common-init?action=' + 'tmi-userid',
                method:'get',
                async: false
    		}).done(function(data){
				com_user=data.data;
				user_dic = makeDic(com_user);
			});


		editor = new $.fn.dataTable.Editor( {
			ajax: {
				url: "/tmi-userid-crud",
				method: "get"
			},
			//data: data_act,
			table: "#tblAct",
			idSrc:  'name',
			fields: [ 
						{	label: 'ユーザID申請No' , name:'name' , type:'readonly', attr:{ disabled:true }  },
						{	label: 'ユーザID' , name:'userid__c'    },
						{	label: '初回パスワード' , name:'shokaipassword__c'    },
						{	label: '取引先名' , name:'torihikisakimei__c'  ,type:'select', id:'torihikisakimei__c_id',
								options:com_account	},
						{	label: '契約　基本情報登録権限' , name:'keiyaku_kihonjohotoroku__c'  ,type: 'checkbox',	options:[{ label:'', value:true }]   },
						{	label: '契約　登録・引戻権限(API(相場情報))' , name:'keiyaku_toroku_hikimodoshi_api_soba__c'  , type: 'checkbox', options:[{ label:'', value:true }]  },
						{	label: '契約　閲覧権限(API(相場情報))' , name:'keiyaku_etsurankengen_api_soba__c'  , type: 'checkbox', options:[{ label:'', value:true }]  },
						{	label: '請求権限(API(相場情報))' , name:'seikyukengen_api_soba__c'  , type: 'checkbox', options:[{ label:'', value:true }]  },
						{	label: '契約　登録・引戻権限(API(適時開示))' , name:'keiyaku_toroku_hikimodoshi_api_tekiji__c'  , type: 'checkbox', options:[{ label:'', value:true }]  },
						{	label: '開始日（予定）' , name:'kaishibi_yotei__c',type:'datetime', format: 'YYYY-MM-DD'   },
						{	label: '終了日（予定）' , name:'shuryobi_yotei__c',type:'datetime', format: 'YYYY-MM-DD'    },
						{	label: 'チーム内承認者' , name:'teamnaishoninsha__c' ,type:'select'	,
								options:[{label:'',value:null}].concat(com_user)	},
						{	label: '最終承認者' , name:'saishushoninsha__c' ,type:'select',
								options:[{label:'',value:null}].concat(com_user)	},
						{	label: 'チーム内承認スキップ' , name:'teamnaishoninskip__c'  , type: 'checkbox', options:[{ label:'', value:true }]  },
						{	label: 'HerokuId' , name:'herokuid__c'    }

					]
		} );
		// customize select by select2 
		$('select',editor.field('torihikisakimei__c').node()).select2({ width: '100%' });
		$('select',editor.field('teamnaishoninsha__c').node()).select2({ width: '100%' });
		$('select',editor.field('saishushoninsha__c').node()).select2({ width: '100%' });
		// validations
		editor.on( 'preSubmit', function ( e, o, action ) {
	        if ( action == 'create' ||  action == 'edit' ) {
	            
				//userid__c
				var userid__c = this.field( 'userid__c' );
	            if ( ! userid__c.val() ) userid__c.error( 'ユーザIDが必須です。' );
                if ( userid__c.val().length >= 32 ||  userid__c.val().length < 8 )  userid__c.error( 'ユーザIDの長さは8以上32以内英数字です。' );

	            //初回パスワード
				var shokaipassword__c = this.field( 'shokaipassword__c' );
	            if ( ! shokaipassword__c.val() ) shokaipassword__c.error( '初回パスワードが必須です。' );
                if ( shokaipassword__c.val().length >= 32    )  shokaipassword__c.error( '初回パスワードの長さは32以内英数です。' );

	            //開始日（予定）
				var kaishibi_yotei__c = this.field( 'kaishibi_yotei__c' );
	            if ( ! kaishibi_yotei__c.val() ) kaishibi_yotei__c.error( '開始日（予定）が必須です。' );
                
	            // If any error was reported, cancel the submission so it can be corrected
	            if ( this.inError() ) {
	                return false;
	            }
	        }
	    } );

		mTable = $('#tblAct').DataTable( {
			scrollX: true,
			scrollY: 460,	
			pageLength: 50,
			dom: "Bfrtip",
			ajax: {
							url: "/tmi-userid-crud",
							method: "get",
							data: JSON.stringify({
								name: "xxxx"
							}),
							contentType: "application/json; charset=utf-8",
							dataType: "json"
				},
			//data:data_act,
			columns: [
						{ data: "name"},
						{ data: "userid__c"},
						{ data: "shokaipassword__c"},
						{ data: "torihikisakimei__c",
							render: function ( data, type, row, meta ) {
							return	data != ''  && data != null? account_dic[data]:data;}	},
						{ data: "keiyaku_kihonjohotoroku__c"},
						{ data: "keiyaku_toroku_hikimodoshi_api_soba__c"},
						{ data: "keiyaku_etsurankengen_api_soba__c"},
						{ data: "seikyukengen_api_soba__c"},
						{ data: "keiyaku_toroku_hikimodoshi_api_tekiji__c"},
						{ data: "keiyaku_etsurankengen_api_tekiji__c"},
						{ data: "seikyukengen_api_tekiji__c"},
						{ data: "kaishibi_yotei__c"},
						{ data: "shuryobi_yotei__c"},
						{ data: "teamnaishoninsha__c",
							render: function ( data, type, row, meta ) {
							return	data != ''  && data != null? user_dic[data]:data;}	},
						{ data: "saishushoninsha__c",
							render: function ( data, type, row, meta ) {
							return	data != ''  && data != null? user_dic[data]:data;}	},
						{ data: "teamnaishoninskip__c"},
						{ data: "herokuid__c"},
						{ data: 'sf_message'}
					],
			select: true,
			buttons: [
				{ extend: "create", text: "新規",editor: editor },
				{ extend: "edit", text: "編集",editor: editor }
				//  { extend: "edit",   
				// 	text: "編集",
				// 	action: function ( e, dt, node, config ) {
				// 		//set options 
				
				// 		editor.field('torihikisakimei__c').update(	[{label:'',value:null}].concat(com_account)	);
				// 		editor.field('teamnaishoninsha__c').update(	[{label:'',value:null}].concat(com_user)	);
				// 		editor.field('saishushoninsha__c').update(	[{label:'',value:null}].concat(com_user)	);

				// 		//open
	            //         editor
	            //             .edit( mTable.row( { selected: true } ).index(), 
	            //             	{
	            //             		title: '編集',
	            //                 	buttons: '更新'

	            //             	}
	            //               );
	            //     }

				// }
			]
		} ); // end mTable





	} );


