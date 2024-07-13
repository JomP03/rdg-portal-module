import * as THREE from "three";
import Ground from "./ground.js";
import Wall from "./wall.js";
import Door from "./door.js";
import DoorFrame from "./doorFrame.js";
import Elevator from "./elevator.js";
import Passage from "./passage.js";

/*
 * parameters = {
 *  url: String,
 *  credits: String,
 *  scale: Vector3
 * }
 */

export default class Maze {
    constructor(parameters) {
        // Store the maze's map and size
        this.map = parameters.map;
        this.size = parameters.size;
        this.scale = parameters.scale;

        this.isAnimationMode = parameters.isAnimationMode;

        this.elevatorVideo = document.getElementById("elevatorVideo");
        this.passageVideo = document.getElementById("passageVideo");

        // Initialize the doors array
        this.doors = [];
        // Store the player's initial position and direction
        this.initialPosition = this.cellToCartesian(parameters.initialPosition);
        this.initialDirection = parameters.initialDirection;

        this.connections = parameters.connections;

        this.floorElements = parameters.floorElements;

        this.exitNotificationOpen = false;
        this.elevatorNotificationOpen = false; // Flag to control the notification for the elevators that serve more than 2 floors.
        this.elevatorOnlyServesOneFloorNotificationOpen = false; // Flag to control the notification for the elevators that serve only one floor.
        this.instantElevatorNotificationOpen = false; // Flag to control the notification for the elevators that serve only two floors.
        this.isFloorFormOpen = false; // Flag to control if the floor form modal is open or closed.
        this.actualExit = null;
        this.lastBuilding = null;
        this.elevatorObjects = [];
        this.doorObjects = [];

        // Create a group of objects
        this.object = new THREE.Group();

        // Create the ground
        this.ground = new Ground({ textureUrl: parameters.groundTextureUrl, size: parameters.size });
        this.object.add(this.ground.object);

        // Create a wall
        this.wall = new Wall({ textureUrl: parameters.wallTextureUrl, faceColor: 0xffffff });


        let wallObject;
        // Build the maze
        for (let i = 0; i <= parameters.size.width; i++) { // In order to represent the eastmost walls, the map width is one column greater than the actual maze width
            for (let j = 0; j <= parameters.size.height; j++) { // In order to represent the southmost walls, the map height is one row greater than the actual maze height
                /*
                 * parameters.map[][] | North wall | West wall | Elevator North | Elevator South | Elevator East | Elevator West | North Door | West Door
                 * --------------------+------------+-----------+----------------+----------------+---------------+---------------+------------+-----------
                 *          0          |     No     |     No    |       No       |     No         |     No        |     No        |     No     |     No
                 *          1          |     No     |     Yes   |       No       |     No         |     No        |     No        |     No     |     No
                 *          2          |     Yes    |     No    |       No       |     No         |     No        |     No        |     No     |     No
                 *          3          |     Yes    |     Yes   |       No       |     No         |     No        |     No        |     No     |     No
                 *          4          |     No     |     No    |       No       |     No         |     No        |     No        |     No     |     Yes
                 *          5          |     No     |     No    |       No       |     No         |     No        |     No        |     Yes    |     No
                 *          6          |     No     |     No    |       Yes      |     No         |     No        |     No        |     No     |     No
                 *          7          |     No     |     No    |       No       |     Yes        |     No        |     No        |     No     |     No
                 *          8          |     No     |     No    |       No       |     No         |     Yes       |     No        |     No     |     No
                 *          9          |     No     |     No    |       No       |     No         |     No        |     Yes       |     No     |     No
                 */
                if (parameters.map[j][i] === 2 || parameters.map[j][i] === 3 || parameters.map[j][i] === 21 || (parameters.map[j][i] === 4 && (parameters.map[j + 1][i] === 1 && parameters.map[j][i + 1] === 2))) {
                    wallObject = this.wall.object.clone();
                    wallObject.position.set(i - parameters.size.width / 2.0 + 0.5, 0.5, j - parameters.size.height / 2.0);
                    this.object.add(wallObject);
                }
                if (parameters.map[j][i] === 1 || parameters.map[j][i] === 3 || parameters.map[j][i] === 20 || (parameters.map[j][i] === 5 && (parameters.map[j + 1][i] === 1 && parameters.map[j][i + 1] === 2))) {
                    wallObject = this.wall.object.clone();
                    wallObject.rotateY(Math.PI / 2.0);
                    wallObject.position.set(i - parameters.size.width / 2.0, 0.5, j - parameters.size.height / 2.0 + 0.5);
                    this.object.add(wallObject);
                }
                if (parameters.map[j][i] === 4 || parameters.map[j][i] === 23) {

                    const framePosition = new THREE.Vector3(
                        i - parameters.size.width / 2.0,
                        0,
                        j - parameters.size.height / 2.0 + 0.5
                    );
                    let doorFrame = new DoorFrame();
                    doorFrame.loadModel(framePosition, parameters.doorFrameModel, 0);
                    this.object.add(doorFrame.object);

                    const doorPosition = new THREE.Vector3(
                        i - parameters.size.width / 2.0,
                        0.75,
                        j - parameters.size.height / 2.0 + 1
                    );
                    let door = new Door();
                    door.loadModel(doorPosition, parameters.doorModel, -Math.PI / 2.0, 0, j, i);
                    door.setDisplayText(this.getDisplayTextFromElement(i, j));
                    door.object.userData = { displayText: this.getDisplayTextFromElement(i, j) };
                    // Keep a reference to the door object
                    this.doors.push(door);
                    this.doorObjects.push(door.object);
                    this.object.add(door.object);


                }
                if (parameters.map[j][i] === 5 || parameters.map[j][i] === 22) {

                    const framePosition = new THREE.Vector3(
                        i - parameters.size.width / 2.0 + 0.5,
                        0,
                        j - parameters.size.height / 2.0
                    );
                    let doorFrame = new DoorFrame();
                    doorFrame.loadModel(framePosition, parameters.doorFrameModel, Math.PI / 2.0);
                    this.object.add(doorFrame.object);


                    const doorPosition = new THREE.Vector3(
                        i - parameters.size.width / 2.0,
                        0.75,
                        j - parameters.size.height / 2.0
                    );
                    let door = new Door();
                    door.loadModel(doorPosition, parameters.doorModel, Math.PI, 1, j, i);
                    // Keep a reference to the door object
                    door.setDisplayText(this.getDisplayTextFromElement(i, j));
                    door.object.userData = { displayText: this.getDisplayTextFromElement(i, j) };
                    this.doors.push(door);
                    this.doorObjects.push(door.object);
                    this.object.add(door.object);

                }
                // if 6 place 3 elevator walls and leave top open
                if (parameters.map[j][i] === 6) {

                    const elevatorPosition = new THREE.Vector3(
                        i - parameters.size.width / 2.0 + 0.5,
                        1.4,
                        j - parameters.size.height / 2.0
                    );
                    let elevator = new Elevator();
                    elevator.loadModel(elevatorPosition, parameters.elevatorModel, Math.PI);
                    elevator.setDisplayText(this.getDisplayTextFromElement(i, j));
                    elevator.object.userData = { displayText: this.getDisplayTextFromElement(i, j) };
                    this.elevatorObjects.push(elevator.object);
                    this.object.add(elevator.object);
                }
                // if 7 place 3 elevator walls and leave bottom open
                if (parameters.map[j][i] === 7) {


                    const elevatorPosition = new THREE.Vector3(
                        i - parameters.size.width / 2.0 + 0.5,
                        1.4,
                        j - parameters.size.height / 2.0 + 1
                    );
                    let elevator = new Elevator();
                    elevator.loadModel(elevatorPosition, parameters.elevatorModel, 0);
                    elevator.setDisplayText(this.getDisplayTextFromElement(i, j));
                    elevator.object.userData = { displayText: this.getDisplayTextFromElement(i, j) };
                    this.elevatorObjects.push(elevator.object);
                    this.object.add(elevator.object);

                }
                // if 8 place 3 elevator walls and leave right open
                if (parameters.map[j][i] === 8) {

                    const elevatorPosition = new THREE.Vector3(
                        i - parameters.size.width / 2.0 + 1,
                        1.4,
                        j - parameters.size.height / 2.0 + 0.5
                    );
                    let elevator = new Elevator();
                    elevator.loadModel(elevatorPosition, parameters.elevatorModel, Math.PI / 2.0);
                    elevator.setDisplayText(this.getDisplayTextFromElement(i, j));
                    elevator.object.userData = { displayText: this.getDisplayTextFromElement(i, j) };
                    this.elevatorObjects.push(elevator.object);
                    this.object.add(elevator.object);
                }
                // if 9 place 3 elevator walls and leave left open
                if (parameters.map[j][i] === 9) {

                    const elevatorPosition = new THREE.Vector3(
                        i - parameters.size.width / 2.0,
                        1.4,
                        j - parameters.size.height / 2.0 + 0.5
                    );

                    let elevator = new Elevator();
                    elevator.loadModel(elevatorPosition, parameters.elevatorModel, -Math.PI / 2.0);
                    elevator.setDisplayText(this.getDisplayTextFromElement(i, j));
                    elevator.object.userData = { displayText: this.getDisplayTextFromElement(i, j) };
                    this.elevatorObjects.push(elevator.object);
                    this.object.add(elevator.object);
                }

                // if 12 place a passageway south
                if (parameters.map[j][i] === 12) {

                    const passagePosition = new THREE.Vector3(
                        i - parameters.size.width / 2.0 + 2.190,
                        -0.470,
                        j - parameters.size.height / 2.0 - 9.2
                    );

                    let passage = new Passage();
                    passage.loadModel(passagePosition, parameters.passageModel, Math.PI / 2.0);
                    this.object.add(passage.object);
                }

                // if 14 place a passageway east
                if (parameters.map[j][i] === 14) {

                    const passagePosition = new THREE.Vector3(
                        i - parameters.size.width / 2.0 - 9.2,
                        -0.470,
                        j - parameters.size.height / 2.0 - 0.225
                    );

                    let passage = new Passage();
                    passage.loadModel(passagePosition, parameters.passageModel, Math.PI);
                    this.object.add(passage.object);
                }
                // if 16 place a passageway west
                if (parameters.map[j][i] === 16) {

                    const passagePosition = new THREE.Vector3(
                        i - parameters.size.width / 2.0 + 9.2,
                        -0.470,
                        j - parameters.size.height / 2.0 + 2.23
                    );

                    let passage = new Passage();
                    passage.loadModel(passagePosition, parameters.passageModel, 0);
                    this.object.add(passage.object);
                }
                // if 18 place a passageway north
                if (parameters.map[j][i] === 18) {

                    const passagePosition = new THREE.Vector3(
                        i - parameters.size.width / 2.0 - 0.20,
                        -0.470,
                        j - parameters.size.height / 2.0 + 9.2
                    );

                    let passage = new Passage();
                    passage.loadModel(passagePosition, parameters.passageModel, -Math.PI / 2.0);
                    this.object.add(passage.object);
                }

                if (parameters.map[j][i] === 21) {

                    const passagePosition = new THREE.Vector3(
                        i - parameters.size.width / 2.0 - 9.2,
                        -0.470,
                        j - parameters.size.height / 2.0 - 0.225
                    );

                    let passage = new Passage();
                    passage.loadModel(passagePosition, parameters.passageModel, Math.PI);
                    this.object.add(passage.object);
                }

                if (parameters.map[j][i] === 20) {

                    const passagePosition = new THREE.Vector3(
                        i - parameters.size.width / 2.0 + 2.190,
                        -0.470,
                        j - parameters.size.height / 2.0 - 9.2
                    );

                    let passage = new Passage();
                    passage.loadModel(passagePosition, parameters.passageModel, Math.PI / 2.0);
                    this.object.add(passage.object);
                }


            }

        }

        this.object.scale.set(this.scale.x, this.scale.y, this.scale.z);
        this.loaded = true;

    }

