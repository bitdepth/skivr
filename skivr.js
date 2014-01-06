/* jshint undef: true, unused: true */
/* global mediaCheck, jQuery */

var mediaCheck=function(a){var b,c,d,e,f,g=void 0!==window.matchMedia;if(g)c=function(a,b){a.matches?"function"==typeof b.entry&&b.entry():"function"==typeof b.exit&&b.exit(),"function"==typeof b.both&&b.both()},d=function(){b=window.matchMedia(a.media),b.addListener(function(){c(b,a)}),window.addEventListener("orientationchange",function(){b=window.matchMedia(a.media),c(b,a)},!1),c(b,a)},d();else{var h,j={};c=function(a,b){a.matches?"function"!=typeof b.entry||j[b.media]!==!1&&null!=j[b.media]||b.entry():"function"!=typeof b.exit||j[b.media]!==!0&&null!=j[b.media]||b.exit(),"function"==typeof b.both&&b.both(),j[b.media]=a.matches},e=function(a){var b;return b=document.createElement("div"),b.style.width="1em",document.body.appendChild(b),a*b.offsetWidth},f=function(a,b){var c;switch(b){case"em":c=e(a);break;default:c=a}return c};for(i in a)j[a.media]=null;var k=function(){var b=a.media.match(/\((.*)-.*:\s*([\d\.]*)(.*)\)/),d=b[1],e=f(parseInt(b[2],10),b[3]),g={},i=document.documentElement.clientWidth;h!=i&&(g.matches="max"===d&&e>i||"min"===d&&i>e,c(g,a),h=i)};window.addEventListener?window.addEventListener("resize",k):window.attachEvent&&window.attachEvent("onresize",k),k()}};

skivr = (function ($, window, document, undefined) {
	'use strict';

	function Skivr(options) {
		this.$el = options.el;
		this.url = options.url;
		this.mq = options.mq;

		this.init();
	}

	Skivr.prototype.init = function () {
		var _this = this;

		// If no media query is specified or mediaCheck is undefined, just load shit.
		if (typeof this.mq === 'undefined' || mediaCheck === undefined) {
			this.load();
			return;
		}

		mediaCheck({
			media: this.mq,
			entry: function () {
				_this.load();
			}
		});
	};


	Skivr.prototype.load = function () {
		var _this = this,
			attr = this.$el.attr('data-skivr-url');

		if (typeof attr !== 'undefined' && attr !== false) {
			this.$el.load(this.url, function (response, status, xhr) {
				if (status === 'error') {
					_this.$el.html('<div class="alert alert-danger mam">' + xhr.status + ' ' + xhr.statusText + '</p>');
				}
				if (status === 'success') {
					$('body').trigger('dynamic.content.loaded', response);
				}
			});
		}

		this.$el.removeAttr('data-skivr-url data-skivr-mq');
	};

    var _static = {
        name: 'Skivr',

        init: function () {
			$('[data-skivr-url]').each(function () {
				var $this = $(this);
				new Skivr({
					el: $this,
					url: $this.attr('data-skivr-url'),
					mq: $this.attr('data-skivr-mq')
				});
			});
        }
    };

    return _static;


})(jQuery, window, document, undefined);