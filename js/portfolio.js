/*
"Fredericka the Great Toolbar" font for logo. put a fuckin border on it with it.
*/
(function() {
	var Portfolio = {
		Views: {},
		Extensions: {},
		Router: null,

		init: function() {
			this.instance = new Portfolio.Views.ContentView();
			Backbone.history.start();
		}
	};

	Portfolio.Router = Backbone.Router.extend({
		routes: {
			"":								"home",
			"about":					"about",
			"projects":				"projects",
			"projects/all":		"projectsAll",
			"skills":					"skills",
			"contact":				"contact",
			"project/:id":		"project",
			"*default":				"notFound"
		},

		home: function() {
			var view = new Portfolio.Views.Home();
			Portfolio.instance.goto(view);
		},

		about: function() {
			var view = new Portfolio.Views.About();
			Portfolio.instance.goto(view);
		},

		projects: function(args) {
			var view = new Portfolio.Views.Projects();
			Portfolio.instance.goto(view, args);
		},

		projectsAll: function() {
			var currentPage = Portfolio.instance.currentPage;

			if(currentPage && currentPage.el.id === "projects") {
				currentPage.render({ all : true });
			} else {
				this.projects({ all: true });
			}
		},

		project: function(id) {
			if(id && _projects[id]) {
				var view = new Portfolio.Views.Project(id);
				Portfolio.instance.goto(view);
			} else {
				this.notFound();
			}
		},

		skills: function() {
			var view = new Portfolio.Views.Skills();
			Portfolio.instance.goto(view);
		},

		contact: function() {
			var view = new Portfolio.Views.Contact();
			Portfolio.instance.goto(view);
		},

		notFound: function() {
			var view = new Portfolio.Views.NotFound();
			Portfolio.instance.goto(view);
		}
	});

	Portfolio.Extensions.PageView = Backbone.View.extend({
		className: "page",

		initialize: function() {
			this.router = new Portfolio.Router();
		},

		render: function(view, options) {
			return this;
		},

		transitionIn: function (callback) {
			this.$el.stop().fadeIn(function() {
				if(_.isFunction(callback)) {
					callback();
				}
			});
		},

		transitionOut: function (callback) {
			this.$el.stop().fadeOut(function() {
				if(_.isFunction(callback)) {
					callback();
				}
			});
		}
	});

	Portfolio.Views.ContentView = Portfolio.Extensions.PageView.extend({
		el: "#content",

		updateMenu: function(currentPage) {
			currentPage = (typeof currentPage !== "undefined") ? currentPage : this.currentPage;

			if(currentPage) {
				var $menu = $("#menu");
				var $selected = $menu.find(".menu-item.selected");

				if(!$selected.length) {
					$selected.find(".menu-item").removeClass("selected");

					var menuID = currentPage.el.id;
					if(menuID === "project") {
						menuID = "projects";
					}

					$menu.find("#menu-" + menuID).addClass("selected");
				}
			}

			return this;
		},

		goto: function(view, args) {
			var previous = this.currentPage || null;
			var next = view;

			if(previous) {
				var self = this;

				$("html, body").stop().animate({ scrollTop: 0 });

				previous.transitionOut(function() {
					previous.remove();

					next.render(args);
					self.$el.append(next.$el);
					next.transitionIn();

					self.currentPage = next;

					self.updateMenu().gaView();
				});
			} else {
				next.render(args);
				this.$el.append(next.$el);
				next.$el.show();

				this.currentPage = next;

				this.updateMenu().gaView();
			}

			return this;
		},

		gaView: function() {
			if(ga) {
				ga('send', 'screenview', {
				  screenName: (this.currentPage.projectID) ? this.currentPage.projectID : this.currentPage.el.id
				});
			}

			return this;
		}
	});

	Portfolio.Views.Home = Portfolio.Extensions.PageView.extend({
		tagName: "section",
		id: "home",
		template: Templates.home,

		render: function() {
			this.el.innerHTML = this.template();
			return Portfolio.Extensions.PageView.prototype.render.apply(this, arguments);
		}
	});

	Portfolio.Views.About = Portfolio.Extensions.PageView.extend({
		tagName: "section",
		id: "about",
		template: Templates.about,

		render: function() {
			this.el.innerHTML = this.template();
			return Portfolio.Extensions.PageView.prototype.render.apply(this, arguments);
		}
	});

	Portfolio.Views.Projects = Portfolio.Extensions.PageView.extend({
		tagName: "section",
		id: "projects",
		template: Templates.projects,

		render: function(args) {
			args = $.extend({
				all: false
			}, args);

			this.el.innerHTML = this.template({
				projectsList: _projectsList,
				projects: _projects,
				args: args
			});

			return Portfolio.Extensions.PageView.prototype.render.apply(this, arguments);
		}
	});

	Portfolio.Views.Project = Portfolio.Extensions.PageView.extend({
		tagName: "section",
		id: "project",
		template: Templates.project,

		events: {
			"click .project-menu li a": "clickMenuItem",
			"click .project-grid-bg" : "showImage",
			"click .project-strip-bg": "showImage"
		},

		initialize: function(projectID) {
			this.projectID = projectID || "";
		},

		render: function() {
			this.model = _projects[this.projectID];

			this.el.innerHTML = this.template(this.model);
			return Portfolio.Extensions.PageView.prototype.render.apply(this, arguments);
		},

		clickMenuItem: function(event) {
			event.preventDefault();
			var id = $(event.currentTarget).attr("href");
			var $anchor = $(id);

			if($anchor.length) {
				$("html, body").animate({ scrollTop: $anchor.offset().top });
			}
		},

		showImage: function(event) {
			var $target = $(event.currentTarget);
			var $projectRow = (!$target.hasClass("project-row")) ? $target.parents(".project-row") : $target;

			var index = $projectRow.index(".project-row");

			var images = [];
			if(this.model.content[index - 1]) {
				var thisContent = this.model.content[index - 1];

				if($target.hasClass("project-grid-bg")) {
					images.push({
						src: thisContent.src,
						opts: {
							caption: (thisContent.title || "") + (thisContent.description ? " - " + thisContent.description : "")
						}
					});
				} else if($target.hasClass("project-strip-bg")) {
					if(thisContent.images) {
						for(var i = 0; i < thisContent.images.length; i++) {
							images.push({
								src: thisContent.images[i].src,
								opts: {
									caption: (thisContent.images[i].title || "") + (thisContent.images[i].description ? " - " + thisContent.images[i].description : "")
								}
							});
						}
					}
				}
			}

			if(images.length) {
				$.fancybox.open(images);
			}
		}
	});

	Portfolio.Views.Skills = Portfolio.Extensions.PageView.extend({
		tagName: "section",
		id: "skills",
		template: Templates.skills,

		events: {
			"click .skill": "clickSkill"
		},

		clickSkill: function(event) {
			var $target = $(event.currentTarget);
			if(!$target.hasClass("selected")) {
				this.$(".skill.selected").removeClass("selected");
				$target.addClass("selected");

				var id = $target.data("id");
				$(".skills-desc.active").removeClass("active");
				$("#skill-" + id).addClass("active");
			}
		},

		render: function() {
			this.el.innerHTML = this.template();
			return Portfolio.Extensions.PageView.prototype.render.apply(this, arguments);
		}
	});

	Portfolio.Views.Contact = Portfolio.Extensions.PageView.extend({
		tagName: "section",
		id: "contact",
		template: Templates.contact,

		events: {
			"submit #contact-form": "submitForm"
		},

		render: function() {
			this.el.innerHTML = this.template();
			return Portfolio.Extensions.PageView.prototype.render.apply(this, arguments);
		},

		submitForm: function(event) {
			event.preventDefault();
			var email = "bennyluk.dev@gmail.com";

			var $target = $(event.currentTarget);
			var $submit = $target.find("input[type='submit']").prop("disabled", true).attr("value", "PINGING ...");

			$.ajax({
		    url: "https://formspree.io/" + email,
		    method: "POST",
		    data: {
					_subject: "Portfolio Contact Form",
					name: $target.find("input[name='name']").val().trim(),
					email: $target.find("input[name='email']").val().trim(),
					message: $target.find("textarea[name='message']").val().trim()
				},
		    dataType: "json",
				success: function() {
					$submit.attr("value", "Message Sent !");
				},
				error: function() {
					$submit.attr("value", "Ping Timed Out. Email at (" + email + ")");
				}
			});
		}
	});

	Portfolio.Views.NotFound = Portfolio.Extensions.PageView.extend({
		tagName: "section",
		id: "not-found",
		template: Templates.notFound,

		render: function() {
			this.el.innerHTML = this.template();
			return Portfolio.Extensions.PageView.prototype.render.apply(this, arguments);
		}
	});

	Portfolio.init();

	var $menu = $("#menu");
	var $mobileMenu = $("#mobile-menu");
	$menu.find(".menu-item").on("mouseup", function(event) {
		var $target = $(event.currentTarget);

		if(!$target.hasClass("selected")) {
			$menu.find(".menu-item.selected").removeClass("selected");
			$target.addClass("selected");

			if($mobileMenu.hasClass("active")) {
				$mobileMenu.removeClass("active");
				$menu.fadeOut();
			}
		}
	});

	$("#footer-social-icons a").on("click", function(event) {
		var $target = $(event.currentTarget);

		ga('send', 'social', $target.attr("class").replace("social-", ""), 'view', $target.attr("href"));
	});

	$("#logo").on("mouseup", function() {
		$menu.find(".menu-item.selected").removeClass("selected");
	});

	$mobileMenu.on("click", function(event) {
		event.preventDefault();

		$mobileMenu.toggleClass("active");

		$menu.fadeToggle();
	});
}());
