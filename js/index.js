var lunartravel;
(function (lunartravel) {
    var IndexController = (function () {
        function IndexController() {
            var _this = this;
            $(function () {
                _this.windowInit();
            });
        }
        IndexController.prototype.windowInit = function () {
            $(".dropdown li").click(function () {
                var text = $(this).find("a").text();
                $("#dropValue").text(text);
            });
        };
        return IndexController;
    })();
    lunartravel.IndexController = IndexController;    
})(lunartravel || (lunartravel = {}));
var indexController = new lunartravel.IndexController();
