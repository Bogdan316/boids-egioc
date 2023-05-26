import { constants } from '../constants/constants.js';
import { World } from './World/World.js';
import * as dat from 'dat.gui';

let gui = new dat.GUI();

async function main() {
    const container = document.querySelector('#scene-container');

    const world = new World(container);

    let guiControls = new function () {
        this.disperse = () => {
            world.flock.disperse();
        }
        this.restart = () => world.restart();
    }

    
    gui.add(constants, 'MAX_BOIDS', 50, 800)
        .onFinishChange((_) => world.restart())
        .name("Number");
    gui.add(constants, 'DISPERSION', 0.1, 0.5).name("Dispersion");
    gui.add(constants, 'RANGE', 100, 500).name("Visual Range");
    gui.add(guiControls, "disperse").name("Disperse");
    gui.add(guiControls, "restart").name("Reset");
    await world.init();

    world.start();
}

main().catch((err) => {
    console.error(err);
});