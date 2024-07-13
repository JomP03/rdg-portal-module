import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export default class Elevator {
    constructor() {
        this.object = new THREE.Object3D();
        this.model = null;
        this.displayText = null;
    }

    async loadModel(position, modelPath, angle) {
        const loader = new GLTFLoader();
        return new Promise((resolve, reject) => {
            loader.load(modelPath, (gltf) => {
                this.model = gltf.scene;
                this.model.position.copy(position);

                this.model.scale.set(0.007, 0.0067, 0.00525);

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

    setDisplayText(text) {
        this.displayText = text;
    }
}
