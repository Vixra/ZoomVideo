/*
 *
 * Cinema Expandido WEB
 * Camara (17 de abril 2018)
 * Viviana Ramos
 * 
 *;
 
 * URL: https://vixra.github.io/ZoomVideo/
 */

/*
VARIABLES
*/
var capture;
var video;
var tracker;

/*
LYFE CYCLE METHODS
*/

function preload() {
  video = createVideo("assets/videos/keyboard.mp4")
  capture = createVideo("assets/videos/people.mp4")
}

function setup() {
  background(0);
  imageMode(CENTER);
  createCanvas(1920,1080);
  initializeCamera();
  initializeVideo();
  initializeTracker();
}

function draw() {
  background(0);
  drawVideo();
  drawCamera();
  drawTracker();
  print(frameRate);
}

/*
CAMERA METHODS
*/


function initializeCamera(){
  //capture = createCapture(VIDEO);
  capture.hide();
  capture.loop();
}


function drawCamera(){
  
  image(capture,mouseX,mouseY, 480,240);

}


function initializeVideo() {
  video.hide();
  video.loop();
}

function drawVideo() {
  var positions2 = tracker.getCurrentPosition();
  
  if (positions2.length>0){
  var differenceW = (positions2[14][0])-(positions2[0][0]);
  var differenceH = (positions2[7][1])-(positions2[33][1]);
  var zomW = round(map(differenceW, 0, windowWidth, 0, 800));
  var zomH = round(map(differenceH, 0, windowHeight, 0, 600));
  translate(width/2,height/2);
  image(video, zomW, zomH);
}
}
/*
TRACKER METHODS
*/

function initializeTracker() {
  tracker = new clm.tracker();
  tracker.init(pModel);
  tracker.start(capture.elt);
}

function drawTracker() {
  var positions = tracker.getCurrentPosition();
  if(positions.length >0){
    for(var i=0; i<positions.length; i++){
      fill(255,0,0);
      ellipse(positions[i][0],positions[i][1],10,10)
    }
  }
}