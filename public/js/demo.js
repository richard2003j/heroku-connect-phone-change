
/*global SyntaxHighlighter*/
SyntaxHighlighter.config.tagName = 'code';

if ( window.$ ) {
	$(document).ready( function () {
		if ( ! $.fn.dataTable ) {
			return;
		}
	

		// Tabs
		$('ul.tabs').on( 'click', 'li', function () {
			$('ul.tabs li.active').removeClass('active');
			$(this).addClass('active');

			$('div.tabs>div')
				.css('display', 'none')
				.eq( $(this).index() ).css('display', 'block');
			var jsonData2 = [{"DT_RowId":"row_1","first_name":"Tiger","last_name":"Nixon","position":"System Architect","email":"t.nixon@datatables.net","office":"Edinburgh","extn":"5421","age":"61","salary":"320800","start_date":"2011-04-25"},{"DT_RowId":"row_2","first_name":"Garrett","last_name":"Winters","position":"Accountant","email":"g.winters@datatables.net","office":"Tokyo","extn":"8422","age":"63","salary":"170750","start_date":"2011-07-25"},{"DT_RowId":"row_3","first_name":"Tiger","last_name":"Nixon","position":"System Architect","email":"t.nixon@datatables.net","office":"Edinburgh","extn":"5421","age":"61","salary":"320800","start_date":"2011-04-25"}];

			//$('#example').DataTable().data = jsonData2;
			//$('#example').DataTable().ajax.reload();
		} );
		$('ul.tabs li.active').click();
	} );
}


