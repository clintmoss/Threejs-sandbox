import * as THREE from 'three';
import { PointerLockControls } from 'three-stdlib';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import * as idData from './public/js/IdData'

const scene = new THREE.Scene(); // create a new scene

// Create a camera, which defines where we're looking at.
const camera = new THREE.PerspectiveCamera(
  75, // Field of view
  window.innerWidth / window.innerHeight, // aspect ratio
  0.1, // near clipping plane
  10000 // far clipping plane
);
scene.add(camera); // add the camera to the scene
camera.position.z = 5; // move camera back 5 units
camera.far = 10000;
camera.updateProjectionMatrix(); // update the camera's projection matrix


// Create a render and set the size and background color
const renderer = new THREE.WebGLRenderer({ antialias: false }); // antialias means smooth edges
renderer.setSize(window.innerWidth, window.innerHeight); // set size of renderer
renderer.setClearColor(0xffffff, 1); //background color
document.body.appendChild(renderer.domElement); // add renderer to html

// Create a painting
function createPainting(imageURL, width, height, position) {
  const textureLoader = new THREE.TextureLoader();
  const paintingTexture = textureLoader.load(imageURL);
  const paintingMaterial = new THREE.MeshBasicMaterial({
    map: paintingTexture,
  });
  const paintingGeometry = new THREE.PlaneGeometry(width, height);
  const painting = new THREE.Mesh(paintingGeometry, paintingMaterial);
  painting.position.set(position.x, position.y, position.z);
  return painting;
}

// Create paintings and add them to the scene
const painting1 = createPainting(
  `../src/public/artworks/${idData.imageArray[0]}`,
  10,
  5,
  new THREE.Vector3(-10, 3, -19.99)
);

const painting2 = createPainting(
  `../src/public/artworks/${idData.imageArray[1]}`,
  10,
  5,
  new THREE.Vector3(10, 3, -19.99)
);

// Paintings on the left wall
const painting3 = createPainting(
  `../src/public/artworks/${idData.imageArray[2]}`,
  10,
  5,
  new THREE.Vector3(-19.99, 3, -10)
);
painting3.rotation.y = Math.PI / 2;

// Paintings on the left wall
const painting4 = createPainting(
  `../src/public/artworks/${idData.imageArray[3]}`,
  10,
  5,
  new THREE.Vector3(-19.99, 3, 10)
);
painting4.rotation.y = Math.PI / 2;

const painting5 = createPainting(
  `../src/public/artworks/${idData.imageArray[4]}`,
  10,
  5,
  new THREE.Vector3(19.99, 3, 10)
);
painting5.rotation.y = -Math.PI / 2;

const painting6 = createPainting(
  `../src/public/artworks/${idData.imageArray[5]}`,
  10,
  5,
  new THREE.Vector3(19.99, 3, -10)
);
painting6.rotation.y = -Math.PI / 2;

const painting7 = createPainting(
  `../src/public/artworks/${idData.imageArray[6]}`,
  10,
  5,
  new THREE.Vector3(-10, 3, 19.99)
);
painting7.rotation.y = Math.PI;

const painting8 = createPainting(
  `../src/public/artworks/${idData.imageArray[7]}`,
  10,
  5,
  new THREE.Vector3(10, 3, 19.99)
);
painting8.rotation.y = Math.PI;

scene.add(painting1, painting2, painting3, painting4, painting5, painting6, painting7, painting8);

// We can use a combination of ambient light and spotlights to create a more natural and immersive lighting environment.
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

// Spotlights can be used to simulate ceiling-mounted lights or track lights that focus on specific areas or artworks.
function createSpotlight(x, y, z, intensity, targetPosition) {
  const spotlight = new THREE.SpotLight(0xffffff, intensity);
  spotlight.position.set(x, y, z);
  spotlight.target.position.copy(targetPosition);
  spotlight.castShadow = true;
  spotlight.angle = Math.PI / 6; // 30 degrees
  spotlight.penumbra = 0.9;
  spotlight.decay = 2;
  spotlight.distance = 40;
  spotlight.shadow.mapSize.width = 1024;
  spotlight.shadow.mapSize.height = 1024;
  return spotlight;
}

// Add spotlights to the scene

