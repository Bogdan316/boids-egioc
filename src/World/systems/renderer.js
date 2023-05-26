// import { WebGLRenderer } from 'three';

function createRenderer() {
  const renderer = new THREE.WebGLRenderer({ antialias: true });

  renderer.physicallyCorrectLights = true;
  renderer.autoClear = false;
  renderer.setClearColor(0x000000, 0.0);
  return renderer;
}

export { createRenderer };