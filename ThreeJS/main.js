import * as THREE from 'three';
import "./style.css"
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'

function onDocumentMouseDown(event) {

    event.preventDefault();

    mouseYOnMouseDown = event.clientY - windowHalfY;
    mouseXOnMouseDown = event.clientX - windowHalfX;

    var vector = new THREE.Vector3((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1, 0.5);
    vector = vector.unproject(camera);

    var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
    var intersects = raycaster.intersectObjects(circleObj, true); // Circle element which you want to identify

    if (intersects.length > 0) {
        alert("Mouse on Circle");
    }

}

//Scene
const scene = new THREE.Scene()

//Create Sphere
const geometry = new THREE.SphereGeometry(3, 64, 64)
const material = new THREE.MeshStandardMaterial({
    color: "#FF0000",
    roughness: 0.5,
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

//Sizes
const Sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

//Light
//const light = new THREE.PointLight(0xffffff, 1, 100)
//light.position.set(0, 10, 10)
//light.intensity = 1.25
const light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add(light)

//Camera
const camera = new THREE.PerspectiveCamera(
    45,
    Sizes.width / Sizes.height,
    0.1,
    100
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
controls.autoRotate = true
controls.autoRotateSpeed = 5

//Resize
window.addEventListener('resize', () => {
    //Update Sizes
    console.log(Window.innerWidth)
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
    window.requestAnimationFrame(loop)
}
loop()

//Timeline Animates the GUI as well as the Sphere
const tl = gsap.timeline({defaults: {duration: 1}})
tl.fromTo(mesh.scale,{z:0, x:0, y:0}, {z:1, x:1, y:1})
tl.fromTo('nav', {y:'-100%'},{y:'0%'})
tl.fromTo('.title', {opacity: 0},{opacity: 1})

//Mouse Animation Color
let mouseDown = false
let rgb =[];
window.addEventListener('mousedown', () => (mouseDown = true))
window.addEventListener('mouseup', () => (mouseDown = false))
//window.onDocumentMouseDown('mousedown')
window.addEventListener('mousemove', (e) => {
    if(mouseDown)
    {
      rgb = [
        Math.round((e.pageX / Sizes.width) * 255),
        Math.round((e.pageY / Sizes.height) * 255),
        150
      ]
      //Animate
      let newColor = new THREE.Color(`rgb(${rgb.join(",")})`)
      gsap.to(mesh.material.color, {
        r: newColor.r, 
        g: newColor.g, 
        b:newColor.b
     })
    }
})