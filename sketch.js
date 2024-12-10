      // define Wave class
class Wave {
  constructor(yOffset, color, direction) {
    this.yOffset = yOffset;
    this.color = color;
    this.amplitude = 50;
    this.period = 200;
    this.xSpacing = 16;
    this.w = windowWidth + this.xSpacing;
    this.theta = 0;
    this.direction = direction; // 1 for right, -1 for left
    this.yValues = new Array(floor(this.w / this.xSpacing));
  }

      // method to calculate wave
  calcWave() {
    this.theta += 0.02 * this.direction;
    let x = this.theta;

    for (let i = 0; i < this.yValues.length; i++) {
      this.yValues[i] = sin(x) * this.amplitude;
      x += (TWO_PI / this.period) * this.xSpacing;
    }
  }

      // method to display wave
  display() {
    noStroke();
    fill(this.color);
    for (let x = 0; x < this.yValues.length; x++) {
      ellipse(x * this.xSpacing, windowHeight / 2 + this.yValues[x] + this.yOffset, 15, 15);
    }
  }
}

let waves = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

      // create 20 waves going to the right with blue gradient
  for (let i = 0; i < 20; i++) {
    let yOffset = map(i, -10, 10, -windowHeight / 2, windowHeight / 2);
    let col = color(0, 100 + i * 5, 300, 200);
    waves.push(new Wave(yOffset, col, 1));
  }
  
      // create 20 waves going to the left with purple gradient
  for (let i = 0; i < 20; i++) {
    let yOffset = map(i, 0, 20, -windowHeight / 3, windowHeight / 2);
    let col = color(150 + i * 5, 100, 200, 95);
    waves.push(new Wave(yOffset, col, -1));
  }
}

function draw() {
  background(0, 0, 50);
  
  for (let wave of waves) {
    wave.calcWave();
    wave.display();
  }
}

    // resize the canvas when the window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  for (let wave of waves) {
    wave.w = windowWidth + wave.xSpacing;
    wave.yValues = new Array(floor(wave.w / wave.xSpacing));
  }
}
