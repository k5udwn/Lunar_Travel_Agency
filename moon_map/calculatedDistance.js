var Lx=0;
var day=0;
function Calculated(){
initLatLon();
//****到着地と目的地の距離の計算********
var L=1737.0;
var PI=3.141592;
var PI2=PI * PI;
var lat1 = Arriv_Lat*PI / 180.0;
var lon1 = Arriv_Lon*PI / 180.0;
var lat2 = Dest_Lat*PI / 180.0;
var lon2 = Dest_Lon*PI / 180.0;
var X = Math.acos(Math.sin(lat1)*Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1));
Lx = Math.round(L*X); //クレーター間の距離
//******所要時間の計算********
var speed = 10;
var time = Lx/speed;
var t = time % 24;
day = (time - t) / 24;
if(t > 0) day = day + 1;
}

function returnDest(){
Calculated();
document.write(Lx);
}

function returnDay(){
Calculated();
document.write(day);
}
