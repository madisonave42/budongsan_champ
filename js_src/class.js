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

/* option toggle */
var toggleOption = function (el) {
	el.each(function () {
		var self = $(this),
			options = self.find('.js-toggle-item'),
			btn = self.find('.js-toggle-btn');

		btn.on('click', function(e) {
			e.preventDefault();

			if (btn.hasClass('on')) {
				btn.removeClass('on');
				btn.text('더보기');
				options.hide();
			} else {
				btn.addClass('on');
				btn.text('숨기기');
				options.show();
			}

		});

	});
};