define("ei1.ProtectionPlanItemAdd.Main", ['ei1.ShippingItemsAdd.Main', 'ei1.PromotionAmount.Main', 'Handlebars'], function (ShippingItemsAdd, PromotionAmount, Handlebars) {
    "use strict";
  
    return {
      mountToApp: function (container) {
        ShippingItemsAdd.mountToApp(container)
        PromotionAmount.mountToApp(container)
        var cart = container.getComponent("Cart");
        var itemsArr = [];
        var environment = container.getComponent("Environment");
        if (environment) {
          var configVar = environment.getConfig('MainModule');
          itemsArr = configVar.config;
        }
  
        if (cart) {
          cart.on("afterAddLine", function (line) {
            var internalID = line.line.item.internalid;
            var itemSetId = line.line.internalid
            var itemDetails = ItemDetails(internalID);
            itemDetails.then(function (res) {
              var item = res.items[0]
              var protectionPlanInclude = item.custitem_ei1_free_insurance
              if (protectionPlanInclude == true) {
                cart.addLine({
                  line: {
                    quantity: 1,
                    item: {
                      internalid: 132372,
                    },
                    options: [
                      {
                        "cartOptionId": "custcol_ei1_item_reference",
                        "value": { "internalid": itemSetId }
                      }
                    ]
                  },
                });
              }
            });
          });
  
          cart.on("beforeRemoveLine", function (line) {
            var line_id = line.line_id;
            var idToRemove = null;
  
            cart.getLines().then(function (lines) {
              for (var i = 0; i < lines.length; i++) {
                var currentIndex = lines[i];
                for (var j = 0; j < currentIndex.options.length; j++) {
                  if (currentIndex.options[j].value.label.split(' ')[0] == line_id) {
                    idToRemove = lines[i].internalid;
                    if (idToRemove) {
                      cart.removeLine({
                        line_id: idToRemove
                      }).then(function () {
                      })
                    }
                  }
                }
              }
            })
          })
        }
  
        Handlebars.registerHelper('lookupforId', function (id) {
          var condition = itemsArr.includes(id.toString());
          if (condition) {
            return true
          }
        })
  
        function ItemDetails(internalID) {
          // Construct API URL with comma-separated list of item IDs
          var apiUrl = '/api/items?id=' + internalID + '&fieldset=details';
  
          // Return a promise for the fetch request
          return fetch(apiUrl)
            .then(function (response) {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .catch(function (error) {
              console.error('Error fetching item details from API:', error);
              throw error;
            });
        }
      },
    };
  });
  