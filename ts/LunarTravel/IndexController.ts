///<reference path='jquery.d.ts' />
declare var resume: Function;
module lunartravel {
    export class IndexController {
        constructor() {
            $(() => {
                this.windowInit();
            });
        }

        windowInit(): void {
            $(".dropdown li").click(function() {
                var text = $(this).find("a").text();
                $("#dropValue").text(text);
            });
        }
    }
}

var indexController: lunartravel.IndexController = new lunartravel.IndexController();