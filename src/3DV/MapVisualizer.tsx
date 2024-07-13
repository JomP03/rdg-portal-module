import React, { useEffect, useState, useRef } from "react";

import * as THREE from "three";

import "./map-visualizer.css";
import Main from "./View/main";
import Orientation from "./View/orientation";
import SelectFloorForm from "./SelectFloorForm";
import { MapData } from "./MapData";
import { toast } from "react-toastify";
import { appConfig } from "../services/ConfigService/ConfigService";

interface MapVisualizerProps {
  isAnimationMode?: boolean;
  height?: string;
  path?: any;
  buildingCode?: string;
  floorNumber?: number;
  initialPosition?: number[];
  initialDirection?: number;
  isReadyToVisualize?: boolean;
}

let tryTime = 0;

const MapVisualizer: React.FC<MapVisualizerProps> = ({
  isAnimationMode = false,
  height,
  path,
  buildingCode,
  floorNumber,
  initialPosition = [0, 0],
  initialDirection = 0.0,
  isReadyToVisualize,
}) => {
  const floorView = useRef<Main | null>(null);
  const [refContainer, setRefContainer] = useState<HTMLDivElement | null>(null);
  const [mapData, setMapData] = useState<MapData>({
    groundTextureUrl: "./../textures/ground.jpg",
    wallTextureUrl: "./../textures/wall.jpg",
    elevatorModel: "./../models/gltf/Elevator/scene.gltf",
    doorModel: "./../models/gltf/Door/scene.gltf",
    doorFrameModel: "./../models/gltf/DoorFrame/scene.gltf",
    passageModel: "./../models/gltf/Passage/scene.gltf",
    size: { width: 0, height: 0 },
    map: [[]],
    initialPosition: initialPosition,
    initialDirection: initialDirection,
    connections: [],
    floorElements: [],
    tryTime: 0,
    isAnimationMode: isAnimationMode,
    path: path,
  });

  let tryTime = 0;

  // State responsible for the visibility of the map visualizer
  const [isMapVisible, setIsMapVisible] = useState<boolean>(false);

  const loadFloor = async (
    buildingCode: string,
    floorNumber: number,
    initialPosition: number[] = [0, 0],
    initialDirection: number = 0,
    tryTime: number = 0
  ) => {
    if ((tryTime > -1 && isAnimationMode) || !isAnimationMode) {
      // remove spaces from building code
      buildingCode = buildingCode.replace(/\s/g, "");

      const token = localStorage.getItem('token');

      const response = await fetch(
          `${appConfig.DataApiHost}/api/campus/floors/floorPlan?buildingCode=${buildingCode}&floorNumber=${floorNumber}`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }
      );

      // enable map visualizer
      setIsMapVisible(true);

      const floorInfoDiv = document.getElementById("floor-info");

      // Check if the element exists before manipulating it
      if (floorInfoDiv) {
        const floorTextDiv = floorInfoDiv.children[0] as HTMLElement;
        floorTextDiv.innerText = "Floor " + floorNumber;

        const buildingTextDiv = floorInfoDiv.children[1] as HTMLElement;
        buildingTextDiv.innerText = "Building " + buildingCode;
      }

      if (!response.ok) {
        toast.error(
          `There is no Floor ${floorNumber} in Building ${buildingCode}!`
        );
      } else {
        const data = await response.json();

        // Process the data as needed
        const { size, map, connections, floorElements } = data;
        setMapData((previousMapData) => ({
          ...previousMapData,
          size: {
            width: size.width,
            height: size.length,
          },
          map,
          initialPosition,
          initialDirection,
          connections: connections,
          floorElements: floorElements,
          tryTime: tryTime,
        }));
      }
    }
  };

  useEffect(() => {
    function initialize() {
      // Create the game
      floorView.current = new Main(
        refContainer,
        {},
        { ...mapData, scale: new THREE.Vector3(1.0, 0.5, 1.0) },
        {},
        {
          ambientLight: { intensity: 0.1 },
          pointLight1: {
            intensity: 50.0,
            distance: 20.0,
            position: new THREE.Vector3(-3.5, 10.0, 2.5),
          },
          pointLight2: {
            intensity: 50.0,
            distance: 20.0,
            position: new THREE.Vector3(3.5, 10.0, -2.5),
          },
        }, // Lights parameters
        {}, // Fog parameters
        {
          view: "fixed",
          multipleViewsViewport: new THREE.Vector4(0.0, 1.0, 0.45, 0.5),
        }, // Fixed view camera parameters
        {
          view: "first-person",
          multipleViewsViewport: new THREE.Vector4(1.0, 1.0, 0.55, 0.5),
          initialOrientation: new Orientation(0.0, -10.0),
          initialDistance: 2.0,
          distanceMin: 1.0,
          distanceMax: 4.0,
        }, // First-person view camera parameters
        {
          view: "third-person",
          multipleViewsViewport: new THREE.Vector4(0.0, 0.0, 0.55, 0.5),
          initialOrientation: new Orientation(0.0, -55.0),
          initialDistance: 4.0,
          distanceMin: 1.0,
          distanceMax: 5.0,
          initialZoom: 0.75,
        }, // Third-person view camera parameters
        {
          view: "top",
          multipleViewsViewport: new THREE.Vector4(1.0, 0.0, 0.45, 0.5),
          initialOrientation: new Orientation(0.0, -90.0),
          initialDistance: 4.0,
          distanceMin: 1.0,
          distanceMax: 16.0,
        }, // Top view camera parameters
        {
          view: "mini-map",
          multipleViewsViewport: new THREE.Vector4(0.99, 0.02, 0.5, 0.5),
          initialOrientation: new Orientation(0.0, -90.0),
          initialZoom: 0.5,
        }, // Mini-msp view camera parameters
        loadFloor
      );
    }

    const animate = () => {
      if (floorView) {
        requestAnimationFrame(animate);
        floorView.current?.update();
      }
    };

    if (refContainer) {
      initialize();
      animate();
    }

    return () => {
      floorView.current?.stop();
      floorView.current = null;
    };
  }, [refContainer]);

  useEffect(() => {
    floorView.current?.changeMap({
      ...mapData,
      scale: new THREE.Vector3(1.0, 0.5, 1.0),
    });
    floorView.current?.start();
  }, [mapData]);

  const sleep = (milliseconds: number) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  useEffect(() => {
    if (isAnimationMode) {
      setIsMapVisible(true);
    }

    sleep(2000).then(() => {
      if (
        buildingCode &&
        floorNumber &&
        initialPosition &&
        initialDirection &&
        isAnimationMode
      ) {
        loadFloor(buildingCode, floorNumber, initialPosition, initialDirection);
      }
    });
  }, [isReadyToVisualize]);

  return (
    <>
      {!isAnimationMode && (
        <div className="wrapper-visua">
          <SelectFloorForm loadFloor={loadFloor} />
        </div>
      )}
      <div
        className="map-visualizer-container"
        style={{ display: isMapVisible ? "block" : "none", height: height }}
      >
        <div
          id="three-scene"
          className="three-scene"
          ref={(div) => setRefContainer(div)}
        >
          <div id="parent">
            {/* Video Container */}
            <div id="video-container">
              <video id="elevatorVideo" className="fullscreen-video" muted loop>
                <source src="./../videos/elevator.mp4" type="video/mp4"></source>
              </video>
              <video id="passageVideo" className="fullscreen-video" muted loop>
                <source src="./../videos/passage.mp4" type="video/mp4"></source>
              </video>
            </div>
            <div id="views-panel">
              <table className="views">
                <tbody>
                  <tr>
                    <td>
                      <label>View:</label>
                      <select id="view">
                        <option value="fixed">Fixed</option>
                        <option value="first">First-person</option>
                        <option value="third">Third-person</option>
                        <option value="top">Top</option>
                      </select>
                    </td>
                    <td>
                      <label>Orientation (h):</label>
                      <input type="number" id="horizontal" required />
                    </td>
                    <td>
                      <label>Orientation (v):</label>
                      <input type="number" id="vertical" required />
                    </td>
                    <td>
                      <input type="button" id="reset" value="Reset view" />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label>Projection:</label>
                      <select id="projection">
                        <option value="perspective">Perspective</option>
                        <option value="orthographic">Orthographic</option>
                      </select>
                    </td>
                    <td>
                      <label>Distance:</label>
                      <input type="number" id="distance" required />
                    </td>
                    <td>
                      <label>Zoom:</label>
                      <input type="number" id="zoom" required />
                    </td>
                    <td>
                      <input
                        type="button"
                        id="reset-all"
                        value="Reset all views"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div id="notification-box" className="notification-box">
              <span id="notification-message"></span>
            </div>
            <div id="floor-info" className="floor-info">
              <div></div>
              <div></div>
            </div>
            <div id="help-panel">
              <table className="help" id="help-table">
                <tbody>
                  <tr>
                    <th colSpan={2} className="font-size: 3.0vmin" style={{ color: "#0717f5" }}>
                      Help
                    </th>
                  </tr>
                  <tr>
                    <th colSpan={2} style={{ textAlign: "left", color: "#a607f5" }}>
                      Select active view
                    </th>
                  </tr>
                  <tr>
                    <td></td>
                    <td>Fixed view</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>First-person view</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>Third-person view</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>Top view</td>
                  </tr>
                  <tr>
                  <th colSpan={2} style={{ textAlign: "left", color: "#a607f5" }}>
                      Toggle view mode
                    </th>
                  </tr>
                  <tr>
                    <td></td>
                    <td>Single-view mode / multiple-views mode</td>
                  </tr>
                  <tr>
                  <th colSpan={2} style={{ textAlign: "left", color: "#a607f5" }}>
                      Display / hide subwindows
                    </th>
                  </tr>
                  <tr>
                    <td></td>
                    <td>User interface</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>Mini-map</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>Help</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>Statistics</td>
                  </tr>
                  <tr>
                  <th colSpan={2} style={{ textAlign: "left", color: "#a607f5" }}>
                      Move character
                    </th>
                  </tr>
                  <tr>
                    <td></td>
                    <td>Walk / run (modifier key)</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>Turn left slowly / quickly</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>Turn right slowly / quickly</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>Walk / run backward</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>Walk / run forward</td>
                  </tr>
                  <tr>
                  <th colSpan={2} style={{ textAlign: "left", color: "#a607f5" }}>
                      Game Actions
                    </th>
                  </tr>
                  <tr>
                    <td></td>
                    <td>Jump Animation</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>Yes Animation</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>No Animation</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>Wave Animation</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>Punch Animation / Open Door</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>Thumbs up Animation</td>
                  </tr>
                  <tr>
                    <td colSpan={2} style={{ textAlign: "right" }}></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div id="subwindows-panel">
              <table className="subwindows">
                <tbody>
                  <tr>
                    <td>
                      <label>Multiple views:</label>
                      <input type="checkbox" id="multiple-views" />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label>User interface:</label>
                      <input type="checkbox" id="user-interface" />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label>Mini-map:</label>
                      <input type="checkbox" id="mini-map" />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label>Help:</label>
                      <input type="checkbox" id="help" />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label>Statistics:</label>
                      <input type="checkbox" id="statistics" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MapVisualizer;
