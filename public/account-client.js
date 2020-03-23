
	var editor; // use a global for the submit and return data rendering in the examples
	var mTable;
	var data_act; // account
	var data_cnt; // contact
	var data_act = [{"name":"tttt1","torihikisakino__c":"TR-000046","eibuntorihikisakimei__c":"wwww","kakogaishamei__c":"qqq","kuni__c":null,"yuubimbango__c":null,"jusho1__c":null,"jusho2__c":null,"daihyoshayakushoku__c":null,"daihyoshashimei__c":null,"busho__c":null,"tantoshashimei__c":null,"denwabango__c":null,"emaiil1__c":null,"emaiil2__c":null,"emaiil3__c":null,"kakuninstatus__c":'未確認',"keiyakustatus__c":null,"shinseistatus__c":null,"herokuid__c":"ttt11111"},{"name":"t5","torihikisakino__c":"TR-000047","eibuntorihikisakimei__c":"tt5","kakogaishamei__c":"tt6","kuni__c":"666","yuubimbango__c":null,"jusho1__c":null,"jusho2__c":null,"daihyoshayakushoku__c":null,"daihyoshashimei__c":null,"busho__c":null,"tantoshashimei__c":null,"denwabango__c":null,"emaiil1__c":null,"emaiil2__c":null,"emaiil3__c":null,"kakuninstatus__c":null,"keiyakustatus__c":null,"shinseistatus__c":null,"herokuid__c":"1234h1234"},{"name":"QA取引先（削除用）","torihikisakino__c":"TR-000048","eibuntorihikisakimei__c":null,"kakogaishamei__c":null,"kuni__c":null,"yuubimbango__c":null,"jusho1__c":null,"jusho2__c":null,"daihyoshayakushoku__c":null,"daihyoshashimei__c":null,"busho__c":null,"tantoshashimei__c":null,"denwabango__c":null,"emaiil1__c":null,"emaiil2__c":null,"emaiil3__c":null,"kakuninstatus__c":null,"keiyakustatus__c":null,"shinseistatus__c":null,"herokuid__c":null},{"name":"テスト取引先","torihikisakino__c":"TR-000001","eibuntorihikisakimei__c":null,"kakogaishamei__c":null,"kuni__c":null,"yuubimbango__c":null,"jusho1__c":null,"jusho2__c":null,"daihyoshayakushoku__c":null,"daihyoshashimei__c":null,"busho__c":null,"tantoshashimei__c":null,"denwabango__c":null,"emaiil1__c":null,"emaiil2__c":null,"emaiil3__c":null,"kakuninstatus__c":null,"keiyakustatus__c":"未契約","shinseistatus__c":null,"herokuid__c":null}];
	// xxx
	$(document).ready(function() {
		editor = new $.fn.dataTable.Editor( {
			ajax: {
				url: "/account-crud",
				method: "get",
			},
			data: data_act,
			table: "#tblAct",
			idSrc:  'torihikisakino__c',
			fields: [ 
						{	label: '取引先名' , name:'name'    },
						{	label: '英文取引先名' , name:'eibuntorihikisakimei__c'    },
						{	label: '過去会社名' , name:'kakogaishamei__c'    },
						{	label: '国' , name:'kuni__c'    },
						{	label: '郵便番号' , name:'yuubimbango__c'    },
						{	label: '住所1' , name:'jusho1__c'    },
						{	label: '住所2' , name:'jusho2__c'    },
						{	label: '代表者役職' , name:'daihyoshayakushoku__c'    },
						{	label: '代表者氏名' , name:'daihyoshashimei__c'    },
						{	label: '部署' , name:'busho__c'    },
						{	label: '担当者氏名' , name:'tantoshashimei__c'    },
						{	label: '電話番号' , name:'denwabango__c'    },
						{	label: 'E-mail 1' , name:'emaiil1__c'    },
						{	label: 'E-mail 2' , name:'emaiil2__c'    },
						{	label: 'E-mail 3' , name:'emaiil3__c'    },
						{	label: '確認ステータス' , name:'kakuninstatus__c' ,
									type: "select", 
									options:[ { label: "", name: null}, { label: "未確認", name: "未確認"}, { label: "確認済み", name: "確認済み"} ]
						},
						{	label: '契約ステータス' , name:'keiyakustatus__c',    
									type: "select" , 
									options:[ { label: "", name: null}, { label: "未契約", name: "未契約"}, { label: "既契約者", name: "既契約者"}, { label: "解約者", name: "解約者"} ]
						},
						{	label: '申請ステータス' , name:'shinseistatus__c' ,   
									type: "select" , 
									options:[ { label: "なし", name: null}, { label: "受付", name: "受付"}, { label: "反社チェック中", name: "反社チェック中"}, { label: "覚書確認中", name: "覚書確認中"}, { label: "発行済み", name: "発行済み"} ]
						},
						{	label: 'HerokuId' , name:'herokuid__c'    }
					]
		} );

		mTable = $('#tblAct').DataTable( {
			scrollX: true,
			scrollY: 460,	
			pageLength: 50,
			dom: "Bfrtip",
			ajax: {
							url: "/account-crud",
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
					{ data: "torihikisakino__c"},
					{ data: "eibuntorihikisakimei__c"},
					{ data: "kakogaishamei__c"},
					{ data: "kuni__c"},
					{ data: "yuubimbango__c"},
					{ data: "jusho1__c"},
					{ data: "jusho2__c"},
					{ data: "daihyoshayakushoku__c"},
					{ data: "daihyoshashimei__c"},
					{ data: "busho__c"},
					{ data: "tantoshashimei__c"},
					{ data: "denwabango__c"},
					{ data: "emaiil1__c"},
					{ data: "emaiil2__c"},
					{ data: "emaiil3__c"},
					{ data: "kakuninstatus__c"},
					{ data: "keiyakustatus__c"},
					{ data: "shinseistatus__c"},
					{ data: "herokuid__c"}
			],
			select: true,
			buttons: [
				{ extend: "create", text: "新規",editor: editor },
				{ extend: "edit", text: "編集",editor: editor }
				// { extend: "edit",   
				// 	text: "編集",
				// 	action: function ( e, dt, node, config ) {
						
	   //                  editor
	   //                      .edit( mTable.row( { selected: true } ).index(), 
	   //                      	{
	   //                      		title: '編集',
	   //                          	buttons: '更新'
	   //                      	}
	   //                        );
	   //                   //var status = editor.field('kakuninstatus__c').val();
	   //              }

				// }
			]
		} );
	} );


