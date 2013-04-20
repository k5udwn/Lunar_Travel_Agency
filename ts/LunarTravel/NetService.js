var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
///<reference path='jquery.d.ts' />
var lunartravel;
(function (lunartravel) {
    var NetService = (function () {
        function NetService() { }
        NetService.prototype.load = function () {
        };
        return NetService;
    })();
    lunartravel.NetService = NetService;    
    var OrbitService = (function (_super) {
        __extends(OrbitService, _super);
        function OrbitService() {
            _super.apply(this, arguments);

        }
        OrbitService.prototype.createURL = function (apiDir, time, type) {
            this.url = apiDir + time.getFullYear() + time.getMonth() + time.getDate() + ".orbit";
        };
        OrbitService.prototype.load = function () {
            var valueObject = this.valueObject;
            var url = this.url;
            var resultHandller = this.result;
            var errorHandler = this.fault;
            window["$"].jsonp({
                url: url,
                callback: "metaDataResult",
                success: function (json) {
                    resultHandller();
                },
                error: function () {
                    errorHandler();
                }
            });
        };
        return OrbitService;
    })(NetService);
    lunartravel.OrbitService = OrbitService;    
})(lunartravel || (lunartravel = {}));
//@ sourceMappingURL=NetService.js.map