    getDisplayTextFromElement(x, y) {
        for (const floorElement of this.floorElements) {
            if ((floorElement.initCoords[0] === x && floorElement.initCoords[1] === y) || (floorElement.finalCoords[0] === x && floorElement.finalCoords[1] === y)) {
                return floorElement.displayName;
            }
        }
        return "";
    }

    makeLabelCanvas(baseWidth, size, name) {

        const borderSize = 2;
        const ctx = document.createElement('canvas').getContext('2d');
        const font = `${size}px Montserrat, sans-serif`;
        ctx.font = font;
        // measure how long the name will be
        const textWidth = ctx.measureText(name).width;

        const doubleBorderSize = borderSize * 2;
        const width = baseWidth + doubleBorderSize;
        const height = size + doubleBorderSize;
        ctx.canvas.width = width;
        ctx.canvas.height = height;

        // need to set font again after resizing canvas
        ctx.font = font;
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';

        ctx.fillStyle = 'transparent';
        ctx.fillRect(0, 0, width, height);

        // scale to fit but don't stretch
        const scaleFactor = Math.min(1, baseWidth / textWidth);
        ctx.translate(width / 2, height / 2);
        ctx.scale(scaleFactor, 1);
        ctx.fillStyle = 'white';
        ctx.fillText(name, 0, 0);

        return ctx.canvas;

    }

