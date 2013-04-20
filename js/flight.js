var lunartravel;
(function (lunartravel) {
    var Utils = (function () {
        function Utils() { }
        Utils.getURLQuery = function getURLQuery() {
            var list = window.location.search.slice(1).split("&");
            var result = {
            };
            for(var i = 0; i < list.length; i++) {
                var query = list[i].split("=");
                result[query[0]] = query[1];
            }
            return result;
        };
        return Utils;
    })();
    lunartravel.Utils = Utils;    
})(lunartravel || (lunartravel = {}));
var lunartravel;
(function (lunartravel) {
    var FlightController = (function () {
        function FlightController() {
            var _this = this;
            this.model = new FlightModel();
            this.model.targetID = lunartravel.Utils.getURLQuery().targetID;
            $(function () {
                _this.windowInit();
            });
            window.addEventListener("message", function (e) {
                _this.receptionEvent(e.data);
            });
        }
        FlightController.prototype.windowInit = function () {
            this.setHeader();
        };
        FlightController.prototype.receptionEvent = function (type) {
            console.log("kitaze");
            this.showInfo(this.model.infomationList[type].src, this.model.infomationList[type].message);
        };
        FlightController.prototype.setHeader = function () {
            $("#header h1").text(this.model.getCurrentTitle());
        };
        FlightController.prototype.setCurrentTime = function (time) {
            $("#info_date h4").text(time.getFullYear() + "/" + time.getMonth() + "/" + time.getDate() + " - " + time.getHours() + ":" + time.getMinutes() + " UTC");
        };
        FlightController.prototype.showInfo = function (imageSrc, message) {
            $("#info_picture img").attr("src", imageSrc);
            $("#info_description h5").text(message);
        };
        return FlightController;
    })();
    lunartravel.FlightController = FlightController;    
    var FlightModel = (function () {
        function FlightModel() {
            this.infomationList = {
                ISS: {
                    src: "https://edu.jaxa.jp/moon_20101221/shared/images/eclipse_anime.gif",
                    message: "A lunar eclipse is a phenomenon that occurs because the Moon enters the Earth's shadow. There is a sun on the other side of the shadow of the earth, the sun, earth, moon are listed in one straight line. Month at this time is the full moon. And orbit the moon and the earth's orbit around the Sun turns around the Earth It's not a lunar eclipse every full moon, ..."
                },
                NNS: {
                    src: "http://upload.wikimedia.org/wikipedia/commons/thumb/6/60/ISSFinalConfigEnd2006.jpg/240px-ISSFinalConfigEnd2006.jpg",
                    message: "(International Ame-chu station, International Space Station, abbreviation: ISS) International Space Station is a space station that is under construction United States, Russia, Japan, the European Space Agency and Canada (ESA) with the cooperation. It is a huge manned facility for making observations of the universe and Earth, a variety of research and experiments using the space environment. (About 27,700 km per hour) about 7.7km per second to the Earth's equator at an angle of 51.6 degrees if you are"
                }
            };
            this.headerTitle = [
                "Houston > Moon Crater", 
                "Houston > Moon Sea", 
                "Houston > Moon Valley"
            ];
        }
        FlightModel.prototype.getCurrentTitle = function () {
            return this.headerTitle[parseInt(this.targetID)];
        };
        return FlightModel;
    })();
    lunartravel.FlightModel = FlightModel;    
})(lunartravel || (lunartravel = {}));
var hour = 0;
var flightController = new lunartravel.FlightController();
setInterval(function () {
    flightController.setCurrentTime(new Date(2012, 1, 1, hour, 0));
    hour++;
}, 300);
