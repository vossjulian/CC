let slider;
let frame;
let canvas;
let x, y;
let counter, delta;

function preload() {
  frame = loadImage('frame_square.png');
}

function setup() {
  canvas = createCanvas(window.innerWidth, window.innerHeight);
  
  // Animation 
  counter = 1;
  delta = 1;

  // Alignment
  x = width / 2;
  y = height / 2;
  
  // Slider zum einstellen von Gesichtszügen
  slider = createSlider(1, 50, 1, 1);
  slider.position(x - 50, y + 150);

}

function draw() {
  background(220);
   // Frame
  image(frame, 0, 0, width, height);
  // Ears
  drawEars(x, y, "#4d2902");
  // Head
  drawHead(x, y, "#b0681a");
  // Eyes
  drawEyes(x, y, 0);
  // Mouth
  drawMouth(x, y, "#3d0804");
  // Nose
  drawNose(x, y, "#4d2902");
  // Animation
  animation(false);
}

function drawEars(x, y, color) {
  push();
  translate(x, y)
  fill(color);
  ellipse(-100, -50, 25, constrain(slider.value(), 20, 50));
  ellipse(100, -50, 25, constrain(slider.value(), 20, 50));
  pop();
}

function drawHead(x, y, color) {
  push();
  translate(x, y);
  fill(color);
  ellipse(0, 0, 250, 150);
  pop();
}

function drawEyes(x, y, color) {
  push();
  translate(x, y);
  fill(255);
  ellipse(-50, -25, 50, constrain(slider.value(), 30, 50));
  ellipse(50, -25, 50, constrain(slider.value(), 30, 50));
  fill(color);
  circle(-50, -25, 25);
  circle(50, -25, 25);
  pop();
}

function drawNose(x, y, color) {
  push();
  translate(x, y);
  fill(color);
  ellipse(0, 0, 50, 25);
  pop();
}

function drawMouth(x ,y, color) {
  push();
  fill(color);
  translate(x, y);
  arc(0, 25, 50, slider.value(), 0, PI);
  pop();
}

// Automatische Gesichtszüge
function animation(status) {
  if(status) {
    counter += delta;
    if(counter == 50 || counter == 0) {
      delta *= -1;
    }
    slider.value(counter);
  }
}

// Bild als Datei speichern
function keyPressed() {
  if(key == 's') {
   saveCanvas(canvas, 'aufgabe_01', 'jpg');
  }
}
