class Point {
    constructor(radius = 400, size = 20, circleColor = "#fff", strokeColor = "#fff")
    {
        this.radius = radius;
        this.size = size;
        this.circleColor = circleColor;
        this.strokeColor = strokeColor;
        this.circlePos = 0;
    }

    // Position des Kreises abähngig von Freuenz zu Radius berechnen
    calcCircle(energy) {
        this.circlePos = map(energy, 0, 255, 0, this.radius);
    }

    getCirlce() {
        return this.circlePos;
    }

    render() {
        noStroke();
        fill(this.circleColor);
        circle(0, this.circlePos, this.size)
    }
}