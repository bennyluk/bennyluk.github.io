/**
 *  Quick Cart
 *
 *  This is a jQuery plugin that can help you customize your tutorial trip
 *
 *  Version: 1
 *
 *  Author: Benny Luk <bennyluk93@gmail.com>
 *  Site: http://bennyluk.github.io
 */
(function(window) {
	'use strict';

	var defaults =  {
		maxItems: 100,
		maxItemQty: 100,
		onReady: null,
		onAdd: null,
		onRemove: null,
		onUpdate: null,
		onChange: null,
		onSave: null,
		storage: "localStorage",
		storageKey: "quick_cartthis.items",
		autoSave: true
	};

	function _trigger(event, quickCart, args) {
		if(typeof quickCart.options[event] == "function")
			quickCart.options[event].call(quickCart, args);
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

	// Check if Storage API is Available
	// https://stackoverflow.com/questions/16427636/check-if-localstorage-is-available
	function lsTest() {
	    var test = 'test';
	    try {
	      localStorage.setItem(test, test);
	      localStorage.removeItem(test);
	      return true;
	    } catch(e) {
	      return false;
	    }
	}

	function _setStorage(quickCart) {
		// set the storage
		if(quickCart.options.storage === "localStorage" && lsTest()) {
			quickCart.storage = localStorage;
		} else if(quickCart.options.storage === "sessionStorage" && lsTest()) {
			quickCart.storage = sessionStorage;
		} else if(quickCart.options.storage === "cookie" && Cookies) {
		} else if(quickCart.options.storage === "none") {
		}
	}

	function _getStorageItems(quickCart) {
		var itemsJSON = "";

		if(quickCart.storage) {
			if(quickCart.options.storage === "localStorage" || quickCart.options.storage === "sessionStorage") {
				itemsJSON = quickCart.storage.getItem(quickCart.options.storageKey);
			}
		}

		return itemsJSON;
	}

	window.QuickCart = function() {
		this.storage = null;
		this.items = null;

		this.options = defaults;

		if (arguments[0] && typeof arguments[0] === "object")
      this.options = _extend(defaults, arguments[0]);

		_setStorage(this);

		this.setItems(_getStorageItems(this), "json");

		_trigger("onReady", this, this);
	};

	QuickCart.prototype.add = function(param) {
		param.qty = parseInt(param.qty);
		param.price = parseFloat(param.price);

		if(!param.id.length)
			throw 'Cart Item ID Not Found.';
		else if(!param.qty)
			throw 'Quantity is not a valid number';
		else if(!param.price)
			throw 'Price is not a valid number';

		var item = this.get(param.id);

		if(typeof item === "object") {
			item.addQty(param.qty);
		} else {
			if(this.getNumberOfItems() < this.options.maxItems) {
				var cartItem = new QuickCartItem(param);
				cartItem.setCart(this)
				this.items.push(cartItem);
				this.save();
				_trigger("onAdd", this, cartItem);
				_trigger("onUpdate", this, cartItem);
			}
		}

		return this;
	};

	QuickCart.prototype.get = function(id) {
		for(var i = 0; i < this.items.length; i++) {
			if(this.items[i].get("id") === id)
				return this.items[i];
		}
		return undefined;
	};

	QuickCart.prototype.getByIndex = function(index) {
		return this.items[index];
	};

	QuickCart.prototype.getIndexByID = function(id) {
		for(var i = 0; i < this.items.length; i++) {
			if(this.items[i].get("id") === id)
				return i;
		}
		return -1;
	};

	QuickCart.prototype.remove = function(id) {
		var index = this.getIndexByID(id);
		this.removeByIndex(index);

		return this;
	};

	QuickCart.prototype.removeByIndex = function(index) {
		if(typeof this.items[index] === "object") {
			var cartItem = this.items[index];
			this.items.splice(index, 1);
			this.save();
			_trigger("onRemove", this, cartItem);
		}

		return this;
	};

	QuickCart.prototype.getItems = function() {
		return this.items;
	};

	QuickCart.prototype.setItems = function(items, type) {
		if(type === "json" && items && items.length) {
			items = JSON.parse(items);

			for(var i = 0; i < items.length; i++) {
				items[i] = new QuickCartItem(items[i]);
				items[i].setCart(this);
			}
		}

		this.items = items;
	};

	QuickCart.prototype.getNumberOfItems = function() {
		return this.items.length;
	};

	QuickCart.prototype.toJSON = function() {
		return this.items;
	};

	QuickCart.prototype.clear = function() {
		items = [];
		return this;
	};

	QuickCart.prototype.setSettings = function(nameOrStruct, value) {
		if(typeof nameOrStruct === "object")
			this.options = _extend(this.options, nameOrStruct);
		else
			this.options[nameOrStruct] = value;

		return this;
	};

	QuickCart.prototype.save = function() {
		if(this.options.autoSave && typeof this.storage !== null) {
			var items = this.getItems();
			var itemsJSON = JSON.stringify(items);

			if(this.options.storage === "localStorage" || this.options.storage === "sessionStorage") {
				this.storage.setItem(this.options.storageKey, itemsJSON);
			}
		}

		_trigger("onSave", this, items);

		return this;
	};

	var QuickCartItem = function() {
		var _cart = null;

		var defaults = {
			'id': '',
			'name': '',
			'qty': 0,
			'price': 0,
			'sku': '',
			'properties': ''
		};

		if (arguments[0] && typeof arguments[0] === "object") {
      this.attributes = _extend(defaults, arguments[0]);
    }

		QuickCartItem.prototype.get = function(name) {
			return this.attributes[name];
		};

		QuickCartItem.prototype.set = function(nameOrStruct, value) {
			// case, if ID is the same.
			if(typeof nameOrStruct === "object")
				this.attributes = _extend(this.attributes, nameOrStruct);
		 	else
				this.attributes[nameOrStruct] = value;

			// make sure the qty is > 0 and < maxItemQty
			var _qty = Math.max(this.attributes["qty"], 0);
			_qty = Math.min(_qty, this.options.maxItemQty);
			this.attributes['qty'] = _qty;

			_cart.save();

			_trigger("onUpdate", this, this);
			_trigger("onChange", this, this);

			return this;
		};

		QuickCartItem.prototype.addQty = function(qty) {
			var _qty = this.get("qty") + qty;
			return this.set("qty", _qty);
		};

		QuickCartItem.prototype.minusQty = function(qty) {
			var _qty = this.get("qty") - qty;
			return this.set("qty", _qty);
		};

		QuickCartItem.prototype.equals = function(cartItem) {
			// TODO
		};

		QuickCartItem.prototype.getTotal = function() {
			return this.get("qty") * this.get("price")
		};

		QuickCartItem.prototype.toJSON = function() {
			return this.attributes;
		};

		QuickCartItem.prototype.setCart = function(cart) {
			_cart = cart;
		};

		return this;
	}
})(window);













/*




var WSDialog = (function(callee, settings) {
	var _wsDialog = {
		show: function() {
			if(!$("body").hasClass("mobile-mode")) {
				_settings.$dialog.addClass("active");
			}

			return this;
		},

		hide: function() {
			_settings.$dialog.removeClass("active");
			return this;
		},

		toggle: function() {
			_settings.$dialog.toggleClass("active");
			return this;
		},

		render: function() {
			if(!$("body").hasClass("mobile-mode")) {
				// re-render everything
				var itemKeys = WSCart.getItemKeys();

				var html = "";
				var subtotal = 0;
				var numOfValidItems = 1;
				var storeID = _settings.$dialog.find(".sm-cart-storeID").val();
				var currencyCode = _settings.$dialog.find(".sm-cart-currencyCode").val();
				var isValid = true;

				if(itemKeys.length) {
					var itemData = WSStore.getItemData(itemKeys, storeID);

					var currencySymbol = WSStore.getCurrencySymbol(itemData.currency);

					for(var j = 0; j < itemKeys.length; j++) {
						var itemKey = itemKeys[j];

						var itemDetail = itemData.details[itemKey];
						var item = WSCart.getItem(itemKey);

						var imgSrc = "/img/fm_stock/thumb/_stock_product.png";

						var images = $.parseJSON(itemDetail.IMAGES);
						if(images.length && !fm_isStock(images[0])) {
							imgSrc = "/upload/" + storeID + "/images/thumb/M/" + images[0];
						}

						var choicesLabel = "";
						var choices = $.parseJSON(itemDetail.CHOICES);
						if(choices) {
							for(var i = 0; i < choices.length; i++) {
								var choice = choices[i];
								for(var choiceKey in choice) {
									choicesLabel += encodeForHTML(choiceKey) + ": " + encodeForHTML(choice[choiceKey]);
								}
							}
						}

						var productURL = _settings.$dialog.find(".sm-product-url").val();

						var price = WSStore.getDiscountedPrice(itemDetail.PRICE, itemDetail.DISCOUNTVALUE, itemDetail.DISCOUNTTYPE);

						html += '<li data-itemkey="' + itemKey + '" class="clearfix">';
							html += '<a href="' + productURL + '/' + itemDetail.ITEMKEY_ROOT + '" target="_blank">';
								html += '<div class="sm-cart-dialog-item-img" style="background-image: url(' + imgSrc + ');"></div>';
								html += '<div style="font-weight:bold;" class="sm-cart-dialog-item-label sm-cart-dialog-item-title" title="' + encodeForHTML(itemDetail.NAME) + '">' + encodeForHTML(itemDetail.NAME) + '</div>';
							html += '</a>';
							if(choicesLabel) {
								html += '<div class="sm-cart-dialog-item-label sm-cart-dialog-item-title" title="' + choicesLabel + '">' + choicesLabel + '</div>';
							}
							html += '<div class="sm-cart-dialog-item-labely">' + item.get("qty") +' x ' + itemData.currency + ' ' + currencySymbol + price.toFixed(2) + '</div>';
							html += '<div class="sm-cart-dialog-item-remove"><i class="fa fa-times"></i></div>';
							html += '<input name="sm-cart-item-itemKey-' + numOfValidItems + '" type="hidden" class="sm-cart-item-itemKey" value="' + item.get("itemKey") + '">';
							html += '<input name="sm-cart-item-qty-' + numOfValidItems + '" type="hidden" class="sm-cart-item-qty-input" value="' + item.get("qty") + '">';
						html += '</li>';

						if(itemData.status[itemKey] === "ok") {
							subtotal += parseFloat(price) * item.get("qty");
							numOfValidItems++;
						} else {
							isValid = false;
						}
					}
				}

				_settings.$dialog.find("#sm-cart-checkout-cart-btn").toggle(isValid);
				_settings.$dialog.find("#sm-cart-dialog-list").html(html);
				_settings.$dialog.find("#sm-cart-dialog-subtotal-price").text(currencyCode + " " + currencySymbol + subtotal.toFixed(2));
				_settings.$dialog.find(".sm-cart-num-items").val(numOfValidItems - 1);
			}

			return this;
		},

		add: function() {
			// add. if item key exists, add to qty
			return this;
		},

		remove: function(itemKey) {
			return this;
		}
	};

	var _settings = $.extend(true, {
		$dialog: $("#sm-cart-dialog"),
		$dialogOverlay: $("#sm-cart-dialog-overlay")
	}, settings);

	_settings.$dialog.on("click", ".sm-cart-dialog-item-remove", function() {
		_wsDialog.remove("fdfdfd");
	});

	_settings.$dialog.find("#sm-cart-dialog-header .fa-angle-right").click(function() {
		_wsDialog.hide();
	});

	_settings.$dialogOverlay.click(function() {
		_wsDialog.hide();
	});

	return _wsDialog;
})(jQuery);

*/
