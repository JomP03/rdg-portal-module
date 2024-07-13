import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import TWEEN from '@tweenjs/tween.js';

export default class Door {
    constructor() {
        this.object = new THREE.Object3D();
        this.model = null;
        this.mixer = null;
        this.open = false;
        this.doorPivot = new THREE.Object3D(); 
        this.orientation = 0;
        this.indexX = null;
        this.indexY = null;
        this.DoorCellValue = null;
        this.nextCellX = null;
        this.nextCellY = null;
        this.nextCellValue = null;
        this.actionInProgress = null;
        this.displayText = null;

    }

    loadModel(position, modelPath, angle, orientation, x, y) {
        const loader = new GLTFLoader();
        this.orientation = orientation;

        this.indexX = x;
        this.indexY = y;


        let doorPosition;

        if (orientation === 0) {
            doorPosition = new THREE.Vector3(0, 0, -0.5);
        } else if (orientation === 1) {
            doorPosition = new THREE.Vector3(0.5, 0, 0);
        }

        return new Promise((resolve, reject) => {
            loader.load(modelPath, (gltf) => {
                this.model = gltf.scene;
          
                this.model.position.set(doorPosition.x, doorPosition.y, doorPosition.z); 
                this.model.scale.set(0.0068, 0.0070, 0.001);
                this.model.rotateY(angle);
    
                this.doorPivot.add(this.model);
                this.doorPivot.position.copy(position);
                this.object.add(this.doorPivot);
    
                resolve();
            }, undefined, (error) => {
                console.error(`Error loading door model: ${error}`);
                reject(error);
            });
        });
    }
    

    setScale(x, y, z) {
        if (this.model) {
            this.model.scale.set(x, y, z);
        }
    }

    playAnimation() {
        if (this.open) {
            this.closeDoor();
        } else {
            this.openDoor();
        }
    }

    openDoor() {
        const initialRotation = { rotationY: this.doorPivot.rotation.y };
        const finalRotation = { rotationY: this.doorPivot.rotation.y + Math.PI * 0.85 / 2  };

        const tweenOpen = new TWEEN.Tween(initialRotation)
            .to(finalRotation, 1000)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .onUpdate((values) => {
                this.doorPivot.rotation.y = values.rotationY;
            })
            .start();

        this.open = true;
        this.animate();
    }

    closeDoor() {
        const initialRotation = { rotationY: this.doorPivot.rotation.y };
        const finalRotation = { rotationY: this.doorPivot.rotation.y - Math.PI * 0.85 / 2  };

        const tweenClose = new TWEEN.Tween(initialRotation)
            .to(finalRotation, 1000)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .onUpdate((values) => {
                this.doorPivot.rotation.y = values.rotationY;
            })
            .start();

        this.open = false;
        this.animate();
    }

    animate() {
        function animate() {
            requestAnimationFrame(animate);
            TWEEN.update();
        }

        animate();
    }

    setDisplayText(text) {
        this.displayText = text;
    }
}
