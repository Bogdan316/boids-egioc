// import { Group, MathUtils, Vector3 } from 'three';
import { Boid } from './setupModel';
import { constants } from '../../../../constants/constants';

const getRandomNum = (max = 0, min = 0) => Math.floor(Math.random() * (max + 1 - min)) + min;

const effectiveRange = 70;
const maxForce = 0.2;
const maxSpeed = 7;
let i = 0;

function choose(choices) {
    var index = Math.floor(Math.random() * choices.length);
    return choices[index];
}

class Flock extends THREE.Group {
    constructor(bird) {
        super();
        this.bird = bird;

        this.renderBoids();
    }
    renderBoids() {
        this.children = [];
        for (let i = 0; i < constants.MAX_BOIDS; i += 1) {
            this.add(new Boid(this.bird.model, this.bird.clip));
        }
    }

    disperse() {
        for (const b of this.children) {
            b.boost.x = getRandomNum(10, -10) * 0.1;
            b.boost.y = getRandomNum(10, -10) * 0.1;
            b.boost.z = getRandomNum(10, -10) * 0.1;
            b.boost = b.boost
                .normalize()
                .multiplyScalar(7);
        }
    }

    seekGoal(boid, goal) {
        goal = goal
            .sub(boid.position)
            .normalize()
            .multiplyScalar(maxSpeed);


        return goal
            .sub(boid.velocity)
            .clampLength(0, 0.04);
    }

    matchVelocity(boid) {
        var groupVelocity = new THREE.Vector3(0, 0, 0);
        let count = 0;

        for (const b of this.children) {
            const dist = boid.position.distanceTo(b.position);
            if (dist > 0 && dist < 85) {
                groupVelocity = groupVelocity.add(b.velocity);
                count++;
            }
        }

        if (count === 0)
            return new THREE.Vector3(0, 0, 0);

        return groupVelocity
            .divideScalar(count)
            .normalize()
            .multiplyScalar(maxSpeed)
            .sub(boid.velocity)
            .clampLength(0, 0.16);
    }

    avoidCollisions(boid) {
        let count = 0;
        var center = new THREE.Vector3(0, 0, 0);

        for (const b of this.children) {
            const dist = boid.position.distanceTo(b.position);

            if (dist > 0 && dist < 70) {
                center = center.add(
                    new THREE.Vector3(0, 0, 0)
                        .subVectors(boid.position, b.position)
                        .normalize()
                        .divideScalar(dist)
                );
                count++;
            }
        }

        if (count === 0)
            return new THREE.Vector3(0, 0, 0);


        center = center
            .divideScalar(count)
            .normalize()
            .multiplyScalar(maxSpeed);

        return new THREE.Vector3(0, 0, 0)
            .subVectors(center, boid.velocity)
            .clampLength(0, constants.DISPERSION);

    }

    centerOfMass(boid) {
        var center = new THREE.Vector3(0, 0, 0);
        let count = 0;

        for (const b of this.children) {
            const dist = b.position.distanceTo(boid.position);

            if (dist > 0 && dist < constants.RANGE) {
                center = center.add(b.position);
                count++;
            }
        }

        if (count == 0)
            return new THREE.Vector3(0, 0, 0);


        return this.seekGoal(boid, center.divideScalar(count));

    }

    boundPosition(boid) {
        const radius = 1500;
        const distance = radius - boid.position.length() - boid.boundingSphere.radius;


        return boid.position
            .clone()
            .normalize()
            .multiplyScalar(-1 / Math.pow(distance, 2))
            .multiplyScalar(Math.pow(boid.velocity.length(), 3));
    }

    tick(delta) {
        for (const bird of this.children) {
            const v1 = this.avoidCollisions(bird);
            const v2 = this.centerOfMass(bird);
            const v3 = this.boundPosition(bird);
            const v4 = this.matchVelocity(bird);

            bird.boost = bird.boost.multiplyScalar(0.9);
            if (bird.boost < 0.01) {
                bird.boost = new THREE.Vector3(0, 0, 0);
            }

            bird.velocity = bird.velocity
                .add(v1)
                .add(v2)
                .add(v3)
                .add(v4)
                .add(bird.boost)
                .clampLength(0, maxSpeed);
            bird.position.copy(bird.position.add(bird.velocity));

            var head = bird.velocity
                .clone()
                .multiplyScalar(10)
                .add(bird.position);
            bird.lookAt(head);

            bird.tick(delta);
        }
    }
}

export { Flock };