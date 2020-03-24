	function makeDic(o){
						var str = '';
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
	var account_dic;
	var com_contact; // id, name for contact
	var contact_dic;
	var com_contents; // id, name for contents
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
    		}).done(function(data){
				com_account=data.data;
				account_dic = makeDic(com_account);
			});

		// common contact sfid, name
		 $.ajax({
                url:'/common-init?action=' + 'contact-id',
                method:'get',
                async: false
    		}).done(function(data){
				com_contact=data.data;
				contact_dic = makeDic(com_contact);
			});
		// common data contents sfid, name
		$.ajax({
			url:'/common-init?action=' + 'contents-id',
			method:'get',
			async: false
		}).done(function(data){
			//alert(data);
			com_contents=data.data;
			contents_dic = makeDic(com_contents);
		});


		editor = new $.fn.dataTable.Editor( {
			ajax: {
				url: "/tmi-kihonkeiyaku-crud",
				method: "get"
			},
			//data: data_act,
			table: "#tblAct",
			idSrc:  'name',
			fields: [ 
				{	label: '基本契約No' , name:'name'  , type:'readonly', attr:{ disabled:true }   },
				{	label: 'コンテンツ' , name:'contents__c', type: 'select', 
						options:	[{label:'',value:null}].concat(com_contents)     },
				{	label: '取引先名' , name:'torihikisakimei__c', type: 'select', 
						options:	[{label:'',value:null}].concat(com_account)  },
				{	label: '契約ステータス' , name:'keiyakustatus__c'  , 
					type: 'select', 
					options:[ {label: '', value: null} , {label: '未契約', value: '未契約'} , {label: '既契約', value: '既契約'} , {label: '解約済み', value: '解約済み'}  ]  },
				{	label: '契約担当者' , name:'keiyakutantosha__c' ,type: 'select', 
						options:	[{label:'',value:null}].concat(com_contact)     },
				{	label: '請求担当者（基本料金）' , name:'seikyutantosha_kihonryokin__c', type: 'select', 
						options:	[{label:'',value:null}].concat(com_contact)      },
				{	label: '請求担当者（従量料金）' , name:'seikyutantosha_juryoryokin__c', type: 'select', 
						options:	com_contact      },
				{	label: '請求担当者（その他料金）' , name:'seikyutantosha_sonotaryokin__c', type: 'select', 
						options:com_contact      },
				{	label: 'HerokuId' , name:'herokuid__c'    }
					]
		} );
		// customize select by select2 
		$('select',editor.field('contents__c').node()).select2();
		$('select',editor.field('torihikisakimei__c').node()).select2();
		$('select',editor.field('keiyakutantosha__c').node()).select2();
		$('select',editor.field('seikyutantosha_kihonryokin__c').node()).select2();
		$('select',editor.field('seikyutantosha_juryoryokin__c').node()).select2();
		$('select',editor.field('seikyutantosha_sonotaryokin__c').node()).select2();

		mTable = $('#tblAct').DataTable( {
			scrollX: true,
			scrollY: 460,	
			pageLength: 50,
			dom: "Bfrtip",
			ajax: {
							url: "/tmi-kihonkeiyaku-crud",
							method: "get",
							data: JSON.stringify({
								name: "xxxx"
							}),
							contentType: "application/json; charset=utf-8",
							dataType: "json"
				},
			//data:data_act,
			columns: [

						{ data: 'name'},
						{ data: 'contents__c',
							render: function ( data, type, row, meta ) {
								return	data != ''  && data != null? contents_dic[data]:data;} },
						{ data: 'torihikisakimei__c',
							render: function ( data, type, row, meta ) {
								return	data != ''  && data != null? account_dic[data]:data;} },
						{ data: 'keiyakustatus__c'},
						{ data: 'keiyakutantosha__c',
						render: function ( data, type, row, meta ) {
							return	data != ''  && data != null? contact_dic[data]:data;}},
						{ data: 'seikyutantosha_kihonryokin__c',
							render: function ( data, type, row, meta ) {
								return	data != ''  && data != null? contact_dic[data]:data;} },
						{ data: 'seikyutantosha_juryoryokin__c',
						render: function ( data, type, row, meta ) {
							return	data != ''  && data != null? contact_dic[data]:data;} },
						{ data: 'seikyutantosha_sonotaryokin__c',
						render: function ( data, type, row, meta ) {
							return	data != ''  && data != null? contact_dic[data]:data;} },
						{ data: 'herokuid__c'},
						{ data: 'sf_message'}

					],
			select: true,
			buttons: [
				{ extend: "create", text: "新規",editor: editor },
				{ extend: "edit", text: "編集",editor: editor }
				
			]
		} ); // end mTable





	} );


