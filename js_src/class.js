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