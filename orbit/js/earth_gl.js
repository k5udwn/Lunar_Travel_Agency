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
var is_stop=false;
function resume(){
    is_stop=false;
    
}
function stop(){
    is_stop=true;
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
    //camera.position = new THREE.Vector3(0, 16, 0);
    camera.position = new THREE.Vector3(-10, 1, 2);
    //camera.lookAt(new THREE.Vector3(0, 0, 0));
    
    
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
    
    
    
    
    var geometry = new THREE.SphereGeometry(0.5, 32, 32);
    var material = new THREE.MeshPhongMaterial({
                                               color: 0xffffff, specular: 0xcccccc, shininess:50, ambient: 0xffffff,
                                               map: THREE.ImageUtils.loadTexture('images/earth2.jpg') });
    
    var earth = new THREE.Mesh(geometry, material);
    earth.doubleSided=true;
    //earth.rotation.y=168.0;
    earth.rotation.x=168.0;
    scene.add(earth);
    
    
    
    var geometry2 = new THREE.SphereGeometry((moon_r/earth_r)/2, 32, 16);
    var material2 = new THREE.MeshPhongMaterial({
                                                color: 0xffffff, specular: 0xcccccc, shininess:50, ambient: 0xffffff,
                                                map: THREE.ImageUtils.loadTexture('images/moon.png') });
    
    var moon = new THREE.Mesh(geometry2, material2);
    //moon.position = new THREE.Vector3(-365037.0/earth_d,6386.0/earth_d,-569.0/earth_d);
    moon.position = new THREE.Vector3(377037.0/earth_d,0,0);
    moon.rotation.y=12;
    scene.add(moon);
    
    //軌道を表示
    var point;
    var vect;
    var linepoint = new THREE.Geometry();
    var orbit;
    for(var i=0;i<controller.model.orbitList.length-1;i++){
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
        //console.log(i,orbit.x,orbit.y,orbit.z,orbit.earthDist,orbit.moonDist);
        //vect= new THREE.Vector3(i/2+0.5,i/2+0.5,i/2+0.5);
        
        linepoint.vertices.push( vect );
    }
    line = new THREE.Line(
                          linepoint,
                          new THREE.LineBasicMaterial( { color: 0xffff00, opacity: 1.0, linewidth: 1 } )
                          );
    scene.add( line );
    
    
    
    //座標軸
    var xpoints = new THREE.Geometry();
    xpoints.vertices.push( new THREE.Vector3( -10, 0, 0 ) );
    xpoints.vertices.push( new THREE.Vector3(  10, 0, 0 ) );
    linesMaterial = new THREE.LineBasicMaterial( {color: 0xff0000, linewidth: 1} );
    x_line= new THREE.Line(xpoints, linesMaterial);
    //scene.add( x_line );
    
    var ypoints = new THREE.Geometry();
    ypoints.vertices.push( new THREE.Vector3( 0, -10, 0 ) );
    ypoints.vertices.push( new THREE.Vector3( 0,  10, 0 ) );
    linesMaterial = new THREE.LineBasicMaterial( {color: 0x00ff00, linewidth: 1} );
    y_line= new THREE.Line(ypoints, linesMaterial);
    //scene.add( y_line );
    
    var zpoints = new THREE.Geometry();
    zpoints.vertices.push( new THREE.Vector3( 0, 0,  10 ) );
    zpoints.vertices.push( new THREE.Vector3( 0, 0, -10 ) );
    linesMaterial = new THREE.LineBasicMaterial( {color: 0x0000ff, linewidth: 1} );
    z_line= new THREE.Line(zpoints, linesMaterial);
    
    //  scene.add(z_line);
    var controls = new THREE.OrbitControls(camera);
    controls.center = new THREE.Vector3(0, 0, 0);
    var baseTime = +new Date;
    
    
    
    //Airliner
    var ag = new THREE.SphereGeometry(0.05, 20, 20);
    var am = new THREE.MeshPhongMaterial({
                                         color: 0xffffff, specular: 0xcccccc,ambient: 0xffffff,map: THREE.ImageUtils.loadTexture('images/shuttle1-2.png')});
    var Airliner = new THREE.Mesh(ag, am);
    scene.add(Airliner);
    
    var bg = new THREE.SphereGeometry(0.2, 16, 16);
    var bm = new THREE.MeshPhongMaterial({
                                         color: 0xffffff, specular: 0xcccccc,ambient: 0xffD400});
    
    var bl = new THREE.Mesh(bg, bm);
    scene.add(bl);
    //scene.add(balloon);
    var Nevent=0;
    var fcount=0;
    var limit=controller.model.orbitList.length;
    var orbit_index=limit-2;
    var fflash=0;
    var ffflash=0;
    var koushin=1;
    var fla=0;
    function render() {
        requestAnimationFrame(render);
        // カメラの状態を更新
        controls.update();
        if(koushin==1){
            var orbit2 = controller.model.orbitList[orbit_index];
            var orbit= controller.model.orbitList[fcount];
            //console.log(orbit2.earthDist);
            Airliner.position = new THREE.Vector3(orbit.x/earth_d,orbit.y/earth_d,orbit.z/earth_d);
            koushin=0;
            
            controller.setCurrentTime(orbit.time);
            
            earth.rotation.y = 0.3 * (+new Date - baseTime) / 1000;
            
            //イベント
            //
            if((Nevent==0 )&&(orbit2.earthDist > 400)){//ISS //距離式
                Nevent++;
                bl.position=new THREE.Vector3(orbit.x,orbit.y,orbit.z);//balloonを位置へ
                
                //イベント読み込み
                console.log("ISS");
                controller.dispatchEvent("ISS");
                stop();
            }
            else if(Nevent ==1 && orbit2.earthDist > 35786){//静止衛星軌道
                Nevent++;
                console.log(fcount,"seishi");
                controller.dispatchEvent("seishi");
                bl.position=new THREE.Vector3(orbit.x,orbit.y,orbit.z);
                stop();
            }
            
            else if(Nevent ==2 &&
                    (fcount > (limit-2)/2)){//時間半分
                Nevent++;
                bl.position=new THREE.Vector3(orbit.x,orbit.y,orbit.z);
                console.log(fcount,"hanbun");
                controller.dispatchEvent("hanbun");
                stop();
            }
            
            
            
            else if(Nevent==3 && orbit2.earthDist>earth_moon*4/5){//地球と月がだいたい同サイズ//Roughly
                Nevent++;
                bl.position=new THREE.Vector3(orbit.x,orbit.y,orbit.z);
                controller.dispatchEvent("onaji");
                console.log(fcount,"onaji");
                stop();
            }
            else if((Nevent==4) && (orbit2.moonDist < 100)){//かぐやの軌道
                Nevent++;
                bl.position=new THREE.Vector3(orbit.x,orbit.y,orbit.z);
                controller.dispatchEvent("kaguya");
                console.log("kaguya");
                stop();
            }
        }
        if( fcount==limit-3){
            console.log("end");
             controller.dispatchEvent("end");
        }
        /*
         //点滅する場合
         if((Nevent>0)&&//イベントが一回でも発生
         (is_stop==true)){
         if((+new Date - baseTime) >200*fla){
         ffflash=1;
         
         if(fflash==1){
         //サイズ大きく
         bl.scale.set( 2, 2, 2 );
         console.log(10);
         fflash=0;
         }
         else{
         //サイズ小さく
         bl.scale.set( 0.5, 0.5, 0.5 );
         fflash=1;
         }
         }
         }
         
         if(ffflash==1 && is_stop==false){
         bl.position=new Vector3(0,0,0);
         }*/
        //index
        
        renderer.render(scene, camera);
        /*if(((+new Date - baseTime)>200*fcount) && (fcount <limit-2) && (is_stop==false)){
         fcount++;
         orbit_index--;
         koushin=1;
         //console.log(fcount,limit);
         }*/
        if((+new Date - baseTime)>200*fla){
            fla++;
            if((fcount <limit-2)&&(is_stop==false)){
                fcount++;
                orbit_index--;
                koushin=1;
                
            }
        }
        
    };
    
    render();
    window.addEventListener('resize', function() {
                            renderer.setSize(window.innerWidth, window.innerHeight);
                            camera.aspect = window.innerWidth / window.innerHeight;
                            camera.updateProjectionMatrix();
                            }, false );
    
}

earth_gl()