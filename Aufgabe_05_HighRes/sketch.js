let scaleRatio = 1;
let exportRatio = 10;
let w, h;
let buffer;
let canvas;
let bassPoint, midPoint, treblePoint;
let points;
let songData;

const paperSizeIndex = 1;
const pieces = 16;

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
  w = paperSizes[paperSizeIndex].width / exportRatio;
  h = paperSizes[paperSizeIndex].height / exportRatio;

  buffer = createGraphics(w, h);
  canvas = createCanvas(w, h);

  exportRatio /= pixelDensity();

  angleMode(DEGREES);

  bassPoint = new Point(300, 30, "rgba(255, 0, 0, 0.002)");
  midPoint = new Point(300, 15, "rgba(0, 255, 0, 0.005)");
  treblePoint = new Point(300, 15, "rgba(0, 0, 255, 0.005)");

  points = [bassPoint, midPoint, treblePoint];

  songData = [];

  song.play();
}

function preload() {
  //song = loadSound("assets/junior_senior_-_move_your_feet.mp3");
  song = loadSound("assets/scissor_sisters_-_i_dont_feel_like_dancin.mp3");
  fft = new p5.FFT();
}

function draw() {
  //buffer.clear();

  fft.analyze();

  songData.push({
    "bass": fft.getEnergy("bass"),
    "mid": fft.getEnergy("mid"),
    "treble": fft.getEnergy("treble")
  });

  drawArray();

  image(buffer, 0, 0);

}

function drawArray() {
  buffer.push();
  buffer.translate(w / 2, h / 2);
  buffer.scale(scaleRatio);

  songData.forEach(entry => {
    bassPoint.calcCircle(entry.bass);
    midPoint.calcCircle(entry.mid);
    treblePoint.calcCircle(entry.treble);

    for(let i = 0; i < pieces; i++) {
      points.forEach(p => {
        buffer.rotate(360/pieces);
        p.render(buffer);
      });
    }
  });

  buffer.pop();
}

function exportHighResolution() {
  scaleRatio = exportRatio;

  // Re-create buffer with exportRatio and re-draw
  buffer = createGraphics(scaleRatio*width, scaleRatio*height);
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

function keyReleased() {
  if (key == 'e' || key == 'E') {
    exportHighResolution();
  }
}
