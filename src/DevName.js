import React from 'react';
import * as THREE from 'three';
import {FontLoader} from "three/examples/jsm/loaders/FontLoader";
import {TextGeometry} from "three/examples/jsm/geometries/TextGeometry";
import './DevName.css';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

class DevName extends React.Component {
    constructor(props) {
        super(props);
    // this.state = {
    //
    //     }
    }

    componentDidMount() {
        // Camera setting
        const width = (window.innerWidth)/4;
        const height = (window.innerHeight )/4;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(100, width / height, 0.4, 1500);
        camera.position.set( 0, 30, 80 );
        //let cameraTarget = new THREE.Vector3( 0, 0, 0 );
        //camera.lookAt(cameraTarget);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height);
        //background
        scene.background = new THREE.CubeTextureLoader()
            .setPath( '' )
            .load( [
                'posx.jpg',
                'negx.jpg',
                'posy.jpg',
                'negy.jpg',
                'posz.jpg',
                'negz.jpg'
            ] )

        // LIGHTS
        const dirLight = new THREE.DirectionalLight( 0xffffff, 0.625 );
        dirLight.position.set( 0, 0, 1 ).normalize();
        scene.add( dirLight );

        // const pointLight = new THREE.PointLight( 0xffffff, 0.2 );
        // pointLight.position.set( 0, 0, 0 );
        // scene.add( pointLight );

        // FONT
        const loader = new FontLoader();
        var font;
        let text = "노문호";
        //console.log('Current directory: ' + window.location.href);
        loader.load('Do Hyeon_Regular.json',function(font){
            const baseColor = new THREE.Color('#2fb7e0');
            let textMaterial = new THREE.MeshToonMaterial({color:baseColor});
            //THREE.MeshBasicMaterial({color:0x035b59});
            let textGeo = new TextGeometry( text, {

                font: font,

                size: 50,
                height: 20,
                curveSegments: 4,

                bevelThickness: 2,
                bevelSize: 1.5,
                bevelEnabled: true

            } );

            textGeo.computeBoundingBox();

            const centerOffset = - 0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );

            let textMesh1 = new THREE.Mesh( textGeo, textMaterial );

            textMesh1.position.x = centerOffset;
            textMesh1.position.y = 0;
            textMesh1.position.z = 0;

            textMesh1.rotation.x = 0;
            textMesh1.rotation.y = Math.PI * 2;
            scene.add(textMesh1);
            this.textMesh1 = textMesh1;

        },null,null);



        this.element.appendChild(renderer.domElement);
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;

        const controls = new OrbitControls(camera, renderer.domElement );
        this.controls = controls;
        controls.target.set( 0, 0.5, 0 );

        controls.enablePan = false;
        controls.enableDamping = true;
        controls.update();

        this.animate();
        //console.log("did happen")
    };
    animate = () => {
        //this.textMesh1.rotation?
        //let tempMesh = this.textMesh1?;
        //this.textMesh1.rotation.set(0,0,0,'xyz')
        requestAnimationFrame(this.animate);
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }


    render() {
        return (
            <div className='DevName' ref={el => this.element = el} />
        );
    }
}

export default DevName;