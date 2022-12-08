class Scene4 extends Scene {
    constructor(data) {
        super(data);

        angleMode(DEGREES);
    }

    render() {
        fft.analyze();

        let bassEnergy = fft.getEnergy("bass");
        let midEnergy = fft.getEnergy("mid");
        let trebleEnergy = fft.getEnergy("treble");

        // Hintergrund ist Mischung aus Bass, Mid und Treble
        background(trebleEnergy, bassEnergy, midEnergy, 5);
        translate(width / 2, height / 2);
        // Dauerhafte Rotation
        rotate(frameCount / 4);

        push();
        fill(color(0, bassEnergy, 0));
        this.drawLineCircleThing(bassEnergy, map(bassEnergy, 0, 255, 0, 360));
        pop();   
        
        push();
        rotate(120);
        fill(color(0, 0, midEnergy));
        this.drawLineCircleThing(midEnergy, map(midEnergy, 0, 255, 0, 360));
        pop();    
        
        push();
        rotate(240);
        fill(color(trebleEnergy, 0, 0));
        this.drawLineCircleThing(trebleEnergy, map(trebleEnergy, 0, 255, 0, 360));
        pop();  
        
    }

    drawLineCircleThing(energy, speed) {
        strokeWeight(map(energy, 0, 255, 0, 10));
        stroke(energy);

        let circleSize = map(energy, 0, 255, 0, 125);
        // Ausschlag der Linien und Ellipsen über sin und cos Funktionen 
        let x = cos(speed);
        let y = sin(speed);

        //line(x * (width / 2), 0, 0, y * (height / 2)); // 1 - 3
        //line(x * (width / 2), 0, 0, -(y * height / 2)); // 1 - 4

        //line(-(x * width / 2), 0, 0, y * (height / 2)); // 2 - 3
        //line(-(x * width / 2), 0, 0, -(y * height / 2)); // 2 - 4

        // Verbindungslinien der Ellipsen
        line(x * (width / 2), 0, -(x * width / 2), 0); // 1 - 2
        line(0, y * (height / 2), 0, -(y * height / 2)); // 3 - 4      

        stroke(0);
        strokeWeight(2);
        // Ellipsen bewegen sich über die Breite des Bildschirmes
        ellipse(x * (width / 2), 0, circleSize, circleSize); // 1
        ellipse(-(x * width / 2), 0, circleSize, circleSize); // 2

        // Ellipsen bewegen sich über die Höhe des Bildschirmes
        ellipse(0, y * (height / 2), circleSize, circleSize); // 3
        ellipse(0, -(y * height / 2), circleSize, circleSize); // 4
    }
}