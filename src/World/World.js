import { createCamera } from './components/camera.js';
import { createLights } from './components/lights.js';
import { createScene } from './components/scene.js';

import { createControls } from './systems/controls.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { Loop } from './systems/Loop.js';
import { loadStork } from './components/stork/stork';
import { Flock } from './components/stork/Flock.js';
import { createShpere } from './components/sphere.js';
import { Vector3 } from 'three';

let scene;
let controls;
let camera;
let renderer;
let loop;

class World {
    constructor(container) {
        camera = createCamera();
        scene = createScene();
        renderer = createRenderer();

        container.append(renderer.domElement);

        loop = new Loop(camera, scene, renderer);


        controls = createControls(camera, renderer.domElement);
        loop.updatables.push(controls);

        const { ambientLight, mainLight } = createLights();
        
        scene.add(ambientLight, mainLight);

        new Resizer(container, camera, renderer);
    }

    render() {
        renderer.render(scene, camera);
    }


    start() {
        loop.start();
    }

    stop() {
        loop.stop();
    }

    async init() {
        this.birds = await loadStork();
        this.flock = new Flock(this.birds);
        loop.updatables.push(this.flock);

        const cube = createShpere();        
        cube.add(this.flock);

        scene.add(cube);
    }

    restart(){
        this.flock.renderBoids();
        this.render();
    }
}

export { World };
