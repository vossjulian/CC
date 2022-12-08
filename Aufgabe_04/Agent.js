class Agent {
    constructor(
        x = width / 2, 
        y = height / 2,
        speed = 5,
        color = 'rgba(' + Math.floor(random(0,255)) + ', ' + Math.floor(random(0,255)) + ', ' + Math.floor(random(0,255)) + ', 0.25)'
    ) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.color = color;
    }

    render() {
        fill(color(this.color));
        noStroke();
        ellipse(this.x, this.y, 25, 25);
    }

    update() {
        this.x += random(-this.speed, this.speed);
        this.x = constrain(this.x, 0, width);
        this.y += random(-this.speed, this.speed);
        this.y = constrain(this.y, 0, height);
    }
}