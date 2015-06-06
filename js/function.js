/******************
 * Class Function *
 ******************/

// Constant
var HEADER_FOOTER = 222;

/* focus action for label on input */
var toggleLabel = function ($input) {
	$input.each(function () {
		var self = $(this);
		self.on({
			focus : function () {
				$('label[for=' + self.attr('id') +']').hide();
			},
			blur : function () {
				if (self.val() === '') {
					$('label[for=' + self.attr('id') +']').show();
				}
			}
		});
		if (self.val() !== '') {
			self.triggerHandler('focus');
		}
	});
}
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
} else if( navigator.userAgent.indexOf('Windows NT 5.1') > 0 ){
	$('html').addClass('os-xp');
}

$(function(){

	/*
	 * Common
	 */

	(function(){

		// Set height of main-content
		$(window).on('load resize', function(){
			var winHeight = $(window).outerHeight();
			var docHeight = $('body').outerHeight();
			var $contents = $('.contents');
			if( winHeight >= docHeight ) {
				$contents.css({height: winHeight - HEADER_FOOTER});
			}
		});

		// React about mouse-over event of GNB menu
		(function(){
			$('.js-main-link').on('mouseenter', function(){
				$('.js-main-link').removeClass('on');
				$('.gnb-sub-wrap').removeClass('on');
				$(this).addClass('on').next('.gnb-sub-wrap').addClass('on');
			});

			$('.js-gnb').on('mouseleave', function(){
				$('.js-main-link').removeClass('on');
				$('.gnb-sub-wrap').removeClass('on');
			});
		})();

		// React about mouse-over event of MY CHAMP menu
		(function(){
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

		// React about mouse event of select box
		(function(){

			$('.select').data('open', 'false').on('click', function(){

				$('.select').data('open', 'false').next('.select-items').removeClass('on');

				if( $(this).data('open') == 'false' ) {
					$(this).data('open', 'true').next('.select-items').addClass('on');
				} else {
					$(this).data('open', 'false').next('.select-items').removeClass('on');
				}
			});

			$(document).on('click', function(e){
				if( $(e.target).closest('.select-wrapper').length > 0 ){
					return false;
				} else {
					$('.select').data('open', 'false').next('.select-items').removeClass('on');
				}
			});

			// select list
			$('.select-items li').on('click', function(){

				var selectedItem = $(this).text();
				var $selectLabel = $(this).parents('.select-items').prev('.select').find('.label');

				$(this).addClass('selected')
					.siblings().removeClass('selected')
					.parents('.select-items').removeClass('on')
					.prev('.select').data('open', 'false');

				$selectLabel.html(selectedItem);

			});

		})();

		// Focus in password input
		$('.pwd, .pwd-confirm').data('focus', 'false').on({
			focusin: function() {
				$(this).data('focus', 'true').addClass('focus');
			},

			focusout: function() {
				if( $(this).val().length > 0 ) {
					return false;
				} else {
					$(this).data('focus', 'false').removeClass('focus');
				}
			}
		});

		// toggle label when focus on input
		(function() {
			toggleLabel( $('.js-label-toggle') );
		})();

		// tab activation
		(function() {
			$('.js-tab').each(function() {
				var self = $(this),
					items = self.find('.js-tab-link');

				items.on('click', function(e) {
					e.preventDefault();
					items.removeClass('on');
					$(this).addClass('on');
				});

			});
		})();

		// condition select activation
		(function() {
			$('.js-condition').each(function() {
				var self = $(this),
					items = self.find('.js-condition-item'),
					pannels = self.find('.js-condition-pannel');

				items.on('click change', function(e) {

					var crtCon = $(this).attr('data-condition'),
						crtPannel = pannels.filter('.' + crtCon);

					if (crtPannel.length > 0) {
						pannels.removeClass('on');
						crtPannel.addClass('on');
					}

				});

			});
		})();

	})();

	/*
	 * list
	 */

	// list sort menu toggle sub
	(function() {
		var sortMenu = $('.js-sort-menu');

		if (sortMenu.length > 0) {
			var menus = sortMenu.find('.sort-menu-item'),
				btns = sortMenu.find('.sort-menu-btn');

			btns.on('click', function() {
				var par = $(this).parents('.sort-menu-item');

				if (par.hasClass('on')) {
					par.removeClass('on');
				} else {
					menus.removeClass('on');
					par.addClass('on');
				}
			});

		}

	})();

	// list sort menu toggle from to
	(function() {
		var subInput = $('.sort-menu-sub-input');

		if (subInput.length > 0) {

			subInput.each(function() {
				var input = $(this).find('.sort-input');

				input.on('focus', function() {
					var type = $(this).attr('data-type'),
						par = $(this).parents('.sort-menu-sub');

					par.removeClass('from').removeClass('to');
					par.addClass(type);
				});

			});
		}

	})();

	// slide in list
	(function() {
		$('.js-list-slide').each(function() {
			var self = $(this);

			self.slidesjs({
		    width: 177,
		    height: 129,
		    pagination: {
          active: false
        }
		  });
		});
	})();


	 /*
	 * popup
	 */

	// React about event of layer popup
	(function(){

		// Open general popup
		$('.js-open-popup').on('click', function(e) {
			var targetPop = $( $(this).attr('data-href') );
			if (targetPop.length > 0) {
				$('.dimmed').addClass('on');
				$('.popup').removeClass('on');
				targetPop.addClass('on');
			}
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

	// focus on input
	(function() {
		toggleLabel( $('.popup-join-form-input') );
	})();

	// pop post tab
	(function() {
		var tabBtn = $('.pop-tab-link'),
			tabCont = $('.pop-tab-cont');

		tabBtn.on('click', function(e) {
			tabBtn.removeClass('on');
			tabCont.removeClass('on');

			$(this).addClass('on');
			$($(this).attr('href')).addClass('on');
			e.preventDefault();
		});
	})();

	/* pop post toggle input label */
	(function() {
		var form = $('.pop-input-holder');

		$(window).on('load', function() {
			toggleLabel(form);
		});

		function toggleLabel (el) {
			el.each(function () {
				var that = $(this);
				that.on({
					focus : function () {
						$('label[for=' + that.attr('id') +']').hide();
					},
					blur : function () {
						if (that.val() === '') {
							$('label[for=' + that.attr('id') +']').show();
						}
					}
				});
				if (that.val() !== '') {
					that.triggerHandler('focus');
				}
			});
		}
	})();

});