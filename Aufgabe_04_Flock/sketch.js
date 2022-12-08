const AGENT_COUNT = 100;

let agents = [];
let canvas;
let alignmentSlider, cohesionSlider, separationSlider, speedSlider;

function setup() {
  canvas = createCanvas(window.innerWidth, window.innerHeight);
  background(220);

  // Slider zur Anpassung des Alignments
  alignmentSlider = createSlider(0, 1, 0.5, 0.01);
  alignmentSlider.position(20, 10);

  // Slider zur Anpassung der Cohesion
  cohesionSlider = createSlider(0, 1, 0.5, 0.01);
  cohesionSlider.position(20, 40);

  // Slider zur Anpassung der Separation
  separationSlider = createSlider(0, 1, 0.5, 0.01);
  separationSlider.position(20, 70);

  // Slider zur Anpassung des Tempos
  speedSlider = createSlider(0.1, 2, 1, 0.01);
  speedSlider.position(20, 100);

  // Erstellen von Agents, Anzahl lässt sich über "AGENT_COUNT" anpassen
  for(let i = 0; i < AGENT_COUNT; i++) {
    agents.push(new Agent(random(0, width), random(0, height)));
  }
}

function draw() {
  clear();
  fill(0);
  
  // Labels für die Slider
  text('Alignment: ', alignmentSlider.x, alignmentSlider.y - 5, 35);
  text('Cohesion: ', cohesionSlider.x, cohesionSlider.y - 5, 35);
  text('Separation: ', separationSlider.x, separationSlider.y - 5, 35);
  text('Speed: ', speedSlider.x, speedSlider.y - 5, 35);

  // Alle Agents in der Liste rendern
  agents.forEach(agent => {
    agent.render(agents, alignmentSlider.value(), cohesionSlider.value(), separationSlider.value(), speedSlider.value());
  })
} 

function keyPressed() {
  if(key == 's') {
   saveCanvas(canvas, 'aufgabe_04', 'jpg');
  }
}