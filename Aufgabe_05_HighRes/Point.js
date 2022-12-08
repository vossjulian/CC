class Point {
    constructor(radius = 400, size = 20, circleColor = "#fff", strokeColor = "#fff")
    {
        this.radius = radius;
        this.size = size;
        this.circleColor = circleColor;
        this.strokeColor = strokeColor;
        this.circle = 0;
    }

    calcCircle(energy) {
        this.circle = map(energy, 0, 255, 0, this.radius);
    }

    getCirlce() {
        return this.circle;
    }

    render(buffer) {
        buffer.noStroke();
        buffer.fill(this.circleColor);
        buffer.circle(0, this.circle, this.size)
    }
}