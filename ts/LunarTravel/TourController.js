///<reference path='jquery.d.ts' />
var lunartravel;
(function (lunartravel) {
    var TourController = (function () {
        function TourController() {
            var _this = this;
            this.model = new TourModel();
            this.model.apiDir = "../api/data/";
            this.model.loadOrbit("0-2030-04-21");
            this.model.complete = function () {
                _this.onModelComplete();
            };
        }
        TourController.prototype.setCurrentTime = function (time) {
        };
        TourController.prototype.dispatchEvent = function (type) {
            window.top.postMessage(type, this.model.domain);
        };
        TourController.prototype.showInfo = function (imageSrc, message) {
        };
        TourController.prototype.onModelComplete = function () {
            //alert("complete");
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.src = "js/earth_gl.js";
            document.body.appendChild(script);
        };
        return TourController;
    })();
    lunartravel.TourController = TourController;    
    var TourModel = (function () {
        function TourModel() {
            this.domain = "http://localhost/";
        }
        TourModel.prototype.loadOrbit = function (fileName) {
            var _this = this;
            var url = this.apiDir + fileName + ".orbit";
            $.get(url, null, function (result) {
                _this.loadedOrbit(result);
            });
        };
        TourModel.prototype.loadedOrbit = function (data) {
            var list = data.split("\n");
            this.orbitList = [];
            for(var i = 0; i < list.length; i++) {
                var orbit = new Orbit(list[i]);
                orbit.time = new Date(2012, 1, 1);
                orbit.time.setHours(i);
                this.orbitList.push(orbit);
            }
            this.complete();
        };
        TourModel.prototype.complete = function () {
        };
        TourModel.prototype.getStartTime = function () {
            return this.orbitList[0].time;
        };
        TourModel.prototype.getEndTime = function () {
            return this.orbitList[this.orbitList.length - 1].time;
        };
        return TourModel;
    })();
    lunartravel.TourModel = TourModel;    
    var LatLng = (function () {
        function LatLng(lat, lng) {
            if (typeof lat === "undefined") { lat = 0; }
            if (typeof lng === "undefined") { lng = 0; }
            this.lat = lat;
            this.lng = lng;
        }
        return LatLng;
    })();
    lunartravel.LatLng = LatLng;    
    var Orbit = (function () {
        function Orbit(dataSoruce) {
            if (typeof dataSoruce === "undefined") { dataSoruce = null; }
            if(dataSoruce) {
                this.parce(dataSoruce);
            }
        }
        Orbit.prototype.parce = function (dataSource) {
            var list = dataSource.split(",");
            this.time = new Date();
            this.x = parseFloat(list[1]);
            this.y = parseFloat(list[2]);
            this.z = parseFloat(list[3]);
            this.earthDist = parseFloat(list[4]);
            this.moonDist = parseFloat(list[5]);
        };
        return Orbit;
    })();
    lunartravel.Orbit = Orbit;    
})(lunartravel || (lunartravel = {}));
//@ sourceMappingURL=TourController.js.map