    showSprite(raycaster) {
        // Remove all sprites from the scene
        for (let i = this.object.children.length - 1; i >= 0; i--) {
            if (this.object.children[i] instanceof THREE.Sprite) {
                this.object.remove(this.object.children[i]);
            }
        }

        // Variables to check if the player is looking at a door or an elevator
        let intersectedElevator = null;
        let intersectedDoor = null;

        for (const elevatorObject of this.elevatorObjects) {
            if (raycaster.intersectObject(elevatorObject).length > 0) {
                intersectedElevator = raycaster.intersectObject(elevatorObject);
                const canvas = this.makeLabelCanvas(300, 50, 'Elevator ' + elevatorObject.userData.displayText);
                const texture = new THREE.CanvasTexture(canvas);
                texture.minFilter = THREE.LinearFilter;
                texture.wrapS = THREE.ClampToEdgeWrapping;
                texture.wrapT = THREE.ClampToEdgeWrapping;

                const labelMaterial = new THREE.SpriteMaterial({
                    map: texture,
                    transparent: true,
                });

                const label = new THREE.Sprite(labelMaterial);
                label.position.x = intersectedElevator[0].point.x;
                label.position.y = intersectedElevator[0].point.y + 2;
                label.position.z = intersectedElevator[0].point.z;

                this.object.add(label)
            }
        }

        for (const doorObject of this.doorObjects) {
            if (raycaster.intersectObject(doorObject).length > 0) {
                intersectedDoor = raycaster.intersectObject(doorObject);
                const canvas = this.makeLabelCanvas(300, 50, doorObject.userData.displayText);
                const texture = new THREE.CanvasTexture(canvas);
                texture.minFilter = THREE.LinearFilter;
                texture.wrapS = THREE.ClampToEdgeWrapping;
                texture.wrapT = THREE.ClampToEdgeWrapping;

                const labelMaterial = new THREE.SpriteMaterial({
                    map: texture,
                    transparent: true,
                });

                const label = new THREE.Sprite(labelMaterial);
                label.position.x = intersectedDoor[0].point.x;
                label.position.y = intersectedDoor[0].point.y + 2;
                label.position.z = intersectedDoor[0].point.z;

                this.object.add(label)
            }
        }
    }



