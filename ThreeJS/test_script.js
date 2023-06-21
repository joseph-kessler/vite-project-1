import * as THREE from 'three';
import "../Styles/style.css"
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
const Main_Menu_geometry = new THREE.SphereGeometry(2.5, 16, 8);
const Main_Menu_mesh = new THREE.Mesh(Main_Menu_geometry, material);
Main_Menu_mesh.position.set(0, 0, 0);
scene.add(Main_Menu_mesh)
const Main_Menu_connection_0 = new THREE.BufferGeometry()
const Main_Menu_connection_0_vertices = new Float32Array([
	0, 1, -1, // v0
	0, 1, 1, // v1
	10, 11, 1, // v2

	10, 11, 1, // v3
	10, 9, 1, // v4
	0, 1, -1  // v5
]);
Main_Menu_connection_0.setAttribute('position', new THREE.BufferAttribute(Main_Menu_connection_0_vertices, 3));
const Main_Menu_connection_0_mesh = new THREE.Mesh(Main_Menu_connection_0, material3);
scene.add(Main_Menu_connection_0_mesh)
const Login_geometry = new THREE.SphereGeometry(2.5, 16, 8);
const Login_mesh = new THREE.Mesh(Login_geometry, material);
Login_mesh.position.set(10, 10, 0);
scene.add(Login_mesh)
const Login_connection_0 = new THREE.BufferGeometry()
const Login_connection_0_vertices = new Float32Array([
	10, 11, -1, // v0
	10, 11, 1, // v1
	20, 11, 11, // v2

	20, 11, 11, // v3
	20, 9, 11, // v4
	10, 11, -1  // v5
]);
Login_connection_0.setAttribute('position', new THREE.BufferAttribute(Login_connection_0_vertices, 3));
const Login_connection_0_mesh = new THREE.Mesh(Login_connection_0, material3);
scene.add(Login_connection_0_mesh)
const Pay_Stubs_geometry = new THREE.SphereGeometry(2.5, 16, 8);
const Pay_Stubs_mesh = new THREE.Mesh(Pay_Stubs_geometry, material);
Pay_Stubs_mesh.position.set(20, 10, 10);
scene.add(Pay_Stubs_mesh)
const Login_connection_1 = new THREE.BufferGeometry()
const Login_connection_1_vertices = new Float32Array([
	10, 11, -1, // v0
	10, 11, 1, // v1
	20, 11, 21, // v2

	20, 11, 21, // v3
	20, 9, 21, // v4
	10, 11, -1  // v5
]);
Login_connection_1.setAttribute('position', new THREE.BufferAttribute(Login_connection_1_vertices, 3));
const Login_connection_1_mesh = new THREE.Mesh(Login_connection_1, material3);
scene.add(Login_connection_1_mesh)
const Paid_Time_off_geometry = new THREE.SphereGeometry(2.5, 16, 8);
const Paid_Time_off_mesh = new THREE.Mesh(Paid_Time_off_geometry, material);
Paid_Time_off_mesh.position.set(20, 10, 20);
scene.add(Paid_Time_off_mesh)
const Login_connection_2 = new THREE.BufferGeometry()
const Login_connection_2_vertices = new Float32Array([
	10, 11, -1, // v0
	10, 11, 1, // v1
	20, 11, 31, // v2

	20, 11, 31, // v3
	20, 9, 31, // v4
	10, 11, -1  // v5
]);
Login_connection_2.setAttribute('position', new THREE.BufferAttribute(Login_connection_2_vertices, 3));
const Login_connection_2_mesh = new THREE.Mesh(Login_connection_2, material3);
scene.add(Login_connection_2_mesh)
const Request_Leave_geometry = new THREE.SphereGeometry(2.5, 16, 8);
const Request_Leave_mesh = new THREE.Mesh(Request_Leave_geometry, material);
Request_Leave_mesh.position.set(20, 10, 30);
scene.add(Request_Leave_mesh)
const Main_Menu_connection_1 = new THREE.BufferGeometry()
const Main_Menu_connection_1_vertices = new Float32Array([
	0, 1, -1, // v0
	0, 1, 1, // v1
	10, 21, 1, // v2

	10, 21, 1, // v3
	10, 19, 1, // v4
	0, 1, -1  // v5
]);
Main_Menu_connection_1.setAttribute('position', new THREE.BufferAttribute(Main_Menu_connection_1_vertices, 3));
const Main_Menu_connection_1_mesh = new THREE.Mesh(Main_Menu_connection_1, material3);
scene.add(Main_Menu_connection_1_mesh)
const News_geometry = new THREE.SphereGeometry(2.5, 16, 8);
const News_mesh = new THREE.Mesh(News_geometry, material);
News_mesh.position.set(10, 20, 0);
scene.add(News_mesh)
const Main_Menu_connection_2 = new THREE.BufferGeometry()
const Main_Menu_connection_2_vertices = new Float32Array([
	0, 1, -1, // v0
	0, 1, 1, // v1
	10, 31, 1, // v2

	10, 31, 1, // v3
	10, 29, 1, // v4
	0, 1, -1  // v5
]);
Main_Menu_connection_2.setAttribute('position', new THREE.BufferAttribute(Main_Menu_connection_2_vertices, 3));
const Main_Menu_connection_2_mesh = new THREE.Mesh(Main_Menu_connection_2, material3);
scene.add(Main_Menu_connection_2_mesh)
const Admin_geometry = new THREE.SphereGeometry(2.5, 16, 8);
const Admin_mesh = new THREE.Mesh(Admin_geometry, material);
Admin_mesh.position.set(10, 30, 0);
scene.add(Admin_mesh)
const Admin_connection_0 = new THREE.BufferGeometry()
const Admin_connection_0_vertices = new Float32Array([
	10, 31, -1, // v0
	10, 31, 1, // v1
	20, 31, 11, // v2

	20, 31, 11, // v3
	20, 29, 11, // v4
	10, 31, -1  // v5
]);
Admin_connection_0.setAttribute('position', new THREE.BufferAttribute(Admin_connection_0_vertices, 3));
const Admin_connection_0_mesh = new THREE.Mesh(Admin_connection_0, material3);
scene.add(Admin_connection_0_mesh)
const Payroll_geometry = new THREE.SphereGeometry(2.5, 16, 8);
const Payroll_mesh = new THREE.Mesh(Payroll_geometry, material);
Payroll_mesh.position.set(20, 30, 10);
scene.add(Payroll_mesh)
const Payroll_connection_0 = new THREE.BufferGeometry()
const Payroll_connection_0_vertices = new Float32Array([
	20, 31, 9, // v0
	20, 31, 11, // v1
	30, 41, 11, // v2

	30, 41, 11, // v3
	30, 39, 11, // v4
	20, 31, 9  // v5
]);
Payroll_connection_0.setAttribute('position', new THREE.BufferAttribute(Payroll_connection_0_vertices, 3));
const Payroll_connection_0_mesh = new THREE.Mesh(Payroll_connection_0, material3);
scene.add(Payroll_connection_0_mesh)
const Dollars_geometry = new THREE.SphereGeometry(2.5, 16, 8);
const Dollars_mesh = new THREE.Mesh(Dollars_geometry, material);
Dollars_mesh.position.set(30, 40, 10);
scene.add(Dollars_mesh)
const Payroll_connection_1 = new THREE.BufferGeometry()
const Payroll_connection_1_vertices = new Float32Array([
	20, 31, 9, // v0
	20, 31, 11, // v1
	30, 51, 11, // v2

	30, 51, 11, // v3
	30, 49, 11, // v4
	20, 31, 9  // v5
]);
Payroll_connection_1.setAttribute('position', new THREE.BufferAttribute(Payroll_connection_1_vertices, 3));
const Payroll_connection_1_mesh = new THREE.Mesh(Payroll_connection_1, material3);
scene.add(Payroll_connection_1_mesh)
const Cents_geometry = new THREE.SphereGeometry(2.5, 16, 8);
const Cents_mesh = new THREE.Mesh(Cents_geometry, material);
Cents_mesh.position.set(30, 50, 10);
scene.add(Cents_mesh)
const Payroll_connection_2 = new THREE.BufferGeometry()
const Payroll_connection_2_vertices = new Float32Array([
	20, 31, 9, // v0
	20, 31, 11, // v1
	30, 61, 11, // v2

	30, 61, 11, // v3
	30, 59, 11, // v4
	20, 31, 9  // v5
]);
Payroll_connection_2.setAttribute('position', new THREE.BufferAttribute(Payroll_connection_2_vertices, 3));
const Payroll_connection_2_mesh = new THREE.Mesh(Payroll_connection_2, material3);
scene.add(Payroll_connection_2_mesh)
const Checks_geometry = new THREE.SphereGeometry(2.5, 16, 8);
const Checks_mesh = new THREE.Mesh(Checks_geometry, material);
Checks_mesh.position.set(30, 60, 10);
scene.add(Checks_mesh)
const Admin_connection_1 = new THREE.BufferGeometry()
const Admin_connection_1_vertices = new Float32Array([
	10, 31, -1, // v0
	10, 31, 1, // v1
	20, 31, 21, // v2

	20, 31, 21, // v3
	20, 29, 21, // v4
	10, 31, -1  // v5
]);
Admin_connection_1.setAttribute('position', new THREE.BufferAttribute(Admin_connection_1_vertices, 3));
const Admin_connection_1_mesh = new THREE.Mesh(Admin_connection_1, material3);
scene.add(Admin_connection_1_mesh)
const Add_User_geometry = new THREE.SphereGeometry(2.5, 16, 8);
const Add_User_mesh = new THREE.Mesh(Add_User_geometry, material);
Add_User_mesh.position.set(20, 30, 20);
scene.add(Add_User_mesh)
const Admin_connection_2 = new THREE.BufferGeometry()
const Admin_connection_2_vertices = new Float32Array([
	10, 31, -1, // v0
	10, 31, 1, // v1
	20, 31, 31, // v2

	20, 31, 31, // v3
	20, 29, 31, // v4
	10, 31, -1  // v5
]);
Admin_connection_2.setAttribute('position', new THREE.BufferAttribute(Admin_connection_2_vertices, 3));
const Admin_connection_2_mesh = new THREE.Mesh(Admin_connection_2, material3);
scene.add(Admin_connection_2_mesh)
const Schedule_Maker_geometry = new THREE.SphereGeometry(2.5, 16, 8);
const Schedule_Maker_mesh = new THREE.Mesh(Schedule_Maker_geometry, material);
Schedule_Maker_mesh.position.set(20, 30, 30);
scene.add(Schedule_Maker_mesh)
