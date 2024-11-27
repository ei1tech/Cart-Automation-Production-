/**
 * @NApiVersion 2.x
 * @NModuleScope TargetAccount
 */

define(['N/record'], function (record) {
    "use strict";

    // Main object
    var ShippingItemsAddModel = {
        get: function (request) {
            try {
                var shipItemRecord = record.load({
                    type: 'customrecord_ei1_shipping_option_price',
                    id:request.parameters.id
                })
                var itemToInclude = shipItemRecord.getValue('custrecord_ei1_shipping_item');
                return itemToInclude ? itemToInclude : ""
            } catch (ex) {
                // Handle errors
                log.error({
                    title: 'Error fetching items from this Record Type',
                    details: ex
                });
                throw ex;
            }
        }
    };

    // Export the object
    return ShippingItemsAddModel;
});
