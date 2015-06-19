/******************
 * Class Function *
 ******************/

// Constant
var HEADER_FOOTER = 222;
var MAP_LIST_WIDTH = 600;

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
};
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
			var headerHeight = $('.header').outerHeight();
			var lnbHeight = $('.lnb').outerHeight();
			var footerHeight = $('.footer').outerHeight();
			var $contents = $('.contents');
			if( winHeight >= docHeight ) {
				$contents.css({height: winHeight - headerHeight - lnbHeight - footerHeight});
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

		// toggle label when focus on input
		(function() {
			$('.js-option-toggle').each(function () {
				var self = $(this),
					options = self.find('.js-toggle-item'),
					btn = self.find('.js-toggle-btn');

				btn.on('click', function(e) {
					e.preventDefault();

					if (btn.hasClass('on')) {
						btn.removeClass('on');
						btn.text('더보기');
						//options.hide();
						options.fadeOut(150);
					} else {
						btn.addClass('on');
						btn.text('숨기기');
						//options.show();
						options.fadeIn(250);
					}

				});

				options.hide();
			});
		})();

		// tab activation
		(function() {
			$('.js-tab').each(function() {
				var self = $(this),
					items = self.find('.js-tab-link'),
					hasSection = false,
					sections;

				if (items.attr('data-target')) {
					hasSection = true;
					sections = $('.js-tab-section');
				}

				items.on('click', function(e) {
					e.preventDefault();
					items.removeClass('on');
					$(this).addClass('on');

					if (hasSection) {
						sections.removeClass('on');
						sections.filter('.' + $(this).attr('data-target')).addClass('on');
					}
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

		// basic on off
		(function() {
			var onoffBtn = $('.js-onoff');

			if (onoffBtn.length > 0) {
				onoffBtn.on('click', function() {
					$(this).toggleClass('on');
				});
			}
		})();

		// expand more area
		(function() {
			var more = $('.js-show-more');

			if (more.length > 0) {
				more.each(function() {
					var cont = $(this).find('.js-show-cont'),
						btn = $(this).find('.js-show-btn');

					btn.on('click', function(e){
						e.preventDefault();
						$(this).toggleClass('on');
						cont.toggleClass('on');
					});

				});
			}
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

	// list sort detail toggle option
	(function() {
		var detail = $('.js-detail-toggle');

		if (detail.length > 0) {

			detail.each(function() {
				var self = $(this),
					btn = self.find('.js-detail-toggle-btn');

				btn.on('click', function() {
					self.toggleClass('on');
					$(this).toggleClass('on');
				});

			});
		}

	})();

	// tag list toggle option
	(function() {
		var allBtn = $('.js-tag-toggle');

		if (allBtn.length > 0) {
			allBtn.on('click', function() {
				$(this).toggleClass('on');
				$('.sort-tag-all').toggleClass('on');
			});

		}
	})();

	/*
	 * MAP
	 */

	// height & map init
	(function(){

		var winWidth = $(window).outerWidth();
		var winHeight = $(window).outerHeight();
		var docHeight = $('body').outerHeight();
		var headerHeight = $('.header').outerHeight();
		var lnbHeight = $('.lnb').outerHeight();
		var footerHeight = $('.footer').outerHeight();
		var $contents = $('.contents');
		var contHeight = winHeight - headerHeight - lnbHeight - footerHeight;

		if( winHeight >= docHeight ) {
			$contents.css({height: contHeight});
		}

		if( $('html').hasClass('map') ) {
			$('.section-map').css({
				width: winWidth - MAP_LIST_WIDTH,
				height: contHeight
			});
			$('.section-list').css({
				height:contHeight
			});
			$('.section-list-detail-popup').css({
				height:contHeight
			});
			$('.sort-detail-scroll').css({
				height:contHeight-126
			});
			$('.sale').css({
				height:contHeight-119
			});
		}

		// 다음 지도 API 관련 변수 선언
		var container = document.getElementById('map');

		if( container != null ) {
			var options = {
				center: new daum.maps.LatLng(37.5215971, 127.05771319999997),
				level: 3
			};
			var map = new daum.maps.Map(container, options);
		}

		$(window).on('load resize', function(){

			var winWidth = $(window).width();
			var winHeight = $(window).outerHeight();
			var docHeight = $('body').outerHeight();
			var headerHeight = $('.header').outerHeight();
			var lnbHeight = $('.lnb').outerHeight();
			var footerHeight = $('.footer').outerHeight();
			var $contents = $('.contents');
			var contHeight = winHeight - headerHeight - lnbHeight - footerHeight;

			if( winHeight >= docHeight ) {
				$contents.css({height: contHeight});
			}

			if( $('html').hasClass('map') ) {
				$('.section-map').css({
					width: winWidth - MAP_LIST_WIDTH,
					height: contHeight
				});
				$('.section-list').css({
					height:contHeight
				});
				$('.section-list-detail-popup').css({
					height:contHeight
				});
				$('.sort-detail-scroll').css({
					height:contHeight-126
				});
				$('.sale').css({
					height:contHeight-119
				});
			}
		});

	})();

	// draggable search
	(function(){

		var searchArea = $('.search-area');

		if (searchArea.length > 0) {
			$('.search-area').draggable({
				handle: '.search-drag-handle',
				containment: '.section-map',
				scroll: false
			});
		}

	})();

	// draggable search - tab action
	(function(){

		$('.search-tab').on('click', function(){

			var index = $('.search-tab-area .search-tab').index( $(this) );

			$('.search-tab').removeClass('on');
			$('.search-area .search-form-area').removeClass('on');

			$(this).addClass('on');
			$('.search-area .search-form-area').eq(index).addClass('on');



		});

	})();

	// delete tag
	(function() {
		var tagDelBtn = $('.sort-option-btn-del');

		if (tagDelBtn.length > 0) {
			tagDelBtn.on('click', function() {
				$(this).parents('.sort-option-tag-item').remove();
			});

		}
	})();

	// select view type
	(function(){

		$('.btn-view').on('click', function(){

			$('.btn-view').removeClass('on');
			$(this).addClass('on');

		});

	})();

	// show tooltip
	(function() {
		var tooltipBtn = $('.js-show-tooltip');

		if (tooltipBtn.length > 0) {
			tooltipBtn.on({
				'mouseenter': function() {
					$(this).addClass('on');
					$(this).next('.tooltip').addClass('on');
				},
				'mouseleave': function() {
					$(this).removeClass('on');
					$(this).next('.tooltip').removeClass('on');
				}
			});

			$('.tooltip').on({
				'mouseenter': function() {
					tooltipBtn.addClass('on');
					$(this).addClass('on');
				},
				'mouseleave': function() {
					tooltipBtn.removeClass('on');
					$(this).removeClass('on');
				}
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

	// view & hide detail popup
	(function(){

		$('.js-view-detail-popup').on('click', function(){
			$('.section-list-detail-popup').stop().animate({
				width:600
			});
		});

		$('.section-list-detail-popup').on('click', function(){
			$('.section-list-detail-popup').stop().animate({
				width:0
			});
		});

	})();

	// view search education
	(function(){

		$('.js-edu-view').data('view', 'false').on('click', function(){

			if( $(this).data('view') == 'false' ) {
				$(this).addClass('view-on');
				$('.search-edu-popup').addClass('on');
				$(this).data('view', 'true');
			} else {
				$(this).removeClass('view-on');
				$('.search-edu-popup').removeClass('on');
				$(this).data('view', 'false');
			}

		});

	})();

	/*
	 * detail
	 */

	// detail page slide
	(function (){
		var detailGallery = $('.js-detail-gallery');

		if (detailGallery.length > 0) {
			detailGallery.PikaChoose({
				carousel:true,
				showCaption:false,
				autoPlay:false,
				text: {
						previous: '이전',
						next: '다음'
					},
				thumbOpacity:1
			});
		}
	})();

	// scroll action
	(function() {
		var detailSide = $('.detail-sidebar'),
			tTop = 0,
			btnTgHelp = $('.js-toggle-detail-help'),
			helpForm = $('.detail-user-help-wrap'),
			fixedMenu = $('.detail-user-help-fixed-menu');

		if (detailSide.length > 0) {
			tTop = $('.detail-user-body').offset().top - 50;

			$(window).on('scroll', function() {
				if ($(this).scrollTop() > tTop) {
					$('.detail-header-fixed').fadeIn('fast');
					$('.detail-sidebar').addClass('fixed');
				} else {
					$('.detail-header-fixed').fadeOut('fast');
					$('.detail-sidebar').removeClass('fixed');
				}
			});

			btnTgHelp.on('click', function(e) {
				e.preventDefault();

				helpForm.slideDown('fast');
				fixedMenu.addClass('open');

			});

			fixedMenu.find('.cancel').on('click', function(e) {
				e.preventDefault();

				helpForm.slideUp('fast');
				fixedMenu.removeClass('open');

			});
		}

	})();

	/* anchor scroll  */
	(function() {
		function initScrollTab(tabs, gap) {
			gap = gap || 0;

			tabs.on('click', function(e){
				var ty = $( $(this).attr('href') ).offset().top - gap;
				$('html').stop().animate({scrollTop : ty}, 700, 'easeOutCubic'); // for IE
				$('body').stop().animate({scrollTop : ty}, 700, 'easeOutCubic');
				e.preventDefault();
			});
		}

		initScrollTab($('.detail-side-link .js-tab-link'), 50);
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