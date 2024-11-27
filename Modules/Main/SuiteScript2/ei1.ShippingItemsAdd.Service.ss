/**
* @NApiVersion 2.x
* @NModuleScope Public
*/
    
define([
    './ei1.ShippingItemsAdd.Model'
], function (
    ShippingItemsAddModel
) {
    'use strict';

    function service (context) {
        var response = {};

        switch(context.request.method) {
            case 'GET':
                response = ShippingItemsAddModel.get(context.request);
                break;
        }

        context.response.write(JSON.stringify(response));
    }

    return {
        service: service
    }
})