class Scene2 extends Scene {
    constructor(data) {
        super(data);

        this.particles = [];

        for(let i = 0; i < this.data; i++) {
            let x = map(i, 0, this.data, width * 2);
            let y = random(height, 0);
            let position = createVector(x, y);
            this.particles[i] = new Particle(position);
        }

        angleMode(DEGREES);
    }

    render() {
        let spectrum = fft.analyze();

        // Background Alpha auf 0, damit Partikel Spuren bilden
        background(0, 0, 0, 0);
        noStroke();

        for(let i = 0; i < this.data; i++) {
            let energy  = map(spectrum[i], 0, 255, 0, 1);

            this.particles[i].update(energy);
            this.particles[i].render();
            this.particles[i].position.x = map(i, 0, this.data, 0, width * 2);

            let r = map(spectrum[i], 0, 255, 0, 350);
            let bass = map(fft.getEnergy("bass"), 0, 255, 0, 90);
            let mid = map(fft.getEnergy("mid"), 0, 255, 0, 90);
            let lowMid = map(fft.getEnergy("lowMid"), 0, 255, 0, 90);
            let highMid = map(fft.getEnergy("highMid"), 0, 255, 0, 90);

            rect(width / 2 - r / 2, height / 2 - r / 2, r, r, bass, mid, lowMid, highMid);
        }
    }
}