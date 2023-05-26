import { PerspectiveCamera } from 'three';

function createCamera() {
    const camera = new PerspectiveCamera(35, 1, 0.1, 100000);

    camera.position.set(0, 0, 2500);

    return camera;
}

export { createCamera };