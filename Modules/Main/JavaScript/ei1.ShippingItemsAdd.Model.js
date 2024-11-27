define('ei1.ShippingItemsAdd.Model', [
    'SCModel',
    'Utils'
], function (
    SCModelModule,
    Utils
) {
    var SCModel = SCModelModule.SCModel;

    function ShippingItemsAddModel(){
        SCModel.call(this);

        this.urlRoot = function urlRoot () {
            return Utils.getAbsoluteUrl(getExtensionAssetsPath("Modules/Main/SuiteScript2/ei1.ShippingItemsAdd.Service.ss"), true)
        }
    }

    ShippingItemsAddModel.prototype = Object.create(SCModel.prototype);
    ShippingItemsAddModel.prototype.constructor = ShippingItemsAddModel;

    return ShippingItemsAddModel
})
