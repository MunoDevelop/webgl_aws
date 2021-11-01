import React from 'react';
import * as THREE from 'three';
import {DataTextureLoader} from "three";

class DrawBlock extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const width = (window.innerWidth - 1)/3;
        const height = (window.innerHeight - 1)/3;

        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(75, width / height, 1, 1000);

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height);

        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;

        this.element.appendChild(renderer.domElement);

        //scene env part
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
        const wrampTexture = new THREE.TextureLoader().load('toonramp.jpg');
        const geometry = new THREE.SphereGeometry(2,32,16);

        const baseColor = new THREE.Color('#2fb7e0');
        let material = new THREE.MeshToonMaterial({color:baseColor,gradientMap:wrampTexture});
        //const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        this.scene.add(cube);

        const dirLight = new THREE.DirectionalLight( 0xffffff, 0.725 );
        dirLight.position.set( 0, 0, 1 ).normalize();
        this.scene.add( dirLight );
        this.camera.position.z = 5;


        this.cube = cube;
        this.animate();
    }


    animate = () => {
        this.renderer.render(this.scene, this.camera);
        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;
        requestAnimationFrame(this.animate);
    }

    render() {
        return (
            <div ref={el => this.element = el} style={{ width: (window.innerWidth - 1)/3, height: (window.innerHeight - 1)/3, border: '1px solid red' }} />
        );
    }
}

export default DrawBlock;