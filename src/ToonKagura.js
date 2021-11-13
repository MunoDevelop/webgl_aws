import React from 'react';
import * as THREE from 'three';
import {FontLoader} from "three/examples/jsm/loaders/FontLoader";
import {TextGeometry} from "three/examples/jsm/geometries/TextGeometry";
import './ToonKagura.css';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {Reflector} from "three/examples/jsm/objects/Reflector";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import {UnrealBloomPass} from "three/examples/jsm/postprocessing/UnrealBloomPass";
import {RenderPass} from "three/examples/jsm/postprocessing/RenderPass";
//import {GlitchPass} from "three/examples/jsm/postprocessing/GlitchPass";
import {FBXLoader} from "three/examples/jsm/loaders/FBXLoader";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

var kaguraObj;
var myConsole;
var elementInstance;
var animMixer;
class ToonKagura extends React.Component {
    //when component need updated by new props
    constructor(props) {
        super(props);
        // this.state = {
        //
        //     }
    }

    componentDidMount() {
        elementInstance = this;
        myConsole = console;

        // Camera setting
        const width = (window.innerWidth)/2;
        const height = (window.innerHeight )/2;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(65, 2, 0.4, 1500);
        camera.position.set( 0, 200, 190 );
        //let cameraTarget = new THREE.Vector3( 0, 0, 0 );
        //camera.lookAt(cameraTarget);
        const renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setSize(width, height);
        this.renderer = renderer;



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
            ] );

        // LIGHTS
        const tinkerbellGeo = new THREE.SphereGeometry(2,32,16);

        const tinkerbellMat = new THREE.MeshBasicMaterial({});

        const tinkerbell = new THREE.PointLight( 0xffee88, 4,100);
        const tinkerbellMesh = new THREE.Mesh( tinkerbellGeo, tinkerbellMat );

        tinkerbell.add(tinkerbellMesh);
        tinkerbell.castShadow = true;
        //tinkerbell.castShadow = true;
        scene.add( tinkerbell );
        this.tinkerbell = tinkerbell;
        this.tinkebellPosX = 0;
        this.tinkebellPosZ = 0;
        this.tinkebellAng = 0;

        // const pointLight = new THREE.PointLight( 0xffffff, 0.2 );
        // pointLight.position.set( 0, 0, 0 );
        // scene.add( pointLight );

        // PLANE PART

        const plane_geometry = new THREE.PlaneGeometry( 300, 200 );
        const plane_material = new THREE.MeshBasicMaterial( {color: 0xffffff, opacity:0.5,transparent:true} );
        const plane = new THREE.Mesh( plane_geometry, plane_material );
        //const plane = new Reflector(plane_geometry,{clipBias:0.003,color:new THREE.Color(0xFFFFFF)});
        plane.position.set(0,-5,0);
        plane.rotateX(-1.5708);
        scene.add( plane );

        // loadFbx part
        //var kaguraObj;
        const loader = new FBXLoader();
        loader.load( './UnityCHanKAGURA.fbx', function ( obj ) {
            scene.add( obj );
            kaguraObj = obj;
            elementInstance.loadAni();

        } );

        this.element.appendChild(renderer.domElement);
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;

        const controls = new OrbitControls(camera, renderer.domElement );
        this.controls = controls;
        controls.target.set( 0, 100, 0 );

        controls.enablePan = false;
        controls.enableDamping = true;
        controls.update();

        //postProcess
        const composer = new EffectComposer(renderer);
        this.composer = composer;
        const renderPass = new RenderPass( scene, camera );
        //const tempV2 = new THREE.Vector2(64,64);
        const bloomPass =  new UnrealBloomPass(undefined,0.01,0);

        //const glitchPass = new GlitchPass();
        //renderPass.renderToScreen = true;
        //bloomPass.renderToScreen = true;
        composer.addPass( renderPass );
        //composer.addPass(glitchPass);
        composer.addPass( bloomPass );



        this.animate();
        //console.log("did happen")
    };

    applyTexture(){
        //set mat texture part

    }


    loadAni = () =>{
        //load anim and play part

        const animLoader = new FBXLoader();
        animLoader.load( './ani.fbx', function ( obj ) {
            kaguraObj.animations = obj.animations;
            myConsole.log(kaguraObj.animations.length);
            animMixer = new THREE.AnimationMixer( kaguraObj );
            const action = animMixer.clipAction(kaguraObj.animations[ 0 ]);
            //myConsole.log(kaguraObj.animations[0].name);
            // kaguraObj.traverse( function ( object ) {
            //
            //     if ( object.isMesh ) {
            //         myConsole.log(object.name);
            //     }
            //
            // } );

            action.play();
        } );
    }




    animate = () => {
        //this.textMesh1.rotation?
        //let tempMesh = this.textMesh1?;
        //this.textMesh1.rotation.set(0,0,0,'xyz')
        requestAnimationFrame(this.animate);
        animMixer?.update(0.02)

        this.controls.update();
        this.tinkebellAng -= 0.05;
        this.tinkebellAng %=360;
        this.tinkebellPosX = 200 * Math.cos(this.tinkebellAng);
        this.tinkebellPosZ = 80 * Math.sin(this.tinkebellAng);
        this.tinkerbell.position.set(this.tinkebellPosX,130,this.tinkebellPosZ);

        //this.renderer.render(this.scene,this.camera);


        this.composer.render(this.scene, this.camera);
    }


    render() {
        return (
            <div className='ToonKagura' ref={el => this.element = el} />
        );
    }
}

export default ToonKagura;