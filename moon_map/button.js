function lookAtDestination(){
initLatLon();
// fly to Santa Cruz
var la = ge.createLookAt('');
la.set(Dest_Lat, Dest_Lon,
0, // altitude
ge.ALTITUDE_RELATIVE_TO_GROUND,
0, // heading
0, // straight-down tilt
1000000 // range (inverse of zoom)
);
ge.getView().setAbstractView(la);
}

function lookAtArriv(){
initLatLon();
// fly to Santa Cruz
var la = ge.createLookAt('');
la.set(Arriv_Lat, Arriv_Lon,
0, // altitude
ge.ALTITUDE_RELATIVE_TO_GROUND,
0, // heading
0, // straight-down tilt
1000000 // range (inverse of zoom)
);
ge.getView().setAbstractView(la);
}

function lookAtInit(){
initLatLon();
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