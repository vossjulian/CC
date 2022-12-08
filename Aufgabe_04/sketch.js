const AGENT_COUNT = 10;

let agents = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  for(let i = 0; i < AGENT_COUNT; i++) {
    agents.push(new Agent());
  }

  background(220);
}

function draw() {
  agents.forEach(agent => {
    agent.update();
    agent.render();
  });
} 