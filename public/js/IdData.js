// This file is for ID's to be able to add information in one location that will edit the scene. 


// Edit text for image hot spots 
const text1 = "I am image 1"
const text2 = "I am image 2"
const text3 = "I am image 3"
const text4 = "I am image 4"
const text5 = "I am image 5"
const text6 = "I am image 6"
const text7 = "I am image 7"
const text8 = "I am image 8"

// Edit images for gallery
const image1 = "0.jpg"
const image2 = "1.jpg"
const image3 = "2.jpg"
const image4 = "3.jpg"
const image5 = "4.jpg"
const image6 = "5.jpg"
const image7 = "6.jpg"
const image8 = "7.jpg"

//export text array
export const textArray = [text1, text2, text3, text4, text5, text6, text7, text8]

//export text array
export const imageArray = [image1, image2, image3, image4, image5, image6, image7, image8]

//Positions for each image
const imagePosition1 = "new THREE.Vector3(-10, 3, -19.99)"; // x, y, z
const imagePosition2 = "new THREE.Vector3(10, 3, -19.99)";
const imagePosition3 = "new THREE.Vector3(-19.99, 3, -10)";
const imagePosition4 = "new THREE.Vector3(-19.99, 3, 10)";
const imagePosition5 = "new THREE.Vector3(19.99, 3, 10)";
const imagePosition6 = "new THREE.Vector3(19.99, 3, -10)";
const imagePosition7 = "new THREE.Vector3(-10, 3, 19.99)";
const imagePosition8 = "new THREE.Vector3(10, 3, 19.99)";

//Positions for text
const textPosition1 = [-10, 0, -19]; // x, y, z
const textPosition2 = [10, 0, -19];
const textPosition3 = [-19, 0, -10];
const textPosition4 = [-19, 0, 10];
const textPosition5 = [19, 0, 10];
const textPosition6 = [19, 0, -10];
const textPosition7 = [-10, 0, 19];
const textPosition8 = [10, 0, 19];


export const textPositions = [textPosition1, textPosition2, textPosition3, textPosition4, textPosition5, textPosition6, textPosition7, textPosition8]

//Positions for hot spots
// this is added through the JS because positioning is hard for objects. Can template later

//export text array
export const imagePositions = [imagePosition1, imagePosition2, imagePosition3, imagePosition4, imagePosition5, imagePosition6, imagePosition7, imagePosition8]

//Image 
export const imageWidth = 10;
export const imageHeight = 5;

//Rotations
export const leftWall = ".rotation.y = Math.PI / 2";
export const RightWall = ".rotation.y = -Math.PI / 2";
export const BackWall = ".rotation.y = Math.PI";
