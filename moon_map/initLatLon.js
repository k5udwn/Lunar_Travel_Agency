//*****到着地、目的地の経緯度を設定する******
//**到着地**
var Arriv_Lon = document.getElementById( 'Arriv_Lon' ).title;//longitude
var Arriv_Lat = document.getElementById( 'Arriv_Lat' ).title;//latitude
Arriv_Lon = eval(Arriv_Lon);
Arriv_Lat = eval(Arriv_Lat);
//**目的地**
var Dest_Lat=document.getElementById( 'Dest_Lat' ).title;
var Dest_Lon=document.getElementById( 'Dest_Lon' ).title;
Dest_Lat=eval(Dest_Lat);
Dest_Lon=eval(Dest_Lon);

function initLatLon(){
var Apollo_Lat = 0.76001;//longitude
var Apollo_Lon = 23.463381;//latitude
var Schro_Lat = 26.11;//longitude
var Schro_Lon = -50.48;//latitude
var Mosco_Lat = 27.17;//longitude
var Mosco_Lon = 147.52;//latitude

if(Dest_Lat==Apollo_Lat){//Apollo 11
Dest_Lat = Apollo_Lat;
Dest_Lon = Apollo_Lon;
}
if(Dest_Lat==Schro_Lat){//Vallis Schroten
Dest_Lat = Schro_Lat;
Dest_Lat = Schro_Lon;
}
if(Dest_Lat==Mosco_Lat){//Mare Moscovience
Dest_Lat = Mosco_Lat;
Dest_Lat = Mosco_Lon;
}
//*************************************
}

function initX(){
var Apollo_Lat = 0.76001;//longitude
var Apollo_Lon = 23.463381;//latitude
var Schro_Lat = 26.11;//longitude
var Schro_Lon = -50.48;//latitude
var Mosco_Lat = 27.17;//longitude
var Mosco_Lon = 147.52;//latitude

if(Dest_Lat==Apollo_Lat){//Apollo 11
return 0;
}
if(Dest_Lat==Schro_Lat){//Vallis Schroten
return 1;
}
if(Dest_Lat==Mosco_Lat){//Mare Moscovience
return 2;
}
}