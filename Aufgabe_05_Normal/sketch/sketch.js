let canvas;
let song;
let songDuration;
let div = null;
let fft;
let bassPoint, midPoint, treblePoint;
let points;

// Anzahl an Kreis-Elementen
const pieces = 32;

function setup() {
  canvas = createCanvas(window.innerWidth, window.innerHeight);

  // Radius auf die Hälfte der Bildschirmbreite setzen
  bassPoint = new Point(width / 2, width / 25, "rgba(255, 0, 0, 0.002)");
  midPoint = new Point(width / 2, width / 50, "rgba(0, 255, 0, 0.005)");
  treblePoint = new Point(width / 2, width / 50, "rgba(0, 0, 255, 0.005)");

  points = [bassPoint, midPoint, treblePoint];

  angleMode(DEGREES);

  song.play();
  song.setLoop(false);
  songDuration = song.duration();
  //song.jump(song.duration() - 30);
}

function preload() {
  //song = loadSound("assets/junior_senior_-_move_your_feet.mp3");
  //song = loadSound("assets/scissor_sisters_-_i_dont_feel_like_dancin.mp3");
  //song = loadSound("assets/50_cent_-_in_da_club.mp3");
  song = loadSound("assets/daft_punk_-_one_more_time.mp3");
  //song = loadSound("assets/justin_timberlake_-_sexyback.mp3");
  //song = loadSound("assets/right_said_fred_-_you_re_my_mate.mp3");
  //song = loadSound("assets/rihanna_-_umbrella.mp3");

  fft = new p5.FFT();
}

function draw() {

  fft.analyze();

  translate(width / 2, height / 2);

  // Für jedes Kreiselement berechnung durchführen
  for( i = 0; i < pieces; i++ ) {
    bassPoint.calcCircle(fft.getEnergy("bass"));
    midPoint.calcCircle(fft.getEnergy("mid"));
    treblePoint.calcCircle(fft.getEnergy("treble"));
    
    // Um berechneten Winkel (Abhängig von Element-Anzahl)
    rotate(360/pieces);
    points.forEach(p => {
      p.render();
    });
  }

  // Wenn Song beendet, div zur Überprüfung erstellen
  if (floor(song.duration()) == floor(song.currentTime()) && div == null) {
    console.log("ready");
    div = document.createElement("div");
    div.setAttribute("id", "ready");
    div.innerHTML = "ready";
    document.body.append(div);
  }
}

function keyPressed() {
  if(key == "s") {
    let timestamp = new Date().getTime();
    save(canvas, str(timestamp), "png");

  }
}