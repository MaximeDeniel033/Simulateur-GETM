import * as THREE from 'three';
import { FlyControls } from 'three/addons/controls/FlyControls.js';

const CAM_FOV = 60, CAM_NEAR = 0.1, CAM_FAR = 1000;
const ROLL_SPEED = 0.5; // Vitesse de roulis pour le contrôle

const view = document.getElementById('view');

// Vérifie si l'élément canvas est trouvé
if (!view) {
    console.error("L'élément #view est introuvable !");
}

// Fonction de mise à jour de la taille du canvas
function updateCanvasSize() {
    view.width = view.clientWidth;
    view.height = view.clientHeight;
}
updateCanvasSize();

// Création de la caméra
const camera = new THREE.PerspectiveCamera(CAM_FOV, view.clientWidth / view.clientHeight, CAM_NEAR, CAM_FAR);
camera.position.set(0, 100, 0); // Position initiale

// Création de la scène
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB); // Bleu ciel

// Création du rendu WebGL
const renderer = new THREE.WebGLRenderer({ canvas: view, antialias: true });
function resizeRenderer() {
    const width = view.clientWidth;
    const height = view.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}
window.addEventListener('resize', resizeRenderer);
resizeRenderer();

// Ajout du sol
const GROUND_SIZE = 10000;
const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(GROUND_SIZE, GROUND_SIZE),
    new THREE.MeshStandardMaterial({ color: 0x228B22 }) // Vert forêt
);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Ajout de la lumière
const light = new THREE.AmbientLight(0xFFFFFF);
scene.add(light);

// Initialisation des contrôles FlyControls
const controls = new FlyControls(camera, renderer.domElement);
controls.dragToLook = true;
controls.rollSpeed = ROLL_SPEED;

const clock = new THREE.Clock();

// Boucle d'animation
function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    controls.update(delta);
    renderer.render(scene, camera);
}

// Démarrer l'animation
animate();
camera.lookAt(new THREE.Vector3(0, 100, -1)); // Oriente la caméra vers l'avant
