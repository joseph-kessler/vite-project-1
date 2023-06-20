import * as THREE from 'three';
import "./Styles/style.css"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FlyControls } from 'three/addons/controls/FlyControls.js';
import gsap from 'gsap'

//Scene
const scene = new THREE.Scene()

//Create Textures
const material = new THREE.MeshStandardMaterial({
	color: "#3f7b9d",
	roughness: 0.5,
})
const material3 = new THREE.MeshBasicMaterial({ color: 0xD3D3D3, side: THREE.DoubleSide, opacity: 0.5, });
const active_material = new THREE.MeshBasicMaterial({ color: 0xffadad })
const texture = new THREE.TextureLoader().load("textures/water.jpg");
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(4, 4);
scene.background = texture

//Sizes
const Sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
}

//Light
const light = new THREE.AmbientLight(0xffffff); // soft white light
scene.add(light)

//Camera
const camera = new THREE.PerspectiveCamera(
	45,
	Sizes.width / Sizes.height,
	0.1,
	1000
)
camera.position.z = 20
scene.add(camera)

//Renderer
const canvas = document.querySelector(".webgl")
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(Sizes.width, Sizes.height)
renderer.setPixelRatio(2)
renderer.render(scene, camera)

//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = false
controls.autoRotateSpeed = 0

//Flight Controls
const flyControls = new FlyControls(camera, renderer.domElement);
flyControls.movementSpeed = 20;

//Resize
window.addEventListener('resize', () => {
	//Update Sizes
	Sizes.width = window.innerWidth
	Sizes.height = window.innerHeight
	//Update Camera

	camera.aspect = Sizes.width / Sizes.height
	camera.updateProjectionMatrix()
	renderer.setSize(Sizes.width, Sizes.height)
})

const loop = () => {
	controls.update()
	renderer.render(scene, camera)
	flyControls.update(.05)
	window.requestAnimationFrame(loop)
}
loop()

//Timeline Animates the GUI as well as the Sphere
const tl = gsap.timeline({ defaults: { duration: 1 } })
tl.fromTo('nav', { y: '-100%' }, { y: '0%' })
tl.fromTo('.title', { opacity: 0 }, { opacity: 1 })

//Raycaster
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
function onPointermove(event) {
	// calculate pointer position in normalized device coordinates
	// (-1 to +1) for both components
	pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
	pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;
	raycaster.setFromCamera(pointer, camera);
	const intersects = raycaster.intersectObjects(scene.children);

	var divElement = document.getElementById('dynamic');
	// Hide the div


	if (intersects.length > 0) {
		if (intersects[0].object.material == material) {
			// Unhide the div
			divElement.style.display = 'block';
			intersects[0].object.material = active_material;
		}
	}
	if (intersects.length <= 0) {
		divElement.style.display = 'none';
		scene.traverse((object) => {
			if (object.isMesh && object.material === active_material) {
				object.material = material;
			}
		});
	}
}
window.addEventListener('pointermove', onPointermove);
//window.requestAnimationFrame(render);



// Generated Tree Begins Here
