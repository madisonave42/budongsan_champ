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
				btns = sortMenu.find('.sort-menu-btn'),
				sub = sortMenu.find('.sort-menu-sub');

			btns.on('click', function() {
				var par = $(this).parents('.sort-menu-item');

				if (par.hasClass('on')) {
					par.removeClass('on');
				} else {
					menus.removeClass('on');
					par.addClass('on');
				}
			});

			sub.on('mouseleave', function() {
				$(this).parents('.sort-menu-item').removeClass('on');
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

				input.on('keydown', function(e) {
					var type = $(this).attr('data-type'),
					 toInput;

					if(type == 'from' && e.which == 13) {
						toInput = $(this).parents('.sort-menu-sub-input').find('.sort-input[data-type=to]');
						toInput.trigger('focus');
					}
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

		if( $('html').hasClass('map') ) {
			$contents.css({height: contHeight});
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
			$('.sale, .sale-simple').css({
				height:contHeight-119
			});
			$('.sale.user-sale-view').css({
				height:contHeight-79
			});

			$('.section-list-detail-popup-content').css({height: contHeight - 74});

		} else if( winHeight >= docHeight ) {
			$contents.css({height: contHeight});
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

		// 다음 지도 API 관련 변수 선언
		var popupContainer = document.getElementById('popup-map');

		if( popupContainer != null ) {
			var options = {
				center: new daum.maps.LatLng(37.5215971, 127.05771319999997),
				level: 3
			};
			var map = new daum.maps.Map(popupContainer, options);
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

			if( $('html').hasClass('map') ) {
				$contents.css({height: contHeight});
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
				$('.sale, .sale-simple').css({
					height:contHeight-119
				});
				$('.sale.user-sale-view').css({
					height:contHeight-79
				});
			} else if( winHeight >= docHeight ) {
				$contents.css({height: contHeight});
			}
		});

	})();

	// search result rolling
	(function(){

		$(window).on('load', function(){
			banner.init();
		});

		$('.js-btn-prev').on('click', function(){
			banner.setNext();
		});

		$('.js-btn-next').on('click', function(){
			banner.setPrev();
		});

	})();

	// draggable search
	(function(){

		var searchArea = $('.search-area');
		var isDrag = false;

		if (searchArea.length > 0) {
			$('.search-area').draggable({
				handle: '.search-drag-handle',
				containment: '.section-map',
				scroll: false,
				start: function(){
					isDrag = true;
				}
			});
		}

		$('.search-drag-handle').data('fold', 'false').on('click', function(){

			if( isDrag == false && $(this).data('fold') == 'false' ) {

				$(this).closest('.search-area').addClass('fold');
				$(this).closest('.search-area').find('.search-tab-area').addClass('hide');
				$(this).closest('.search-area').find('.search-form-area').addClass('hide');

				$(this).data('fold', 'true');

			} else if( isDrag == false && $(this).data('fold') == 'true' ){

				$(this).closest('.search-area').removeClass('fold');
				$(this).closest('.search-area').find('.search-tab-area').removeClass('hide');
				$(this).closest('.search-area').find('.search-form-area').removeClass('hide');

				$(this).data('fold', 'false');

			}

			isDrag = false;

		});

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

			var classArr = $(this).attr('class').split(' ');

			$('.section-list .sale').removeClass('on');

			$('.' + classArr[1]).addClass('on');

		});

	})();

	// show tooltip
	(function() {
		var tooltipBtn = $('.js-show-tooltip');

		if (tooltipBtn.length > 0) {
			tooltipBtn.each(function() {
				var btn = $(this),
					tooltip = $(this).next('.tooltip');

				btn.on({
					'mouseenter': function() {
						$(this).addClass('on');
						tooltip.addClass('on');
					},
					'mouseleave': function() {
						$(this).removeClass('on');
						tooltip.removeClass('on');
					}
				});

				tooltip.on({
					'mouseenter': function() {
						btn.addClass('on');
						$(this).addClass('on');
					},
					'mouseleave': function() {
						btn.removeClass('on');
						$(this).removeClass('on');
					}
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

	// view & hide detail popup by list
	(function(){

		$('.js-view-detail-popup').on('click', function(){
			$('.section-list-detail-popup').stop().animate({
				width:828
			}, 500, function(){
				$('.section-list-detail-popup .popup-top-action-group').addClass('on');
				$('.section-list-detail-popup .popup-top-menu').addClass('on');
			});
		});

		$('.section-list-detail-popup .popup-top-menu-btn.close').on('click', function(){

			$('.section-list-detail-popup .popup-top-action-group').removeClass('on');
			$('.section-list-detail-popup .popup-top-menu').removeClass('on');

			$('.btn-map-area').removeClass('expand');

			$('.section-list-detail-popup').stop().animate({
				width:0
			}, 500);

			$('.section-list-content').stop().animate({
				width:600
			}, 500);

		});

	})();

	// view & hide detail popup by marker
	$('.js-marker').on('click', function(){

		$('.btn-map-area').addClass('expand');

		$('.section-list-detail-popup').stop().animate({
			width:828
		}, 500, function(){
			$('.section-list-detail-popup .popup-top-action-group').addClass('on');
			$('.section-list-detail-popup .popup-top-menu').addClass('on');
		});

		$('.section-list-content').stop().animate({
			width:0
		}, 500);

	});

	// view & hide ask pop in detail popup
	(function(){

		$('.js-ask').data('open', 'false').on('click', function(){
			if( $(this).data('open') == 'false' ) {
				$('.popup-top-ask').addClass('on');
				$(this).data('open', 'true');
			} else {
				$('.popup-top-ask').removeClass('on');
				$(this).data('open', 'false');
			}
		});

	})();

	// view & hide popup list item
	$('.js-subtitle').data('open', 'false').on('click', function(){

		if( $(this).data('open') == 'false' ) {
			$(this).addClass('on');
			$(this).closest('.part-top').next('.part-mid').removeClass('fold-content');
			$(this).data('open', 'true');
		} else {
			$(this).removeClass('on');
			$(this).closest('.part-top').next('.part-mid').addClass('fold-content');
			$(this).data('open', 'false');
		}

	});

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

	// delete list
	(function(){

		$('.js-del-list').on('click', function(){
			$(this).closest('.sale-list').stop().animate({left:'100%'}, 1000, 'easeOutQuint' ,function(){
				$(this).remove();
				if( $(this).attr('id') != undefined ) {
					$('#simple-' + $(this).attr('id')).remove();
				}
			});
		});

	})();

	// select subway line
	(function() {
		var subway = $('.js-select-subway-line'),
			type;

		if (subway.length > 0) {
			type = subway.find('.subway-type li');
			type.on('click', function() {
				var target = $(this).attr('data-type');

				subway.attr('class', 'pick-subway js-select-subway-line');
				subway.addClass(target);
				$('.pick-subway-line-' + target).find('.pick-subway-line-btn').eq(0).trigger('click');

			});
		}
	})();

	// toggle loc, subway
	(function() {
		var loc = $('.pick-loc'),
			subway = $('.pick-subway');

		if (loc.length > 0) {
			$('.js-toggle-pick-loc').on('click', function(e) {
				e.preventDefault();

				subway.hide();
				subway.data('open', false);
				$('.js-toggle-pick-subway').removeClass('on');

				if (loc.data('open') == true) {
					loc.fadeOut('fast');
					loc.data('open', false);
					$(this).removeClass('on');
				} else {
					loc.fadeIn('fast');
					loc.data('open', true);
					$(this).addClass('on');
				}
			});

			$('.js-toggle-pick-subway').on('click', function(e) {
				e.preventDefault();

				loc.hide();
				loc.data('open', false);
				$('.js-toggle-pick-loc').removeClass('on');

				if (subway.data('open') == true) {
					subway.fadeOut('fast');
					subway.data('open', false);
					$(this).removeClass('on');
				} else {
					subway.fadeIn('fast');
					subway.data('open', true);
					$(this).addClass('on');
				}
			});

			$('.js-close-loc').on('click', function(e) {
				e.preventDefault();

				$('.js-toggle-pick-loc').trigger('click');
			});

			$('.js-close-subway').on('click', function(e) {
				e.preventDefault();

				$('.js-toggle-pick-subway').trigger('click');
			});
		}
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
	 * interior
	 */
	 // company detail slide
	(function() {
		var examSlide = $('.js-interior-exam');

		if (examSlide.length > 0) {
			examSlide.each(function() {
		    $(this).jcarousel({
	        itemFallbackDimension: 300
		    });
			});
		}
	})();

	// company info slide
	(function (){
		var listGallery = $('.js-list-gallery');

		if (listGallery.length > 0) {
			listGallery.PikaChoose({
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

	/*
	 * CS Center
	 */

	(function(){

		$('.faq-list-title').data('open', 'false').on('click', function(){

			if( $(this).data('open') == 'false' ) {
				$(this).next('.faq-list-content').addClass('open');
				$(this).data('open', 'true');
			} else {
				$(this).next('.faq-list-content').removeClass('open');
				$(this).data('open', 'false');
			}


		});

	})();




});





























































































































































































































































































































































































































































































$(function() {
	/* chage list */
	(function() {
		var btnWish = $('.js-view-list-wish'),
			btnRecent = $('.js-view-list-recent'),
			btnDefault,
			sectionLists;

		if (btnWish.length > 0 && btnRecent.length > 0) {
			btnDefault = $('.js-view-list-default');
			sectionLists = $('.section-list-content');

			btnWish.on('click', function(e) {
				e.preventDefault();
				btnWish.addClass('on');
				btnRecent.removeClass('on');
				sectionLists.removeClass('on');
				sectionLists.filter('.section-wish-list').addClass('on');
			});

			btnRecent.on('click', function(e) {
				e.preventDefault();
				btnWish.removeClass('on');
				btnRecent.addClass('on');
				sectionLists.removeClass('on');
				sectionLists.filter('.section-recent-list').addClass('on');
			});

			btnDefault.on('click', function(e) {
				e.preventDefault();
				btnWish.removeClass('on');
				btnRecent.removeClass('on');
				sectionLists.removeClass('on');
				sectionLists.filter('.section-default-list').addClass('on');
			});

		}
	})();


	/* memo in list */
	(function() {
		var memos = $('.js-toggle-memo');

		if (memos.length > 0) {
			memos.each(function(){
				var self = $(this),
					memoRead = self.parents('.sale-list').find('.user-list-memo-read'),
					memoWrite = self.parents('.sale-list').find('.user-list-memo-write'),
					btnMemoEdit = memoRead.find('.edit'),
					hasComment = !!memoRead.find('.user-list-memo-cont').text().length;

				self.on('click', function(e) {
					e.preventDefault();

					if ($(this).hasClass('on')) {
						memoRead.removeClass('on');
						memoWrite.removeClass('on');
						$(this).removeClass('on');
					} else {
						if (hasComment) {
							memoRead.addClass('on');
							self.addClass('on');
						} else {
							memoWrite.addClass('on');
							self.addClass('on');
						}
					}
				});

				btnMemoEdit.on('click', function(e){
					e.preventDefault();

					memoRead.removeClass('on');
					memoWrite.addClass('on');
				});

			});
		}
	})();

});

