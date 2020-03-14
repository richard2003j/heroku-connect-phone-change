
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

			//$('#example').DataTable().data = jsonData2;
			//$('#example').DataTable().ajax.reload();
		} );
		$('ul.tabs li.active').click();
	} );
}


