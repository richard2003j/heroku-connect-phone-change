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
	var com_contents; // id, name for contents
	var account_dic;
	var contents_dic;
	// sanple for client js
	var data_act = [{"name":"石井 照彦","lastname":"石井","aid":"0015D00000bf9cUQA","accountid":"0015D00000bf9cUQA","tantokubun__c":null,"kaishamei__c":"立花証券株式会社","eibuntorihikisakimei__c":"タチバナショウケン","kuni__c":"日本","yuubimbango__c":"103-0025","jusho1__c":"東京都中央区日本橋茅場町１－１３－１４","jusho2__c":null,"busho__c":"情報システム部","denwabango__c":"03-3669-4129","email1__c":"ishii@lban.co.jp.demo","email2__c":null,"email3__c":null,"biko__c":null,"kakuninstatus__c":null,"contents__c":null,"herokuid__c":null,"seikyushohakko__c":null},{"name":"田中 太郎","lastname":"田中","accountid":"0015D00000bCTELQA4","tantokubun__c":"契約担当者","kaishamei__c":null,"eibuntorihikisakimei__c":"クイック","kuni__c":null,"yuubimbango__c":null,"jusho1__c":null,"jusho2__c":null,"busho__c":null,"denwabango__c":null,"email1__c":null,"email2__c":null,"email3__c":null,"biko__c":null,"kakuninstatus__c":null,"contents__c":null,"herokuid__c":null,"seikyushohakko__c":null},{"name":"東浦 久雄","lastname":"東浦","accountid":"0015D00000bCX7PQAW","tantokubun__c":null,"kaishamei__c":"野村アセットマネジメント株式会社","eibuntorihikisakimei__c":"ノムラアセットマネジメント","kuni__c":"日本","yuubimbango__c":"103-8260","jusho1__c":"東京都中央区日本橋1-11-1","jusho2__c":null,"busho__c":"IT戦略部","denwabango__c":"03-3241-9025","email1__c":"h-higashiura@nomura-am.co.jp.demo","email2__c":null,"email3__c":null,"biko__c":null,"kakuninstatus__c":null,"contents__c":null,"herokuid__c":null,"seikyushohakko__c":null}];
	com_account=[{"label":"東京海上日動火災保険株式会社","value":"0015D00000bDFrqQAG"},
				{"label":"立花証券株式会社","value":"0015D00000bf9cUQA"}];

	// xxx
	$(document).ready(function() {

		// common data account sfid, name
		 $.ajax({
                url:'/common-init?action=' + 'account-id',
                method:'get',
                async: false
         	}).fail(function(jqXHR, textStatus, errorThrown){
      				alert("fail " + textStatus);
    		}).done(function(data){
				//alert(data);
				com_account=data.data;
				account_dic = makeDic(com_account);
			});

		// common data contents sfid, name
		 $.ajax({
                url:'/common-init?action=' + 'contents-id',
                method:'get',
                async: false
         	}).fail(function(jqXHR, textStatus, errorThrown){
      				alert("fail " + textStatus);
    		}).done(function(data){
				//alert(data);
				com_contents=data.data;
				contents_dic = makeDic(com_contents);
			});


		editor = new $.fn.dataTable.Editor( {
			ajax: {
				url: "/contact-crud",
				method: "get"
			},
			//data: data_act,
			table: "#tblAct",
			idSrc:  'name',
			fields: [ 
						{	label: '姓' , name:'lastname'    },
						{	label: '取引先名' , name:'accountid', type:'select',
							options:[{label:'',name:null}].concat(com_account)
						},
						{	label: '担当区分' , name:'tantokubun__c'    },
						{	label: '会社名' , name:'kaishamei__c'},
						{	label: '英文取引先名' , name:'eibuntorihikisakimei__c'    },
						{	label: '国' , name:'kuni__c'    },
						{	label: '郵便番号' , name:'yuubimbango__c'    },
						{	label: '住所1' , name:'jusho1__c'    },
						{	label: '住所2' , name:'jusho2__c'    },
						{	label: '部署' , name:'busho__c'    },
						{	label: '電話番号' , name:'denwabango__c'    },
						{	label: 'E-mail 1' , name:'email1__c'    },
						{	label: 'E-mail 2' , name:'email2__c'    },
						{	label: 'E-mail 3' , name:'email3__c'    },
						{	label: '備考' , name:'biko__c'    },
						{	label: '確認ステータス' , name:'kakuninstatus__c',
								type: "select" , 
								options:[ { label: "", name: null}, { label: "未確認", name: "未確認"}, { label: "確認済み", name: "確認済み"} ]
						},
						{	label: 'コンテンツ' , name:'contents__c',  type:'select',					
						 	options:[{label:'',name:null}].concat(com_contents)
						 },
						{	label: 'HerokuId' , name:'herokuid__c'    },
						{	label: '請求書発行' , name:'seikyushohakko__c',
								type: "select" , 
								options:[ { label: "有", name: "有"}, { label: "無", name: "無"} ]

						}
					]
		} );
		
		// validations
		editor.on( 'preSubmit', function ( e, o, action ) {
	        if ( action == 'create' ||  action == 'edit' ) {
	            
				//姓
				var lastname = this.field( 'lastname' );
	            if ( ! lastname.val() ) lastname.error( '姓が必須です。' );
                if ( lastname.val().length >= 80 )  lastname.error( '姓の長さは80文字以外です。' );

	            //Email１
				var email1__c = this.field( 'email1__c' );
	            if ( ! email1__c.val() ) lastname.error( 'Email1が必須です。' );
 
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
							url: "/contact-crud",
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
						{ data: "lastname"},
						{ data: "accountid",
							render: function ( data, type, row, meta ) {
										if (data != ''  && data != null )
											return account_dic[data];
										else
											return data;
									 }
						},
						{ data: "tantokubun__c"},
						{ data: "kaishamei__c"},
						{ data: "eibuntorihikisakimei__c"},
						{ data: "kuni__c"},
						{ data: "yuubimbango__c"},
						{ data: "jusho1__c"},
						{ data: "jusho2__c"},
						{ data: "busho__c"},
						{ data: "denwabango__c"},
						{ data: "email1__c"},
						{ data: "email2__c"},
						{ data: "email3__c"},
						{ data: "biko__c"},
						{ data: "kakuninstatus__c"},
						{ data: "contents__c",
							render: function ( data, type, row, meta ) {
										if (data != '' && data != null ){
											return contents_dic[data];}
										else{
											return data;}
									 }
						
						
						},
						{ data: "herokuid__c"},
						{ data: "seikyushohakko__c"}
						],
			select: true,
			buttons: [
				{ extend: "create", text: "新規",editor: editor },
				{ extend: "edit", text: "編集",editor: editor }
				//  { extend: "edit",   
				// 	text: "編集",
				// 	action: function ( e, dt, node, config ) {
				// 		//set options 
				
				// 		editor.field('accountid').update(	[{label:'',name:null}].concat(com_account)	);
				// 		editor.field('contents__c').update(	[{label:'',name:null}].concat(com_contents)	);

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


