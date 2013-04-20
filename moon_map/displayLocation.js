var P_text2=getTextFile('sample.txt');


function displayPlace(){
initLatLon();
var P_info = 5;
var lineData = P_text2.split('\n');
var i=0;
var j=0;
var lat = 0;
var lon=0;
while(i<lineData.length-1){
var name = lineData[i];
lat = lineData[i+1];
lon = lineData[i+2];
var report = lineData[i+3];
var url = lineData[i+4];
i+=5;
lat =eval(lat);
lon = eval(lon);

//*****目的地にマーカーを置く*****
placemark0 = ge.createPlacemark('');
var icon = ge.createIcon('');
icon.setHref('http://localhost/man.png');
var style = ge.createStyle(''); //create a new style
style.getIconStyle().setIcon(icon); //apply the icon to the style
style.getIconStyle().setScale(3.0);
placemark0.setStyleSelector(style); //apply the style to the placemark
placemark0.setName("");
placemark0.setDescription('目的地:</br>' + returnValue());
var point2 = ge.createPoint('');
point2.setLatitude(lat);
point2.setLongitude(lon);
placemark0.setGeometry(point2);
placemark0.setVisibility(ge.VISIBILITY_SHOW);
ge.getFeatures().appendChild(placemark0);
//*****************************
}
}