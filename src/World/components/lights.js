// import { DirectionalLight, HemisphereLight } from 'three';

function createLights() {
    const ambientLight = new THREE.HemisphereLight('white', 'darkslategrey', 5);

    const mainLight = new THREE.DirectionalLight('white', 8);
    mainLight.position.set(10, 10, 10);

    return { ambientLight, mainLight };;
}

export { createLights };