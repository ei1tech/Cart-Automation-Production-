define("ei1.PromotionAmount.Main", ['Handlebars'], function (Handlebars) {
    "use strict";
  
    return {
      mountToApp: function (container) {
        discountHelper();
      },
    };
    function discountHelper() {
      Handlebars.registerHelper('discountHandlebar', function (param1, param2) {
         var toReturn = param1 == param2 ? "" : parseFloat(param1.replace(/[$,]/g, '')) - parseFloat(param2.replace(/[$,]/g, ''));
          if (toReturn) {
              const formattedAmount = new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD'
              }).format(toReturn);
  
              // Wrap output in a div and separate spans for Discount and Amount
              toReturn = 
              '<div class="discount" style="margin: 10px 0;">' +
                  '<span class="discount-label" style="margin-right: 3px;">Discount:</span>' +
                  '<span class="discount-value">-' + formattedAmount + '</span>' +
              '</div>';
          }
          return new Handlebars.SafeString(toReturn); // Ensure the HTML is not escaped
      });
  }
  });
  