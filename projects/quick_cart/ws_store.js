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

var WSCart = (function(settings) {
	var _wsCart =  {
		CartItem: function(attr) {
			var _attributes = $.extend(true, {
				itemKey: "",
				qty: 0
			}, attr);

			this.set = function(nameOrStruct, value) {
				if(typeof nameOrStruct === "object") {
					_attributes = $.extend(true, {}, nameOrStruct);
				} else {
					_attributes[nameOrStruct] = value;
				}
				if(this.get("qty") > 255)
					this.set("qty", 255);

				return this;
			};

			this.get = function(name) {
				return _attributes[name];
			};

			this.toJSON = function() {
				return $.extend(true, {}, _attributes);
			};

			this.save = function() {
				_wsCart.save();
			}
		},

		addItem: function(cartItem) {
			var _cartItem = this.getItem(cartItem.get("itemKey"));

			if(_cartItem) {
				var newQty = cartItem.get("qty") + _cartItem.get("qty");
				_cartItem.set("qty", newQty);
			} else {
				_items.push(cartItem);
			}
			this.updateCartIcon();

			if(WSDialog) WSDialog.render().show();

			save();
			return this;
		},

		removeItem: function(itemKey, skipUpdateCartIcon) {
			skipUpdateCartIcon = (typeof skipUpdateCartIcon !== "undefined") ? skipUpdateCartIcon : false;

			for(var i = 0; i < _items.length; i++) {
				if(_items[i].get("itemKey") === itemKey)
					_items.splice(i, 1);
			}
			if(!skipUpdateCartIcon) {
				this.updateCartIcon();
			}
			save();
			return this;
		},

		setItem: function(cartItem) {
			this.get(cartItem.get("itemKey")).set(cartItem);
			save();
			return this;
		},

		clear: function() {
			_items = [];
			this.updateCartIcon();
			save();
			return this;
		},

		getItem: function(itemKey) {
			for(var i = 0; i < _items.length; i++) {
				if(_items[i].get("itemKey") === itemKey)
					return _items[i];
			}
			return null;
		},

		getItems: function() {
			return $.extend(true, [], _items);
		},

		getItemKeys: function() {
			var itemKeys = [];
			for(var i = 0; i < _items.length; i++)
				itemKeys.push(_items[i].get("itemKey"));
			return $.extend(true, [], itemKeys);
		},

		toJSON: function() {
			return JSON.stringify(_items);
		},

		hasCartIcon: function() {
			return _settings.$cartCounter.length ? true : false;
		},

		updateCartIcon: function() {
			var numOfItems = 0;
			for(var i = 0; i < _items.length; i++) {
				numOfItems += _items[i].get("qty");
			}
			_settings.$cartCounter.text(numOfItems);
			return this;
		},

		save: function() {
			save();
		}
	};

	var save = function() {
		if(_settings.storage) {
			_settings.storage.setItem(_itemsStorageKey, _wsCart.toJSON())
		} else {
			alert("Browser does not support Cart. Please upgrade your upgrade to the latest version.");
		}
	};

	var getStorageItems = function() {
		var items = [];
		if(_settings.storage) {
			var storageItemsJSON = _settings.storage.getItem(_itemsStorageKey);

			if(storageItemsJSON) {
				var storageItemsJSON =  JSON.parse(storageItemsJSON) || [];
				for(var i = 0; i < storageItemsJSON.length; i++) {
					items.push(new _wsCart.CartItem(storageItemsJSON[i]));
				}
			}
		} else {
			alert("Browser does not support Cart. Please upgrade your upgrade to the latest version.");
		}

		return items;
	};

	var _settings = $.extend(true, {
		storage: localStorage,
		storagePrefix: "ws_cart",
		$cartCounter: $(".shopping-cart-counter")
	}, settings);

	var domain = _siteDomain;

	var _itemsStorageKey = _settings.storagePrefix + "_items_" + domain;
	var _items = getStorageItems();
	_wsCart.updateCartIcon();

	return _wsCart;
})(jQuery);


WSStore = {};

WSStore.itemStatus = {
	OK: "ok",
	INVALID: "invalid",
	DELETED: "deleted",
	PICKVARIANT: "pickVariant"
};

