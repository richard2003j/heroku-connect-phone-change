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
	var account_dic;
	var com_kihonkeiyaku; // id, name for 基本契約
	var kihonkeiyaku_dic;
	var com_accesskey; // id, name for アクセスキー
	var accesskey_dic;
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
				account_dic = makeDic(data.data);
			});

		// common  sfid, name
		 $.ajax({
                url:'/common-init?action=' + 'kihonkeiyaku-id',
                method:'get',
                async: false
    		}).done(function(data){
				com_kihonkeiyaku=data.data;
				kihonkeiyaku_dic = makeDic(data.data);
			});
		// common data accesskey sfid, name
		$.ajax({
			url:'/common-init?action=' + 'accesskey-id',
			method:'get',
			async: false
		}).done(function(data){
			//alert(data);
			com_accesskey=data.data;
			accesskey_dic = makeDic(data.data);
		});


		editor = new $.fn.dataTable.Editor( {
			ajax: {
				url: "/tmi-accesskey-crud",
				method: "get"
			},
			//data: data_act,
			table: "#tblAct",
			idSrc:  'name',
			fields: [ 
				{	label: 'アクセスキー管理No' , name:'name' , type:'readonly', attr:{ disabled:true }     },
				{	label: '基本契約No' , name:'kihonkeiyakuno__c' , type: 'select', 
						options:	[{label:'',value:null}].concat(com_kihonkeiyaku)        },
				{	label: '取引先名' , name:'torihikisakimei__c'  , type: 'select', 
						options:	[{label:'',value:null}].concat(com_account)       },
				{	label: 'ステータス' , name:'status__c'  , type: 'select', 
						options:[  {label: '対応待ち', value: '対応待ち'}, {label: '取下げ', value: '取下げ'}, {label: '完了', value: '完了'}  ]  },
				{	label: 'アクセスキーの切替日' , name:'accesskeynokirikaebi__c' ,type:'datetime', format: 'YYYY-MM-DD'   },
				{	label: 'テスト接続開始日' , name:'testsetsuzokukaishibi__c' ,type:'datetime', format: 'YYYY-MM-DD'   },
				{	label: '変更前アクセスキー' , name:'henkomaeaccesskey__c' , type: 'select', 
						options:	[{label:'',value:null}].concat(com_accesskey)        },
				{	label: '変更理由' , name:'henkoriyu__c'    },
				{	label: 'HerokuId' , name:'herokuid__c'    }
			]
		} );
		// customize select by select2 
		$('select',editor.field('kihonkeiyakuno__c').node()).select2({ width: '100%' });
		$('select',editor.field('torihikisakimei__c').node()).select2({ width: '100%' });
		$('select',editor.field('torihikisakimei__c').node()).select2({ width: '100%' });

		mTable = $('#tblAct').DataTable( {
			scrollX: true,
			scrollY: 460,	
			pageLength: 50,
			dom: "Bfrtip",
			ajax: {
							url: "/tmi-accesskey-crud",
							method: "get",
				},
			//data:data_act,
			columns: [
				{ data: 'name'},
				{ data: 'kihonkeiyakuno__c',
				render: function ( data, type, row, meta ) {
					return	data != ''  && data != null? kihonkeiyaku_dic[data]:data;} },
				{ data: 'torihikisakimei__c',
						render: function ( data, type, row, meta ) {
							return	data != ''  && data != null? account_dic[data]:data;} },
				{ data: 'status__c'},
				{ data: 'accesskeynokirikaebi__c'},
				{ data: 'testsetsuzokukaishibi__c'},
				{ data: 'henkomaeaccesskey__c',
						render: function ( data, type, row, meta ) {
							return	data != ''  && data != null? accesskey_dic[data]:data;} },
				{ data: 'henkoriyu__c'},
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