    getMap() {
        return this.map;
    }


    // Convert cell [row, column] coordinates to cartesian (x, y, z) coordinates
    cellToCartesian(position) {
        return new THREE.Vector3((position[1] - this.size.width / 2.0 + 0.5) * this.scale.x, 0.0, (position[0] - this.size.height / 2.0 + 0.5) * this.scale.z)
    }

    // Convert cartesian (x, y, z) coordinates to cell [row, column] coordinates
    cartesianToCell(position) {
        return [Math.floor(position.z / this.scale.z + this.size.height / 2.0), Math.floor(position.x / this.scale.x + this.size.width / 2.0)];
    }

    distanceToWestWall(position) {
        const indices = this.cartesianToCell(position);
        if (this.map[indices[0]][indices[1]] === 1 || this.map[indices[0]][indices[1]] === 3 || this.map[indices[0]][indices[1]] === 7 || this.map[indices[0]][indices[1]] === 6 || this.map[indices[0]][indices[1]] === 8 || this.map[indices[0]][indices[1]] === 4 || this.map[indices[0]][indices[1]] === 14 || this.map[indices[0]][indices[1]] === 15 || this.map[indices[0]][indices[1]] === 16 || this.map[indices[0]][indices[1]] === 17 || this.map[indices[0]][indices[1]] === 20 || this.map[indices[0]][indices[1]] === 21 || ((this.map[indices[0]][indices[1]] === 5 || this.map[indices[0]][indices[1]] === 11) && (this.map[indices[0] + 1][indices[1]] === 1 && this.map[indices[0]][indices[1] + 1] === 2))) {
            return position.x - this.cellToCartesian(indices).x + this.scale.x / 2.0;
        }
        return Infinity;
    }

