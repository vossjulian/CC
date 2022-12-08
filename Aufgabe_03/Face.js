class Face {
    constructor(x, y, headColor = "#b0681a", eyeColor="#000000", earColor = "#4d2902", mouthColor="#3d0804", noseColor="#4d2902", scale = 1) {
        this.x = x;
        this.y = y;
        this.headColor = headColor;
        this.earColor = earColor;
        this.mouthColor = mouthColor;
        this.noseColor = noseColor;
        this.eyeColor = eyeColor;
        this.scale = scale;
    }

    // value = Ohrgröße
    drawEars(value) {
        push();
        translate(this.x, this.y);
        fill(this.earColor);
        ellipse(-100, -50, 25, constrain(value, 20, 50));
        ellipse(100, -50, 25, constrain(value, 20, 50));
        pop();
    }

    // value = Augengröße
    drawEyes(value) {
        push();
        translate(this.x, this.y);
        fill(255);
        ellipse(-50, -25, 50, constrain(value, 30, 50));
        ellipse(50, -25, 50, constrain(value, 30, 50));
        fill(this.eyeColor);
        circle(-50, -25, 25);
        circle(50, -25, 25);
        pop();
    }

    drawHead() {
        push();
        translate(this.x, this.y);
        fill(this.headColor);
        ellipse(0, 0, 250, 150);
        pop();
    }

    // value = Nasengröße
    drawNose(value) {
        push();
        translate(this.x, this.y);
        fill(this.noseColor);
        ellipse(0, 0, value, 25);
        pop();
    }

    // value = Mundgröße
    drawMouth(value) {
        push();
        fill(this.mouthColor);
        translate(this.x, this.y);
        arc(0, 25, 50, value, 0, PI);
        pop();
    }

    // value = Position der Augenbrauen
    drawEyebrows(value) {
        let val = value * 2 
        push();
        fill(this.eyeColor);
        translate(this.x, this.y);
        strokeWeight(5);
        line(-80, -55, -20, -value);
        line(80, -55, 20, -value);
        pop();
    }
    // Skalierung des gesamten Gesichts
    setScale(value) {
        this.scale = value;
    }

    render(x, y, seed) {
        // RandomSeed für "feste" Random-Werte
        randomSeed(seed);
        scale(this.scale);

        // Position des Gesichts
        this.x = x;
        this.y = y;

        // Random colors
        this.headColor = color(
            random(0, 255), 
            random(0, 255),
            random(0, 255)
        );
        this.eyeColor = color(
            random(0,150),
            0,
            random(0,255)
        );

        // Random Werte für Gesichtszüge        
        let rndEars = random(20, 90);
        let rndEyes = random(20, 75);
        let rndMouth = random(1, 100);
        let rndNose = random(20, 100);
        let rndEyebrows = random(50, rndEyes + 5);
        
        // Random Gesicht zeichnen
        this.drawEars(rndEars);
        this.drawHead();
        this.drawEyes(rndEyes);
        this.drawNose(rndNose);
        this.drawMouth(rndMouth);
        this.drawEyebrows(rndEyebrows);
    }
}