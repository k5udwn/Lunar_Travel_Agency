///<reference path='jquery.d.ts' />
module lunartravel {
    export class NetService {
        valueObject:any;
        fault:Function;
        result:Function;
        url: string;
        load  ():void {}
    }

    export class OrbitService extends NetService {
        createURL(apiDir:string, time:Date, type:string): void {
            this.url = apiDir + time.getFullYear() + time.getMonth() + time.getDate() + ".orbit";
        }
        load(): void {
            var valueObject: any = this.valueObject;
            var url: string = this.url;
            var resultHandller: Function = this.result;
            var errorHandler: Function = this.fault;
            window["$"].jsonp({
                url: url,
                callback: "metaDataResult",
                success: (json: any) => {
                    resultHandller();
                },
                error: function () {
                    errorHandler();
                }
            });
        }
    }

}
