define("ei1.ShippingItemsAdd.Main", ['ei1.ShippingItemsAdd.Model'], function (ShippingItemsAddModel) {
    "use strict";
    return {
        mountToApp: function (container) {
            var cart = container.getComponent("Cart");

            cart.on("afterAddLine", function (line) {
                var itemSetId = line.line.internalid;
                var mainItemQuantity = line.line.quantity;
                var isShippingOptionsIncluded = false;
                var indexToGetOptionVaule = null;
                for (var i = 0; i < line.line.options.length; i++) {
                    var cartOptionId = line.line.options[i].cartOptionId;
                    if (cartOptionId == "custcol_ei1_shipping_options") {
                        isShippingOptionsIncluded = true;
                        indexToGetOptionVaule = i;
                        break;
                    }
                }
                if (isShippingOptionsIncluded) {
                    cart.getLines().then(function (items) {
                        var itemToGetName = items.filter(item=>item.internalid == itemSetId);
                        var itemName = itemToGetName[0].item.displayname ? itemToGetName[0].item.displayname : "";
                        if(itemName){
                            var selectedShippingOption = line.line.options[indexToGetOptionVaule].value.internalid;
                            var itemToInclude = fetchRecordDetails(selectedShippingOption);
                            itemToInclude.then(function (itemId) {
                                if (itemId) {
                                    cart.addLine({
                                        line: {
                                            quantity: mainItemQuantity,
                                            item: {
                                                internalid: itemId,
                                            },
                                            options: [
                                                {
                                                    "cartOptionId": "custcol_ei1_item_reference",
                                                    "value": { "internalid": itemSetId + " " + itemName }
                                                }
                                            ]
                                        },
                                    });
                                }
                            }).catch(function (error) {
                            });
                        }
                    })
                }
            })

            cart.on('afterUpdateLine', function (item) {
                console.log("Trigger")
                var itemSetId = item.line.internalid;
                var mainItemQuantity = item.line.quantity
                cart.getLines().then(function (lines) {
                    for (var i = 0; i < lines.length; i++) {
                        var currentIndex = lines[i];
                        for (var j = 0; j < currentIndex.options.length; j++) {
                            if (currentIndex.options[j].value.label.split(' ')[0] == itemSetId && currentIndex.options[j].value.label.split(' ')[1]) {//matching the item set id and looking for item name in item option value only shipping items include include 
                                var idToUpdate = lines[i].internalid;
                                cart.updateLine({
                                    line: {
                                        internalid: idToUpdate,
                                        quantity: mainItemQuantity
                                    }
                                }).then(function () {})
                                break;
                            }
                        }
                    }
                })
            })

        }

    }
    function fetchRecordDetails(recordId) {
        var myModel = new ShippingItemsAddModel();
        return myModel.fetch({
            data: {
                id: recordId
            }
        })
    }
})
