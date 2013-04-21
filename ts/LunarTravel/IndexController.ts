///<reference path='jquery.d.ts' />
declare var resume: Function;
module lunartravel {
    export class IndexController {
        targetID: string = "0";
        targetDate:string = "20120101";

        constructor() {
            $(() => {
                this.windowInit();
            });
        }

        windowInit(): void {
            var _this: IndexController = this;
            $(".dropdown li").click(function () {
                var a: JQuery = $(this).find("a");
                var text = a.text();
                $("#dropValue").text(text);
                _this.targetID = a.attr("index");
                _this.createLink();
               
            });

            $("#seletDate").change(() => {
                this.targetDate = $("#seletDate").val().split("-").join("");
                this.createLink();
            });
        }

        createLink(): void {
            $("#goLink").attr("href", "flight.html?targetID=" + this.targetID + "&targetDate=" + this.targetDate);
        }
    }
}

var indexController: lunartravel.IndexController = new lunartravel.IndexController();