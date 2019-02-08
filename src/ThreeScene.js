import React, { Component } from "react";
import * as THREE from "three";
import OrbitControls from 'three-orbitcontrols'
import { Button } from 'antd';


class ThreeScene extends Component {
  constructor(props) {
    super(props);
    this.myFunc=this.myFunc.bind(this)
    this.animate=this.animate.bind(this)
    this.state={value:false}
  }

  componentDidMount() {


    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;
    //ADD SCENE
    this.scene = new THREE.Scene();
    //ADD CAMERA
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 0.01;

    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor("#263238");
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize(width, height);
    this.mount.appendChild(this.renderer.domElement);

    //ADD SPHERE
    const geometry =new THREE.SphereBufferGeometry( 500, 60, 40 );
    geometry.scale( - 1, 1, 1 );
    this. material =  new THREE.MeshBasicMaterial( {
					map: new THREE.TextureLoader().load( '10.jpg' )
				} );
    this.cube = new THREE.Mesh(geometry, this.material);
    this.scene.add(this.cube);


    //ADD CONTROLS
    this.controls = new OrbitControls( this.camera, this.renderer.domElement );
    this.controls.enableZoom = false;
    this.controls.enablePan = false;
    this.	controls.enableDamping = true;
    this.controls.rotateSpeed = - 0.25;
    window.addEventListener( 'resize', this.onWindowResize, false );
    this.animate()
  }



  myFunc(){
    if (!this.state.value) {
      var geometryq = new THREE.BoxBufferGeometry( 25, 25, 25 );
      var materialq =new THREE.PointsMaterial( { color: '#ffa000' } );
      this.cubeA = new THREE.Mesh( geometryq, materialq );

      this.camera.add(this.cubeA);
      this.cubeA.position.set(0,1,-50);
      this.scene.add(this.camera)
      this.setState({value:true})
    }
  }
  onWindowResize =()=> {
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize( window.innerWidth, window.innerHeight );
	}

  animate=()=> {
		requestAnimationFrame( this.animate );
    if (this.state.value) {
      // this.cubeA.rotation.x += 0.005;
      this.cubeA.rotation.y += 0.01;
    }
    this.controls.update();
    this.renderer.render( this.scene, this.camera );
	}


  render() {
    return (
      <div
        style={{ width: "100vw", height: "100vh" }}
        ref={mount => {
          this.mount = mount;
        }}
      >
        <Button onClick={this.myFunc}  style={{position:'absolute',top:'10%',right:'10%',color:'blue'}}>Generate Cube</Button>
      </div>
    );
  }
}
export default ThreeScene;