const spotlight1 = createSpotlight(-15, 15, -10, 1.5, painting1.position);
const spotlight2 = createSpotlight(15, 15, -10, 1.5, painting2.position);
const spotlight3 = createSpotlight(-5, 15, -10, 1.5, painting3.position);
const spotlight4 = createSpotlight(-5, 15, 10, 1.5, painting4.position);
const spotlight5 = createSpotlight(10, 15, 10, 1.5, painting5.position);
const spotlight6 = createSpotlight(10, 15, -10, 1.5, painting6.position);
const spotlight7 = createSpotlight(-15, 15, 10, 1.5, painting7.position);
const spotlight8 = createSpotlight(15, 15, 10, 1.5, painting8.position);

// Add new spotlights to the scene
scene.add(spotlight7.target);
scene.add(spotlight8.target);
scene.add(spotlight7, spotlight8);

scene.add(spotlight5.target);
scene.add(spotlight6.target);
scene.add(spotlight5, spotlight6);

scene.add(spotlight3.target);
scene.add(spotlight4.target);
scene.add(spotlight3, spotlight4);


scene.add(spotlight1.target);
scene.add(spotlight2.target);
scene.add(spotlight1, spotlight2);

// Add information  

var loader = new FontLoader();

// create a sphere geometry for the cursor
var geometry = new THREE.SphereGeometry(0.005, 32, 32); // radius, segments, segments

// create a material for the cursor
var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // green color

// create a mesh object by combining the geometry and material
var cursor = new THREE.Mesh(geometry, material);

// set the position of the cursor to the center of the camera
cursor.position.set(0, 0, -1); // x, y, z (z should be negative to appear in front of camera)

// add the cursor mesh as a child of the camera object
camera.add(cursor);

//Toggle the pointer on or off
document.addEventListener("keydown", (e) => {
  if (e.key == "p") {
    if (camera.children.includes(cursor)) {
      // cursor exists within the camera object
      camera.remove(cursor)
    } else {
      // cursor does not exist within the camera object
      camera.add(cursor);
    }
  }
})

//Create and toggle "hotspot"

// create a circle geometry for the interactive circle
var circleGeometry = new THREE.CircleGeometry(.5, 32); // radius, segments

// create a material for the circle
var circleMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // red color

const circles = []

for (let circleIndex = 0; circles.length < 8; circleIndex++) {
  const circle = new THREE.Mesh(circleGeometry, circleMaterial);
  circles.push(circle);
}

// set the positions of the circles
circles[0].position.set(-10, 0, -18.99); // x, y, z
circles[1].position.set(10, 0, -18.99);
circles[2].position.set(-18.99, 0, -10);
circles[2].rotation.y = Math.PI / 2;
circles[3].position.set(-18.99, 0, 10);
circles[3].rotation.y = Math.PI / 2;
circles[4].position.set(18.99, 0, 10);
circles[4].rotation.y = -Math.PI / 2;
circles[5].position.set(18.99, 0, -10);
circles[5].rotation.y = -Math.PI / 2;
circles[6].position.set(-10, 0, 18.99);
circles[6].rotation.y = Math.PI;
circles[7].position.set(10, 0, 18.99);
circles[7].rotation.y = Math.PI;

circles.forEach((circle) => {
  scene.add(circle);
})

// Text Variables 


loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {

  let imageText = idData.textArray[0];

  // create a text geometry for the interactive text
  var hotSpotText = new TextGeometry(imageText, {
    font: font,
    size: .5,
    height: 0.05,
    curveSegments: 12,
  });

  // create a material for the text
  var textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff }); // white color

  // create a mesh object by combining the geometry and material
  var text = new THREE.Mesh(hotSpotText, textMaterial);

  // set the position of the text
  text.position.set(0, 0, -4); // slightly in front of the circle
  // text.position.set(0, 1, -10); // Adjust the position to move the text closer to the camera
  // text.rotation.set(0, Math.PI, 0); // Adjust the rotation to face the camera

  // add the text mesh to the scene
  scene.add(text)

  let rayLine;

  // create a raycaster to detect intersections between the cursor and the circle
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  // add an event listener to the renderer to handle mousemove events
  renderer.domElement.addEventListener('mousemove', onDocumentMouseMove);

  // define the onDocumentMouseMove function to handle mousemove events
  function onDocumentMouseMove(event) {
    const rect = renderer.domElement.getBoundingClientRect();

    // calculate normalized device coordinates (NDC) of mouse position
    mouse.x = ((event.clientX - rect.left) / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / renderer.domElement.clientHeight) * 2 + 1;

    // set the origin of the raycaster at the camera position
    raycaster.setFromCamera(mouse, camera);
  }

  document.addEventListener('mousedown', shootRay);

  function shootRay() {

    // Set the origin of the raycaster at the camera position
    const rayOrigin = new THREE.Vector3();
    camera.getWorldPosition(rayOrigin);

    // Calculate the direction of the ray from the camera to the mouse position
    const rayDirection = new THREE.Vector3();
    camera.getWorldDirection(rayDirection);

    // Create a new raycaster and set its origin and direction
    const raycaster = new THREE.Raycaster(rayOrigin, rayDirection);

    let intersectedCircleIndex = -1; // Index of the intersected circle (-1 means no intersection)

    // Check for intersections with each circle
    for (let circleIndex = 0; circleIndex < circles.length; circleIndex++) {
      const object = circles[circleIndex];
      const intersects = raycaster.intersectObject(object, true);

      if (intersects.length > 0) {
        // An intersection occurred with this circle
        intersectedCircleIndex = circleIndex;

        // Update the text content
        text.geometry.dispose(); // Dispose of the old geometry
        text.geometry = new TextGeometry(idData.textArray[intersectedCircleIndex], {
          font: font,
          size: 0.5,
          height: 0.05,
          curveSegments: 12,
        });

        // Assign the x, y, and z values depending on the cirle
        text.position.set(idData.textPositions[intersectedCircleIndex][0], idData.textPositions[intersectedCircleIndex][1], idData.textPositions[intersectedCircleIndex][2]);

        // Rotate the text to the correct area
        if (intersectedCircleIndex == 0 || intersectedCircleIndex == 1) {
          text.rotation.y = 0;
        } else if (intersectedCircleIndex == 2 || intersectedCircleIndex == 3) {
          text.rotation.y = Math.PI / 2;
        } else if (intersectedCircleIndex == 4 || intersectedCircleIndex == 5) {
          text.rotation.y = -Math.PI / 2;
        } else if (intersectedCircleIndex == 6 || intersectedCircleIndex == 7) {
          text.rotation.y = Math.PI;
        }
        object.scale.set(2, 2, 1); // Expand the circle

      } else {
        object.scale.set(1, 1, 1); // Shrink the circle back to its original size
      }
    }

    // Show or hide the text based on intersection result
    text.visible = intersectedCircleIndex !== -1;

    // Remove the previous ray line
    if (rayLine) {
      scene.remove(rayLine);
      rayLine.geometry.dispose();
      rayLine.material.dispose();
    }

    // Create a new ray line
    const rayGeometry = new THREE.BufferGeometry().setFromPoints([
      rayOrigin,
      rayOrigin.clone().add(rayDirection.multiplyScalar(100)), // Change the length of the ray as needed
    ]);

    const rayMaterial = new THREE.LineBasicMaterial({
      color: 0xfff000, // Set the color of the ray (you can change this)
      transparent: true, // Make the material transparent
      opacity: 0, // Set the opacity to 0 (invisible)
    });

    // Create and add the new ray line to the scene
    rayLine = new THREE.Line(rayGeometry, rayMaterial);
    scene.add(rayLine);
  }

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  animate();
})



// Texture of the floor
const textureLoader = new THREE.TextureLoader();
const floorTexture = textureLoader.load('../src/public/img/floor.png');
floorTexture.wrapS = THREE.RepeatWrapping; // wrapS is horizonatl direction
floorTexture.wrapT = THREE.RepeatWrapping; // wrapT the vertical direction
floorTexture.repeat.set(20, 20); // how many times to repeat the texture

// Create the floor plane.
const planeGeometry = new THREE.PlaneGeometry(45, 45); // BoxGeometry is the shape of the object
const planeMaterial = new THREE.MeshPhongMaterial({
  map: floorTexture, // the texture
  side: THREE.DoubleSide,
});

const floorPlane = new THREE.Mesh(planeGeometry, planeMaterial); // create the floor with geometry and material

floorPlane.rotation.x = Math.PI / 2; // this is 90 degrees
floorPlane.position.y = -Math.PI; // this is -180 degrees

scene.add(floorPlane); // add the floor to the scene

// Create the walls
let wallGroup = new THREE.Group(); // create a group to hold the walls
scene.add(wallGroup); // add the group to the scene, then any child added to the group will display to the scene too

// Create wall material with realistic colors and texture
const wallTexture = textureLoader.load('../src/public/img/white-texture.jpg');
wallTexture.wrapS = THREE.RepeatWrapping;
wallTexture.wrapT = THREE.RepeatWrapping;
wallTexture.repeat.set(1, 1);

const wallMaterial = new THREE.MeshLambertMaterial({ map: wallTexture });

