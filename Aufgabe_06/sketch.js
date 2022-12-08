let currentScene;
let scenes;
let canvas;
let song;
let fft;
let button;
let time = 0;

const smoothing = 0.8;
const binCount = 32;

function setup() {
  canvas = createCanvas(window.innerWidth, window.innerHeight);

  // FFT mit smoothing und festgelegter Länge der Rückgabedaten durchführen
  fft = new p5.FFT(smoothing, binCount);

  // Scenen erstellen
  scenes = [new Scene1(binCount), new Scene2(binCount), new Scene3(binCount), new Scene4(binCount)];

  // Index der aktuellen Szene
  currentScene = 0;

  // Song abspielen, in Chrome so nicht möglich
  song.play();
}

function preload() {
  // Song laden
  //song = loadSound("assets/right_said_fred_-_you_re_my_mate.mp3");
  //song = loadSound("assets/junior_senior_-_move_your_feet.mp3");
  song = loadSound("assets/Remzcore - Gravity.mp3");
}

function draw() { 
  // DelteTime aufaddieren, um Framerate unabhängig Zeit messen zu können
  time += deltaTime;

  // Aktuelle Szene zeichnen
  scenes[currentScene].render();

  // Szene nach 5 Sekunden wechseln
  if(time >= 5000) {
    this.switchScene();
    time = 0;
  }
}

function switchScene() {
  // Index der aktuellen Szene erhöhen, durch Modulo-Rechnung Rundlauf von 0 bis scenes.length möglich
  currentScene = (currentScene + 1) % scenes.length;
}

// Bei Mausklick Song abspielen (Für Chrome notwendig)
function mouseClicked() {
  if(!song.isPlaying()) {
    song.play();
  }
}

// Falls Song nicht läuft -> über Leertaste Song abspielen, falls Song läuft -> über P Song stoppen
function keyPressed() {
  console.log("Song playing: " + song.isPlaying());

  if(key == " " && !song.isPlaying()) {
    song.play();
  
  }
  if(key == "p" && song.isPlaying()) {
    song.stop();
  }
  if(key == "s") {
    save(canvas, "party", "png");
  }
  if(key == "c") {
    this.switchScene();
  }
}

// Anpassung der Zeichenfläche an Fenstergröße 
function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
}