    distanceToEastWall(position) {
        const indices = this.cartesianToCell(position);
        if (this.map[indices[0]][indices[1]] === 6 || this.map[indices[0]][indices[1]] === 9 || this.map[indices[0]][indices[1]] === 7) {
            return this.cellToCartesian(indices).x + this.scale.x / 2.0 - position.x;
        }


        indices[1] = indices[1] + 2;
        if (this.map[indices[0]][indices[1]] === 1 || this.map[indices[0]][indices[1]] === 3) {
            return this.cellToCartesian(indices).x - this.scale.x / 2.0 - position.x;
        }
        return Infinity;
    }

    distanceToNorthWall(position) {
        const indices = this.cartesianToCell(position);
        if (this.map[indices[0]][indices[1]] === 2 || this.map[indices[0]][indices[1]] === 3 || this.map[indices[0]][indices[1]] === 7 || this.map[indices[0]][indices[1]] === 8 || this.map[indices[0]][indices[1]] === 9 || this.map[indices[0]][indices[1]] === 5 || this.map[indices[0]][indices[1]] === 12 || this.map[indices[0]][indices[1]] === 13 || this.map[indices[0]][indices[1]] === 18 || this.map[indices[0]][indices[1]] === 19 || this.map[indices[0]][indices[1]] === 20 || this.map[indices[0]][indices[1]] === 21 || ((this.map[indices[0]][indices[1]] === 4 || this.map[indices[0]][indices[1]] === 10) && (this.map[indices[0] + 1][indices[1]] === 1 && this.map[indices[0]][indices[1] + 1] === 2))) {
            return position.z - this.cellToCartesian(indices).z + this.scale.z / 2.0;
        }
        return Infinity;
    }

    distanceToSouthWall(position) {
        const indices = this.cartesianToCell(position);

        if (this.map[indices[0]][indices[1]] === 6 || this.map[indices[0]][indices[1]] === 8 || this.map[indices[0]][indices[1]] === 9) {
            return this.cellToCartesian(indices).z + this.scale.z / 2.0 - position.z;
        }

        indices[0]++;
        if (this.map[indices[0]][indices[1]] === 2 || this.map[indices[0]][indices[1]] === 3) {
            return this.cellToCartesian(indices).z - this.scale.z / 2.0 - position.z;
        }
        return Infinity;
    }

    // Function to open the notification box with a specific message
    openNotification(message) {
        if (!document.getElementById('notification-box') && !document.getElementById('notification-message')) {
            return;
        }
        let notificationBox = document.getElementById('notification-box');
        let messageElement = document.getElementById('notification-message');

        // Set the message
        messageElement.innerHTML = message;

        // Show the notification box
        notificationBox.style.display = 'inline-block';
    }


    // Function to close the notification box
    async closeNotification() {
        if (!document.getElementById('notification-box')) {
            return;
        }
        let notificationBox = document.getElementById('notification-box');
        // Hide the notification box
        notificationBox.style.display = 'none';
        notificationBox = document.getElementById('notification-box');
        // wait 2 seconds
        const delay = ms => new Promise(res => setTimeout(res, ms));
        await delay(2000);
    }

    // Return 1 if the player found an passage, 2 if the player found a elevator, 0 otherwise
    checkIfPlayerIsOnConnectionCell(position) {
        const indices = this.cartesianToCell(position);

        for (const exitLocation of this.connections) {
            const exitX = exitLocation.connectionCoords[0];
            const exitY = exitLocation.connectionCoords[1];

            if (indices[1] === exitX && indices[0] === exitY) {
                if (exitLocation.connectionType === "passage") {
                    this.actualExit = exitLocation;
                    return 1;
                }
                if (exitLocation.connectionType === "elevator") {
                    this.actualExit = exitLocation;
                    return 2;
                }

            }
        }
        return 0;
    }

