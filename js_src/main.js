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

	(function(){

		// Set height of main-content
		(function(){
			var winHeight = $(window).outerHeight();
			var $contents = $('.contents');
			var contentsHeight = $contents.outerHeight();
			if( winHeight >= contentsHeight ) {
				$contents.css({height: winHeight - HEADER_FOOTER});
			}

			$(window).on('resize', function(){
				var winHeight = $(window).outerHeight();
				var $contents = $('.contents');
				var contentsHeight = $contents.outerHeight();
				if( winHeight >= contentsHeight ) {
					$contents.css({height: winHeight - HEADER_FOOTER});
				}
			});

		})();

		// React about mouse-over event of GNB menu
		$('.js-main-link').on('mouseenter', function(){
			$('.js-main-link').removeClass('on');
			$('.gnb-sub-wrap').removeClass('on');
			$(this).addClass('on').next('.gnb-sub-wrap').addClass('on');
		});

		$('.js-gnb').on('mouseleave', function(){
			$('.js-main-link').removeClass('on');
			$('.gnb-sub-wrap').removeClass('on');
		});

		// React about mouse-over event of MY CHAMP menu
		$('.js-my').data('open', 'false').on('click', function(){
			if( $(this).data('open') == 'false' ) {
				$('.header-my-sub').addClass('on');
				$(this).data('open', 'true');
			} else {
				$('.header-my-sub').removeClass('on');
				$(this).data('open', 'false');
			}
		});

		$('.header-my').on('mouseleave', function(){
			$('.header-my-sub').removeClass('on');
			$('.js-my').data('open', 'false');
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