import './style.css'
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

// initiate the scene
const scene = new THREE.Scene();

//initiate the camera for the view point of the user
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1 , 1000);

// initiate  the variable renderer to render the elements on the screen
const renderer = new THREE.WebGLRenderer({
  canvas : document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);

//setting the camera position
camera.position.setZ(30);

renderer.render(scene,camera);

// create a Torus
const geometry = new THREE.TorusGeometry(10,3,16 ,100);
// creating material for the Torus
const material = new THREE.MeshStandardMaterial({color:0xFF6347 });
// initiating the Torus and saving assign the material and the geometry  
const torus = new THREE.Mesh(geometry , material);

// Adding the Torus to the Scene
scene.add(torus)

// creating a simple point light to the scene
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(10,10,10);

// creating ambient Light to the scene
const ambientLight = new THREE.AmbientLight(0xffffff);

// adding the lighting to the scene
scene.add(pointLight ,ambientLight)

// creating helpers for better observation of the scene
const ligtHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200,50);

// adding the helper
scene.add(ligtHelper,gridHelper);

// adding controls to move the scene around to make it more responsive and better for testing
const controls = new OrbitControls(camera , renderer.domElement);

// adding random positioned starts to the scene
Array(200).fill().forEach(addStar);


animate();



function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.005;
  torus.rotation.y += 0.0009;
  torus.rotation.z += 0.005;

  controls.update();

  renderer.render(scene,camera);
  }

  function addStar(){
    const geometry = new THREE.SphereGeometry(0.25,24,24);
    const material = new THREE.MeshStandardMaterial({color:0xffffff});
    const star = new THREE.Mesh(geometry,material);

    const [x,y,z] = Array(3).fill().map(()=>THREE.MathUtils.randFloatSpread(100));
    star.position.set(x,y,z);
    scene.add(star);
  }
