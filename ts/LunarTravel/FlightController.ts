///<reference path='jquery.d.ts' />
///<reference path='Utils.ts' />
module lunartravel {
    export class FlightController {
        model: FlightModel;
        constructor() {
            this.model = new FlightModel();
            this.model.targetID = Utils.getURLQuery().targetID;
            $(() => {
                this.windowInit();
                $("#info").hide();
                
            });
            window.addEventListener("message", (e: any) => {
                console.log("topWindow Recieve eventType : " + e.data);
                
                this.receptionEvent(e.data);
            });
        }

        windowInit():void {
            this.setHeader();
        }

        receptionEvent(type: string): void {
            if (type == "end") {
                this.showMoonMap();
                return;
            }

            this.showInfo(this.model.infomationList[type].src, this.model.infomationList[type].message);

            setTimeout(() => {
                document.getElementById("orbitFrame")["contentWindow"].resume();
                this.hideInfo();
            }, 3000);
            
        }
        
        setHeader(): void {
            $("#header h1").text(this.model.getCurrentTitle());
        }

        setCurrentTime(time: Date): void {
            $("#info_date h4").text(time.getFullYear()+"/"+time.getMonth()+"/"+time.getDate()+ " - " + time.getHours() + ":" + time.getMinutes() + " UTC");
        }

        showInfo(imageSrc: string, message: string): void {
            $("#info_picture img").attr("src", imageSrc);
            $("#info_description h5").text(message);
            $("#info").show(1);
        }

        hideInfo(): void {
            $("#info").hide(1);
        }

        width(): number {
            return $(window).width();
        }

        height(): number {
            return $(window).height();
        }

        showMoonMap(): void {
            $("#moonMap").css("display", "block");
            $("#moonMapFrame").attr("src", "moon_map/Route.html");

        }
    }

    export class FlightModel {
        targetID: string;
        headerTitle: string[];
        infomationList: any;
        constructor() {
            this.infomationList = {
             ISS :{
                 src: "https://edu.jaxa.jp/moon_20101221/shared/images/eclipse_anime.gif",
                 message: "A lunar eclipse is a phenomenon that occurs because the Moon enters the Earth's shadow. There is a sun on the other side of the shadow of the earth, the sun, earth, moon are listed in one straight line. Month at this time is the full moon. And orbit the moon and the earth's orbit around the Sun turns around the Earth It's not a lunar eclipse every full moon, ..."
             },
             seishi: {
                 src: "http://upload.wikimedia.org/wikipedia/commons/thumb/6/60/ISSFinalConfigEnd2006.jpg/240px-ISSFinalConfigEnd2006.jpg",
                 message: "(International Ame-chu station, International Space Station, abbreviation: ISS) International Space Station is a space station that is under construction United States, Russia, Japan, the European Space Agency and Canada (ESA) with the cooperation. It is a huge manned facility for making observations of the universe and Earth, a variety of research and experiments using the space environment. (About 27,700 km per hour) about 7.7km per second to the Earth's equator at an angle of 51.6 degrees if you are"
             },

             hanbun: {
                 src: "https://edu.jaxa.jp/moon_20101221/shared/images/eclipse_anime.gif",
                 message: "A lunar eclipse is a phenomenon that occurs because the Moon enters the Earth's shadow. There is a sun on the other side of the shadow of the earth, the sun, earth, moon are listed in one straight line. Month at this time is the full moon. And orbit the moon and the earth's orbit around the Sun turns around the Earth It's not a lunar eclipse every full moon, ..."
             },
             onaji: {
                 src: "http://upload.wikimedia.org/wikipedia/commons/thumb/6/60/ISSFinalConfigEnd2006.jpg/240px-ISSFinalConfigEnd2006.jpg",
                 message: "(International Ame-chu station, International Space Station, abbreviation: ISS) International Space Station is a space station that is under construction United States, Russia, Japan, the European Space Agency and Canada (ESA) with the cooperation. It is a huge manned facility for making observations of the universe and Earth, a variety of research and experiments using the space environment. (About 27,700 km per hour) about 7.7km per second to the Earth's equator at an angle of 51.6 degrees if you are"
             },
                kaguya:{
                 src: "https://edu.jaxa.jp/moon_20101221/shared/images/eclipse_anime.gif",
                 message: "A lunar eclipse is a phenomenon that occurs because the Moon enters the Earth's shadow. There is a sun on the other side of the shadow of the earth, the sun, earth, moon are listed in one straight line. Month at this time is the full moon. And orbit the moon and the earth's orbit around the Sun turns around the Earth It's not a lunar eclipse every full moon, ..."
             }
            };
            this.headerTitle = [
                "Kennedy Space Center > Sea of Tranquility",
                "Kennedy Space Center > Ocean of Storms",
                "Kennedy Space Center > Fra Mauro"
            ];
        }

        getCurrentTitle(): string {
            return this.headerTitle[parseInt(this.targetID)];
        }
    }
}


var hour: number = 0;
var flightController: lunartravel.FlightController = new lunartravel.FlightController();
setInterval(() => {
    flightController.setCurrentTime(new Date(2012, 1, 1, hour, 0));
    hour++;
}, 300);
