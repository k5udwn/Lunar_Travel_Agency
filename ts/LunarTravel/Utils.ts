module lunartravel {
    export class Utils {
        static getURLQuery(): any {
            var list = window.location.search.slice(1).split("&");
            var result: any = {};
            for (var i: number = 0; i < list.length; i++) {
                var query: string[] = list[i].split("=");
                result[query[0]] = query[1];
            }
            return result;
        }
    }
}