import React, { Component } from "react";
import * as THREE from "three";
import OrbitControls from 'three-orbitcontrols'
import { Button } from 'antd';


class ThreeScene extends Component {
  constructor(props) {
    super(props);
    this.myFunc=this.myFunc.bind(this)
    this.onDocumentMouseMove=this.onDocumentMouseMove.bind(this)
    this.getIntersects=this.getIntersects.bind(this)
    this.animate=this.animate.bind(this)
    this.state={value:false}
  }

  componentDidMount() {

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.selectedObject = null;

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

    this.raycaster.setFromCamera( this.mouse, this.camera );

    //ADD CONTROLS
    this.controls = new OrbitControls( this.camera, this.renderer.domElement );
    this.controls.enableZoom = false;
    this.controls.enablePan = false;
    this.	controls.enableDamping = true;
    this.controls.rotateSpeed = - 0.25;
		window.addEventListener( "mousemove", this.onDocumentMouseMove, false );
    window.addEventListener( 'resize', this.onWindowResize, false );
    this.animate()
  }

  onDocumentMouseMove( event ) {
    if (this.state.value) {
      event.preventDefault();
			if ( this.selectedObject ) {
				this.selectedObject.material.color.set( '#ffa000' );
				this.selectedObject = null;
			}
			var intersects = this.getIntersects( event.layerX, event.layerY );
			if ( intersects.length > 0 ) {
				var res = intersects.filter( function ( res ) {
					return res && res.object;
				} )[ 0 ];
				if ( res && res.object ) {
					this.selectedObject = res.object;
          this.selectedObject.material.color.set( '#1a237e' );
				}
			}
    }
  }
  getIntersects( x, y ) {
		x = ( x / window.innerWidth ) * 2 - 1;
		y = - ( y / window.innerHeight ) * 2 + 1;
		this.mouse.set( x, y, 0.5 );
		this.raycaster.setFromCamera( this.mouse, this.camera );
		return this.raycaster.intersectObject( this.scene.children[1], true );
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
