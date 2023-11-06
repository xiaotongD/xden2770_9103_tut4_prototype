let fft;
let Background;
let backgroundSound;
let color1, color2, color3;

function preload() {
  Background = loadSound('audios/Background.wav');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  fft = new p5.FFT();
  Background.connect(fft);
  Background.setVolume(0.5); 
  backgroundSound = Background 
  backgroundSound.loop();

  color1 = color(32, 55, 69); 
  color2 = color(102, 43, 59); 
  color3 = color(50,30,40);
}

function draw() {
  background(30);
  rotateX(85);
  let wave = fft.waveform();

  translate(0, 0, -40);
  for (var i = 0; i < 300; i++) {
    beginShape();
    let index = floor(map(i, 0, 360, 0, wave.length))
    for (var j = 0; j < 360; j += 10) {
      var rad  = map(wave[index], 0, 0.1, 250, 500)
      var x = rad * cos(j);
      var y = rad * sin(j);
      var z = sin(frameCount + i * 10) *10
      var d = dist(0, 0, x, y);
      var interpColor;
      if (d <= 250) {
        interpColor = lerpColor(color(196, 99, 85), color(189,120,51), map(d, 0, 250, 0, 1));
      } else {
        interpColor = lerpColor(color(209,134,61), color(88,142,189), map(d, 250.1, 500, 0, 1));
      }
      stroke(interpColor);
      strokeWeight(2)
      vertex(x, y, z);
      noFill();
    }
    endShape(CLOSE);
  }

  translate(0, 0, 100);
  rotateX(7);
  for (var i = 0; i < 100; i++) {
    beginShape();
    for (var j = 0; j < 360; j += 10) {
      var rad = i * 5;
      var x = rad * cos(j);
      var y = rad * sin(j);
      var d = dist(0, 0, x, y);
      var interpColor;
      if (d <= 200) {
        interpColor = lerpColor(color(196, 99, 85), color(220, 147, 47), map(d, 0, 200, 0, 1));
      } else {
        interpColor = lerpColor(color(220, 147, 47), color(69,106,162), map(d, 200.1, 500, 0, 1));
      }
      stroke(interpColor);
      strokeWeight(2)
      vertex(x, y);
      noFill();
    }
    endShape(CLOSE);
  }

  drawTower();

}

function drawTower() {
  fill(120, 75, 50);
  push();
  translate(-60, 200, -22);
  scale(0.4);

  beginShape();
  for (let y = -windowHeight/3.5; y <= windowHeight/3.5; y += windowHeight/45.5) {
    let lerpedColor;
    if (y < -windowHeight/15.167) {
      lerpedColor = lerpColor(color1, color2, map(y, -windowHeight/3.5, -windowHeight/15.167, 0, 1));
    } else {
      lerpedColor = lerpColor(color2, color3, map(y, -windowHeight/15.167, windowHeight/6.067, 0, 1));
    }
    fill(lerpedColor);
    vertex(-windowHeight/1.75, windowHeight/6.067, -windowHeight/3.5);
    vertex(-windowHeight/45.5, windowHeight/6.067, -windowHeight/3.5);
    vertex(-windowHeight/30.3, windowHeight/6.067, -windowHeight/4.55);
    vertex(-windowHeight/15.167, windowHeight/6.067, -windowHeight/5.6875);
    vertex(-windowHeight/7.58, windowHeight/6.067, -windowHeight/5.6875);
    vertex(-windowHeight/6.5, windowHeight/6.067, -windowHeight/7);
    vertex(-windowHeight/5.35, windowHeight/6.067, -windowHeight/9.1);
    vertex(-windowHeight/4.55, windowHeight/6.067, -windowHeight/9.1);
    vertex(-windowHeight/4.33, windowHeight/6.067, -windowHeight/45.5);
    vertex(-windowHeight/3.5, windowHeight/6.067, 0);
    vertex(-windowHeight/3.25, windowHeight/6.067, -windowHeight/45.5);
    vertex(-windowHeight/3.25, windowHeight/6.067, windowHeight/9.1);
    vertex(-windowHeight/3.033, windowHeight/6.067, windowHeight/6.5);
    vertex(-windowHeight/2.758, windowHeight/6.067, windowHeight/9.1);
    vertex(-windowHeight/2.676, windowHeight/6.067, -windowHeight/45.5);
    vertex(-windowHeight/2.275, windowHeight/6.067, -windowHeight/9.1);
    vertex(-windowHeight/1.82, windowHeight/6.067, -windowHeight/5.6875);
    noStroke();
  }
  endShape(CLOSE);
  pop();
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}


