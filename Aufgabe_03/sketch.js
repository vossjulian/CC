let frame;
let canvas;
let face;
let seed;

function preload() {
  frame = loadImage("./assets/frame_square.png");
}

function setup() {
  canvas = createCanvas(window.innerWidth, window.innerHeight);

  // Random seed
  seed = 1;

  // Face + Position
  face = new Face((width / 2), (height / 2));
}

function draw() {
  background(220);

  // Rahmen
  image(frame, 0, 0, width, height);

  // Zufälliges Gesicht zeichnen
  face.render(width / 2, height / 2, seed);
  noLoop();
}

function keyPressed() {
  if (key == "s") {
    saveCanvas(canvas, "aufgabe_01", "jpg");
  }
  // Seed erhöhen, somit neue Random Werte für Gesicht
  if(key == " ") {
    seed++;
    loop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}