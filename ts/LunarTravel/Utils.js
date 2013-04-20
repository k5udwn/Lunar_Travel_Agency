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
//@ sourceMappingURL=Utils.js.map
