var lunartravel;
(function (lunartravel) {
    var IndexController = (function () {
        function IndexController() {
            var _this = this;
            this.targetID = "0";
            this.targetDate = "20120101";
            $(function () {
                _this.windowInit();
            });
        }
        IndexController.prototype.windowInit = function () {
            var _this = this;
            var _this = this;
            $(".dropdown li").click(function () {
                var a = $(this).find("a");
                var text = a.text();
                $("#dropValue").text(text);
                _this.targetID = a.attr("index");
                _this.createLink();
            });
            $("#seletDate").change(function () {
                _this.targetDate = $("#seletDate").val().split("-").join("");
                _this.createLink();
            });
        };
        IndexController.prototype.createLink = function () {
            $("#goLink").attr("href", "flight.html?targetID=" + this.targetID + "&targetDate=" + this.targetDate);
        };
        return IndexController;
    })();
    lunartravel.IndexController = IndexController;    
})(lunartravel || (lunartravel = {}));
var indexController = new lunartravel.IndexController();
