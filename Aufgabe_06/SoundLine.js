class SoundLine {
    constructor(position) {
        this.startPos = position;
        this.endPos = createVector(0, 0);
    }

    update(value) {
        this.endPos.x =  value;
        this.endPos.y = this.startPos.y;
    }

    render() {
        line(this.startPos.x, this.startPos.y, this.endPos.x, this.endPos.y);
    }
}