export class MainController {
    targetPointLatLang: LatLng;
    targetName: string;
    targetID: string;
    startTime: Date;
    gread: string;
    orbitList: Orbit[];
    endPointList: LatLng[];

    sendFormData(values: any): void {

    }

    setCurrentTime(time: Date): void {

    }


    showInfo(imageSrc: string, message: string): void {

    }

    getStartTime(): Date {
        return this.orbitList[0].time;
    }

    getEndTime(): Date {
        return this.orbitList[this.orbitList.length - 1].time;
    }

    loadOrbit(time: Date, targetID: string): void {
        
    }

    loadedOrbit(data:string): void {
        var list: string[] = data.split("\n");
        this.orbitList = [];
        for (var i: number = 0; i < list.length; i++) {
            this.orbitList.push(new Orbit(list[i]));
        }
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

    parce(dataSource: string):void {
        var list: string[] = dataSource.split(" ");
    }
}