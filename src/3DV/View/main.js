// Thumb Raiser - JPP 2021, 2022, 2023ori
// 3D modeling
// 3D models importing
// Perspective and orthographic projections
// Viewing
// Linear and affine transformations
// Lighting and materials
// Shadow projection
// Fog
// Texture mapping
// User interaction

import * as THREE from "three";
import Stats from "three/addons/libs/stats.module.js";
import Orientation from "./orientation.js";
import {
  generalData,
  playerData,
  lightsData,
  fogData,
  cameraData,
} from "./default_data.js";
import { merge } from "./merge.js";
import Maze from "./maze.js";
import Player from "./player.js";
import Lights from "./lights.js";
import Fog from "./fog.js";
import Camera from "./camera.js";
import Animations from "./animations.js";
import UserInterface from "./user_interface.js";



/*
 * generalParameters = {
 *  setDevicePixelRatio: Boolean
 * }
 *
 * mazeParameters = {
 *  url: String,
 *  credits: String,
 *  scale: Vector3
 * }
 *
 * playerParameters = {
 *  url: String,
 *  credits: String,
 *  scale: Vector3,
 *  walkingSpeed: Float,
 *  initialDirection: Float,
 *  turningSpeed: Float,
 *  runningFactor: Float,
 *  keyCodes: { fixedView: String, firstPersonView: String, thirdPersonView: String, topView: String, viewMode: String, userInterface: String, miniMap: String, help: String, statistics: String, run: String, left: String, right: String, backward: String, forward: String, jump: String, yes: String, no: String, wave: String, punch: String, thumbsUp: String }
 * }
 *
 * lightsParameters = {
 *  ambientLight: { color: Integer, intensity: Float },
 *  pointLight1: { color: Integer, intensity: Float, range: Float, position: Vector3 },
 *  pointLight2: { color: Integer, intensity: Float, range: Float, position: Vector3 },
 *  spotLight: { color: Integer, intensity: Float, range: Float, angle: Float, penumbra: Float, position: Vector3, direction: Float }
 * }
 *
 * fogParameters = {
 *  enabled: Boolean,
 *  color: Integer,
 *  near: Float,
 *  far: Float
 * }
 *
 * fixedViewCameraParameters = {
 *  view: String,
 *  multipleViewsViewport: Vector4,
 *  target: Vector3,
 *  initialOrientation: Orientation,
 *  orientationMin: Orientation,
 *  orientationMax: Orientation,
 *  initialDistance: Float,
 *  distanceMin: Float,
 *  distanceMax: Float,
 *  initialZoom: Float,
 *  zoomMin: Float,
 *  zoomMax: Float,
 *  initialFov: Float,
 *  near: Float,
 *  far: Float
 * }
 *
 * firstPersonViewCameraParameters = {
 *  view: String,
 *  multipleViewsViewport: Vector4,
 *  target: Vector3,
 *  initialOrientation: Orientation,
 *  orientationMin: Orientation,
 *  orientationMax: Orientation,
 *  initialDistance: Float,
 *  distanceMin: Float,
 *  distanceMax: Float,
 *  initialZoom: Float,
 *  zoomMin: Float,
 *  zoomMax: Float,
 *  initialFov: Float,
 *  near: Float,
 *  far: Float
 * }
 *
 * thirdPersonViewCameraParameters = {
 *  view: String,
 *  multipleViewsViewport: Vector4,
 *  target: Vector3,
 *  initialOrientation: Orientation,
 *  orientationMin: Orientation,
 *  orientationMax: Orientation,
 *  initialDistance: Float,
 *  distanceMin: Float,
 *  distanceMax: Float,
 *  initialZoom: Float,
 *  zoomMin: Float,
 *  zoomMax: Float,
 *  initialFov: Float,
 *  near: Float,
 *  far: Float
 * }
 *
 * topViewCameraParameters = {
 *  view: String,
 *  multipleViewsViewport: Vector4,
 *  target: Vector3,
 *  initialOrientation: Orientation,
 *  orientationMin: Orientation,
 *  orientationMax: Orientation,
 *  initialDistance: Float,
 *  distanceMin: Float,
 *  distanceMax: Float,
 *  initialZoom: Float,
 *  zoomMin: Float,
 *  zoomMax: Float,
 *  initialFov: Float,
 *  near: Float,
 *  far: Float
 * }
 *
 * miniMapCameraParameters = {
 *  view: String,
 *  multipleViewsViewport: Vector4,
 *  initialOrientation: Orientation,
 *  orientationMin: Orientation,
 *  orientationMax: Orientation,
 *  initialDistance: Float,
 *  distanceMin: Float,
 *  distanceMax: Float,
 *  initialZoom: Float,
 *  zoomMin: Float,
 *  zoomMax: Float,
 *  initialFov: Float,
 *  near: Float,
 *  far: Float
 * }
 */

