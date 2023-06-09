// import { Clock } from "three";

const clock = new THREE.Clock();

class Loop {
  constructor(camera, scene, renderer) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.updatables = [];
  }

  start() {
    this.renderer.setAnimationLoop(() => {
        this.tick();

        this.renderer.render(this.scene, this.camera)
    });
  }

  stop() {
    this.renderer.setAnimationLoop(null);
  }

  tick() {
    const delta = clock.getDelta();
    
    for(const obj of this.updatables){
        obj.tick(delta);
    }
  }
}

export { Loop };