///<reference path='jquery.d.ts' />
declare var resume: Function;
module lunartravel {

    export class TourController {
        model: TourModel;

        constructor() {
            this.model = new TourModel();
            this.model.apiDir = "../api/data/";
            this.model.loadOrbit("0-2030-04-21");
            this.model.complete = () => {
                this.onModelComplete();
            }
        }


        setCurrentTime(time: Date): void {

        }

        dispatchEvent(type: string): void {
            window.top.postMessage(type, window.location.protocol + "//" + window.location.host);
        }



        showInfo(imageSrc: string, message: string): void {

        }

        onModelComplete(): void {
            //alert("complete");
            var script: HTMLScriptElement = <HTMLScriptElement>document.createElement("script");
            script.type = "text/javascript";
            script.src = "js/earth_gl.js";
            document.body.appendChild(script);
        }
    }

    export class TourModel {
        targetPointLatLang: LatLng;
        targetName: string;
        targetID: string;
        startTime: Date;
        gread: string;
        orbitList: Orbit[];
        endPointList: LatLng[];
        apiDir: string;

        loadOrbit(fileName:string): void {
            var url: string = this.apiDir + fileName + ".orbit";
            $.get(url, null, (result: string): void => {
                this.loadedOrbit(result);
            });
        }
        private loadedOrbit(data: string): void {
            var list: string[] = data.split("\n");
            this.orbitList = [];
            for (var i: number = 0; i < list.length; i++) {
                var orbit: Orbit = new Orbit(list[i]);
                orbit.time = new Date(2012, 1, 1);
                orbit.time.setHours(i);
                this.orbitList.push(orbit);
            }
            this.complete();
        }

        complete(): void {
            
        }

        getStartTime(): Date {
            return this.orbitList[0].time;
        }

        getEndTime(): Date {
            return this.orbitList[this.orbitList.length - 1].time;
        }
    }


    export class LatLng {
        constructor(public lat: number = 0, public lng: number = 0) {
        }
    }

    export class Orbit {
        time: Date;
        z: number;
        x: number;
        y: number;
        earthDist: number;
        moonDist: number;

        constructor(dataSoruce: string = null) {
            if (dataSoruce) {
                this.parce(dataSoruce);
            }
        }

        parce(dataSource: string): void {
            var list: string[] = dataSource.split(",");
            this.time = new Date();
            this.x = parseFloat(list[1]);
            this.y = parseFloat(list[2]);
            this.z = parseFloat(list[3]);
            this.earthDist = parseFloat(list[4]);
            this.moonDist = parseFloat(list[5]);
        }
    }
}