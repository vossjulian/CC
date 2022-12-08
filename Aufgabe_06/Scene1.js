class Scene1 extends Scene {
    constructor(data) {
        super(data);

        this.particles = [];

        // Für die Anzahl an verfügbaren Daten Partikel erstellen
        for(let i = 0; i < this.data; i++) {
            let x = map(i, 0, this.data, 0, width * 2);
            let y = random(height, 0);
            let position = createVector(x, y);
            this.particles[i] = new Particle(position);
        }

        angleMode(DEGREES);
        noStroke();
    }

    render() {
        let spectrum = fft.analyze();

        background(0, 0, 0, 100);
        strokeWeight(1);
        
        for(let i = 0; i < this.data; i++) {
            // Frequenz an Stelle i des analysierten Spektrums auslesen
            let energy  = map(spectrum[i], 0, 255, 0, 1);

            this.particles[i].update(energy);
            this.particles[i].render();

            // Wert des Spektrums auf Größe des Rechteckes mappen
            let r = map(spectrum[i], 0, 255, 0, 350);

            // Werte der Spuren ergeben Ecken des Rechteckes, Werte 0 - 90 (Eckig -> Abgerundet)
            let bass = map(fft.getEnergy("bass"), 0, 255, 0, 90);
            let mid = map(fft.getEnergy("mid"), 0, 255, 0, 90);
            let lowMid = map(fft.getEnergy("lowMid"), 0, 255, 0, 90);
            let highMid = map(fft.getEnergy("highMid"), 0, 255, 0, 90);

            rect(width / 2 - r / 2, height / 2 - r / 2, r, r, bass, mid, lowMid, highMid);
        }
    }
}