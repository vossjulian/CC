let canvas;
let x, y, w, h;
let rndHeadColor, rndOuterEyeColor, rndMouth, rndEar, rndEye, rndNose, rndEyebrows;
let seed;
let blinkCounter, blinkDelta;
let scaleRatio = 1;
let exportRatio = 10;
let buffer;

const paperSizeIndex = 1;
// Formate für HighRes-Export
const paperSizes = [{
    name: 'A3',
    width: 2480,
    height: 3508,
}, {
    name: 'A1',
    width: 7016,
    height: 9933,
}];

function setup() {
  seed = 4;
  blinkCounter = 1;
  blinkDelta = 0.1;
  
  w = paperSizes[paperSizeIndex].width / exportRatio;
  h = paperSizes[paperSizeIndex].height / exportRatio;

  buffer = createGraphics(w, h);
  canvas = createCanvas(w, h);
  
  exportRatio /= pixelDensity();
  
}

function draw() {
  drawFaces();
}

function drawFaces() {
  randomSeed(seed);
  buffer.clear();
  buffer.background(200);
  // 2 Schleifen zur Erstellung eines Grids (x -> Spalten, y -> Reihen)
  for(let x = 100; x < w; x += w / 5) {
    for(let y = 150; y < h; y += h / 10) {
      let posX = x + x * 2;
      let posY = y + y * 2;
      // Zufällige Kopffarbe
      rndHeadColor = color(
                      random(0, 255), 
                      random(0, 255),
                      random(0, 255)
                    );
      // Zufällige Augenfarbe
      rndOuterEyeColor = color(
                          random(0,150),
                          0,
                          random(0,255)
                        );
      // Öffnungsweite des Mundes
      rndMouth = random(1, 100);
      // Größe der Ohren
      rndEar = random(20, 90);
      // Größe der Augen
      rndEye = random(20, 75);
      // Größe der Nase
      rndNose = random(20, 100);
      // Position der Augenbrauen, relativ zur Augengröße
      rndEyebrows = random(50, rndEye + 5);
      drawFace(posX, posY); 
    }
  } 
image(buffer, 0, 0);
}

function drawFace(x, y) {
  // Ears
  drawEars(x, y, "#4d2902");
  // Head
  drawHead(x, y, rndHeadColor);
  // Eyes
  drawEyes(x, y, 0);
  // Mouth
  drawMouth(x, y, "#3d0804");
  // Nose
  drawNose(x, y, "#4d2902");
  // Eyebrows
  drawEyebrows(x, y, "#3d0804");
}

function drawEars(x, y, color) {
  buffer.push();
  buffer.translate(x, y)
  buffer.scale(1.5);
  buffer.fill(color);
  buffer.ellipse(-100, -50, rndEar / 2, rndEar);
  buffer.ellipse(100, -50, rndEar / 2, rndEar);
  buffer.pop();
}

function drawHead(x, y, color) {
  buffer.push();
  buffer.translate(x, y);
  buffer.scale(1.5);
  buffer.fill(color);
  buffer.ellipse(0, 0, 250, 150);
  buffer.pop();
}

// Öffnen und Schließen der Augen
function blink() {   
  blinkCounter += blinkDelta;
  
  if(blinkCounter > 50 || blinkCounter < 0) {
    blinkDelta *= -1;
  }
  
  return blinkCounter;
}

function drawEyes(x, y, color) {
  //blink();
  buffer.push();
  buffer.translate(x, y);
  buffer.scale(1.5);
  buffer.fill(255);
  buffer.ellipse(-50, -25, 50, -rndEye);
  buffer.ellipse(50, -25, 50, -rndEye);
  buffer.fill(rndOuterEyeColor);
  buffer.circle(-50, -25, 25);
  buffer.circle(50, -25, 25);
  buffer.pop();
}

function drawNose(x, y, color) {
  buffer.push();
  buffer.translate(x, y);
  buffer.scale(1.5);
  buffer.fill(color);
  buffer.ellipse(0, 0, rndNose, 25);
  buffer.pop();
}

function drawMouth(x ,y, color) {
  buffer.push();
  buffer.fill(color);
  buffer.translate(x, y);
  buffer.scale(1.5);
  buffer.arc(0, 25, constrain(rndMouth, 50, 100), rndMouth, 0, PI);
  buffer.pop();
}

function drawEyebrows(x, y, color) {
  buffer.push();
  buffer.fill(color);
  buffer.translate(x, y);
  buffer.scale(1.5);
  buffer.strokeWeight(5);
  buffer.line(-80, -55, -20, -rndEyebrows);
  buffer.line(80, -55, 20, -rndEyebrows);
  buffer.pop();
}

function exportHighResolution() {
  scaleRatio = exportRatio;

  // Re-create buffer with exportRatio and re-draw
  buffer=createGraphics(scaleRatio*width,scaleRatio*height);
  draw();

  // Get timestamp to name the ouput file
  let timestamp = new Date().getTime();

  // Save as PNG
  save(buffer, str(timestamp), 'png');

  // Reset scaleRation back to 1, re-create buffer, re-draw
  scaleRatio = 1;
  buffer = createGraphics(width, height);
  draw();
}

function keyPressed() {
  if(key == 's') {
   saveCanvas(canvas, 'aufgabe_01', 'jpg');
  }
  if(key == ' ') {
    seed++;
  }
  if (key == 'e' || key == 'E') {
    exportHighResolution();
  }
}
