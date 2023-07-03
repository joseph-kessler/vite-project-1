import * as THREE from 'three';
//Raycaster
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

function IntersectionCheck(event) {
	// calculate pointer position in normalized device coordinates
	// (-1 to +1) for both components
	pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
	pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;
	raycaster.setFromCamera(pointer, camera);
	const intersects = raycaster.intersectObjects(scene.children);
	var divElement = document.getElementById('dynamic');
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

export default IntersectionCheck;