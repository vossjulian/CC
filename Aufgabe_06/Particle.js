class Particle {
    constructor(position) {
        this.position = position;
        this.scale = random(0, 1);
        this.speed = createVector(0, random(1, 10));
        this.color = color(random(0, 255), random(0, 255), random(0, 255));
    }

    // Position in Abhängigkeit von Wert value nach oben verschieben, Größe anpassen
    update(value) {
        this.position.y -= this.speed.y / (value * 2);
        if (this.position.y < 0) {
            this.position.y = height;
        }
        this.diameter = map(value, 0, 1, 0, 100) * this.scale;
    }

    render() {
        fill(this. color);
        ellipse(this.position.x, this.position.y, this.diameter, this.diameter);
    }
}