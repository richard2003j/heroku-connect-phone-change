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
	var com_shohin; // id, name for 商品
	var shohin_dic;
	var com_keiyakuapi; // id, name for 契約API
	var keiyakuapi_dic;
	// sanple for client js
	var data_act = [{"name":"石井 照彦","lastname":"石井","aid":"0015D00000bf9cUQA","accountid":"0015D00000bf9cUQA","tantokubun__c":null,"kaishamei__c":"立花証券株式会社","eibuntorihikisakimei__c":"タチバナショウケン","kuni__c":"日本","yuubimbango__c":"103-0025","jusho1__c":"東京都中央区日本橋茅場町１－１３－１４","jusho2__c":null,"busho__c":"情報システム部","denwabango__c":"03-3669-4129","email1__c":"ishii@lban.co.jp.demo","email2__c":null,"email3__c":null,"biko__c":null,"kakuninstatus__c":null,"contents__c":null,"herokuid__c":null,"seikyushohakko__c":null},{"name":"田中 太郎","lastname":"田中","accountid":"0015D00000bCTELQA4","tantokubun__c":"契約担当者","kaishamei__c":null,"eibuntorihikisakimei__c":"クイック","kuni__c":null,"yuubimbango__c":null,"jusho1__c":null,"jusho2__c":null,"busho__c":null,"denwabango__c":null,"email1__c":null,"email2__c":null,"email3__c":null,"biko__c":null,"kakuninstatus__c":null,"contents__c":null,"herokuid__c":null,"seikyushohakko__c":null},{"name":"東浦 久雄","lastname":"東浦","accountid":"0015D00000bCX7PQAW","tantokubun__c":null,"kaishamei__c":"野村アセットマネジメント株式会社","eibuntorihikisakimei__c":"ノムラアセットマネジメント","kuni__c":"日本","yuubimbango__c":"103-8260","jusho1__c":"東京都中央区日本橋1-11-1","jusho2__c":null,"busho__c":"IT戦略部","denwabango__c":"03-3241-9025","email1__c":"h-higashiura@nomura-am.co.jp.demo","email2__c":null,"email3__c":null,"biko__c":null,"kakuninstatus__c":null,"contents__c":null,"herokuid__c":null,"seikyushohakko__c":null}];
	com_account=[{"label":"東京海上日動火災保険株式会社","value":"0015D00000bDFrqQAG"},
				{"label":"立花証券株式会社","value":"0015D00000bf9cUQA"}];

	// xxx
	$(document).ready(function() {

		// common data 契約API sfid, name
		 $.ajax({
                url:'/common-init?action=' + 'keiyakuapi-id',
                method:'get',
                async: false
    		}).done(function(data){
				com_keiyakuapi=data.data;
				keiyakuapi_dic = makeDic(data.data);
			});

		// common 基本契約 sfid, name
		 $.ajax({
                url:'/common-init?action=' + 'kihonkeiyaku-id',
                method:'get',
                async: false
    		}).done(function(data){
				com_kihonkeiyaku=data.data;
				kihonkeiyaku_dic = makeDic(data.data);
			});
		// common data 商品 sfid, name
		$.ajax({
			url:'/common-init?action=' + 'shohin-id',
			method:'get',
			async: false
		}).done(function(data){
			//alert(data);
			com_shohin=data.data;
			shohin_dic = makeDic(data.data);
		});


		editor = new $.fn.dataTable.Editor( {
			ajax: {
				url: "/tmi-keiyakuapi-crud",
				method: "get"
			},
			//data: data_act,
			table: "#tblAct",
			idSrc:  'name',
			fields: [ 
				{	label: '契約SubNo' , name:'name' , type:'readonly', attr:{ disabled:true }     },
				{	label: '基本契約No' , name:'kihonkeiyakuno__c' 
						, type: 'select', options:[ {label: '', value: null }].concat(com_kihonkeiyaku)   },
				{	label: '申請ステータス' , name:'shinseistatus__c'  , type: 'select', options:[ {label: '', value: null} , {label: '申請取り下げ', value: '申請取り下げ'} , {label: '申請受付済み', value: '申請受付済み'} , {label: '申請内容確認中', value: '申請内容確認中'} , {label: '料金登録(一次承認待ち)', value: '料金登録(一次承認待ち)'} , {label: '料金登録(最終承認待ち)', value: '料金登録(最終承認待ち)'} , {label: '料金登録(料金公開待ち)', value: '料金登録(料金公開待ち)'} , {label: '料金確認中', value: '料金確認中'} , {label: '精査中', value: '精査中'} , {label: '精査中(一次承認待ち)', value: '精査中(一次承認待ち)'} , {label: '精査中(最終承認待ち)', value: '精査中(最終承認待ち)'} , {label: '精査完了登録待ち', value: '精査完了登録待ち'} , {label: '申請完了', value: '申請完了'} , {label: '契約中', value: '契約中'} , {label: '解約済み', value: '解約済み'}  ]  },
				{	label: '申請区分' , name:'shinseikubun__c'  , type: 'select', options:[ {label: '', value: null }, {label: '新規契約', value: '新規契約'} , {label: '契約変更', value: '契約変更'} , {label: '解約', value: '解約'}  ]  },
				{	label: '商品' , name:'shohin__c' 
						, type: 'select', options:[ {label: '', value: null }].concat(com_shohin)     },
				{	label: '社内業務使用' , name:'shanaigyomushiyo__c'  , type: 'checkbox', options:[{ label:'', value:true }]    },
				{	label: '会員制端末サービス' , name:'kaiinseitammatsuservice__c'  , type: 'checkbox', options:[{ label:'', value:true }]    },
				{	label: 'データフィード' , name:'datafeed__c'   , type: 'checkbox', options:[{ label:'', value:true }]   },
				{	label: '磁気媒体' , name:'jikibaitai__c' , type: 'checkbox', options:[{ label:'', value:true }]     },
				{	label: '音声' , name:'onsei__c' , type: 'checkbox', options:[{ label:'', value:true }]     },
				{	label: '株価表示ボード' , name:'kabukahyojiboard__c' , type: 'checkbox', options:[{ label:'', value:true }]     },
				{	label: 'テレビ' , name:'televi__c' , type: 'checkbox', options:[{ label:'', value:true }]     },
				{	label: 'ラジオ' , name:'radio__c' , type: 'checkbox', options:[{ label:'', value:true }]     },
				{	label: '印刷物' , name:'insatsubutsu__c' , type: 'checkbox', options:[{ label:'', value:true }]     },
				{	label: 'オープン型端末サービス' , name:'opengatatanmatsuservice__c'  , type: 'select', options:[ {label: '', value: null} , {label: '遅延', value: '遅延'} , {label: '終値', value: '終値'}  ]  },
				{	label: '自己利用' , name:'jikoriyo__c'  , type: 'checkbox', options:[{ label:'', value:true }]    },
				{	label: '相場契約チェック' , name:'sobakeiyakucheck__c' 
						,type: 'select', options:[ {label: '', value: null }, {label: '無', value: '無'} , {label: '有', value: '有'}   ]    },
				{	label: '本番開始日' , name:'hombankaishibi__c' ,type:'datetime', format: 'YYYY-MM-DD'    },
				{	label: '本申請の適用日' , name:'honshinseinotekiyobi__c' ,type:'datetime', format: 'YYYY-MM-DD'    },
				{	label: '変更理由' , name:'henkoriyuu__c' , type:'textarea'   },
				{	label: '利用中止日（予定）' , name:'riyochushibi_yotei__c' ,type:'datetime', format: 'YYYY-MM-DD'    },
				{	label: '解約理由' , name:'kaiyakuriyuu__c', type:'textarea'   },
				{	label: '備考' , name:'biko__c' , type:'textarea'   },
				{	label: '費目料金1' , name:'himokuryokin1__c' , attr: { type: 'number'}   },
				{	label: '費目料金2' , name:'himokuryokin2__c' , attr: { type: 'number'}    },
				{	label: '費目料金3' , name:'himokuryokin3__c' , attr: { type: 'number'}    },
				{	label: '費目料金4' , name:'himokuryokin4__c' , attr: { type: 'number'}    },
				{	label: '費目料金5' , name:'himokuryokin5__c' , attr: { type: 'number'}  },
				{	label: '保証金' , name:'hoshokin__c'   , attr: { type: 'number'}  },
				{	label: '変更前契約' , name:'henkomaekeiyaku__c'  
				, type: 'select', options:[ {label: '', value: null }].concat(com_keiyakuapi)    },
				{	label: 'HerokuId' , name:'herokuid__c'    }
			]
		} );
		// customize select by select2 
			$('select',editor.field('kihonkeiyakuno__c').node()).select2();
			$('select',editor.field('shohin__c').node()).select2();
			$('select',editor.field('henkomaekeiyaku__c').node()).select2();

		mTable = $('#tblAct').DataTable( {
			scrollX: true,
			scrollY: 460,	
			pageLength: 50,
			dom: "Bfrtip",
			ajax: {
							url: "/tmi-keiyakuapi-crud",
							method: "get",
				},
			//data:data_act,
			columns: [
				{ data: 'name'},
				{ data: 'kihonkeiyakuno__c',
						render: function ( data, type, row, meta ) {
							return	data != ''  && data != null? kihonkeiyaku_dic[data]:data;}	},
				{ data: 'shinseistatus__c'},
				{ data: 'shinseikubun__c'},
				{ data: 'shohin__c',
						render: function ( data, type, row, meta ) {
							return	data != ''  && data != null? shohin_dic[data]:data;}	},
				{ data: 'shanaigyomushiyo__c'},
				{ data: 'kaiinseitammatsuservice__c'},
				{ data: 'datafeed__c'},
				{ data: 'jikibaitai__c'},
				{ data: 'onsei__c'},
				{ data: 'kabukahyojiboard__c'},
				{ data: 'televi__c'},
				{ data: 'radio__c'},
				{ data: 'insatsubutsu__c'},
				{ data: 'opengatatanmatsuservice__c'},
				{ data: 'jikoriyo__c'},
				{ data: 'sobakeiyakucheck__c'},
				{ data: 'hombankaishibi__c'},
				{ data: 'honshinseinotekiyobi__c'},
				{ data: 'henkoriyuu__c'},
				{ data: 'riyochushibi_yotei__c'},
				{ data: 'kaiyakuriyuu__c'},
				{ data: 'biko__c'},
				{ data: 'himokuryokin1__c'},
				{ data: 'himokuryokin2__c'},
				{ data: 'himokuryokin3__c'},
				{ data: 'himokuryokin4__c'},
				{ data: 'himokuryokin5__c'},
				{ data: 'hoshokin__c'},
				{ data: 'henkomaekeiyaku__c',
						render: function ( data, type, row, meta ) {
							return	(data != '' && data != null)? keiyakuapi_dic[data] : data  
							}
				},
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


				