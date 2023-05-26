// import { AnimationMixer, Vector3, MathUtils, Object3D } from "three";

const getRandomNum = (max = 0, min = 0) => Math.floor(Math.random() * (max + 1 - min)) + min;


class Boid extends THREE.Object3D {
  constructor(model, clip) {
    super();

    this.model = model.clone();

    this.velocity = new THREE.Vector3(getRandomNum(100, -100) * 0.1, getRandomNum(100, -100) * 0.1, getRandomNum(100, -100) * 0.1);;
    this.boost = new THREE.Vector3(0, 0, 0);
    this.acceleration = new THREE.Vector3(this.model);

    this.mixer = new THREE.AnimationMixer(this.model);
    const action = this.mixer.clipAction(clip);

    // start animations at a random time
    action.startAt(Math.random())
    action.play();

    const radius = getRandomNum(500, 1000);
    const theta = THREE.MathUtils.degToRad(getRandomNum(180));
    const phi = THREE.MathUtils.degToRad(getRandomNum(360));

    this.position.y = Math.sin(theta) * Math.sin(phi) * radius;
    this.position.x = Math.sin(theta) * Math.cos(phi) * radius;
    this.position.z = Math.cos(theta) * radius;

    this.model.geometry.computeBoundingSphere();
    this.boundingSphere = this.model.geometry.boundingSphere;

    this.add(this.model);
  }

  tick(delta) {
    this.mixer.update(delta);
  }
}

export { Boid };