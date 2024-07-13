import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export default class Passage {
    constructor() {
        this.object = new THREE.Object3D();
        this.model = null;
    }

    async loadModel(position, modelPath, angle) {
        const loader = new GLTFLoader();
        return new Promise((resolve, reject) => {
            loader.load(modelPath, (gltf) => {
                this.model = gltf.scene;
                this.model.position.copy(position);

                this.model.scale.set(0.5, 0.30, 0.38);

                this.model.rotateY(angle);

                this.object.add(this.model);
                resolve();
            }, undefined, (error) => {
                console.error(`Error loading elevator model: ${error}`);
                reject(error);
            });
        });
    }

    setScale(x,y,z) {
        if (this.model) {
            this.model.scale.set(x, y, z);
        }
    }
}