    checkIfFoundConnection(position) {

        const exit = this.checkIfPlayerIsOnConnectionCell(position);
        if (exit === 1) { // Found a passage
            const floor = Object.keys(this.actualExit.destFloorId)[0];
            const building = this.actualExit.destFloorId[floor];


            if ((!this.exitNotificationOpen || this.lastBuilding !== building) && !this.isAnimationMode) {
                this.openNotification('Click "E" to go to floor ' + floor + ' of building ' + building);
                this.exitNotificationOpen = true;
                this.lastBuilding = building;
            }

        } else if (exit === 2) { // Found an elevator
            const servedFloors = Object.keys(this.actualExit.destFloorId);
            if (servedFloors.length === 0 && !this.isAnimationMode) {
                this.openNotification('This elevator only serves the current floor.');
                this.elevatorOnlyServesOneFloorNotificationOpen = true;
            } else if (servedFloors.length === 1 && !this.isAnimationMode) {
                this.openNotification('Click "E" to go to floor ' + servedFloors[0]);
                this.instantElevatorNotificationOpen = true;
            } else if (servedFloors.length > 1 && !this.isAnimationMode) {
                this.openNotification('Click "E" to use the elevator');
                this.elevatorNotificationOpen = true;
            }

        } else { // Found nothing, so close the notification box if it was open
            if (this.exitNotificationOpen || this.elevatorNotificationOpen || this.elevatorOnlyServesOneFloorNotificationOpen || this.instantElevatorNotificationOpen) {
                this.closeNotification();
                this.exitNotificationOpen = false;
                this.elevatorNotificationOpen = false;
                this.elevatorOnlyServesOneFloorNotificationOpen = false;
                this.instantElevatorNotificationOpen = false;
                // Close the elevator model if its open
                let elevatorForm = document.getElementById('elevator-form');
                if (elevatorForm !== null) {
                    elevatorForm.style.display = 'none';
                    elevatorForm.remove();
                    document.body.style.overflow = null;
                    this.isFloorFormOpen = false
                }
            }

        }

    }