export default class Main {
  constructor(
    refContainer,
    generalParameters,
    mazeParameters,
    playerParameters,
    lightsParameters,
    fogParameters,
    fixedViewCameraParameters,
    firstPersonViewCameraParameters,
    thirdPersonViewCameraParameters,
    topViewCameraParameters,
    miniMapCameraParameters,
    loadFloor
  ) {
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.lastWidth = refContainer.clientWidth;
    this.refContainer = refContainer;
    this.generalParameters = merge({}, generalData, generalParameters);
    this.mazeParameters = mazeParameters;
    this.playerParameters = merge({}, playerData, playerParameters);
    this.lightsParameters = merge({}, lightsData, lightsParameters);
    this.fogParameters = merge({}, fogData, fogParameters);
    this.fixedViewCameraParameters = merge(
      {},
      cameraData,
      fixedViewCameraParameters
    );
    this.firstPersonViewCameraParameters = merge(
      {},
      cameraData,
      firstPersonViewCameraParameters
    );
    this.thirdPersonViewCameraParameters = merge(
      {},
      cameraData,
      thirdPersonViewCameraParameters
    );
    this.topViewCameraParameters = merge(
      {},
      cameraData,
      topViewCameraParameters
    );
    this.miniMapCameraParameters = merge(
      {},
      cameraData,
      miniMapCameraParameters
    );
    this.keyChangeHandler = (event) => this.keyChange(event, true);
    this.keyUpHandler = (event) => this.keyChange(event, false);
    this.loadFloor = loadFloor;

    // Create a 2D scene (the viewports frames)
    this.scene2D = new THREE.Scene();

    this.lastKeyPressTime = 0;
    this.cooldownTime = 1000; // 1 second

    this.isDiagonal = false;

    this.elevatorVideo = document.getElementById("elevatorVideo");
    this.passageVideo = document.getElementById("passageVideo");

    // Create a square
    let points = [
      new THREE.Vector3(0.0, 0.0, 0.0),
      new THREE.Vector3(1.0, 0.0, 0.0),
      new THREE.Vector3(1.0, 1.0, 0.0),
      new THREE.Vector3(0.0, 1.0, 0.0),
    ];
    let geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: 0xffffff });
    this.square = new THREE.LineLoop(geometry, material);
    this.scene2D.add(this.square);

    // Create the camera corresponding to the 2D scene
    this.camera2D = new THREE.OrthographicCamera(0.0, 1.0, 1.0, 0.0, 0.0, 1.0);

    // Create a 3D scene (the game itself)
    this.scene3D = new THREE.Scene();

    // Create the maze
    this.maze = new Maze(this.mazeParameters);

    // Create the player
    this.player = new Player(this.playerParameters);

    // Create the lights
    this.lights = new Lights(this.lightsParameters);

    // Create the fog
    this.fog = new Fog(this.fogParameters);

    // Create the cameras corresponding to the four different views: fixed view, first-person view, third-person view and top view
    this.fixedViewCamera = new Camera(
      this.fixedViewCameraParameters,
      refContainer.clientWidth,
      refContainer.clientHeight
    );
    this.firstPersonViewCamera = new Camera(
      this.firstPersonViewCameraParameters,
      refContainer.clientWidth,
      refContainer.clientHeight
    );
    this.thirdPersonViewCamera = new Camera(
      this.thirdPersonViewCameraParameters,
      refContainer.clientWidth,
      refContainer.clientHeight
    );
    this.topViewCamera = new Camera(
      this.topViewCameraParameters,
      refContainer.clientWidth,
      refContainer.clientHeight
    );

    // Create the mini-map camera
    this.miniMapCamera = new Camera(
      this.miniMapCameraParameters,
      refContainer.clientWidth,
      refContainer.clientHeight
    );

    // Create the statistics and make its node invisible
    this.statistics = new Stats();
    this.statistics.dom.style.visibility = "hidden";
    refContainer.appendChild(this.statistics.dom);

    // Create a renderer and turn on shadows in the renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    if (this.generalParameters.setDevicePixelRatio) {
      this.renderer.setPixelRatio(window.devicePixelRatio);
    }
    this.renderer.autoClear = false;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setSize(refContainer.clientWidth, refContainer.clientHeight);
    refContainer.prepend(this.renderer.domElement);

    // Set the mouse move action (none)
    this.dragMiniMap = false;
    this.changeCameraDistance = false;
    this.changeCameraOrientation = false;

    // Set the game state
    this.gameRunning = false;

    // Get and configure the panel's <div> elements
    this.viewsPanel = document.getElementById("views-panel");
    this.view = document.getElementById("view");
    this.projection = document.getElementById("projection");
    this.horizontal = document.getElementById("horizontal");
    this.horizontal.step = 1;
    this.vertical = document.getElementById("vertical");
    this.vertical.step = 1;
    this.distance = document.getElementById("distance");
    this.distance.step = 0.1;
    this.zoom = document.getElementById("zoom");
    this.zoom.step = 0.1;
    this.reset = document.getElementById("reset");
    this.resetAll = document.getElementById("reset-all");
    this.helpPanel = document.getElementById("help-panel");
    this.helpPanel.style.visibility = "hidden";
    this.subwindowsPanel = document.getElementById("subwindows-panel");
    this.multipleViewsCheckBox = document.getElementById("multiple-views");
    this.multipleViewsCheckBox.checked = false;
    this.userInterfaceCheckBox = document.getElementById("user-interface");
    this.miniMapCheckBox = document.getElementById("mini-map");

    if (this.mazeParameters.isAnimationMode) {
      this.miniMapCheckBox.checked = false;
      this.userInterfaceCheckBox.checked = false;
    } else {
      this.userInterfaceCheckBox.checked = true;
      this.miniMapCheckBox.checked = true;
    }

    this.helpCheckBox = document.getElementById("help");
    this.helpCheckBox.checked = false;
    this.statisticsCheckBox = document.getElementById("statistics");
    this.statisticsCheckBox.checked = false;

    // Build the help panel
    this.buildHelpPanel();

    // Set the active view camera (fixed view)
    this.setActiveViewCamera(this.fixedViewCamera);

    // Arrange viewports by view mode
    this.arrangeViewports(this.multipleViewsCheckBox.checked);

    // Register the event handler to be called on window resize
    window.addEventListener("resize", (event) => this.windowResize(event));

    // Register the event handler to be called on key down
    document.addEventListener("keydown", this.keyChangeHandler);

    // Register the event handler to be called on key release
    document.addEventListener("keyup", this.keyUpHandler);

    // Register the event handler to be called on mouse down
    this.renderer.domElement.addEventListener("mousedown", (event) =>
      this.mouseDown(event)
    );

    // Register the event handler to be called on mouse move
    this.renderer.domElement.addEventListener("mousemove", (event) =>
      this.mouseMove(event)
    );

    // Register the event handler to be called on mouse up
    this.renderer.domElement.addEventListener("mouseup", (event) =>
      this.mouseUp(event)
    );

    // Register the event handler to be called on mouse wheel
    this.renderer.domElement.addEventListener("wheel", (event) =>
      this.mouseWheel(event)
    );

    // Register the event handler to be called on context menu
    this.renderer.domElement.addEventListener("contextmenu", (event) =>
      this.contextMenu(event)
    );

    // Register the event handler to be called on select, input number, or input checkbox change
    this.view.addEventListener("change", (event) => this.elementChange(event));
    this.projection.addEventListener("change", (event) =>
      this.elementChange(event)
    );
    this.horizontal.addEventListener("change", (event) =>
      this.elementChange(event)
    );
    this.vertical.addEventListener("change", (event) =>
      this.elementChange(event)
    );
    this.distance.addEventListener("change", (event) =>
      this.elementChange(event)
    );
    this.zoom.addEventListener("change", (event) => this.elementChange(event));
    this.multipleViewsCheckBox.addEventListener("change", (event) =>
      this.elementChange(event)
    );
    this.userInterfaceCheckBox.addEventListener("change", (event) =>
      this.elementChange(event)
    );
    this.helpCheckBox.addEventListener("change", (event) =>
      this.elementChange(event)
    );
    this.statisticsCheckBox.addEventListener("change", (event) =>
      this.elementChange(event)
    );

    // Register the event handler to be called on input button click
    this.reset.addEventListener("click", (event) => this.buttonClick(event));
    this.resetAll.addEventListener("click", (event) => this.buttonClick(event));

    this.activeElement = document.activeElement;

    if (this.mazeParameters.isAnimationMode) {
      this.maze.openNotification('Press "X" to start automated path!');
    }
  }

  splitCell(cell) {
    const coordinateSplitted = cell.split(",");
    const x = parseInt(coordinateSplitted[0].split("(")[1]);
    const y = parseInt(coordinateSplitted[1].split(")")[0]);

    return { x: parseInt(y - 1), y: parseInt(x - 1) };
  }

  splitElement(element) {
    const coordinateSplitted = element.split(">");
    const secondFloor = coordinateSplitted[1].split(")")[0];
    const buildingCode = secondFloor.split("_")[0];
    const floorNumber = secondFloor.split("_")[1];

    return { buildingCode: buildingCode, floorNumber: floorNumber };
  }

  calculateNextOrientation(currentCell, nextCell) {
    const currentCellSplitted = this.splitCell(currentCell);

    const nextCellSplitted = this.splitCell(nextCell);

    // Set initial direction
    if (currentCellSplitted.x === nextCellSplitted.x) {
      if (currentCellSplitted.y < nextCellSplitted.y) {
        return 90;
      } else {
        return 270;
      }
    } else {
      if (currentCellSplitted.x < nextCellSplitted.x) {
        return 0;
      } else {
        return 180;
      }
    }
  }

  organizePath(path) {
    const firstSplit = path.split("-");

    let organizedPath = [];

    for (let i = 0; i < firstSplit.length; i++) {
      if (firstSplit[i].includes("cell")) {
        organizedPath.push(this.splitCell(firstSplit[i]));
      } else {
        // elevator or passage

        let elementName;

        if (firstSplit[i].includes("elevator")) {
          elementName = "elevator";
        } else {
          elementName = "passage";
        }

        const elementData = this.splitElement(firstSplit[i]);

        const nextCell = this.splitCell(firstSplit[i + 1]);

        const nextOrientation = this.calculateNextOrientation(
          firstSplit[i + 1],
          firstSplit[i + 2]
        );

        organizedPath.push({
          buildingCode: elementData.buildingCode,
          floorNumber: elementData.floorNumber,
          nextCell: [nextCell.x, nextCell.y],
          nextOrientation: nextOrientation,
          element: elementName,
        });
      }
    }

    return organizedPath;
  }

  async turnToOrientation(firstCell, secondCell) {
    return new Promise((resolve) => {
      const playerDirection = this.mazeParameters.initialDirection;

      const ms = 820;

      const halfMs = ms / 2;

      let orientation;

      // if its the same direction resolve

      // Set initial direction
      if (firstCell.x === secondCell.x) {
        if (firstCell.y < secondCell.y) {
          this.isDiagonal = false;
          orientation = 90;
        } else {
          this.isDiagonal = false;
          orientation = 270;
        }
      } else if (firstCell.y === secondCell.y) {
        if (firstCell.x < secondCell.x) {
          this.isDiagonal = false;
          orientation = 0;
        } else {
          this.isDiagonal = false;
          orientation = 180;
        }
      } else if (
        firstCell.x + 1 === secondCell.x &&
        firstCell.y + 1 === secondCell.y
      ) {
        this.isDiagonal = true;
        orientation = 45;
      } else if (
        firstCell.x - 1 === secondCell.x &&
        firstCell.y + 1 === secondCell.y
      ) {
        this.isDiagonal = true;
        orientation = 135;
      } else if (
        firstCell.x + 1 === secondCell.x &&
        firstCell.y - 1 === secondCell.y
      ) {
        this.isDiagonal = true;
        orientation = 315;
      } else if (
        firstCell.x - 1 === secondCell.x &&
        firstCell.y - 1 === secondCell.y
      ) {
        this.isDiagonal = true;
        orientation = 225;
      }

      if (playerDirection === orientation) {
        resolve();
      }

      switch (playerDirection) {
        case 0:
          if (orientation === 270) {
            this.turnRight(ms).then(() => {
              this.mazeParameters.initialDirection = 270;
              resolve();
            });
          }
          if (orientation === 90) {
            this.turnLeft(ms).then(() => {
              this.mazeParameters.initialDirection = 90;
              resolve();
            });
          }
          if (orientation === 45) {
            this.turnLeft(halfMs).then(() => {
              this.mazeParameters.initialDirection = 45;
              resolve();
            });
          }
          if (orientation === 315) {
            this.turnRight(halfMs).then(() => {
              this.mazeParameters.initialDirection = 315;
              resolve();
            });
          }
          break;
        case 90:
          if (orientation === 0) {
            this.turnRight(ms).then(() => {
              this.mazeParameters.initialDirection = 0;
              resolve();
            });
          }
          if (orientation === 180) {
            this.turnLeft(ms).then(() => {
              this.mazeParameters.initialDirection = 180;
              resolve();
            });
          }
          if (orientation === 45) {
            this.turnRight(halfMs).then(() => {
              this.mazeParameters.initialDirection = 45;
              resolve();
            });
          }
          if (orientation === 135) {
            this.turnLeft(halfMs).then(() => {
              this.mazeParameters.initialDirection = 135;
              resolve();
            });
          }
          break;
        case 180:
          if (orientation === 90) {
            this.turnRight(ms).then(() => {
              this.mazeParameters.initialDirection = 90;
              resolve();
            });
          }
          if (orientation === 270) {
            this.turnLeft(ms).then(() => {
              this.mazeParameters.initialDirection = 270;
              resolve();
            });
          }
          if (orientation === 135) {
            this.turnRight(halfMs).then(() => {
              this.mazeParameters.initialDirection = 135;
              resolve();
            });
          }
          if (orientation === 225) {
            this.turnLeft(halfMs).then(() => {
              this.mazeParameters.initialDirection = 225;
              resolve();
            });
          }
          break;
        case 270:
          if (orientation === 180) {
            this.turnRight(ms).then(() => {
              this.mazeParameters.initialDirection = 180;
              resolve();
            });
          }
          if (orientation === 0) {
            this.turnLeft(ms).then(() => {
              this.mazeParameters.initialDirection = 0;
              resolve();
            });
          }
          if (orientation === 225) {
            this.turnRight(halfMs).then(() => {
              this.mazeParameters.initialDirection = 225;
              resolve();
            });
          }
          if (orientation === 315) {
            this.turnLeft(halfMs).then(() => {
              this.mazeParameters.initialDirection = 315;
              resolve();
            });
          }
          break;

        case 45:
          if (orientation === 0) {
            this.turnRight(halfMs).then(() => {
              this.mazeParameters.initialDirection = 0;
              resolve();
            });
          }
          if (orientation === 90) {
            this.turnLeft(halfMs).then(() => {
              this.mazeParameters.initialDirection = 90;
              resolve();
            });
          }
          if (orientation === 315) {
            this.turnRight(ms).then(() => {
              this.mazeParameters.initialDirection = 315;
              resolve();
            });
          }
          if (orientation === 135) {
            this.turnLeft(ms).then(() => {
              this.mazeParameters.initialDirection = 135;
              resolve();
            });
          }
          break;

        case 135:
          if (orientation === 90) {
            this.turnRight(halfMs).then(() => {
              this.mazeParameters.initialDirection = 90;
              resolve();
            });
          }
          if (orientation === 180) {
            this.turnLeft(halfMs).then(() => {
              this.mazeParameters.initialDirection = 180;
              resolve();
            });
          }
          if (orientation === 45) {
            this.turnRight(ms).then(() => {
              this.mazeParameters.initialDirection = 45;
              resolve();
            });
          }
          if (orientation === 225) {
            this.turnLeft(ms).then(() => {
              this.mazeParameters.initialDirection = 225;
              resolve();
            });
          }
          break;

        case 225:
          if (orientation === 180) {
            this.turnRight(halfMs).then(() => {
              this.mazeParameters.initialDirection = 180;
              resolve();
            });
          }
          if (orientation === 270) {
            this.turnLeft(halfMs).then(() => {
              this.mazeParameters.initialDirection = 270;
              resolve();
            });
          }
          if (orientation === 135) {
            this.turnRight(ms).then(() => {
              this.mazeParameters.initialDirection = 135;
              resolve();
            });
          }
          if (orientation === 315) {
            this.turnLeft(ms).then(() => {
              this.mazeParameters.initialDirection = 315;
              resolve();
            });
          }
          break;

        case 315:
          if (orientation === 270) {
            this.turnRight(halfMs).then(() => {
              this.mazeParameters.initialDirection = 270;
              resolve();
            });
          }
          if (orientation === 0) {
            this.turnLeft(halfMs).then(() => {
              this.mazeParameters.initialDirection = 0;
              resolve();
            });
          }
          if (orientation === 225) {
            this.turnRight(ms).then(() => {
              this.mazeParameters.initialDirection = 225;
              resolve();
            });
          }
          if (orientation === 45) {
            this.turnLeft(ms).then(() => {
              this.mazeParameters.initialDirection = 45;
              resolve();
            });
          }
          break;

        default:
          break;
      }
    });
  }

  async turnLeft(duration) {
    return new Promise((resolve) => {
      this.player.keyStates.left = true;

      setTimeout(() => {
        this.player.keyStates.left = false;

        resolve(); // Resolve the promise when the timeout is done
      }, duration);
    });
  }

  async turnRight(duration) {
    return new Promise((resolve) => {
      this.player.keyStates.right = true;

      setTimeout(() => {
        this.player.keyStates.right = false;

        resolve(); // Resolve the promise when the timeout is done
      }, duration);
    });
  }

  async moveForward(duration) {
    return new Promise((resolve) => {
      this.player.keyStates.forward = true;

      setTimeout(() => {
        this.player.keyStates.forward = false;

        resolve(); // Resolve the promise when the timeout is done
      }, duration);
    });
  }

  finalSequence() {
    // Set the final action
    this.animations.fadeToAction("Dance", 0.2);
  }

  relax(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async startAutomatedPath(path) {
    const organizedPath = this.organizePath(path);

    // walk to the next cell unless its an elevator or passage
    for (let i = 0; i < organizedPath.length; i++) {
      // if its last cell
      if (i === organizedPath.length - 1) {
        this.maze.openNotification("You have arrived at your destination!");
        this.finalSequence();

        // if its a cell to cell
      } else if (
        organizedPath[i].buildingCode === undefined &&
        organizedPath[i + 1].buildingCode === undefined
      ) {
        await this.turnToOrientation(organizedPath[i], organizedPath[i + 1]);

        if (this.isDiagonal) {
          await this.moveForward(1085.7);
        } else {
          await this.moveForward(770);
        }

        // if its a cell to element
      } else if (
        organizedPath[i].buildingCode === undefined &&
        organizedPath[i + 1].buildingCode !== undefined
      ) {
        let video;
        let time;

        if (organizedPath[i + 1].element === "elevator") {
          video = document.getElementById("elevatorVideo");
          time = 8500;
        } else {
          video = document.getElementById("passageVideo");
          time = 5500;
        }

        video.loop = true;
        video.muted = true;

        this.mazeParameters.initialDirection =
          organizedPath[i + 1].nextOrientation;

        // Play the video and make it visible
        video.play();
        video.style.display = "block"; // or 'inline-block' depending on your layout

        // change floor
        this.loadFloor(
          organizedPath[i + 1].buildingCode,
          organizedPath[i + 1].floorNumber,
          organizedPath[i + 1].nextCell,
          organizedPath[i + 1].nextOrientation,
          2
        );

        await this.relax(time);
        video.style.display = "none";
        video.pause();
        video.currentTime = 0;

        await this.relax(2000);

        // if its an element
      } else {
        continue;
      }
    }
  }

  buildHelpPanel() {
    const table = document.getElementById("help-table");
    let i = 0;
    for (const key in this.player.keyCodes) {
      while (table.rows[i].cells.length < 2) {
        i++;
      }
      table.rows[i++].cells[0].innerHTML = this.player.keyCodes[key];
    }
    table.rows[i].cells[0].innerHTML = this.player.credits;
  }

  displayPanel() {
    this.view.options.selectedIndex = [
      "fixed",
      "first-person",
      "third-person",
      "top",
    ].indexOf(this.activeViewCamera.view);
    this.projection.options.selectedIndex = [
      "perspective",
      "orthographic",
    ].indexOf(this.activeViewCamera.projection);
    this.horizontal.value = this.activeViewCamera.orientation.h.toFixed(0);
    this.vertical.value = this.activeViewCamera.orientation.v.toFixed(0);
    this.distance.value = this.activeViewCamera.distance.toFixed(1);
    this.zoom.value = this.activeViewCamera.zoom.toFixed(1);
  }

  // Set active view camera
  setActiveViewCamera(camera) {
    this.activeViewCamera = camera;
    this.horizontal.min = this.activeViewCamera.orientationMin.h.toFixed(0);
    this.horizontal.max = this.activeViewCamera.orientationMax.h.toFixed(0);
    this.vertical.min = this.activeViewCamera.orientationMin.v.toFixed(0);
    this.vertical.max = this.activeViewCamera.orientationMax.v.toFixed(0);
    this.distance.min = this.activeViewCamera.distanceMin.toFixed(1);
    this.distance.max = this.activeViewCamera.distanceMax.toFixed(1);
    this.zoom.min = this.activeViewCamera.zoomMin.toFixed(1);
    this.zoom.max = this.activeViewCamera.zoomMax.toFixed(1);
    this.displayPanel();
  }

  arrangeViewports(multipleViews) {
    this.fixedViewCamera.setViewport(multipleViews);
    this.firstPersonViewCamera.setViewport(multipleViews);
    this.thirdPersonViewCamera.setViewport(multipleViews);
    this.topViewCamera.setViewport(multipleViews);
  }

  pointerIsOverViewport(pointer, viewport) {
    return (
      pointer.x >= viewport.x &&
      pointer.x < viewport.x + viewport.width &&
      pointer.y >= viewport.y &&
      pointer.y < viewport.y + viewport.height
    );
  }

  getPointedViewport(pointer) {
    let viewport;
    // Check if the pointer is over the mini-map camera viewport
    if (this.miniMapCheckBox.checked) {
      viewport = this.miniMapCamera.getViewport();
      if (this.pointerIsOverViewport(pointer, viewport)) {
        return this.miniMapCamera.view;
      }
    }
    // Check if the pointer is over the remaining camera viewports
    let cameras;
    if (this.multipleViewsCheckBox.checked) {
      cameras = [
        this.fixedViewCamera,
        this.firstPersonViewCamera,
        this.thirdPersonViewCamera,
        this.topViewCamera,
      ];
    } else {
      cameras = [this.activeViewCamera];
    }
    for (const camera of cameras) {
      viewport = camera.getViewport();
      if (this.pointerIsOverViewport(pointer, viewport)) {
        return camera.view;
      }
    }
    // No camera viewport is being pointed
    return "none";
  }

  setViewMode(multipleViews) {
    // Single-view mode: false; multiple-views mode: true
    this.multipleViewsCheckBox.checked = multipleViews;
    this.arrangeViewports(this.multipleViewsCheckBox.checked);
  }

  setUserInterfaceVisibility(visible) {
    this.userInterfaceCheckBox.checked = visible;
    this.viewsPanel.style.visibility = visible ? "visible" : "hidden";
    // this.subwindowsPanel.style.visibility = visible ? "visible" : "hidden";
    this.userInterface.setVisibility(visible);
  }

  setUserInterfaceVisibible() {
    if (!this.mazeParameters.isAnimationMode) {
      this.userInterfaceCheckBox.checked = true;
      this.viewsPanel.style.visibility = "visible";
      this.subwindowsPanel.style.visibility = "visible";
      this.userInterface.setVisibility(true);
    }
  }

  setMiniMapVisibility(visible) {
    // Hidden: false; visible: true
    this.miniMapCheckBox.checked = visible;
  }

  setHelpVisibility(visible) {
    // Hidden: false; visible: true
    this.helpCheckBox.checked = visible;
    this.helpPanel.style.visibility = visible ? "visible" : "hidden";
  }

  setStatisticsVisibility(visible) {
    // Hidden: false; visible: true
    this.statisticsCheckBox.checked = visible;
    this.statistics.dom.style.visibility = visible ? "visible" : "hidden";
  }

  windowResize() {
    this.fixedViewCamera.updateWindowSize(
      this.refContainer.clientWidth,
      this.refContainer.clientHeight
    );
    this.firstPersonViewCamera.updateWindowSize(
      this.refContainer.clientWidth,
      this.refContainer.clientHeight
    );
    this.thirdPersonViewCamera.updateWindowSize(
      this.refContainer.clientWidth,
      this.refContainer.clientHeight
    );
    this.topViewCamera.updateWindowSize(
      this.refContainer.clientWidth,
      this.refContainer.clientHeight
    );
    this.miniMapCamera.updateWindowSize(
      this.refContainer.clientWidth,
      this.refContainer.clientHeight
    );
    this.renderer.setSize(
      this.refContainer.clientWidth,
      this.refContainer.clientHeight
    );
  }

  keyChange(event, state) {
    if (document.activeElement === document.body) {
      // Prevent the "Space" and "Arrow" keys from scrolling the document's content
      if (
        event.code === "Space" ||
        event.code === "ArrowLeft" ||
        event.code === "ArrowRight" ||
        event.code === "ArrowDown" ||
        event.code === "ArrowUp"
      ) {
        event.preventDefault();
      }

      if (
        event.code === this.player.keyCodes.fixedView &&
        state &&
        !this.mazeParameters.isAnimationMode
      ) {
        // Select fixed view
        this.setActiveViewCamera(this.fixedViewCamera);
      } else if (
        event.code === this.player.keyCodes.firstPersonView &&
        state &&
        !this.mazeParameters.isAnimationMode
      ) {
        // Select first-person view
        this.setActiveViewCamera(this.firstPersonViewCamera);
      } else if (
        event.code === this.player.keyCodes.thirdPersonView &&
        state &&
        !this.mazeParameters.isAnimationMode
      ) {
        // Select third-person view
        this.setActiveViewCamera(this.thirdPersonViewCamera);
      } else if (
        event.code === this.player.keyCodes.topView &&
        state &&
        !this.mazeParameters.isAnimationMode
      ) {
        // Select top view
        this.setActiveViewCamera(this.topViewCamera);
      }
      if (
        event.code === this.player.keyCodes.viewMode &&
        state &&
        !this.mazeParameters.isAnimationMode
      ) {
        // Single-view mode / multiple-views mode
        this.setViewMode(!this.multipleViewsCheckBox.checked);
      }
      if (
        event.code === this.player.keyCodes.userInterface &&
        state &&
        !this.mazeParameters.isAnimationMode
      ) {
        // Display / hide user interface
        this.setUserInterfaceVisibility(!this.userInterfaceCheckBox.checked);
      }
      if (
        event.code === this.player.keyCodes.miniMap &&
        state &&
        !this.mazeParameters.isAnimationMode
      ) {
        // Display / hide mini-map
        this.setMiniMapVisibility(
          !this.miniMapCheckBox.checked && !this.mazeParameters.isAnimationMode
        );
      }
      if (
        event.code === this.player.keyCodes.help &&
        state &&
        !this.mazeParameters.isAnimationMode
      ) {
        // Display / hide help
        this.setHelpVisibility(!this.helpCheckBox.checked);
      }
      if (
        event.code === this.player.keyCodes.statistics &&
        state &&
        !this.mazeParameters.isAnimationMode
      ) {
        // Display / hide statistics
        this.setStatisticsVisibility(!this.statisticsCheckBox.checked);
      }
      if (
        event.code === this.player.keyCodes.run &&
        !this.mazeParameters.isAnimationMode
      ) {
        this.player.keyStates.run = state;
      }
      if (
        event.code === this.player.keyCodes.left &&
        !this.mazeParameters.isAnimationMode
      ) {
        this.player.keyStates.left = state;
      } else if (
        event.code === this.player.keyCodes.right &&
        !this.mazeParameters.isAnimationMode
      ) {
        this.player.keyStates.right = state;
      }
      if (
        event.code === this.player.keyCodes.backward &&
        !this.mazeParameters.isAnimationMode
      ) {
        this.player.keyStates.backward = state;
      } else if (
        event.code === this.player.keyCodes.forward &&
        !this.mazeParameters.isAnimationMode
      ) {
        this.player.keyStates.forward = state;
      }
      if (
        event.code === this.player.keyCodes.jump &&
        !this.mazeParameters.isAnimationMode
      ) {
        this.player.keyStates.jump = state;
      } else if (
        event.code === this.player.keyCodes.yes &&
        !this.mazeParameters.isAnimationMode
      ) {
        this.player.keyStates.yes = state;
      } else if (
        event.code === this.player.keyCodes.no &&
        !this.mazeParameters.isAnimationMode
      ) {
        this.player.keyStates.no = state;
      } else if (
        event.code === this.player.keyCodes.wave &&
        !this.mazeParameters.isAnimationMode
      ) {
        this.player.keyStates.wave = state;
      } else if (
        event.code === this.player.keyCodes.punch &&
        !this.mazeParameters.isAnimationMode
      ) {
        this.player.keyStates.punch = state;
      } else if (
        event.code === this.player.keyCodes.thumbsUp &&
        !this.mazeParameters.isAnimationMode
      ) {
        this.player.keyStates.thumbsUp = state;
      }

      // Check if the pressed key is "P"
      if (
        event.code === "KeyP" &&
        state &&
        !this.mazeParameters.isAnimationMode
      ) {
        const currentTime = new Date().getTime();

        // Check if the time elapsed since the last key press is greater than the cooldown time
        if (currentTime - this.lastKeyPressTime > this.cooldownTime) {
          // Call your custom function for the "P" key action
          this.moveDoor(this.player.position);

          // Update the last key press time
          this.lastKeyPressTime = currentTime;
        }
      }

      // Check if the pressed key is "E"
      if (
        event.code === "KeyE" &&
        state &&
        !this.mazeParameters.isAnimationMode
      ) {
        this.maze.changeFloor(this.loadFloor);
      }

      // Check if the pressed key is "X" to start automatedPath
      if (
        event.code === "KeyX" &&
        state &&
        this.mazeParameters.isAnimationMode
      ) {
        document.removeEventListener("keydown", this.keyChangeHandler);
        this.maze.closeNotification();
        this.startAutomatedPath(this.mazeParameters.path);
      }

      // Check if there was a click on the screen to start automatedPath
        if (
            event.code === "Mouse0" &&
            state &&
            this.mazeParameters.isAnimationMode
        ) {
            document.removeEventListener("keydown", this.keyChangeHandler);
            this.maze.closeNotification();
            this.startAutomatedPath(this.mazeParameters.path);
        }
    }
  }

  async moveDoor() {
    await this.maze.moveDoor(this.player.position);
  }

  mouseDown(event) {
    if (event.buttons === 1 || event.buttons === 2) {
      // Primary or secondary button down
      // Store current mouse position in window coordinates (mouse coordinate system: origin in the top-left corner; window coordinate system: origin in the bottom-left corner)
      this.mousePosition = new THREE.Vector2(
        event.clientX,
        this.refContainer.clientHeight - event.clientY - 1
      );
      // Select the camera whose view is being pointed
      const cameraView = this.getPointedViewport(this.mousePosition);
      if (cameraView !== "none") {
        if (cameraView === "mini-map") {
          // Mini-map camera selected
          if (event.buttons === 1) {
            // Primary button down
            this.dragMiniMap = true;
          }
        } else {
          // One of the remaining cameras selected
          const cameraIndex = [
            "fixed",
            "first-person",
            "third-person",
            "top",
          ].indexOf(cameraView);
          this.view.options.selectedIndex = cameraIndex;
          this.setActiveViewCamera(
            [
              this.fixedViewCamera,
              this.firstPersonViewCamera,
              this.thirdPersonViewCamera,
              this.topViewCamera,
            ][cameraIndex]
          );
          if (event.buttons === 1) {
            // Primary button down
            this.changeCameraDistance = true;
          } else {
            // Secondary button down
            this.changeCameraOrientation = true;
          }
        }
      }
    }
  }

  mouseMove(event) {

    // Mouse position in normalized device coordinates (NDC) coordinates
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update the picking ray with the camera and mouse position
    this.raycaster.setFromCamera(this.mouse, this.activeViewCamera.perspective);
 
    // Calls the method that shows the sprite when the cursor is over a door or elevator
    this.maze.showSprite(this.raycaster);

    if (event.buttons === 1 || event.buttons === 2) {
      // Primary or secondary button down
      if (
        this.changeCameraDistance ||
        this.changeCameraOrientation ||
        this.dragMiniMap
      ) {
        // Mouse action in progress
        // Compute mouse movement and update mouse position
        const newMousePosition = new THREE.Vector2(
          event.clientX,
          this.refContainer.clientHeight - event.clientY - 1
        );
        const mouseIncrement = newMousePosition.clone().sub(this.mousePosition);
        this.mousePosition = newMousePosition;
        if (event.buttons === 1) {
          // Primary button down
          if (this.changeCameraDistance) {
            this.activeViewCamera.updateDistance(
              -0.05 * (mouseIncrement.x + mouseIncrement.y)
            );
            this.displayPanel();
          } else if (this.dragMiniMap) {
            const windowMinSize = Math.min(
              this.refContainer.clientWidth,
              this.refContainer.clientHeight
            );
            const width = this.miniMapCamera.viewport.width * windowMinSize;
            const height = this.miniMapCamera.viewport.height * windowMinSize;
            this.miniMapCamera.viewport.x +=
              mouseIncrement.x / (this.refContainer.clientWidth - width);
            this.miniMapCamera.viewport.y +=
              mouseIncrement.y / (this.refContainer.clientHeight - height);
          }
        } else {
          // Secondary button down
          if (this.changeCameraOrientation) {
            this.activeViewCamera.updateOrientation(
              mouseIncrement.multiply(new THREE.Vector2(-0.5, 0.5))
            );
            this.displayPanel();
          }
        }
      }
    }
  }

  mouseUp(event) {
    // Reset mouse move action
    this.dragMiniMap = false;
    this.changeCameraDistance = false;
    this.changeCameraOrientation = false;
  }

  mouseWheel(event) {
    // Prevent the mouse wheel from scrolling the document's content
    event.preventDefault();
    // Store current mouse position in window coordinates (mouse coordinate system: origin in the top-left corner; window coordinate system: origin in the bottom-left corner)
    this.mousePosition = new THREE.Vector2(
      event.clientX,
      this.refContainer.clientHeight - event.clientY - 1
    );
    // Select the camera whose view is being pointed
    const cameraView = this.getPointedViewport(this.mousePosition);
    if (cameraView !== "none" && cameraView !== "mini-map") {
      // One of the remaining cameras selected
      const cameraIndex = [
        "fixed",
        "first-person",
        "third-person",
        "top",
      ].indexOf(cameraView);
      this.view.options.selectedIndex = cameraIndex;
      const activeViewCamera = [
        this.fixedViewCamera,
        this.firstPersonViewCamera,
        this.thirdPersonViewCamera,
        this.topViewCamera,
      ][cameraIndex];
      activeViewCamera.updateZoom(-0.001 * event.deltaY);
      this.setActiveViewCamera(activeViewCamera);
    }
  }

  contextMenu(event) {
    // Prevent the context menu from appearing when the secondary mouse button is clicked
    event.preventDefault();
  }

  elementChange(event) {
    switch (event.target.id) {
      case "view":
        this.setActiveViewCamera(
          [
            this.fixedViewCamera,
            this.firstPersonViewCamera,
            this.thirdPersonViewCamera,
            this.topViewCamera,
          ][this.view.options.selectedIndex]
        );
        break;
      case "projection":
        this.activeViewCamera.setActiveProjection(
          ["perspective", "orthographic"][this.projection.options.selectedIndex]
        );
        this.displayPanel();
        break;
      case "horizontal":
      case "vertical":
      case "distance":
      case "zoom":
        if (event.target.checkValidity()) {
          switch (event.target.id) {
            case "horizontal":
            case "vertical":
              this.activeViewCamera.setOrientation(
                new Orientation(this.horizontal.value, this.vertical.value)
              );
              break;
            case "distance":
              this.activeViewCamera.setDistance(this.distance.value);
              break;
            case "zoom":
              this.activeViewCamera.setZoom(this.zoom.value);
              break;
            default:
              console.warn("Unexpected case:", event.target.id);
              break;
          }
        }
        break;
      case "multiple-views":
        this.setViewMode(event.target.checked);
        break;
      case "user-interface":
        this.setUserInterfaceVisibility(event.target.checked);
        break;
      case "help":
        this.setHelpVisibility(event.target.checked);
        break;
      case "statistics":
        this.setStatisticsVisibility(event.target.checked);
        break;
      default:
        console.warn("Unexpected case:", event.target.id);
        break;
    }
  }

  buttonClick(event) {
    switch (event.target.id) {
      case "reset":
        this.activeViewCamera.initialize();
        break;
      case "reset-all":
        this.fixedViewCamera.initialize();
        this.firstPersonViewCamera.initialize();
        this.thirdPersonViewCamera.initialize();
        this.topViewCamera.initialize();
        break;
      default:
        console.warn("Unexpected case:", event.target.id);
        break;
    }
    this.displayPanel();
  }

  finalSequence() {
    // Disable the fog
    this.fog.enabled = false;
    // Reconfigure the third-person view camera
    this.thirdPersonViewCamera.setOrientation(
      new Orientation(180.0, this.thirdPersonViewCamera.initialOrientation.v)
    );
    this.thirdPersonViewCamera.setDistance(
      this.thirdPersonViewCamera.initialDistance
    );
    this.thirdPersonViewCamera.setZoom(2.0);
    // Set it as the active view camera
    this.setActiveViewCamera(this.thirdPersonViewCamera);
    // Set single-view mode
    this.setViewMode(false);
    // Set the final action
    this.animations.fadeToAction("Dance", 0.2);
  }

  collision(position) {
    return (
      this.maze.distanceToWestWall(position) < this.player.radius ||
      this.maze.distanceToEastWall(position) < this.player.radius ||
      this.maze.distanceToNorthWall(position) < this.player.radius ||
      this.maze.distanceToSouthWall(position) < this.player.radius
    );
  }

  changeMap(mazeParameters) {
    this.scene3D.remove(this.maze.object);
    this.maze = new Maze(mazeParameters);
  }

  // Function to open the notification box with a specific message
  openNotification(message) {
    var notificationBox = document.getElementById("notification-box");
    var messageElement = document.getElementById("notification-message");

    // Set the message
    messageElement.innerHTML = message;

    // Show the notification box
    notificationBox.style.bottom = "20px"; // You can adjust the position as needed
  }

  // Function to close the notification box
  closeNotification() {
    var notificationBox = document.getElementById("notification-box");

    // Hide the notification box
    notificationBox.style.bottom = "-100px"; // Move it off-screen or adjust as needed
  }

  start() {
    this.setUserInterfaceVisibible();
    // Reconfigure the third-person view camera
    this.thirdPersonViewCamera.setOrientation(
      new Orientation(0.0, this.thirdPersonViewCamera.initialOrientation.v)
    );
    this.thirdPersonViewCamera.setDistance(
      this.thirdPersonViewCamera.initialDistance
    );
    this.thirdPersonViewCamera.setZoom(this.thirdPersonViewCamera.initialZoom);
    // Set it as the active view camera
    this.setActiveViewCamera(this.thirdPersonViewCamera);

    this.scene3D.add(this.maze.object);
    this.scene3D.add(this.player.object);

    //Set the player's position and direction
    this.player.position = this.maze.initialPosition.clone();
    this.player.direction = this.maze.initialDirection;

    // Create model animations (states, emotes and expressions)
    this.animations = new Animations(
      this.player.object,
      this.player.animations
    );

    if (!this.mazeParameters.isAnimationMode) {
      this.userInterface.delete();
      this.userInterface = new UserInterface(
        this.refContainer,
        this.scene3D,
        this.renderer,
        this.lights,
        this.fog,
        this.player.object,
        this.animations,
        this.miniMapCamera,
        this.player
      );
    }
    this.gameRunning = true;
  }

  stop() {
    document.removeEventListener("keydown", this.keyChangeHandler);
    document.removeEventListener("keyup", this.keyUpHandler);
  }

  update() {
    if (!this.gameRunning) {
      if (this.maze.loaded && this.player.loaded) {
        // If all resources have been loaded
        // Add the maze, the player and the lights to the scene
        this.scene3D.add(this.lights.object);

        // Create the clock
        this.clock = new THREE.Clock();

        // Create model animations (states, emotes and expressions)
        if (this.animations === null || this.animations === undefined) {
          this.animations = new Animations(
            this.player.object,
            this.player.animations
          );
        }

        // Create the user interface
        if (
          (this.userInterface === null || this.userInterface === undefined) &&
          !this.mazeParameters.isAnimationMode
        ) {
          this.userInterface = new UserInterface(
            this.refContainer,
            this.scene3D,
            this.renderer,
            this.lights,
            this.fog,
            this.player.object,
            this.animations,
            this.miniMapCamera,
            this.player
          );
        }
      }
    } else {
      // Update the model animations
      const deltaT = this.clock.getDelta();
      this.animations.update(deltaT);

      if (this.lastWidth !== this.refContainer.clientWidth) {
        this.windowResize();
        this.lastWidth = this.refContainer.clientWidth;
      }

      // Update the player
      if (!this.animations.actionInProgress) {
        // Check if the player found the exit
        this.maze.checkIfFoundConnection(this.player.position);

        let coveredDistance = this.player.walkingSpeed * deltaT;
        let directionIncrement = this.player.turningSpeed * deltaT;
        if (this.player.keyStates.run) {
          coveredDistance *= this.player.runningFactor;
          directionIncrement *= this.player.runningFactor;
        }
        if (this.player.keyStates.left) {
          this.player.direction += directionIncrement;
        } else if (this.player.keyStates.right) {
          this.player.direction -= directionIncrement;
        }
        const direction = THREE.MathUtils.degToRad(this.player.direction);
        if (this.player.keyStates.backward) {
          const newPosition = new THREE.Vector3(
            -coveredDistance * Math.sin(direction),
            0.0,
            -coveredDistance * Math.cos(direction)
          ).add(this.player.position);
          if (this.collision(newPosition)) {
            this.animations.fadeToAction("Death", 0.2);
          } else {
            this.animations.fadeToAction(
              this.player.keyStates.run ? "Running" : "Walking",
              0.2
            );
            this.player.position = newPosition;
          }
        } else if (this.player.keyStates.forward) {
          const newPosition = new THREE.Vector3(
            coveredDistance * Math.sin(direction),
            0.0,
            coveredDistance * Math.cos(direction)
          ).add(this.player.position);
          if (this.collision(newPosition)) {
            this.animations.fadeToAction("Death", 0.2);
          } else {
            this.animations.fadeToAction(
              this.player.keyStates.run ? "Running" : "Walking",
              0.2
            );
            this.player.position = newPosition;
          }
        } else if (this.player.keyStates.jump) {
          this.animations.fadeToAction("Jump", 0.2);
        } else if (this.player.keyStates.yes) {
          this.animations.fadeToAction("Yes", 0.2);
        } else if (this.player.keyStates.no) {
          this.animations.fadeToAction("No", 0.2);
        } else if (this.player.keyStates.wave) {
          this.animations.fadeToAction("Wave", 0.2);
        } else if (this.player.keyStates.punch) {
          this.animations.fadeToAction("Punch", 0.2);
        } else if (this.player.keyStates.thumbsUp) {
          this.animations.fadeToAction("ThumbsUp", 0.2);
        } else {
          this.animations.fadeToAction(
            "Idle",
            this.animations.activeName !== "Death" ? 0.2 : 0.6
          );
        }
        this.player.object.position.set(
          this.player.position.x,
          this.player.position.y,
          this.player.position.z
        );
        this.player.object.rotation.y =
          direction - this.player.initialDirection;
      }

      // Update first-person, third-person and top view cameras parameters (player direction and target)
      this.firstPersonViewCamera.playerDirection = this.player.direction;
      this.thirdPersonViewCamera.playerDirection = this.player.direction;
      this.topViewCamera.playerDirection = this.player.direction;
      const target = new THREE.Vector3(
        this.player.position.x,
        this.player.position.y + this.player.eyeHeight,
        this.player.position.z
      );
      this.firstPersonViewCamera.setTarget(target);
      this.thirdPersonViewCamera.setTarget(target);
      this.topViewCamera.setTarget(target);

      // Update statistics
      this.statistics.update();

      // Render primary viewport(s)
      this.renderer.clear();

      if (this.fog.enabled) {
        this.scene3D.fog = this.fog.object;
      } else {
        this.scene3D.fog = null;
      }
      let cameras;
      if (this.multipleViewsCheckBox.checked) {
        cameras = [
          this.fixedViewCamera,
          this.firstPersonViewCamera,
          this.thirdPersonViewCamera,
          this.topViewCamera,
        ];
      } else {
        cameras = [this.activeViewCamera];
      }
      for (const camera of cameras) {
        this.player.object.visible = camera !== this.firstPersonViewCamera;
        const viewport = camera.getViewport();
        this.renderer.setViewport(
          viewport.x,
          viewport.y,
          viewport.width,
          viewport.height
        );
        this.renderer.render(this.scene3D, camera.object);
        this.renderer.render(this.scene2D, this.camera2D);
        this.renderer.clearDepth();
      }

      // Render secondary viewport (mini-map)
      if (this.miniMapCheckBox.checked) {
        this.scene3D.fog = null;
        this.player.object.visible = true;
        const viewport = this.miniMapCamera.getViewport();
        this.renderer.setViewport(
          viewport.x,
          viewport.y,
          viewport.width,
          viewport.height
        );
        this.renderer.render(this.scene3D, this.miniMapCamera.object);
        this.renderer.render(this.scene2D, this.camera2D);
      }
    }
  }
}
