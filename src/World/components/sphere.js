// import { SphereGeometry, MeshLambertMaterial, Mesh, AdditiveBlending, EdgesGeometry, LineSegments, LineBasicMaterial } from "three";

function createShpere(){
    const geometry = new THREE.SphereGeometry(1500, 100, 100);
    const material = new THREE.MeshLambertMaterial({
        color: 'white',
        transparent: true,
        opacity: 0.1,
        wireframe: false,
        depthWrite: false,
        blending: THREE.AdditiveBlending
    });
    const mesh = new THREE.Mesh(geometry, material);

    return mesh;
}

export { createShpere };