    relax(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async changeFloor(loadFloor) {
        if (this.exitNotificationOpen) {
            const floorNumber = Object.keys(this.actualExit.destFloorId)[0];

            const buildingCode = this.actualExit.destFloorId[floorNumber];

            const invertedCoords = [this.actualExit.destFloorInitiCoords[1], this.actualExit.destFloorInitiCoords[0]];

            const video = this.passageVideo;
            const time = 5000;

            video.loop = true;
            video.muted = true;

            // Play the video and make it visible
            video.play();
            video.style.display = "block"; // or 'inline-block' depending on your layout

            await loadFloor(buildingCode, floorNumber, invertedCoords, this.actualExit.destFloorInitiDirection);

            await this.relax(time);
            video.style.display = "none";
            video.pause();
            video.currentTime = 0;

            await this.relax(2000);


        } else if (this.elevatorNotificationOpen) {
            if (this.isFloorFormOpen) {
                this.isFloorFormOpen = false;
                let elevatorForm = document.getElementById('elevator-form');
                elevatorForm.remove();
                document.body.style.overflow = null; // Remove scrollbar
            } else {
                this.isFloorFormOpen = true;
                document.body.style.overflow = 'hidden';

                let elevatorForm = document.createElement('div');
                elevatorForm.setAttribute('id', 'elevator-form');
                elevatorForm.setAttribute('class', 'elevator-form');
                elevatorForm.innerHTML = '<div class="elevator-form-modal">\n' +
                    '    <span class="close">&times;</span>\n' +
                    '    <h2 class="floor-selection-header">Floors:</h2>\n' +
                    '    <select id="floor-selection">\n' +
                    '    </select>\n' +
                    '    <button id="submit-button">Go</button>\n' +
                    '</div>';

                document.getElementById('three-scene').appendChild(elevatorForm);


                // Show the available floors in the floor selection
                let floorSelection = document.getElementById('floor-selection');
                const floors = Object.keys(this.actualExit.destFloorId);
                for (const floor of floors) {
                    let option = document.createElement('option');
                    option.value = floor;
                    option.text = floor;
                    floorSelection.appendChild(option);
                }


                // Add event listener to the close button
                let closeButton = document.querySelector('.close');
                closeButton.addEventListener('click', () => {
                    this.isFloorFormOpen = false;
                    elevatorForm.remove();
                    document.body.style.overflow = null; // Remove scrollbar
                });

                // Add event listener to close the modal when the user clicks outside of it
                let modalOverlay = document.querySelector('.elevator-form');
                modalOverlay.addEventListener('click', (event) => {
                    if (event.target === modalOverlay) {
                        this.isFloorFormOpen = false;
                        elevatorForm.remove();
                        document.body.style.overflow = null; // Remove scrollbar
                    }
                });


                // Add event listener to the submit button
                let submitButton = document.getElementById('submit-button');
                submitButton.addEventListener('click', async () => {
                    // Get the selected floor
                    let selectedFloor = floorSelection.options[floorSelection.selectedIndex].value;
                    // Get the building code
                    let buildingCode = this.actualExit.destFloorId[selectedFloor];
                    // Get the initial coordinates
                    let invertedCoords = [this.actualExit.destFloorInitiCoords[1], this.actualExit.destFloorInitiCoords[0]];
                    // Get the initial direction
                    let initialDirection = this.actualExit.destFloorInitiDirection;

                    const video = this.elevatorVideo;
                    const time = 8200;

                    video.loop = true;
                    video.muted = true;

                    // Play the video and make it visible
                    video.play();
                    video.style.display = "block"; // or 'inline-block' depending on your layout

                    // Close the modal and the notification box
                    this.isFloorFormOpen = false
                    elevatorForm.remove();
                    document.body.style.overflow = null; // Remove scrollbar
                    this.elevatorNotificationOpen = false;

                    // Load the new floor
                    await loadFloor(buildingCode, selectedFloor, invertedCoords, initialDirection);

                    await this.relax(time);
                    video.style.display = "none";
                    video.pause();
                    video.currentTime = 0;

                    await this.relax(2000);

                });
            }
        } else if (this.instantElevatorNotificationOpen) {
            const floorNumber = Object.keys(this.actualExit.destFloorId)[0];

            const buildingCode = this.actualExit.destFloorId[floorNumber];

            const invertedCoords = [this.actualExit.destFloorInitiCoords[1], this.actualExit.destFloorInitiCoords[0]];

            const video = this.elevatorVideo;
            const time = 8200;

            video.loop = true;
            video.muted = true;

            // Play the video and make it visible
            video.play();
            video.style.display = "block"; // or 'inline-block' depending on your layout

            // Load the new floor
            await loadFloor(buildingCode, floorNumber, invertedCoords, this.actualExit.destFloorInitiDirection);

            await this.relax(time);
            video.style.display = "none";
            video.pause();
            video.currentTime = 0;

            await this.relax(2000);

        }
    }



    async moveDoor(position) {

        const indices = this.cartesianToCell(position);

        const otherSideOf4Door = [indices[0], indices[1] + 1];
        const otherSideOf4Door2 = [indices[0], indices[1] - 1];
        const otherSideOf5Door = [indices[0] + 1, indices[1]];
        const otherSideOf5Door2 = [indices[0] - 1, indices[1]];

        for (const door of this.doors) {
            if (door.indexX === indices[0] && door.indexY === indices[1] && (this.map[indices[0]][indices[1]] === 4 || this.map[indices[0]][indices[1]] === 10)) {
                await door.playAnimation();
                if (door.open === true) {
                    this.map[door.indexX][door.indexY] = 10;
                    door.nextCellX = indices[0] + 1;
                    door.nextCellY = indices[1] - 1;
                    door.nextCellValue = this.map[door.nextCellX][door.nextCellY];
                    if (door.nextCellValue === 3 || door.nextCellValue === 1)
                        this.map[door.nextCellX][door.nextCellY] = 3;
                    else if (door.nextCellValue === 2 || door.nextCellValue === 0)
                        this.map[door.nextCellX][door.nextCellY] = 2;
                } else {
                    this.map[door.indexX][door.indexY] = 4;
                    this.map[door.nextCellX][door.nextCellY] = door.nextCellValue;
                }
                break;
            }
            if (door.indexX === otherSideOf4Door[0] && door.indexY === otherSideOf4Door[1] && (this.map[otherSideOf4Door[0]][otherSideOf4Door[1]] === 4 || this.map[otherSideOf4Door[0]][otherSideOf4Door[1]] === 10)) {
                await door.playAnimation();
                if (door.open === true) {
                    this.map[door.indexX][door.indexY] = 10;
                    door.nextCellX = otherSideOf4Door[0] + 1;
                    door.nextCellY = otherSideOf4Door[1] - 1;
                    door.nextCellValue = this.map[door.nextCellX][door.nextCellY];
                    if (door.nextCellValue === 3 || door.nextCellValue === 1)
                        this.map[door.nextCellX][door.nextCellY] = 3;
                    else if (door.nextCellValue === 2 || door.nextCellValue === 0)
                        this.map[door.nextCellX][door.nextCellY] = 2;
                } else {
                    this.map[door.indexX][door.indexY] = 4;
                    this.map[door.nextCellX][door.nextCellY] = door.nextCellValue;
                }
                break;
            }
            if (door.indexX === otherSideOf4Door2[0] && door.indexY === otherSideOf4Door2[1] && (this.map[otherSideOf4Door2[0]][otherSideOf4Door2[1]] === 4 || this.map[otherSideOf4Door2[0]][otherSideOf4Door2[1]] === 10)) {
                await door.playAnimation();
                if (door.open === true) {
                    this.map[door.indexX][door.indexY] = 10;
                    door.nextCellX = otherSideOf4Door2[0] + 1;
                    door.nextCellY = otherSideOf4Door2[1] - 1;
                    door.nextCellValue = this.map[door.nextCellX][door.nextCellY];
                    if (door.nextCellValue === 3 || door.nextCellValue === 1)
                        this.map[door.nextCellX][door.nextCellY] = 3;
                    else if (door.nextCellValue === 2 || door.nextCellValue === 0)
                        this.map[door.nextCellX][door.nextCellY] = 2;
                } else {
                    this.map[door.indexX][door.indexY] = 4;
                    this.map[door.nextCellX][door.nextCellY] = door.nextCellValue;
                }
                break;
            }


            if (door.indexX === indices[0] && door.indexY === indices[1] && (this.map[indices[0]][indices[1]] === 5 || this.map[indices[0]][indices[1]] === 11)) {
                await door.playAnimation();
                if (door.open === true) {
                    this.map[door.indexX][door.indexY] = 11;
                    door.nextCellX = indices[0] - 1;
                    door.nextCellY = indices[1];
                    door.nextCellValue = this.map[door.nextCellX][door.nextCellY];
                    if (door.nextCellValue === 3 || door.nextCellValue === 1)
                        this.map[door.nextCellX][door.nextCellY] = door.nextCellValue;
                    else if (door.nextCellValue === 2)
                        this.map[door.nextCellX][door.nextCellY] = 3;
                    else if (door.nextCellValue === 0)
                        this.map[door.nextCellX][door.nextCellY] = 1;
                } else {
                    this.map[door.indexX][door.indexY] = 5;
                    this.map[door.nextCellX][door.nextCellY] = door.nextCellValue;
                }
                break;
            }
            if (door.indexX === otherSideOf5Door[0] && door.indexY === otherSideOf5Door[1] && (this.map[otherSideOf5Door[0]][otherSideOf5Door[1]] === 5 || this.map[otherSideOf5Door[0]][otherSideOf5Door[1]] === 11)) {
                await door.playAnimation();
                if (door.open === true) {
                    this.map[door.indexX][door.indexY] = 11;
                    door.nextCellX = otherSideOf5Door[0] - 1;
                    door.nextCellY = otherSideOf5Door[1];
                    door.nextCellValue = this.map[door.nextCellX][door.nextCellY];
                    if (door.nextCellValue === 3 || door.nextCellValue === 1)
                        this.map[door.nextCellX][door.nextCellY] = door.nextCellValue;
                    else if (door.nextCellValue === 2)
                        this.map[door.nextCellX][door.nextCellY] = 3;
                    else if (door.nextCellValue === 0)
                        this.map[door.nextCellX][door.nextCellY] = 1;
                } else {
                    this.map[door.indexX][door.indexY] = 5;
                    this.map[door.nextCellX][door.nextCellY] = door.nextCellValue;
                }
                break;
            }
            if (door.indexX === otherSideOf5Door2[0] && door.indexY === otherSideOf5Door2[1] && (this.map[otherSideOf5Door2[0]][otherSideOf5Door2[1]] === 5 || this.map[otherSideOf5Door2[0]][otherSideOf5Door2[1]] === 11)) {
                await door.playAnimation();
                if (door.open === true) {
                    this.map[door.indexX][door.indexY] = 11;
                    door.nextCellX = otherSideOf5Door2[0] - 1;
                    door.nextCellY = otherSideOf5Door2[1];
                    door.nextCellValue = this.map[door.nextCellX][door.nextCellY];
                    if (door.nextCellValue === 3 || door.nextCellValue === 1)
                        this.map[door.nextCellX][door.nextCellY] = door.nextCellValue;
                    else if (door.nextCellValue === 2)
                        this.map[door.nextCellX][door.nextCellY] = 3;
                    else if (door.nextCellValue === 0)
                        this.map[door.nextCellX][door.nextCellY] = 1;
                } else {
                    this.map[door.indexX][door.indexY] = 5;
                    this.map[door.nextCellX][door.nextCellY] = door.nextCellValue;
                }
                break;
            }
        }

    }
}