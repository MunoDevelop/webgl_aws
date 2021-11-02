import React from 'react';
import * as THREE from 'three';
import {DataTextureLoader} from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

class DrawBlock extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const width = (window.innerWidth - 1)/3;
        const height = (window.innerHeight - 1)/3;

        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(50, 2, 1, 1000);

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height);

        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;

        this.element.appendChild(renderer.domElement);

        //scene sky sphere part
        // let skyGeo = new THREE.SphereGeometry(65, 25, 25);
        // let loader  = new THREE.TextureLoader();
        // let texture = loader.load( "skDom.png" );
        // let skyMat = new THREE.MeshPhongMaterial({
        //     map: texture,
        // });
        // var sky = new THREE.Mesh(skyGeo, skyMat);
        //sky.material.side = THREE.BackSide;
        //scene.add(sky);

        scene.background = new THREE.CubeTextureLoader()
            .setPath( '' )
            .load( [
                'posX.png',
                'negX.png',
                'posY.png',
                'negY.png',
                'posZ.png',
                'negZ.png'

            ] )



        const wrampTexture = new THREE.TextureLoader().load('fiveTone.jpg');
        const geometry = new THREE.SphereGeometry(2,32,16);

        const baseColor = new THREE.Color("rgb(25, 165, 230)");
        let material = new THREE.MeshToonMaterial({color:baseColor,gradientMap:wrampTexture});
        //const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        this.scene.add(cube);

        const dirLight = new THREE.DirectionalLight( 0xffffff, 0.725 );
        dirLight.position.set( 0, 0, 1 ).normalize();
        this.scene.add( dirLight );


        this.camera.position.z = 5;
        const controls = new OrbitControls(camera, renderer.domElement );
        this.controls = controls;

        this.cube = cube;
        this.animate();
    }


    animate = () => {

        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;
        requestAnimationFrame(this.animate);
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }

    render() {
        return (
            <div ref={el => this.element = el} style={{ width: (window.innerWidth - 1)/3, height: (window.innerHeight - 1)/3, border: '1px solid red' }} />
        );
    }
}

export default DrawBlock;