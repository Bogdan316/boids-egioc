// import { Group, SphereGeometry, MeshBasicMaterial, AdditiveBlending, Mesh, PointLight } from 'three';

class CenterLight extends Group{
    constructor(radius = 500, widthSegments = 100, heightSegments = 100, color = 0xFFFFFF) {
        super();
        // outer ball
        let geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
        let material = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: 0.6,
            depthWrite: false,
            blending: AdditiveBlending
        });
        this.ball1 = new THREE.Mesh(geometry, material);
        this.ball1.position.set(0, 0, 0);

        // center ball
        geometry = new THREE.SphereGeometry(30, 30, 30);
        material = new THREE.MeshBasicMaterial({
            color: 0xffffff
        });
        this.ball2 = new Mesh(geometry, material);
        this.ball2.position.set(0, 0, 0);

        // point light
        this.pointLight = this.getPointLight(radius);

        this.add(this.ball1);
        this.add(this.ball2);
        this.add(this.pointLight);
    }
    getPointLight(distance) {
        const pointLight = new THREE.PointLight(0xffffff);
        pointLight.intensity = 10;
        pointLight.distance = distance * 6;
        pointLight.decay = 3.5;
        pointLight.position.set(0, 0, 0);
        return pointLight;
    }
}

export { CenterLight };