/**
 *  WhatsNew.js
 *
 *  This is a jQuery plugin that can help you customize your tutorial trip
 *
 *  Version: 1
 *
 *  Author: Benny Luk <bennyluk93@gmail.com>
 *  Site: http://bennyluk.github.io
 */
function WhatsNew() {
	var data,
		settings;
		
	if(arguments.length == 1) {
		data = arguments[0];
	} else if(arguments.length == 2) {
		data = arguments[0];
		settings = arguments[1];
	} else {
		throw "WhatsNew: No Arguments";
	}
	
	// TODO: Create a simple parser for the container
	this.data = data;
	this.settings = $.extend({
		css: {},
		$container: $("body"),
		nextLabel: "Next",
		prevLabel: "Back",
		finishLabel: "Close",
		class: "",
		showHeader: true,
		showClose: true,
		enableOverlay: true,
		enableKeyBinding: true,
		onStart: null,
		onEnd: null,
		startIndex: 0,
		showNav: true,
		onSlideNext: null,
		onSlidePrev: null,
		onSlideChange: null,
		animationDuration: 400
	}, settings);
}

WhatsNew.prototype = {
	_navigate: function(key, index) {
		var $slide;
	
		var $current = this.$el.find(".whatsnew-slide.active");
		
		if(key == "go") {
			$slide = this.$el.find(".whatsnew-slide:nth-child(" + (index + 1) + ")");
		} else if(key == "prev") {
			$slide = $current.prev(".whatsnew-slide");
		} else {
			$slide = $current.next(".whatsnew-slide");
		}
	
		if($slide.length) {
			var slideIndex = index || $slide.index();
			var slideData = this.data[slideIndex];
			
			$current.removeClass("active").stop().fadeOut(this.settings.animationDuration);
			$slide.addClass("active").stop().fadeIn(this.settings.animationDuration);
			
			if(slideData.onRender) slideData.onRender(this, $slide);
			
			var $nav = this.$el.find(".whatsnew-nav-item").removeClass("active");
			$($nav.get(slideIndex)).addClass("active");
			
			this._renderBtns();
			
			// _trigger
			
			if(key === "next") this._trigger("onSlideNext", $slide);
			if(key === "prev") this._trigger("onSlidePrev", $slide);
			
			this._trigger("onSlideChange", $slide);
		} else if(key === "next") {
			this.stop();
		}
	},
	
	_renderOverlay: function() {
		if(this.settings.enableOverlay) {
			this.$overlay = $("<div class='whatsnew-overlay'></div>").appendTo(this.settings.$container);
		}
	},
	
	_render: function() {
		var slidesHTML = "";
		for(var i = 0; i < this.data.length; i++) {
			var slide = this.data[i];
			
			var headerHTML = (this.settings.showHeader) ? "<div class='whatsnew-slide-title'>" + slide.title + "</div>" : "";
			var contentHTML = (slide.custom) ? slide.custom : "<img class='whatsnew-img' src='" + slide.img +"'><div class='whatsnew-content'>" + slide.content + "</div>";
			
			slidesHTML = slidesHTML.concat("<div class='whatsnew-slide'>" + headerHTML + "<div class='whatsnew-slide-content'>" + contentHTML + "</div></div>");
		}
		
		var closeHTML = (this.settings.showClose) ? "<a href='#' class='whatsnew-close'>×</a>": "";
		
		var navHTML = "";
		if(this.settings.showNav) {
			navHTML = "<ul class='whatsnew-nav'>";
			for(var i = 0; i < this.data.length; i++) {
				navHTML = navHTML.concat("<li class='whatsnew-nav-item'></li>");
			}
			navHTML.concat("</ul>");
		}
		
		var html = "<div class='whatsnew'>" + closeHTML + "<div class='whatsnew-slides-container'>" + slidesHTML + "</div><div class='whatsnew-footer'><div class='whatsnew-btns'></div>" + navHTML + "</div></div>";
		
		this.$el = $(html).appendTo(this.settings.$container).addClass(this.settings.class);
	},
	
	_renderBtns: function() {
		var $active = this.$el.find(".whatsnew-slide.active");
		var index = $active.index();
		
		var html = "";
		if(index === 0) {
			html = "<a href='#' class='whatsnew-btn whatsnew-next whatsnew-full-width-btn'>" + this.settings.nextLabel + "</a>";
		} else if(index === this.data.length - 1) {
			html = "<a href='#' class='whatsnew-btn whatsnew-prev'>" + this.settings.prevLabel + "</a><a href='#' class='whatsnew-btn whatsnew-next'>" + this.settings.finishLabel + "</a>";
		} else {
			html = "<a href='#' class='whatsnew-btn whatsnew-prev'>" + this.settings.prevLabel + "</a><a href='#' class='whatsnew-btn whatsnew-next'>" + this.settings.nextLabel + "</a>";
		}
		
		this.$el.find(".whatsnew-btns").html(html);
	},
	
	_attachHandlers: function() {
		// attach handlers
		var self = this;
		
		this.$el.find(".whatsnew-close").click(function(e) {
			e.preventDefault();
			self.stop();
		});
		
		this.$el.find(".whatsnew-footer")
			.on("click", ".whatsnew-next", function(e) {
				e.preventDefault();
				self.next();
			})
			.on("click", ".whatsnew-prev", function(e) {
				e.preventDefault();
				self.prev();
			});
		
		if(this.settings.showNav) {
			this.$el.find(".whatsnew-nav-item").click(function() {
				var index = $(this).index();
				self.goTo(index);
			});
		}
		
		var $window = $(window).on("resize.whatsnew", function() {
			self.adjustPosition($window);
		});
		
		if(this.settings.enableKeyBinding) {
			$window.on("keydown.whatsnew", function(e) {
				var which = e.which;
				
				switch(which) {
					case 39:
						self.next();
						break;
					case 37:
						self.prev();
						break;
					case 27:
						self.stop();
				}
			});
		}
	},
	
	_trigger: function(event, argument) {
		if(typeof this.settings[event] == "function") this.settings[event](this, argument);
	},
	
	stop: function() {
		var self = this;
		this.settings.$container.find(".whatsnew, .whatsnew-overlay").fadeOut(function() {
			$(this).remove();
			$(window).off("keydown.whatsnew resize.whatsnew");
			self._trigger("onEnd");
		});
		return this;
	},
	
	next: function() {
		this._navigate("next");
		return this;
	},
	
	prev: function() {
		this._navigate("prev");
		return this;
	},
	
	goTo: function(index) {
		this._navigate("go", index);
		return this;
	},
	
	adjustPosition: function($window) {
		var $container = $window || $(window);
		var left = ($container.width() / 2) - (this.$el.outerWidth() / 2);
		var top = ($container.height() / 2) - (this.$el.outerHeight() / 2);
		
		this.$el.css({
			left: left,
			top: top
		});
		
		return this;
	},
	
	start: function() {
		this._renderOverlay();
		this._render();
		this.$el.css(this.settings.css);
		
		this.goTo(this.settings.startIndex);
		
		// adjust position
		this.adjustPosition();
		
		this._attachHandlers();
		
		this.$el.show();
		this.$overlay.show();
		
		this._trigger("onStart");
		
		return this;
	}
};

$(function() {
	var whatsnew = new WhatsNew([
		{
			title: "New Features This Month",
			img: 'http://www.presidiohistorynow.com/wp/wp-content/uploads/2015/01/Featured-This-Month.jpg',
			content: "Come Look at my stuff.",
			onRender: function() {
				console.log("rendered");
			}
		},
		{
			title: "Trewrewr",
			img: 'http://www.presidiohistorynow.com/wp/wp-content/uploads/2015/01/Featured-This-Month.jpg',
			content: "Woah this is so amazin. COllfdfd"
		},
		{
			title: "4354354",
			img: 'http://www.presidiohistorynow.com/wp/wp-content/uploads/2015/01/Featured-This-Month.jpg',
			content: "tikwerhjerhgheyneiotyn5ito5iy45mym btyhrtyrt",
			custom: "<span>Hello my name is benny</span>"
		},
		{
			title: "knifdfd",
			img: 'http://www.presidiohistorynow.com/wp/wp-content/uploads/2015/01/Featured-This-Month.jpg',
			content: "reyt47y457uj574hgf3534"
		}
	]);
	whatsnew.start();
});