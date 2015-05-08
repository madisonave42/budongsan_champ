/******************
 * Class Function *
 ******************/


/**************
 * Main Event *
 **************/

// Check UA
if( navigator.userAgent.indexOf('Safari') > 0 ){
	if( navigator.userAgent.indexOf('Chrome') > 0 ){
		$('html').addClass('chrome');
	} else {
		$('html').addClass('Safari');
	}
} else if( navigator.userAgent.indexOf('Firefox') > 0 ){
	$('html').addClass('firefox');
} else if( navigator.userAgent.indexOf('Trident/7.0') > 0 ){
	$('html').addClass('ie11');
} else if( navigator.userAgent.indexOf('MSIE 10.0') > 0 ){
	$('html').addClass('ie10');
}

$(function(){

	/*
	 * Common
	 */

	// Set height of main-content
	(function(){
		var mainHeight = $(window).outerHeight() - HEADER_HEIGHT;
		$('.main-content .wrapper.fix-height').css({height: mainHeight});
	})();

	// React about event of user-menu in header
	(function(){
		$('.header-user-path').data('open', 'false').on('click', function(e){
			e.preventDefault();
			if( $(this).data('open') == 'false' ) {
				$(this).data('open', 'true').addClass('on').next().addClass('on');
			} else {
				$(this).data('open', 'false').removeClass('on').next().removeClass('on');
			}
		});
	})();

	// Apply selectric library
	$('.select').selectric();

	// calendar
	(function(){
		// calendar - initialize
		$('.js-cal-start, .js-cal-end').datepicker({
			dateFormat: 'yy-mm-dd',
			beforeShowDay: function(date) {
				var className = '';
				if (date.getDay() == 6) {
					className = 'ui-datepicker-sat';
				}
				if (date.getDay() == 0) {
					className = 'ui-datepicker-sun';
				}
				return [true, className];
			}
		});

		// calendar - start date
		$('.js-btn-cal-start').on('click', function(e) {
			$('.js-cal-start').datepicker('show');
		});

		// calendar - end date
		$('.js-btn-cal-end').on('click', function(e) {
			$('.js-cal-end').datepicker('show');
		});
	})();

	/*
	 * popup
	 */

	// React about event of layer popup
	(function(){

		// Open general popup
		$('.js-open-popup').on('click', function(e) {
			$('.dimmed').addClass('on');
			$('.popup').addClass('on');
			e.preventDefault();
		});

		// Close general popup
		$('.js-close-popup').on('click', function(e) {
			$('.dimmed').removeClass('on');
			$('.popup').removeClass('on');
			e.preventDefault();
		});

		// Confirm OK
		$('.js-confirm-ok').on('click', function(e) {
			$('.dimmed').removeClass('on');
			$('.popup').removeClass('on');
			e.preventDefault();
		});

		// Confirm Cancel
		$('.js-confirm-cancel').on('click', function(e) {
			$('.dimmed').removeClass('on');
			$('.popup').removeClass('on');
			e.preventDefault();
		});

	})();

});