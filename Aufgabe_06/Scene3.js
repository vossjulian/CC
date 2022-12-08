class Scene3 extends Scene{
    constructor(data) {
        super(data);

        this.forwardLines = [];
        this.backwadLines = [];
        this.amps = [];

        // Linien am linken Bildschirmrand erstellen
        for(let i = 0; i < this.data / 2; i++) {
            let x = 0;
            let y = map(i, 0, this.data, 0, height * 2);
            let pos = createVector(x, y);
            this.forwardLines[i] = new SoundLine(pos);
        }
        
        // Linien am rechten Bildschirmrand erstellen
        for(let i = 0; i < this.data / 2; i++) {
            let x = width;
            let y = map(i, 0, this.data, 0, height * 2);
            let pos = createVector(x, y);
            this.backwadLines[i] = new SoundLine(pos);
        }

        angleMode(DEGREES);
    }

    render() {
        let spectrum = fft.analyze();

        // Zufällige Hintergrundfarbe
        background(random(0, 255), random(0, 255), random(0, 255), 15);
        strokeWeight(1);

        for(let i = 0; i < this.data / 2; i++) {
            fill(0);
            stroke(0);

            push();
            // Linien dürfen 1/3 der Breite des Bildschirmes einnehmen, Wert des Spektrums bestimmt Länge
            this.forwardLines[i].update(map(spectrum[i], 0, 255, 0, width / 3));
            this.backwadLines[i].update(width - map(spectrum[i], 0, 255, 0, width / 3));
            this.forwardLines[i].render();
            this.backwadLines[i].render();
            pop();

            // Dreiecke Zeichnen, Wert der Spuren ergeben Größe und Rotation
            this.drawTriangle(map(fft.getEnergy("bass"), 0, 255, 0, 300), map(fft.getEnergy("bass"), 0, 255, 0, 120));
            this.drawTriangle(map(fft.getEnergy("mid"), 0, 255, 0, 300), map(fft.getEnergy("mid"), 0, 255, 120, 240));
            this.drawTriangle(map(fft.getEnergy("treble"), 0, 255, 0, 300), map(fft.getEnergy("treble"), 0, 255, 240, 360));
        }
    }

    drawTriangle(size, angle) {
        fill(color(random(0, 255), random(0, 255), random(0, 255), 50));
        push();
        translate(width / 2, height / 2);
        rotate(angle);

        // Punkte eines gleichschenkligen Dreiecks berechnen, aus cos und sin "Kreisdrehung" lassen sich Eckpunkte ableiten
        let x1 = size * cos(0), y1 = size * sin(0);
        let x2 = size * cos(120), y2 = size * sin(120);
        let x3 = size * cos(240), y3 = size * sin(240);

        triangle(x1, y1, x2, y2, x3, y3);

        pop();
    }
}