define(["require", "exports"], function(require, exports) {
    var MainController = (function () {
        function MainController() { }
        MainController.prototype.sendFormData = function (values) {
        };
        MainController.prototype.setCurrentTime = function (time) {
        };
        MainController.prototype.showInfo = function (imageSrc, message) {
        };
        MainController.prototype.getStartTime = function () {
            return this.orbitList[0].time;
        };
        MainController.prototype.getEndTime = function () {
            return this.orbitList[this.orbitList.length - 1].time;
        };
        MainController.prototype.loadOrbit = function (time, targetID) {
        };
        MainController.prototype.loadedOrbit = function (data) {
            var list = data.split("\n");
            this.orbitList = [];
            for(var i = 0; i < list.length; i++) {
                this.orbitList.push(new Orbit(list[i]));
            }
        };
        return MainController;
    })();
    exports.MainController = MainController;    
    var LatLng = (function () {
        function LatLng(lat, lng) {
            if (typeof lat === "undefined") { lat = 0; }
            if (typeof lng === "undefined") { lng = 0; }
            this.lat = lat;
            this.lng = lng;
        }
        return LatLng;
    })();
    exports.LatLng = LatLng;    
    var Orbit = (function () {
        function Orbit(dataSoruce) {
            if (typeof dataSoruce === "undefined") { dataSoruce = null; }
            if(dataSoruce) {
                this.parce(dataSoruce);
            }
        }
        Orbit.prototype.parce = function (dataSource) {
            var list = dataSource.split(" ");
        };
        return Orbit;
    })();
    exports.Orbit = Orbit;    
})
//@ sourceMappingURL=main.js.map
