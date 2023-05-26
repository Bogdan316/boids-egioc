// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

function getModelAndClip(data, scale) {
  const model = data.scene.children[0];
  model.scale.set(scale, scale, scale);
  const clip = data.animations[0];

  return { model, clip };
}

async function loadStork() {
  const loader = new THREE.GLTFLoader();

  const parrotData = await loader.loadAsync('./assets/models/Parrot.glb');


  return getModelAndClip(parrotData, 30);

}

export { loadStork };