WSStore.inventoryStatus = {
	STOCK: 0,
	LOW: 1,
	BACKORDER: 2,
	OUT: 3
};

WSStore.getItemData = function(itemKeys, storeID, url) {
	var itemData = {
		status: {},
		details: {}
	};

	if(itemKeys.length) {
		$.ajax({
			url: (url) ? url : "/_storeManager.checkout.getItemData",
			dataType: "json",
			async: false,
			type: "POST",
			data: {
				itemKeys: JSON.stringify(itemKeys),
				storeID: storeID
			},
			success: function(response) {
				itemData = response;
			}
		});
	}

	return itemData;
};

WSStore.getCurrency = function(storeID, url) {
	var currency = "USD";

	$.ajax({
		url: (url) ? url : "/_storeManager.checkout.getCurrency",
		dataType: "json",
		async: false,
		type: "POST",
		data: {
			storeID: storeID
		},
		success: function(response) {
			currency = response;
		}
	});

	return currency;
};

WSStore.getCurrencySymbol = function(currencyCode) {
	if(currencyCode) {
		currencyCode = currencyCode.toUpperCase();

		if(currencyCode === "DKK" || currencyCode === "NOK" || currencyCode === "SEK") {
			return "kr";
		} else if(currencyCode === "EUR") {
			return "€";
		} else if(currencyCode === "GBP") {
			return "£";
		} else if(currencyCode === "PHP") {
			return "₱";
		}
	}

	return "$";
};

WSStore.getDiscountedPrice = function(orgPrice, discountValue, discountType) {
	var discountedPrice = orgPrice;

	if(discountValue > 0) {
		if(discountType === "%") {
			discountedPrice *= (1 - (discountValue / 100))
		} else {
			discountedPrice -= discountValue;
		}
	}

	return discountedPrice;
};

WSStore.getOrignalPrice = function(discountedPrice, discountValue, discountType) {
	var orgPrice = discountedPrice;

	if(discountValue > 0) {
		if(discountType === "%") {
			orgPrice /= (1 - (discountValue / 100));
		} else {
			orgPrice += discountValue;
		}
	}

	return orgPrice;
};

WSStore.sortStoreProducts = function(products, sortMode, options) {
	options = $.extend({
		discountPrice: false,
		sortCustom: []
	}, options);

	if(sortMode === "custom") {
		var customProducts = [];

		for(var i = 0; i < options.sortCustom.length; i++) {
			var sortCustomItemKey = options.sortCustom[i];

			for(var j = 0; j < products.length; j++) {
				var product = products[j];
				if(product.itemKey === sortCustomItemKey) {
					products.splice(j, 1);
					customProducts.push(product);
					break;
				}
			}
		}

		return customProducts.concat(products);
	} if(sortMode == "nameAsc") {
		products = products.sort(function(a,b) {
			if(a.name < b.name) return -1;
	    if(a.name > b.name) return 1;
	    return 0;
		});
	} else if(sortMode === "nameDesc") {
		products = products.sort(function(a,b) {
			if(a.name < b.name) return -1;
	    if(a.name > b.name) return 1;
	    return 0;
		}).reverse();
	} else if(sortMode === "priceAsc") {
		products = products.sort(function(a,b) {
			var aP = a.price;
			var bP = b.price;

			if(!options.discountPrice && WSStore) {
				var aP = WSStore.getDiscountedPrice(a.price, a.discountValue, a.discountType);
				var bP = WSStore.getDiscountedPrice(b.price, b.discountValue, b.discountType);
			}

			if(aP < bP) return -1;
	    if(aP > bP) return 1;
	    return 0;
		});
	} else if(sortMode === "priceDesc") {
		products = products.sort(function(a,b) {
			var aP = a.price;
			var bP = b.price;

			if(!options.discountPrice && WSStore) {
				var aP = WSStore.getDiscountedPrice(a.price, a.discountValue, a.discountType);
				var bP = WSStore.getDiscountedPrice(b.price, b.discountValue, b.discountType);
			}

			if(aP < bP) return -1;
	    if(aP > bP) return 1;
	    return 0;
		}).reverse();
	} else {
		products = products.sort(function(a,b) {
			return new Date(b.createdDate) - new Date(a.createdDate);
		});
	}
	return products;
}
