let gui, gc;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // createCanvas(windowWidth, windowHeight, WEBGL);
  
  noLoop();
  smooth();

  gui = new dat.GUI();

  gc = new function() {
    this.generate = () => redraw();
    this.fractal = false;
    this.branches = 3;
    this.minBranchLength = 10;
    this.minAngle = 0;
    this.maxAngle = QUARTER_PI;
    this.minLength = 1/3;
    this.maxLength = 0.9;
  };

  initGui();
}

function initGui() {
  gui.add(gc, 'generate').onChange(redraw);
  gui.add(gc, 'fractal', false).onChange(redraw);
  gui.add(gc, 'branches', 1, 5, 1).onFinishChange(redraw);
  gui.add(gc, 'minBranchLength', 1, 15, 1).onFinishChange(redraw);
  gui.add(gc, 'minAngle', 0, HALF_PI, 0.01).onChange(redraw);
  gui.add(gc, 'maxAngle', 0, HALF_PI, 0.01).onChange(redraw);
  gui.add(gc, 'minLength', 0.1, 0.9, 0.1).onFinishChange(redraw);
  gui.add(gc, 'maxLength', 0.1, 0.9, 0.1).onFinishChange(redraw);
}

function draw() {
  textureMode(NORMAL);
  background(0);
  background(135,206,250,150);
  // translate(0, windowHeight/2);
  translate(windowWidth/2, windowHeight);
  branch(windowHeight/4, gc.fractal ? gc.maxAngle : random(gc.minAngle, gc.maxAngle));
}

function branch(length, a) {
  // strokeJoin(ROUND);
  stroke(80, 30, 0, map(length, gc.minBranchLength, windowHeight/4, 75, 200));
  strokeWeight(map(length, gc.minBranchLength, windowHeight/4, 1, 10));
  line(0, 0, 0, -length);
  translate(0, -length);
  
  if (length > gc.minBranchLength) {
    for (let i=0; i<gc.branches; i++){
      let angle = gc.fractal ? a : random(gc.minAngle, gc.maxAngle);
      push();
        rotate(i%2 == 0 ? angle : -angle);
        let len = gc.fractal ? gc.minLength*length : random(gc.minLength*length, gc.maxLength*length);
        branch(len, angle);
      pop();
    }
    // push();
    //   let angle = random(0, QUARTER_PI);
    //   rotate(-angle);
    //   branch(random(length/3,length*0.9));
    // pop();
    // push();
    //   angle = random(0, QUARTER_PI);
    //   rotate(angle);
    //   branch(random(length/3,length*0.9));
    // pop();
    // push();
    //   angle = random(-QUARTER_PI, QUARTER_PI);
    //   rotate(angle);
    //   branch(random(length/3,length*0.9));
    // pop();
  }
  else {
    // stroke(0,255,0);
    fill(0, random(100,255), 0, random(100,255));
    noStroke();
    ellipse(0, 0, length*0.3, length);
  }
}
