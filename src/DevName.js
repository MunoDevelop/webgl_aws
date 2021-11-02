import React from 'react';
import * as THREE from 'three';
import {FontLoader} from "three/examples/jsm/loaders/FontLoader";
import {TextGeometry} from "three/examples/jsm/geometries/TextGeometry";
import './DevName.css';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {Reflector} from "three/examples/jsm/objects/Reflector";

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
        const camera = new THREE.PerspectiveCamera(65, 2, 0.4, 1500);
        camera.position.set( 0, 30, 170 );
        //let cameraTarget = new THREE.Vector3( 0, 0, 0 );
        //camera.lookAt(cameraTarget);
        const renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setSize(width, height);
        //background
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

        // LIGHTS
        // const dirLight = new THREE.DirectionalLight( 0xffffff, 0 );
        // dirLight.position.set( 0, 0, 1 ).normalize();
        // scene.add( dirLight );

        const tinkerbellGeo = new THREE.SphereGeometry(2,32,16);

        const tinkerbellMat = new THREE.MeshBasicMaterial({});

        const tinkerbell = new THREE.PointLight( 0xffee88, 4,100);
        const tinkerbellMesh = new THREE.Mesh( tinkerbellGeo, tinkerbellMat );

        tinkerbell.add(tinkerbellMesh);
        tinkerbell.castShadow = true;
        //tinkerbell.castShadow = true;
        scene.add( tinkerbell );
        //tinkerbell.target.position.set(0, 0, 0);
        //scene.add(tinkerbell.target);
        //tinkerbell.position.set(0,50,100);
        //const helper = new THREE.DirectionalLightHelper(tinkerbell);
        //scene.add(helper);
        //tinkerbell.target.updateMatrixWorld();
        //helper.update();
        this.tinkerbell = tinkerbell;
        this.tinkebellPosX = 0;
        this.tinkebellPosZ = 0;
        this.tinkebellAng = 0;

        // const pointLight = new THREE.PointLight( 0xffffff, 0.2 );
        // pointLight.position.set( 0, 0, 0 );
        // scene.add( pointLight );

        // TEXT PART
        const loader = new FontLoader();
        var font;
        let text = "노문호";
        const baseColor = new THREE.Color("hsl(181,82%,47%)");
        const wrampTexture = new THREE.TextureLoader().load('fiveTone.jpg');
        // const TileBaseTexture = new THREE.TextureLoader().load('TileTex.jpg');
        // const TileNormalTexture = new THREE.TextureLoader().load('TileTex_Normal.jpg');
        wrampTexture.minFilter = THREE.NearestFilter;
        wrampTexture.magFilter = THREE.NearestFilter;
        //wrampTexture.minFilter = THREE.NearestFilter;
        //wrampTexture.magFilter = THREE.NearestFilter;
        let textMaterial = new THREE.MeshToonMaterial({color:baseColor,gradientMap:wrampTexture});
        //console.log('Current directory: ' + window.location.href);
        loader.load('Do Hyeon_Regular.json',function(font){
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

        // PLANE PART

        const plane_geometry = new THREE.PlaneGeometry( 300, 200 );
        //const plane_material = new THREE.MeshBasicMaterial( {color: 0xffffff, opacity:0.5,transparent:true} );
        //const plane = new THREE.Mesh( plane_geometry, plane_material );
        const vertialMirror = new Reflector(plane_geometry,{clipBias:0.003,color:new THREE.Color(0xFFFFFF)});
        vertialMirror.position.set(0,-5,0);
        vertialMirror.rotateX(-1.5708);
        scene.add( vertialMirror );




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
        this.tinkebellAng -= 0.05;
        this.tinkebellAng %=360;
        this.tinkebellPosX = 200 * Math.cos(this.tinkebellAng);
        this.tinkebellPosZ = 80 * Math.sin(this.tinkebellAng);
        this.tinkerbell.position.set(this.tinkebellPosX,40,this.tinkebellPosZ);




        this.renderer.render(this.scene, this.camera);
    }


    render() {
        return (
            <div className='DevName' ref={el => this.element = el} />
        );
    }
}

export default DevName;