// Front Wall
const frontWall = new THREE.Mesh( // Mesh class that has geometry and material inside
  new THREE.BoxGeometry(85, 20, 0.001), // geometry
  new THREE.MeshLambertMaterial({ map: wallTexture })
);

frontWall.position.z = -20; // push the wall forward in the Z axis

// Left Wall
const leftWall = new THREE.Mesh( // Mesh class that has geometry and material inside
  new THREE.BoxGeometry(80, 20, 0.001), // geometry
  new THREE.MeshLambertMaterial({ map: wallTexture })
);

leftWall.rotation.y = Math.PI / 2; // this is 90 degrees
leftWall.position.x = -20; // -20 is for 20 units left

// Right Wall
const rightWall = new THREE.Mesh( // Mesh class that has geometry and material inside
  new THREE.BoxGeometry(80, 20, 0.001), // geometry
  new THREE.MeshLambertMaterial({ map: wallTexture })
);

rightWall.position.x = 20;
rightWall.rotation.y = Math.PI / 2; // this is 90 degrees

// Back Wall
const backWall = new THREE.Mesh(
  new THREE.BoxGeometry(85, 20, 0.001),
  new THREE.MeshLambertMaterial({ map: wallTexture })
);
backWall.position.z = 20;

wallGroup.add(frontWall, backWall, leftWall, rightWall); // add the walls to the group

// Loop through each wall and create the bounding box
for (let i = 0; i < wallGroup.children.length; i++) {
  wallGroup.children[i].BBox = new THREE.Box3();
  wallGroup.children[i].BBox.setFromObject(wallGroup.children[i]);
}

// Create the ceiling
const ceilingTexture = textureLoader.load('../src/public/img/white-texture.jpg');
const ceilingGeometry = new THREE.PlaneGeometry(45, 40);
const ceilingMaterial = new THREE.MeshLambertMaterial({ map: ceilingTexture });
const ceilingPlane = new THREE.Mesh(ceilingGeometry, ceilingMaterial); // create ceiling with geometry and material

ceilingPlane.rotation.x = Math.PI / 2; // this is 90 degrees
ceilingPlane.position.y = 10;

scene.add(ceilingPlane);

// Optimize the lights and shadows
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Enable shadows on objects
floorPlane.receiveShadow = true;
ceilingPlane.receiveShadow = true;
frontWall.castShadow = true;
frontWall.receiveShadow = true;
leftWall.castShadow = true;
leftWall.receiveShadow = true;
rightWall.castShadow = true;
rightWall.receiveShadow = true;
backWall.castShadow = true;
backWall.receiveShadow = true;
painting1.castShadow = true;
painting1.receiveShadow = true;
painting2.castShadow = true;
painting2.receiveShadow = true;

// Controls
const controls = new PointerLockControls(camera, document.body);

// Lock the pointer (controls are activated) and hide the menu when the experience starts
function startExperience() {
  // Reset clock
  clock.start();
  // Lock the pointer
  controls.lock();
  // Hide the menu
  hideMenu();
}

const playButton = document.getElementById('play_button');
playButton.addEventListener('click', startExperience);

// Hide menu
function hideMenu() {
  const menu = document.getElementById('menu');
  menu.style.display = 'none';
}

// Show menu
function showMenu() {
  const menu = document.getElementById('menu');
  menu.style.display = 'block';
}

controls.addEventListener('unlock', showMenu);

const keysPressed = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
  w: false,
  a: false,
  s: false,
  d: false,
};

// Event Listener for when we press the keys
document.addEventListener(
  'keydown',
  (event) => {
    if (event.key in keysPressed) {
      keysPressed[event.key] = true;
    }
  },
  false
);

// Event Listener for when we release the keys
document.addEventListener(
  'keyup',
  (event) => {
    if (event.key in keysPressed) {
      keysPressed[event.key] = false;
    }
  },
  false
);

// Add the movement (left/right/forward/backward) to the scene. Press the arrow keys or WASD to move
const clock = new THREE.Clock();

function updateMovement(delta) {
  const moveSpeed = 5 * delta;
  if (keysPressed.ArrowRight || keysPressed.d) {
    controls.moveRight(moveSpeed);
  }
  if (keysPressed.ArrowLeft || keysPressed.a) {
    controls.moveRight(-moveSpeed);
  }
  if (keysPressed.ArrowUp || keysPressed.w) {
    controls.moveForward(moveSpeed);
  }
  if (keysPressed.ArrowDown || keysPressed.s) {
    controls.moveForward(-moveSpeed);
  }
}

let render = function () {
  const delta = clock.getDelta();
  updateMovement(delta);
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};

render();