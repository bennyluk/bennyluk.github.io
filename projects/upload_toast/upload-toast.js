/**
 *  Upload Toast
 *
 *
 *
 *  Version: 1
 *
 *  Author: Benny Luk <bennyluk93@gmail.com>
 *  Site: http://bennyluk.github.io


http://fontawesome.io/examples/


placeholder image

 */
(function($, window) {
	'use strict';
/*
  var _this;
  var _el;
*/
	var defaults = {
    el: null,
    loadingBar: true
	};

	var _toastStatus = {

	};

	function _trigger(event, args) {
    /*
		if(typeof _options[event] == "function") {
			_options[event].call(this, _extend({
				event: event,
				whatsNew: _this,
				slides: _slides,
				currentIndex: _currentIndex,
				el: _el,
				overlay: _overlay
			}, args));
		}
    */
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

	function _render() {
	}

	function _attachHandlers(uploadToastManager) {
    uploadToastManager.options.el.getElementsByClassName("upload-toast-manager-minimize-btn")[0].addEventListener("click", function() {
      uploadToastManager.toggleMinimize();
    });

		uploadToastManager.options.el.getElementsByClassName("upload-toast-manager-close-btn")[0].addEventListener("click", function() {
			uploadToastManager.close();
		});
	}

	function _deattachHandlers() {
	}

	window.UploadToastManager = function() {
		if (arguments[0] && typeof arguments[0] === "object")
      this.options = $.extend(defaults, arguments[0]);

		this.toasts = [];

		this.uploading = 0;
		this.uploaded = 0;
		this.cancelled = 0;

		_attachHandlers(this);

		console.log(this);

		return this;
	};

	UploadToastManager.prototype.getToasts = function() {
		return this.toasts;
	};

  UploadToastManager.prototype.toggleMinimize = function(state) {
    if(typeof state === "undefined") {
      toggleClass(this.options.el, "upload-toast-manager-minimize");
    } else if(state) {
      addClass(this.options.el, "upload-toast-manager-minimize");
    } else {
      removeClass(this.options.el, "upload-toast-manager-minimize");
    }

		return this;
	};

  UploadToastManager.prototype.minimize = function() {
    this.toggleMinimize(true);

		return this;
	};

  UploadToastManager.prototype.expand = function() {
    this.toggleMinimize(false);

    return this;
  };

	UploadToastManager.prototype.close = function() {
		this.options.el.parentNode.removeChild(this.options.el);

    return this;
  };

  UploadToastManager.prototype.addToast = function(toast) {
		if(!toast.id) {
			toast.id = "upload-toast-" + (this.getToasts().length + 1);
		}

    toast = new UploadToast(toast);

		this.options.el.getElementsByClassName("upload-toast-manager-content")[0].appendChild(toast.el);

    this.toasts.push(toast);

		this.uploading += 1;
		this.updateTitle();

    return toast;
  };

	UploadToastManager.prototype.getStatus = function() {
		var status = {
			"uploading": 0,
			"done": 0
		};

		for(var i = 0; i < this.toasts.length; i++) {
			var toastStatus = this.toasts[i].getStatus();

			if(typeof status[toastStatus] !== "undefined")
				status[toastStatus] = 1;
		}

		return status;
	};

	UploadToastManager.prototype.updateTitle = function() {
		var status = this.getStatus();

		console.log(status);
	};

  var UploadToast = function() {
		this.el;
		this.loadingBarEl;

		var progress = 0;

		var defaults = {
			id: '',
			img: '',
			label: ''
		};

		var status = "uploading";

		UploadToast.prototype.get = function(name) {
      return this.attributes[name];
		};

    UploadToast.prototype.set = function(nameOrStruct, value) {
			// case, if ID is the same.
			if(typeof nameOrStruct === "object")
				this.attributes = _extend(this.attributes, nameOrStruct);
		 	else
				this.attributes[nameOrStruct] = value;

			return this;
		};

		UploadToast.prototype.getProgress = function() {
			return progress;
		};

		UploadToast.prototype.getStatus = function() {
			return status;
		};

    UploadToast.prototype.done = function() {
			status = "done";
      addClass(this.el, "upload-toast-manager-toast-done");
      return this;
    };

    UploadToast.prototype.inProgress = function() {
			status = "uploading";
      removeClass(this.el, "upload-toast-manager-toast-done");
      return this;
    };

    UploadToast.prototype.progress = function(val) {
      val = parseInt(val);

      if(!isNaN(val)) {
        progress = val;

        this.loadingBarEl.style.width = progress + "%";

        if(progress === 100) {
          this.done();
        } else {
          this.inProgress();
        }
      }

      return this;
    };

		var _toastTemplate = function(uploadToast) {
			var html =  "";

			html +=   '<img class="upload-toast-manager-toast-image" src="' + uploadToast.get("img") + '" alt="' + uploadToast.get("label") + '">';
			html +=   '<div class="upload-toast-manager-toast-title">' + uploadToast.get("label") + '</div>';
			html +=   '<div class="upload-toast-manager-toast-action">';
			html +=     '<i class="fa fa-check fa-fw" aria-hidden="true"></i>';
			html +=     '<i class="fa fa-search fa-fw" aria-hidden="true"></i>';
			html +=     '<i class="fa fa-spinner fa-pulse fa-fw upload-toast-manager-toast-loading"></i>';
			html +=   '<div class="upload-toast-manager-toast-loading-bar"></div>';
			html +=   '</div>';

			var el = document.createElement("div");
			el.id = uploadToast.get("id");
			el.className = "upload-toast-manager-toast";
			el.innerHTML = html;

			return el;
		};

		if (arguments[0] && typeof arguments[0] === "object") {
      this.attributes = _extend(defaults, arguments[0]);
    }

		this.el = _toastTemplate(this);
		
		this.loadingBarEl = this.el.getElementsByClassName("upload-toast-manager-toast-loading-bar")[0];

		this.el.addEventListener("click", function(event) {
			console.log("click event");
		});

		return this;
  }

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
})(jQuery, window);
