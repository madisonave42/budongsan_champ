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

var banner = (function(){

	var currentIndex = 0;
	var bannerSize;
	var done = true;
	var tId;

	function _setNext(){
		if(currentIndex + 1 >= bannerSize) moveDown(0);
		else moveDown(currentIndex+1);
	}

	function _setAuto() {
		clearInterval(tId);
		tId = setInterval(function () {
			_setNext();
		}, 5000);
	}

	function moveDown(index){
		done = false;

		$('.sort-result-item').eq(currentIndex).stop().animate({top:40}, 1200, 'easeOutQuint');
		$('.sort-result-item').eq(index).css({top:-40});
		$('.sort-result-item').eq(index).stop().animate({top:0}, 1200, 'easeOutQuint');

		currentIndex = index;

		setTimeout(function(){
			done = true;
			_setAuto();
		}, 1200);
	}

	function moveUp(index){
		done = false;

		$('.sort-result-item').eq(currentIndex).stop().animate({top:-40}, 1200, 'easeOutQuint');
		$('.sort-result-item').eq(index).css({top:40});
		$('.sort-result-item').eq(index).stop().animate({top:0}, 1200, 'easeOutQuint');

		currentIndex = index;

		setTimeout(function(){
			done = true;
			_setAuto();
		}, 1200);
	}

	return{

		init : function(){
			bannerSize = $('.sort-result-item').size();
			if( bannerSize < 2 ) return;
			$('.sort-result-item').css({top:-40});
			$('.sort-result-item').eq(0).css({top:0});

			tId = setInterval(function(){_setNext();}, 5000);

		},

		setNext : function(){
			if(!done) return;
			clearInterval(tId);
			if(currentIndex + 1 >= bannerSize) moveDown(0);
			else moveDown(currentIndex+1);
		},

		setPrev : function(){
			if(!done) return;
			clearInterval(tId);
			if(currentIndex <= 0) moveUp(bannerSize-1);
			else moveUp(currentIndex-1);
		}

	};

})();