var ge;
		  var lookAt;
		  var dragInfo = null;
		  google.load("earth", "1");


		  function init() {
			 google.earth.createInstance('map3d', initCB, failureCB,{ database: 'http://khmdb.google.com/?db=moon'});
				 //google.earth.createInstance('map3d', initCB, failureCB);
		  }

		  function initCB(instance) {
			 ge = instance;
			 ge.getWindow().setVisibility(true);
			 ge.getNavigationControl().setVisibility(ge.VISIBILITY_SHOW);
			 var link = ge.createLink('');

//**** KMLファイル読み込み**********
//var link = ge.createLink('');
//var href = 'http://localhost/destination.kml'
//link.setHref(href);
//var networkLink = ge.createNetworkLink('');
//networkLink.set(link, true, true); // Sets the link, refreshVisibility, and flyToView
//ge.getFeatures().appendChild(networkLink);

//var link = ge.createLink('');
//var href = 'http://localhost/SearchResults.kml'
//link.setHref(href);
//var networkLink = ge.createNetworkLink('');
//networkLink.set(link, true, true); // Sets the link, refreshVisibility, and flyToView
//ge.getFeatures().appendChild(networkLink);
//********************************

		//*** make scale var and option**********
		ge.getOptions().setScaleLegendVisibility(true); 
		ge.getOptions().setStatusBarVisibility(true);
		ge.getOptions().setOverviewMapVisibility(true);
		//ge.getOptions().setGridVisibility(true);
		//ge.getOptions().setAtmosphereVisibility(true);
		//***************************************

initLatLon();

displayPlace();

//*****到着地にマーカーを置く*****
var placemark0 = ge.createPlacemark('');
var icon = ge.createIcon('');
icon.setHref('http://localhost/shuttle.png');
var style = ge.createStyle(''); //create a new style
style.getIconStyle().setIcon(icon); //apply the icon to the style
style.getIconStyle().setScale(3.0);
placemark0.setStyleSelector(style); //apply the style to the placemark
placemark0.setName("");
placemark0.setDescription('着陸地点');
var point = ge.createPoint('');
point.setLatitude(Arriv_Lat);
point.setLongitude(Arriv_Lon);
placemark0.setGeometry(point);
placemark0.setVisibility(ge.VISIBILITY_SHOW);
ge.getFeatures().appendChild(placemark0);
//*****************************

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
point2.setLatitude(Dest_Lat);
point2.setLongitude(Dest_Lon);
placemark0.setGeometry(point2);
placemark0.setVisibility(ge.VISIBILITY_SHOW);
ge.getFeatures().appendChild(placemark0);
//*****************************


//*****到着地点と目的地に線を引く*****
function addToLineString(lineString, lat, lng) {
var altitude = 1.0; // give it some altitude
lineString.getCoordinates().pushLatLngAlt(lat, lng, altitude);
}
// create the line string placemark
var lineStringPlacemark = ge.createPlacemark('');
// create the line string geometry
var lineString = ge.createLineString('');
lineStringPlacemark.setGeometry(lineString);
// tessellate (i.e. conform to ground elevation)
lineString.setTessellate(true);
// add the the points to the line string geometry
addToLineString(lineString, Arriv_Lat, Arriv_Lon);
addToLineString(lineString, Dest_Lat, Dest_Lon);
ge.getFeatures().appendChild(lineStringPlacemark);
//****************************************

// fly to Santa Cruz
var la = ge.createLookAt('');
la.set(Arriv_Lat, Arriv_Lon,
0, // altitude
ge.ALTITUDE_RELATIVE_TO_GROUND,
0, // heading
0, // straight-down tilt
2000000 // range (inverse of zoom)
);
ge.getView().setAbstractView(la);
}

//		#
//		#
//		# Google Earth の関数（エラーなど）
//		#
//		#
	function failureCB(errorCode) {
	}

	function addClickListener(func, id) {
		var obj = document.getElementById(id);
				 if (obj.addEventListener)
						obj.addEventListener('click', func, false);
				 else if (obj.attachEvent)
						obj.attachEvent('onclick', func);
	}
