function changeFaceOrientation(geometry){
    for(var i = 0;i<geometry.faces.length;i++){
	var face = geometry.faces[ i ];
	if ( face instanceof THREE.Face3 ) {
	    var tmp = face.b;
	    face.b = face.c;
	    face.c = tmp;
                      
	} else if ( face instanceof THREE.Face4 ) {
	    var tmp = face.b;
	    face.b = face.d;
	    face.d = tmp;
	}
    }
              
    geometry.computeCentroids();
    geometry.computeFaceNormals();
    geometry.computeVertexNormals();
}
function Sleep( T ){
    var d1 = new Date().getTime();
    var d2 = new Date().getTime();
    while( d2 < d1+1000*T ){    //T秒待つ
	d2=new Date().getTime();
    } 
    return; 
}
function resume(){
    is_stop=true;
              
}
function stop(){
    is_stop=false;
}

//controller.model.orbitlist[i].x .y .z earthDist moonDist time(Date型)
function earth_gl(){
    var spf=0.1;
var earth_r=6378.137;
    var earth_d=12756;
var moon_r=3474.3;
var earth_moon=384400;
var nstar=10000;
var moon=1/earth_r;
var TAnimation=60;//
if(!Detector.webgl) Detector.addGetWebGLMessage();
var renderer = new THREE.WebGLRenderer({ antialias:true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColorHex(0x000000, 1);
        
document.body.appendChild(renderer.domElement);

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(
					 15, window.innerWidth / window.innerHeight);
camera.position = new THREE.Vector3(0, 16, 0);
        
camera.lookAt(new THREE.Vector3(0, 0, 0));
        
        
scene.add(camera);
var light = new THREE.DirectionalLight(0xcccccc);
light.position = new THREE.Vector3(0.577, 0.577, 0.577);
//var ambient = new THREE.AmbientLight(0x333333);
var ambient = new THREE.AmbientLight(0xffffff);
//scene.add(light);
scene.add(ambient);
var geometry3 = new THREE.SphereGeometry(1000, 40, 40);
var material3 = new THREE.MeshPhongMaterial({
	color: 0xffffff, specular: 0xcccccc, shininess:50, ambient: 0xffffff,
	map: THREE.ImageUtils.loadTexture('images/star_sky.jpg') });
changeFaceOrientation(geometry3);
var sky = new THREE.Mesh(geometry3, material3);
sky.doubleSided=true;
//scene.add(sky);
var star_geometry= new Array(3);
star_geometry[0] = new THREE.SphereGeometry(1, 2, 2);
star_geometry[1] = new THREE.SphereGeometry(1.5, 8, 8);
star_geometry[2] = new THREE.SphereGeometry(2.5, 10, 10);

          
var star_material= new Array(3);
star_material[0]= new THREE.MeshPhongMaterial({ambient: 0xffffff});
star_material[1] = new THREE.MeshPhongMaterial({ambient: 0xff9922});
star_material[2] = new THREE.MeshPhongMaterial({ambient: 0x4488ff});

for(var i=0; i<nstar;i++){
    vect = new THREE.Vector3(
			     Math.random() * 2 - 1,
			     Math.random() * 2 - 1,
			     Math.random() * 2 - 1
			     );
    vect.normalize();
    vect.x*=1000;
    vect.y*=1000;
    vect.z*=1000;
    var n;
    if(i%12==0)n=1;
    else if(i%13==0)n=2;
    else n=0;
    var m;
    if(i%15==0)m=1;
    else if(i%30==0)m=2;
    else m=0;
    var star = new THREE.Mesh(star_geometry[m], star_material[n]);
              
    //var star = new THREE.Mesh(star_geometry);
    star.position = vect;
    scene.add(star);

}
  
          
          

var geometry = new THREE.SphereGeometry(1, 32, 32);
var material = new THREE.MeshPhongMaterial({
        color: 0xffffff, specular: 0xcccccc, shininess:50, ambient: 0xffffff,
        map: THREE.ImageUtils.loadTexture('images/earth2.jpg') });
        
var earth = new THREE.Mesh(geometry, material);
earth.doubleSided=true;
earth.rotation.y=168.0;
scene.add(earth);
        
        
        
var geometry2 = new THREE.SphereGeometry(moon_r/earth_r, 32, 16);
var material2 = new THREE.MeshPhongMaterial({
	color: 0xffffff, specular: 0xcccccc, shininess:50, ambient: 0xffffff,
	map: THREE.ImageUtils.loadTexture('images/moon.png') });
        
var moon = new THREE.Mesh(geometry2, material2);
moon.position = new THREE.Vector3(-365037.0/earth_d,6386.0/earth_d,-569.0/earth_d);
scene.add(moon);
         
//軌道を表示
var point;
var vect;
var linepoint = new THREE.Geometry();
    var orbit;
for(var i=0;i<controller.model.orbitList.length;i++){
    //for(var i=0;i<2;i++){
    //console.log(lines[i]);
    // 座標を作成
    orbit = controller.model.orbitList[i];
            
    console.log(i,orbit.x,orbit.y,orbit.z,orbit.earthDist,orbit.moonDist);
    vect = new THREE.Vector3(
                             orbit.x/earth_d,
                             orbit.y/earth_d,
                             orbit.z/earth_d
			     );
    console.log(i,orbit.x,orbit.y,orbit.z,orbit.earthDist,orbit.moonDist);
    //vect= new THREE.Vector3(i/2+0.5,i/2+0.5,i/2+0.5);
    
    linepoint.vertices.push( vect );
}
line = new THREE.Line(
		      linepoint,
		      new THREE.LineBasicMaterial( { color: 0xffffff, opacity: 1.0, linewidth: 1 } )
		      );
scene.add( line );

        
          
//座標軸
var xpoints = new THREE.Geometry();
xpoints.vertices.push( new THREE.Vector3( -10, 0, 0 ) );
xpoints.vertices.push( new THREE.Vector3(  10, 0, 0 ) );
linesMaterial = new THREE.LineBasicMaterial( {color: 0xff0000, linewidth: 1} );
x_line= new THREE.Line(xpoints, linesMaterial);
scene.add( x_line );
          
var ypoints = new THREE.Geometry();
ypoints.vertices.push( new THREE.Vector3( 0, -10, 0 ) );
ypoints.vertices.push( new THREE.Vector3( 0,  10, 0 ) );
linesMaterial = new THREE.LineBasicMaterial( {color: 0x00ff00, linewidth: 1} );
y_line= new THREE.Line(ypoints, linesMaterial);
scene.add( y_line );
          
var zpoints = new THREE.Geometry();
zpoints.vertices.push( new THREE.Vector3( 0, 0,  10 ) );
zpoints.vertices.push( new THREE.Vector3( 0, 0, -10 ) );
    linesMaterial = new THREE.LineBasicMaterial( {color: 0x0000ff, linewidth: 1} );
    z_line= new THREE.Line(zpoints, linesMaterial);
    
    scene.add(z_line);
    var controls = new THREE.OrbitControls(camera);
    controls.center = new THREE.Vector3(0, 0, 0);
    var baseTime = +new Date;
    
          
        
//Airliner
var ag = new THREE.SphereGeometry(0.5, 8, 8);
var am = new THREE.MeshPhongMaterial({
	color: 0xffffff, specular: 0xcccccc,ambient: 0xffd400});
var Airliner = new THREE.Mesh(ag, am);
    scene.add(Airliner);
    
    var bg = new THREE.SphereGeometry(0.5, 8, 8);
    var bm = new THREE.MeshPhongMaterial({
                                         color: 0xffffff, specular: 0xcccccc,ambient: 0x00ff00});
    //var balloon = new THREE.Mesh(bg, bm)；
    //scene.add(balloon);
    //var fevent=new Array{1,1,1,1,1};
    var fcount=0;
    function render() {
        requestAnimationFrame(render);
        //var orbit = controller.model.orbitList[fcount];
        //Air の位置更新
        //Airliner.position = new THREE.Vector3(orbit.x,orbit.y,orbit.z);
        
        /*
        if(is_stop==true){//バルーンの点滅
                if()
        }*/
        
        
        // カメラの状態を更新
        controls.update();
      //Sleep(spf); //flame管理
        
    //earth.rotation.y = 0.3 * (+new Date - baseTime) / 1000;
            
    //イベント
    //    controller.dispatchEvent("ISS");
    //if(fevent[0]==0 && orbitpoints[fcount]. > 400){//ISS //距離式
      //  fevent[0]=1;
      /*  baloon.position=new Vector3(orbit.x,
                                    orbit.y,
                                    orbit.z);//balloonを位置へ
        //イベント読み込み
        
        //Stop();
        //
    //}
        /*
    else if(){//静止衛星軌道
    }
    else if(){//時間半分
    }
    else if(){//地球と月が同サイズ
    }
    else if(){//かぐやの軌道
    }
    */
    //index
   // controller.setCurrentTime(controller.model.)
    renderer.render(scene, camera);
    //if((is_stop==false) && (fcount< orbitpoints.length)){
            //fcount++;
      //  }
        
    };
    render();
    window.addEventListener('resize', function() {
                                renderer.setSize(window.innerWidth, window.innerHeight);
                                camera.aspect = window.innerWidth / window.innerHeight;
                                camera.updateProjectionMatrix();
    }, false );

}

earth_gl()