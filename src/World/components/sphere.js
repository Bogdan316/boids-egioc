import { SphereGeometry, MeshLambertMaterial, Mesh, AdditiveBlending, EdgesGeometry, LineSegments, LineBasicMaterial } from "three";
import { constants } from "../../../constants/constants";

function createShpere(){
    const geometry = new SphereGeometry(1500, 100, 100);
    const material = new MeshLambertMaterial({
        color: 'white',
        transparent: true,
        opacity: 0.2,
        wireframe: false,
        depthWrite: false,
        blending: AdditiveBlending
    });
    const mesh = new Mesh(geometry, material);

    return mesh;
}

export { createShpere };