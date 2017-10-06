/**
 *  Quick Cart
 *
 *  This is a jQuery plugin that can help you customize your tutorial trip
 *
 *  Version: 1
 *
 *  Author: Benny Luk <bennyluk93@gmail.com>
 *  Site: http://bennyluk.github.io

	lazy load image
	poisition
	on start and on end for each slides
	fix height

 */
(function(window) {
	'use strict';

	var _defaults = {
		onInit: null,
		onRender: null,
		onStart: null,
		onEnd: null,
		onNext: null,
		onPrevious: null,
		onSlideChange: null,
		showHeader: true,
		showClose: true,
		class: "",
		container: document.body,
		navBullet: true,
		startIndex: 0,
		width: 350,
		height: 500,
		overlay: true,
		navBtn: true,
		navArrow: false,
		nextOnClick: false,
		nextLabel: "Next",
		prevLabel: "Back",
		finishLabel: "Close",
		enableKeyBinding: true,
		canGoPrev: null,
		canGoNext: null
	};

	function _trigger(event, whatsNew, args) {
		if(typeof whatsNew.options[event] == "function") {
			whatsNew.options[event].call(whatsNew, _extend({
				event: event,
				whatsNew: whatsNew,
				slides: whatsNew.slides,
				currentIndex: whatsNew.currentIndex,
				el: whatsNew.el,
				overlay: whatsNew.overlay
			}, args));
		}
	}

	// Utility method to extend defaults with user options
  function _extend(source, properties) {
    var property;
    for (property in properties) {
      if (properties.hasOwnProperty(property)) {
        source[property] = properties[property];
      }
    }
    return source;
  }

	function _render(whatsNew) {
		var slidesHTML = "";

		for(var i = 0; i < whatsNew.slides.length; i++) {
			var slide = whatsNew.slides[i];

			var header = (whatsNew.options.showHeader && slide.title) ? "<div class='whatsnew-slide-title'>" + slide.title + "</div>" : "";

			var content = "";
			if(slide.custom) {
				content = slide.custom;
			} else {
				if(slide.img)
					content += "<img class='whatsnew-img' src='" + slide.img +"'>";
				if(slide.content)
					content += "<div class='whatsnew-content'>" + slide.content + "</div>";
			}

			slidesHTML = slidesHTML.concat("<div class='whatsnew-slide' style='width: " + whatsNew.options.width + "px'>" + header + "<div class='whatsnew-slide-content'>" + content + "</div></div>");
		}

		var closeBtn = (whatsNew.options.showClose) ? "<a href='#' class='whatsnew-close'>x</a>": "";

		var navBullet = "";
		if(whatsNew.options.navBullet) {
			navBullet = "<ul class='whatsnew-nav'>";
			for(var i = 0; i < whatsNew.slides.length; i++) {
				navBullet += "<li class='whatsnew-nav-item'></li>";
			}
			navBullet += "</ul>";
		}

		var navBtn = "";
		if(whatsNew.options.navBtn) {
			navBtn = "<div class='whatsnew-btns'></div>";
		}

		var navArrow = "";
		if(whatsNew.options.navArrow) {
			navArrow = "<div class='whatsnew-nav-arrows'><div class='whatsnew-nav-arrow whatsnew-nav-arrow-prev'>a</div><div class='whatsnew-nav-arrow whatsnew-nav-arrow-next'>a</div></div>";
		}

		whatsNew.el = document.createElement("div");
		whatsNew.el.className = "whatsnew " + whatsNew.options.class;
		whatsNew.el.innerHTML = closeBtn + "<div class='whatsnew-slides-container' style='width: " + (whatsNew.options.width * whatsNew.slides.length) + "px'>" + slidesHTML + "</div>" + navArrow + "<div class='whatsnew-footer'>" + navBtn + navBullet + "</div>";

		whatsNew.el.style.width = whatsNew.options.width + "px";
		whatsNew.el.style.height = whatsNew.options.height + "px";

		whatsNew.options.container.appendChild(whatsNew.el);

		// for(var j = 0; i < )

		if(whatsNew.options.overlay) {
			whatsNew.overlay = document.createElement("div");
			whatsNew.overlay.className = "whatsnew-overlay";
			whatsNew.options.container.appendChild(whatsNew.overlay);
		}

		_trigger("onRender", whatsNew);
	}

	function _updateNavigation(whatsNew) {
		if(whatsNew.options.navBullet) {
			var nav = whatsNew.el.getElementsByClassName("whatsnew-nav-item");
			for(var i = 0; i < nav.length; i++) {
				if(i === whatsNew.currentIndex) {
					addClass(nav[i], "whatsnew-nav-item-active");
				} else {
					removeClass(nav[i], "whatsnew-nav-item-active");
				}
			}
		}

		_renderBtns(whatsNew);
	}

	function _renderBtns(whatsNew) {
		if(whatsNew.options.navBtn) {
			var html = "";

			if(whatsNew.currentIndex === 0) {
				html = "<a href='#' class='whatsnew-btn whatsnew-next whatsnew-full-width-btn'>" + whatsNew.options.nextLabel + "</a>";
			} else if(whatsNew.currentIndex === whatsNew.slides.length - 1) {
				html = "<a href='#' class='whatsnew-btn whatsnew-prev'>" + whatsNew.options.prevLabel + "</a><a href='#' class='whatsnew-btn whatsnew-next'>" + whatsNew.options.finishLabel + "</a>";
			} else {
				html = "<a href='#' class='whatsnew-btn whatsnew-prev'>" + whatsNew.options.prevLabel + "</a><a href='#' class='whatsnew-btn whatsnew-next'>" + whatsNew.options.nextLabel + "</a>";
			}

			whatsNew.el.getElementsByClassName("whatsnew-btns")[0].innerHTML = html;
		}
	}

	function _attachHandlers(whatsNew) {
		// attach handlers to navigation items
		if(whatsNew.options.navBullet) {
			var nav = whatsNew.el.getElementsByClassName("whatsnew-nav-item");
			for(var i = 0; i < nav.length; i++) {
				nav[i].addEventListener("click", function() {
					var children = this.parentNode.childNodes;
					for(var i = 0; i < children.length; i++) {
						if(children[i] === this) {
							whatsNew.goTo(i);
						}
					}
				});
			}
		}

		if(whatsNew.options.showClose) {
			whatsNew.el.getElementsByClassName("whatsnew-close")[0].addEventListener("click", function() {
				whatsNew.close();
			});
		}

		if(whatsNew.options.nextOnClick) {
			whatsNew.el.getElementsByClassName("whatsnew-slides-container")[0].addEventListener("click", function() {
				whatsNew.next();
			});
		}

		if(whatsNew.options.navBtn) {
			whatsNew.el.getElementsByClassName("whatsnew-btns")[0].addEventListener("click", function(e) {
				if(hasClass(e.target, "whatsnew-next")) {
					whatsNew.next();
				} else if(hasClass(e.target, "whatsnew-prev")) {
					whatsNew.prev();
				}
			});
		}

		if(whatsNew.options.enableKeyBinding) {
			whatsNew._keydown = function(event) {
				var keyCode = event.keyCode;

				if(keyCode) {
					if(keyCode === 37) { // left
						whatsNew.prev();
					} else if(keyCode === 39) { // right
						whatsNew.next();
					} else if(keyCode === 27) {
						whatsNew.close();
					}
				}
			};
			
			document.addEventListener('keydown', whatsNew._keydown);
		}

		window.addEventListener('resize', whatsNew.adjustPosition);
	}

	function _deattachHandlers(whatsNew) {
		if(whatsNew.options.enableKeyBinding) {
			document.removeEventListener('keydown', whatsNew._keydown);
		}

		window.removeEventListener('resize', whatsNew.adjustPosition);
	}

	window.WhatsNew = function() {
		this.slides = [];

		this.currentIndex = 0;

		this.el = null;
		this.overlay = null;

		this.options = _defaults;

		if (arguments[0] && typeof arguments[0] === "object")
      this.slides = arguments[0];
		else
			throw "Slides Not Found";

		if (arguments[1] && typeof arguments[1] === "object")
      this.options = _extend(_defaults, arguments[1]);

		_trigger("onInit", this);
	};

	WhatsNew.prototype.start = function() {
		_render(this);
		_attachHandlers(this);

		this.goTo(this.options.startIndex);

		addClass(this.el, "show");
		this.adjustPosition();

		_trigger("onStart", this);

		return this;
	};

	WhatsNew.prototype.adjustPosition = function() {
		var containerDimen = this.options.container.getBoundingClientRect();

		var left = (containerDimen.width / 2) - (this.options.width / 2);
		var top = (containerDimen.height / 2) - (this.options.height / 2);

		this.el.style.left = left + "px";
		this.el.style.top = top + "px";

		return this;
	};

	WhatsNew.prototype.goTo = function(index) {
		var slide = this.el.getElementsByClassName("whatsnew-slide");

		if(slide[index]) {
			this.currentIndex = index;

			slide = slide[index];

			var slides = this.el.getElementsByClassName("whatsnew-slide");
			for(var i = 0; i < slides.length; i++) {
				if(i === this.currentIndex) {
					addClass(slides[i], "whatsnew-slide-active");
				} else {
					removeClass(slides[i], "whatsnew-slide-active");
				}
			}

			_updateNavigation(this);

			var slideContainer = this.el.getElementsByClassName("whatsnew-slides-container")[0];
			slideContainer.style.transform = "translate3d(-" + (this.options.width * index)  + "px, 0, 0)";

			_trigger("onSlideChange", this);
		}
	};

	WhatsNew.prototype.next = function() {
		if(this.currentIndex + 1 >= this.slides.length) {
			this.close();
		} else {
			this.goTo(this.currentIndex + 1);
			_trigger("onNext", this);
		}
	};

	WhatsNew.prototype.prev = function() {
		this.goTo(this.currentIndex - 1);
		_trigger("onPrevious", this);
	};

	WhatsNew.prototype.close = function() {
		_deattachHandlers(this);
		this.options.container.removeChild(this.el);
		this.options.container.removeChild(this.overlay);

		_trigger("onEnd", this);
	};

	/*!
	 * classie v1.0.1
	 * class helper functions
	 * from bonzo https://github.com/ded/bonzo
	 * MIT license
	 *
	 * classie.has( elem, 'my-class' ) -> true/false
	 * classie.add( elem, 'my-new-class' )
	 * classie.remove( elem, 'my-unwanted-class' )
	 * classie.toggle( elem, 'my-class' )
	 */
	function classReg( className ) {
		return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
	}

	var hasClass, addClass, removeClass;

	if ( 'classList' in document.documentElement ) {
		hasClass = function( elem, c ) {
			return elem.classList.contains( c );
		};
		addClass = function( elem, c ) {
			elem.classList.add( c );
		};
		removeClass = function( elem, c ) {
			elem.classList.remove( c );
		};
	}
	else {
		hasClass = function( elem, c ) {
			return classReg( c ).test( elem.className );
		};
		addClass = function( elem, c ) {
			if ( !hasClass( elem, c ) ) {
				elem.className = elem.className + ' ' + c;
			}
		};
		removeClass = function( elem, c ) {
			elem.className = elem.className.replace( classReg( c ), ' ' );
		};
	}

	function toggleClass( elem, c ) {
		var fn = hasClass( elem, c ) ? removeClass : addClass;
		fn( elem, c );
	}

	var classie = {
		// full names
		hasClass: hasClass,
		addClass: addClass,
		removeClass: removeClass,
		toggleClass: toggleClass,
		// short names
		has: hasClass,
		add: addClass,
		remove: removeClass,
		toggle: toggleClass
	};
	return this;
})(window);
